
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
      
      // Handle main tutorial for first time users
      const hasVisitedThriveMT = localStorage.getItem('hasVisitedThriveMT');
      const comingFromOnboarding = (prevScreenState === 'visionBoard' || prevScreenState === 'subscription');
      
      console.log("Tutorial check - hasVisitedThriveMT:", hasVisitedThriveMT, "Coming from onboarding:", comingFromOnboarding);
      
      if (!hasVisitedThriveMT || comingFromOnboarding) {
        if (!popupsShown.mainTutorial) {
          console.log("Setting showMainTutorial to true");
          setShowMainTutorial(true);
        }
      }
    }
    
    // Save current screen state as previous for next navigation
    localStorage.setItem('prevScreenState', screenState);
  }, [screenState, popupsShown]);

  // Method to mark tutorial as completed
  const markTutorialCompleted = () => {
    console.log("Marking tutorial as completed");
    setPopupsShown(prev => ({ ...prev, mainTutorial: true, transitionTutorial: true }));
    setShowMainTutorial(false);
    localStorage.setItem('hasVisitedThriveMT', 'true');
  };

  // Method to reset popup states (useful for testing)
  const resetPopupStates = () => {
    console.log("Resetting all popup states");
    setPopupsShown({
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false,
      transitionTutorial: false
    });
    localStorage.removeItem('popupsShown');
    localStorage.removeItem('hasVisitedThriveMT');
    localStorage.removeItem('prevScreenState');
    localStorage.removeItem('dashboardTutorialShown');
    
    // Force reload of the current state
    setShowMainTutorial(true);
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
