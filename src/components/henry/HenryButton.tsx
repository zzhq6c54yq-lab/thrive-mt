
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import HenryDialog from "./HenryDialog";
import HenryIntroDialog from "./HenryIntroDialog";

interface HenryButtonProps {
  userName?: string;
  triggerInitialGreeting?: boolean;
}

const HenryButton: React.FC<HenryButtonProps> = ({ 
  userName = "",
  triggerInitialGreeting = false
}) => {
  const [showHenryDialog, setShowHenryDialog] = useState(false);
  const [showIntroDialog, setShowIntroDialog] = useState(false);
  const [introShown, setIntroShown] = useState(false);
  const location = useLocation();
  const isHomePath = location.pathname === '/';

  // Check if Henry intro has been shown before using localStorage
  useEffect(() => {
    const henryIntroShown = localStorage.getItem('henryIntroShown') === 'true';
    setIntroShown(henryIntroShown);
  }, []);

  // Check path and determine if button should be visible
  // Don't show on home path during initial screens
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Determine if we should show the button based on path and state
    const searchParams = new URLSearchParams(location.search);
    const screenState = searchParams.get('screenState') || (location.state && location.state.screenState);
    
    // Hide button on home path with excluded screen states
    const shouldHide = isHomePath && ['intro', 'mood', 'moodResponse', 'register', 'subscription', 'visionBoard'].includes(String(screenState));
    
    console.info("Current path for button visibility check:", location.pathname);
    console.info("Hiding button:", shouldHide ? `Home path with excluded screenState: ${JSON.stringify(screenState)}` : "No - showing button");
    
    setIsVisible(!shouldHide);
  }, [location, isHomePath]);

  // Show intro dialog when arriving at main for the first time
  useEffect(() => {
    const fromOnboarding = triggerInitialGreeting && !introShown;
    
    if (fromOnboarding) {
      setShowIntroDialog(true);
      setIntroShown(true);
      // Store that Henry intro has been shown
      localStorage.setItem('henryIntroShown', 'true');
    }
  }, [triggerInitialGreeting, introShown]);

  const handleOpenHenry = () => {
    setShowHenryDialog(true);
  };
  
  const handleIntroDialogContinue = () => {
    setShowIntroDialog(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleOpenHenry}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white shadow-lg flex items-center justify-center"
        >
          <span className="text-2xl font-bold">H</span>
        </Button>
      </div>

      <HenryDialog 
        isOpen={showHenryDialog} 
        onOpenChange={setShowHenryDialog}
        userName={userName}
      />
      
      <HenryIntroDialog 
        open={showIntroDialog} 
        onOpenChange={setShowIntroDialog}
        onContinue={handleIntroDialogContinue}
      />
    </>
  );
};

export default HenryButton;
