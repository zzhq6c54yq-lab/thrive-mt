
import React from "react";
import { Button } from "@/components/ui/button";
import { MoonStar } from "lucide-react";

const GameSleepTracker: React.FC = () => (
  <div className="flex flex-col items-center py-10 bg-gradient-to-br from-cyan-100 to-sky-200 min-h-[60vh] rounded-xl shadow-lg">
    <MoonStar className="w-14 h-14 text-sky-600 mb-4" />
    <h2 className="text-2xl font-bold mb-2 text-blue-900">Sleep Tracker</h2>
    <p className="text-lg text-sky-700 text-center mb-6 max-w-md">
      Track your sleep patterns! In future updates, you'll be able to monitor your rest and improve your wellness.
    </p>
    <img 
      src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=500&q=80"
      alt="Sleep Tracker illustration"
      className="rounded-xl shadow mb-6 max-w-full object-cover w-72 h-36"
    />
    <Button className="bg-gradient-to-r from-sky-400 to-blue-300 text-blue-900 font-bold pointer-events-none opacity-60" disabled>
      Stay tuned: Sleep Tracker coming soon
    </Button>
  </div>
);

export default GameSleepTracker;
