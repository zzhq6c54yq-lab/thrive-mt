import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Star, Trophy } from 'lucide-react';

interface CelebrationMomentProps {
  show: boolean;
  type?: 'achievement' | 'milestone' | 'streak' | 'first' | 'completion';
  title?: string;
  message?: string;
  onComplete?: () => void;
  autoHide?: number;
}

const celebrationConfig = {
  achievement: {
    icon: Trophy,
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-500/20 to-amber-500/20',
    defaultTitle: 'Achievement Unlocked!',
    defaultMessage: "You're making amazing progress.",
  },
  milestone: {
    icon: Star,
    color: 'text-bronze-400',
    bgGradient: 'from-bronze-500/20 to-amber-500/20',
    defaultTitle: 'Milestone Reached!',
    defaultMessage: "Look how far you've come.",
  },
  streak: {
    icon: Sparkles,
    color: 'text-orange-400',
    bgGradient: 'from-orange-500/20 to-red-500/20',
    defaultTitle: "You're On Fire!",
    defaultMessage: 'Keep this momentum going.',
  },
  first: {
    icon: Heart,
    color: 'text-rose-400',
    bgGradient: 'from-rose-500/20 to-pink-500/20',
    defaultTitle: 'First Step Taken!',
    defaultMessage: 'Every journey begins with a single step.',
  },
  completion: {
    icon: Sparkles,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
    defaultTitle: 'Complete!',
    defaultMessage: "You did it. We're proud of you.",
  },
};

export const CelebrationMoment: React.FC<CelebrationMomentProps> = ({
  show,
  type = 'achievement',
  title,
  message,
  onComplete,
  autoHide = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const config = celebrationConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      // Trigger confetti
      const bronzeColors = ['#D4AF37', '#B87333', '#E8D4C0', '#FFD700'];
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: bronzeColors,
      });

      // Second burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: bronzeColors,
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: bronzeColors,
        });
      }, 200);

      // Auto-hide
      if (autoHide > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, autoHide);
        return () => clearTimeout(timer);
      }
    }
  }, [show, autoHide, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Backdrop glow */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute inset-0 bg-gradient-radial from-bronze-500/10 via-transparent to-transparent"
          />

          {/* Celebration card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className={`relative bg-gradient-to-br ${config.bgGradient} backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl`}
          >
            {/* Animated icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', damping: 10 }}
              className="mb-4"
            >
              <div className={`inline-flex p-4 rounded-full bg-background/50 ${config.color}`}>
                <Icon className="w-10 h-10" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-semibold text-foreground mb-2"
            >
              {title || config.defaultTitle}
            </motion.h3>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground"
            >
              {message || config.defaultMessage}
            </motion.p>

            {/* Henry's touch */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <span className="text-sm text-bronze-400 italic flex items-center justify-center gap-2">
                <Heart className="w-3 h-3 fill-current" />
                Henry celebrates with you
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationMoment;
