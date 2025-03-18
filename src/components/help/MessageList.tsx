
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";

interface MessageListProps {
  messages: Array<{ text: string; isUser: boolean }>;
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  
  return (
    <ScrollArea className="h-[250px] overflow-auto pr-4 mb-3" ref={scrollAreaRef}>
      <div className="space-y-4">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} isUser={message.isUser} />
        ))}
        {messages.length > 0 && !messages[messages.length - 1].isUser && (
          <div className="h-4 flex items-center ml-12">
            <div className="w-2 h-4 bg-[#B87333] animate-pulse opacity-70"></div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
