
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useMousePosition from "@/hooks/useMousePosition";
import useScreenHistory from "@/hooks/useScreenHistory";
import usePopupManagement from "@/hooks/usePopupManagement";
import useTranslation from "@/hooks/useTranslation";
import useIndexState from "@/hooks/useIndexState";
import IndexContent from "@/components/home/IndexContent";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  // Custom hooks
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
    handleSubscriptionSelect: onPlanSelect,
    toggleQuality,
    toggleGoal,
    toggleAddOn,
    handleSubscriptionContinue,
    handleAddOnsContinue,
    handleVisionBoardContinue,
    handleMoodSelect
  } = useIndexState();
  
  const mousePosition = useMousePosition();
  const navigate = useNavigate();
  const location = useLocation();
  const { getTranslatedText } = useTranslation();
  const { toast } = useToast();
  
  const { 
    showCoPayCredit, 
    setShowCoPayCredit, 
    showHenry, 
    setShowHenry,
    popupsShown,
    markTutorialCompleted
  } = usePopupManagement(screenState);

  // Check for URL parameters to handle onboarding control
  useEffect(() => {
    // Check if there's a URL parameter to force reset onboarding
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('resetOnboarding') === 'true' || searchParams.get('forceReset') === 'true') {
      console.log("[Index] Resetting onboarding due to URL parameter");
      localStorage.removeItem('hasCompletedOnboarding');
      localStorage.removeItem('prevScreenState');
      setScreenState('intro');
      
      toast({
        title: "Onboarding Reset",
        description: "Starting from the beginning",
      });
    }
  }, [location.search, setScreenState, toast]);
  
  // Use the screen history hook
  useScreenHistory(screenState, setScreenState);

  // Show Henry if coming from a location that requested it
  useEffect(() => {
    if (location.state && location.state.showHenry) {
      setShowHenry(true);
    }
  }, [location.state, setShowHenry]);

  const toggleHenry = () => {
    setShowHenry(prev => !prev);
  };

  const navigateToFeature = (path: string) => {
    if (path.startsWith('/')) {
      console.log("[Index] Navigating to feature:", path);
      
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

  // Helper function to reset onboarding - can be called from external links or buttons
  const resetOnboarding = () => {
    localStorage.removeItem('hasCompletedOnboarding');
    localStorage.removeItem('prevScreenState');
    setScreenState('intro');
    console.log("[Index] Onboarding reset manually");
  };

  // Log current state for debugging
  useEffect(() => {
    console.log("[Index] Rendered with screenState:", screenState);
    console.log("[Index] Onboarding completed status:", localStorage.getItem('hasCompletedOnboarding'));
    console.log("[Index] Selected mood:", selectedMood);
  }, [screenState, selectedMood]);

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
      onPlanSelect={onPlanSelect}
      onAddOnToggle={toggleAddOn}
      onHenryToggle={toggleHenry}
      navigateToFeature={navigateToFeature}
      handleSubscriptionContinue={handleSubscriptionContinue}
      handleAddOnsContinue={handleAddOnsContinue}
      handleVisionBoardContinue={handleVisionBoardContinue}
      handleRegister={handleRegister}
      setScreenState={setScreenState}
      markTutorialCompleted={markTutorialCompleted}
    />
  );
};

export default Index;
