
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateResponse } from "@/components/help/utils/responseGenerator";
import { checkForEmergency, saveConversationToLocalStorage, analyzeSentiment } from "@/components/help/utils/messageHelpers";

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
  const [conversationContext, setConversationContext] = useState<string[]>([]);
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
    setConversationContext(prev => {
      const newContext = [...prev];
      newContext.push(`${isUser ? "User" : "Henry"}: ${message}`);
      
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
      
      return newContext.slice(-12);
    });
  };

  const updateUserProfile = (key: string, value: any) => {
    setUserProfile(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  const saveConversation = (messages: Message[]) => {
    try {
      const savedConversations = JSON.parse(localStorage.getItem('henryConversations') || '[]');
      const newConversation = {
        id: Date.now(),
        date: new Date().toISOString(),
        messages: messages.map(m => ({
          text: m.text,
          isUser: m.isUser,
          timestamp: m.timestamp.toISOString()
        }))
      };
      
      savedConversations.push(newConversation);
      localStorage.setItem('henryConversations', JSON.stringify(savedConversations));
    } catch (e) {
      console.error("Failed to save conversation", e);
    }
  };

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
    
    setTimeout(() => {
      let responseText = "";
      
      if (smallTalkResponse) {
        responseText = smallTalkResponse;
      } else {
        responseText = generateResponse(text, conversationContext);
      }
      
      const henryMessage: Message = {
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      
      addMessage(henryMessage);
      updateConversationContext(responseText, false);
      setProcessing(false);
      
      const allMessages = [...conversationContext.map(c => {
        const [role, text] = c.split(': ', 2);
        return {
          text,
          isUser: role === 'User',
          timestamp: new Date()
        };
      }), henryMessage];
      
      if (allMessages.length % 5 === 0) {
        saveConversation(allMessages);
      }
    }, 1500);
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
