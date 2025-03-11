
import { useLocation } from "react-router-dom";

export const useButtonVisibility = () => {
  const location = useLocation();
  
  // Determine if the button should be visible based on the current route
  const shouldShowButton = () => {
    // Initial setup screens where button should NOT appear
    const initialScreens = [
      '/',  // Adding root path (initial screen)
      '/index',
      '/initial-screen',
      '/vision-board',
      '/onboarding',
      '/emotional-check',
      '/registration',
      '/cheese-plant',
      '/creator'
    ];
    
    // Check if current path is one of the initial screens (exact match)
    if (initialScreens.includes(location.pathname)) {
      return false;
    }
    
    // Check if current path is a subpath of any initial screen
    for (const screen of initialScreens) {
      if (location.pathname.startsWith(`${screen}/`)) {
        return false;
      }
    }
    
    // Button should appear on all other screens
    return true;
  };

  return shouldShowButton();
};
