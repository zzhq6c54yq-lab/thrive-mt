
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScreenHistory = (
  screenState: string,
  setScreenState: (state: any) => void
) => {
  const location = useLocation();

  // Handle initial routing and special program paths
  useEffect(() => {
    // Check for first visit to properly show onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    
    // Debug current state
    console.log("[useScreenHistory] Current screen state:", screenState);
    console.log("[useScreenHistory] Completed onboarding:", hasCompletedOnboarding);
    console.log("[useScreenHistory] Current location:", location.pathname);
    
    // Handle special program paths - always ensure we're in main state for these
    const isSpecialProgramPath = location.pathname.includes('cancer-support') || 
                                location.pathname.includes('chronic-illness') ||
                                location.pathname.includes('golden-years') ||
                                location.pathname.includes('small-business');
    
    if (isSpecialProgramPath) {
      console.log("[useScreenHistory] Detected special program path:", location.pathname);
      // For specialized programs, ensure we're in main state to render properly
      if (screenState !== 'main') {
        console.log("[useScreenHistory] Setting screen state to main for specialized program");
        setScreenState('main');
      }
      return;
    }
    
    // Only handle history state if we're on the root path
    if (location.pathname !== '/') {
      return;
    }
    
    // Handle incoming state from navigation
    if (location.state) {
      console.log("[useScreenHistory] Navigation state:", location.state);
      
      // If returnToFeature is true, we're coming back from an action in a feature
      if (location.state.returnToFeature) {
        // Stay on the current screen state, don't change anything
        console.log("[useScreenHistory] Returning to feature, maintaining state");
        return;
      }
      // If we're returning from another feature to the main dashboard
      else if (location.state.returnToMain) {
        setScreenState('main');
        return;
      } 
      // If we have a specific screen state to set
      else if (location.state.screenState) {
        setScreenState(location.state.screenState);
        return;
      } 
      // If we're explicitly returning to intro
      else if (location.state.returnToIntro) {
        setScreenState('intro');
        return;
      }
    } 
    
    // When returning without state (like browser back button or initial load)
    if (location.pathname === '/') {
      // If onboarding wasn't completed, start from the beginning
      if (!hasCompletedOnboarding && screenState !== 'main') {
        console.log("[useScreenHistory] Starting onboarding from beginning - no completion record found");
        setScreenState('intro');
      } else if (hasCompletedOnboarding && screenState === 'intro') {
        // If onboarding is completed but we're somehow in intro, go to main
        console.log("[useScreenHistory] Onboarding already completed, going to main dashboard");
        setScreenState('main');
      }
    }
  }, [location, setScreenState, screenState]);

  // Record screen state changes to localStorage
  useEffect(() => {
    console.log("[useScreenHistory] Screen state changed to:", screenState);
    
    // Store the previous screen state for transition detection
    localStorage.setItem('prevScreenState', screenState);
    
    // Mark onboarding as completed when reaching main screen
    if (screenState === 'main') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
  }, [screenState]);
};

export default useScreenHistory;
