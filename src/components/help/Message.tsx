
import React from "react";

interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp?: string;
}

const Message: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? "bg-[#B87333] text-white shadow-lg"
            : "bg-gray-700 text-white shadow-md"
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-1">
            <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center mr-2 border border-white/20">
              <img 
                src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" 
                alt="Henry" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs text-white/70">Henry</span>
            {timestamp && <span className="text-xs text-white/50 ml-2">{timestamp}</span>}
          </div>
        )}
        <p className="text-sm whitespace-pre-wrap">{text}</p>
        {isUser && timestamp && (
          <div className="flex justify-end mt-1">
            <span className="text-xs text-white/50">{timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
