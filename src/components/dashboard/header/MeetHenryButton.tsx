
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MeetHenryButtonProps {
  onClick: () => void;
}

const MeetHenryButton: React.FC<MeetHenryButtonProps> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick}
      variant="outline"
      className="relative px-8 py-2.5 bg-gradient-to-b from-[#222] to-[#111] border-[#B87333]/50 hover:border-[#B87333] group overflow-hidden w-[320px] h-[52px]"
    >
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#B87333]/80 rounded-b-md z-0"></div>
      <div className="absolute top-1 left-1 w-2 h-2 rounded-full border border-[#B87333]/40 z-0"></div>
      <div className="absolute top-1 right-1 w-2 h-2 rounded-full border border-[#B87333]/40 z-0"></div>
      <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-[#B87333]/20 rounded-r-full z-0"></div>
      <div className="flex items-center gap-3 relative z-10">
        <Avatar className="h-7 w-7 border border-[#B87333]/30">
          <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
          <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white text-xs">H</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-white">Meet Henry</span>
          <span className="text-xs text-white/70">Your Mental Health Companion</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#B87333]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
    </Button>
  );
};

export default MeetHenryButton;
