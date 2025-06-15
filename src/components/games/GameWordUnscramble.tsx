
import React from "react";
import { Button } from "@/components/ui/button";
import { ListChecks } from "lucide-react";

const GameWordUnscramble: React.FC = () => (
  <div className="flex flex-col items-center py-10 bg-gradient-to-br from-pink-100 to-fuchsia-100 min-h-[60vh] rounded-xl shadow-lg">
    <ListChecks className="w-14 h-14 text-fuchsia-700 mb-4" />
    <h2 className="text-2xl font-bold mb-2 text-fuchsia-950">Word Unscramble</h2>
    <p className="text-lg text-fuchsia-700 text-center mb-6 max-w-md">
      Unscramble letters and discover the hidden word! A fun brain workout for vocabulary and speed.
    </p>
    <img 
      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&q=80"
      alt="Word Unscramble illustration"
      className="rounded-xl shadow mb-6 max-w-full object-cover w-72 h-36"
    />
    <Button className="bg-gradient-to-r from-fuchsia-400 to-pink-300 text-fuchsia-950 font-bold pointer-events-none opacity-60" disabled>
      Coming soon: Play!
    </Button>
  </div>
);

export default GameWordUnscramble;
