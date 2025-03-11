
import { useLocation } from "react-router-dom";

export const useButtonVisibility = () => {
  const location = useLocation();
  
  // Determine if the button should be visible based on the current route
  const shouldShowButton = () => {
    // Initial screens where button should NEVER appear
    const initialScreens = [
      '/initial-screen',
      '/emotional-check',
      '/registration',
      '/pricing-plan',
      '/vision-board',
      '/onboarding',
      '/cheese-plant',
      '/creator'
    ];
    
    // Explicitly include routes where the button SHOULD appear
    const featureRoutes = [
      '/',  // Main menu
      '/index',
      '/mental-wellness-tools',
      '/workshops'
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
    
    // If the current path is one of the feature routes, show the button
    if (featureRoutes.includes(location.pathname)) {
      return true;
    }
    
    // Button should appear on all other screens not in initialScreens
    return true;
  };

  return shouldShowButton();
};
