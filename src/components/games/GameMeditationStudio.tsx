
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const MEDITATION_SECONDS = 20;

const GameMeditationStudio: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(MEDITATION_SECONDS);
  const [done, setDone] = useState(false);

  React.useEffect(() => {
    if (!running) return;
    if (secondsLeft === 0) {
      setRunning(false);
      setDone(true);
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running, secondsLeft]);

  const handleStart = () => {
    setRunning(true);
    setSecondsLeft(MEDITATION_SECONDS);
    setDone(false);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-purple-100 to-indigo-100 min-h-[60vh] rounded-xl shadow-lg max-w-md mx-auto">
      <Sparkles className="w-14 h-14 text-purple-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-purple-900">Meditation Studio</h2>
      <p className="text-lg text-purple-700 text-center mb-6 max-w-md">
        Relax and meditate! Try a quick breathing session below.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=500&q=80"
        alt="Meditation Studio illustration"
        className="rounded-xl shadow mb-6 max-w-full object-cover w-72 h-36"
      />
      <div className="flex flex-col items-center gap-4 my-4">
        {!running && !done && (
          <Button onClick={handleStart} className="bg-gradient-to-r from-purple-400 to-indigo-300 text-purple-900 font-bold w-48">
            Start 20s Meditation
          </Button>
        )}
        {running && (
          <div className="text-2xl font-mono text-purple-900 p-4 animate-pulse">
            {secondsLeft} seconds left
          </div>
        )}
        {done && (
          <div className="text-lg font-bold text-green-700">Well done! You’ve finished your meditation 🎉</div>
        )}
      </div>
    </div>
  );
};

export default GameMeditationStudio;
