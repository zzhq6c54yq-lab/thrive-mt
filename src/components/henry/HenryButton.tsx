
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Sparkles } from "lucide-react";
import HenryDialog from "./HenryDialog";

interface HenryButtonProps {
  userName?: string;
  triggerInitialGreeting?: boolean;
}

const HenryButton: React.FC<HenryButtonProps> = ({ userName, triggerInitialGreeting = false }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(triggerInitialGreeting);
  
  return (
    <>
      <div className="fixed right-6 bottom-32 z-50 flex flex-col items-center">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          size="icon"
          aria-label="Talk to Henry, your digital counselor"
        >
          <div className="relative h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold border-2 border-white/30 overflow-hidden group-hover:border-white/50 transition-all">
            <span className="text-2xl font-bold">H</span>
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="h-5 w-5 absolute text-white/80" />
              <Brain className="h-5 w-5 absolute text-white/80 animate-pulse" style={{animationDelay: "0.5s"}} />
              <Sparkles className="h-5 w-5 absolute text-white/80 animate-pulse" style={{animationDelay: "1s"}} />
            </div>
          </div>
        </Button>
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs bg-black/70 px-2 py-1 rounded-md backdrop-blur-sm">
          Talk to Henry
        </div>
      </div>
      
      <HenryDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        userName={userName}
      />
    </>
  );
};

export default HenryButton;
