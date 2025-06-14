
import React from "react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const GameMeditationStudio: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <Award className="w-12 h-12 mb-4 text-purple-500" />
      <h2 className="text-lg font-bold mb-3 text-purple-900">Meditation Studio</h2>
      <p className="text-center text-zinc-600 mb-5 max-w-xs">
        Take a break and meditate! Guided audio, breathing exercises, and relaxing sounds coming soon.
      </p>
      <Button className="bg-gradient-to-r from-purple-600 to-purple-200 text-white" disabled>
        Coming soon: Begin Meditation
      </Button>
    </div>
  );
};

export default GameMeditationStudio;

