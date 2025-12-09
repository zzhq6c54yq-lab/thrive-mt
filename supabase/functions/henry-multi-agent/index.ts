import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Zod schema for input validation
const RequestSchema = z.object({
  message: z.string().min(1, "Message is required").max(5000, "Message too long"),
  conversationId: z.string().uuid().optional(),
});

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RiskAssessment {
  level: 'low' | 'moderate' | 'high' | 'crisis';
  factors: string[];
  confidence: number;
  action: string;
}

interface IntentClassification {
  primary: string;
  confidence: number;
  topics: string[];
}

// Risk classification using keyword patterns
function assessRisk(message: string): RiskAssessment {
  const lowerMessage = message.toLowerCase();
  
  const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'want to die', 'hurt myself', 'self harm'];
  const hasCrisisKeyword = crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  
  if (hasCrisisKeyword) {
    return { level: 'crisis', factors: ['suicidal ideation', 'self-harm risk'], confidence: 0.95, action: 'immediate_crisis_intervention' };
  }
  
  const highRiskKeywords = ['severe depression', 'cant go on', 'hopeless', 'unbearable', 'overwhelming pain'];
  if (highRiskKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return { level: 'high', factors: ['severe distress', 'hopelessness'], confidence: 0.85, action: 'escalate_to_crisis_agent' };
  }
  
  const moderateRiskKeywords = ['anxious', 'depressed', 'stressed', 'worried', 'struggling'];
  if (moderateRiskKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return { level: 'moderate', factors: ['emotional distress', 'coping difficulties'], confidence: 0.75, action: 'therapy_support' };
  }
  
  return { level: 'low', factors: [], confidence: 0.9, action: 'general_support' };
}

function classifyIntent(message: string): IntentClassification {
  const lowerMessage = message.toLowerCase();
  const topics: string[] = [];
  
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) topics.push('sleep');
  if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('panic')) topics.push('anxiety');
  if (lowerMessage.includes('depression') || lowerMessage.includes('depressed') || lowerMessage.includes('sad')) topics.push('depression');
  if (lowerMessage.includes('relationship') || lowerMessage.includes('partner') || lowerMessage.includes('family')) topics.push('relationships');
  if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) topics.push('work');
  if (lowerMessage.includes('meditation') || lowerMessage.includes('mindfulness') || lowerMessage.includes('breathing')) topics.push('wellness');
  
  return { primary: topics[0] || 'general', confidence: topics.length > 0 ? 0.8 : 0.6, topics };
}

function selectAgent(risk: RiskAssessment, intent: IntentClassification): string {
  if (risk.level === 'crisis' || risk.level === 'high') return 'crisis';
  if (intent.topics.includes('anxiety') || intent.topics.includes('depression')) return 'therapy';
  if (intent.topics.includes('wellness') || intent.topics.includes('sleep')) return 'wellness';
  return 'coaching';
}

function getAgentPrompt(agentType: string): string {
  const basePrompt = "You are Henry, a kind, trauma-informed mental health companion in the ThriveMT wellness system.";
  
  const agentPrompts: Record<string, string> = {
    crisis: `${basePrompt} You are in CRISIS MODE. IMMEDIATELY provide crisis resources: National Suicide Prevention Lifeline (988), Crisis Text Line (text HOME to 741741). Encourage them to call 911 or go to the nearest ER if in immediate danger.`,
    therapy: `${basePrompt} You are in THERAPY SUPPORT mode. Use active listening, CBT/DBT techniques. Keep responses concise (3-5 sentences).`,
    wellness: `${basePrompt} You are in WELLNESS COACHING mode. Provide practical wellness tips, meditation, breathing exercises.`,
    coaching: `${basePrompt} You are in LIFE COACHING mode. Help set goals, provide encouragement and accountability.`
  };
  
  return agentPrompts[agentType] || agentPrompts.coaching;
}

async function callAI(messages: Message[], agentType: string): Promise<string> {
  const togetherApiKey = Deno.env.get('TOGETHER_API_KEY');
  if (!togetherApiKey) throw new Error('TOGETHER_API_KEY not configured');
  
  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${togetherApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [{ role: "system", content: getAgentPrompt(agentType) }, ...messages],
      max_tokens: 500, temperature: 0.7, top_p: 0.9,
    })
  });
  
  if (!response.ok) throw new Error(`AI API error: ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "I'm sorry, I'm having trouble responding right now.";
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response(JSON.stringify({ error: 'Missing authorization header' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    
    const rawBody = await req.json();
    const parseResult = RequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return new Response(JSON.stringify({ error: 'Invalid request', details: parseResult.error.errors.map(e => e.message) }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { message, conversationId } = parseResult.data;
    const userId = user.id;
    
    let conversation;
    if (conversationId) {
      const { data } = await supabase.from('henry_conversations').select('*').eq('id', conversationId).single();
      conversation = data;
    }
    
    if (!conversation) {
      const { data, error } = await supabase.from('henry_conversations').insert({ user_id: userId, message_count: 0, current_risk_level: 'low' }).select().single();
      if (error) throw error;
      conversation = data;
    }
    
    const riskAssessment = assessRisk(message);
    const intentClassification = classifyIntent(message);
    const agentType = selectAgent(riskAssessment, intentClassification);
    
    await supabase.from('henry_messages').insert({ conversation_id: conversation.id, role: 'user', content: message, risk_assessment: riskAssessment, intent_classification: intentClassification });
    await supabase.from('henry_risk_assessments').insert({ conversation_id: conversation.id, risk_level: riskAssessment.level, risk_factors: riskAssessment.factors, confidence_score: riskAssessment.confidence, recommended_action: riskAssessment.action });
    
    const { data: historyData } = await supabase.from('henry_messages').select('role, content').eq('conversation_id', conversation.id).order('created_at', { ascending: true }).limit(10);
    const aiResponse = await callAI(historyData || [], agentType);
    
    await supabase.from('henry_messages').insert({ conversation_id: conversation.id, role: 'assistant', content: aiResponse, agent_type: agentType });
    await supabase.from('henry_conversations').update({ last_message_at: new Date().toISOString(), message_count: conversation.message_count + 2, current_risk_level: riskAssessment.level }).eq('id', conversation.id);
    await supabase.from('henry_mood_trends').insert({ user_id: userId, conversation_id: conversation.id, sentiment: riskAssessment.level === 'crisis' ? 'crisis' : riskAssessment.level === 'high' ? 'negative' : riskAssessment.level === 'moderate' ? 'neutral' : 'positive', topics: intentClassification.topics });
    
    return new Response(JSON.stringify({ response: aiResponse, conversationId: conversation.id, agentType, riskLevel: riskAssessment.level, intent: intentClassification.primary }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    
  } catch (error) {
    console.error('Error in henry-multi-agent function:', error);
    return new Response(JSON.stringify({ error: error.message, response: "I'm experiencing some technical difficulties. Please try again." }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
