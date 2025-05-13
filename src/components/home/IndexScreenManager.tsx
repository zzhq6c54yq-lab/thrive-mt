
import React, { useEffect } from "react";
import IntroScreen from "@/components/home/IntroScreen";
import MoodScreen from "@/components/home/MoodScreen";
import MoodResponse from "@/components/home/MoodResponse";
import RegistrationScreen from "@/components/home/RegistrationScreen";
import SubscriptionScreen from "@/components/home/SubscriptionScreen";
import SubscriptionAddOns from "@/components/home/SubscriptionAddOns";
import VisionBoard from "@/components/home/VisionBoard";
import MainDashboard from "@/components/home/MainDashboard";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

interface IndexScreenManagerProps {
  screenState: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main';
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  userInfo: {
    name: string;
    email: string;
    password: string;
  };
  selectedPlan: string | null;
  selectedAddOns: string[];
  selectedQualities: string[];
  selectedGoals: string[];
  showHenry: boolean;
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
  onUserInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQualityToggle: (id: string) => void;
  onGoalToggle: (id: string) => void;
  onPlanSelect: (planTitle: string) => void;
  onAddOnToggle: (id: string) => void;
  onHenryToggle: () => void;
  navigateToFeature: (path: string) => void;
  handleSubscriptionContinue: () => void;
  handleAddOnsContinue: () => void;
  handleVisionBoardContinue: () => void;
  handleRegister: (e: React.FormEvent) => void;
  setScreenState: (state: 'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main') => void;
  markTutorialCompleted?: () => void;
}

const IndexScreenManager: React.FC<IndexScreenManagerProps> = ({
  screenState,
  selectedMood,
  userInfo,
  selectedPlan,
  selectedAddOns,
  selectedQualities,
  selectedGoals,
  showHenry,
  onMoodSelect,
  onUserInfoChange,
  onQualityToggle,
  onGoalToggle,
  onPlanSelect,
  onAddOnToggle,
  onHenryToggle,
  navigateToFeature,
  handleSubscriptionContinue,
  handleAddOnsContinue,
  handleVisionBoardContinue,
  handleRegister,
  setScreenState,
  markTutorialCompleted
}) => {
  const { isSpanish } = useTranslation();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("[IndexScreenManager] Current screen state:", screenState);
  }, [screenState]);

  useEffect(() => {
    if (screenState === 'intro') {
      console.log("[IndexScreenManager] Starting new session from intro screen");
    }
  }, [screenState]);

  const handleContinueToMood = () => {
    console.log("[IndexScreenManager] Continuing from intro to mood");
    setScreenState('mood');
    toast({
      title: "Welcome to Thrive MT",
      description: "Let's start by checking in with your mood today",
    });
  };

  const handlePrevious = () => {
    console.log("[IndexScreenManager] Moving to previous screen from", screenState);
    
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
    console.log("[IndexScreenManager] Skipping to main screen from", screenState);
    setScreenState('main');
    // Mark onboarding as completed when skipping to main
    localStorage.setItem('hasCompletedOnboarding', 'true');
  };

  // Debug render
  console.log("[IndexScreenManager] Rendering screen:", screenState);
  
  switch (screenState) {
    case 'intro':
      return <IntroScreen onContinue={handleContinueToMood} />;
    case 'mood':
      return (
        <MoodScreen
          onMoodSelect={onMoodSelect}
        />
      );
    case 'moodResponse':
      return (
        <MoodResponse
          selectedMood={selectedMood}
          onContinue={() => setScreenState('register')}
          onPrevious={handlePrevious}
        />
      );
    case 'register':
      return (
        <RegistrationScreen
          userInfo={userInfo}
          onUserInfoChange={onUserInfoChange}
          onSubmit={handleRegister}
          onPrevious={handlePrevious}
          onSkip={() => setScreenState('subscription')}
        />
      );
    case 'subscription':
      return (
        <SubscriptionScreen
          selectedPlan={selectedPlan}
          onPlanSelect={onPlanSelect}
          onContinue={handleSubscriptionContinue}
          onPrevious={handlePrevious}
          onSkip={() => setScreenState('subscriptionAddOns')}
        />
      );
    case 'subscriptionAddOns':
      return (
        <SubscriptionAddOns
          selectedPlan={selectedPlan}
          selectedAddOns={selectedAddOns}
          onAddOnToggle={onAddOnToggle}
          onContinue={handleAddOnsContinue}
          onPrevious={handlePrevious}
          onSkip={() => setScreenState('visionBoard')}
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
          onPrevious={handlePrevious}
          onSkip={handleSkip}
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
          markTutorialCompleted={markTutorialCompleted}
        />
      );
    default:
      console.error("[IndexScreenManager] Unknown screen state:", screenState);
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] text-white">
          <h2 className="text-2xl mb-4">Something went wrong</h2>
          <p className="mb-6">We couldn't load the correct screen.</p>
          <button 
            className="bg-[#B87333] hover:bg-[#B87333]/80 px-6 py-3 rounded-md"
            onClick={() => {
              localStorage.removeItem('hasCompletedOnboarding');
              localStorage.removeItem('prevScreenState');
              setScreenState('intro');
            }}
          >
            Restart
          </button>
        </div>
      );
  }
};

export default IndexScreenManager;
