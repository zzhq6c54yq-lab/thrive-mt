
import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bell, BellOff, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

type CheckinConfig = {
  frequency: number; // minutes
  enabled: boolean;
  lastCheckin?: Date;
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
  const [checkinConfig, setCheckinConfig] = useState<CheckinConfig>({
    frequency: 30, // 30 minutes
    enabled: true,
    lastCheckin: new Date(),
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const checkinTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  // Setup Henry's proactive check-ins
  useEffect(() => {
    if (checkinConfig.enabled) {
      if (checkinTimerRef.current) {
        clearInterval(checkinTimerRef.current);
      }
      
      checkinTimerRef.current = setInterval(() => {
        const now = new Date();
        const lastCheck = checkinConfig.lastCheckin || new Date(0);
        const minutesSinceLastCheck = (now.getTime() - lastCheck.getTime()) / (1000 * 60);
        
        if (minutesSinceLastCheck >= checkinConfig.frequency) {
          triggerHenryCheckIn();
        }
      }, 60000); // Check every minute
    } else if (checkinTimerRef.current) {
      clearInterval(checkinTimerRef.current);
    }
    
    return () => {
      if (checkinTimerRef.current) {
        clearInterval(checkinTimerRef.current);
      }
    };
  }, [checkinConfig]);

  const triggerHenryCheckIn = () => {
    const checkInMessages = [
      "Just checking in - how are you doing right now? Remember, I'm here anytime you need to talk.",
      "How's your day going? It's important to check in with yourself regularly.",
      "I wanted to see how you're feeling. Any thoughts or challenges you'd like to share?",
      "Recovery is a journey with ups and downs. How are you navigating today?",
      "Taking a moment to check in - how are things going with your recovery goals today?",
      "Remember, small steps are still progress. How are you feeling about your journey today?",
    ];
    
    const randomMessage = checkInMessages[Math.floor(Math.random() * checkInMessages.length)];
    
    // Add the sponsor's response to the messages
    setMessages((prev) => [
      ...prev,
      {
        id: `sponsor-checkin-${Date.now()}`,
        content: randomMessage,
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
    
    // Update last check-in time
    setCheckinConfig(prev => ({
      ...prev,
      lastCheckin: new Date()
    }));
    
    // Also show a toast notification
    toast({
      title: "Henry Check-In",
      description: "Henry has checked in with a new message",
      duration: 5000,
      action: (
        <div className="flex items-center gap-1">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-xs">Support</span>
        </div>
      ),
    });
  };

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
    
    // Reset check-in timer since user and Henry just interacted
    setCheckinConfig(prev => ({
      ...prev,
      lastCheckin: new Date()
    }));
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

  const toggleCheckins = () => {
    setCheckinConfig(prev => ({
      ...prev,
      enabled: !prev.enabled,
      lastCheckin: new Date() // Reset the timer
    }));
    
    toast({
      title: checkinConfig.enabled ? "Check-ins Disabled" : "Check-ins Enabled",
      description: checkinConfig.enabled 
        ? "Henry will no longer send you periodic check-ins" 
        : "Henry will check in with you periodically",
    });
  };

  return (
    <Card className="w-full h-[600px] flex flex-col border border-[#B87333]/20 bg-white/5 backdrop-blur-md">
      <div className="p-4 border-b border-[#B87333]/20 bg-[#B87333]/10 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-white">Henry - Your Digital Sponsor</h3>
          <p className="text-sm text-gray-300">Available 24/7 to support your recovery journey</p>
        </div>
        <div className="flex items-center gap-2">
          {checkinConfig.enabled ? (
            <Bell className="h-4 w-4 text-[#B87333]" />
          ) : (
            <BellOff className="h-4 w-4 text-gray-400" />
          )}
          <Switch 
            checked={checkinConfig.enabled}
            onCheckedChange={toggleCheckins}
          />
        </div>
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
                      <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
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
                    <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
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
