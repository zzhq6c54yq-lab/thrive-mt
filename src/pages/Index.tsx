
import React from "react";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import useIndexState from "@/hooks/useIndexState";
import useScreenHistory from "@/hooks/useScreenHistory";
import IndexContent from "@/components/home/IndexContent";

interface PopupState {
  coPayCredit: boolean;
  henryIntro: boolean;
  mainTutorial: boolean;
  transitionTutorial: boolean;
}

export default function Index() {
  const { toast } = useToast();
  const { isSpanish } = useTranslation();
  
  // Use the index state hook
  const {
    screenState,
    setScreenState,
    selectedMood,
    userInfo,
    selectedPlan,
    selectedAddOns,
    selectedQualities,
    selectedGoals,
    isFirstVisit,
    setIsFirstVisit,
    handleUserInfoChange,
    handleRegister,
    handleSubscriptionSelect,
    toggleQuality,
    toggleGoal,
    toggleAddOn,
    handleSubscriptionContinue,
    handleAddOnsContinue,
    handleVisionBoardContinue,
    handleMoodSelect
  } = useIndexState();

  // Handle screen history
  useScreenHistory(screenState, setScreenState);

  // Popup state management
  const [showCoPayCredit, setShowCoPayCredit] = React.useState(false);
  const [showHenry, setShowHenry] = React.useState(false);
  const [popupsShown, setPopupsShown] = React.useState<PopupState>({
    coPayCredit: false,
    henryIntro: false,
    mainTutorial: false,
    transitionTutorial: false,
  });

  const handleHenryToggle = () => {
    setShowHenry(!showHenry);
  };

  const markTutorialCompleted = () => {
    setPopupsShown(prev => ({
      ...prev,
      mainTutorial: true
    }));
  };

  const navigateToFeature = (path: string) => {
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? "Cargando recurso solicitado" : "Loading requested resource",
      duration: 1500,
    });
    
    // For features that require assessment
    const isAssessmentPath = path.includes('/mental-wellness') || path.includes('/games-and-quizzes');
    
    window.history.pushState(
      { 
        fromMainMenu: true,
        preventTutorial: true,
        directToAssessment: isAssessmentPath,
        startAssessment: isAssessmentPath
      }, 
      '', 
      path
    );
    window.location.href = path;
  };

  const getTranslatedText = (key: string) => {
    const translations: Record<string, string> = {
      skipForNow: isSpanish ? "Omitir por ahora" : "Skip for now",
      tutorialAccess: isSpanish ? "Puedes acceder al tutorial más tarde desde el menú de ayuda" : "You can access the tutorial later from the help menu"
    };
    return translations[key] || key;
  };

  return (
    <IndexContent
      screenState={screenState}
      selectedMood={selectedMood}
      userInfo={userInfo}
      selectedPlan={selectedPlan}
      selectedAddOns={selectedAddOns}
      selectedQualities={selectedQualities}
      selectedGoals={selectedGoals}
      showHenry={showHenry}
      isFirstVisit={isFirstVisit}
      setIsFirstVisit={setIsFirstVisit}
      showCoPayCredit={showCoPayCredit}
      setShowCoPayCredit={setShowCoPayCredit}
      popupsShown={popupsShown}
      getTranslatedText={getTranslatedText}
      onMoodSelect={handleMoodSelect}
      onUserInfoChange={handleUserInfoChange}
      onQualityToggle={toggleQuality}
      onGoalToggle={toggleGoal}
      onPlanSelect={handleSubscriptionSelect}
      onAddOnToggle={toggleAddOn}
      onHenryToggle={handleHenryToggle}
      navigateToFeature={navigateToFeature}
      handleSubscriptionContinue={handleSubscriptionContinue}
      handleAddOnsContinue={handleAddOnsContinue}
      handleVisionBoardContinue={handleVisionBoardContinue}
      handleRegister={handleRegister}
      setScreenState={setScreenState}
      markTutorialCompleted={markTutorialCompleted}
      isInOnboarding={screenState !== 'main'}
    />
  );
}
