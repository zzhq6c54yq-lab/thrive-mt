
import { useState, useEffect } from "react";

interface PopupState {
  coPayCredit: boolean;
  henryIntro: boolean;
  mainTutorial: boolean;
}

export const usePopupManagement = (screenState: string) => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [showHenry, setShowHenry] = useState(false);
  const [popupsShown, setPopupsShown] = useState<PopupState>(() => {
    // Try to get popup state from localStorage to persist between sessions
    const savedState = localStorage.getItem('popupsShown');
    return savedState ? JSON.parse(savedState) : {
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false
    };
  });

  // Save popup state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('popupsShown', JSON.stringify(popupsShown));
  }, [popupsShown]);

  useEffect(() => {
    // Show popups during initial flow when transferring to main menu
    if (screenState === 'main') {
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
  }, [screenState, popupsShown]);

  // Method to mark tutorial as completed
  const markTutorialCompleted = () => {
    setPopupsShown(prev => ({ ...prev, mainTutorial: true }));
  };

  // Method to reset popup states (useful for testing)
  const resetPopupStates = () => {
    setPopupsShown({
      coPayCredit: false,
      henryIntro: false,
      mainTutorial: false
    });
    localStorage.removeItem('popupsShown');
  };

  return {
    showCoPayCredit,
    setShowCoPayCredit,
    showHenry,
    setShowHenry,
    popupsShown,
    markTutorialCompleted,
    resetPopupStates
  };
};

export default usePopupManagement;
