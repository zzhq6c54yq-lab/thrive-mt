
import React from "react";

interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp?: string;
}

const Message: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[88%] sm:max-w-[80%] rounded-lg p-2 ${
          isUser
            ? "bg-[#B87333] text-white shadow-sm"
            : "bg-gray-700 text-white shadow-sm"
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-0.5">
            <div className="h-4 w-4 rounded-full overflow-hidden flex items-center justify-center mr-1 border border-white/20">
              <img 
                src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" 
                alt="Henry" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-[10px] text-white/70">Henry</span>
            {timestamp && <span className="text-[10px] text-white/50 ml-1">{timestamp}</span>}
          </div>
        )}
        <p className="text-[11px] sm:text-xs whitespace-pre-wrap">{text}</p>
        {isUser && timestamp && (
          <div className="flex justify-end mt-0.5">
            <span className="text-[9px] sm:text-[10px] text-white/50">{timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
