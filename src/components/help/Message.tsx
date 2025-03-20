
import React from "react";

interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp?: string;
}

const Message: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-1.5`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-lg p-1.5 ${
          isUser
            ? "bg-[#B87333] text-white shadow-sm"
            : "bg-gray-700 text-white shadow-sm"
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-0.5">
            <div className="h-3 w-3 rounded-full overflow-hidden flex items-center justify-center mr-1 border border-white/20">
              <img 
                src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" 
                alt="Henry" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-[9px] text-white/70">Henry</span>
            {timestamp && <span className="text-[8px] text-white/50 ml-1">{timestamp}</span>}
          </div>
        )}
        <p className="text-[10px] sm:text-[11px] whitespace-pre-wrap">{text}</p>
        {isUser && timestamp && (
          <div className="flex justify-end mt-0.5">
            <span className="text-[8px] sm:text-[9px] text-white/50">{timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
