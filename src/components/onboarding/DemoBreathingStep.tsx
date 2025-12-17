import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoBreathingStepProps {
  onComplete: () => void;
}

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'hold2';

const DemoBreathingStep: React.FC<DemoBreathingStepProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const totalCycles = 3;

  useEffect(() => {
    const timings: Record<BreathPhase, number> = {
      inhale: 4000,
      hold: 4000,
      exhale: 4000,
      hold2: 2000,
    };

    const nextPhase: Record<BreathPhase, BreathPhase> = {
      inhale: 'hold',
      hold: 'exhale',
      exhale: 'hold2',
      hold2: 'inhale',
    };

    const timer = setTimeout(() => {
      if (phase === 'hold2') {
        const newCount = cycleCount + 1;
        setCycleCount(newCount);
        if (newCount >= totalCycles) {
          onComplete();
          return;
        }
      }
      setPhase(nextPhase[phase]);
    }, timings[phase]);

    return () => clearTimeout(timer);
  }, [phase, cycleCount, onComplete]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
    }
  };

  const getScale = () => {
    switch (phase) {
      case 'inhale': return 1.3;
      case 'hold': return 1.3;
      case 'exhale': return 1;
      case 'hold2': return 1;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center px-4">
      {/* Header text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-xl sm:text-2xl font-light text-white/80 mb-2">
          Let's take a moment
        </h1>
        <p className="text-sm sm:text-base text-white/50">
          {cycleCount + 1} of {totalCycles} breaths
        </p>
      </motion.div>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64">
        {/* Outer glow rings */}
        <motion.div
          animate={{
            scale: phase === 'inhale' || phase === 'hold' ? [1, 1.2, 1] : 1,
            opacity: phase === 'inhale' || phase === 'hold' ? [0.3, 0.1, 0.3] : 0.1,
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute w-full h-full rounded-full bg-[#B87333]/20"
        />
        <motion.div
          animate={{
            scale: phase === 'inhale' || phase === 'hold' ? [1, 1.4, 1] : 1,
            opacity: phase === 'inhale' || phase === 'hold' ? [0.2, 0.05, 0.2] : 0.05,
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute w-full h-full rounded-full bg-[#D4A574]/10"
        />

        {/* Main breathing circle */}
        <motion.div
          animate={{
            scale: getScale(),
            boxShadow: phase === 'inhale' || phase === 'hold'
              ? '0 0 60px rgba(184, 115, 51, 0.4)'
              : '0 0 30px rgba(184, 115, 51, 0.2)',
          }}
          transition={{ duration: phase === 'hold2' ? 2 : 4, ease: 'easeInOut' }}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#B87333] to-[#D4A574] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="text-white font-medium text-base sm:text-lg"
            >
              {getPhaseText()}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8 sm:mt-12">
        {Array.from({ length: totalCycles }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              backgroundColor: i < cycleCount ? '#B87333' : i === cycleCount ? '#D4A574' : 'rgba(255,255,255,0.2)'
            }}
            transition={{ delay: i * 0.1 }}
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
          />
        ))}
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onComplete}
        className="mt-8 text-white/40 text-sm hover:text-white/60 transition-colors"
      >
        Skip breathing exercise
      </motion.button>
    </div>
  );
};

export default DemoBreathingStep;
