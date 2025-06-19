
import React from "react";
import IndexScreenManager from "@/components/home/IndexScreenManager";
import WelcomeTutorial from "@/components/tutorials/WelcomeTutorial";
import { useToast } from "@/hooks/use-toast";

interface PopupState {
  coPayCredit: boolean;
  henryIntro: boolean;
  mainTutorial: boolean;
  transitionTutorial: boolean;
}

interface IndexContentProps {
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
  isFirstVisit: boolean;
  setIsFirstVisit: (value: boolean) => void;
  showCoPayCredit: boolean;
  setShowCoPayCredit: (value: boolean) => void;
  popupsShown: PopupState;
  getTranslatedText: (key: string) => string;
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
  markTutorialCompleted: () => void;
  isInOnboarding?: boolean;
}

const IndexContent: React.FC<IndexContentProps> = ({
  screenState,
  selectedMood,
  userInfo,
  selectedPlan,
  selectedAddOns,
  selectedQualities,
  selectedGoals,
  showHenry,
  isFirstVisit,
  setIsFirstVisit,
  showCoPayCredit,
  setShowCoPayCredit,
  popupsShown,
  getTranslatedText,
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
  isInOnboarding = false
}) => {
  const { toast } = useToast();

  // Completely disable tutorial popups to prevent white popup issues
  const shouldShowTutorial = false;

  const handleSkipTutorial = () => {
    setIsFirstVisit(false);
    markTutorialCompleted();
  };

  const handleCloseTutorial = () => {
    setIsFirstVisit(false);
    markTutorialCompleted();
  };

  return (
    <div className="relative">
      <IndexScreenManager
        screenState={screenState}
        selectedMood={selectedMood}
        userInfo={userInfo}
        selectedPlan={selectedPlan}
        selectedAddOns={selectedAddOns}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        showHenry={showHenry}
        onMoodSelect={onMoodSelect}
        onUserInfoChange={onUserInfoChange}
        onQualityToggle={onQualityToggle}
        onGoalToggle={onGoalToggle}
        onPlanSelect={onPlanSelect}
        onAddOnToggle={onAddOnToggle}
        onHenryToggle={onHenryToggle}
        navigateToFeature={navigateToFeature}
        handleSubscriptionContinue={handleSubscriptionContinue}
        handleAddOnsContinue={handleAddOnsContinue}
        handleVisionBoardContinue={handleVisionBoardContinue}
        handleRegister={handleRegister}
        setScreenState={setScreenState}
        markTutorialCompleted={markTutorialCompleted}
        isInOnboarding={isInOnboarding}
      />
    </div>
  );
};

export default IndexContent;
