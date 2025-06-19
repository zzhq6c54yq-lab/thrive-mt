
import { useState, useEffect } from "react";

export type ScreenStateType = 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';

export const useScreenState = () => {
  const [screenState, setScreenState] = useState<ScreenStateType>('intro');
  
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    const forceOnboarding = new URLSearchParams(window.location.search).get('onboarding') === 'true';

    console.log("[useScreenState] Onboarding check - hasCompleted:", hasCompletedOnboarding);
    console.log("[useScreenState] Force onboarding:", forceOnboarding);
    
    // For investment demo purposes, always show onboarding if not explicitly completed
    // OR if forced via URL parameter
    if (forceOnboarding) {
      console.log("[useScreenState] Forcing onboarding via URL parameter");
      localStorage.removeItem('hasCompletedOnboarding');
      setScreenState('intro');
    } else if (!hasCompletedOnboarding) {
      console.log("[useScreenState] No completed onboarding found, starting from intro");
      setScreenState('intro');
    } else {
      console.log("[useScreenState] Onboarding completed, going to main dashboard");
      setScreenState('main');
    }
  }, []);

  const setScreenStateWithValidation = (newState: ScreenStateType) => {
    console.log("[useScreenState] Transitioning to screen:", newState);
    setScreenState(newState);
    
    // Only mark onboarding as completed when explicitly reaching main
    if (newState === 'main') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      console.log("[useScreenState] Onboarding marked as completed");
    }
  };

  return {
    screenState,
    setScreenState: setScreenStateWithValidation
  };
};

export default useScreenState;
