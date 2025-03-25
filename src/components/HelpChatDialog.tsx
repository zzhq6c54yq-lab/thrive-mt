
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Send, Mic, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MessageList from "@/components/shared/MessageList";
import { useMessageProcessor, Message } from "./henry/hooks/useMessageProcessor";

interface HelpChatDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

const HelpChatDialog: React.FC<HelpChatDialogProps> = ({
  isOpen,
  onOpenChange,
  userName = ""
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  
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
    }
  }, [isOpen, userName]);
  
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
    
    // @ts-ignore - WebkitSpeechRecognition is not in the TypeScript types
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/90 backdrop-blur-md border border-[#B87333]/50 p-3 max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#B87333]/20">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 border-2 border-[#B87333]/30">
              <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
              <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold">H</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white text-sm font-medium">Henry</h3>
              <p className="text-[#B87333] text-xs">Your Mental Health Companion</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8 rounded-full text-white/70 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Messages Area */}
        <MessageList 
          messages={messages} 
          showTypingIndicator={processing}
        />
        
        {/* Input Area */}
        <div className={`relative mt-2 ${emergencyMode ? 'border border-red-500 rounded-md p-1' : ''}`}>
          {emergencyMode && (
            <div className="bg-red-500/10 text-red-400 p-2 rounded-md mb-2 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-xs">Crisis support activated. Henry can help connect you to professional resources.</span>
            </div>
          )}
          <div className="flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-[#2A2A2A] text-white border-none rounded-md p-3 focus:ring-2 focus:ring-[#B87333]/50 resize-none max-h-20 min-h-[40px]"
              rows={1}
              disabled={processing || isListening}
            />
            <div className="flex gap-1">
              <Button
                type="button"
                onClick={startListening}
                disabled={processing || isListening}
                className={`rounded-full w-10 h-10 flex items-center justify-center ${
                  isListening ? 'bg-red-500 animate-pulse' : 'bg-[#B87333]'
                }`}
                size="icon"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || processing}
                className="rounded-full w-10 h-10 flex items-center justify-center bg-[#B87333]"
                size="icon"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpChatDialog;
