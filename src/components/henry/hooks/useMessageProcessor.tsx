import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateResponse } from "@/components/help/utils/responseGenerator";
import { checkForEmergency } from "@/components/help/utils/messageHelpers";

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
  const { toast } = useToast();

  const updateConversationContext = (message: string, isUser: boolean) => {
    setConversationContext(prev => {
      const newContext = [...prev];
      newContext.push(`${isUser ? "User" : "Henry"}: ${message}`);
      return newContext.slice(-8);
    });
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
    
    const emergency = checkForEmergency(text);
    if (emergency && !emergencyMode) {
      setEmergencyMode(true);
      
      if (options.onEmergencyDetected) {
        options.onEmergencyDetected();
      }
      
      setTimeout(() => {
        const emergencyResponse: Message = {
          text: "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. Would you like me to connect you with our Crisis Support resources?",
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
    }, 1500);
  };

  const handleSmallTalk = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    
    if (/^(hi|hello|hey|greetings|howdy|good (morning|afternoon|evening))(\s|$|!)/i.test(lowerMessage)) {
      return `${getContextualGreeting()}! How are you feeling today? I'm here to support your mental wellbeing.`;
    }
    
    if (/how are you|how('s| is) it going|how('re| are) you doing/i.test(lowerMessage)) {
      return "I'm here and ready to help you! As your mental wellness companion, I'm focused on supporting your wellbeing. What's on your mind today?";
    }
    
    if (/thank(s| you)|appreciate it/i.test(lowerMessage)) {
      return "You're very welcome! I'm glad I could help. Is there anything else you'd like to talk about regarding your mental wellness journey?";
    }
    
    if (/what('s| is) your name|who are you/i.test(lowerMessage)) {
      return "I'm Henry, your mental wellness companion. My name stands for Hope, Empathy, Nurturing, Resilience, and You - the core values that guide our conversations. How can I support your wellbeing today?";
    }
    
    if (/weather|rain|sunny|cold|hot|temperature/i.test(lowerMessage) && lowerMessage.length < 30) {
      return "While I can't check the weather, I'm more interested in your internal climate. How are you feeling today? Sometimes our emotional weather can affect our wellbeing more than what's happening outside.";
    }
    
    if (/bye|goodbye|see you|talk (to you )?later/i.test(lowerMessage)) {
      return "Take care! Remember that I'm here whenever you need support. Be gentle with yourself until we talk again.";
    }
    
    if (/help( me)?|can you help|need (some )?advice|feeling (bad|down|sad|depressed|anxious|overwhelmed)/i.test(lowerMessage)) {
      return "I'm here to help. Could you tell me a bit more about what you're experiencing? The more specific you can be, the better I can support you.";
    }
    
    if (/what (can|do) you do|how (can|do) you (help|work)|what are you for/i.test(lowerMessage)) {
      return "I'm designed to support your mental wellbeing in several ways. I can provide resources for stress management, anxiety, and depression, guide you through exercises for mindfulness and relaxation, help you track your mood patterns, and connect you with professional help when needed. What area of mental wellness are you interested in exploring?";
    }
    
    return null;
  };

  return {
    processing,
    emergencyMode,
    processMessage,
    conversationContext
  };
};
