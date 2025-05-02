
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import PortalBackButton from "@/components/navigation/PortalBackButton";

type Question = {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
};

const HospitalityBurnoutAssessment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [burnoutLevel, setBurnoutLevel] = useState<'minimal' | 'mild' | 'moderate' | 'severe'>('minimal');

  const questions: Question[] = [
    {
      id: 1,
      text: "How often do you feel emotionally drained from your work?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 2,
      text: "How often do you feel used up at the end of your shift?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 3,
      text: "How often do you feel fatigued when you get up in the morning and have to face another day of work?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 4,
      text: "How often do you feel you've become more callous toward guests or customers?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 5,
      text: "How often do you feel burnt out from your work?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 6,
      text: "How often do you feel frustrated by your job?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 7,
      text: "How often do you find yourself just going through the motions at work?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 8,
      text: "How often do you feel physically exhausted after work?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 9,
      text: "How often do you have difficulty finding enjoyment in activities outside of work?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 10,
      text: "How often do you feel your job doesn't make a positive difference?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 11,
      text: "How often do you feel unable to meet the demands of your job?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    },
    {
      id: 12,
      text: "How often do you feel unsupported at work?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year" },
        { value: 2, label: "Once a month" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Daily" }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: value };
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate results
      const totalScore = Object.values(newAnswers).reduce((sum, val) => sum + val, 0);
      setScore(totalScore);
      
      // Determine burnout level
      const maxPossibleScore = questions.length * 6;
      const percentage = (totalScore / maxPossibleScore) * 100;
      
      if (percentage <= 25) {
        setBurnoutLevel('minimal');
      } else if (percentage <= 50) {
        setBurnoutLevel('mild');
      } else if (percentage <= 75) {
        setBurnoutLevel('moderate');
      } else {
        setBurnoutLevel('severe');
      }
      
      setShowResults(true);
    }
  };

  const getBurnoutInfo = () => {
    switch (burnoutLevel) {
      case 'minimal':
        return {
          title: "Minimal Burnout Risk",
          description: "You show few signs of hospitality-related burnout.",
          recommendations: [
            "Maintain your current self-care practices",
            "Continue to set healthy boundaries at work",
            "Share your successful strategies with colleagues who may be struggling",
            "Focus on preventive measures to maintain your resilience"
          ],
          color: "green"
        };
      case 'mild':
        return {
          title: "Mild Burnout Risk",
          description: "You're showing some early warning signs of burnout that should be addressed.",
          recommendations: [
            "Review your work schedule and seek more balance where possible",
            "Establish clearer boundaries between work and personal time",
            "Identify specific workplace stressors and develop targeted strategies",
            "Prioritize quality sleep and physical activity",
            "Consider speaking with a supervisor about workload concerns"
          ],
          color: "yellow"
        };
      case 'moderate':
        return {
          title: "Moderate Burnout Risk",
          description: "You're experiencing significant burnout symptoms that require attention.",
          recommendations: [
            "Speak with management about adjusting responsibilities or schedules",
            "Seek professional support through counseling or therapy",
            "Implement daily stress reduction practices",
            "Consider taking time off to recover if possible",
            "Connect with peers who understand the industry challenges",
            "Review whether your current position aligns with your values and needs"
          ],
          color: "orange"
        };
      case 'severe':
        return {
          title: "Severe Burnout Risk",
          description: "You're experiencing serious burnout that requires immediate intervention.",
          recommendations: [
            "Prioritize your health and wellbeing above work demands",
            "Seek professional mental health support as soon as possible",
            "Consider a temporary reduction in hours or short leave if possible",
            "Evaluate whether your current position is sustainable long-term",
            "Focus on physical recovery through rest, nutrition, and movement",
            "Create a detailed self-care plan with daily supportive practices",
            "Connect with support networks outside of work"
          ],
          color: "red"
        };
      default:
        return {
          title: "Error",
          description: "Unable to determine burnout level.",
          recommendations: [],
          color: "gray"
        };
    }
  };

  const handleBack = () => {
    if (showResults) {
      navigate("/hospitality-portal", { 
        state: { 
          tab: "assessments",
          stayInPortal: true,
          preventTutorial: true
        }
      });
    }
  };

  const burnoutInfo = getBurnoutInfo();

  const getProgressColor = () => {
    if (showResults) {
      switch (burnoutLevel) {
        case 'minimal': return 'bg-green-600';
        case 'mild': return 'bg-yellow-500';
        case 'moderate': return 'bg-orange-500';
        case 'severe': return 'bg-red-600';
        default: return 'bg-purple-600';
      }
    }
    return 'bg-red-600';
  };

  return (
    <Page title="Hospitality Burnout Assessment">
      <div className="flex justify-start mb-4">
        <PortalBackButton returnPath="/hospitality-portal" />
      </div>
      
      <div className="max-w-4xl mx-auto">
        {!showResults ? (
          <Card className="bg-[#1e1e2f]/90 border-red-500/30 shadow-xl">
            <CardHeader className="border-b border-red-500/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-400" />
                  Hospitality Burnout Assessment
                </CardTitle>
                <div className="text-sm text-red-200">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>
              <CardDescription className="text-red-200">
                Evaluate burnout factors specific to restaurant and hospitality work
              </CardDescription>
              <Progress 
                value={((currentQuestionIndex) / questions.length) * 100} 
                className={`h-2 mt-2 ${getProgressColor()}`}
              />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="text-xl font-medium text-white mb-2">
                  {questions[currentQuestionIndex].text}
                </h3>
              </div>
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4 border-red-500/30 hover:bg-red-900/30 hover:text-red-200 text-white"
                    onClick={() => handleAnswer(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-[#1e1e2f]/90 border-red-500/30 shadow-xl overflow-hidden">
            <div className={`h-2 w-full ${
              burnoutLevel === 'minimal' ? 'bg-green-600' :
              burnoutLevel === 'mild' ? 'bg-yellow-500' :
              burnoutLevel === 'moderate' ? 'bg-orange-500' :
              'bg-red-600'
            }`}></div>
            <CardHeader className="border-b border-red-500/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-400" />
                  Results: {burnoutInfo.title}
                </CardTitle>
                <div className={`px-2 py-1 rounded-full text-sm ${
                  burnoutLevel === 'minimal' ? 'bg-green-600/20 text-green-200' :
                  burnoutLevel === 'mild' ? 'bg-yellow-500/20 text-yellow-200' :
                  burnoutLevel === 'moderate' ? 'bg-orange-500/20 text-orange-200' :
                  'bg-red-600/20 text-red-200'
                }`}>
                  {burnoutInfo.title}
                </div>
              </div>
              <CardDescription className="text-red-200">
                {burnoutInfo.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Recommended Actions
                </h3>
                <ul className="space-y-3">
                  {burnoutInfo.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className={`h-5 w-5 mr-2 mt-0.5 ${
                        burnoutLevel === 'minimal' ? 'text-green-500' :
                        burnoutLevel === 'mild' ? 'text-yellow-500' :
                        burnoutLevel === 'moderate' ? 'text-orange-500' :
                        'text-red-500'
                      }`} />
                      <span className="text-red-100">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-red-500/20 pt-4">
              <Button
                variant="outline"
                className="border-red-500/30 text-red-200 hover:bg-red-900/30"
                onClick={handleBack}
              >
                Return to Assessments
              </Button>
              <Button 
                className="bg-red-700 hover:bg-red-800 text-white"
                onClick={() => {
                  toast({
                    title: "Resources Provided",
                    description: "Burnout recovery resources have been added to your library",
                    duration: 3000,
                  });
                }}
              >
                Get Recovery Plan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Page>
  );
};

export default HospitalityBurnoutAssessment;
