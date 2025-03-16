
import React, { useState } from "react";
import FloatingButton from "./FloatingButton";
import HelpDialog from "./HelpDialog";
import { useButtonVisibility } from "./RouteVisibility";
import { useLocation } from "react-router-dom";

const HelpNavButton: React.FC = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const isVisible = useButtonVisibility();
  const location = useLocation();
  
  // Check if we're on the index page with a specific screen state
  // or on the Department of Defense page
  const isOnExcludedScreen = () => {
    // Check if on DoD page
    if (location.pathname === "/department-of-defense") {
      return true;
    }
    
    // Check for index page with specific states
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
