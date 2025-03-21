
import { useState, useEffect } from "react";
import { useMessageProcessor, Message } from "./useMessageProcessor";

interface HenryChatOptions {
  userName?: string;
  onOpenChange?: (open: boolean) => void;
}

export const useHenryChat = ({ userName = "", onOpenChange }: HenryChatOptions) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Add a message to the chat
  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };
  
  // Use the centralized message processor
  const { processing, emergencyMode, processMessage } = useMessageProcessor(addMessage);
  
  // Initialize with greeting
  useEffect(() => {
    const greeting = userName 
      ? `Hi ${userName}! I'm Henry, your mental health companion. How can I assist you today?` 
      : "Hi there! I'm Henry, your mental health companion. How can I assist you today?";
    
    setMessages([{
      text: greeting,
      isUser: false,
      timestamp: new Date()
    }]);
  }, [userName]);
  
  const handleSendMessage = (text: string) => {
    processMessage(text);
  };
  
  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };
  
  const handleGotIt = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };
  
  return {
    messages,
    processing,
    emergencyMode,
    handleSendMessage,
    handleQuickAction,
    handleGotIt
  };
};

export default useHenryChat;
