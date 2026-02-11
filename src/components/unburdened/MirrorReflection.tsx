import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Wind, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Mood } from "@/hooks/useUnburden";

const MOOD_GRADIENTS: Record<Mood, string> = {
  calm: "from-blue-200 to-blue-400",
  sad: "from-indigo-200 to-indigo-400",
  angry: "from-rose-200 to-rose-400",
  anxious: "from-yellow-200 to-amber-400",
  hopeful: "from-green-200 to-green-400",
};

type BreathPhase = 'inhale' | 'hold' | 'exhale';

function BreathingModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [cycle, setCycle] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);
  const totalCycles = 3;
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const phaseDurations: Record<BreathPhase, number> = { inhale: 4, hold: 4, exhale: 6 };
  const phaseLabels: Record<BreathPhase, string> = { inhale: 'Breathe In', hold: 'Hold', exhale: 'Breathe Out' };
  const phaseColors: Record<BreathPhase, string> = {
    inhale: 'from-blue-400 to-cyan-400',
    hold: 'from-amber-400 to-yellow-300',
    exhale: 'from-green-400 to-emerald-400',
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          setPhase(currentPhase => {
            if (currentPhase === 'inhale') { return 'hold'; }
            if (currentPhase === 'hold') { return 'exhale'; }
            // exhale done – next cycle
            setCycle(c => c + 1);
            return 'inhale';
          });
          return -1; // will be set by phase change effect
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    setSecondsLeft(phaseDurations[phase]);
  }, [phase]);

  useEffect(() => {
    if (cycle >= totalCycles) clearInterval(timerRef.current);
  }, [cycle]);

  const done = cycle >= totalCycles;
  const circleScale = phase === 'inhale' ? 1.3 : phase === 'exhale' ? 0.7 : 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-card rounded-2xl p-8 max-w-sm w-full mx-4 text-center space-y-6 relative"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold">Guided Breathing</h3>

        {!done ? (
          <>
            <div className="flex justify-center">
              <motion.div
                animate={{ scale: circleScale }}
                transition={{ duration: phaseDurations[phase], ease: "easeInOut" }}
                className={`w-32 h-32 rounded-full bg-gradient-to-br ${phaseColors[phase]} flex items-center justify-center shadow-lg`}
              >
                <span className="text-white font-bold text-xl">{secondsLeft}</span>
              </motion.div>
            </div>
            <p className="text-xl font-medium">{phaseLabels[phase]}</p>
            <p className="text-sm text-muted-foreground">Cycle {Math.min(cycle + 1, totalCycles)} of {totalCycles}</p>
          </>
        ) : (
          <div className="space-y-4 py-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl">🌿</motion.div>
            <p className="text-lg font-medium">Well done</p>
            <p className="text-sm text-muted-foreground">Take a moment to notice how you feel.</p>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

interface MirrorReflectionProps {
  text: string;
  mood: Mood;
  reflection: string;
  loading?: boolean;
  onContinue: () => void;
}

export default function MirrorReflection({
  text,
  mood,
  reflection,
  loading,
  onContinue,
}: MirrorReflectionProps) {
  const [showBreathing, setShowBreathing] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* User's Post */}
        <div className={`p-6 rounded-2xl bg-gradient-to-r ${MOOD_GRADIENTS[mood]} bg-opacity-10 backdrop-blur-sm border border-white/10`}>
          <h2 className="font-semibold text-lg mb-2">Your Words Are Safe</h2>
          <p className="text-foreground/90">{text}</p>
        </div>

        {/* MirrorAI Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground font-medium mb-2">MirrorAI Reflection</div>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
                </div>
              ) : (
                <p className="text-base text-foreground leading-relaxed">{reflection}</p>
              )}
            </div>
          </div>

          {!loading && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={onContinue}
                className="gap-2"
              >
                <Heart className="w-4 h-4" />
                See Community
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setShowBreathing(true)}
              >
                <Wind className="w-4 h-4" />
                Guided Breath
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showBreathing && <BreathingModal onClose={() => setShowBreathing(false)} />}
      </AnimatePresence>
    </>
  );
}
