import { supabase } from "@/integrations/supabase/client";

export interface HenryResponse {
  response: string;
  conversationId: string;
  agentType: 'router' | 'therapy' | 'crisis' | 'wellness' | 'coaching';
  riskLevel: 'low' | 'moderate' | 'high' | 'crisis';
  intent: string;
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
    
    const { data, error } = await supabase.functions.invoke('henry-multi-agent', {
      body: {
        message,
        conversationId,
        userId: user.id
      }
    });
    
    if (error) {
      throw error;
    }
    
    return {
      response: data.response,
      conversationId: data.conversationId,
      agentType: data.agentType,
      riskLevel: data.riskLevel,
      intent: data.intent
    };
  } catch (error) {
    console.error('Error calling Henry multi-agent service:', error);
    
    return {
      response: "I'm experiencing some technical difficulties. Please try again, or if this persists, consider reaching out to a mental health professional directly.",
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
        userId: user.id,
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