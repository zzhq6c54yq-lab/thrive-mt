
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoonStar } from "lucide-react";

const GameSleepTracker: React.FC = () => {
  const [hours, setHours] = useState<number | "">("");
  const [entry, setEntry] = useState<number[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    if (typeof hours === "number" && hours >= 0 && hours <= 24) {
      setEntry([...entry, hours]);
      setHours("");
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-cyan-100 to-sky-200 min-h-[60vh] rounded-xl shadow-lg max-w-md mx-auto">
      <MoonStar className="w-14 h-14 text-sky-600 mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-blue-900">Sleep Tracker</h2>
      <p className="text-lg text-sky-700 text-center mb-6 max-w-md">
        Log last night's hours of sleep! Build a healthy sleep habit.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=500&q=80"
        alt="Sleep Tracker illustration"
        className="rounded-xl shadow mb-6 max-w-full object-cover w-72 h-36"
      />
      <div className="flex items-center gap-2 mb-6">
        <input
          type="number"
          value={hours}
          min={0}
          max={24}
          onChange={e => setHours(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Hours slept"
          className="border rounded px-3 py-2 w-28 text-center"
        />
        <Button onClick={handleSave} className="bg-gradient-to-r from-sky-400 to-blue-300 text-blue-900 font-bold">Save</Button>
      </div>
      {showSaved && <div className="text-green-600 mb-2 text-sm font-semibold">Saved!</div>}
      {entry.length > 0 && (
        <div className="w-full mt-3 bg-white rounded shadow p-2">
          <h4 className="text-xs font-semibold text-sky-700 mb-1">Recent sleep log:</h4>
          <ul className="text-sm text-gray-600">
            {entry.slice(-3).reverse().map((val, i) => (
              <li key={i}>Night {entry.length - i}: {val} hours</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameSleepTracker;
