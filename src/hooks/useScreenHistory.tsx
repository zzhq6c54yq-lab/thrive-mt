
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScreenHistory = (
  screenState: string,
  setScreenState: (state: any) => void
) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.screenState) {
      setScreenState(location.state.screenState);
      
      // If transitioning to 'main' from an onboarding screen, force tutorial to show
      if (location.state.screenState === 'main') {
        const prevScreenState = localStorage.getItem('prevScreenState');
        if (prevScreenState === 'visionBoard' || 
            prevScreenState === 'subscription' || 
            prevScreenState === 'moodResponse' || 
            prevScreenState === 'mood' || 
            prevScreenState === 'register') {
          
          console.log("HISTORY TRIGGER: Detecting transition to main from onboarding:", prevScreenState);
          
          // Reset the tutorial flag to ensure it shows
          localStorage.setItem('dashboardTutorialShown', 'false');
          
          // Also reset the popupsShown tutorial flags in localStorage
          const popupsShown = localStorage.getItem('popupsShown');
          if (popupsShown) {
            const parsedState = JSON.parse(popupsShown);
            parsedState.mainTutorial = false;
            parsedState.transitionTutorial = false;
            localStorage.setItem('popupsShown', JSON.stringify(parsedState));
          }
        }
      }
      
      if (location.state.returnToMain) {
        window.history.replaceState(
          { ...window.history.state, screenState: location.state.screenState, returnToMain: true }, 
          document.title
        );
      } else {
        window.history.replaceState(
          { ...window.history.state, screenState: location.state.screenState }, 
          document.title
        );
      }
    } else if (location.state && location.state.returnToIntro) {
      setScreenState('intro');
      
      window.history.replaceState(
        { ...window.history.state, screenState: 'intro' }, 
        document.title
      );
    } else {
      // When returning from other pages (like workshops) without state, 
      // go directly to 'main' instead of 'intro' screen
      window.history.replaceState(
        { ...window.history.state, screenState: 'main' }, 
        document.title
      );
      
      // Only start the intro timer if we're explicitly on the intro screen
      // This prevents the auto-transition when coming back from other pages
      if (screenState === 'intro') {
        const timer = setTimeout(() => {
          if (screenState === 'intro') {
            setScreenState('mood');
            window.history.replaceState(
              { ...window.history.state, screenState: 'mood' }, 
              document.title
            );
          }
        }, 7000);

        return () => clearTimeout(timer);
      }
    }
  }, [location.state, screenState, setScreenState]);

  useEffect(() => {
    console.log("Screen state changed to:", screenState);
    window.history.replaceState(
      { ...window.history.state, screenState }, 
      document.title
    );
    
    // Store the previous screen state for transition detection
    localStorage.setItem('prevScreenState', screenState);
  }, [screenState]);
};

export default useScreenHistory;
