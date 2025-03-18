
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HelpDialog from "@/components/help/HelpDialog";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationHelpButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Function to navigate up in the application
  const navigateUp = () => {
    window.scrollTo({
      top: window.scrollY - window.innerHeight,
      behavior: 'smooth'
    });
    toast({
      title: "Navigation",
      description: "Moving up",
      duration: 1500,
    });
  };

  // Function to navigate down in the application
  const navigateDown = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth'
    });
    toast({
      title: "Navigation",
      description: "Moving down",
      duration: 1500,
    });
  };

  // Handle opening the help dialog
  const openHelp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHelpDialog(true);
  };

  // Check if we're on certain screen states where we should hide the button
  const isOnExcludedScreen = () => {
    if (location.pathname === "/" || location.pathname === "/index") {
      const state = location.state as { screenState?: string } | null;
      const screenState = state?.screenState;
      
      // These screens should not show the navigation help button
      const excludedScreenStates = ['intro', 'mood', 'moodResponse', 'register', 'subscription', 'visionBoard'];
      return screenState === undefined || excludedScreenStates.includes(screenState || '');
    }
    return false;
  };
  
  // Don't render if we're on excluded screens
  if (isOnExcludedScreen()) {
    return null;
  }

  return (
    <>
      <div className="fixed right-6 bottom-32 z-50 flex flex-col items-center gap-2">
        <Button
          onClick={navigateUp}
          className="h-10 w-10 rounded-full bg-[#B87333] text-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
          aria-label="Navigate Up"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
        
        <Button
          onClick={openHelp}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label="Get Help"
        >
          <div className="relative h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold border-2 border-white/30">
            <span className="text-2xl">H</span>
          </div>
        </Button>
        
        <Button
          onClick={navigateDown}
          className="h-10 w-10 rounded-full bg-[#B87333] text-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
          aria-label="Navigate Down"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
      
      <HelpDialog 
        isOpen={showHelpDialog} 
        onOpenChange={setShowHelpDialog}
      />
    </>
  );
};

export default NavigationHelpButton;
