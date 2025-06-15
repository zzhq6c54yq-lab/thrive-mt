
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const GameMeditationStudio: React.FC = () => (
  <div className="flex flex-col items-center py-10 bg-gradient-to-br from-purple-100 to-indigo-100 min-h-[60vh] rounded-xl shadow-lg">
    <Sparkles className="w-14 h-14 text-purple-500 mb-4" />
    <h2 className="text-2xl font-bold mb-2 text-purple-900">Meditation Studio</h2>
    <p className="text-lg text-purple-700 text-center mb-6 max-w-md">
      Relax and meditate! Breathing exercises and soothing sounds will arrive in future updates.
    </p>
    <img 
      src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=500&q=80"
      alt="Meditation Studio illustration"
      className="rounded-xl shadow mb-6 max-w-full object-cover w-72 h-36"
    />
    <Button className="bg-gradient-to-r from-purple-400 to-indigo-300 text-purple-900 font-bold pointer-events-none opacity-60" disabled>
      Coming soon: Begin Meditation!
    </Button>
  </div>
);

export default GameMeditationStudio;
