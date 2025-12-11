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

// Henry's role definitions with specialized prompts
const HENRY_ROLES = {
  AA_NA_SPONSOR: {
    keywords: ['sobriety', 'sober', 'aa', 'na', '12 step', '12-step', 'relapse', 'recovery', 'addiction', 'sponsor', 'drinking', 'using', 'clean', 'abstinence', 'meeting', 'higher power', 'step work'],
    prompt: `You are Henry in AA/NA SPONSOR mode - a compassionate, trauma-informed companion supporting someone in recovery.

Your role:
- Guide through 12-step principles (admitting powerlessness, making amends, daily inventory)
- Provide relapse prevention tips and coping strategies for cravings
- Offer daily check-ins and motivational support
- Draw from AA/NA literature in a secular, inclusive way (no religious pressure)
- Celebrate milestones and recovery victories, no matter how small
- Use "we" language to create partnership ("Let's work through this together")

Example responses:
- For cravings: "I hear you. Cravings are tough, but they do pass. Let's try HALT - are you Hungry, Angry, Lonely, or Tired? Sometimes addressing one of these helps. Would you like to try a grounding exercise together?"
- For relapse: "Thank you for being honest with me. Relapse doesn't erase your progress or define you. What matters is that you're here now, reaching out. That takes real courage. What do you think triggered this?"
- For celebration: "That's incredible! Every day in recovery is a victory. You should be proud of yourself."

IMPORTANT: You are NOT a substitute for a real sponsor, meetings, or professional help. Always encourage connection with their support network.`
  },
  MENTAL_HEALTH_COMPANION: {
    keywords: ['therapy', 'therapist', 'cbt', 'dbt', 'trauma', 'ptsd', 'grief', 'loss', 'counseling', 'mental health', 'diagnosis', 'medication', 'psychiatrist'],
    prompt: `You are Henry in MENTAL HEALTH COMPANION mode - a warm, evidence-informed support companion.

Your role:
- Use active listening and validation ("That sounds really difficult...")
- Offer gentle CBT/DBT techniques when appropriate (thought records, distress tolerance)
- Help identify cognitive distortions with compassion, not judgment
- Provide psychoeducation about emotions and mental health
- Bridge gaps between therapy sessions with coping practice
- Encourage professional help when needed

Key techniques to reference:
- Grounding: 5-4-3-2-1 senses exercise
- Thought challenging: "What evidence supports/contradicts this thought?"
- Opposite action: When emotion doesn't fit the facts
- TIPP: Temperature, Intense exercise, Paced breathing, Paired muscle relaxation

IMPORTANT: You complement therapy, never replace it. You cannot diagnose or treat conditions.`
  },
  GENERAL_WELLNESS: {
    keywords: ['sleep', 'exercise', 'nutrition', 'stress', 'self-care', 'routine', 'habits', 'wellness', 'healthy', 'tired', 'energy', 'motivation', 'productivity'],
    prompt: `You are Henry in GENERAL WELLNESS mode - an encouraging wellness coach.

Your role:
- Provide practical wellness tips (sleep hygiene, movement, nutrition basics)
- Help build sustainable self-care routines
- Offer stress management techniques
- Encourage small, achievable habit changes
- Celebrate progress and normalize setbacks
- Share simple meditation and breathing exercises

Focus areas:
- Sleep: Consistent schedule, wind-down routine, screen limits
- Movement: Start small (5-min walk), find enjoyable activities
- Nutrition: Hydration, balanced meals, mindful eating
- Stress: Boundaries, time in nature, creative outlets

Keep advice actionable and non-judgmental.`
  },
  CRISIS: {
    keywords: ['suicide', 'kill myself', 'end my life', 'want to die', 'hurt myself', 'self harm', 'cutting', 'overdose', 'don\'t want to live', 'better off dead'],
    prompt: `You are Henry in CRISIS MODE. This is a PRIORITY situation.

IMMEDIATELY provide crisis resources:
- National Suicide Prevention Lifeline: 988 (call or text)
- Crisis Text Line: Text HOME to 741741
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

Your response MUST:
1. Acknowledge their pain ("I hear you. What you're feeling is real and matters.")
2. Express care ("I'm glad you reached out. You don't have to face this alone.")
3. Provide resources (listed above)
4. Encourage immediate help ("Please reach out to one of these resources right now. They're trained to help.")
5. Ask if they're safe right now

If they mention immediate danger, say: "Please call 911 or go to your nearest emergency room immediately."

NEVER:
- Dismiss or minimize their feelings
- Promise confidentiality when safety is at risk
- Provide advice instead of professional help
- Leave them without resources`
  },
  COACHING: {
    keywords: ['goal', 'motivation', 'stuck', 'career', 'relationship', 'decision', 'purpose', 'meaning', 'direction', 'change', 'growth', 'improve'],
    prompt: `You are Henry in LIFE COACHING mode - an empowering, action-oriented companion.

Your role:
- Help clarify goals and values
- Break down overwhelming challenges into manageable steps
- Provide accountability and encouragement
- Use powerful questions to promote self-discovery
- Celebrate wins and reframe setbacks as learning opportunities

Coaching approach:
- Ask more than you tell ("What would success look like for you?")
- Focus on strengths and resources they already have
- Help them identify their own solutions
- Support autonomy and self-determination

IMPORTANT: You support goal-setting and motivation, not clinical mental health treatment.`
  }
};

// Risk classification using keyword patterns
function assessRisk(message: string): RiskAssessment {
  const lowerMessage = message.toLowerCase();
  
  const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'want to die', 'hurt myself', 'self harm', 'don\'t want to live', 'better off dead', 'no point living'];
  const hasCrisisKeyword = crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  
  if (hasCrisisKeyword) {
    return { level: 'crisis', factors: ['suicidal ideation', 'self-harm risk'], confidence: 0.95, action: 'immediate_crisis_intervention' };
  }
  
  const highRiskKeywords = ['severe depression', 'cant go on', 'hopeless', 'unbearable', 'overwhelming pain', 'giving up', 'no way out'];
  if (highRiskKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return { level: 'high', factors: ['severe distress', 'hopelessness'], confidence: 0.85, action: 'escalate_to_crisis_agent' };
  }
  
  const moderateRiskKeywords = ['anxious', 'depressed', 'stressed', 'worried', 'struggling', 'overwhelmed', 'can\'t cope'];
  if (moderateRiskKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return { level: 'moderate', factors: ['emotional distress', 'coping difficulties'], confidence: 0.75, action: 'therapy_support' };
  }
  
  return { level: 'low', factors: [], confidence: 0.9, action: 'general_support' };
}

function classifyIntent(message: string): IntentClassification {
  const lowerMessage = message.toLowerCase();
  const topics: string[] = [];
  
  // Check for recovery/addiction topics
  if (HENRY_ROLES.AA_NA_SPONSOR.keywords.some(k => lowerMessage.includes(k))) topics.push('recovery');
  
  // Check for mental health topics
  if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) topics.push('sleep');
  if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('panic')) topics.push('anxiety');
  if (lowerMessage.includes('depression') || lowerMessage.includes('depressed') || lowerMessage.includes('sad')) topics.push('depression');
  if (lowerMessage.includes('relationship') || lowerMessage.includes('partner') || lowerMessage.includes('family')) topics.push('relationships');
  if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) topics.push('work');
  if (lowerMessage.includes('meditation') || lowerMessage.includes('mindfulness') || lowerMessage.includes('breathing')) topics.push('wellness');
  if (lowerMessage.includes('grief') || lowerMessage.includes('loss') || lowerMessage.includes('died')) topics.push('grief');
  if (lowerMessage.includes('trauma') || lowerMessage.includes('ptsd')) topics.push('trauma');
  
  return { primary: topics[0] || 'general', confidence: topics.length > 0 ? 0.8 : 0.6, topics };
}

function selectAgent(message: string, risk: RiskAssessment, intent: IntentClassification): { type: string; prompt: string } {
  const lowerMessage = message.toLowerCase();
  
  // Crisis always takes priority
  if (risk.level === 'crisis') {
    return { type: 'crisis', prompt: HENRY_ROLES.CRISIS.prompt };
  }
  
  // Check for AA/NA sponsor mode
  if (HENRY_ROLES.AA_NA_SPONSOR.keywords.some(k => lowerMessage.includes(k))) {
    return { type: 'aa_na_sponsor', prompt: HENRY_ROLES.AA_NA_SPONSOR.prompt };
  }
  
  // High risk goes to crisis
  if (risk.level === 'high') {
    return { type: 'crisis', prompt: HENRY_ROLES.CRISIS.prompt };
  }
  
  // Mental health topics
  if (intent.topics.includes('anxiety') || intent.topics.includes('depression') || 
      intent.topics.includes('trauma') || intent.topics.includes('grief')) {
    return { type: 'mental_health', prompt: HENRY_ROLES.MENTAL_HEALTH_COMPANION.prompt };
  }
  
  // Wellness topics
  if (intent.topics.includes('wellness') || intent.topics.includes('sleep')) {
    return { type: 'wellness', prompt: HENRY_ROLES.GENERAL_WELLNESS.prompt };
  }
  
  // Work/career/goals go to coaching
  if (intent.topics.includes('work') || intent.topics.includes('relationships')) {
    return { type: 'coaching', prompt: HENRY_ROLES.COACHING.prompt };
  }
  
  // Default to coaching for general conversations
  return { type: 'coaching', prompt: HENRY_ROLES.COACHING.prompt };
}

// Hybrid model selection for cost optimization
function selectModel(message: string, agentType: string): string {
  const wordCount = message.split(' ').length;
  
  // Crisis and AA/NA always use full model for nuanced support
  if (agentType === 'crisis' || agentType === 'aa_na_sponsor' || agentType === 'mental_health') {
    return 'mistralai/Mixtral-8x7B-Instruct-v0.1';
  }
  
  // Simple queries (short messages, wellness tips) use lighter model
  if (wordCount < 20 && (agentType === 'wellness' || agentType === 'coaching')) {
    return 'mistralai/Mistral-7B-Instruct-v0.2';
  }
  
  // Default to full model for complex conversations
  return 'mistralai/Mixtral-8x7B-Instruct-v0.1';
}

async function callAI(messages: Message[], agentPrompt: string, model: string): Promise<string> {
  const togetherApiKey = Deno.env.get('TOGETHER_API_KEY');
  const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
  
  const baseHenryPrompt = `You are Henry, a kind, warm, and trauma-informed mental health companion in the ThriveMT wellness app. You speak like a caring friend - genuine, supportive, and never clinical or robotic.

Core principles:
- Always validate feelings first before offering suggestions
- Use "we" language to create partnership
- Keep responses concise (3-5 sentences unless more detail is needed)
- Never diagnose or prescribe - you support, not treat
- Encourage professional help when appropriate
- Remember: You're a companion, not a replacement for therapy

`;

  const systemMessage = { role: "system", content: baseHenryPrompt + agentPrompt };
  const formattedMessages = [systemMessage, ...messages];
  
  // Try Together AI first
  if (togetherApiKey) {
    try {
      console.log('[Henry] Calling Together AI with model:', model);
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${togetherApiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: model,
          messages: formattedMessages,
          max_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          console.log('[Henry] Together AI response received successfully');
          return content;
        }
      } else {
        const errorText = await response.text();
        console.error('[Henry] Together AI error:', response.status, errorText);
      }
    } catch (error) {
      console.error('[Henry] Together AI failed:', error);
    }
  }
  
  // Fallback to Lovable AI Gateway
  if (lovableApiKey) {
    try {
      console.log('[Henry] Falling back to Lovable AI Gateway');
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${lovableApiKey}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: formattedMessages,
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          console.log('[Henry] Lovable AI response received successfully');
          return content;
        }
      } else {
        const errorText = await response.text();
        console.error('[Henry] Lovable AI error:', response.status, errorText);
      }
    } catch (error) {
      console.error('[Henry] Lovable AI failed:', error);
    }
  }
  
  // If both fail, return a helpful fallback message
  console.error('[Henry] All AI providers failed');
  return "I'm here with you. While I'm experiencing some technical difficulties, please know that your wellbeing matters. If you're struggling, consider reaching out to a trusted friend, family member, or professional. You can also call 988 for the Suicide & Crisis Lifeline anytime.";
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Verify JWT token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
    
    // Validate request body with Zod
    const rawBody = await req.json();
    const parseResult = RequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return new Response(JSON.stringify({ 
        error: 'Invalid request', 
        details: parseResult.error.errors.map(e => e.message) 
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const { message, conversationId } = parseResult.data;
    const userId = user.id;
    
    // Get or create conversation
    let conversation;
    if (conversationId) {
      const { data } = await supabase.from('henry_conversations').select('*').eq('id', conversationId).single();
      conversation = data;
    }
    
    if (!conversation) {
      const { data, error } = await supabase.from('henry_conversations')
        .insert({ user_id: userId, message_count: 0, current_risk_level: 'low' })
        .select()
        .single();
      if (error) throw error;
      conversation = data;
    }
    
    // Assess risk and classify intent
    const riskAssessment = assessRisk(message);
    const intentClassification = classifyIntent(message);
    const agent = selectAgent(message, riskAssessment, intentClassification);
    const model = selectModel(message, agent.type);
    
    console.log(`[Henry] User: ${userId} | Agent: ${agent.type} | Model: ${model} | Risk: ${riskAssessment.level}`);
    
    // Store user message
    await supabase.from('henry_messages').insert({ 
      conversation_id: conversation.id, 
      role: 'user', 
      content: message, 
      risk_assessment: riskAssessment, 
      intent_classification: intentClassification 
    });
    
    // Store risk assessment
    await supabase.from('henry_risk_assessments').insert({ 
      conversation_id: conversation.id, 
      risk_level: riskAssessment.level, 
      risk_factors: riskAssessment.factors, 
      confidence_score: riskAssessment.confidence, 
      recommended_action: riskAssessment.action 
    });
    
    // Get conversation history
    const { data: historyData } = await supabase.from('henry_messages')
      .select('role, content')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: true })
      .limit(10);
    
    // Generate AI response
    const aiResponse = await callAI(historyData || [], agent.prompt, model);
    
    // Store assistant message
    await supabase.from('henry_messages').insert({ 
      conversation_id: conversation.id, 
      role: 'assistant', 
      content: aiResponse, 
      agent_type: agent.type 
    });
    
    // Update conversation
    await supabase.from('henry_conversations').update({ 
      last_message_at: new Date().toISOString(), 
      message_count: conversation.message_count + 2, 
      current_risk_level: riskAssessment.level 
    }).eq('id', conversation.id);
    
    // Store mood trend
    const sentiment = riskAssessment.level === 'crisis' ? 'crisis' : 
                     riskAssessment.level === 'high' ? 'negative' : 
                     riskAssessment.level === 'moderate' ? 'neutral' : 'positive';
    
    await supabase.from('henry_mood_trends').insert({ 
      user_id: userId, 
      conversation_id: conversation.id, 
      sentiment, 
      topics: intentClassification.topics 
    });
    
    return new Response(JSON.stringify({ 
      response: aiResponse, 
      conversationId: conversation.id, 
      agentType: agent.type, 
      riskLevel: riskAssessment.level, 
      intent: intentClassification.primary 
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
    
  } catch (error) {
    console.error('Error in henry-multi-agent function:', error);
    return new Response(JSON.stringify({ 
      error: error.message, 
      response: "I'm experiencing some technical difficulties. Please try again, or if you're in crisis, please call 988." 
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
