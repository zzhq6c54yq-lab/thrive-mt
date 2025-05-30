
import { useState, useEffect } from 'react';

interface PopupState {
  showCoPayCredit: boolean;
  setShowCoPayCredit: (show: boolean) => void;
  showHenry: boolean;
  setShowHenry: (show: boolean) => void;
  popupsShown: string[];
  markTutorialCompleted: () => void;
}

const usePopupManagement = (screenState: string): PopupState => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [showHenry, setShowHenry] = useState(false);
  const [popupsShown, setPopupsShown] = useState<string[]>([]);

  const markTutorialCompleted = () => {
    // Reduced logging - only log once when tutorial is actually completed
    if (!localStorage.getItem('tutorialCompleted')) {
      console.log("Tutorial completed for the first time");
      localStorage.setItem('tutorialCompleted', 'true');
    }
  };

  // Remove excessive logging for screen state changes
  useEffect(() => {
    // Only log significant state changes, not every render
    if (screenState === 'main' && !popupsShown.includes('main-loaded')) {
      setPopupsShown(prev => [...prev, 'main-loaded']);
    }
  }, [screenState, popupsShown]);

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
