
import React from "react";

interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? "bg-[#B87333] text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-1">
            <div className="h-6 w-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white mr-2">
              <span className="text-xs font-bold">H</span>
            </div>
            <span className="text-xs text-white/70">Henry</span>
          </div>
        )}
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Message;
