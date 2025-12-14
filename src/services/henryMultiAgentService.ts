import { supabase } from "@/integrations/supabase/client";

export interface HenryResponse {
  response: string;
  conversationId: string;
  agentType: 'router' | 'therapy' | 'crisis' | 'wellness' | 'coaching';
  riskLevel: 'low' | 'moderate' | 'high' | 'crisis';
  intent: string;
}

// Compassionate fallback responses when AI is unavailable
const FALLBACK_RESPONSES = [
  "I hear you, and I want you to know that reaching out takes courage. While I'm having a moment of connection issues, please know that your feelings are valid. Take a breath with me, and let's try again in a moment.",
  "Thank you for sharing that with me. I'm experiencing a brief pause right now, but your wellbeing matters. Would you like to try expressing that thought again? I'm here for you.",
  "I appreciate you opening up. Sometimes even I need a moment to gather my thoughts. Let's take a gentle breath together, and then try again.",
  "Your words matter to me. I'm having a small hiccup connecting right now, but please don't let that discourage you. What you're feeling is important.",
  "I'm here with you, even if my response is delayed. In the meantime, try placing your hand on your heart and taking three slow breaths. I'll be right back with you."
];

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

export async function getHenryResponse(
  message: string,
  conversationId?: string
): Promise<HenryResponse> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const data = await retryWithBackoff(async () => {
      const { data, error } = await supabase.functions.invoke('henry-multi-agent', {
        body: {
          message,
          conversationId
        }
      });
      
      if (error) {
        throw error;
      }
      
      return data;
    }, 3, 1000);
    
    return {
      response: data.response,
      conversationId: data.conversationId,
      agentType: data.agentType,
      riskLevel: data.riskLevel,
      intent: data.intent
    };
  } catch (error) {
    console.error('Error calling Henry multi-agent service:', error);
    
    // Return a compassionate fallback response
    const randomFallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
    
    return {
      response: randomFallback,
      conversationId: conversationId || '',
      agentType: 'coaching',
      riskLevel: 'low',
      intent: 'general'
    };
  }
}

export async function getConversationHistory(conversationId: string) {
  try {
    const { data, error } = await supabase
      .from('henry_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching conversation history:', error);
    return [];
  }
}

export async function getUserConversations() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('henry_conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('last_message_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user conversations:', error);
    return [];
  }
}

export async function requestHumanSupport(
  conversationId?: string,
  reason: 'user_requested' | 'crisis_detected' = 'user_requested'
): Promise<{ success: boolean; therapistName?: string; therapistId?: string; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase.functions.invoke('create-therapist-conversation', {
      body: {
        henryConversationId: conversationId,
        reason
      }
    });
    
    if (error) {
      console.error('Error requesting human support:', error);
      throw error;
    }
    
    return {
      success: true,
      therapistName: data.therapistName,
      therapistId: data.therapistId
    };
  } catch (error) {
    console.error('Error in requestHumanSupport:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect with therapist'
    };
  }
}