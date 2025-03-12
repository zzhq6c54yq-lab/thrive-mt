
import React from "react";
import FloatingButton from "./FloatingButton";
import HelpDialog from "./HelpDialog";
import { useState } from "react";
import { useButtonVisibility } from "./RouteVisibility";
import { useLocation } from "react-router-dom";

const HelpNavButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const isVisible = useButtonVisibility();
  const location = useLocation();
  
  // Check if we're on the index page with a specific screen state
  const isOnExcludedScreen = () => {
    if (location.pathname === "/" || location.pathname === "/index") {
      const state = location.state as { screenState?: string } | null;
      const screenState = state?.screenState;
      
      // These screens should not show the help button
      const excludedScreenStates = ['intro', 'mood', 'moodResponse', 'register', 'subscription', 'visionBoard'];
      return !state || excludedScreenStates.includes(screenState || '');
    }
    return false;
  };
  
  // Don't render if the button shouldn't be visible on this route or screen
  if (!isVisible || isOnExcludedScreen()) {
    return null;
  }

  return (
    <>
      <FloatingButton onClick={() => setShowHelpDialog(true)} />
      
      <HelpDialog 
        isOpen={showHelpDialog} 
        onOpenChange={setShowHelpDialog}
      />
    </>
  );
};

export default HelpNavButton;
