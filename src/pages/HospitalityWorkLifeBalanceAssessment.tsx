
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { HeartHandshake, ArrowRight, CheckCircle2, Download } from "lucide-react";
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

const HospitalityWorkLifeBalanceAssessment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [balanceScore, setBalanceScore] = useState(0);
  const [balanceLevel, setBalanceLevel] = useState<'poor' | 'fair' | 'good' | 'excellent'>('fair');

  const questions: Question[] = [
    {
      id: 1,
      text: "How satisfied are you with your ability to maintain personal relationships while working in hospitality?",
      options: [
        { value: 0, label: "Very dissatisfied" },
        { value: 1, label: "Dissatisfied" },
        { value: 2, label: "Somewhat dissatisfied" },
        { value: 3, label: "Neutral" },
        { value: 4, label: "Somewhat satisfied" },
        { value: 5, label: "Satisfied" },
        { value: 6, label: "Very satisfied" }
      ]
    },
    {
      id: 2,
      text: "How often do your irregular work hours negatively impact your personal life?",
      options: [
        { value: 6, label: "Never" },
        { value: 5, label: "Rarely" },
        { value: 4, label: "Occasionally" },
        { value: 3, label: "Sometimes" },
        { value: 2, label: "Frequently" },
        { value: 1, label: "Usually" },
        { value: 0, label: "Always" }
      ]
    },
    {
      id: 3,
      text: "How often do you miss important personal or family events because of work?",
      options: [
        { value: 6, label: "Never" },
        { value: 5, label: "Rarely" },
        { value: 4, label: "Occasionally" },
        { value: 3, label: "Sometimes" },
        { value: 2, label: "Frequently" },
        { value: 1, label: "Usually" },
        { value: 0, label: "Always" }
      ]
    },
    {
      id: 4,
      text: "How effectively can you maintain consistent self-care routines with your current schedule?",
      options: [
        { value: 0, label: "Not at all effectively" },
        { value: 1, label: "Very ineffectively" },
        { value: 2, label: "Somewhat ineffectively" },
        { value: 3, label: "Neutral" },
        { value: 4, label: "Somewhat effectively" },
        { value: 5, label: "Effectively" },
        { value: 6, label: "Very effectively" }
      ]
    },
    {
      id: 5,
      text: "How satisfied are you with the quality of your sleep given your work schedule?",
      options: [
        { value: 0, label: "Very dissatisfied" },
        { value: 1, label: "Dissatisfied" },
        { value: 2, label: "Somewhat dissatisfied" },
        { value: 3, label: "Neutral" },
        { value: 4, label: "Somewhat satisfied" },
        { value: 5, label: "Satisfied" },
        { value: 6, label: "Very satisfied" }
      ]
    },
    {
      id: 6,
      text: "How often do you have enough energy for leisure activities after work?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "Rarely" },
        { value: 2, label: "Occasionally" },
        { value: 3, label: "Sometimes" },
        { value: 4, label: "Frequently" },
        { value: 5, label: "Usually" },
        { value: 6, label: "Always" }
      ]
    },
    {
      id: 7,
      text: "How difficult is it to coordinate your social life with friends who work different schedules?",
      options: [
        { value: 0, label: "Extremely difficult" },
        { value: 1, label: "Very difficult" },
        { value: 2, label: "Difficult" },
        { value: 3, label: "Somewhat difficult" },
        { value: 4, label: "Slightly difficult" },
        { value: 5, label: "Not very difficult" },
        { value: 6, label: "Not at all difficult" }
      ]
    },
    {
      id: 8,
      text: "How often are you able to disconnect from work concerns during your time off?",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "Rarely" },
        { value: 2, label: "Occasionally" },
        { value: 3, label: "Sometimes" },
        { value: 4, label: "Frequently" },
        { value: 5, label: "Usually" },
        { value: 6, label: "Always" }
      ]
    },
    {
      id: 9,
      text: "How often do you feel you have to sacrifice personal priorities for work?",
      options: [
        { value: 6, label: "Never" },
        { value: 5, label: "Rarely" },
        { value: 4, label: "Occasionally" },
        { value: 3, label: "Sometimes" },
        { value: 2, label: "Frequently" },
        { value: 1, label: "Usually" },
        { value: 0, label: "Always" }
      ]
    },
    {
      id: 10,
      text: "How satisfied are you with your ability to maintain consistent meal times and healthy eating habits?",
      options: [
        { value: 0, label: "Very dissatisfied" },
        { value: 1, label: "Dissatisfied" },
        { value: 2, label: "Somewhat dissatisfied" },
        { value: 3, label: "Neutral" },
        { value: 4, label: "Somewhat satisfied" },
        { value: 5, label: "Satisfied" },
        { value: 6, label: "Very satisfied" }
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
      setBalanceScore(totalScore);
      
      // Determine work-life balance level
      const maxPossibleScore = questions.length * 6;
      const percentage = (totalScore / maxPossibleScore) * 100;
      
      if (percentage <= 25) {
        setBalanceLevel('poor');
      } else if (percentage <= 50) {
        setBalanceLevel('fair');
      } else if (percentage <= 75) {
        setBalanceLevel('good');
      } else {
        setBalanceLevel('excellent');
      }
      
      setShowResults(true);
    }
  };

  const getBalanceInfo = () => {
    switch (balanceLevel) {
      case 'poor':
        return {
          title: "Poor Work-Life Balance",
          description: "Your job is significantly impacting your ability to maintain a satisfying personal life.",
          recommendations: [
            "Speak with management about schedule adjustments",
            "Set firm boundaries about when you can be contacted outside work",
            "Prioritize at least one self-care activity daily, even if brief",
            "Consider whether your current position is sustainable long-term",
            "Connect with a counselor who specializes in work-life issues",
            "Identify one personal priority each week that cannot be sacrificed",
            "Look into job options with more predictable scheduling"
          ],
          color: "red"
        };
      case 'fair':
        return {
          title: "Fair Work-Life Balance",
          description: "You're managing to maintain some balance, but your work still significantly impacts your personal life.",
          recommendations: [
            "Request specific days off in advance for important personal events",
            "Develop transition rituals between work and personal time",
            "Create a weekly self-care schedule that works around shifts",
            "Use technology to stay connected with loved ones during busy periods",
            "Practice saying no to extra shifts when needed for personal wellbeing",
            "Consider shift swaps with colleagues to create occasional blocks of free time"
          ],
          color: "orange"
        };
      case 'good':
        return {
          title: "Good Work-Life Balance",
          description: "You've developed effective strategies for balancing work with personal priorities.",
          recommendations: [
            "Continue setting clear boundaries between work and personal time",
            "Share your effective strategies with struggling colleagues",
            "Consider cross-training for more schedule flexibility",
            "Build supportive relationships with colleagues for mutual coverage",
            "Fine-tune your schedule to maximize quality personal time"
          ],
          color: "green"
        };
      case 'excellent':
        return {
          title: "Excellent Work-Life Balance",
          description: "You've mastered maintaining personal priorities while working in hospitality.",
          recommendations: [
            "Mentor others in achieving work-life balance in the industry",
            "Share your approach with management as a model",
            "Continue reinforcing boundaries that work well for you",
            "Regularly reassess as life circumstances change",
            "Consider leadership roles where you can influence workplace culture positively"
          ],
          color: "blue"
        };
      default:
        return {
          title: "Error",
          description: "Unable to determine work-life balance level.",
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

  const balanceInfo = getBalanceInfo();

  const getProgressColor = () => {
    if (showResults) {
      switch (balanceLevel) {
        case 'poor': return 'bg-red-600';
        case 'fair': return 'bg-orange-500';
        case 'good': return 'bg-green-600';
        case 'excellent': return 'bg-blue-600';
        default: return 'bg-purple-600';
      }
    }
    return 'bg-purple-600';
  };

  return (
    <Page title="Work-Life Balance Assessment">
      <div className="flex justify-start mb-4">
        <PortalBackButton returnPath="/hospitality-portal" />
      </div>
      
      <div className="max-w-4xl mx-auto">
        {!showResults ? (
          <Card className="bg-[#1e1e2f]/90 border-purple-500/30 shadow-xl">
            <CardHeader className="border-b border-purple-500/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-purple-400" />
                  Work-Life Balance Assessment
                </CardTitle>
                <div className="text-sm text-purple-200">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>
              <CardDescription className="text-purple-200">
                Evaluate how effectively you balance work and personal life in hospitality
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
              balanceLevel === 'poor' ? 'bg-red-600' :
              balanceLevel === 'fair' ? 'bg-orange-500' :
              balanceLevel === 'good' ? 'bg-green-600' :
              'bg-blue-600'
            }`}></div>
            <CardHeader className="border-b border-purple-500/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-purple-400" />
                  Results: {balanceInfo.title}
                </CardTitle>
                <div className={`px-2 py-1 rounded-full text-sm ${
                  balanceLevel === 'poor' ? 'bg-red-600/20 text-red-200' :
                  balanceLevel === 'fair' ? 'bg-orange-500/20 text-orange-200' :
                  balanceLevel === 'good' ? 'bg-green-600/20 text-green-200' :
                  'bg-blue-600/20 text-blue-200'
                }`}>
                  {balanceInfo.title}
                </div>
              </div>
              <CardDescription className="text-purple-200">
                {balanceInfo.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Recommended Strategies
                </h3>
                <ul className="space-y-3">
                  {balanceInfo.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className={`h-5 w-5 mr-2 mt-0.5 ${
                        balanceLevel === 'poor' ? 'text-red-500' :
                        balanceLevel === 'fair' ? 'text-orange-500' :
                        balanceLevel === 'good' ? 'text-green-500' :
                        'text-blue-500'
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
                    description: "Work-life balance resources have been added to your library",
                    duration: 3000,
                  });
                }}
              >
                <Download className="mr-2 h-4 w-4" /> Get Personal Plan
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Page>
  );
};

export default HospitalityWorkLifeBalanceAssessment;
