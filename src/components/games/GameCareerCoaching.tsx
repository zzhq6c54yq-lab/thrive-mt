
import React from "react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const GameCareerCoaching: React.FC = () => (
  <div className="flex flex-col items-center py-10 bg-gradient-to-br from-amber-100 to-yellow-50 min-h-[60vh] rounded-xl shadow-lg">
    <Award className="w-14 h-14 text-amber-500 mb-4" />
    <h2 className="text-2xl font-bold mb-2 text-amber-900">Career Coaching</h2>
    <p className="text-lg text-amber-700 text-center mb-6 max-w-md">
      Boost your career with tips, quizzes, and virtual mock sessions. Get ready to shine!
    </p>
    <img 
      src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=80"
      alt="Career Coaching illustration"
      className="rounded-xl shadow mb-6 max-w-full object-cover w-72 h-36"
    />
    <Button className="bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-900 font-bold pointer-events-none opacity-60" disabled>
      Coming soon: Start Session!
    </Button>
  </div>
);

export default GameCareerCoaching;
