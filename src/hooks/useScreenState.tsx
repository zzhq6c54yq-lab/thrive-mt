
import { useState, useEffect } from "react";

export type ScreenStateType = 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';

export const useScreenState = () => {
  const [screenState, setScreenState] = useState<ScreenStateType>('intro');
  
  useEffect(() => {
    // Clear any conflicting localStorage keys that might cause issues
    const conflictingKeys = ['stuckDetected', 'introLoaded'];
    conflictingKeys.forEach(key => localStorage.removeItem(key));
    
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    const forceOnboarding = new URLSearchParams(window.location.search).get('onboarding') === 'true';

    console.log("[useScreenState] Clean initialization - hasCompletedOnboarding:", hasCompletedOnboarding);
    console.log("[useScreenState] Force onboarding:", forceOnboarding);
    
    // Simple logic: if forced onboarding or not completed, start from intro
    if (forceOnboarding || !hasCompletedOnboarding) {
      console.log("[useScreenState] Starting onboarding from intro");
      if (forceOnboarding) {
        localStorage.removeItem('hasCompletedOnboarding');
      }
      setScreenState('intro');
    } else {
      console.log("[useScreenState] Onboarding completed, going to main dashboard");
      setScreenState('main');
    }
  }, []);

  const setScreenStateWithValidation = (newState: ScreenStateType) => {
    console.log("[useScreenState] Transitioning to screen:", newState);
    setScreenState(newState);
    
    // Mark onboarding as completed when reaching main
    if (newState === 'main') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      localStorage.removeItem('prevScreenState');
      console.log("[useScreenState] Onboarding completed and saved");
    } else {
      localStorage.setItem('prevScreenState', newState);
    }
  };

  return {
    screenState,
    setScreenState: setScreenStateWithValidation
  };
};

export default useScreenState;
