
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
        text: "Hello! I'm Henry. I hope your day has been as amazing as you are. How can I help you navigate your journey today?", 
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
      <DialogContent className="sm:max-w-md sm:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-4" size="small">
        <div className="absolute right-2 top-2 z-10">
          <Button 
            className="p-1 h-8 w-8 rounded-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-center relative mb-4">
          <div className="flex justify-center mb-2">
            <div className="h-14 w-14 rounded-full flex items-center justify-center border-2 border-[#B87333]/50 bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white">
              <span className="text-2xl font-bold">H</span>
            </div>
          </div>
          <h2 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">
            Help Navigation
          </h2>
          <p className="text-white/70 text-sm">
            Ask me anything about the site
          </p>
        </div>
        
        <ScrollArea className="h-[300px] overflow-auto pr-4 mb-3" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-[#B87333] text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {!message.isUser && (
                    <div className="flex items-center mb-1">
                      <div className="h-6 w-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white mr-2">
                        <span className="text-xs font-bold">H</span>
                      </div>
                      <span className="text-xs text-white/70">Henry</span>
                    </div>
                  )}
                  <p className="text-sm">{message.text}</p>
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
            className="flex-1 min-h-[40px] bg-white/5 border-[#B87333]/20 focus-visible:ring-[#B87333] text-white text-sm"
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
            className="h-10 w-10 bg-[#B87333] hover:bg-[#B87333]/80"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HelpChatDialog;
