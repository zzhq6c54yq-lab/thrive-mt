
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useMousePosition from "@/hooks/useMousePosition";
import useScreenHistory from "@/hooks/useScreenHistory";
import usePopupManagement from "@/hooks/usePopupManagement";
import useTranslation from "@/hooks/useTranslation";
import useIndexState from "@/hooks/useIndexState";
import IndexContent from "@/components/home/IndexContent";
import MainMenuButton from "@/components/MainMenuButton";

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
    popupsShown,
    markTutorialCompleted
  } = usePopupManagement(screenState);

  // Use the screen history hook
  useScreenHistory(screenState, setScreenState);

  useEffect(() => {
    if (location.state && location.state.showHenry) {
      setShowHenry(true);
    }
  }, [location.state, setShowHenry]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedThriveMT');
    if (!hasVisited && screenState === 'main') {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedThriveMT', 'true');
    }
  }, [screenState, setIsFirstVisit]);

  const toggleHenry = () => {
    setShowHenry(prev => !prev);
  };

  const navigateToFeature = (path: string) => {
    if (path.startsWith('/')) {
      // Special case for workshop paths
      if (path.startsWith('/workshop/')) {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals,
            activeTab: "workshop",
            preventTutorial: true
          }
        });
        return;
      }
      
      if (path === '/small-business-portal') {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals,
            fromMainMenu: true,
            preventTutorial: true
          }
        });
      } else {
        navigate(path, { 
          state: { 
            qualities: selectedQualities, 
            goals: selectedGoals,
            preventTutorial: true
          }
        });
      }
    }
  };

  // Show MainMenuButton only on intro and mood screens
  const showMainMenuButton = screenState === 'intro' || screenState === 'mood';

  return (
    <>
      {showMainMenuButton && (
        <div className="fixed top-5 right-5 z-50">
          <MainMenuButton size="large" showAnimatedRings={true} />
        </div>
      )}
      
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
    </>
  );
};

export default Index;
