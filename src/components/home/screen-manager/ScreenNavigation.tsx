
import { toast } from "@/hooks/use-toast";

interface ScreenNavigationProps {
  screenState: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';
  setScreenState: (state: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main') => void;
}

// Changed from React.FC to a custom hook that returns navigation handlers
export const useScreenNavigation = ({ screenState, setScreenState }: ScreenNavigationProps) => {
  
  const handleContinueToMood = () => {
    console.log("[ScreenNavigation] Continuing from intro to mood");
    setScreenState('mood');
    toast({
      title: "Welcome to Thrive MT",
      description: "Let's start by checking in with your mood today",
    });
  };

  const handlePrevious = () => {
    console.log("[ScreenNavigation] Moving to previous screen from", screenState);
    
    switch (screenState) {
      case 'mood':
        setScreenState('intro');
        break;
      case 'moodResponse':
        setScreenState('mood');
        break;
      case 'register':
        setScreenState('moodResponse');
        break;
      case 'subscription':
        setScreenState('register');
        break;
      case 'subscriptionAddOns':
        setScreenState('subscription');
        break;
      case 'visionBoard':
        setScreenState('subscriptionAddOns');
        break;
      case 'main':
        setScreenState('visionBoard');
        break;
      default:
        setScreenState('intro');
    }
  };

  const handleSkip = () => {
    console.log("[ScreenNavigation] Skipping to main screen from", screenState);
    setScreenState('main');
    // Mark onboarding as completed when skipping to main
    localStorage.setItem('hasCompletedOnboarding', 'true');
  };
  
  return {
    handleContinueToMood,
    handlePrevious,
    handleSkip
  };
};
