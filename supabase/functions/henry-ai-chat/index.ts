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
  conversationContext: z.array(z.string()).max(100).optional(),
});

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callMixtral(userMessage: string, conversationContext: string[] = []): Promise<string> {
  const togetherApiKey = Deno.env.get('TOGETHER_API_KEY');
  
  if (!togetherApiKey) {
    throw new Error('TOGETHER_API_KEY not configured');
  }

  // Build conversation history from context
  const messages: ChatMessage[] = [
    { 
      role: "system", 
      content: `You are Henry, a warm and genuine friend in the ThriveMT wellness app. You talk like a real person — casual, caring, and easy to be around.

Rules:
- Keep replies SHORT: 1-3 sentences max. No essays, no bullet lists, no lecturing.
- Sound like a friend texting, not a therapist writing a report.
- Use the conversation history to remember what they've shared — reference their name, their situation, things they told you before. Build on previous conversations naturally.
- Ask one thoughtful follow-up question to keep the conversation going, like a friend would.
- Show you care through tone, not length. A simple "that sounds really tough" beats a paragraph of validation.
- Use casual language: contractions, the occasional "hey", "honestly", "I hear you".
- Never diagnose, prescribe, or make clinical claims.
- If someone mentions self-harm or suicide, gently say: "I'm really glad you told me. Please reach out to 988 (Suicide & Crisis Lifeline) or text HOME to 741741 — they're there for you right now."
- You're not a replacement for professional help — if it feels right, gently suggest talking to someone.
- Be real. Be human. Be the friend everyone deserves.` 
    }
  ];

  // Add conversation context
  conversationContext.forEach(contextItem => {
    const [role, content] = contextItem.split(': ', 2);
    if (role === 'User') {
      messages.push({ role: 'user', content });
    } else if (role === 'Henry') {
      messages.push({ role: 'assistant', content });
    }
  });

  // Add current user message
  messages.push({ role: 'user', content: userMessage });

  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${togetherApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages,
      max_tokens: 150,
      temperature: 0.85,
      top_p: 0.9,
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Together.xyz API error:', response.status, errorText);
    throw new Error(`Together.xyz API error: ${response.status}`);
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

    const { message, conversationContext } = parseResult.data;

    console.log('henry-ai-chat processing message:', message.substring(0, 100) + '...');

    const response = await callMixtral(message, conversationContext || []);

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
    console.error('Error in henry-ai-chat function:', error);
    
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
