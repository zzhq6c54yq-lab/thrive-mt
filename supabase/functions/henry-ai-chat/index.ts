import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
      content: "You are Henry, a kind, trauma-informed psychiatrist in the ThriveMT mental wellness system. You provide compassionate, professional mental health support. Keep responses concise but empathetic. If someone expresses suicidal ideation or crisis, immediately direct them to emergency resources like 988 (National Suicide Prevention Lifeline) or emergency services." 
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
      max_tokens: 500,
      temperature: 0.7,
      top_p: 0.9,
    })
  });

  if (!response.ok) {
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
    const { message, conversationContext } = await req.json();

    if (!message) {
      throw new Error('No message provided');
    }

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