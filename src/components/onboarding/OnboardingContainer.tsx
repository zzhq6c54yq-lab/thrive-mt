import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useOnboardingFlow } from "@/hooks/useOnboardingFlow";
import IntroScreen from "@/components/home/IntroScreen";
import MoodScreen from "@/components/home/MoodScreen";
import MoodResponse from "@/components/home/MoodResponse";
import RegistrationScreen from "@/components/home/RegistrationScreen";
import SubscriptionScreen from "@/components/home/SubscriptionScreen";
import SubscriptionAddOns from "@/components/home/SubscriptionAddOns";
import CheckoutScreen from "@/components/home/CheckoutScreen";
import VisionBoard from "@/components/home/VisionBoard";
import MainDashboard from "@/components/home/MainDashboard";
import QuickStartTutorial from "@/components/tutorials/QuickStartTutorial";

const OnboardingContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showQuickStart, setShowQuickStart] = useState(false);
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

  // Check for navigation state from ThriveButton or other sources
  useEffect(() => {
    const navigationState = location.state as any;
    if (navigationState?.screenState === 'main' || navigationState?.returnToMain) {
      goToStep('completed');
    }
  }, [location.state, goToStep]);

  // Handle user info change
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserInfo(e.target.name as keyof typeof userInfo, e.target.value);
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    // The actual registration logic is handled in useRegistrationState
    // This just serves as the nextStep callback
    nextStep();
  };

  // Handle subscription continue
  const handleSubscriptionContinue = () => {
    nextStep();
  };

  // Handle add-ons continue
  const handleAddOnsContinue = () => {
    nextStep();
  };

  // Handle checkout continue
  const handleCheckoutContinue = () => {
    nextStep();
  };

  // Handle vision board continue
  const handleVisionBoardContinue = () => {
    completeOnboarding();
  };

  // Handle mood selection and auto-advance
  const handleMoodSelect = (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => {
    updateMood(mood);
    goToStep('moodResponse');
  };

  // Feature navigation for main dashboard
  const navigateToFeature = (path: string) => {
    navigate(path);
  };

  // Henry toggle (placeholder)
  const handleHenryToggle = () => {
    // Placeholder for Henry toggle
  };

  // Mark tutorial as completed
  const markTutorialCompleted = () => {
    localStorage.setItem('tutorialCompleted', 'true');
  };

  // Check if should show QuickStart tutorial after onboarding
  useEffect(() => {
    if (isOnboardingComplete || currentStep === 'completed') {
      const hasSeenQuickStart = localStorage.getItem('hasSeenQuickStart');
      if (!hasSeenQuickStart) {
        // Small delay to ensure dashboard is rendered
        setTimeout(() => {
          setShowQuickStart(true);
        }, 300);
      }
    }
  }, [isOnboardingComplete, currentStep]);

  // Render the appropriate screen
  if (isOnboardingComplete || currentStep === 'completed') {
    return (
      <>
        <MainDashboard
          userName={userInfo.name}
          showHenry={false}
          onHenryToggle={handleHenryToggle}
          selectedQualities={selectedQualities}
          selectedGoals={selectedGoals}
          navigateToFeature={navigateToFeature}
          markTutorialCompleted={markTutorialCompleted}
        />
        
        {/* Show QuickStart tutorial on first completion */}
        <QuickStartTutorial
          isOpen={showQuickStart}
          onClose={() => setShowQuickStart(false)}
          onComplete={() => {
            markTutorialCompleted();
            setShowQuickStart(false);
          }}
        />
      </>
    );
  }

  switch (currentStep) {
    case 'intro':
      return <IntroScreen onContinue={nextStep} onSkipToMain={completeOnboarding} />;
      
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
      return (
        <SubscriptionScreen
          selectedPlan={selectedPlan}
          onPlanSelect={updatePlan}
          onContinue={handleSubscriptionContinue}
          onPrevious={previousStep}
          onSkip={nextStep}
        />
      );
      
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
      return <IntroScreen onContinue={nextStep} />;
  }
};

export default OnboardingContainer;