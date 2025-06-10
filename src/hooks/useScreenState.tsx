
import { useState, useEffect } from "react";

export type ScreenStateType = 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';

export const useScreenState = () => {
  // Initialize screenState as 'intro' initially
  const [screenState, setScreenState] = useState<ScreenStateType>('intro');
  
  // Initialize state based on onboarding completion
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    
    console.log("[useScreenState] Initial render, hasCompletedOnboarding:", hasCompletedOnboarding);
    
    if (hasCompletedOnboarding) {
      console.log("[useScreenState] Onboarding already completed, initializing to main dashboard");
      setScreenState('main');
    } else {
      console.log("[useScreenState] No onboarding record, starting from intro screen");
      setScreenState('intro');
      
      // Clear the localStorage items that might conflict
      localStorage.removeItem('prevScreenState');
      
      // Log that we're properly starting the onboarding
      console.log("[useScreenState] Initializing new onboarding flow");
    }
  }, []);

  return {
    screenState,
    setScreenState
  };
};

export default useScreenState;
