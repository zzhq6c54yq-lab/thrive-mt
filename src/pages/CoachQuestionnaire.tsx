import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CoachQuestionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const questions = [
    {
      id: "goals",
      title: "What are your coaching goals?",
      subtitle: "Select all that apply",
      type: "multiple",
      options: [
        { value: "stress", label: "Reduce stress & feel more grounded", icon: "🧘" },
        { value: "habits", label: "Build healthy routines & habits", icon: "📅" },
        { value: "motivation", label: "Improve motivation & productivity", icon: "🚀" },
        { value: "relationships", label: "Strengthen relationships & communication", icon: "💬" },
        { value: "transitions", label: "Navigate life transitions & changes", icon: "🌱" },
        { value: "burnout", label: "Recover from burnout & overwhelm", icon: "🔥" },
        { value: "confidence", label: "Grow confidence & self-awareness", icon: "✨" },
        { value: "balance", label: "Create better work-life balance", icon: "⚖️" },
      ],
    },
    {
      id: "style",
      title: "What coaching style resonates with you?",
      subtitle: "Choose one",
      type: "single",
      options: [
        { value: "warm", label: "Warm & Supportive", description: "Gentle, empathetic approach with lots of encouragement" },
        { value: "direct", label: "Direct & Action-Oriented", description: "Straightforward guidance focused on accountability and results" },
        { value: "balanced", label: "Balanced Approach", description: "Mix of empathy and actionable strategies" },
        { value: "evidence", label: "Evidence-Based", description: "Structured frameworks rooted in psychology and research" },
      ],
    },
    {
      id: "communication",
      title: "How do you prefer to connect?",
      subtitle: "Select all that work for you",
      type: "multiple",
      options: [
        { value: "text", label: "Unlimited Text Messaging", description: "Daily replies, ongoing support" },
        { value: "audio", label: "Audio Coaching Calls", description: "Quick check-ins and focused guidance" },
        { value: "video", label: "Live Video Sessions", description: "Face-to-face structured coaching" },
      ],
    },
    {
      id: "frequency",
      title: "How often do you want support?",
      subtitle: "Choose one",
      type: "single",
      options: [
        { value: "daily", label: "Daily", description: "Text coaching with daily replies" },
        { value: "weekly", label: "Weekly Sessions", description: "Regular video or audio sessions" },
        { value: "biweekly", label: "Bi-Weekly", description: "Sessions every two weeks" },
        { value: "flexible", label: "As Needed", description: "Flexible scheduling based on your needs" },
      ],
    },
    {
      id: "budget",
      title: "What's your budget for coaching?",
      subtitle: "Choose the range that works for you",
      type: "single",
      options: [
        { value: "starter", label: "$29-50/week", description: "Text coaching or occasional calls" },
        { value: "standard", label: "$99/month", description: "Wellness Starter Bundle" },
        { value: "premium", label: "$159/month", description: "Premium Support Bundle" },
        { value: "custom", label: "Custom Package", description: "Build your own plan" },
      ],
    },
    {
      id: "preferences",
      title: "Any additional preferences?",
      subtitle: "Select all that matter to you",
      type: "multiple",
      options: [
        { value: "experience", label: "10+ years experience", icon: "🎓" },
        { value: "certifications", label: "Advanced certifications", icon: "📜" },
        { value: "bilingual", label: "Bilingual coach", icon: "🌍" },
        { value: "specialized", label: "Specialized in my area", icon: "🎯" },
        { value: "availability", label: "Weekend availability", icon: "📆" },
      ],
    },
  ];

  const currentQuestion = questions[currentStep];

  const handleAnswer = (value: string) => {
    if (currentQuestion.type === "multiple") {
      const current = answers[currentQuestion.id] || [];
      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [currentQuestion.id]: updated });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const isAnswered = () => {
    const answer = answers[currentQuestion.id];
    return answer && (Array.isArray(answer) ? answer.length > 0 : true);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/coach-matches", { state: { preferences: answers } });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Find Your Perfect Coach</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Let's Match You With Your Coach
          </h1>
          <p className="text-muted-foreground text-lg">
            Answer a few questions to find coaches that fit your goals and style
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/60"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 mb-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h2 className="text-2xl font-bold mb-2">{currentQuestion.title}</h2>
              <p className="text-muted-foreground mb-6">{currentQuestion.subtitle}</p>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = currentQuestion.type === "multiple"
                    ? (answers[currentQuestion.id] || []).includes(option.value)
                    : answers[currentQuestion.id] === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {option.icon && <span className="text-2xl">{option.icon}</span>}
                        <div className="flex-1">
                          <div className="font-semibold">{option.label}</div>
                          {option.description && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {option.description}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isAnswered()}
            className="flex-1"
          >
            {currentStep === questions.length - 1 ? "See My Matches" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoachQuestionnaire;
