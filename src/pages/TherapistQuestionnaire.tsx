
import React, { useState } from "react";
import { ArrowLeft, Brain, Check, ListChecks } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import HomeButton from "@/components/HomeButton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

const questions = [
  {
    id: "therapy-goals",
    question: "What are your primary goals for therapy?",
    options: [
      { value: "anxiety", label: "Managing anxiety" },
      { value: "depression", label: "Coping with depression" },
      { value: "trauma", label: "Processing trauma" },
      { value: "relationships", label: "Improving relationships" },
      { value: "self-esteem", label: "Building self-esteem" },
      { value: "stress", label: "Reducing stress" },
      { value: "grief", label: "Processing grief or loss" },
      { value: "life-changes", label: "Navigating life changes" }
    ],
    type: "checkbox"
  },
  {
    id: "therapy-style",
    question: "What therapy approach interests you most?",
    options: [
      { value: "cbt", label: "Cognitive Behavioral Therapy (structured, focused on thought patterns)" },
      { value: "psychodynamic", label: "Psychodynamic (explores past experiences and unconscious patterns)" },
      { value: "humanistic", label: "Humanistic (person-centered, focuses on personal growth)" },
      { value: "mindfulness", label: "Mindfulness-based (present-focused awareness practices)" },
      { value: "integrative", label: "Integrative (combines different therapeutic approaches)" },
      { value: "not-sure", label: "I'm not sure - would like guidance" }
    ],
    type: "radio"
  },
  {
    id: "therapist-traits",
    question: "What traits are most important to you in a therapist?",
    options: [
      { value: "warm", label: "Warm and empathetic" },
      { value: "direct", label: "Direct and challenging" },
      { value: "experienced", label: "Highly experienced in my issues" },
      { value: "creative", label: "Creative and flexible in approach" },
      { value: "structured", label: "Structured and goal-oriented" },
      { value: "culturally-aware", label: "Culturally sensitive/aware" }
    ],
    type: "checkbox"
  },
  {
    id: "session-frequency",
    question: "How often would you ideally like to attend therapy?",
    options: [
      { value: "weekly", label: "Weekly" },
      { value: "biweekly", label: "Every other week" },
      { value: "monthly", label: "Monthly" },
      { value: "as-needed", label: "As needed/flexible" }
    ],
    type: "radio"
  },
  {
    id: "identity-preferences",
    question: "Do you have preferences regarding your therapist's identity?",
    options: [
      { value: "gender", label: "Specific gender" },
      { value: "lgbtq", label: "LGBTQ+ affirming" },
      { value: "cultural", label: "Specific cultural background" },
      { value: "religious", label: "Religious or spiritual background" },
      { value: "age", label: "Age range" },
      { value: "no-preference", label: "No specific preferences" }
    ],
    type: "checkbox"
  }
];

interface AnswerState {
  [key: string]: string | string[];
}

const TherapistQuestionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  
  const handleCheckboxChange = (questionId: string, value: string) => {
    const currentAnswers = answers[questionId] as string[] || [];
    
    if (currentAnswers.includes(value)) {
      setAnswers({
        ...answers,
        [questionId]: currentAnswers.filter(item => item !== value)
      });
    } else {
      setAnswers({
        ...answers,
        [questionId]: [...currentAnswers, value]
      });
    }
  };
  
  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };
  
  const currentQuestion = questions[currentStep];
  
  const nextQuestion = () => {
    // Validate that at least one option is selected
    const currentResponse = answers[currentQuestion.id];
    if (!currentResponse || (Array.isArray(currentResponse) && currentResponse.length === 0)) {
      toast({
        title: "Please select at least one option",
        description: "We need this information to find the right match for you.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // All questions answered, simulate matching process
      findMatch();
    }
  };
  
  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const findMatch = () => {
    // Simulate a processing delay
    toast({
      title: "Finding your perfect therapist match",
      description: "Analyzing your responses to find the right therapist for you..."
    });
    
    // Simulate API call/matching process with timeout
    setTimeout(() => {
      navigate("/therapist-matches", { 
        state: { 
          answers,
          // In a real app, the matches would come from an API
          matches: [
            {
              id: 1,
              name: "Dr. Sarah Johnson",
              specialty: "Anxiety, Depression, Trauma",
              approach: "Cognitive Behavioral Therapy, Mindfulness",
              bio: "Dr. Johnson specializes in evidence-based approaches to anxiety and depression. With 15 years of experience, she combines CBT with mindfulness techniques to help clients develop practical coping strategies.",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            },
            {
              id: 2,
              name: "Michael Rodriguez, LMFT",
              specialty: "Relationships, Family Therapy, Life Transitions",
              approach: "Humanistic, Solution-Focused",
              bio: "Michael creates a warm, supportive environment where clients can explore relationship patterns and develop healthier connections. His approach is strengths-based and practical.",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            },
            {
              id: 3,
              name: "Dr. Amara Patel",
              specialty: "Cultural Identity, Trauma, Anxiety",
              approach: "Integrative, Psychodynamic, CBT",
              bio: "Dr. Patel specializes in culturally-sensitive therapy approaches. She helps clients navigate identity, trauma, and life stressors with an integrative approach tailored to individual needs.",
              image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            }
          ]
        }
      });
    }, 2000);
  };
  
  const progress = ((currentStep + 1) / questions.length) * 100;
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1a1a1f] text-white py-12">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/real-time-therapy" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Real-Time Therapy
            </Link>
            <HomeButton />
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">Find Your Perfect Therapist Match</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Answer a few questions to help us connect you with therapists who match your needs and preferences.
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="bg-[#B87333] h-2 transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Questionnaire */}
      <div className="container px-4 py-12 max-w-4xl mx-auto">
        <Card className="p-8 shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#B87333]/10 p-3 rounded-full">
              <ListChecks className="h-6 w-6 text-[#B87333]" />
            </div>
            <div>
              <h2 className="text-2xl font-medium">Question {currentStep + 1} of {questions.length}</h2>
              <p className="text-muted-foreground">Help us understand your therapy preferences</p>
            </div>
          </div>

          <Separator className="mb-6" />

          <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>

          <div className="space-y-4 mb-8">
            {currentQuestion.type === "radio" ? (
              <RadioGroup 
                value={answers[currentQuestion.id] as string || ""}
                onValueChange={(value) => handleRadioChange(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                    <RadioGroupItem id={option.value} value={option.value} />
                    <Label htmlFor={option.value} className="font-normal cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isChecked = (answers[currentQuestion.id] as string[] || []).includes(option.value);
                  return (
                    <div key={option.value} className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                      <Checkbox 
                        id={option.value} 
                        checked={isChecked}
                        onCheckedChange={() => handleCheckboxChange(currentQuestion.id, option.value)}
                      />
                      <Label htmlFor={option.value} className="font-normal cursor-pointer">{option.label}</Label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevQuestion}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={nextQuestion}
              className="bg-[#B87333] hover:bg-[#B87333]/90"
            >
              {currentStep < questions.length - 1 ? "Next Question" : "Find My Matches"}
            </Button>
          </div>
        </Card>

        <p className="text-center text-muted-foreground mt-8">
          Your answers help us recommend therapists who are best suited to your unique needs.
          All information provided is confidential and used only for matching purposes.
        </p>
      </div>
    </div>
  );
};

export default TherapistQuestionnaire;
