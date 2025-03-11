
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import HelpChatDialog from "./HelpChatDialog";

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
  const state = location.state as { screenState?: string } | null;
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Don't show the help button on initial screens
  if (!state?.screenState || state.screenState !== 'main') {
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

  return (
    <>
      <Button
        variant="bronze"
        size="h-icon"
        className={`rounded-full fixed z-50 flex items-center justify-center overflow-hidden transition-all duration-300 p-0 shadow-lg hover:shadow-[0_0_15px_rgba(184,115,51,0.6)] ${className}`}
        onClick={handleClick}
        aria-label="Ask for Help"
        title="Ask for Help"
        style={{ 
          bottom: '30px', 
          right: '30px'
        }}
      >
        <div className="h-full w-full flex items-center justify-center">
          <div className="relative h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold shadow-inner">
            <span className="text-lg">H</span>
          </div>
        </div>
      </Button>
      
      <HelpChatDialog isOpen={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default HenryIconButton;
