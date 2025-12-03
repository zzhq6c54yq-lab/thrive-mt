import { useLocation } from "react-router-dom";

export const useButtonVisibility = () => {
  const location = useLocation();
  
  // Determine if the button should be visible based on the current route
  const shouldShowButton = () => {
    // On the index page, we need to check the screenState
    if (location.pathname === "/" || location.pathname === "/index") {
      // Get state from location if available
      const state = location.state as { screenState?: string } | null;
      const screenState = state?.screenState;
      
      // Hide the button on all initial onboarding screens
      const initialScreens = ['intro', 'mood', 'moodResponse', 'register', 'subscription', 'visionBoard'];
      
      // Only show the button on the main dashboard after completing the onboarding
      if (screenState === 'main') {
        return true;
      }
      
      // Hide on all initial screens
      if (initialScreens.includes(String(screenState))) {
        return false;
      }
      
      // Default for index page - hide button unless explicitly on main
      return false;
    }
    
    // Now we will show buttons on all screens except for these specific ones
    const excludedScreens = [
      '/creator',
      '/small-business-portal/options'
    ];
    
    // Check if the current path is in the excluded screens list
    if (excludedScreens.includes(location.pathname)) {
      return false;
    }
    
    // By default, now show the button on all other screens
    return true;
  };

  return shouldShowButton();
};
