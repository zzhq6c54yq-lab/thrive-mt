
import React from "react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const GameCareerCoaching: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <Award className="w-12 h-12 mb-4 text-amber-500" />
      <h2 className="text-lg font-bold mb-3 text-amber-900">Career Coaching</h2>
      <p className="text-center text-zinc-600 mb-5 max-w-xs">
        Boost your career with interactive coaching! Tips, quizzes, and virtual mock sessions ahead.
      </p>
      <Button className="bg-gradient-to-r from-amber-600 to-yellow-300 text-black" disabled>
        Coming soon: Start Session
      </Button>
    </div>
  );
};

export default GameCareerCoaching;
