
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";

interface MessageListProps {
  messages: Array<{ text: string; isUser: boolean }>;
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <ScrollArea className="h-[300px] overflow-auto pr-4 mb-3">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} isUser={message.isUser} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
