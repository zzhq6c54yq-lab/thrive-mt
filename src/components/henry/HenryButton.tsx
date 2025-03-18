
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
      >
        <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <span className="text-xl font-bold">H</span>
        </div>
      </div>
      <HelpDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default HenryButton;
