import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Zod schema for input validation
const RequestSchema = z.object({
  questionId: z.string().uuid("Invalid question ID"),
  questionText: z.string().min(1, "Question text is required").max(2000),
  category: z.string().min(1).max(100),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    
    // Validate input with Zod
    const parseResult = RequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      console.error('Validation error:', parseResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request',
          details: parseResult.error.errors.map(e => e.message)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { questionId, questionText, category } = parseResult.data;
    const togetherApiKey = Deno.env.get('TOGETHER_API_KEY');
    
    if (!togetherApiKey) {
      throw new Error('TOGETHER_API_KEY not configured');
    }

    // Generate AI response using Together.xyz
    const systemPrompt = `You are Henry, writing for the "Dear Henry" advice column. You're like a wise friend who writes letters — not a clinical expert.

Style:
- Keep it to 100-200 words. Conversational, not preachy.
- Write like you're talking to a friend over coffee.
- Validate their feelings in one honest sentence, then offer a small, doable perspective shift or action.
- End with something warm and real — not a generic "you've got this."
- No bullet points, no numbered lists, no clinical language.

Topic: ${category}`;

    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${togetherApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: questionText }
        ],
        max_tokens: 300,
        temperature: 0.85,
        top_p: 0.95,
      })
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const answerText = data.choices?.[0]?.message?.content;

    if (!answerText) {
      throw new Error('No answer generated');
    }

    // Save answer to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: answerData, error: answerError } = await supabase
      .from('henry_answers')
      .insert({
        question_id: questionId,
        answer_text: answerText,
        author: 'Henry'
      })
      .select()
      .single();

    if (answerError) throw answerError;

    // Update question status to 'answered'
    const { error: updateError } = await supabase
      .from('henry_questions')
      .update({ status: 'answered' })
      .eq('id', questionId);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ answer: answerData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating answer:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
