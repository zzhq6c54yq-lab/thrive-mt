import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface HelpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onOpenChange, userName }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeOfDay = "";
    
    if (hour < 12) timeOfDay = "morning";
    else if (hour < 17) timeOfDay = "afternoon";
    else timeOfDay = "evening";
    
    return userName 
      ? `Good ${timeOfDay}, ${userName}! I'm Henry (Helpful Electronic Navigator Responding Yes), your Thrive navigator. How can I help you on your journey today?`
      : `Good ${timeOfDay}! I'm Henry (Helpful Electronic Navigator Responding Yes), your Thrive navigator. How can I help you on your journey today?`;
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (open) {
      setMessages([{ text: getGreeting(), isUser: false }]);
    }
  };

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    
    setTimeout(() => {
      const responses = [
        "I'm here to help guide you through Thrive MT. What specific feature are you looking for?",
        "Recovery is a journey, and I'm here to help you navigate it. What can I assist you with today?",
        "Thank you for sharing. Remember, each step forward is progress. How else can I support you?",
        "Thrive MT has many resources available. Would you like to explore our workshops, tools, or support options?",
        "That's a great question. Let me help you find the information you need."
      ];
      
      setMessages(prev => [...prev, { 
        text: responses[Math.floor(Math.random() * responses.length)], 
        isUser: false 
      }]);
      
      toast({
        title: "New message from Henry",
        description: "Henry has responded to your question.",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md sm:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-4">
        <div className="absolute right-2 top-2 z-10">
          <Button 
            className="p-1 h-8 w-8 rounded-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white"
            variant="ghost"
            size="icon"
            onClick={() => handleOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <DialogHeader className="text-center relative mb-4">
          <div className="flex justify-center mb-2">
            <div className="h-14 w-14 rounded-full flex items-center justify-center border-2 border-[#B87333]/50 bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white">
              <span className="text-2xl font-bold">H</span>
            </div>
          </div>
          <DialogTitle className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">Chat with Henry</DialogTitle>
          <DialogDescription className="text-white/70 text-sm">
            Your helpful navigator through Thrive MT
          </DialogDescription>
        </DialogHeader>
        
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
