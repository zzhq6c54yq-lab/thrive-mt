
import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const SponsorChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there, I'm Henry, your digital sponsor. I'm here to support you in your recovery journey. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleSponsorResponse = async (userMessage: string) => {
    // Simulate a thinking delay
    setIsLoading(true);
    
    // This would typically be an API call to a language model
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Predefined responses based on common recovery topics
    let response: string;
    
    if (userMessage.toLowerCase().includes("craving") || userMessage.toLowerCase().includes("urge") || userMessage.toLowerCase().includes("relapse")) {
      response = "Cravings and urges are temporary, even though they may not feel like it. Try using the HALT method - ask yourself if you're Hungry, Angry, Lonely, or Tired. Remember your reasons for recovery and reach out to your support network. What specific triggers are you experiencing right now?";
    } else if (userMessage.toLowerCase().includes("meeting") || userMessage.toLowerCase().includes("group")) {
      response = "Meetings are a crucial part of recovery. They provide structure, support, and accountability. I encourage you to attend a meeting today if possible. Would you like me to help you find a meeting near you or online?";
    } else if (userMessage.toLowerCase().includes("step") || userMessage.toLowerCase().includes("steps")) {
      response = "The 12 steps provide a structured path to recovery. Which step are you currently working on? Remember, progress not perfection is what matters.";
    } else if (userMessage.toLowerCase().includes("lonely") || userMessage.toLowerCase().includes("alone")) {
      response = "You're never alone in this journey. Feelings of loneliness are common in recovery, but they will pass. Consider reaching out to someone in your support network or attending a meeting. What specific feelings are coming up for you?";
    } else if (userMessage.toLowerCase().includes("grateful") || userMessage.toLowerCase().includes("gratitude")) {
      response = "Practicing gratitude is powerful in recovery. Even in difficult moments, finding something to be grateful for can shift your perspective. Would you like to share three things you're grateful for today?";
    } else {
      response = "Thank you for sharing. Remember that recovery is a journey, not a destination. Take it one day at a time, and don't hesitate to reach out whenever you need support. Is there anything specific about your recovery that you'd like to discuss?";
    }
    
    setIsLoading(false);
    
    // Add the sponsor's response to the messages
    setMessages((prev) => [
      ...prev,
      {
        id: `sponsor-${Date.now()}`,
        content: response,
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === "") return;
    
    // Add the user's message
    const userMessage = {
      id: `user-${Date.now()}`,
      content: input.trim(),
      role: "user" as const,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Generate the sponsor's response
    await handleSponsorResponse(userMessage.content);
  };

  return (
    <Card className="w-full h-[600px] flex flex-col border border-[#B87333]/20 bg-white/5 backdrop-blur-md">
      <div className="p-4 border-b border-[#B87333]/20 bg-[#B87333]/10">
        <h3 className="text-lg font-medium text-white">Henry - Your Digital Sponsor</h3>
        <p className="text-sm text-gray-300">Available 24/7 to support your recovery journey</p>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-[#B87333] text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center mb-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src="/photo-1485827404703-89b55fcc595e.jpg" alt="Henry" />
                      <AvatarFallback className="bg-[#B87333]/20 h-full w-full flex items-center justify-center text-[#B87333] text-xs">
                        H
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-300">Henry</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block text-right">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-700 text-white">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/photo-1485827404703-89b55fcc595e.jpg" alt="Henry" />
                    <AvatarFallback className="bg-[#B87333]/20 h-full w-full flex items-center justify-center text-[#B87333] text-xs">
                      H
                    </AvatarFallback>
                  </Avatar>
                  <Loader2 className="h-4 w-4 animate-spin text-[#B87333]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-[#B87333]/20">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 h-10 min-h-10 bg-white/5 border-[#B87333]/20 focus-visible:ring-[#B87333] text-white"
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
            disabled={isLoading || input.trim() === ""}
            className="h-10 w-10 bg-[#B87333] hover:bg-[#B87333]/80"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default SponsorChatbot;
