/**
 * Compassionate messaging system for ThriveMT
 * Replaces harsh error/system messages with emotionally supportive alternatives
 */

export const compassionateMessages = {
  // Connection & Network Errors
  networkError: {
    title: "We couldn't connect right now",
    message: "Let's try that together again in a moment.",
  },
  timeout: {
    title: "This is taking longer than expected",
    message: "We're still here with you. Would you like to try again?",
  },
  offline: {
    title: "You seem to be offline",
    message: "We'll be here when you're back online. Take your time.",
  },

  // Authentication Errors
  authError: {
    title: "We couldn't sign you in",
    message: "Let's try that again together.",
  },
  sessionExpired: {
    title: "Your session needs a refresh",
    message: "For your security, please sign in again. We'll be right here.",
  },
  invalidCredentials: {
    title: "Those details didn't match",
    message: "No worries - would you like to try again or reset your password?",
  },

  // Form & Validation Errors
  validationError: {
    title: "We need a bit more information",
    message: "Take your time filling this out.",
  },
  requiredField: {
    title: "This field helps us help you",
    message: "We need this information to continue.",
  },
  invalidEmail: {
    title: "Let's double-check that email",
    message: "We want to make sure we can reach you.",
  },

  // Save & Data Errors
  saveError: {
    title: "We couldn't save that",
    message: "Your thoughts are important - let's try again.",
  },
  loadError: {
    title: "We couldn't load that right now",
    message: "Give it a moment and try again.",
  },
  deleteConfirm: {
    title: "Are you sure?",
    message: "We want to make sure this is what you intended.",
  },

  // Success Messages
  saved: {
    title: "Saved",
    message: "Your progress is safe with us.",
  },
  updated: {
    title: "Updated",
    message: "Changes saved successfully.",
  },
  welcomeBack: {
    title: "Welcome back",
    message: "We're glad you're here.",
  },

  // Empty States
  noMessages: {
    title: "No messages yet",
    message: "This space is ready when you are. Take your time.",
  },
  noJournalEntries: {
    title: "Your journal awaits",
    message: "Every journey begins with a single thought. No pressure.",
  },
  noResults: {
    title: "Nothing here yet",
    message: "And that's perfectly okay. We're here when you're ready.",
  },
  noAssessments: {
    title: "Ready when you are",
    message: "Assessments help us understand you better, at your own pace.",
  },

  // Loading States
  loading: {
    title: "Taking a moment...",
    message: "We're preparing something just for you.",
  },
  processing: {
    title: "Working on it...",
    message: "Good things take a little time.",
  },

  // Feature-Specific
  therapistUnavailable: {
    title: "Your therapist is currently unavailable",
    message: "They'll be with you as soon as possible. You're not alone.",
  },
  sessionEnded: {
    title: "Session complete",
    message: "Thank you for being here. Take care of yourself.",
  },
  bookingConfirmed: {
    title: "You're all set",
    message: "We look forward to seeing you. 💛",
  },
} as const;

export type MessageKey = keyof typeof compassionateMessages;

export function getCompassionateMessage(key: MessageKey) {
  return compassionateMessages[key];
}

// Helper to get a random encouraging phrase
export const encouragingPhrases = [
  "You're doing great.",
  "Take all the time you need.",
  "We're here with you.",
  "One step at a time.",
  "You've got this.",
  "Be gentle with yourself.",
  "Every moment matters.",
  "You're not alone in this.",
];

export function getRandomEncouragement(): string {
  return encouragingPhrases[Math.floor(Math.random() * encouragingPhrases.length)];
}
