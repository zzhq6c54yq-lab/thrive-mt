import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, RotateCcw, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const BreathingExercise = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale");
  const [countdown, setCountdown] = useState(4);
  const [cycles, setCycles] = useState(0);

  const phases = {
    inhale: { duration: 4, next: "hold", label: "Breathe In" },
    hold: { duration: 4, next: "exhale", label: "Hold" },
    exhale: { duration: 4, next: "rest", label: "Breathe Out" },
    rest: { duration: 2, next: "inhale", label: "Rest" }
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const currentPhase = phases[phase];
          const nextPhase = currentPhase.next as typeof phase;
          setPhase(nextPhase);
          
          if (nextPhase === "inhale") {
            setCycles((c) => c + 1);
          }
          
          return phases[nextPhase].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("inhale");
    setCountdown(4);
    setCycles(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/app/mental-wellness-tools")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Wellness Tools
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Breathing Exercise
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use the 4-4-4-2 breathing technique to calm your mind and reduce stress
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-2">
            <div className="flex flex-col items-center space-y-8">
              <motion.div
                className="relative w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                animate={{
                  scale: phase === "inhale" ? 1.2 : phase === "exhale" ? 0.8 : 1,
                }}
                transition={{ duration: phases[phase].duration, ease: "easeInOut" }}
              >
                <Wind className="h-24 w-24 text-primary" />
              </motion.div>

              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  {phases[phase].label}
                </h2>
                <p className="text-6xl font-bold text-primary">{countdown}</p>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={handleToggle}
                  className="min-w-32"
                >
                  {isActive ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Start
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Cycles completed: <span className="font-bold text-foreground">{cycles}</span>
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">How it works:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Breathe in slowly for 4 seconds</li>
              <li>• Hold your breath for 4 seconds</li>
              <li>• Breathe out slowly for 4 seconds</li>
              <li>• Rest for 2 seconds</li>
              <li>• Repeat for 5-10 cycles for best results</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BreathingExercise;
