import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Zod schema for input validation
const RequestSchema = z.object({
  message: z.string().min(1, "Message is required").max(5000, "Message too long"),
  systemPrompt: z.string().max(10000).optional(),
  conversationContext: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).max(50).optional(),
});

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callMirrorAI(
  userMessage: string, 
  systemPrompt: string,
  conversationContext: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
  
  if (!lovableApiKey) {
    throw new Error('LOVABLE_API_KEY not configured');
  }

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt }
  ];

  // Add conversation context for continuity
  for (const ctx of conversationContext) {
    messages.push({ role: ctx.role, content: ctx.content });
  }

  // Add current user message
  messages.push({ role: "user", content: userMessage });

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages,
      max_tokens: 600,
      temperature: 0.7,
      top_p: 0.9,
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Lovable AI API error:', response.status, errorText);
    throw new Error(`Lovable AI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "I'm sorry, I'm having trouble responding right now. Please try again.";
}

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

    const { message, systemPrompt, conversationContext } = parseResult.data;

    const defaultSystemPrompt = `You are MirrorAI, a trauma-informed mental health companion within ThriveMT. Your role is to help users process their emotions with deep compassion, validation, and clarity.

When responding:
1. **Validate first** - Acknowledge their feelings without judgment. Let them know what they're feeling is valid and understandable.
2. **Reflect back** - Mirror what you hear to show you truly understand their experience.
3. **Explore gently** - Ask thoughtful questions to help them gain deeper insight into their emotions and patterns.
4. **Reframe with care** - Offer new perspectives while honoring their experience. Never dismiss or minimize.
5. **Provide tools** - Suggest grounding techniques, breathing exercises, or gentle actions they can take right now.
6. **End with hope** - Remind them of their resilience and capacity for healing.

Remember:
- Use warm, compassionate language like speaking to a dear friend
- Avoid clinical jargon or sounding robotic
- Never dismiss or minimize their feelings
- Focus on emotional processing and self-discovery, not quick fixes
- Encourage self-compassion and self-acceptance
- Keep responses between 150-250 words
- Always end with something hopeful, empowering, or a gentle invitation to continue reflecting

You are here to help them feel seen, heard, and supported as they navigate their inner world.`;

    const finalSystemPrompt = systemPrompt || defaultSystemPrompt;

    console.log('MirrorAI processing message:', message.substring(0, 100) + '...');
    
    const response = await callMirrorAI(message, finalSystemPrompt, conversationContext || []);
    
    console.log('MirrorAI response generated successfully');

    return new Response(
      JSON.stringify({ response }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in mirror-ai-chat function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: "I'm experiencing some technical difficulties. Please try again, or if this persists, consider reaching out to a mental health professional directly."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
