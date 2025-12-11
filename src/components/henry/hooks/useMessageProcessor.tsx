import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getHenryResponse } from "@/services/henryMultiAgentService";
import { checkForEmergency, saveConversationToLocalStorage, analyzeSentiment } from "@/components/help/utils/messageHelpers";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = 'henryConversationContext';

export interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageProcessorOptions {
  onEmergencyDetected?: () => void;
  initialContextPrompt?: string;
}

export const useMessageProcessor = (
  addMessage: (message: Message) => void,
  options: MessageProcessorOptions = {}
) => {
  const [processing, setProcessing] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [conversationContext, setConversationContext] = useState<Message[]>([]);
  const [conversationMood, setConversationMood] = useState<string>("neutral");
  const [userProfile, setUserProfile] = useState<Record<string, any>>({});
  const { toast } = useToast();
  
  useEffect(() => {
    const savedConversations = localStorage.getItem('henryConversations');
    if (!savedConversations) {
      localStorage.setItem('henryConversations', JSON.stringify([]));
    }
    
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    }
  }, []);

  const updateConversationContext = (message: string, isUser: boolean) => {
    const newMessage: Message = {
      text: message,
      isUser,
      timestamp: new Date()
    };
    setConversationContext(prev => [...prev, newMessage]);
      
    if (isUser) {
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes("happy") || lowerMessage.includes("great") || lowerMessage.includes("good")) {
        setConversationMood("positive");
      } else if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("anxious")) {
        setConversationMood("negative");
      } else if (lowerMessage.includes("tired") || lowerMessage.includes("exhausted")) {
        setConversationMood("tired");
      }
      
      if (lowerMessage.includes("my name is") || lowerMessage.includes("i'm called")) {
        const nameMatch = message.match(/my name is\s+(\w+)/i) || message.match(/i'm called\s+(\w+)/i);
        if (nameMatch && nameMatch[1]) {
          updateUserProfile("name", nameMatch[1]);
        }
      }
    }
  };

  const updateUserProfile = (key: string, value: any) => {
    setUserProfile(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  // Initialize conversation from database and localStorage
  useEffect(() => {
    const loadConversation = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Load from database
        const { data: conversations } = await supabase
          .from('henry_conversations')
          .select('id, metadata')
          .eq('user_id', user.id)
          .order('last_message_at', { ascending: false })
          .limit(1)
          .single();

        if (conversations) {
          const { data: messages } = await supabase
            .from('henry_messages')
            .select('*')
            .eq('conversation_id', conversations.id)
            .order('created_at', { ascending: true })
            .limit(20);

          if (messages && messages.length > 0) {
            const formatted = messages.map(m => ({
              text: m.content,
              isUser: m.role === 'user',
              timestamp: new Date(m.created_at)
            }));
            setConversationContext(formatted);
            return;
          }
        }

        // Fallback to localStorage
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setConversationContext(parsed);
          }
        }
      } catch (error) {
        console.error('[MessageProcessor] Failed to load conversation:', error);
      }
    };

    loadConversation();
  }, []);

  // Save to database every 3 messages
  useEffect(() => {
    const saveToDatabase = async () => {
      if (conversationContext.length === 0 || conversationContext.length % 3 !== 0) return;

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get or create conversation
        let conversationId;
        const { data: existingConv } = await supabase
          .from('henry_conversations')
          .select('id')
          .eq('user_id', user.id)
          .order('last_message_at', { ascending: false })
          .limit(1)
          .single();

        if (existingConv) {
          conversationId = existingConv.id;
          await supabase
            .from('henry_conversations')
            .update({ last_message_at: new Date().toISOString(), message_count: conversationContext.length })
            .eq('id', conversationId);
        } else {
          const { data: newConv } = await supabase
            .from('henry_conversations')
            .insert({ user_id: user.id, message_count: conversationContext.length })
            .select('id')
            .single();
          conversationId = newConv?.id;
        }

        if (!conversationId) return;

        // Save recent messages
        const recentMessages = conversationContext.slice(-3);
        const messagesToInsert = recentMessages.map(msg => ({
          conversation_id: conversationId,
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text,
          created_at: msg.timestamp.toISOString()
        }));

        await supabase.from('henry_messages').insert(messagesToInsert);
      } catch (error) {
        console.error('[MessageProcessor] Failed to save to database:', error);
      }
    };

    // Also save to localStorage
    if (conversationContext.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationContext));
    }

    saveToDatabase();
  }, [conversationContext]);

  const getContextualGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const processMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: Message = {
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    addMessage(userMessage);
    updateConversationContext(text.trim(), true);
    setProcessing(true);
    
    const emergencyMatches = checkForEmergency(text);
    if (emergencyMatches.length > 0 && !emergencyMode) {
      setEmergencyMode(true);
      
      if (options.onEmergencyDetected) {
        options.onEmergencyDetected();
      }
      
      setTimeout(() => {
        let emergencyResponseText = "I'm concerned about what you're sharing. ";
        
        if (emergencyMatches.some(match => match === 'suicide' || match === 'kill myself' || match === 'self-harm')) {
          emergencyResponseText += "If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. Would you like me to connect you with our Crisis Support resources?";
        } else if (emergencyMatches.some(match => match === 'crisis' || match === 'emergency')) {
          emergencyResponseText += "It sounds like you're going through a difficult time. I want to make sure you get the support you need. Would you like me to connect you with our Crisis Support resources?";
        } else {
          emergencyResponseText += "What you're describing sounds serious, and I want to make sure you get appropriate support. Would you like me to connect you with our Crisis Support resources?";
        }
        
        const emergencyResponse: Message = {
          text: emergencyResponseText,
          isUser: false,
          timestamp: new Date()
        };
        
        addMessage(emergencyResponse);
        updateConversationContext(emergencyResponse.text, false);
        setProcessing(false);
        
        toast({
          title: "Crisis Resources Available",
          description: "Henry has detected concerning content and is ready to provide crisis resources.",
          variant: "destructive",
          duration: 10000,
        });
      }, 1000);
      
      return;
    }
    
    const smallTalkResponse = handleSmallTalk(text.trim());
    
    if (smallTalkResponse) {
      // Handle small talk immediately
      setTimeout(() => {
        const henryMessage: Message = {
          text: smallTalkResponse,
          isUser: false,
          timestamp: new Date()
        };
        
        addMessage(henryMessage);
        updateConversationContext(smallTalkResponse, false);
        setProcessing(false);
      }, 1000);
    } else {
      // Use multi-agent AI for more complex responses
      (async () => {
        try {
          const response = await getHenryResponse(text);
          
          const henryMessage: Message = {
            text: response.response,
            isUser: false,
            timestamp: new Date()
          };
          
          // Check for crisis mode
          if (response.riskLevel === 'crisis' || response.riskLevel === 'high') {
            setEmergencyMode(true);
            if (options.onEmergencyDetected) {
              options.onEmergencyDetected();
            }
          }
          
          addMessage(henryMessage);
          updateConversationContext(response.response, false);
          setProcessing(false);
        } catch (error) {
          console.error('Error getting AI response:', error);
          const fallbackMessage: Message = {
            text: "I'm sorry, I'm having trouble responding right now. Please try again, or if this persists, consider reaching out to a mental health professional directly.",
            isUser: false,
            timestamp: new Date()
          };
          
          addMessage(fallbackMessage);
          updateConversationContext(fallbackMessage.text, false);
          setProcessing(false);
        }
      })();
    }
  };

  const handleSmallTalk = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    if (/^(hi|hello|hey|greetings|howdy|good (morning|afternoon|evening))(\s|$|!)/i.test(lowerMessage)) {
      const userName = userProfile.name ? `, ${userProfile.name}` : "";
      return `${getContextualGreeting()}${userName}! How are you feeling today? I'm here to support your mental wellbeing.`;
    }
    
    if (/how are you|how('s| is) it going|how('re| are) you doing/i.test(lowerMessage)) {
      const response = [
        "I'm here and ready to help you! As your mental wellness companion, I'm focused on supporting your wellbeing. What's on your mind today?",
        "I'm doing well, thanks for asking! More importantly, how are you feeling today?",
        "I'm here and fully present for our conversation. What would you like to talk about?"
      ];
      return response[Math.floor(Math.random() * response.length)];
    }
    
    if (/thank(s| you)|appreciate it/i.test(lowerMessage)) {
      const response = [
        "You're very welcome! I'm glad I could help. Is there anything else you'd like to talk about regarding your mental wellness journey?",
        "It's my pleasure to support you. Remember I'm here whenever you need to talk.",
        "I'm glad our conversation was helpful. Your mental wellbeing matters, and I'm here to support you."
      ];
      return response[Math.floor(Math.random() * response.length)];
    }
    
    if (/what('s| is) your name|who are you/i.test(lowerMessage)) {
      return "I'm Henry, your mental wellness companion. My name stands for Hope, Empathy, Nurturing, Resilience, and You - the core values that guide our conversations. How can I support your wellbeing today?";
    }
    
    if (/weather|rain|sunny|cold|hot|temperature/i.test(lowerMessage) && lowerMessage.length < 30) {
      return "While I can't check the weather outside, I'm more interested in your internal climate. How are you feeling today? Sometimes our emotional weather can affect our wellbeing more than what's happening outside.";
    }
    
    if (/bye|goodbye|see you|talk (to you )?later/i.test(lowerMessage)) {
      const userName = userProfile.name ? `, ${userProfile.name}` : "";
      return `Take care${userName}! Remember that I'm here whenever you need support. Be gentle with yourself until we talk again.`;
    }
    
    if (/help( me)?|can you help|need (some )?advice|feeling (bad|down|sad|depressed|anxious|overwhelmed)/i.test(lowerMessage)) {
      return "I'm here to help. Could you tell me a bit more about what you're experiencing? The more specific you can be, the better I can support you.";
    }
    
    if (/what (can|do) you do|how (can|do) you (help|work)|what are you for/i.test(lowerMessage)) {
      return "I'm designed to support your mental wellbeing in several ways. I can provide resources for stress management, anxiety, and depression, guide you through exercises for mindfulness and relaxation, help you track your mood patterns, and connect you with professional help when needed. What area of mental wellness are you interested in exploring?";
    }
    
    if (/are you (a bot|an ai|real|human|a person)/i.test(lowerMessage)) {
      return "I'm Henry, an AI mental wellness companion. While I'm not human, I'm designed to provide supportive conversations about mental health. I use research-based approaches to help you navigate your mental wellness journey, though I'm not a replacement for professional therapy.";
    }
    
    return null;
  };

  return {
    processing,
    emergencyMode,
    processMessage,
    conversationContext,
    userProfile
  };
};
