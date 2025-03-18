import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface HelpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onOpenChange, userName }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const navigate = useNavigate();

  // Knowledge base for Henry responses
  const knowledgeBase = {
    "workshop": "Workshops offer interactive learning experiences on mental health topics. You can join live or recorded sessions, with exercises and resources.",
    "community": "The Community Support section lets you connect with others in forums and chat groups based on specific mental health topics.",
    "tools": "Mental Wellness Tools provides resources for anxiety, depression, stress management, and more. Try guided meditations, journaling, or mood tracking.",
    "sponsor": "Your sponsor provides personal support on your mental health journey. You can chat with them and schedule meetings.",
    "therapist": "Find a therapist through our matching system. Fill out a questionnaire about your needs and preferences to get personalized matches.",
    "games": "Mental Health Games provide fun, interactive ways to practice coping skills and mindfulness techniques.",
    "progress": "Track your mental wellness journey with Progress Reports that show your mood trends, workshop completion, and goal achievement.",
    "navigate": "Use the Home button to return to the main dashboard. The arrows help you scroll through content on the page.",
    "meetings": "Virtual Meetings connect you with mental health professionals and support groups in real-time video sessions.",
    "help": "I'm Henry, your guide through Thrive MT. Ask me anything about mental wellness or how to use the platform!",
    "henry": "My name is H.E.N.R.Y., which stands for:\n- Hope: Embracing the belief that positive change is possible\n- Empathy: Cultivating understanding for yourself and others\n- Nurturing: Providing support and encouragement\n- Resilience: Building strength to face challenges\n- You: Focusing on your unique mental wellness journey"
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeOfDay = "";
    
    if (hour < 12) timeOfDay = "morning";
    else if (hour < 17) timeOfDay = "afternoon";
    else timeOfDay = "evening";
    
    return userName 
      ? `Good ${timeOfDay}, ${userName}! I'm H.E.N.R.Y., your Thrive navigator. Hope, Empathy, Nurturing, Resilience, and You - that's what I'm here for. How can I help you on your journey today?`
      : `Good ${timeOfDay}! I'm H.E.N.R.Y., your Thrive navigator. Hope, Empathy, Nurturing, Resilience, and You - that's what I'm here for. How can I help you on your journey today?`;
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (open) {
      setMessages([{ text: getGreeting(), isUser: false }]);
    }
  };

  const generateResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific questions about Henry's name
    if (lowerMessage.includes("what does h.e.n.r.y. stand for") || 
        lowerMessage.includes("what does henry stand for") || 
        lowerMessage.includes("meaning of henry") || 
        lowerMessage.includes("henry acronym") || 
        lowerMessage.includes("what's henry")) {
      return knowledgeBase["henry"];
    }
    
    // Check if message contains keywords from our knowledge base
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Navigation assistance
    if (lowerMessage.includes("go to") || lowerMessage.includes("find") || lowerMessage.includes("where")) {
      if (lowerMessage.includes("workshop")) {
        return "I can take you to our Workshops section. Would you like to go there now?";
      } else if (lowerMessage.includes("community") || lowerMessage.includes("chat") || lowerMessage.includes("forum")) {
        return "Our Community Support section has forums and chat groups. Would you like me to navigate you there?";
      } else if (lowerMessage.includes("tool")) {
        return "Our Mental Wellness Tools section has resources for various mental health needs. Would you like to explore them?";
      }
    }
    
    // Default responses if no keywords match
    const defaultResponses = [
      "I'm here to help guide you through Thrive MT. What specific feature are you looking for?",
      "Recovery is a journey, and I'm here to help you navigate it. What can I assist you with today?",
      "Thank you for sharing. Remember, each step forward is progress. How else can I support you?",
      "Thrive MT has many resources available. Would you like to explore our workshops, tools, or support options?",
      "That's a great question. Let me help you find the information you need."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const navigateToSection = (section: string) => {
    if (section === "workshop" || section === "workshops") {
      navigate("/workshops");
      onOpenChange(false);
    } else if (section === "community" || section === "chat" || section === "forum") {
      navigate("/community-support");
      onOpenChange(false);
    } else if (section === "tools") {
      navigate("/mental-wellness-tools");
      onOpenChange(false);
    } else if (section === "therapist") {
      navigate("/therapist-questionnaire");
      onOpenChange(false);
    }
  };

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    
    // Check for navigation commands
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("take me to") || lowerMessage.includes("go to")) {
      if (lowerMessage.includes("workshop")) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            text: "Taking you to the Workshops section now.", 
            isUser: false 
          }]);
          
          setTimeout(() => navigateToSection("workshops"), 1000);
        }, 500);
        return;
      } else if (lowerMessage.includes("community") || lowerMessage.includes("chat") || lowerMessage.includes("forum")) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            text: "Taking you to the Community Support section now.", 
            isUser: false 
          }]);
          
          setTimeout(() => navigateToSection("community"), 1000);
        }, 500);
        return;
      }
    }
    
    // Generate normal response
    setTimeout(() => {
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

  const handleGotIt = () => {
    onOpenChange(false);
    toast({
      title: "Chat closed",
      description: "You can always open it again by clicking the help button",
      duration: 2000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-3 max-h-[80vh] overflow-hidden"
        size="small"
      >
        <div className="absolute right-2 top-2 z-10">
          <Button 
            className="p-1 h-6 w-6 rounded-full bg-transparent hover:bg-white/10 text-white/70 hover:text-white"
            variant="ghost"
            size="icon"
            onClick={() => handleOpenChange(false)}
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
          <DialogTitle className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">Chat with H.E.N.R.Y.</DialogTitle>
          <DialogDescription className="text-white/70 text-xs">
            Your helpful navigator through Thrive MT
          </DialogDescription>
          <div className="mt-1 text-xs text-white/60 px-2">
            <p className="text-[10px]">H.E.N.R.Y. stands for:</p>
            <p className="text-[10px]"><span className="text-[#B87333] font-bold">H</span>ope • <span className="text-[#B87333] font-bold">E</span>mpathy • <span className="text-[#B87333] font-bold">N</span>urturing • <span className="text-[#B87333] font-bold">R</span>esilience • <span className="text-[#B87333] font-bold">Y</span>ou</p>
          </div>
        </DialogHeader>
        
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
        
        <div className="mt-3 flex flex-wrap gap-1 justify-center">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleSendMessage("Tell me about workshops")}
          >
            Workshops <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleSendMessage("Tell me about community support")}
          >
            Community <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleSendMessage("How do I find tools?")}
          >
            Tools <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
            onClick={() => handleSendMessage("How do I track progress?")}
          >
            Progress <ArrowRight className="ml-1 h-3 w-3" />
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

export default HelpDialog;
