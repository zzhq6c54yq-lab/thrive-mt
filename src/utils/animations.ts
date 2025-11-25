import confetti from 'canvas-confetti';

export const celebrateGoalCompletion = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#b87333', '#f5c14d', '#e5c5a1']
  });
};

export const celebrateAssessmentComplete = () => {
  confetti({
    particleCount: 50,
    spread: 50,
    colors: ['#b87333', '#e5c5a1']
  });
};

export const celebrateSessionComplete = () => {
  confetti({
    particleCount: 75,
    spread: 60,
    origin: { y: 0.6 },
    colors: ['#b87333', '#f5c14d']
  });
};

export const celebrateMilestone = () => {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.5 },
    colors: ['#b87333', '#f5c14d', '#e5c5a1', '#a56625']
  });
};

export const cardHoverAnimation = "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl";

export const buttonHoverAnimation = "transition-all duration-200 hover:scale-105 active:scale-95";

export const fadeInAnimation = "animate-fade-in";

export const slideUpAnimation = "animate-fade-up";
