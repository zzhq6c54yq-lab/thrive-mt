
import React from "react";
import IntroScreen from "@/components/home/IntroScreen";
import MoodScreen from "@/components/home/MoodScreen";
import MoodResponse from "@/components/home/MoodResponse";
import RegistrationScreen from "@/components/home/RegistrationScreen";
import SubscriptionScreen from "@/components/home/SubscriptionScreen";
import SubscriptionAddOns from "@/components/home/SubscriptionAddOns";
import VisionBoard from "@/components/home/VisionBoard";
import MainDashboard from "@/components/home/MainDashboard";
import ErrorScreen from "./ErrorScreen";

interface ScreenRendererProps {
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
  handleContinueToMood: () => void;
  handlePrevious: () => void;
  handleSkip: () => void;
}

const ScreenRenderer: React.FC<ScreenRendererProps> = ({
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
  markTutorialCompleted,
  handleContinueToMood,
  handlePrevious,
  handleSkip
}) => {
  
  // Render the appropriate screen based on the current state
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
      console.error("[ScreenRenderer] Unknown screen state:", screenState);
      return <ErrorScreen setScreenState={setScreenState} />;
  }
};

export default ScreenRenderer;
