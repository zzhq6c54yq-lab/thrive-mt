import { useState, useEffect, useCallback } from "react";
import { OnboardingStep, OnboardingState, MoodType } from "@/types/onboarding";

const STORAGE_KEY = 'thriveOnboardingProgress';

const initialState: OnboardingState = {
  currentStep: 'intro',
  selectedMood: null,
  userInfo: { name: '', email: '', password: '' },
  selectedPlan: null,
  selectedAddOns: [],
  selectedQualities: [],
  selectedGoals: [],
  isOnboardingComplete: false,
};

export const useOnboardingFlow = () => {
  const [state, setState] = useState<OnboardingState>(initialState);

  // Initialize from localStorage
  useEffect(() => {
    const hasCompleted = localStorage.getItem('hasCompletedOnboarding') === 'true';
    const forceReset = new URLSearchParams(window.location.search).get('forceReset') === 'true';
    
    console.log("[useOnboardingFlow] Initializing - hasCompleted:", hasCompleted, "forceReset:", forceReset);
    
    if (forceReset) {
      localStorage.removeItem('hasCompletedOnboarding');
      localStorage.removeItem(STORAGE_KEY);
      setState({ ...initialState, currentStep: 'intro' });
      return;
    }

    if (hasCompleted) {
      setState(prev => ({ ...prev, currentStep: 'completed', isOnboardingComplete: true }));
      return;
    }

    // Load any saved progress
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const savedState = JSON.parse(saved);
        setState({ ...initialState, ...savedState, currentStep: savedState.currentStep || 'intro' });
      } catch (error) {
        console.error("[useOnboardingFlow] Error loading saved state:", error);
        setState({ ...initialState, currentStep: 'intro' });
      }
    } else {
      setState({ ...initialState, currentStep: 'intro' });
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newState: OnboardingState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, []);

  // Navigation functions
  const goToStep = useCallback((step: OnboardingStep) => {
    console.log("[useOnboardingFlow] Navigating to step:", step);
    
    setState(prev => {
      const newState = { ...prev, currentStep: step };
      
      // Mark as completed when reaching the end
      if (step === 'completed') {
        newState.isOnboardingComplete = true;
        localStorage.setItem('hasCompletedOnboarding', 'true');
        localStorage.removeItem(STORAGE_KEY); // Clean up progress
      } else {
        saveProgress(newState);
      }
      
      return newState;
    });
  }, [saveProgress]);

  const nextStep = useCallback(() => {
    const stepOrder: OnboardingStep[] = [
      'intro', 'mood', 'moodResponse', 'register', 
      'subscription', 'subscriptionAddOns', 'visionBoard', 'completed'
    ];
    
    const currentIndex = stepOrder.indexOf(state.currentStep);
    if (currentIndex < stepOrder.length - 1) {
      goToStep(stepOrder[currentIndex + 1]);
    }
  }, [state.currentStep, goToStep]);

  const previousStep = useCallback(() => {
    const stepOrder: OnboardingStep[] = [
      'intro', 'mood', 'moodResponse', 'register', 
      'subscription', 'subscriptionAddOns', 'visionBoard'
    ];
    
    const currentIndex = stepOrder.indexOf(state.currentStep);
    if (currentIndex > 0) {
      goToStep(stepOrder[currentIndex - 1]);
    }
  }, [state.currentStep, goToStep]);

  // Update functions
  const updateMood = useCallback((mood: MoodType) => {
    setState(prev => {
      const newState = { ...prev, selectedMood: mood };
      saveProgress(newState);
      return newState;
    });
  }, [saveProgress]);

  const updateUserInfo = useCallback((field: keyof typeof state.userInfo, value: string) => {
    setState(prev => {
      const newState = { 
        ...prev, 
        userInfo: { ...prev.userInfo, [field]: value }
      };
      saveProgress(newState);
      return newState;
    });
  }, [saveProgress]);

  const updatePlan = useCallback((plan: string) => {
    setState(prev => {
      const newState = { ...prev, selectedPlan: plan };
      saveProgress(newState);
      return newState;
    });
  }, [saveProgress]);

  const toggleAddOn = useCallback((addOnId: string) => {
    setState(prev => {
      const addOns = prev.selectedAddOns.includes(addOnId)
        ? prev.selectedAddOns.filter(id => id !== addOnId)
        : [...prev.selectedAddOns, addOnId];
      
      const newState = { ...prev, selectedAddOns: addOns };
      saveProgress(newState);
      return newState;
    });
  }, [saveProgress]);

  const toggleQuality = useCallback((qualityId: string) => {
    setState(prev => {
      const qualities = prev.selectedQualities.includes(qualityId)
        ? prev.selectedQualities.filter(id => id !== qualityId)
        : [...prev.selectedQualities, qualityId];
      
      const newState = { ...prev, selectedQualities: qualities };
      saveProgress(newState);
      return newState;
    });
  }, [saveProgress]);

  const toggleGoal = useCallback((goalId: string) => {
    setState(prev => {
      const goals = prev.selectedGoals.includes(goalId)
        ? prev.selectedGoals.filter(id => id !== goalId)
        : [...prev.selectedGoals, goalId];
      
      const newState = { ...prev, selectedGoals: goals };
      saveProgress(newState);
      return newState;
    });
  }, [saveProgress]);

  const completeOnboarding = useCallback(() => {
    console.log("[useOnboardingFlow] Completing onboarding");
    goToStep('completed');
  }, [goToStep]);

  const resetOnboarding = useCallback(() => {
    console.log("[useOnboardingFlow] Resetting onboarding");
    localStorage.removeItem('hasCompletedOnboarding');
    localStorage.removeItem(STORAGE_KEY);
    setState({ ...initialState, currentStep: 'intro' });
  }, []);

  return {
    // State
    ...state,
    
    // Navigation
    goToStep,
    nextStep,
    previousStep,
    
    // Updates
    updateMood,
    updateUserInfo,
    updatePlan,
    toggleAddOn,
    toggleQuality,
    toggleGoal,
    
    // Actions
    completeOnboarding,
    resetOnboarding,
  };
};