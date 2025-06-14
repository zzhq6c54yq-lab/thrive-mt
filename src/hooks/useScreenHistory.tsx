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

    if (location.pathname !== '/') {
      return;
    }

    if (location.state) {
      console.log("[useScreenHistory] Navigation state:", location.state);

      if (location.state.returnToFeature) {
        console.log("[useScreenHistory] Returning to feature, maintaining state");
        return;
      } else if (location.state.returnToMain) {
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

    if (location.pathname === '/') {
      if (hasCompletedOnboarding && screenState !== 'main') {
        setScreenState('main');
      } else if (!hasCompletedOnboarding && (screenState === 'main' || !screenState)) {
        setScreenState('intro');
      }
    }
  }, [location, setScreenState, screenState]);

  useEffect(() => {
    console.log("[useScreenHistory] Screen state changed to:", screenState);
    localStorage.setItem('prevScreenState', screenState);

    if (screenState === 'main') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
  }, [screenState]);
};

export default useScreenHistory;
