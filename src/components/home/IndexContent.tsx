
import React, { useEffect, useState } from "react";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import IndexScreenManager from "@/components/home/IndexScreenManager";
import MainTutorial from "@/components/tutorials/MainTutorial";
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
  const [tutorialVisible, setTutorialVisible] = useState(false);
  
  // Check URL parameters and screen state to determine if tutorial should be shown
  useEffect(() => {
    // Get URL parameters
    const queryParams = new URLSearchParams(window.location.search);
    const forceTutorial = queryParams.has('tutorial') || queryParams.has('reset');
    
    console.log("IndexContent: Checking tutorial visibility. Screen:", screenState, 
                "showMainTutorial:", showMainTutorial, 
                "forceTutorial param:", forceTutorial);
    
    // Show tutorial if on main screen AND (showMainTutorial OR URL parameter)
    if (screenState === 'main' && (showMainTutorial || forceTutorial)) {
      console.log("IndexContent: Showing tutorial");
      setTutorialVisible(true);
      
      // Set first visit flag for proper animations/transitions
      if (forceTutorial) {
        setIsFirstVisit(true);
      }
    }
  }, [screenState, showMainTutorial, setIsFirstVisit]);

  // Handle tutorial close
  const handleTutorialClose = () => {
    console.log("IndexContent: Tutorial closed");
    setTutorialVisible(false);
    markTutorialCompleted();
    
    // Show welcome toast
    if (screenState === 'main') {
      toast({
        title: getTranslatedText("welcomeToThrive"),
        description: getTranslatedText("exploreAllFeatures"),
      });
    }
  };

  return (
    <div className="relative z-10">
      {/* CoPayCredit Popup */}
      {showCoPayCredit && !popupsShown.coPayCredit && 
        <CoPayCreditPopup 
          open={showCoPayCredit} 
          onOpenChange={setShowCoPayCredit} 
        />
      }
      
      {/* Main Content */}
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
      
      {/* Main Tutorial */}
      <MainTutorial
        isOpen={tutorialVisible}
        onClose={handleTutorialClose}
      />
    </div>
  );
};

export default IndexContent;
