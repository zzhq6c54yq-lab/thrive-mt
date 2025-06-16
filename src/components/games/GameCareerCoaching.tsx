
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const CAREER_TIPS = [
  "Set clear, measurable career goals and review them quarterly.",
  "Network authentically by helping others before asking for help.",
  "Develop both hard skills and emotional intelligence.",
  "Seek feedback regularly and act on constructive criticism.",
  "Build a personal brand that reflects your values and expertise.",
  "Stay curious and embrace lifelong learning.",
  "Find mentors and become a mentor to others.",
  "Take calculated risks to accelerate your growth."
];

const GameCareerCoaching: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleNextTip = () => {
    if (currentTip < CAREER_TIPS.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = () => {
    setQuizComplete(true);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-amber-100 to-yellow-50 min-h-[60vh] rounded-xl shadow-lg max-w-md mx-auto">
      <Award className="w-14 h-14 text-amber-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-amber-900">Career Coaching</h2>
      <p className="text-lg text-amber-700 text-center mb-6 max-w-md">
        Boost your career with actionable tips and quick assessments.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=80"
        alt="Career Coaching illustration"
        className="rounded-xl shadow mb-6 max-w-full object-cover w-72 h-36"
      />
      
      {!showQuiz && !quizComplete && (
        <div className="text-center max-w-sm">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h3 className="font-bold text-amber-800 mb-3">Career Tip #{currentTip + 1}</h3>
            <p className="text-amber-700">{CAREER_TIPS[currentTip]}</p>
          </div>
          <Button onClick={handleNextTip} className="bg-gradient-to-r from-amber-500 to-orange-400 text-amber-900 font-bold">
            {currentTip < CAREER_TIPS.length - 1 ? "Next Tip" : "Take Quick Quiz"}
          </Button>
        </div>
      )}
      
      {showQuiz && !quizComplete && (
        <div className="text-center max-w-sm">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h3 className="font-bold text-amber-800 mb-3">Quick Self-Assessment</h3>
            <p className="text-amber-700 mb-4">On a scale of 1-10, how satisfied are you with your current career progress?</p>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <button
                  key={num}
                  onClick={handleQuizComplete}
                  className="px-2 py-1 bg-amber-200 hover:bg-amber-300 rounded text-amber-800 font-semibold"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {quizComplete && (
        <div className="text-center">
          <div className="text-lg font-bold text-green-700 mb-4">Assessment complete! 🏆</div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-amber-700">Keep focusing on your goals and remember: career growth is a marathon, not a sprint!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCareerCoaching;
