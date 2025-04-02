
import { useState, useEffect } from "react";

interface PopupState {
  coPayCredit: boolean;
  henryIntro: boolean;
  mainTutorial: boolean;
  transitionTutorial: boolean;
}

export const usePopupManagement = (screenState: string) => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [showHenry, setShowHenry] = useState(false);
  const [showTransitionTutorial, setShowTransitionTutorial] = useState(false);
  const [showMainTutorial, setShowMainTutorial] = useState(false);
  const [popupsShown, setPopupsShown] = useState<PopupState>(() => {
    // Try to get popup state from localStorage to persist between sessions
    const savedState = localStorage.getItem('popupsShown');
    return savedState ? JSON.parse(savedState) : {
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false,
      transitionTutorial: false
    };
  });

  // Force reset popup state in development - enhanced to check URL parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('reset') || queryParams.has('tutorial')) {
      console.log("Resetting popup states due to URL parameter");
      resetPopupStates();
      
      // Force set main tutorial to show
      if (queryParams.has('tutorial')) {
        console.log("Forcing main tutorial to show due to URL parameter");
        setShowMainTutorial(true);
      }
    }
  }, []);

  // Save popup state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('popupsShown', JSON.stringify(popupsShown));
  }, [popupsShown]);

  // Main effect for handling popups based on screen state
  useEffect(() => {
    // Track previous screen state
    const prevScreenState = localStorage.getItem('prevScreenState');
    console.log("usePopupManagement - Current screen:", screenState, "Previous screen:", prevScreenState);
    
    // Show popups during initial flow when transferring to main menu
    if (screenState === 'main') {
      // Show co-pay credit popup if not shown yet
      if (!popupsShown.coPayCredit) {
        setShowCoPayCredit(true);
        setPopupsShown(prev => ({ ...prev, coPayCredit: true }));
      }
      
      // Show Henry only when navigating to main from registration or vision board
      // and if it hasn't been shown before
      if (!popupsShown.henryIntro && 
          (prevScreenState === 'visionBoard' || prevScreenState === 'subscription')) {
        setShowHenry(true);
        setPopupsShown(prev => ({ ...prev, henryIntro: true }));
      }
      
      // Enhanced handling for main tutorial - more aggressive reset
      const hasVisitedThriveMT = localStorage.getItem('hasVisitedThriveMT');
      const comingFromOnboarding = (
        prevScreenState === 'visionBoard' || 
        prevScreenState === 'subscription' || 
        prevScreenState === 'register' || 
        prevScreenState === 'moodResponse'
      );
      
      console.log("Tutorial check - hasVisitedThriveMT:", hasVisitedThriveMT, 
                 "Coming from onboarding:", comingFromOnboarding,
                 "popupsShown.mainTutorial:", popupsShown.mainTutorial);
      
      // Much more aggressive checking to ensure tutorial shows
      if (!hasVisitedThriveMT || comingFromOnboarding || !popupsShown.mainTutorial || screenState === 'main') {
        console.log("Setting showMainTutorial to TRUE - forcing tutorial display");
        setShowMainTutorial(true);
        
        // Aggressively reset flags to ensure it shows
        localStorage.removeItem('popupsShown');
        localStorage.removeItem('hasVisitedThriveMT');
        localStorage.removeItem('dashboardTutorialShown');
        
        if (popupsShown.mainTutorial) {
          setPopupsShown(prev => ({ ...prev, mainTutorial: false }));
        }
      }
    }
    
    // Save current screen state as previous for next navigation
    localStorage.setItem('prevScreenState', screenState);
  }, [screenState, popupsShown, setPopupsShown]);

  // Method to mark tutorial as completed
  const markTutorialCompleted = () => {
    console.log("Marking tutorial as completed - setting mainTutorial popup flag to true");
    setPopupsShown(prev => ({ ...prev, mainTutorial: true, transitionTutorial: true }));
    setShowMainTutorial(false);
    localStorage.setItem('hasVisitedThriveMT', 'true');
    localStorage.setItem('dashboardTutorialShown', 'true');
  };

  // Method to reset popup states (useful for testing) - enhanced
  const resetPopupStates = () => {
    console.log("Resetting all popup states");
    
    // Clear ALL localStorage items that might interfere
    localStorage.removeItem('popupsShown');
    localStorage.removeItem('hasVisitedThriveMT');
    localStorage.removeItem('prevScreenState');
    localStorage.removeItem('dashboardTutorialShown');
    localStorage.removeItem('tutorialShown');
    
    // Reset state
    setPopupsShown({
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false,
      transitionTutorial: false
    });
    
    // Force show tutorial
    setShowMainTutorial(true);
    
    console.log("Reset complete - tutorial should now show on next navigation to main screen");
  };

  return {
    showCoPayCredit,
    setShowCoPayCredit,
    showHenry,
    setShowHenry,
    showTransitionTutorial,
    setShowTransitionTutorial,
    showMainTutorial,
    setShowMainTutorial,
    popupsShown,
    markTutorialCompleted,
    resetPopupStates
  };
};

export default usePopupManagement;
