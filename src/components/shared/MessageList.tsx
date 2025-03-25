
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

interface MessageListProps {
  messages: Message[];
  className?: string;
  style?: React.CSSProperties;
  showTypingIndicator?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages,
  className,
  style,
  showTypingIndicator = false
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showTypingIndicator]);

  return (
    <ScrollArea 
      className={cn("flex-1 pr-4", className)} 
      style={style}
      ref={scrollRef}
    >
      <div className="space-y-4 py-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser
                  ? "bg-[#B87333] text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {/* Only show Henry's avatar and name for non-user messages */}
              {!message.isUser && (
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
                    <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white text-xs">H</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-white/70">Henry</span>
                </div>
              )}
              <p className="text-sm">{message.text}</p>
              {message.timestamp && (
                <span className="text-xs opacity-70 mt-1 block text-right">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {showTypingIndicator && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-700">
              <div className="flex items-center mb-1">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
                  <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white text-xs">H</AvatarFallback>
                </Avatar>
                <span className="text-xs text-white/70">Henry</span>
              </div>
              <div className="flex space-x-1 items-center h-5">
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
