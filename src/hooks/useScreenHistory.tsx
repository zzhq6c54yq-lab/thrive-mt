
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScreenHistory = (
  screenState: string,
  setScreenState: (state: any) => void
) => {
  const location = useLocation();

  useEffect(() => {
    // Check for first visit to properly show onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    
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
      // When returning without state (like browser back button or initial load)
      // Start onboarding process if user hasn't completed it yet
      if (!hasCompletedOnboarding) {
        setScreenState('intro');
        console.log("Starting onboarding from beginning - no completion record found");
        window.history.replaceState(
          { ...window.history.state, screenState: 'intro' }, 
          document.title
        );
      } else {
        // Return to main if onboarding is completed
        setScreenState('main');
        console.log("Onboarding already completed, going to main dashboard");
        window.history.replaceState(
          { ...window.history.state, screenState: 'main' }, 
          document.title
        );
      }
    }
    
    // Only start the intro timer if we're explicitly on the intro screen
    // and there's no state indicating we came from elsewhere
    if (screenState === 'intro' && (!location.state || !location.state.preventTutorial)) {
      const timer = setTimeout(() => {
        if (screenState === 'intro') {
          setScreenState('mood');
          console.log("Auto-advancing from intro to mood screen");
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
    
    // Mark onboarding as completed when reaching main screen
    if (screenState === 'main') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
  }, [screenState]);
};

export default useScreenHistory;
