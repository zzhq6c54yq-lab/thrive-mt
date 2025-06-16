
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoonStar } from "lucide-react";

const GameSleepTracker: React.FC = () => {
  const [hoursSlept, setHoursSlept] = useState(8);
  const [quality, setQuality] = useState<"poor" | "fair" | "good" | "excellent">("good");
  const [logged, setLogged] = useState(false);

  const handleLogSleep = () => {
    setLogged(true);
    // Here you would typically save to a database or local storage
  };

  const resetLog = () => {
    setLogged(false);
    setHoursSlept(8);
    setQuality("good");
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-cyan-100 to-sky-200 min-h-[60vh] rounded-xl shadow-lg max-w-md mx-auto">
      <MoonStar className="w-14 h-14 text-sky-600 mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-sky-900">Sleep Tracker</h2>
      <p className="text-lg text-sky-700 text-center mb-6 max-w-md">
        Track your sleep to improve your rest habits and overall wellbeing.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=500&q=80"
        alt="Sleep Tracker illustration"
        className="rounded-xl shadow mb-6 max-w-full object-cover w-72 h-36"
      />
      
      {!logged ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <div className="w-full">
            <label className="block text-sky-800 font-semibold mb-2">Hours Slept:</label>
            <input 
              type="range" 
              min="1" 
              max="12" 
              value={hoursSlept}
              onChange={(e) => setHoursSlept(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-sky-700 font-bold text-xl">{hoursSlept} hours</div>
          </div>
          
          <div className="w-full">
            <label className="block text-sky-800 font-semibold mb-2">Sleep Quality:</label>
            <div className="grid grid-cols-2 gap-2">
              {["poor", "fair", "good", "excellent"].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q as any)}
                  className={`px-3 py-2 rounded capitalize ${
                    quality === q ? 'bg-sky-600 text-white' : 'bg-sky-200 text-sky-800'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          
          <Button onClick={handleLogSleep} className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-sky-900 font-bold">
            Log Sleep
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-lg font-bold text-green-700 mb-4">Sleep logged successfully! 🌙</div>
          <div className="text-sky-800 mb-4">
            <p>Hours: {hoursSlept}</p>
            <p>Quality: {quality}</p>
          </div>
          <Button onClick={resetLog} className="bg-gradient-to-r from-sky-500 to-cyan-400 text-sky-900 font-bold">
            Log Another Night
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameSleepTracker;
