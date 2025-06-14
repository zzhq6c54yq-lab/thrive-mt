
import React from "react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const GameSleepTracker: React.FC = () => {
  // Placeholder tracker UI
  return (
    <div className="flex flex-col items-center py-10">
      <Award className="w-12 h-12 mb-4 text-blue-400" />
      <h2 className="text-lg font-bold mb-3 text-blue-700">Sleep Tracker</h2>
      <p className="text-center text-zinc-600 mb-5 max-w-xs">
        Track your nightly sleep patterns! Log bedtime and wake-up time to monitor your rest.
      </p>
      <Button className="bg-gradient-to-r from-blue-600 to-blue-300 text-white" disabled>
        Coming soon: Log Sleep
      </Button>
    </div>
  );
};

export default GameSleepTracker;
