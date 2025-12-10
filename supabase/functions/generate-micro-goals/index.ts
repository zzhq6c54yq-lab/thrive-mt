import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

// Zod schema for optional input validation
const RequestSchema = z.object({
  focusArea: z.string().max(100).optional()
}).optional();

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    // For unauthenticated/demo users, return default micro-goals
    if (!user) {
      const hour = new Date().getHours();
      let timeOfDay = 'morning';
      if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
      else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
      else if (hour >= 21 || hour < 5) timeOfDay = 'night';

      const defaultGoals = [
        { text: "Take 3 deep breaths", category: "breathwork" },
        { text: "Drink a glass of water", category: "physical" },
        { text: "Write down one positive thing about today", category: "mindfulness" },
        { text: "Do a quick stretch", category: "movement" },
        { text: "Send a kind message to someone", category: "connection" }
      ];

      return new Response(
        JSON.stringify({ 
          microGoals: defaultGoals,
          generatedAt: new Date().toISOString(),
          context: { timeOfDay, avgMood: 'unknown' }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Generating micro-goals for user ${user.id}`);

    // Get user's recent mood check-ins
    const { data: recentCheckIns } = await supabaseClient
      .from('daily_check_ins')
      .select('mood_score, tags, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(7);

    // Get user profile and goals
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('goals, display_name')
      .eq('id', user.id)
      .single();

    // Get current time of day for context
    const hour = new Date().getHours();
    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else if (hour >= 21 || hour < 5) timeOfDay = 'night';

    // Calculate average mood
    const avgMood = recentCheckIns?.length
      ? (recentCheckIns.reduce((sum, c) => sum + c.mood_score, 0) / recentCheckIns.length).toFixed(1)
      : 'unknown';

    // Build context for AI
    const contextPrompt = `Generate 5 micro-goals (small, achievable tasks) for a mental wellness app user.

User Context:
- Time of day: ${timeOfDay}
- Recent average mood: ${avgMood}/5
- User goals: ${profile?.goals?.join(', ') || 'general wellness'}
- Recent mood tags: ${recentCheckIns?.flatMap(c => c.tags || []).slice(0, 5).join(', ') || 'none'}

Requirements:
- Each micro-goal should be completable in 1-5 minutes
- Should be specific and actionable
- Should align with time of day and mood context
- Mix of self-care, mindfulness, and practical tasks
- Use warm, encouraging language

Return ONLY a valid JSON array of 5 micro-goals in this exact format:
[
  {"text": "Take 3 deep breaths", "category": "breathwork"},
  {"text": "Drink a glass of water", "category": "physical"},
  {"text": "Write down one thing you're grateful for", "category": "mindfulness"},
  {"text": "Stretch your shoulders and neck", "category": "movement"},
  {"text": "Send a kind text to someone", "category": "connection"}
]

Categories must be one of: breathwork, physical, mindfulness, movement, connection`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a compassionate mental wellness assistant that generates personalized micro-goals. Always respond with valid JSON only.' },
          { role: 'user', content: contextPrompt }
        ],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const microGoalsText = data.choices[0].message.content.trim();
    
    // Parse JSON response
    let microGoals;
    try {
      microGoals = JSON.parse(microGoalsText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', microGoalsText);
      // Fallback to default micro-goals
      microGoals = [
        { text: "Take 3 deep breaths", category: "breathwork" },
        { text: "Drink a glass of water", category: "physical" },
        { text: "Write down one positive thing about today", category: "mindfulness" },
        { text: "Do a quick stretch", category: "movement" },
        { text: "Send a kind message to someone", category: "connection" }
      ];
    }

    console.log(`Generated ${microGoals.length} micro-goals`);

    return new Response(
      JSON.stringify({ 
        microGoals,
        generatedAt: new Date().toISOString(),
        context: { timeOfDay, avgMood }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-micro-goals function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
