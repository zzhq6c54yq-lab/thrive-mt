
import React from "react";
import IntroScreen from "@/components/home/IntroScreen";
import MoodScreen from "@/components/home/MoodScreen";
import MoodResponse from "@/components/home/MoodResponse";
import RegistrationScreen from "@/components/home/RegistrationScreen";
import SubscriptionScreen from "@/components/home/SubscriptionScreen";
import VisionBoard from "@/components/home/VisionBoard";
import MainDashboard from "@/components/home/MainDashboard";

interface IndexScreenManagerProps {
  screenState: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'visionBoard' | 'main';
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  userInfo: {
    name: string;
    email: string;
    password: string;
  };
  selectedPlan: string | null;
  selectedQualities: string[];
  selectedGoals: string[];
  showHenry: boolean;
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onUserInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQualityToggle: (id: string) => void;
  onGoalToggle: (id: string) => void;
  onPlanSelect: (planTitle: string) => void;
  onHenryToggle: () => void;
  navigateToFeature: (path: string) => void;
  handleSubscriptionContinue: () => void;
  handleVisionBoardContinue: () => void;
  handleRegister: (e: React.FormEvent) => void;
  setScreenState: (state: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'visionBoard' | 'main') => void;
}

const IndexScreenManager: React.FC<IndexScreenManagerProps> = ({
  screenState,
  selectedMood,
  userInfo,
  selectedPlan,
  selectedQualities,
  selectedGoals,
  showHenry,
  onMoodSelect,
  onUserInfoChange,
  onQualityToggle,
  onGoalToggle,
  onPlanSelect,
  onHenryToggle,
  navigateToFeature,
  handleSubscriptionContinue,
  handleVisionBoardContinue,
  handleRegister,
  setScreenState
}) => {
  // Save previous state to localStorage for transition detection
  React.useEffect(() => {
    const prevState = localStorage.getItem('prevScreenState');
    console.log("IndexScreenManager: Screen changing from", prevState, "to", screenState);
    localStorage.setItem('prevScreenState', screenState);
    
    // When navigating to main from onboarding screens, ensure tutorial will show
    if (screenState === 'main') {
      const prevState = localStorage.getItem('prevScreenState');
      if (prevState === 'visionBoard' || 
          prevState === 'subscription' || 
          prevState === 'moodResponse' || 
          prevState === 'mood' || 
          prevState === 'register') {
        
        console.log("MANAGER TRIGGER: Transitioning to main from:", prevState);
        
        // Force show tutorial by resetting flag and doing it early in the process
        localStorage.setItem('dashboardTutorialShown', 'false');
        
        // Also reset the popupsShown tutorial flags in localStorage
        const popupsShown = localStorage.getItem('popupsShown');
        if (popupsShown) {
          const parsedState = JSON.parse(popupsShown);
          parsedState.mainTutorial = false;
          parsedState.transitionTutorial = false;
          localStorage.setItem('popupsShown', JSON.stringify(parsedState));
        }
      }
    }
  }, [screenState]);

  // Reset transition tutorial flags when starting a new session
  React.useEffect(() => {
    if (screenState === 'intro') {
      // Reset the tutorial flags to ensure tutorial shows after onboarding
      localStorage.removeItem('dashboardTutorialShown');
      
      // Get popup state and reset transition tutorial flag
      const popupsShown = localStorage.getItem('popupsShown');
      if (popupsShown) {
        const parsedState = JSON.parse(popupsShown);
        parsedState.transitionTutorial = false;
        parsedState.mainTutorial = false; // Reset main tutorial flag as well
        localStorage.setItem('popupsShown', JSON.stringify(parsedState));
      }
    }
  }, [screenState]);

  const handlePrevious = () => {
    let newScreenState: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'visionBoard' | 'main' = 'intro';
    
    if (screenState === 'mood') {
      newScreenState = 'intro';
    } else if (screenState === 'moodResponse') {
      newScreenState = 'mood';
    } else if (screenState === 'register') {
      newScreenState = 'moodResponse';
    } else if (screenState === 'subscription') {
      newScreenState = 'register';
    } else if (screenState === 'visionBoard') {
      newScreenState = 'subscription';
    } else if (screenState === 'main') {
      newScreenState = 'visionBoard';
    }
    
    setScreenState(newScreenState);
  };

  const handleSkip = () => {
    setScreenState('main');
  };

  switch (screenState) {
    case 'intro':
      return <IntroScreen onContinue={() => setScreenState('mood')} />;
    case 'mood':
      return (
        <MoodScreen
          onMoodSelect={onMoodSelect}
          onPrevious={() => setScreenState('intro')}
        />
      );
    case 'moodResponse':
      return (
        <MoodResponse
          selectedMood={selectedMood}
          onContinue={() => setScreenState('register')}
          onPrevious={() => setScreenState('mood')}
        />
      );
    case 'register':
      return (
        <RegistrationScreen
          userInfo={userInfo}
          onUserInfoChange={onUserInfoChange}
          onSubmit={handleRegister}
          onPrevious={() => setScreenState('moodResponse')}
          onSkip={() => setScreenState('subscription')}
        />
      );
    case 'subscription':
      return (
        <SubscriptionScreen
          selectedPlan={selectedPlan}
          onPlanSelect={onPlanSelect}
          onContinue={handleSubscriptionContinue}
          onPrevious={() => setScreenState('register')}
          onSkip={() => setScreenState('main')}
        />
      );
    case 'visionBoard':
      return (
        <VisionBoard
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
          onQualityToggle={onQualityToggle}
          onGoalToggle={onGoalToggle}
          onContinue={handleVisionBoardContinue}
          onPrevious={() => setScreenState('subscription')}
          onSkip={() => setScreenState('main')}
        />
      );
    case 'main':
      return (
        <MainDashboard
          userName={userInfo.name}
          showHenry={showHenry}
          onHenryToggle={onHenryToggle}
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
          navigateToFeature={navigateToFeature}
        />
      );
    default:
      return null;
  }
};

export default IndexScreenManager;
