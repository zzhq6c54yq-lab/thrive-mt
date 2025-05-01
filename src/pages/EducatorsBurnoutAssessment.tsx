
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Brain, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

type Question = {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
};

const EducatorsBurnoutAssessment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [burnoutLevel, setBurnoutLevel] = useState<'low' | 'moderate' | 'high' | 'severe'>('low');

  const questions: Question[] = [
    {
      id: 1,
      text: "How often do you feel emotionally drained from your work as an educator?",
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
      text: "How often do you feel that you've accomplished something worthwhile in your teaching?",
      options: [
        { value: 5, label: "Daily" },
        { value: 4, label: "Several times a week" },
        { value: 3, label: "Once a week" },
        { value: 2, label: "A few times a month" },
        { value: 1, label: "Once a month or less" },
        { value: 0, label: "Rarely or never" }
      ]
    },
    {
      id: 3,
      text: "I find it difficult to establish boundaries between my work and personal life.",
      options: [
        { value: 0, label: "Strongly disagree" },
        { value: 1, label: "Disagree" },
        { value: 2, label: "Somewhat disagree" },
        { value: 3, label: "Somewhat agree" },
        { value: 4, label: "Agree" },
        { value: 5, label: "Strongly agree" }
      ]
    },
    {
      id: 4,
      text: "How often do you feel you cannot meet all the demands placed on you?",
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
      id: 5,
      text: "I feel supported by my school administration when dealing with difficult situations.",
      options: [
        { value: 5, label: "Strongly agree" },
        { value: 4, label: "Agree" },
        { value: 3, label: "Somewhat agree" },
        { value: 2, label: "Somewhat disagree" },
        { value: 1, label: "Disagree" },
        { value: 0, label: "Strongly disagree" }
      ]
    },
    {
      id: 6,
      text: "I have trouble sleeping because I'm thinking about work-related issues.",
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
      id: 7,
      text: "I have energy and enthusiasm to invest in my students.",
      options: [
        { value: 5, label: "Daily" },
        { value: 4, label: "Several times a week" },
        { value: 3, label: "Once a week" },
        { value: 2, label: "A few times a month" },
        { value: 1, label: "Once a month or less" },
        { value: 0, label: "Rarely or never" }
      ]
    },
    {
      id: 8,
      text: "How often do you feel that you've become more callous or indifferent toward people since taking this job?",
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
      id: 9,
      text: "I engage in self-care activities to maintain my wellbeing as an educator.",
      options: [
        { value: 5, label: "Daily" },
        { value: 4, label: "Several times a week" },
        { value: 3, label: "Once a week" },
        { value: 2, label: "A few times a month" },
        { value: 1, label: "Once a month or less" },
        { value: 0, label: "Rarely or never" }
      ]
    },
    {
      id: 10,
      text: "How often do you feel overwhelmed by the emotional demands of teaching?",
      options: [
        { value: 0, label: "Rarely or never" },
        { value: 1, label: "Once a month or less" },
        { value: 2, label: "A few times a month" },
        { value: 3, label: "Once a week" },
        { value: 4, label: "Several times a week" },
        { value: 5, label: "Daily" }
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
      if (totalScore <= 12) {
        setBurnoutLevel('low');
      } else if (totalScore <= 25) {
        setBurnoutLevel('moderate');
      } else if (totalScore <= 37) {
        setBurnoutLevel('high');
      } else {
        setBurnoutLevel('severe');
      }
      
      setShowResults(true);
    }
  };

  const getBurnoutInfo = () => {
    switch (burnoutLevel) {
      case 'low':
        return {
          title: "Low Burnout Risk",
          description: "You're managing the stresses of education well.",
          recommendations: [
            "Continue your current self-care practices",
            "Maintain boundaries between work and personal life",
            "Regularly reflect on what's working well for you",
            "Consider mentoring other educators on stress management"
          ],
          color: "green"
        };
      case 'moderate':
        return {
          title: "Moderate Burnout Risk",
          description: "You're experiencing some signs of stress that could develop into burnout.",
          recommendations: [
            "Schedule regular breaks during your workday",
            "Implement a wind-down routine after school",
            "Set clearer boundaries with work communications",
            "Consider joining a peer support group for educators"
          ],
          color: "yellow"
        };
      case 'high':
        return {
          title: "High Burnout Risk",
          description: "You're showing significant signs of burnout that need attention.",
          recommendations: [
            "Speak with a mental health professional",
            "Reassess your work-life balance immediately",
            "Delegate or reduce non-essential responsibilities",
            "Take time off if possible to recover",
            "Practice daily mindfulness or relaxation techniques"
          ],
          color: "orange"
        };
      case 'severe':
        return {
          title: "Severe Burnout Risk",
          description: "You're experiencing serious burnout symptoms that require immediate attention.",
          recommendations: [
            "Seek professional help as soon as possible",
            "Talk to your administration about reducing your workload",
            "Consider a short leave of absence if available",
            "Prioritize sleep, nutrition, and physical activity",
            "Connect with supportive colleagues or friends",
            "Implement daily stress reduction practices"
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
      navigate("/educators-portal", { 
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
    <Page title="Educator Burnout Assessment" showBackButton={true} onBackClick={handleBack}>
      <div className="max-w-4xl mx-auto">
        {!showResults ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Educator Burnout Assessment</h1>
              <p className="text-gray-300 mb-4">
                This assessment helps identify signs of burnout and provides personalized strategies for recovery and prevention.
              </p>
              
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span className="text-sm text-gray-400">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% complete</span>
              </div>
              <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className={getProgressColor()} />
            </div>
            
            <Card className="bg-[#1e1e2f] border-purple-500/30 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  <div className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-purple-400" />
                    Question {currentQuestionIndex + 1}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200 text-lg mb-6">{questions[currentQuestionIndex].text}</p>
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        answers[currentQuestionIndex] === option.value
                          ? 'bg-purple-700 text-white'
                          : 'bg-[#2a2a3f] text-gray-200 hover:bg-purple-900/50'
                      }`}
                      onClick={() => handleAnswer(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="bg-[#1e1e2f] border-purple-500/30 shadow-lg">
            <CardHeader className={`bg-gradient-to-r ${
              burnoutLevel === 'low' ? 'from-green-800/50 to-green-700/30' :
              burnoutLevel === 'moderate' ? 'from-yellow-800/50 to-yellow-700/30' :
              burnoutLevel === 'high' ? 'from-orange-800/50 to-orange-700/30' :
              'from-red-800/50 to-red-700/30'
            } rounded-t-lg`}>
              <div className="flex justify-between">
                <CardTitle className="text-2xl text-white">{burnoutInfo.title}</CardTitle>
                <div className={`p-2 rounded-full ${
                  burnoutLevel === 'low' ? 'bg-green-500/20' : 
                  burnoutLevel === 'moderate' ? 'bg-yellow-500/20' :
                  burnoutLevel === 'high' ? 'bg-orange-500/20' :
                  'bg-red-500/20'
                }`}>
                  <CheckCircle2 className={`h-6 w-6 ${
                    burnoutLevel === 'low' ? 'text-green-500' : 
                    burnoutLevel === 'moderate' ? 'text-yellow-500' :
                    burnoutLevel === 'high' ? 'text-orange-500' :
                    'text-red-500'
                  }`} />
                </div>
              </div>
              <CardDescription className="text-white text-lg">
                Score: {score} out of 50
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-200 text-lg mb-6">{burnoutInfo.description}</p>
              
              <div className="mb-8">
                <h3 className="text-white text-xl mb-4 font-medium">Personalized Recommendations</h3>
                <ul className="space-y-3">
                  {burnoutInfo.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`p-1 rounded-full ${
                        burnoutLevel === 'low' ? 'bg-green-500/20' : 
                        burnoutLevel === 'moderate' ? 'bg-yellow-500/20' :
                        burnoutLevel === 'high' ? 'bg-orange-500/20' :
                        'bg-red-500/20'
                      } mr-3 mt-1`}>
                        <div className={`w-2 h-2 rounded-full ${
                          burnoutLevel === 'low' ? 'bg-green-500' : 
                          burnoutLevel === 'moderate' ? 'bg-yellow-500' :
                          burnoutLevel === 'high' ? 'bg-orange-500' :
                          'bg-red-500'
                        }`} />
                      </div>
                      <span className="text-gray-200">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-purple-900/30 p-4 rounded-lg">
                <h3 className="text-white text-lg mb-2">Next Steps</h3>
                <p className="text-gray-300">
                  Consider exploring our educator-specific workshops on stress management and work-life balance. You'll find practical techniques to help address the areas highlighted in your assessment.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4 pt-6 border-t border-gray-700/50">
              <Button 
                onClick={() => navigate("/educators-portal", { 
                  state: { 
                    tab: "workshops",
                    stayInPortal: true,
                    preventTutorial: true
                  }
                })}
                className="bg-purple-600 hover:bg-purple-700 flex-1"
              >
                Explore Workshops <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={() => navigate("/educators-portal", {
                  state: { 
                    tab: "resources",
                    stayInPortal: true,
                    preventTutorial: true 
                  }
                })}
                variant="outline" 
                className="border-purple-500/50 text-purple-300 hover:bg-purple-900/20 flex-1"
              >
                View Resources
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Page>
  );
};

export default EducatorsBurnoutAssessment;
