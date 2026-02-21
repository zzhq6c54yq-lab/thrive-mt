
import React, { useState } from "react";
import { ArrowLeft, Brain, Check, ListChecks, User, Clock, HeartHandshake, Globe, FileText } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import HomeButton from "@/components/HomeButton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Define question interfaces for better type safety
interface BaseQuestion {
  id: string;
  question: string;
  type: string;
}

interface OptionsQuestion extends BaseQuestion {
  type: 'radio' | 'checkbox';
  options: Array<{ value: string; label: string }>;
  description?: string;
}

interface TextQuestion extends BaseQuestion {
  type: 'text-area';
  description: string;
  options?: undefined;
}

type Question = OptionsQuestion | TextQuestion;

const questions: Question[] = [
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

// New personal questions
const personalQuestions: Question[] = [
  {
    id: "therapist-qualities",
    question: "What additional qualities would you like in your therapist?",
    description: "Tell us what would make you feel most comfortable with your therapist",
    type: "text-area"
  },
  {
    id: "conversation-style",
    question: "What conversation style do you prefer?",
    options: [
      { value: "listener", label: "Someone who mostly listens to me" },
      { value: "interactive", label: "Someone who engages in back-and-forth dialogue" },
      { value: "directive", label: "Someone who gives clear guidance and advice" },
      { value: "challenging", label: "Someone who challenges my thinking" }
    ],
    type: "radio"
  },
  {
    id: "comfort-topics",
    question: "What topics do you feel most comfortable discussing?",
    description: "This helps us understand your communication preferences",
    type: "text-area"
  },
  {
    id: "difficult-topics",
    question: "What topics do you find difficult to discuss?",
    description: "This helps your therapist approach sensitive topics appropriately",
    type: "text-area"
  }
];

interface AnswerState {
  [key: string]: string | string[];
}

const TherapistQuestionnaire = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [currentQuestionSet, setCurrentQuestionSet] = useState<'general' | 'personal'>('general');
  const [personalAnswers, setPersonalAnswers] = useState<AnswerState>({});
  
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
    if (currentQuestionSet === 'general') {
      setAnswers({
        ...answers,
        [questionId]: value
      });
    } else {
      setPersonalAnswers({
        ...personalAnswers,
        [questionId]: value
      });
    }
  };
  
  const handleTextChange = (questionId: string, value: string) => {
    setPersonalAnswers({
      ...personalAnswers,
      [questionId]: value
    });
  };
  
  const currentQuestion = currentQuestionSet === 'general' 
    ? questions[currentStep]
    : personalQuestions[currentStep];
  
  const nextQuestion = () => {
    // Validate that at least one option is selected for non-text questions
    const currentResponse = currentQuestionSet === 'general' 
      ? answers[currentQuestion.id]
      : personalAnswers[currentQuestion.id];
      
    if (currentQuestion.type !== 'text-area' && (!currentResponse || (Array.isArray(currentResponse) && currentResponse.length === 0))) {
      toast({
        title: "Please select at least one option",
        description: "We need this information to find the right match for you.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentQuestionSet === 'general') {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Show "What I Want in a Therapist" screen
        toast({
          title: "Great progress!",
          description: "Now let's get a bit more personal to find your perfect match."
        });
        setCurrentQuestionSet('personal');
        setCurrentStep(0);
      }
    } else {
      // Personal questions
      if (currentStep < personalQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // All questions answered, simulate matching process
        findMatch();
      }
    }
  };
  
  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentQuestionSet === 'personal') {
      // Go back to general questions if at first personal question
      setCurrentQuestionSet('general');
      setCurrentStep(questions.length - 1);
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
      navigate("/app/therapist-matches", { 
        state: { 
          answers,
          personalAnswers,
          fromMilitary: location.state?.fromMilitary,
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
            },
            {
              id: 4,
              name: "Dr. James Wilson",
              specialty: "Military Trauma, PTSD, Readjustment",
              approach: "Trauma-informed, EMDR, CBT",
              bio: "As a veteran himself, Dr. Wilson understands the unique challenges of military service. He specializes in treating combat-related PTSD and helping veterans transition to civilian life.",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            },
            {
              id: 5,
              name: "Dr. Lisa Chen",
              specialty: "Anxiety, Depression, Cultural Identity",
              approach: "Culturally-responsive, Mindfulness, CBT",
              bio: "Dr. Chen integrates Eastern and Western approaches to mental health. Her practice focuses on cultural identity, intergenerational trauma, and anxiety management through mindfulness.",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            }
          ]
        }
      });
    }, 2000);
  };
  
  const progress = currentQuestionSet === 'general'
    ? ((currentStep + 1) / questions.length) * 50 // First half progress
    : 50 + ((currentStep + 1) / personalQuestions.length) * 50; // Second half progress
  
  const renderQuestionContent = () => {
    if (currentQuestionSet === 'personal' && currentQuestion.type === 'text-area') {
      return (
        <div className="space-y-4 mb-8">
          <Textarea
            id={currentQuestion.id}
            value={personalAnswers[currentQuestion.id] as string || ''}
            onChange={(e) => handleTextChange(currentQuestion.id, e.target.value)}
            placeholder="Share your thoughts here..."
            className="min-h-[120px]"
          />
        </div>
      );
    } else if (currentQuestion.type === 'radio') {
      return (
        <RadioGroup 
          value={currentQuestionSet === 'general' 
            ? (answers[currentQuestion.id] as string || "")
            : (personalAnswers[currentQuestion.id] as string || "")
          }
          onValueChange={(value) => handleRadioChange(currentQuestion.id, value)}
          className="space-y-3"
        >
          {currentQuestion.options?.map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
              <RadioGroupItem id={option.value} value={option.value} />
              <Label htmlFor={option.value} className="font-normal cursor-pointer">{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    } else {
      return (
        <div className="space-y-3">
          {currentQuestion.options?.map((option) => {
            const isChecked = ((answers[currentQuestion.id] || []) as string[]).includes(option.value);
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
      );
    }
  };

  const getQuestionIcon = () => {
    if (currentQuestionSet === 'personal') {
      const icons = [HeartHandshake, User, Globe, FileText];
      return icons[currentStep] || ListChecks;
    }
    return ListChecks;
  };
  
  const QuestionIcon = getQuestionIcon();
  
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
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            {currentQuestionSet === 'general' 
              ? "Find Your Perfect Therapist Match" 
              : "What I Want in a Therapist"
            }
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            {currentQuestionSet === 'general'
              ? "Answer a few questions to help us connect you with therapists who match your needs and preferences."
              : "Tell us more about your personal preferences to find a therapist you'll connect with."
            }
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
              <QuestionIcon className="h-6 w-6 text-[#B87333]" />
            </div>
            <div>
              <h2 className="text-2xl font-medium">
                {currentQuestionSet === 'general'
                  ? `Question ${currentStep + 1} of ${questions.length}`
                  : `Personal Preference ${currentStep + 1} of ${personalQuestions.length}`
                }
              </h2>
              <p className="text-muted-foreground">
                {currentQuestionSet === 'general'
                  ? "Help us understand your therapy preferences"
                  : "Help us find someone you'll feel comfortable with"
                }
              </p>
            </div>
          </div>

          <Separator className="mb-6" />

          <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>
          {currentQuestion.description && (
            <p className="text-muted-foreground mb-4">{currentQuestion.description}</p>
          )}

          <div className="space-y-4 mb-8">
            {renderQuestionContent()}
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevQuestion}
              disabled={currentStep === 0 && currentQuestionSet === 'general'}
            >
              Previous
            </Button>
            <Button 
              onClick={nextQuestion}
              className="bg-[#B87333] hover:bg-[#B87333]/90"
            >
              {(currentQuestionSet === 'general' && currentStep < questions.length - 1) || 
               (currentQuestionSet === 'personal' && currentStep < personalQuestions.length - 1) 
                ? "Next Question" 
                : currentQuestionSet === 'general' 
                  ? "Continue to Personal Preferences"
                  : "Find My Matches"
              }
            </Button>
          </div>
        </Card>

        <p className="text-center text-muted-foreground mt-8">
          {currentQuestionSet === 'general' 
            ? "Your answers help us recommend therapists who are best suited to your unique needs."
            : "These additional details help us ensure you're matched with someone you'll feel comfortable with."
          }
        </p>
      </div>
    </div>
  );
};

export default TherapistQuestionnaire;
