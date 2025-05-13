
import React from "react";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { useScreenNavigation } from "./screen-manager/ScreenNavigation";
import EscapeHatchManager from "./screen-manager/EscapeHatchManager";
import useScreenDebugger from "./screen-manager/useScreenDebugger";
import ScreenRenderer from "./screen-manager/ScreenRenderer";

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
  
  // Use the screen debugger hook for logging
  useScreenDebugger(screenState);
  
  // Use our custom navigation hook instead of a component
  const { 
    handleContinueToMood, 
    handlePrevious, 
    handleSkip 
  } = useScreenNavigation({ screenState, setScreenState });
  
  return (
    <>
      {/* Escape hatch for recovery from potential stuck states */}
      <EscapeHatchManager 
        screenState={screenState} 
        setScreenState={setScreenState} 
      />
      
      {/* Render the appropriate screen based on state */}
      <ScreenRenderer
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
        handleContinueToMood={handleContinueToMood}
        handlePrevious={handlePrevious}
        handleSkip={handleSkip}
      />
    </>
  );
};

export default IndexScreenManager;
