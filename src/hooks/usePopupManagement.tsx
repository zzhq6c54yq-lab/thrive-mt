
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

  // Get the preferred language for translations
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';

  // Save popup state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('popupsShown', JSON.stringify(popupsShown));
  }, [popupsShown]);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      // No need to do anything special here, just making sure the component re-renders
      // when language changes
      console.log("Language changed to:", localStorage.getItem('preferredLanguage'));
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    // Track previous screen state
    const prevScreenState = localStorage.getItem('prevScreenState');
    
    // Show popups during initial flow when transferring to main menu
    if (screenState === 'main') {
      // Always show the tutorial when coming from emotional check-in (mood, moodResponse) 
      // or plan selection (subscription) screens, or vision board or registration
      if (prevScreenState === 'visionBoard' || 
          prevScreenState === 'subscription' || 
          prevScreenState === 'moodResponse' ||
          prevScreenState === 'mood' ||
          prevScreenState === 'register') {
        
        console.log("Showing tutorial when transitioning from:", prevScreenState, "to main");
        
        // Force reset tutorial flags to ensure they show
        localStorage.setItem('dashboardTutorialShown', 'false');
        
        // Reset the transition tutorial flags in popupsShown state
        setPopupsShown(prev => ({
          ...prev,
          mainTutorial: false,
          transitionTutorial: false
        }));
        
        setShowTransitionTutorial(true);
        setShowMainTutorial(true);
      }
      
      // Show co-pay credit popup if not shown yet
      if (!popupsShown.coPayCredit) {
        setShowCoPayCredit(true);
        setPopupsShown(prev => ({ ...prev, coPayCredit: true }));
      }
      
      // Show Henry only when navigating to main from registration or vision board
      // and if it hasn't been shown before
      if (!popupsShown.henryIntro) {
        setShowHenry(true);
        setPopupsShown(prev => ({ ...prev, henryIntro: true }));
      }
    }
    
    // Save current screen state as previous for next navigation
    localStorage.setItem('prevScreenState', screenState);
  }, [screenState, popupsShown]);

  // Method to mark tutorial as completed
  const markTutorialCompleted = () => {
    setPopupsShown(prev => ({ ...prev, mainTutorial: true, transitionTutorial: true }));
    setShowMainTutorial(false);
    localStorage.setItem('dashboardTutorialShown', 'true');
  };

  // Method to reset popup states (useful for testing)
  const resetPopupStates = () => {
    setPopupsShown({
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false,
      transitionTutorial: false
    });
    localStorage.removeItem('popupsShown');
    localStorage.removeItem('dashboardTutorialShown');
    localStorage.removeItem('prevScreenState');
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
