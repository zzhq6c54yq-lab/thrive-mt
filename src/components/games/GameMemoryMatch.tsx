
import React from "react";
import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";

const backgrounds = [
  "bg-gradient-to-br from-teal-200 to-lime-100",
  "bg-gradient-to-br from-emerald-200 to-cyan-100"
];

const GameMemoryMatch: React.FC = () => (
  <div className={`flex flex-col items-center py-10 ${backgrounds[0]} min-h-[60vh] rounded-xl shadow-lg`}>
    <Grid className="w-14 h-14 text-lime-600 mb-4" />
    <h2 className="text-2xl font-bold mb-2 text-lime-900">Memory Match</h2>
    <p className="text-lg text-lime-700 text-center mb-6 max-w-md">
      Sharpen your mind with Memory Match! Flip cards, test your recall, and have fun while you train your brain.
    </p>
    <img 
      src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80"
      alt="Memory Match illustration"
      className="rounded-xl shadow mb-6 max-w-full object-cover w-72 h-36"
    />
    <Button className="bg-gradient-to-r from-lime-500 to-green-400 text-lime-900 font-bold pointer-events-none opacity-60" disabled>
      Stay tuned: Play in next release!
    </Button>
  </div>
);

export default GameMemoryMatch;
