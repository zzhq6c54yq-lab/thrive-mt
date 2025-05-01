
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ClipboardList, ArrowRight, CheckCircle2, Download } from "lucide-react";
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

const EducatorsWorkLifeBalanceAssessment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [balanceLevel, setBalanceLevel] = useState<'poor' | 'needs-improvement' | 'moderate' | 'good' | 'excellent'>('moderate');

  const questions: Question[] = [
    {
      id: 1,
      text: "How often do you work outside of regular school hours?",
      options: [
        { value: 4, label: "Almost every day" },
        { value: 3, label: "3-4 times per week" },
        { value: 2, label: "1-2 times per week" },
        { value: 1, label: "Occasionally" },
        { value: 0, label: "Rarely or never" }
      ]
    },
    {
      id: 2,
      text: "How often do you engage in activities you enjoy outside of work?",
      options: [
        { value: 0, label: "Almost never" },
        { value: 1, label: "Once a month" },
        { value: 2, label: "Once a week" },
        { value: 3, label: "Several times a week" },
        { value: 4, label: "Daily" }
      ]
    },
    {
      id: 3,
      text: "How comfortable are you saying 'no' to additional work responsibilities?",
      options: [
        { value: 4, label: "Very uncomfortable" },
        { value: 3, label: "Somewhat uncomfortable" },
        { value: 2, label: "Neutral" },
        { value: 1, label: "Somewhat comfortable" },
        { value: 0, label: "Very comfortable" }
      ]
    },
    {
      id: 4,
      text: "How often do you check work communications (email, messages) during personal time?",
      options: [
        { value: 4, label: "Constantly throughout personal time" },
        { value: 3, label: "Several times during evenings/weekends" },
        { value: 2, label: "Once or twice during evenings/weekends" },
        { value: 1, label: "Only during designated check-in times" },
        { value: 0, label: "Never during personal time" }
      ]
    },
    {
      id: 5,
      text: "How frequently do you feel guilty when not working on school-related tasks?",
      options: [
        { value: 4, label: "Almost always" },
        { value: 3, label: "Often" },
        { value: 2, label: "Sometimes" },
        { value: 1, label: "Rarely" },
        { value: 0, label: "Never" }
      ]
    },
    {
      id: 6,
      text: "How often do you take breaks during the school day?",
      options: [
        { value: 4, label: "Never" },
        { value: 3, label: "Rarely" },
        { value: 2, label: "Sometimes" },
        { value: 1, label: "Most days" },
        { value: 0, label: "Daily, as needed" }
      ]
    },
    {
      id: 7,
      text: "How often do you feel your personal relationships suffer due to work demands?",
      options: [
        { value: 4, label: "Very frequently" },
        { value: 3, label: "Frequently" },
        { value: 2, label: "Occasionally" },
        { value: 1, label: "Rarely" },
        { value: 0, label: "Never" }
      ]
    },
    {
      id: 8,
      text: "How effective are you at setting boundaries with students and parents?",
      options: [
        { value: 4, label: "Not effective at all" },
        { value: 3, label: "Slightly effective" },
        { value: 2, label: "Moderately effective" },
        { value: 1, label: "Very effective" },
        { value: 0, label: "Extremely effective" }
      ]
    },
    {
      id: 9,
      text: "How often do you engage in self-care practices?",
      options: [
        { value: 4, label: "Almost never" },
        { value: 3, label: "Once a month" },
        { value: 2, label: "Once a week" },
        { value: 1, label: "Several times a week" },
        { value: 0, label: "Daily" }
      ]
    },
    {
      id: 10,
      text: "How satisfied are you with your current work-life balance?",
      options: [
        { value: 4, label: "Very dissatisfied" },
        { value: 3, label: "Somewhat dissatisfied" },
        { value: 2, label: "Neutral" },
        { value: 1, label: "Somewhat satisfied" },
        { value: 0, label: "Very satisfied" }
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
      
      // Determine balance level
      if (totalScore <= 8) {
        setBalanceLevel('excellent');
      } else if (totalScore <= 16) {
        setBalanceLevel('good');
      } else if (totalScore <= 24) {
        setBalanceLevel('moderate');
      } else if (totalScore <= 32) {
        setBalanceLevel('needs-improvement');
      } else {
        setBalanceLevel('poor');
      }
      
      setShowResults(true);
    }
  };

  const getBalanceInfo = () => {
    switch (balanceLevel) {
      case 'excellent':
        return {
          title: "Excellent Work-Life Balance",
          description: "You've developed strong boundaries and self-care practices.",
          recommendations: [
            "Continue your current boundary-setting practices",
            "Consider mentoring other educators on work-life balance",
            "Document your strategies for maintaining balance during challenging periods",
            "Share your effective practices with colleagues struggling with boundaries"
          ],
          color: "green"
        };
      case 'good':
        return {
          title: "Good Work-Life Balance",
          description: "You generally maintain healthy boundaries between work and personal life.",
          recommendations: [
            "Identify areas where boundaries could still be strengthened",
            "Establish regular check-ins with yourself to prevent balance slippage",
            "Create contingency plans for high-stress periods like report cards",
            "Continue and expand your self-care routines"
          ],
          color: "blue"
        };
      case 'moderate':
        return {
          title: "Moderate Work-Life Balance",
          description: "You have some effective boundaries but could benefit from strengthening them.",
          recommendations: [
            "Set clear start/end times for work-related activities",
            "Create a designated workspace that can be physically closed off",
            "Implement a transition ritual between work and personal time",
            "Practice saying 'no' or 'not now' to non-essential requests",
            "Schedule personal activities with the same priority as work tasks"
          ],
          color: "yellow"
        };
      case 'needs-improvement':
        return {
          title: "Work-Life Balance Needs Improvement",
          description: "Work is significantly encroaching on your personal life.",
          recommendations: [
            "Set firm boundaries around communication hours (e.g., no email after 6pm)",
            "Schedule non-negotiable personal time in your calendar",
            "Identify and address sources of work guilt with a therapist or coach",
            "Create scripts for setting boundaries with students, parents, and colleagues",
            "Implement one self-care practice daily, even if brief"
          ],
          color: "orange"
        };
      case 'poor':
        return {
          title: "Poor Work-Life Balance",
          description: "Your work life is significantly impacting your personal wellbeing and relationships.",
          recommendations: [
            "Speak with a mental health professional about boundary challenges",
            "Schedule an immediate personal day for rest and reflection",
            "Identify tasks you can delegate or eliminate entirely",
            "Establish an emergency self-care plan for immediate implementation",
            "Consider a work time audit to identify where boundaries need strengthening",
            "Create an email auto-response setting clear communication expectations"
          ],
          color: "red"
        };
      default:
        return {
          title: "Error",
          description: "Unable to determine balance level.",
          recommendations: [],
          color: "gray"
        };
    }
  };

  const handleBack = () => {
    if (showResults) {
      navigate("/educators-portal", { 
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
        case 'excellent': return 'bg-green-600';
        case 'good': return 'bg-blue-600';
        case 'moderate': return 'bg-yellow-500';
        case 'needs-improvement': return 'bg-orange-500';
        case 'poor': return 'bg-red-600';
        default: return 'bg-purple-600';
      }
    }
    return 'bg-purple-600';
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Work-Life Balance Weekly Planner template has been downloaded.",
      duration: 3000,
    });
  };

  return (
    <Page title="Work-Life Balance Audit">
      <div className="flex justify-start mb-4">
        <PortalBackButton returnPath="/educators-portal" />
      </div>
      
      <div className="max-w-4xl mx-auto">
        {!showResults ? (
          <Card className="bg-[#1e1e2f]/90 border-purple-500/30 shadow-xl">
            <CardHeader className="border-b border-purple-500/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-purple-400" />
                  Work-Life Balance Audit
                </CardTitle>
                <div className="text-sm text-purple-200">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>
              <CardDescription className="text-purple-200">
                Analyze how effectively you're balancing professional obligations with personal well-being
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
              balanceLevel === 'excellent' ? 'bg-green-600' :
              balanceLevel === 'good' ? 'bg-blue-600' :
              balanceLevel === 'moderate' ? 'bg-yellow-500' :
              balanceLevel === 'needs-improvement' ? 'bg-orange-500' :
              'bg-red-600'
            }`}></div>
            <CardHeader className="border-b border-purple-500/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-purple-400" />
                  Results: {balanceInfo.title}
                </CardTitle>
                <div className={`px-2 py-1 rounded-full text-sm ${
                  balanceLevel === 'excellent' ? 'bg-green-600/20 text-green-200' :
                  balanceLevel === 'good' ? 'bg-blue-600/20 text-blue-200' :
                  balanceLevel === 'moderate' ? 'bg-yellow-500/20 text-yellow-200' :
                  balanceLevel === 'needs-improvement' ? 'bg-orange-500/20 text-orange-200' :
                  'bg-red-600/20 text-red-200'
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
                        balanceLevel === 'excellent' ? 'text-green-500' :
                        balanceLevel === 'good' ? 'text-blue-500' :
                        balanceLevel === 'moderate' ? 'text-yellow-500' :
                        balanceLevel === 'needs-improvement' ? 'text-orange-500' :
                        'text-red-500'
                      }`} />
                      <span className="text-purple-100">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30 mt-6">
                <h4 className="font-medium text-white mb-2">Helpful Resources</h4>
                <p className="text-purple-200 mb-4">Download our Work-Life Balance Weekly Planner template to help implement boundaries and self-care practices.</p>
                <Button 
                  variant="outline" 
                  className="border-purple-500/30 text-purple-200 hover:bg-purple-900/30" 
                  onClick={handleDownloadTemplate}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
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
                Get Tailored Resources <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Page>
  );
};

export default EducatorsWorkLifeBalanceAssessment;
