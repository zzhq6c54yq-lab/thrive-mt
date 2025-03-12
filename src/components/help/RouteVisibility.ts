
import { useLocation } from "react-router-dom";

export const useButtonVisibility = () => {
  const location = useLocation();
  
  // Determine if the button should be visible based on the current route
  const shouldShowButton = () => {
    console.log("Current path for button visibility check:", location.pathname);
    
    // Define the main menu routes where the button SHOULD start to appear
    // IMPORTANT: '/' and '/index' are NOT included here - these are pre-main menu screens
    const mainMenuRoutes = [
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
    
    // List of screens where the button should NEVER appear
    const preMainMenuScreens = [
      '/',           // Index/Home screen
      '/index',      // Alternate index route
      '/initial-screen',
      '/emotional-check',
      '/registration',
      '/pricing-plan',
      '/vision-board',
      '/onboarding',
      '/cheese-plant',
      '/creator'
    ];
    
    // First, explicitly check if we're on a pre-main menu screen - if so, NEVER show the button
    if (preMainMenuScreens.includes(location.pathname)) {
      console.log("Hiding button: Exact match for pre-main menu screen:", location.pathname);
      return false;
    }
    
    // Check if the path contains any pre-main menu keywords
    const preMainMenuKeywords = ['initial', 'emotional', 'registration', 'pricing', 'vision', 'onboarding', 'cheese', 'creator', 'index'];
    
    for (const keyword of preMainMenuKeywords) {
      if (location.pathname.includes(keyword)) {
        console.log("Hiding button: Path contains pre-main menu keyword:", keyword);
        return false;
      }
    }
    
    // Check if current path matches or is a sub-route of a main menu route - show button
    for (const route of mainMenuRoutes) {
      if (location.pathname === route || location.pathname.startsWith(`${route}/`)) {
        console.log("Showing button: On approved main menu route:", location.pathname);
        return true;
      }
    }
    
    // For any paths not explicitly allowed, default to hiding the button
    console.log("Hiding button: Default for unknown path:", location.pathname);
    return false;
  };

  return shouldShowButton();
};
