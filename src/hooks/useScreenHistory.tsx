import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScreenHistory = (
  screenState: string,
  setScreenState: (state: any) => void
) => {
  const location = useLocation();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';

    console.log("[useScreenHistory] Current screen state:", screenState);
    console.log("[useScreenHistory] Completed onboarding:", hasCompletedOnboarding);
    console.log("[useScreenHistory] Current location:", location.pathname);

    // Handle special program paths - these should skip onboarding
    const isSpecialProgramPath =
      location.pathname.includes('cancer-support') ||
      location.pathname.includes('chronic-illness') ||
      location.pathname.includes('golden-years') ||
      location.pathname.includes('small-business');

    if (isSpecialProgramPath) {
      console.log("[useScreenHistory] Detected special program path:", location.pathname);
      if (screenState !== 'main') {
        console.log("[useScreenHistory] Setting screen state to main for specialized program");
        setScreenState('main');
      }
      return;
    }

    // Don't interfere with non-root paths
    if (location.pathname !== '/') {
      return;
    }

    // Handle navigation state
    if (location.state) {
      console.log("[useScreenHistory] Navigation state:", location.state);

      if (location.state.returnToFeature || location.state.returnToMain) {
        setScreenState('main');
        return;
      } else if (location.state.screenState) {
        setScreenState(location.state.screenState);
        return;
      } else if (location.state.returnToIntro) {
        setScreenState('intro');
        return;
      }
    }

    // For root path, enforce onboarding rules
    if (location.pathname === '/') {
      if (hasCompletedOnboarding && screenState !== 'main') {
        console.log("[useScreenHistory] Onboarding completed, transitioning to main");
        setScreenState('main');
      } else if (!hasCompletedOnboarding && (screenState === 'main')) {
        console.log("[useScreenHistory] Onboarding not completed, returning to intro");
        setScreenState('intro');
      }
      // If screenState is already intro and onboarding not completed, keep it as intro
    }
  }, [location, setScreenState, screenState]);

  useEffect(() => {
    console.log("[useScreenHistory] Screen state changed to:", screenState);
    
    // Only mark onboarding complete when explicitly transitioning to main
    if (screenState === 'main') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      console.log("[useScreenHistory] Onboarding completion saved to localStorage");
    }
  }, [screenState]);
};

export default useScreenHistory;
