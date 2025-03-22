
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MessageList from "@/components/shared/MessageList"; // Updated import path
import MessageInput from "./help/MessageInput";
import { useMessageProcessor, Message } from "@/components/henry/hooks/useMessageProcessor";

interface HelpChatDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpChatDialog: React.FC<HelpChatDialogProps> = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  
  // Add a message to the chat
  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };
  
  // Use the centralized message processor
  const { processing, emergencyMode, processMessage } = useMessageProcessor(addMessage);
  
  useEffect(() => {
    // Reset messages when dialog opens
    if (isOpen) {
      setMessages([{
        text: "Hi there! I'm Henry, your digital counselor. How can I assist you today?",
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  const handleSendMessage = (message: string) => {
    processMessage(message);
    
    toast({
      title: "New message from Henry",
      description: "Henry has responded to your question.",
      duration: 3000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-3 max-h-[80vh] overflow-hidden"
      >
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">
            Henry, Your Digital Counselor
          </DialogTitle>
        </DialogHeader>
        
        <MessageList 
          messages={messages} 
          showTypingIndicator={processing}
        />
        
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isProcessing={processing} 
        />
        
        <div className="mt-4 flex justify-center">
          <Button
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-1/2"
            onClick={() => onOpenChange(false)}
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpChatDialog;
