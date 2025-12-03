import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScreenHistory = (
  screenState: string,
  setScreenState: (state: any) => void
) => {
  const location = useLocation();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';

    // Handle special program paths - these should skip onboarding
    const isSpecialProgramPath =
      location.pathname.includes('cancer-support') ||
      location.pathname.includes('chronic-illness') ||
      location.pathname.includes('golden-years') ||
      location.pathname.includes('small-business');

    if (isSpecialProgramPath) {
      if (screenState !== 'main') {
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
      // Prevent navigation to intro if explicitly prevented
      if (location.state.preventIntroRedirect && location.state.returnToIntro) {
        setScreenState('main');
        return;
      }

      if (location.state.returnToFeature || location.state.returnToMain) {
        setScreenState('main');
        return;
      } else if (location.state.screenState) {
        // Don't allow setting to intro if coming from navigation within main app
        if (location.state.screenState === 'intro' && localStorage.getItem('hasCompletedOnboarding') === 'true') {
          setScreenState('main');
        } else {
          setScreenState(location.state.screenState);
        }
        return;
      } else if (location.state.returnToIntro && !location.state.preventIntroRedirect) {
        // Only allow explicit return to intro if not prevented
        setScreenState('intro');
        return;
      }
    }

    // For root path, enforce onboarding rules but never force back to intro once in main
    if (location.pathname === '/') {
      if (hasCompletedOnboarding && screenState !== 'main') {
        setScreenState('main');
      }
    }
  }, [location, setScreenState, screenState]);

  useEffect(() => {
    // Only mark onboarding complete when explicitly transitioning to main
    if (screenState === 'main') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
  }, [screenState]);
};

export default useScreenHistory;
