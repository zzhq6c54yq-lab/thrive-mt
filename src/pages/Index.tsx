
import React from "react";
import { UserProvider } from "@/contexts/UserContext";
import IndexScreenManager from "@/components/home/IndexScreenManager";
import CrisisOverlay from "@/components/crisis/CrisisOverlay";
import useTranslation from "@/hooks/useTranslation";
import { useIndexState } from "@/hooks/useIndexState";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { preferredLanguage, setPreferredLanguage } = useTranslation();
  const navigate = useNavigate();
  
  // Force onboarding flow for demo purposes
  React.useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    const forceOnboarding = new URLSearchParams(window.location.search).get('onboarding') === 'true';
    const forceReset = new URLSearchParams(window.location.search).get('forceReset') === 'true';
    
    console.log("[Index] hasCompletedOnboarding:", hasCompletedOnboarding);
    console.log("[Index] forceOnboarding:", forceOnboarding);
    console.log("[Index] forceReset:", forceReset);
    
    // For demo purposes, clear onboarding completion if not explicitly set
    if (forceReset || !hasCompletedOnboarding) {
      console.log("[Index] Clearing onboarding state to force onboarding flow");
      localStorage.removeItem('hasCompletedOnboarding');
    }
  }, []);
  
  // Get all the state and handlers from useIndexState
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

  // Handler for Henry toggle (placeholder)
  const handleHenryToggle = () => {
    console.log("Henry toggled");
  };

  // Handler for feature navigation
  const navigateToFeature = (path: string) => {
    navigate(path);
  };

  // Mark tutorial as completed
  const markTutorialCompleted = () => {
    localStorage.setItem('tutorialCompleted', 'true');
  };

  return (
    <UserProvider>
      <div className="min-h-screen">
        <IndexScreenManager 
          screenState={screenState}
          selectedMood={selectedMood}
          userInfo={userInfo}
          selectedPlan={selectedPlan}
          selectedAddOns={selectedAddOns}
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
          showHenry={false}
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
          isInOnboarding={false}
        />
        <CrisisOverlay />
        
        {/* Language selector */}
        <div className="fixed top-4 right-20 z-40">
          <select
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value as any)}
            className="bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm"
          >
            <option value="English">English</option>
            <option value="Español">Español</option>
            <option value="Português">Português</option>
            <option value="Filipino">Filipino</option>
          </select>
        </div>
      </div>
    </UserProvider>
  );
};

export default Index;
