
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Send, Mic, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HenryHeader from "./components/HenryHeader";
import { useMessageProcessor, Message } from "./hooks/useMessageProcessor";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
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
        <HenryHeader onClose={() => onOpenChange(false)} />
        
        {/* Messages Area */}
        <div className="flex flex-col space-y-4 py-3 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-[#B87333]/20 scrollbar-track-transparent pr-2">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  message.isUser 
                    ? 'bg-[#B87333] text-white rounded-tr-none' 
                    : 'bg-[#2A2A2A] text-white rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          ))}
          {processing && (
            <div className="flex justify-start">
              <div className="bg-[#2A2A2A] text-white px-4 py-2 rounded-2xl rounded-tl-none max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#B87333]/70 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-[#B87333]/70 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-[#B87333]/70 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
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

export default HenryDialog;
