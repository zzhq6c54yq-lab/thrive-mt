
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useToast } from "@/hooks/use-toast";
import { useHenryMessageProcessor } from "./HenryMessageProcessor";

interface HelpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi there! I'm Henry, your digital mental health companion. How can I support you today?", isUser: false }
  ]);
  
  useEffect(() => {
    // Reset messages when dialog opens
    if (isOpen) {
      setMessages([{ text: "Hi there! I'm Henry, your digital mental health companion. How can I support you today?", isUser: false }]);
    }
  }, [isOpen]);
  
  const addNewMessage = (message: { text: string; isUser: boolean }) => {
    setMessages(prev => [...prev, message]);
  };
  
  const { handleSendMessage, processing, emergencyMode } = useHenryMessageProcessor(addNewMessage);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md w-[350px] md:w-[400px] bg-black/85 backdrop-blur-md border border-[#8B5CF6]/50 p-3 max-h-[80vh] overflow-hidden"
      >
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="relative h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] shadow-lg">
              <div className="absolute inset-[3px] rounded-full bg-white/90"></div>
              <div className="relative z-10 text-3xl font-bold text-[#8B5CF6]">H</div>
              {emergencyMode && (
                <div className="absolute inset-0 rounded-full border-2 border-red-600 animate-pulse"></div>
              )}
            </div>
          </div>
          <DialogTitle className={`text-lg ${emergencyMode ? "text-red-400" : "text-white"}`}>
            {emergencyMode ? "Emergency Support Mode" : "Need Help?"}
          </DialogTitle>
          <DialogDescription className={emergencyMode ? "text-red-300" : "text-gray-300"}>
            {emergencyMode 
              ? "Connecting you with a human counselor..." 
              : "Chat with Henry, your mental health companion"
            }
          </DialogDescription>
        </DialogHeader>
        
        <MessageList messages={messages} />
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isProcessing={processing} 
          isEmergencyMode={emergencyMode}
        />
        
        <div className="mt-4 flex justify-center">
          <Button
            className={`${
              emergencyMode 
                ? "bg-gradient-to-br from-red-700 to-red-500 hover:from-red-800 hover:to-red-600" 
                : "bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#7B4CE6] hover:to-[#C935DF]"
            } text-white w-1/2`}
            onClick={() => onOpenChange(false)}
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
