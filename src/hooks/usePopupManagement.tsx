
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

  // Main effect for handling popups based on screen state
  useEffect(() => {
    // Track previous screen state
    const prevScreenState = localStorage.getItem('prevScreenState');
    console.log("usePopupManagement - Current screen:", screenState, "Previous screen:", prevScreenState);
    
    // Show only one welcome tutorial when transferring to main menu from onboarding
    if (screenState === 'main') {
      const comingFromOnboarding = prevScreenState === 'visionBoard' || 
                                  prevScreenState === 'subscription' || 
                                  prevScreenState === 'moodResponse' || 
                                  prevScreenState === 'mood' || 
                                  prevScreenState === 'register';
      
      if (comingFromOnboarding && !popupsShown.mainTutorial) {
        // Just show main tutorial, not the other popups
        setShowMainTutorial(true);
        setPopupsShown(prev => ({ ...prev, mainTutorial: true }));
        
        // Don't show other popups during onboarding transition
        setShowCoPayCredit(false);
        setShowHenry(false);
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
