
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
}

export const useMessageProcessor = (
  addMessage: (message: Message) => void,
  options: MessageProcessorOptions = {}
) => {
  const [processing, setProcessing] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const { toast } = useToast();

  const processMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    addMessage(userMessage);
    setProcessing(true);
    
    // Check for emergency
    const emergency = checkForEmergency(text);
    if (emergency && !emergencyMode) {
      setEmergencyMode(true);
      
      if (options.onEmergencyDetected) {
        options.onEmergencyDetected();
      }
      
      // Emergency response with crisis protocol
      setTimeout(() => {
        const emergencyResponse: Message = {
          text: "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. Would you like me to connect you with our Crisis Support resources?",
          isUser: false,
          timestamp: new Date()
        };
        
        addMessage(emergencyResponse);
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
    
    // Generate response after a small delay to feel more natural
    setTimeout(() => {
      const response = generateResponse(text);
      
      const henryMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      addMessage(henryMessage);
      setProcessing(false);
    }, 1500);
  };

  return {
    processing,
    emergencyMode,
    processMessage
  };
};
