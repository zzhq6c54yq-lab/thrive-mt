
import { useState, useEffect } from "react";

interface PopupState {
  coPayCredit: boolean;
  henryIntro: boolean;
}

export const usePopupManagement = (screenState: string) => {
  const [showCoPayCredit, setShowCoPayCredit] = useState(false);
  const [showHenry, setShowHenry] = useState(false);
  const [popupsShown, setPopupsShown] = useState<PopupState>({
    coPayCredit: false,
    henryIntro: false
  });

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

  return {
    showCoPayCredit,
    setShowCoPayCredit,
    showHenry,
    setShowHenry,
    popupsShown,
  };
};

export default usePopupManagement;
