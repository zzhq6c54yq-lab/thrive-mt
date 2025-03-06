
import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Brain, Heart, HandHeart, Activity, Smile } from "lucide-react";
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

interface SponsorChatbotProps {
  selectedMood?: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  selectedQualities?: string[];
  selectedGoals?: string[];
  contextType?: 'general' | 'recovery' | 'mental_health';
  className?: string;
}

const SponsorChatbot: React.FC<SponsorChatbotProps> = ({ 
  selectedMood = null, 
  selectedQualities = [], 
  selectedGoals = [],
  contextType = 'general',
  className = ""
}) => {
  // Set initial message based on context and user preferences
  const getInitialMessage = () => {
    if (contextType === 'recovery') {
      return "Hi there, I'm Henry, your digital sponsor. I'm here to support you in your recovery journey. How can I help you today?";
    }
    
    if (contextType === 'mental_health') {
      return "Hello! I'm H.E.N.R.Y., your mental health navigator.\n\nH - Hope: Cultivating a sense of hope for resilience\nE - Emotional Awareness: Understanding your emotions\nN - Nurturing Relationships: Building supportive connections\nR - Resilience: Developing ability to bounce back\nY - You Matter: You're valuable and deserving of care\n\nHow can I help navigate your mental health journey today?";
    }
    
    let greeting = "Hello! I'm H.E.N.R.Y., your mental health companion. ";
    
    if (selectedMood) {
      switch(selectedMood) {
        case 'happy':
          greeting += "I'm glad you're feeling happy today! How can I help you maintain this positive energy?";
          break;
        case 'ok':
          greeting += "Even on just okay days, I'm here to listen and support you. What's on your mind?";
          break;
        case 'neutral':
          greeting += "I'm here for you, whether your day is going well or you need some extra support. How can I assist you today?";
          break;
        case 'down':
          greeting += "On the days when you're feeling down, remember you're not alone. What's troubling you?";
          break;
        case 'sad':
          greeting += "I see you're having a difficult day. Remember, it's okay to not be okay, and I'm here to support you. Would you like to talk about what's going on?";
          break;
        case 'overwhelmed':
          greeting += "When everything feels like too much, I'm here to help you find your center again. What's overwhelming you right now?";
          break;
        default:
          greeting += "How are you feeling today, and how can I support you?";
      }
    } else {
      greeting += "How are you feeling today, and how can I support you?";
    }
    
    return greeting;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: getInitialMessage(),
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

  const handleHenryResponse = async (userMessage: string) => {
    // Simulate a thinking delay
    setIsLoading(true);
    
    // This would typically be an API call to a language model
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    let response: string;
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check for mental health tool navigation requests
    if (lowerCaseMessage.includes("tool") || lowerCaseMessage.includes("resource") || lowerCaseMessage.includes("help with")) {
      response = "I can help you find mental health tools! ThriveMT offers several categories:\n\n• Mood trackers\n• Meditation guides\n• CBT exercises\n• Journaling tools\n• Breathwork exercises\n\nWhich area would you like to explore?";
    }
    // Check if asking about HENRY acronym
    else if (lowerCaseMessage.includes("henry") && (lowerCaseMessage.includes("acronym") || lowerCaseMessage.includes("stand for") || lowerCaseMessage.includes("mean"))) {
      response = "My name HENRY stands for:\n\nH - Hope: Cultivating a sense of hope for recovery and resilience\nE - Emotional Awareness: Understanding and recognizing your emotions\nN - Nurturing Relationships: Building supportive connections\nR - Resilience: Developing the ability to bounce back from challenges\nY - You Matter: Remembering that you are valuable and deserving of care\n\nHow can I help you with any of these aspects today?";
    }
    // Check if user is mentioning any emotions or mental health concerns
    else if (lowerCaseMessage.includes("anxious") || lowerCaseMessage.includes("anxiety") || lowerCaseMessage.includes("stressed")) {
      response = "Anxiety and stress are common experiences. I can suggest some helpful tools in our app:\n\n1. Try our guided breathing exercises in the Wellness Tools section\n2. The 5-4-3-2-1 grounding technique can help: acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.\n3. Our mood journal can help you track anxiety triggers\n\nWould you like me to guide you to any of these resources?";
    } 
    // Handle recovery-specific topics if in recovery context
    else if (contextType === 'recovery' && (lowerCaseMessage.includes("craving") || lowerCaseMessage.includes("urge") || lowerCaseMessage.includes("relapse"))) {
      response = "Cravings and urges are temporary, even though they may not feel like it. Try using the HALT method - ask yourself if you're Hungry, Angry, Lonely, or Tired. Remember your reasons for recovery and reach out to your support network. What specific triggers are you experiencing right now?";
    }
    // Check if talking about mood or emotions 
    else if (lowerCaseMessage.includes("sad") || lowerCaseMessage.includes("depressed") || lowerCaseMessage.includes("down")) {
      response = "I'm sorry to hear you're feeling this way. Our app has several tools that might help:\n\n1. Guided meditation for emotional balance\n2. Mood tracking to identify patterns\n3. Gratitude exercises to shift perspective\n\nWould you like me to guide you to one of these tools? Or would you prefer to talk more about what you're experiencing?";
    }
    // Check if discussing relationships
    else if (lowerCaseMessage.includes("relationship") || lowerCaseMessage.includes("friend") || lowerCaseMessage.includes("family")) {
      response = "Relationships significantly impact our mental health. Our app includes resources on:\n\n1. Setting healthy boundaries\n2. Effective communication techniques\n3. Building support networks\n\nWould you like to explore any of these areas?";
    }
    // Check if mentioning sleep issues
    else if (lowerCaseMessage.includes("sleep") || lowerCaseMessage.includes("insomnia") || lowerCaseMessage.includes("tired")) {
      response = "Sleep is crucial for mental health. Our app includes helpful sleep resources:\n\n1. Sleep meditation guides\n2. Evening routine builder\n3. Sleep hygiene checklist\n\nWould you like me to show you these tools?";
    }
    // Check if user wants to talk to real person
    else if (lowerCaseMessage.includes("therapist") || lowerCaseMessage.includes("counselor") || lowerCaseMessage.includes("real person")) {
      response = "If you'd like to connect with a human therapist, I can guide you to our therapist matching feature. ThriveMT can help you find qualified professionals who match your preferences and needs. Would you like me to navigate you there?";
    }
    // Default supportive response with navigation suggestion
    else {
      response = "Thank you for sharing that with me. Based on what you've mentioned, I can help navigate you to relevant resources in our app. Would you like to explore:\n\n1. Self-guided exercises\n2. Community support options\n3. Educational content\n4. Crisis resources\n\nWhat would be most helpful right now?";
    }
    
    setIsLoading(false);
    
    // Add Henry's response to the messages
    setMessages((prev) => [
      ...prev,
      {
        id: `henry-${Date.now()}`,
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
    
    // Generate Henry's response
    await handleHenryResponse(userMessage.content);
  };

  // Icons for mental health navigation
  const getRandomIcon = () => {
    const icons = [
      <Brain className="h-6 w-6 text-[#B87333]" />,
      <Heart className="h-6 w-6 text-[#B87333]" />,
      <HandHeart className="h-6 w-6 text-[#B87333]" />,
      <Activity className="h-6 w-6 text-[#B87333]" />,
      <Smile className="h-6 w-6 text-[#B87333]" />
    ];
    
    return icons[Math.floor(Math.random() * icons.length)];
  };

  return (
    <Card className={`w-full h-[600px] flex flex-col border border-[#B87333]/20 bg-white/5 backdrop-blur-md ${className}`}>
      <div className="p-4 border-b border-[#B87333]/20 bg-[#B87333]/10">
        <h3 className="text-lg font-medium text-white">H.E.N.R.Y. - Your Mental Health Navigator</h3>
        <p className="text-sm text-gray-300">Available 24/7 to guide your wellbeing journey</p>
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
                    <Avatar className="h-6 w-6 mr-2 ring-2 ring-[#B87333] bg-[#B87333]/20">
                      <AvatarFallback className="bg-[#B87333]/20 h-full w-full flex items-center justify-center text-[#B87333] text-xs">
                        {getRandomIcon()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-[#B87333]">Henry</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{message.content}</p>
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
                  <Avatar className="h-6 w-6 mr-2 ring-2 ring-[#B87333] bg-[#B87333]/20">
                    <AvatarFallback className="bg-[#B87333]/20 h-full w-full flex items-center justify-center text-[#B87333] text-xs">
                      <Brain className="h-6 w-6 text-[#B87333]" />
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
