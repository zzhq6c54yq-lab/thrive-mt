
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
    
    // If the path is either the main menu or one of the feature routes, show the button
    if (location.pathname === '/' || location.pathname === '/index' || featureRoutes.includes(location.pathname)) {
      return true;
    }
    
    // For all other screens, check if they are "after" the main menu by ensuring they don't contain
    // any substrings that would indicate they are part of the initial onboarding flow
    const onboardingSubpaths = ['initial', 'emotional', 'registration', 'pricing', 'vision', 'onboarding', 'cheese', 'creator'];
    
    for (const subpath of onboardingSubpaths) {
      if (location.pathname.includes(subpath)) {
        return false;
      }
    }
    
    // If we've made it here, the screen is likely after the main menu
    return true;
  };

  return shouldShowButton();
};
