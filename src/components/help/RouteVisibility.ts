
import { useLocation } from "react-router-dom";

export const useButtonVisibility = () => {
  const location = useLocation();
  
  // Determine if the button should be visible based on the current route
  const shouldShowButton = () => {
    console.log("Current path for button visibility check:", location.pathname);
    
    // Check if the current path is the home path and there's a specific state related to screens
    if (location.pathname === "/" || location.pathname === "/index") {
      // Get state from location if available
      const state = location.state as { screenState?: string } | null;
      const screenState = state?.screenState;
      
      // Skip button on these specific screens
      const excludedScreenStates = ['intro', 'mood', 'moodResponse', 'register', 'subscription', 'visionBoard'];
      
      if (!state || excludedScreenStates.includes(screenState || '')) {
        console.log("Hiding button: Home path with excluded screenState:", screenState);
        return false;
      }
    }
    
    // Now we will show buttons on all screens except for these specific ones
    const excludedScreens = [
      '/creator' // Only exclude the creator screen
    ];
    
    // Check if the current path is in the excluded screens list
    if (excludedScreens.includes(location.pathname)) {
      console.log("Hiding button: Exact match for excluded screen:", location.pathname);
      return false;
    }
    
    // By default, now show the button on all screens
    console.log("Showing button: Default for path:", location.pathname);
    return true;
  };

  return shouldShowButton();
};
