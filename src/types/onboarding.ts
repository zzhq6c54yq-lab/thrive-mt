export type OnboardingStep = 
  | 'intro' 
  | 'mood' 
  | 'moodResponse' 
  | 'breathing'
  | 'hipaaNotice'
  | 'register' 
  | 'subscription' 
  | 'subscriptionAddOns' 
  | 'checkout'
  | 'visionBoard' 
  | 'completed';

export type MoodType = 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed';

export interface UserInfo {
  name: string;
  email: string;
  password: string;
}

export interface OnboardingState {
  currentStep: OnboardingStep;
  selectedMood: MoodType | null;
  userInfo: UserInfo;
  selectedPlan: string | null;
  selectedAddOns: string[];
  selectedQualities: string[];
  selectedGoals: string[];
  isOnboardingComplete: boolean;
}