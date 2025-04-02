
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useMousePosition from "@/hooks/useMousePosition";
import useScreenHistory from "@/hooks/useScreenHistory";
import usePopupManagement from "@/hooks/usePopupManagement";
import useTranslation from "@/hooks/useTranslation";
import useIndexState from "@/hooks/useIndexState";
import IndexContent from "@/components/home/IndexContent";

const Index = () => {
  // Custom hooks
  const { 
    screenState, 
    setScreenState,
    selectedMood,
    userInfo,
    selectedPlan,
    selectedQualities,
    selectedGoals,
    isFirstVisit,
    setIsFirstVisit,
    handleUserInfoChange,
    handleRegister,
    handleSubscriptionSelect: onPlanSelect,
    toggleQuality,
    toggleGoal,
    handleSubscriptionContinue,
    handleVisionBoardContinue,
    handleMoodSelect
  } = useIndexState();
  
  const mousePosition = useMousePosition();
  const navigate = useNavigate();
  const location = useLocation();
  const { getTranslatedText } = useTranslation();
  
  const { 
    showCoPayCredit, 
    setShowCoPayCredit, 
    showHenry, 
    setShowHenry,
    showMainTutorial,
    popupsShown,
    markTutorialCompleted,
    resetPopupStates
  } = usePopupManagement(screenState);

  // Use the screen history hook
  useScreenHistory(screenState, setScreenState);

  useEffect(() => {
    if (location.state && location.state.showHenry) {
      setShowHenry(true);
    }
    
    // Special handling for debug purposes - you can add ?reset=true to URL to reset states
    if (location.search.includes('reset=true')) {
      console.log("Resetting all popup states due to URL parameter");
      resetPopupStates();
    }
  }, [location.state, location.search, setShowHenry, resetPopupStates]);

  // Check if it's the first visit and show tutorial accordingly
  useEffect(() => {
    console.log("Index - First visit check with screen:", screenState, "showMainTutorial:", showMainTutorial);
    
    if (screenState === 'main' && showMainTutorial) {
      console.log("Setting isFirstVisit to true for main screen with showMainTutorial active");
      setIsFirstVisit(true);
    }
  }, [screenState, showMainTutorial, setIsFirstVisit]);

  const toggleHenry = () => {
    setShowHenry(prev => !prev);
  };

  const navigateToFeature = (path: string) => {
    if (path.startsWith('/')) {
      if (path === '/small-business-portal') {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals,
            fromMainMenu: true 
          }
        });
      } else {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals 
          }
        });
      }
    }
  };

  console.log("Index rendering with screen:", screenState, "isFirstVisit:", isFirstVisit, "showMainTutorial:", showMainTutorial);

  return (
    <IndexContent
      screenState={screenState}
      selectedMood={selectedMood}
      userInfo={userInfo}
      selectedPlan={selectedPlan}
      selectedQualities={selectedQualities}
      selectedGoals={selectedGoals}
      showHenry={showHenry}
      isFirstVisit={isFirstVisit}
      setIsFirstVisit={setIsFirstVisit}
      showCoPayCredit={showCoPayCredit}
      setShowCoPayCredit={setShowCoPayCredit}
      showMainTutorial={showMainTutorial}
      popupsShown={popupsShown}
      getTranslatedText={getTranslatedText}
      onMoodSelect={handleMoodSelect}
      onUserInfoChange={handleUserInfoChange}
      onQualityToggle={toggleQuality}
      onGoalToggle={toggleGoal}
      onPlanSelect={onPlanSelect}
      onHenryToggle={toggleHenry}
      navigateToFeature={navigateToFeature}
      handleSubscriptionContinue={handleSubscriptionContinue}
      handleVisionBoardContinue={handleVisionBoardContinue}
      handleRegister={handleRegister}
      setScreenState={setScreenState}
      markTutorialCompleted={markTutorialCompleted}
    />
  );
};

export default Index;
