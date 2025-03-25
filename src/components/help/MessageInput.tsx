
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, AlertCircle } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isProcessing?: boolean;
  isEmergencyMode?: boolean;
  onResize?: (height: number) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isProcessing = false,
  isEmergencyMode = false,
  onResize
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Adjust height based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
      
      if (onResize) {
        onResize(scrollHeight);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === "" || isProcessing) return;
    
    onSendMessage(message.trim());
    setMessage("");
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      
      if (onResize) {
        onResize(40);
      }
    }
  };

  // Reset the height when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      
      if (onResize) {
        onResize(40);
      }
    }
  }, [onResize]);

  return (
    <div className={`relative ${isEmergencyMode ? 'border border-red-500 rounded-md p-2' : ''}`}>
      {isEmergencyMode && (
        <div className="bg-red-500/10 text-red-400 p-2 rounded-md mb-2 flex items-start gap-2 text-xs">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>Crisis support active. Please share how you're feeling.</span>
        </div>
      )}
      <div className="flex">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          placeholder="Type your message..."
          className={`flex-1 p-2 rounded-l-md outline-none resize-none min-h-[40px] max-h-24 bg-gray-700 text-white placeholder-gray-400
            ${isEmergencyMode ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#B87333]'}`}
          style={{ overflow: 'auto' }}
        />
        <Button
          type="button"
          onClick={handleSendMessage}
          disabled={message.trim() === "" || isProcessing}
          className={`rounded-r-md h-auto ${isEmergencyMode ? 'bg-red-600 hover:bg-red-700' : 'bg-[#B87333] hover:bg-[#A56625]'}`}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
