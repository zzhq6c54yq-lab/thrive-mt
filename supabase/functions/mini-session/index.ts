import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Zod schema for input validation
const RequestSchema = z.object({
  focus: z.enum(['racing_thoughts', 'conflict', 'low_mood', 'urge', 'process_therapy']),
  mood: z.number().min(1).max(10).optional(),
  anxiety: z.number().min(1).max(10).optional(),
  energy: z.number().min(1).max(10).optional(),
  urge_level: z.number().min(1).max(10).optional(),
  user_text_primary: z.string().max(2000).optional(),
  user_text_secondary: z.string().max(2000).optional(),
});

type MiniSessionRequest = z.infer<typeof RequestSchema>;

async function generateCoaching(request: MiniSessionRequest): Promise<{ coaching: string; summary: string }> {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!openAIApiKey) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  let systemPrompt = '';
  let userPrompt = '';

  // Crisis detection
  const isCrisis = request.urge_level && request.urge_level > 7;
  if (isCrisis) {
    return {
      coaching: "I notice you're experiencing intense urges right now. Your safety is the priority. Please reach out to:\n\n• **988 Suicide & Crisis Lifeline**: Call or text 988\n• **Crisis Text Line**: Text HOME to 741741\n• **Emergency Services**: Call 911\n\nThese resources provide immediate support from trained professionals. You don't have to face this alone.",
      summary: "Crisis support resources provided due to high urge level."
    };
  }

  switch (request.focus) {
    case 'racing_thoughts':
      systemPrompt = "You are a trauma-informed therapist specializing in CBT and thought challenging. Guide the user through identifying cognitive distortions and reframing thoughts. Keep responses under 200 words, warm and supportive.";
      userPrompt = `The user is experiencing racing thoughts. Mood: ${request.mood}/10, Anxiety: ${request.anxiety}/10. Their thoughts: "${request.user_text_primary}"\n\nHelp them challenge these thoughts using CBT techniques.`;
      break;

    case 'conflict':
      systemPrompt = "You are a trauma-informed therapist specializing in needs-based conflict resolution. Help identify underlying needs and reframe conflicts. Keep responses under 200 words, compassionate and non-judgmental.";
      userPrompt = `The user is processing a conflict. Mood: ${request.mood}/10. The situation: "${request.user_text_primary}"\n\nWhat they wish they had said: "${request.user_text_secondary}"\n\nHelp them identify their needs and the other person's possible needs.`;
      break;

    case 'low_mood':
      systemPrompt = "You are a trauma-informed therapist specializing in self-compassion and emotional validation. Provide gentle support and self-care suggestions. Keep responses under 200 words, warm and validating.";
      userPrompt = `The user is feeling down. Mood: ${request.mood}/10, Energy: ${request.energy}/10. What's happening: "${request.user_text_primary}"\n\nOffer compassionate support and gentle suggestions.`;
      break;

    case 'urge':
      systemPrompt = "You are a trauma-informed therapist specializing in harm reduction. Provide practical grounding techniques and urge surfing strategies. Keep responses under 200 words, non-judgmental and supportive. NEVER provide medical advice.";
      userPrompt = `The user is experiencing urges (intensity: ${request.urge_level}/10). Mood: ${request.mood}/10. What they're noticing: "${request.user_text_primary}"\n\nProvide harm reduction strategies and grounding techniques.`;
      break;

    case 'process_therapy':
      systemPrompt = "You are helping organize therapy session notes. Create a clear summary with key insights, action items, and reflection prompts. Keep responses under 200 words, structured and actionable.";
      userPrompt = `The user wants to process their therapy session. What came up: "${request.user_text_primary}"\n\nHelp organize these insights and suggest follow-up reflections.`;
      break;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', response.status, errorText);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const coaching = data.choices?.[0]?.message?.content || "I'm here to support you. Please try again.";
  
  // Generate brief summary
  const summary = `${request.focus.replace('_', ' ')} session - Mood: ${request.mood}/10${request.anxiety ? `, Anxiety: ${request.anxiety}/10` : ''}${request.urge_level ? `, Urge: ${request.urge_level}/10` : ''}`;

  return { coaching, summary };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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

    const request = parseResult.data;

    console.log('mini-session processing:', request.focus);

    const result = await generateCoaching(request);

    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in mini-session function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        coaching: "I'm experiencing technical difficulties. Please try again, or reach out to your therapist if you need immediate support."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
