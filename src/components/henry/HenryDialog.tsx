
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Brain, Heart, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MessageList from "../help/MessageList";
import MessageInput from "../help/MessageInput";

interface HenryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

const HenryDialog: React.FC<HenryDialogProps> = ({ isOpen, onOpenChange, userName }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mental health knowledge base for Henry
  const knowledgeBase = {
    "anxiety": "Anxiety is a normal response to stress, but when it becomes excessive, it may be an anxiety disorder. Deep breathing, mindfulness, and seeking professional help are effective approaches.",
    "depression": "Depression is more than just feeling sad. It's a persistent feeling of sadness or loss of interest that can interfere with daily activities. Professional support is important.",
    "stress": "Stress is your body's reaction to pressure from a situation or event. Managing stress through exercise, meditation, and social connections can improve your wellbeing.",
    "therapy": "Therapy provides a safe space to explore feelings, beliefs, and behaviors with a trained professional. There are many types available based on your specific needs.",
    "meditation": "Meditation is a mindfulness practice that can help reduce stress, improve focus, and promote emotional wellbeing. Even a few minutes daily can make a difference.",
    "suicide": "If you're having thoughts of suicide, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line. Help is available 24/7.",
    "crisis": "If you're experiencing a mental health crisis, please call 988 for immediate support, or text HOME to 741741. You can also visit our Crisis Support page for resources.",
    "workshops": "Our workshops offer interactive learning experiences on various mental health topics. You can find topics ranging from anxiety management to building resilience.",
    "community": "Connecting with others who understand what you're going through can be healing. Our Community Support section offers forums and group chats.",
    "resources": "We have a variety of self-help resources available, including guides, workbooks, and interactive tools to support your mental wellness journey.",
    "tools": "Our Mental Wellness Tools include mood tracking, journaling prompts, guided meditations, and cognitive behavioral therapy exercises.",
    "sleep": "Quality sleep is essential for mental health. Our Mindfulness & Sleep section has resources to help improve your sleep habits.",
    "exercise": "Physical activity can significantly improve mood and reduce anxiety and depression. Even a short daily walk can be beneficial."
  };

  // Navigation knowledge base
  const navigationHelp = {
    "workshops": "Let me take you to our Workshops section, where you'll find interactive mental health resources.",
    "community": "I'll show you to our Community Support section, where you can connect with others.",
    "tools": "Let me direct you to our Mental Wellness Tools, which offer practical resources for self-help.",
    "crisis": "I'll take you to our Crisis Support resources right away.",
    "therapist": "Let me help you find a therapist through our matching service.",
    "games": "I can show you our Mental Health Games section for fun, interactive ways to build skills.",
    "progress": "Let's check your Progress Reports to see how your journey is going.",
    "profile": "I'll take you to your User Profile where you can update your information.",
    "settings": "Let me show you to the User Settings page where you can customize your experience."
  };

  // Emergency services referral responses
  const emergencyResponses = {
    "suicidal": "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 right away. Would you like me to navigate you to our Crisis Support page?",
    "emergency": "This sounds like an emergency situation. Please call 911 immediately. Would you like me to direct you to our Crisis Support resources as well?",
    "crisis": "I understand you're going through a difficult time. The Crisis Text Line is available 24/7 - text HOME to 741741 to connect with a counselor. Would you like me to take you to our Crisis Support page?",
    "harm": "Your safety is important. If you're thinking about harming yourself or others, please call 988 or go to your nearest emergency room. Would you like me to show you our Crisis Support resources?"
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = "";
    
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 17) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";
    
    return userName 
      ? `${timeGreeting}, ${userName}! I'm Henry, your digital mental health counselor. I'm here to help you navigate Thrive MT and support your mental wellness journey. How can I assist you today?`
      : `${timeGreeting}! I'm Henry, your digital mental health counselor. I'm here to help you navigate Thrive MT and support your mental wellness journey. How can I assist you today?`;
  };

  useEffect(() => {
    // Reset messages when dialog opens
    if (isOpen) {
      setMessages([{ text: getGreeting(), isUser: false }]);
    }
  }, [isOpen, userName]);

  const checkForEmergency = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("kill myself") || 
        lowerMessage.includes("suicide") || 
        lowerMessage.includes("end my life") ||
        lowerMessage.includes("don't want to live")) {
      return "suicidal";
    }
    
    if (lowerMessage.includes("emergency") || 
        lowerMessage.includes("need help now") ||
        lowerMessage.includes("urgent")) {
      return "emergency";
    }
    
    if (lowerMessage.includes("crisis") || 
        lowerMessage.includes("breakdown") ||
        lowerMessage.includes("panic attack")) {
      return "crisis";
    }
    
    if (lowerMessage.includes("hurt myself") || 
        lowerMessage.includes("harm myself") ||
        lowerMessage.includes("hurt someone")) {
      return "harm";
    }
    
    return null;
  };

  const generateResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for emergency first
    const emergencyType = checkForEmergency(message);
    if (emergencyType) {
      return emergencyResponses[emergencyType];
    }
    
    // Check for navigation requests
    if (lowerMessage.includes("take me to") || 
        lowerMessage.includes("go to") || 
        lowerMessage.includes("navigate to") ||
        lowerMessage.includes("show me")) {
      
      for (const [key, value] of Object.entries(navigationHelp)) {
        if (lowerMessage.includes(key)) {
          return value;
        }
      }
    }
    
    // Check knowledge base for mental health topics
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    
    // Default responses if no matches
    const defaultResponses = [
      "I'm here to support your mental wellness journey. Could you tell me more about what you're looking for?",
      "I'd be happy to help with that. Is there a specific area of mental wellness you'd like to explore?",
      "Thank you for sharing that with me. How can I best support you right now?",
      "I'm here to help you navigate Thrive MT. What specific resources or information would be most helpful?",
      "That's a great question. Let me help guide you to the resources that might be most beneficial for you."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const navigateToSection = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("workshop")) {
      navigate("/workshops");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("community") || lowerMessage.includes("forum") || lowerMessage.includes("chat")) {
      navigate("/community-support");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("tool")) {
      navigate("/mental-wellness-tools");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("crisis") || lowerMessage.includes("emergency")) {
      navigate("/crisis-support");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("therapist")) {
      navigate("/therapist-questionnaire");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("game")) {
      navigate("/mental-health-games");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("progress")) {
      navigate("/progress-reports");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("profile")) {
      navigate("/user-profile");
      onOpenChange(false);
      return true;
    } 
    
    if (lowerMessage.includes("setting")) {
      navigate("/user-settings");
      onOpenChange(false);
      return true;
    }
    
    return false;
  };

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    
    // Check for direct navigation commands
    setTimeout(() => {
      if (message.toLowerCase().includes("take me to") || 
          message.toLowerCase().includes("go to") || 
          message.toLowerCase().includes("navigate to")) {
        
        if (navigateToSection(message)) {
          return;
        }
      }
      
      // Generate standard response
      const response = generateResponse(message);
      
      setMessages(prev => [...prev, { 
        text: response, 
        isUser: false 
      }]);
      
      toast({
        title: "New message from Henry",
        description: "Henry has responded to your question.",
        duration: 3000,
      });
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(`Tell me about ${action}`);
  };

  const handleGotIt = () => {
    onOpenChange(false);
    toast({
      title: "Henry will be here when you need him",
      description: "Click the H button anytime for support and guidance",
      duration: 2000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-3 max-h-[80vh] overflow-hidden"
        size="small"
      >
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
        
        <DialogHeader className="text-center relative mb-3">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full flex items-center justify-center border-2 border-[#B87333]/50 bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white">
              <span className="text-xl font-bold">H</span>
            </div>
          </div>
          <DialogTitle className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">Henry, Your Digital Counselor</DialogTitle>
          <DialogDescription className="text-white/70 text-xs">
            Supporting your mental wellness journey
          </DialogDescription>
          <div className="mt-1 text-xs text-white/60 px-2 flex items-center justify-center gap-2">
            <Heart className="h-3 w-3 text-[#B87333]" />
            <Brain className="h-3 w-3 text-[#B87333]" />
            <MessageCircle className="h-3 w-3 text-[#B87333]" />
          </div>
        </DialogHeader>
        
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
        
        <div className="mt-3 flex flex-wrap gap-1 justify-center">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleQuickAction("anxiety")}
          >
            Anxiety <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleQuickAction("depression")}
          >
            Depression <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleQuickAction("stress")}
          >
            Stress <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleQuickAction("workshops")}
          >
            Workshops <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white w-1/2"
            onClick={handleGotIt}
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HenryDialog;
