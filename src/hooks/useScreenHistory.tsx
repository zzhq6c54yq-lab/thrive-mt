
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScreenHistory = (
  screenState: string,
  setScreenState: (state: any) => void
) => {
  const location = useLocation();

  useEffect(() => {
    // Handle incoming state from navigation
    if (location.state) {
      // If returnToFeature is true, we're coming back from an action in a feature
      if (location.state.returnToFeature) {
        // Stay on the current screen state, don't change anything
        console.log("Returning to feature, maintaining state");
      }
      // If we're returning from another feature to the main dashboard
      else if (location.state.returnToMain) {
        setScreenState('main');
        
        window.history.replaceState(
          { ...window.history.state, screenState: 'main', returnToMain: true }, 
          document.title
        );
      } 
      // If we have a specific screen state to set
      else if (location.state.screenState) {
        setScreenState(location.state.screenState);
        
        window.history.replaceState(
          { ...window.history.state, screenState: location.state.screenState }, 
          document.title
        );
      } 
      // If we're explicitly returning to intro
      else if (location.state.returnToIntro) {
        setScreenState('intro');
        
        window.history.replaceState(
          { ...window.history.state, screenState: 'intro' }, 
          document.title
        );
      }
    } else {
      // When returning without state (like browser back button)
      // Always return to main instead of intro
      setScreenState('main');
      
      window.history.replaceState(
        { ...window.history.state, screenState: 'main' }, 
        document.title
      );
    }
    
    // Only start the intro timer if we're explicitly on the intro screen
    // and there's no state indicating we came from elsewhere
    if (screenState === 'intro' && (!location.state || !location.state.preventTutorial)) {
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
  }, [location.state, setScreenState]);

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
