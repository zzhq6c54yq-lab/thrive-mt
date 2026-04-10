
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoonStar, Loader2 } from "lucide-react";
import { useSleepTracker } from "@/hooks/useSleepTracker";

const qualityMap: Record<string, number> = { poor: 2, fair: 4, good: 7, excellent: 9 };

const GameSleepTracker: React.FC = () => {
  const [hoursSlept, setHoursSlept] = useState(8);
  const [quality, setQuality] = useState<"poor" | "fair" | "good" | "excellent">("good");
  const [logged, setLogged] = useState(false);
  const { logSleep, isSaving, entries } = useSleepTracker();

  const handleLogSleep = async () => {
    // Derive bed/wake times from hours slept
    const now = new Date();
    const wakeTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const bedDate = new Date(now.getTime() - hoursSlept * 60 * 60 * 1000);
    const bedTime = `${bedDate.getHours().toString().padStart(2, '0')}:${bedDate.getMinutes().toString().padStart(2, '0')}`;

    const result = await logSleep(bedTime, wakeTime, qualityMap[quality]);
    if (result) {
      setLogged(true);
    }
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
      {entries.length > 0 && (
        <p className="text-sm text-sky-600 mb-4">{entries.length} nights logged so far</p>
      )}
      
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
              {(["poor", "fair", "good", "excellent"] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`px-3 py-2 rounded capitalize ${
                    quality === q ? 'bg-sky-600 text-white' : 'bg-sky-200 text-sky-800'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleLogSleep} 
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-sky-900 font-bold"
          >
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Log Sleep"}
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
