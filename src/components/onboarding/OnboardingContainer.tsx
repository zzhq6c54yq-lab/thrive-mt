import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useOnboardingFlow } from "@/hooks/useOnboardingFlow";
import { useUser } from "@/contexts/UserContext";
import IntroScreen from "@/components/home/IntroScreen";
import MoodScreen from "@/components/home/MoodScreen";
import MoodResponse from "@/components/home/MoodResponse";
import RegistrationScreen from "@/components/home/RegistrationScreen";
import SubscriptionScreen from "@/components/home/SubscriptionScreen";
import SubscriptionAddOns from "@/components/home/SubscriptionAddOns";
import CheckoutScreen from "@/components/home/CheckoutScreen";
import VisionBoard from "@/components/home/VisionBoard";
import DemoBreathingStep from "@/components/onboarding/DemoBreathingStep";
import DemoHIPAANotice from "@/components/demo/DemoHIPAANotice";

const OnboardingContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, loading } = useUser();
  
  // Check if we're in demo mode
  const demoMode = location.state?.demoMode || new URLSearchParams(location.search).get('demo') === 'true';

  // For authenticated users, check if onboarding is already completed in database
  useEffect(() => {
    if (!demoMode && !loading && user && profile?.onboarding_completed) {
      navigate('/app/dashboard');
    }
  }, [demoMode, loading, user, profile, navigate]);
  
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
  } = useOnboardingFlow(demoMode);

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

  // Redirect to dashboard after onboarding completion
  useEffect(() => {
    if (isOnboardingComplete || currentStep === 'completed') {
      // In demo mode, pass demoUser flag to dashboard
      if (demoMode) {
        navigate('/app/dashboard', { state: { demoUser: true } });
      } else {
        navigate('/app/dashboard');
      }
    }
  }, [isOnboardingComplete, currentStep, navigate, demoMode]);

  // Show loading message while redirecting
  if (isOnboardingComplete || currentStep === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Redirecting to your dashboard...</div>
      </div>
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

    case 'breathing':
      return <DemoBreathingStep onComplete={nextStep} />;

    case 'hipaaNotice':
      return <DemoHIPAANotice onContinue={nextStep} />;
      
    default:
      return <IntroScreen onContinue={nextStep} />;
  }
};

export default OnboardingContainer;