
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HelpDialog from "../help/HelpDialog";

interface HenryButtonProps {
  userName?: string;
  triggerInitialGreeting?: boolean;
}

const HenryButton: React.FC<HenryButtonProps> = ({ userName, triggerInitialGreeting }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    // Open the dialog automatically if triggerInitialGreeting is true
    if (triggerInitialGreeting) {
      setIsDialogOpen(true);
    }
  }, [triggerInitialGreeting]);
  
  return (
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        className="cursor-pointer fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
        aria-label="Open Henry support chat"
      >
        <div className="relative h-16 w-16 flex items-center justify-center transition-transform duration-300 hover:scale-110">
          {/* Vibrant circle background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] shadow-lg"></div>
          
          {/* Inner circle for depth */}
          <div className="absolute inset-[3px] rounded-full bg-white/90"></div>
          
          {/* Letter H */}
          <div className="relative z-10 text-3xl font-bold text-[#8B5CF6]">H</div>
          
          {/* Pulsing glow effect */}
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-[#8B5CF6]/50 to-[#D946EF]/50 animate-pulse" style={{ animationDuration: '3s' }}></div>
        </div>
        
        {/* Text label below the button */}
        <div className="mt-2 text-center">
          <span className="text-sm font-medium text-white bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] px-2 py-1 rounded-full shadow-lg">
            Henry
          </span>
        </div>
      </div>
      
      <HelpDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default HenryButton;
