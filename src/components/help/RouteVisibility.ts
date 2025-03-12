
import { useLocation } from "react-router-dom";

export const useButtonVisibility = () => {
  const location = useLocation();
  
  // Determine if the button should be visible based on the current route
  const shouldShowButton = () => {
    // Define the main menu routes where the button SHOULD start to appear
    const mainMenuRoutes = [
      '/',      // Main menu
      '/index'  // Main menu alternate route
    ];
    
    // Feature routes after the main menu where the button should also appear
    const featureRoutes = [
      '/mental-wellness-tools',
      '/workshops',
      '/real-time-therapy',
      '/scheduling',
      '/privacy-security',
      '/my-sponsor',
      '/therapist-questionnaire',
      '/therapist-matches',
      '/workshop',
      '/virtual-meetings',
      '/mental-health-games',
      '/personalized-content',
      '/community-support',
      '/resource-library',
      '/progress-reports'
    ];
    
    // First screens before the main menu where button should NEVER appear
    const preMainMenuScreens = [
      '/initial-screen',
      '/emotional-check',
      '/registration',
      '/pricing-plan',
      '/vision-board',
      '/onboarding',
      '/cheese-plant',
      '/creator'
    ];
    
    // Check if current path is exactly a main menu route - show button
    if (mainMenuRoutes.includes(location.pathname)) {
      return true;
    }
    
    // Check if current path matches or is a sub-route of a feature route - show button
    for (const route of featureRoutes) {
      if (location.pathname === route || location.pathname.startsWith(`${route}/`)) {
        return true;
      }
    }
    
    // Check if current path is or starts with a pre-main menu screen - hide button
    for (const screen of preMainMenuScreens) {
      if (location.pathname === screen || location.pathname.startsWith(`${screen}/`)) {
        return false;
      }
    }
    
    // Check if the path contains any keywords indicating it's part of the pre-main menu flow
    const preMainMenuKeywords = ['initial', 'emotional', 'registration', 'pricing', 'vision', 'onboarding', 'cheese', 'creator'];
    
    for (const keyword of preMainMenuKeywords) {
      if (location.pathname.includes(keyword)) {
        return false;
      }
    }
    
    // For any other routes, default to showing the button as they're likely post-main menu
    return true;
  };

  return shouldShowButton();
};
