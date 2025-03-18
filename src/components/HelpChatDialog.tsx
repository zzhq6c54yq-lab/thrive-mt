
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";

interface HelpChatDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpChatDialog: React.FC<HelpChatDialogProps> = ({ 
  isOpen,
  onOpenChange
}) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ 
        text: "Hello! I'm Henry (Helpful Electronic Navigator Responding Yes). I hope your day has been as amazing as you are. How can I help you navigate your journey today?", 
        isUser: false 
      }]);
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    
    // Simulate Henry's response
    setTimeout(() => {
      const responses = [
        "I'm here to help guide you through Thrive MT. What specific feature are you looking for?",
        "I'm happy to assist with navigating the site. What would you like to explore?",
        "Thank you for reaching out. What information can I provide to help you get the most out of Thrive MT?",
        "Is there a specific resource or feature you're interested in learning more about?",
        "I'm here to make your experience better. How else can I support you today?"
      ];
      
      setMessages(prev => [...prev, { 
        text: responses[Math.floor(Math.random() * responses.length)], 
        isUser: false 
      }]);
    }, 1000);
    
    setInput("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md sm:w-[350px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-3" size="small">
        <div className="absolute right-2 top-2 z-10">
          <Button 
            className="p-1 h-6 w-6 rounded-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="text-center relative mb-3">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full flex items-center justify-center border-2 border-[#B87333]/50 bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white">
              <span className="text-xl font-bold">H</span>
            </div>
          </div>
          <h2 className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">
            Help Navigation
          </h2>
          <p className="text-white/70 text-xs">
            Ask me anything about the site
          </p>
        </div>
        
        <ScrollArea className="h-[250px] overflow-auto pr-3 mb-2" ref={scrollAreaRef}>
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-2 ${
                    message.isUser
                      ? "bg-[#B87333] text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {!message.isUser && (
                    <div className="flex items-center mb-1">
                      <div className="h-5 w-5 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white mr-1">
                        <span className="text-xs font-bold">H</span>
                      </div>
                      <span className="text-xs text-white/70">Henry</span>
                    </div>
                  )}
                  <p className="text-xs">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSendMessage} className="flex gap-2 mt-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[36px] max-h-[60px] bg-white/5 border-[#B87333]/20 focus-visible:ring-[#B87333] text-white text-xs py-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon"
            className="h-8 w-8 bg-[#B87333] hover:bg-[#B87333]/80"
          >
            <Send className="h-3 w-3" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HelpChatDialog;
