import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Send, Mic, ArrowUp, ArrowDown, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HenryHeader from "./components/HenryHeader";
import MessageList from "@/components/shared/MessageList";
import { useMessageProcessor, Message } from "./hooks/useMessageProcessor";
import { requestHumanSupport } from "@/services/henryMultiAgentService";

interface HenryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

const HenryDialog: React.FC<HenryDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  userName = ""
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [requestingTherapist, setRequestingTherapist] = useState(false);
  const { toast } = useToast();
  const conversationIdRef = useRef<string | null>(null);
  
  // Add a message to the chat
  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };
  
  // Use the centralized message processor
  const { processing, emergencyMode, processMessage } = useMessageProcessor(addMessage);
  
  // Initialize with greeting when dialog opens
  useEffect(() => {
    if (isOpen) {
      const greeting = userName 
        ? `Hi ${userName}! I'm Henry, your mental health companion. How can I assist you today?` 
        : "Hi there! I'm Henry, your mental health companion. How can I assist you today?";
      
      setMessages([{
        text: greeting,
        isUser: false,
        timestamp: new Date()
      }]);
      setScrollPosition(0);
    }
  }, [isOpen, userName]);
  
  // Handle scroll navigation
  const handleScrollUp = () => {
    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollArea) {
      const currentScroll = scrollArea.scrollTop;
      const newScroll = Math.max(0, currentScroll - 100);
      scrollArea.scrollTo({ top: newScroll, behavior: 'smooth' });
      setScrollPosition(newScroll);
    }
  };

  const handleScrollDown = () => {
    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollArea) {
      const currentScroll = scrollArea.scrollTop;
      const maxScroll = scrollArea.scrollHeight - scrollArea.clientHeight;
      const newScroll = Math.min(maxScroll, currentScroll + 100);
      scrollArea.scrollTo({ top: newScroll, behavior: 'smooth' });
      setScrollPosition(newScroll);
    }
  };
  
  // Handle voice recognition
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice recognition not supported",
        description: "Your browser doesn't support voice input. Try typing instead.",
        variant: "destructive"
      });
      return;
    }
    
    setIsListening(true);
    
    // @ts-ignore
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
      handleSendMessage(transcript);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice recognition error",
        description: "There was an error with voice input. Please try again or type your message.",
        variant: "destructive"
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };
  
  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;
    setInputValue("");
    processMessage(text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRequestTherapist = async () => {
    setRequestingTherapist(true);
    
    const result = await requestHumanSupport(conversationIdRef.current || undefined);
    
    if (result.success && result.therapistName) {
      toast({
        title: "Connected to Therapist",
        description: `You're now connected with ${result.therapistName}. They'll respond soon.`,
      });
      
      addMessage({
        text: `I've connected you with ${result.therapistName}, a licensed therapist who can provide professional support. You can find your conversation in the dashboard.`,
        isUser: false,
        timestamp: new Date()
      });
    } else {
      toast({
        title: "Connection Failed",
        description: result.error || "Unable to connect with a therapist. Please try again.",
        variant: "destructive"
      });
    }
    
    setRequestingTherapist(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl h-[85vh] bg-gradient-to-br from-gray-900/95 via-[#1a1a1a]/95 to-gray-900/95 border-[#D4AF37]/20 p-0 flex flex-col overflow-hidden backdrop-blur-xl"
        style={{
          boxShadow: '0 0 50px rgba(212, 175, 55, 0.15)'
        }}
      >
        <div className="flex-shrink-0 px-6 pt-6 pb-4">
          <HenryHeader onClose={() => onOpenChange(false)} />
        </div>

        <div className="absolute right-4 top-16 z-40 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleScrollUp}
            className="rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleScrollDown}
            className="rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden px-6 pb-4">
          <MessageList messages={messages} />
        </div>

        <div className="px-6 py-3 border-t border-white/10">
          <Button
            onClick={handleRequestTherapist}
            disabled={requestingTherapist}
            className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium"
            variant="default"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {requestingTherapist ? 'Connecting...' : 'Talk to a Real Therapist'}
          </Button>
        </div>

        <div className="flex-shrink-0 px-6 py-4 border-t border-white/10 bg-black/20">
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSendMessage("I'm feeling anxious")}
              disabled={processing}
              className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] text-white/80 hover:text-white text-xs"
            >
              I'm feeling anxious
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSendMessage("I need to vent")}
              disabled={processing}
              className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] text-white/80 hover:text-white text-xs"
            >
              Need to vent
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSendMessage("Can you give me coping tips?")}
              disabled={processing}
              className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] text-white/80 hover:text-white text-xs"
            >
              Coping tips
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSendMessage("I'm having a tough day")}
              disabled={processing}
              className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] text-white/80 hover:text-white text-xs"
            >
              Tough day
            </Button>
          </div>

          <div className="flex gap-2">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening..." : "What's on your mind?"}
              disabled={processing || isListening}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 resize-none min-h-[60px] max-h-[120px]"
              rows={2}
            />
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => handleSendMessage()}
                disabled={processing || !inputValue.trim() || isListening}
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-black transition-all"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                onClick={startListening}
                disabled={processing || isListening}
                className="bg-white/5 hover:bg-white/10 text-white transition-all"
                size="icon"
                variant="ghost"
              >
                <Mic className={`h-4 w-4 ${isListening ? 'text-[#D4AF37] animate-pulse' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HenryDialog;
