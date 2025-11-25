import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getEmpatheticCopy } from "@/constants/empatheticCopy";
import { playSound } from "@/utils/soundSystem";

interface ClosingRitualProps {
  activitiesToday: string[];
  onComplete: () => void;
}

export const ClosingRitual = ({ activitiesToday, onComplete }: ClosingRitualProps) => {
  const [phase, setPhase] = useState<'showed_up' | 'recap' | 'tomorrow' | 'fade'>('showed_up');

  useEffect(() => {
    playSound('complete');

    const phases = [
      { name: 'showed_up', duration: 2000 },
      { name: 'recap', duration: 3000 },
      { name: 'tomorrow', duration: 2000 },
      { name: 'fade', duration: 1000 }
    ];

    let currentIndex = 0;

    const nextPhase = () => {
      if (currentIndex >= phases.length) {
        onComplete();
        return;
      }

      setPhase(phases[currentIndex].name as any);
      
      setTimeout(() => {
        currentIndex++;
        nextPhase();
      }, phases[currentIndex].duration);
    };

    nextPhase();
  }, [activitiesToday, onComplete]);

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const tomorrowText = tomorrow.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <AnimatePresence mode="wait">
        {phase === 'showed_up' && (
          <motion.div
            key="showed_up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center px-8"
          >
            <h2 className="text-3xl md:text-4xl text-white font-light mb-4">
              {getEmpatheticCopy('closing', 'showed_up')}
            </h2>
          </motion.div>
        )}

        {phase === 'recap' && (
          <motion.div
            key="recap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center px-8 max-w-2xl"
          >
            <h2 className="text-2xl text-white font-light mb-6">
              Today you:
            </h2>
            <div className="space-y-3">
              {activitiesToday.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="text-lg text-bronze-300"
                >
                  • {activity}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'tomorrow' && (
          <motion.div
            key="tomorrow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center px-8"
          >
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-4xl md:text-5xl text-bronze-400 font-light mb-6"
            >
              {tomorrowText}
            </motion.div>
            <p className="text-xl text-white font-light">
              {getEmpatheticCopy('closing', 'tomorrow')}
            </p>
          </motion.div>
        )}

        {phase === 'fade' && (
          <motion.div
            key="fade"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-center px-8"
          >
            <p className="text-xl text-white font-light">
              {getEmpatheticCopy('closing', 'rest')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
