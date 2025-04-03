
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
    
    // Only show the main welcome tutorial when transferring to main menu from onboarding
    // and only if it hasn't been shown before
    if (screenState === 'main') {
      const comingFromOnboarding = prevScreenState === 'visionBoard' || 
                                  prevScreenState === 'subscription' || 
                                  prevScreenState === 'moodResponse' || 
                                  prevScreenState === 'mood' || 
                                  prevScreenState === 'register';
      
      // Only show the dashboard tutorial when coming from onboarding screens
      // and it hasn't been shown before
      if (comingFromOnboarding && 
          localStorage.getItem('dashboardTutorialShown') !== 'true') {
        console.log("Should show dashboard tutorial - coming from onboarding and tutorial not shown before");
        setPopupsShown(prev => ({ ...prev, mainTutorial: true }));
        
        // Ensure other popups don't show during onboarding transition
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
