import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BreathingAnimationProps {
  onComplete?: () => void;
  duration?: number; // Duration in seconds
}

export const BreathingAnimation = ({ onComplete, duration = 4 }: BreathingAnimationProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold2'>('inhale');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const breathCycle = [
      { phase: 'inhale', duration: duration },
      { phase: 'hold', duration: duration * 0.5 },
      { phase: 'exhale', duration: duration },
      { phase: 'hold2', duration: duration * 0.5 }
    ];

    let currentIndex = 0;
    let timeout: NodeJS.Timeout;

    const nextPhase = () => {
      const cycle = breathCycle[currentIndex];
      setPhase(cycle.phase as any);
      
      timeout = setTimeout(() => {
        currentIndex = (currentIndex + 1) % breathCycle.length;
        setCount(prev => prev + 1);
        
        if (count >= 3 && onComplete) {
          onComplete();
        } else {
          nextPhase();
        }
      }, cycle.duration * 1000);
    };

    nextPhase();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [count, onComplete, duration]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in...';
      case 'hold':
        return 'Hold...';
      case 'exhale':
        return 'Breathe out...';
      case 'hold2':
        return 'Hold...';
    }
  };

  const getScale = () => {
    switch (phase) {
      case 'inhale':
        return 1.5;
      case 'hold':
        return 1.5;
      case 'exhale':
        return 1;
      case 'hold2':
        return 1;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Breathing Circle */}
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-bronze-500 to-bronze-600"
            animate={{
              scale: getScale(),
              boxShadow: phase === 'inhale' || phase === 'hold'
                ? '0 0 80px rgba(212, 175, 55, 0.6)'
                : '0 0 40px rgba(212, 175, 55, 0.3)'
            }}
            transition={{
              duration: duration,
              ease: "easeInOut"
            }}
          />

          {/* Pulsing Rings */}
          {(phase === 'inhale' || phase === 'hold') && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-bronze-400"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-bronze-400"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1
                }}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Phase Text */}
      <motion.p
        key={phase}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mt-12 text-2xl text-white font-light tracking-wide"
      >
        {getPhaseText()}
      </motion.p>

      {/* Breath Count */}
      <p className="mt-4 text-sm text-gray-400">
        Breath {Math.floor(count / 4) + 1} of 3
      </p>
    </div>
  );
};
