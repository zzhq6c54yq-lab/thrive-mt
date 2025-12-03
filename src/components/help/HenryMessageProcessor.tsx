
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { generateResponse } from './utils/responseGenerator';
import { checkForEmergency } from './utils/messageHelpers';

interface HenryMessageProcessorProps {
  onNewMessage: (message: { text: string; isUser: boolean }) => void;
}

const HenryMessageProcessor: React.FC<HenryMessageProcessorProps> = ({ onNewMessage }) => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const handleSendMessage = (message: string) => {
    // Add user message to chat
    onNewMessage({ text: message, isUser: true });
    
    setProcessing(true);
    
    // Check if this is an emergency situation
    const isEmergency = checkForEmergency(message);
    
    if (isEmergency && !emergencyMode) {
      setEmergencyMode(true);
      
      // Send immediate calming response
      setTimeout(() => {
        const calmingResponse = "I want you to know that I'm here with you right now, and I'm taking what you're saying very seriously. Your feelings are valid, and you're not alone in this moment. I'm going to stay with you while we connect you with a human counselor who can provide the support you need. They're being notified right now, but while we wait, let's focus on the present moment together. Can you tell me your name and where you are right now?";
        
        onNewMessage({ 
          text: calmingResponse, 
          isUser: false 
        });
        
        // Notify about emergency support
        toast({
          title: "Emergency Support Activated",
          description: "Henry has detected a potential crisis situation and is connecting to human support.",
          variant: "destructive",
          duration: 10000,
        });
        
        // Simulate counselor joining after delay
        setTimeout(() => {
          const counselorJoiningMessage = "Hello, I'm Dr. Chris Hopkins, a licensed therapist who's joining this conversation. I appreciate your courage in sharing these difficult feelings. I'd like to work with you directly now to ensure your safety and provide the support you need. Could you share a bit more about what's happening for you right now?";
          
          onNewMessage({ 
            text: counselorJoiningMessage, 
            isUser: false 
          });
          
          toast({
            title: "Human Counselor Connected",
            description: "A mental health professional has joined the conversation.",
            duration: 5000,
          });
          
          setProcessing(false);
        }, 15000);
        
      }, 1000);
    } else {
      // Generate standard response after a slight delay
      setTimeout(() => {
        const response = generateResponse(message);
        
        onNewMessage({ 
          text: response, 
          isUser: false 
        });
        
        toast({
          title: "New message from Henry",
          description: "Henry has responded to your question.",
          duration: 3000,
        });
        
        setProcessing(false);
      }, 1000);
    }
  };

  // Return null since this is a logic component, not a UI component
  return null;
};

// Create a custom hook to use the message processor
export const useHenryMessageProcessor = (
  onNewMessage: (message: { text: string; isUser: boolean }) => void
) => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const handleSendMessage = (message: string) => {
    // Add user message to chat
    onNewMessage({ text: message, isUser: true });
    
    setProcessing(true);
    
    // Check if this is an emergency situation
    const isEmergency = checkForEmergency(message);
    
    if (isEmergency && !emergencyMode) {
      setEmergencyMode(true);
      
      // Send immediate calming response
      setTimeout(() => {
        const calmingResponse = "I want you to know that I'm here with you right now, and I'm taking what you're saying very seriously. Your feelings are valid, and you're not alone in this moment. I'm going to stay with you while we connect you with a human counselor who can provide the support you need. They're being notified right now, but while we wait, let's focus on the present moment together. Can you tell me your name and where you are right now?";
        
        onNewMessage({ 
          text: calmingResponse, 
          isUser: false 
        });
        
        // Notify about emergency support
        toast({
          title: "Emergency Support Activated",
          description: "Henry has detected a potential crisis situation and is connecting to human support.",
          variant: "destructive",
          duration: 10000,
        });
        
        // Simulate counselor joining after delay
        setTimeout(() => {
          const counselorJoiningMessage = "Hello, I'm Dr. Chris Hopkins, a licensed therapist who's joining this conversation. I appreciate your courage in sharing these difficult feelings. I'd like to work with you directly now to ensure your safety and provide the support you need. Could you share a bit more about what's happening for you right now?";
          
          onNewMessage({ 
            text: counselorJoiningMessage, 
            isUser: false 
          });
          
          toast({
            title: "Human Counselor Connected",
            description: "A mental health professional has joined the conversation.",
            duration: 5000,
          });
          
          setProcessing(false);
        }, 15000);
        
      }, 1000);
    } else {
      // Generate standard response after a slight delay
      setTimeout(() => {
        const response = generateResponse(message);
        
        onNewMessage({ 
          text: response, 
          isUser: false 
        });
        
        toast({
          title: "New message from Henry",
          description: "Henry has responded to your question.",
          duration: 3000,
        });
        
        setProcessing(false);
      }, 1000);
    }
  };

  return { handleSendMessage, processing, emergencyMode };
};

export default HenryMessageProcessor;
