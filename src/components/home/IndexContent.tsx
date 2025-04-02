
import React, { useEffect } from "react";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import IndexScreenManager from "@/components/home/IndexScreenManager";
import WelcomeTutorial from "@/components/tutorials/WelcomeTutorial";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
  showMainTutorial: boolean;
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
  showMainTutorial,
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
  
  // Effect to handle tutorial display logic
  useEffect(() => {
    if (screenState === 'main') {
      console.log("IndexContent - Main screen detected. isFirstVisit:", isFirstVisit, "showMainTutorial:", showMainTutorial);
      
      // Force tutorial display if coming from onboarding
      const prevScreenState = localStorage.getItem('prevScreenState');
      console.log("Previous screen state:", prevScreenState);
      
      const comingFromOnboarding = (
        prevScreenState === 'visionBoard' || 
        prevScreenState === 'subscription' || 
        prevScreenState === 'register' || 
        prevScreenState === 'moodResponse'
      );
      
      if (comingFromOnboarding || showMainTutorial) {
        console.log("Coming from onboarding or showMainTutorial is true - setting isFirstVisit to true");
        
        // Ensure the tutorial shows
        setIsFirstVisit(true);
        
        // Set a flag to remember this was an onboarding transition
        if (comingFromOnboarding) {
          console.log("Setting flag for onboarding completion");
          sessionStorage.setItem('justCompletedOnboarding', 'true');
        }
        
        // Clear localStorage items that might prevent tutorial from showing
        localStorage.removeItem('popupsShown');
        localStorage.removeItem('hasVisitedThriveMT');
        localStorage.removeItem('dashboardTutorialShown');
      }
    }
  }, [screenState, showMainTutorial, setIsFirstVisit, isFirstVisit]);

  const handleCloseTutorial = () => {
    console.log("handleCloseTutorial called - marking tutorial as completed");
    setIsFirstVisit(false);
    markTutorialCompleted();
    
    // If this was immediately after onboarding, show a welcome toast
    if (sessionStorage.getItem('justCompletedOnboarding')) {
      toast({
        title: getTranslatedText("welcomeToThrive"),
        description: getTranslatedText("exploreAllFeatures"),
      });
      sessionStorage.removeItem('justCompletedOnboarding');
    }
  };

  console.log("IndexContent rendering with screenState:", screenState, "isFirstVisit:", isFirstVisit, "showMainTutorial:", showMainTutorial);

  // Determine if tutorial should be visible
  const shouldShowTutorial = (isFirstVisit || showMainTutorial) && screenState === 'main';
  console.log("Should show tutorial:", shouldShowTutorial);

  // Log tutorial state - done before the return statement to avoid rendering void in JSX
  if (shouldShowTutorial) {
    console.log("Rendering welcome tutorial because shouldShowTutorial is true");
  } else {
    console.log("NOT rendering welcome tutorial because shouldShowTutorial is false");
  }

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
      />
      
      {/* Enhanced WelcomeTutorial component with improved visibility */}
      <WelcomeTutorial
        isOpen={shouldShowTutorial}
        onClose={handleCloseTutorial}
      />
    </div>
  );
};

export default IndexContent;
