import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingFlow } from "@/hooks/useOnboardingFlow";
import IntroScreen from "@/components/home/IntroScreen";
import MoodScreen from "@/components/home/MoodScreen";
import MoodResponse from "@/components/home/MoodResponse";
import RegistrationScreen from "@/components/home/RegistrationScreen";
import SubscriptionPage from "@/components/subscription/SubscriptionPage";
import SubscriptionAddOns from "@/components/home/SubscriptionAddOns";
import CheckoutScreen from "@/components/home/CheckoutScreen";
import VisionBoard from "@/components/home/VisionBoard";
import MainDashboard from "@/components/home/MainDashboard";

const OnboardingContainer: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    selectedMood,
    userInfo,
    selectedPlan,
    selectedAddOns,
    selectedQualities,
    selectedGoals,
    isOnboardingComplete,
    
    // Navigation
    nextStep,
    previousStep,
    goToStep,
    
    // Updates
    updateMood,
    updateUserInfo,
    updatePlan,
    toggleAddOn,
    toggleQuality,
    toggleGoal,
    completeOnboarding,
  } = useOnboardingFlow();

  console.log("[OnboardingContainer] Current step:", currentStep, "isComplete:", isOnboardingComplete);

  // Handle user info change
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserInfo(e.target.name as keyof typeof userInfo, e.target.value);
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    console.log("[OnboardingContainer] Registration submitted");
    // The actual registration logic is handled in useRegistrationState
    // This just serves as the nextStep callback
    nextStep();
  };

  // Handle subscription continue
  const handleSubscriptionContinue = () => {
    console.log("[OnboardingContainer] Subscription step completed");
    nextStep();
  };

  // Handle add-ons continue
  const handleAddOnsContinue = () => {
    console.log("[OnboardingContainer] Add-ons step completed");
    nextStep();
  };

  // Handle checkout continue
  const handleCheckoutContinue = () => {
    console.log("[OnboardingContainer] Checkout step completed");
    nextStep();
  };

  // Handle vision board continue
  const handleVisionBoardContinue = () => {
    console.log("[OnboardingContainer] Vision board completed - finishing onboarding");
    completeOnboarding();
  };

  // Handle mood selection and auto-advance
  const handleMoodSelect = (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => {
    console.log("[OnboardingContainer] Mood selected:", mood);
    updateMood(mood);
    goToStep('moodResponse');
  };

  // Feature navigation for main dashboard
  const navigateToFeature = (path: string) => {
    navigate(path);
  };

  // Henry toggle (placeholder)
  const handleHenryToggle = () => {
    console.log("Henry toggled");
  };

  // Mark tutorial as completed
  const markTutorialCompleted = () => {
    localStorage.setItem('tutorialCompleted', 'true');
  };

  // Render the appropriate screen
  if (isOnboardingComplete || currentStep === 'completed') {
    return (
      <MainDashboard
        userName={userInfo.name}
        showHenry={false}
        onHenryToggle={handleHenryToggle}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
        navigateToFeature={navigateToFeature}
        markTutorialCompleted={markTutorialCompleted}
      />
    );
  }

  switch (currentStep) {
    case 'intro':
      return <IntroScreen onContinue={nextStep} />;
      
    case 'mood':
      return <MoodScreen onMoodSelect={handleMoodSelect} />;
      
    case 'moodResponse':
      return (
        <MoodResponse
          selectedMood={selectedMood}
          onContinue={nextStep}
          onPrevious={previousStep}
        />
      );
      
    case 'register':
      return (
        <RegistrationScreen
          userInfo={userInfo}
          onUserInfoChange={handleUserInfoChange}
          onSubmit={handleRegister}
          onPrevious={previousStep}
          onSkip={nextStep}
        />
      );
      
    case 'subscription':
      return <SubscriptionPage />;
      
    case 'subscriptionAddOns':
      return (
        <SubscriptionAddOns
          selectedPlan={selectedPlan}
          selectedAddOns={selectedAddOns}
          onAddOnToggle={toggleAddOn}
          onContinue={handleAddOnsContinue}
          onPrevious={previousStep}
          onSkip={nextStep}
        />
      );

    case 'checkout':
      return (
        <CheckoutScreen
          selectedPlan={selectedPlan}
          selectedAddOns={selectedAddOns}
          onContinue={handleCheckoutContinue}
          onPrevious={previousStep}
        />
      );
      
    case 'visionBoard':
      return (
        <VisionBoard
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
          onQualityToggle={toggleQuality}
          onGoalToggle={toggleGoal}
          onContinue={handleVisionBoardContinue}
          onPrevious={previousStep}
          onSkip={completeOnboarding}
        />
      );
      
    default:
      console.error("[OnboardingContainer] Unknown step:", currentStep);
      return <IntroScreen onContinue={nextStep} />;
  }
};

export default OnboardingContainer;