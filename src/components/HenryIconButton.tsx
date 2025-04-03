
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import HelpChatDialog from "./HelpChatDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import TutorialButton from "./tutorials/TutorialButton";

interface HenryIconButtonProps {
  className?: string;
  onClick?: () => void;
}

// This is the floating Help button (still named HenryIconButton for code consistency)
const HenryIconButton: React.FC<HenryIconButtonProps> = ({ 
  className = "",
  onClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  // Get the screen state from the location
  const state = location.state as { screenState?: string } | null;
  const screenState = state?.screenState;
  
  // Only show on main dashboard, not on any initial screens
  const shouldShow = location.pathname !== "/" || screenState === 'main';
  
  // Don't show during emotional check-in flow
  const isEmotionalCheckIn = location.pathname === "/" && (
    screenState === 'mood' || 
    screenState === 'moodResponse' || 
    screenState === 'intro' || 
    screenState === 'registration' || 
    screenState === 'subscription'
  );

  // Don't show the help button on initial screens
  if (!shouldShow || isEmotionalCheckIn) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Open the help chat dialog instead of navigating
      setIsHelpOpen(true);
    }
  };

  // Determine if we should show the THRIVE logo tutorial button - only on main dashboard
  const shouldShowThriveButton = false; // Remove this button to avoid duplicates with the Header Thrive button

  return (
    <>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-4">
        <Button
          variant="bronze"
          size="h-icon"
          className={`rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 p-0 shadow-xl hover:shadow-[0_0_25px_rgba(184,115,51,0.6)] ${className}`}
          onClick={handleClick}
          aria-label="Ask for Help"
          title="Ask for Help"
        >
          <div className="h-16 w-16 flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1]">
            <Avatar className="h-12 w-12 rounded-full border border-[#B87333]/30 shadow-inner">
              <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
              <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white">H</AvatarFallback>
            </Avatar>
          </div>
        </Button>
        
        {/* Removed the Thrive tutorial button from here to avoid duplicates */}
      </div>
      
      <HelpChatDialog isOpen={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default HenryIconButton;
