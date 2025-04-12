
import React from "react";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import IndexScreenManager from "@/components/home/IndexScreenManager";
import WelcomeTutorial from "@/components/tutorials/WelcomeTutorial";
import { useToast } from "@/hooks/use-toast";

interface IndexContentProps {
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
  isFirstVisit: boolean;
  setIsFirstVisit: (value: boolean) => void;
  showCoPayCredit: boolean;
  setShowCoPayCredit: (value: boolean) => void;
  popupsShown: any;
  getTranslatedText: (key: string) => string;
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
  markTutorialCompleted: () => void;
}

const IndexContent: React.FC<IndexContentProps> = ({
  screenState,
  selectedMood,
  userInfo,
  selectedPlan,
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
  onHenryToggle,
  navigateToFeature,
  handleSubscriptionContinue,
  handleVisionBoardContinue,
  handleRegister,
  setScreenState,
  markTutorialCompleted
}) => {
  const { toast } = useToast();

  // Only show welcome tutorial when in main screen, not during onboarding
  const shouldShowTutorial = isFirstVisit && !popupsShown.mainTutorial && screenState === 'main';

  const handleSkipTutorial = () => {
    setIsFirstVisit(false);
    markTutorialCompleted();
    toast({
      title: getTranslatedText('skipForNow'),
      description: getTranslatedText('tutorialAccess'),
    });
  };

  const handleCloseTutorial = () => {
    setIsFirstVisit(false);
    markTutorialCompleted();
  };

  return (
    <div className="relative">
      {showCoPayCredit && !popupsShown.coPayCredit && 
        <CoPayCreditPopup 
          open={showCoPayCredit} 
          onOpenChange={setShowCoPayCredit} 
        />
      }
      
      <IndexScreenManager
        screenState={screenState}
        selectedMood={selectedMood}
        userInfo={userInfo}
        selectedPlan={selectedPlan}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        showHenry={showHenry}
        onMoodSelect={onMoodSelect}
        onUserInfoChange={onUserInfoChange}
        onQualityToggle={onQualityToggle}
        onGoalToggle={onGoalToggle}
        onPlanSelect={onPlanSelect}
        onHenryToggle={onHenryToggle}
        navigateToFeature={navigateToFeature}
        handleSubscriptionContinue={handleSubscriptionContinue}
        handleVisionBoardContinue={handleVisionBoardContinue}
        handleRegister={handleRegister}
        setScreenState={setScreenState}
        markTutorialCompleted={markTutorialCompleted}
      />
      
      {/* Only show welcome tutorial for tutorial button clicks, not during onboarding */}
      {shouldShowTutorial && 
        <WelcomeTutorial
          isOpen={shouldShowTutorial}
          onClose={handleCloseTutorial}
        />
      }
    </div>
  );
};

export default IndexContent;
