
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const QUESTIONS = [
  {
    q: "Which area interests you most?",
    options: ["Technology", "Healthcare", "Education", "Creative Arts"]
  },
  {
    q: "Which do you value most in a career?",
    options: ["Stability", "Innovation", "Helping Others", "Flexibility"]
  }
];

const SUGGESTIONS = [
  "Tech Field: Look into coding bootcamps or IT certifications.",
  "Healthcare: Consider medical, nursing, or therapy paths.",
  "Education: Teaching or youth development could suit your values.",
  "Creative Arts: Explore design, writing, or performing arts careers."
];

const getSuggestion = (answers: string[]) => {
  if (answers[0] === "Technology") return SUGGESTIONS[0];
  if (answers[0] === "Healthcare") return SUGGESTIONS[1];
  if (answers[0] === "Education") return SUGGESTIONS[2];
  if (answers[0] === "Creative Arts") return SUGGESTIONS[3];
  return "Keep exploring your interests and strengths!";
};

const GameCareerCoaching: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleNext = (answer: string) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowSuggestion(true);
    }
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-br from-amber-100 to-yellow-50 min-h-[60vh] rounded-xl shadow-lg max-w-md mx-auto">
      <Award className="w-14 h-14 text-amber-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-amber-900">Career Coaching</h2>
      <p className="text-lg text-amber-700 text-center mb-6 max-w-md">
        Boost your career with a quick quiz and personalized tips!
      </p>
      <img 
        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=80"
        alt="Career Coaching illustration"
        className="rounded-xl shadow mb-6 max-w-full object-cover w-72 h-36"
      />
      {!showSuggestion ? (
        <>
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-2 text-amber-800">{QUESTIONS[step].q}</h3>
            <div className="flex flex-wrap gap-2">
              {QUESTIONS[step].options.map(option => (
                <Button
                  key={option}
                  onClick={() => handleNext(option)}
                  className="bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-900 font-bold flex-1"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white/70 rounded p-4 mt-4 text-center shadow">
          <div className="text-lg font-bold text-amber-700 mb-2">Suggestion:</div>
          <div className="text-amber-900">{getSuggestion(answers)}</div>
        </div>
      )}
    </div>
  );
};

export default GameCareerCoaching;
