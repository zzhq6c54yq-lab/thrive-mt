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

  // Initialize onboarding state
  useEffect(() => {
    const hasCompleted = localStorage.getItem('hasCompletedOnboarding');
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    
    if (hasCompleted === 'true') {
      // Already completed - mark as complete to trigger redirect
      setState({ ...initialState, isOnboardingComplete: true, currentStep: 'completed' });
    } else if (savedProgress) {
      // Resume from saved progress
      try {
        const parsed = JSON.parse(savedProgress);
        setState(parsed);
      } catch {
        setState({ ...initialState, currentStep: 'intro' });
      }
    } else {
      // First time - start from intro
      setState({ ...initialState, currentStep: 'intro' });
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newState: OnboardingState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, []);

  // Navigation functions
  const goToStep = useCallback((step: OnboardingStep) => {
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
    // Full flow for onboarding
    const fullStepOrder: OnboardingStep[] = [
      'intro', 'mood', 'moodResponse', 'register', 
      'subscription', 'subscriptionAddOns', 'checkout', 'visionBoard', 'completed'
    ];
    
    const currentIndex = fullStepOrder.indexOf(state.currentStep);
    if (currentIndex < fullStepOrder.length - 1) {
      goToStep(fullStepOrder[currentIndex + 1]);
    }
  }, [state.currentStep, goToStep]);

  const previousStep = useCallback(() => {
    const stepOrder: OnboardingStep[] = [
      'intro', 'mood', 'moodResponse', 'register', 
      'subscription', 'subscriptionAddOns', 'checkout', 'visionBoard'
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

  const completeOnboarding = useCallback(async () => {
    // Update profile with onboarding completion and selected preferences
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      // Wait for auth state to settle - sometimes after sign-up the session isn't immediately available
      let session = null;
      let attempts = 0;
      const maxAttempts = 5;
      
      while (!session && attempts < maxAttempts) {
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error during onboarding:', sessionError);
          attempts++;
          await new Promise(resolve => setTimeout(resolve, 500));
          continue;
        }
        
        session = data.session;
        
        if (!session) {
          attempts++;
          console.log(`Waiting for session... attempt ${attempts}/${maxAttempts}`);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      if (!session) {
        console.log('No active session - completing onboarding as guest user');
        // Guest user: complete onboarding locally and go to dashboard
        goToStep('completed');
        return;
      }
      
      const user = session.user;
      
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({
            onboarding_completed: true,
            goals: state.selectedGoals,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
          
        if (error) {
          console.error('Error updating profile during onboarding:', error);
          // Still proceed but log the error
        }
        
        // Successfully updated, now mark as complete
        goToStep('completed');
      } else {
        // No user, redirect to auth
        console.error('No user found during onboarding completion');
        window.location.href = '/app/auth';
        return;
      }
    } catch (error) {
      console.error('Error during onboarding completion:', error);
      // If there's an error, still try to complete locally
      goToStep('completed');
    }
  }, [goToStep, state.selectedGoals, state.selectedQualities]);

  const resetOnboarding = useCallback(() => {
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
