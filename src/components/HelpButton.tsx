
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";

interface HelpButtonProps {
  userName?: string;
}

const HelpButton: React.FC<HelpButtonProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  
  // Determine if the button should be visible based on the current route
  const shouldShowButton = () => {
    // Exclude initial screens and vision boards
    const excludedPaths = [
      '/initial-screen',
      '/vision-board',
      '/onboarding',
    ];
    
    // Check if current path starts with any of the excluded paths
    return !excludedPaths.some(path => location.pathname.startsWith(path));
  };
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setIsTransitioning(true);
      setPosition({
        x: Math.min(Math.max(e.clientX - 28, 0), window.innerWidth - 56),
        y: Math.min(Math.max(e.clientY - 28, 0), window.innerHeight - 56)
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isTransitioning) {
        requestAnimationFrame(() => updatePosition(e));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTransitioning]);

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
    setIsOpen(open);
    if (open) {
      setMessages([{ text: getGreeting(), isUser: false }]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);
    
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
    
    setInput("");
  };

  // If we shouldn't show the button, return null
  if (!shouldShowButton()) return null;

  return (
    <>
      <Button
        onClick={() => handleOpenChange(true)} 
        className="fixed h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
        size="icon"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.3s ease-out'
        }}
        onTransitionEnd={() => setIsTransitioning(false)}
      >
        <span className="text-2xl font-bold">H</span>
      </Button>
      
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
          
          <ScrollArea className="h-[300px] overflow-auto pr-4 mb-3">
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
    </>
  );
};

export default HelpButton;
