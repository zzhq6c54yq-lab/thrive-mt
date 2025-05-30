
import { useState, useEffect } from 'react';

interface PopupState {
  coPayCredit: boolean;
  henryIntro: boolean;
  mainTutorial: boolean;
  transitionTutorial: boolean;
}

interface PopupManagementReturn {
  showCoPayCredit: boolean;
  setShowCoPayCredit: (show: boolean) => void;
  showHenry: boolean;
  setShowHenry: (show: boolean) => void;
  popupsShown: PopupState;
  markTutorialCompleted: () => void;
}

const usePopupManagement = (screenState: string): PopupManagementReturn => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [showHenry, setShowHenry] = useState(false);
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

  const markTutorialCompleted = () => {
    // Reduced logging - only log once when tutorial is actually completed
    if (!localStorage.getItem('tutorialCompleted')) {
      console.log("Tutorial completed for the first time");
      localStorage.setItem('tutorialCompleted', 'true');
    }
    
    setPopupsShown(prev => ({
      ...prev,
      mainTutorial: true,
      transitionTutorial: true
    }));
  };

  // Handle screen state changes for popup management
  useEffect(() => {
    // Only log significant state changes, not every render
    if (screenState === 'main' && !popupsShown.mainTutorial) {
      setPopupsShown(prev => ({ ...prev, mainTutorial: true }));
    }
  }, [screenState, popupsShown.mainTutorial]);

  return {
    showCoPayCredit,
    setShowCoPayCredit,
    showHenry,
    setShowHenry,
    popupsShown,
    markTutorialCompleted
  };
};

export default usePopupManagement;
