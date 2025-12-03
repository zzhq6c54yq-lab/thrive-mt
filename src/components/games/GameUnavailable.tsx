
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GameUnavailable: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center">
      <AlertTriangle className="w-10 h-10 text-orange-400 mb-3" />
      <h2 className="font-bold text-xl mb-2 text-orange-700">Game Unavailable</h2>
      <p className="mb-4 text-zinc-600 text-center max-w-xs">
        Sorry, this mini-game isn't ready yet. Please check back soon!
      </p>
      <Button onClick={() => navigate("/app/dashboard")} className="bg-gradient-to-r from-orange-400 to-amber-300 text-black">
        Back to Dashboard
      </Button>
    </div>
  );
};

export default GameUnavailable;
