import { useState, useCallback } from 'react';

type CelebrationType = 'achievement' | 'milestone' | 'streak' | 'first' | 'completion';

interface CelebrationState {
  show: boolean;
  type: CelebrationType;
  title?: string;
  message?: string;
}

/**
 * Hook for triggering celebration moments throughout ThriveMT
 * Provides consistent celebration UX across the app
 */
export function useCelebration() {
  const [celebration, setCelebration] = useState<CelebrationState>({
    show: false,
    type: 'achievement',
  });

  const celebrate = useCallback((
    type: CelebrationType,
    title?: string,
    message?: string
  ) => {
    setCelebration({
      show: true,
      type,
      title,
      message,
    });
  }, []);

  const hideCelebration = useCallback(() => {
    setCelebration(prev => ({ ...prev, show: false }));
  }, []);

  // Convenience methods for common celebrations
  const celebrateFirst = useCallback((item: string) => {
    celebrate('first', `Your First ${item}!`, 'Every journey begins with a single step. 💛');
  }, [celebrate]);

  const celebrateStreak = useCallback((days: number) => {
    celebrate('streak', `${days}-Day Streak!`, `You've shown up for ${days} days in a row.`);
  }, [celebrate]);

  const celebrateMilestone = useCallback((milestone: string) => {
    celebrate('milestone', milestone, "Look how far you've come.");
  }, [celebrate]);

  const celebrateCompletion = useCallback((item: string) => {
    celebrate('completion', `${item} Complete!`, "You did it. We're proud of you.");
  }, [celebrate]);

  const celebrateAchievement = useCallback((badge: string) => {
    celebrate('achievement', `${badge} Earned!`, "You're making amazing progress.");
  }, [celebrate]);

  return {
    celebration,
    celebrate,
    hideCelebration,
    celebrateFirst,
    celebrateStreak,
    celebrateMilestone,
    celebrateCompletion,
    celebrateAchievement,
  };
}

export default useCelebration;
