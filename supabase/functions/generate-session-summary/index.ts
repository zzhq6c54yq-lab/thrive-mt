import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { conversationId, summaryType = 'session' } = await req.json();

    if (!conversationId) {
      return new Response(JSON.stringify({ error: 'conversationId is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get conversation messages
    const { data: messages, error: messagesError } = await supabase
      .from('henry_messages')
      .select('role, content, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error('Error fetching messages:', messagesError);
      return new Response(JSON.stringify({ error: 'Failed to fetch messages' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages found for conversation' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get conversation details
    const { data: conversation } = await supabase
      .from('henry_conversations')
      .select('user_id, current_risk_level')
      .eq('id', conversationId)
      .single();

    // Build transcript for summarization
    const transcript = messages.map(m => `${m.role}: ${m.content}`).join('\n');

    // Call OpenAI for summary
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a clinical summarization assistant. Analyze the following therapy conversation and provide:
1. A concise summary (2-3 paragraphs) of the main topics discussed
2. Key topics as an array of strings
3. Any risk flags identified (e.g., self-harm, crisis, substance use)
4. Overall mood trend (improving, declining, stable, mixed)

Respond in JSON format:
{
  "summary": "string",
  "keyTopics": ["topic1", "topic2"],
  "riskFlags": ["flag1"] or [],
  "moodTrend": "improving" | "declining" | "stable" | "mixed"
}`
          },
          {
            role: 'user',
            content: `Conversation transcript:\n\n${transcript}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!openaiResponse.ok) {
      console.error('OpenAI API error:', await openaiResponse.text());
      return new Response(JSON.stringify({ error: 'Failed to generate summary' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openaiData = await openaiResponse.json();
    const summaryContent = openaiData.choices[0]?.message?.content;

    let parsedSummary;
    try {
      parsedSummary = JSON.parse(summaryContent);
    } catch {
      parsedSummary = {
        summary: summaryContent,
        keyTopics: [],
        riskFlags: [],
        moodTrend: 'stable'
      };
    }

    // Store the summary
    const { data: summary, error: insertError } = await supabase
      .from('ai_session_summaries')
      .insert({
        conversation_id: conversationId,
        user_id: conversation?.user_id || user.id,
        summary_type: summaryType,
        content: parsedSummary.summary,
        key_topics: parsedSummary.keyTopics,
        risk_flags: parsedSummary.riskFlags,
        mood_trend: parsedSummary.moodTrend,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error storing summary:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to store summary' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Session summary generated successfully:', summary.id);

    return new Response(JSON.stringify({ success: true, summary }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-session-summary:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
