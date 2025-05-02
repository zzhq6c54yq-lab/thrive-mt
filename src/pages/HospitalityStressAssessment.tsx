
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
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

const HospitalityStressAssessment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [stressLevel, setStressLevel] = useState<'low' | 'moderate' | 'high' | 'severe'>('low');

  const questions: Question[] = [
    {
      id: 1,
      text: "How often do you feel overwhelmed by the pace of service during busy periods?",
      options: [
        { value: 0, label: "Rarely or never" },
        { value: 1, label: "Once a month or less" },
        { value: 2, label: "A few times a month" },
        { value: 3, label: "Once a week" },
        { value: 4, label: "Several times a week" },
        { value: 5, label: "Daily" }
      ]
    },
    {
      id: 2,
      text: "How well do you feel you can manage difficult customer interactions?",
      options: [
        { value: 0, label: "Very effectively" },
        { value: 1, label: "Effectively" },
        { value: 2, label: "Somewhat effectively" },
        { value: 3, label: "Somewhat ineffectively" },
        { value: 4, label: "Ineffectively" },
        { value: 5, label: "Very ineffectively" }
      ]
    },
    {
      id: 3,
      text: "How often do you find yourself thinking about work issues during your personal time?",
      options: [
        { value: 0, label: "Rarely or never" },
        { value: 1, label: "Once a month or less" },
        { value: 2, label: "A few times a month" },
        { value: 3, label: "Once a week" },
        { value: 4, label: "Several times a week" },
        { value: 5, label: "Daily" }
      ]
    },
    {
      id: 4,
      text: "How comfortable do you feel asking for help when overwhelmed during a shift?",
      options: [
        { value: 0, label: "Very comfortable" },
        { value: 1, label: "Comfortable" },
        { value: 2, label: "Somewhat comfortable" },
        { value: 3, label: "Somewhat uncomfortable" },
        { value: 4, label: "Uncomfortable" },
        { value: 5, label: "Very uncomfortable" }
      ]
    },
    {
      id: 5,
      text: "How often do you feel physically tense or anxious during your shifts?",
      options: [
        { value: 0, label: "Rarely or never" },
        { value: 1, label: "Once a month or less" },
        { value: 2, label: "A few times a month" },
        { value: 3, label: "Once a week" },
        { value: 4, label: "Several times a week" },
        { value: 5, label: "Daily" }
      ]
    },
    {
      id: 6,
      text: "How much do workplace relationships contribute to your stress levels?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Very little" },
        { value: 2, label: "Somewhat" },
        { value: 3, label: "Moderately" },
        { value: 4, label: "Significantly" },
        { value: 5, label: "Extremely" }
      ]
    },
    {
      id: 7,
      text: "How often do you feel your work schedule negatively impacts your personal life?",
      options: [
        { value: 0, label: "Rarely or never" },
        { value: 1, label: "Once a month or less" },
        { value: 2, label: "A few times a month" },
        { value: 3, label: "Once a week" },
        { value: 4, label: "Several times a week" },
        { value: 5, label: "Daily" }
      ]
    },
    {
      id: 8,
      text: "How effectively do you feel you can recover between shifts?",
      options: [
        { value: 0, label: "Very effectively" },
        { value: 1, label: "Effectively" },
        { value: 2, label: "Somewhat effectively" },
        { value: 3, label: "Somewhat ineffectively" },
        { value: 4, label: "Ineffectively" },
        { value: 5, label: "Very ineffectively" }
      ]
    },
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
      
      // Determine stress level
      const maxPossibleScore = questions.length * 5;
      const percentage = (totalScore / maxPossibleScore) * 100;
      
      if (percentage <= 25) {
        setStressLevel('low');
      } else if (percentage <= 50) {
        setStressLevel('moderate');
      } else if (percentage <= 75) {
        setStressLevel('high');
      } else {
        setStressLevel('severe');
      }
      
      setShowResults(true);
    }
  };

  const getStressInfo = () => {
    switch (stressLevel) {
      case 'low':
        return {
          title: "Low Service Stress",
          description: "You appear to be managing the stresses of restaurant work effectively.",
          recommendations: [
            "Continue your current stress management techniques",
            "Consider mentoring colleagues who may be struggling",
            "Maintain your work-life boundaries",
            "Practice preventive self-care to maintain your resilience"
          ],
          color: "green"
        };
      case 'moderate':
        return {
          title: "Moderate Service Stress",
          description: "You're experiencing some challenges with workplace stress that may be affecting your wellbeing.",
          recommendations: [
            "Implement a pre-shift mental preparation routine",
            "Practice quick breathing techniques during busy periods",
            "Establish clearer boundaries between work and personal time",
            "Develop a post-shift decompression practice"
          ],
          color: "yellow"
        };
      case 'high':
        return {
          title: "High Service Stress",
          description: "Work-related stress is significantly impacting your wellbeing.",
          recommendations: [
            "Schedule a meeting with management about workload or schedule concerns",
            "Establish a strict post-work transition ritual to leave work behind",
            "Consider professional support through counseling",
            "Prioritize physical exercise and adequate sleep",
            "Set clearer boundaries with difficult customers or colleagues"
          ],
          color: "orange"
        };
      case 'severe':
        return {
          title: "Severe Service Stress",
          description: "You are experiencing a concerning level of work-related stress that requires immediate attention.",
          recommendations: [
            "Consider speaking with a mental health professional",
            "Discuss workload adjustments with your supervisor",
            "Implement daily stress reduction practices",
            "Evaluate whether your current position is sustainable",
            "Prioritize your wellbeing above work demands",
            "Consider temporary schedule changes to allow for recovery"
          ],
          color: "red"
        };
      default:
        return {
          title: "Error",
          description: "Unable to determine stress level.",
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

  const stressInfo = getStressInfo();

  const getProgressColor = () => {
    if (showResults) {
      switch (stressLevel) {
        case 'low': return 'bg-green-600';
        case 'moderate': return 'bg-yellow-500';
        case 'high': return 'bg-orange-500';
        case 'severe': return 'bg-red-600';
        default: return 'bg-purple-600';
      }
    }
    return 'bg-purple-600';
  };

  return (
    <Page title="Hospitality Stress Assessment">
      <div className="flex justify-start mb-4">
        <PortalBackButton returnPath="/hospitality-portal" />
      </div>
      
      <div className="max-w-4xl mx-auto">
        {!showResults ? (
          <Card className="bg-[#1e1e2f]/90 border-purple-500/30 shadow-xl">
            <CardHeader className="border-b border-purple-500/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-purple-400" />
                  Service Industry Stress Assessment
                </CardTitle>
                <div className="text-sm text-purple-200">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>
              <CardDescription className="text-purple-200">
                Evaluate stress factors specific to restaurant and hospitality work
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
                    className="w-full justify-start text-left h-auto py-3 px-4 border-purple-500/30 hover:bg-purple-900/30 hover:text-purple-200 text-white"
                    onClick={() => handleAnswer(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-[#1e1e2f]/90 border-purple-500/30 shadow-xl overflow-hidden">
            <div className={`h-2 w-full ${
              stressLevel === 'low' ? 'bg-green-600' :
              stressLevel === 'moderate' ? 'bg-yellow-500' :
              stressLevel === 'high' ? 'bg-orange-500' :
              'bg-red-600'
            }`}></div>
            <CardHeader className="border-b border-purple-500/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-purple-400" />
                  Results: {stressInfo.title}
                </CardTitle>
                <div className={`px-2 py-1 rounded-full text-sm ${
                  stressLevel === 'low' ? 'bg-green-600/20 text-green-200' :
                  stressLevel === 'moderate' ? 'bg-yellow-500/20 text-yellow-200' :
                  stressLevel === 'high' ? 'bg-orange-500/20 text-orange-200' :
                  'bg-red-600/20 text-red-200'
                }`}>
                  {stressInfo.title}
                </div>
              </div>
              <CardDescription className="text-purple-200">
                {stressInfo.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Recommended Strategies
                </h3>
                <ul className="space-y-3">
                  {stressInfo.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className={`h-5 w-5 mr-2 mt-0.5 ${
                        stressLevel === 'low' ? 'text-green-500' :
                        stressLevel === 'moderate' ? 'text-yellow-500' :
                        stressLevel === 'high' ? 'text-orange-500' :
                        'text-red-500'
                      }`} />
                      <span className="text-purple-100">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-purple-500/20 pt-4">
              <Button
                variant="outline"
                className="border-purple-500/30 text-purple-200 hover:bg-purple-900/30"
                onClick={handleBack}
              >
                Return to Assessments
              </Button>
              <Button 
                className="bg-purple-700 hover:bg-purple-800 text-white"
                onClick={() => {
                  toast({
                    title: "Resources Provided",
                    description: "Hospitality stress management resources have been added to your library",
                    duration: 3000,
                  });
                }}
              >
                Get Tailored Resources <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Page>
  );
};

export default HospitalityStressAssessment;
