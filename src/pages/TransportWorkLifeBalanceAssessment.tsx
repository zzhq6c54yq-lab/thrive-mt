
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import PortalBackButton from "@/components/navigation/PortalBackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HeartHandshake, ChevronRight, Award, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    id: 1,
    question: "How satisfied are you with the amount of time you can spend with family and friends?",
    options: [
      { value: 1, label: "Very dissatisfied" },
      { value: 2, label: "Dissatisfied" },
      { value: 3, label: "Somewhat dissatisfied" },
      { value: 4, label: "Neutral" },
      { value: 5, label: "Somewhat satisfied" },
      { value: 6, label: "Satisfied" },
      { value: 7, label: "Very satisfied" }
    ]
  },
  {
    id: 2,
    question: "How often do you miss important family events or occasions due to work?",
    options: [
      { value: 7, label: "Never" },
      { value: 6, label: "Rarely" },
      { value: 5, label: "Occasionally" },
      { value: 4, label: "Sometimes" },
      { value: 3, label: "Frequently" },
      { value: 2, label: "Usually" },
      { value: 1, label: "Always" }
    ]
  },
  {
    id: 3,
    question: "How well can you disconnect from work during your personal time?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Very poorly" },
      { value: 3, label: "Poorly" },
      { value: 4, label: "Somewhat" },
      { value: 5, label: "Well" },
      { value: 6, label: "Very well" },
      { value: 7, label: "Completely" }
    ]
  },
  {
    id: 4,
    question: "How satisfied are you with your ability to maintain personal relationships while working in transportation?",
    options: [
      { value: 1, label: "Very dissatisfied" },
      { value: 2, label: "Dissatisfied" },
      { value: 3, label: "Somewhat dissatisfied" },
      { value: 4, label: "Neutral" },
      { value: 5, label: "Somewhat satisfied" },
      { value: 6, label: "Satisfied" },
      { value: 7, label: "Very satisfied" }
    ]
  },
  {
    id: 5,
    question: "How often do you feel that your work schedule allows adequate time for rest and recovery?",
    options: [
      { value: 1, label: "Never" },
      { value: 2, label: "Rarely" },
      { value: 3, label: "Occasionally" },
      { value: 4, label: "Sometimes" },
      { value: 5, label: "Frequently" },
      { value: 6, label: "Usually" },
      { value: 7, label: "Always" }
    ]
  },
  {
    id: 6,
    question: "How satisfied are you with your ability to pursue personal hobbies and interests?",
    options: [
      { value: 1, label: "Very dissatisfied" },
      { value: 2, label: "Dissatisfied" },
      { value: 3, label: "Somewhat dissatisfied" },
      { value: 4, label: "Neutral" },
      { value: 5, label: "Somewhat satisfied" },
      { value: 6, label: "Satisfied" },
      { value: 7, label: "Very satisfied" }
    ]
  },
  {
    id: 7,
    question: "How often do you feel that work responsibilities interfere with your personal life?",
    options: [
      { value: 7, label: "Never" },
      { value: 6, label: "Rarely" },
      { value: 5, label: "Occasionally" },
      { value: 4, label: "Sometimes" },
      { value: 3, label: "Frequently" },
      { value: 2, label: "Usually" },
      { value: 1, label: "Always" }
    ]
  },
  {
    id: 8,
    question: "How often are you able to maintain consistent communication with loved ones while on the road?",
    options: [
      { value: 1, label: "Never" },
      { value: 2, label: "Rarely" },
      { value: 3, label: "Occasionally" },
      { value: 4, label: "Sometimes" },
      { value: 5, label: "Frequently" },
      { value: 6, label: "Usually" },
      { value: 7, label: "Always" }
    ]
  },
  {
    id: 9,
    question: "How satisfied are you with the quality of your sleep while working in transportation?",
    options: [
      { value: 1, label: "Very dissatisfied" },
      { value: 2, label: "Dissatisfied" },
      { value: 3, label: "Somewhat dissatisfied" },
      { value: 4, label: "Neutral" },
      { value: 5, label: "Somewhat satisfied" },
      { value: 6, label: "Satisfied" },
      { value: 7, label: "Very satisfied" }
    ]
  },
  {
    id: 10,
    question: "How often do you feel that your physical health suffers due to your work schedule?",
    options: [
      { value: 7, label: "Never" },
      { value: 6, label: "Rarely" },
      { value: 5, label: "Occasionally" },
      { value: 4, label: "Sometimes" },
      { value: 3, label: "Frequently" },
      { value: 2, label: "Usually" },
      { value: 1, label: "Always" }
    ]
  },
  {
    id: 11,
    question: "How satisfied are you with your ability to plan and participate in social activities?",
    options: [
      { value: 1, label: "Very dissatisfied" },
      { value: 2, label: "Dissatisfied" },
      { value: 3, label: "Somewhat dissatisfied" },
      { value: 4, label: "Neutral" },
      { value: 5, label: "Somewhat satisfied" },
      { value: 6, label: "Satisfied" },
      { value: 7, label: "Very satisfied" }
    ]
  },
  {
    id: 12,
    question: "How often do you feel that you can take time off when needed without negative consequences?",
    options: [
      { value: 1, label: "Never" },
      { value: 2, label: "Rarely" },
      { value: 3, label: "Occasionally" },
      { value: 4, label: "Sometimes" },
      { value: 5, label: "Frequently" },
      { value: 6, label: "Usually" },
      { value: 7, label: "Always" }
    ]
  },
  {
    id: 13,
    question: "How satisfied are you with your ability to maintain a healthy diet while working?",
    options: [
      { value: 1, label: "Very dissatisfied" },
      { value: 2, label: "Dissatisfied" },
      { value: 3, label: "Somewhat dissatisfied" },
      { value: 4, label: "Neutral" },
      { value: 5, label: "Somewhat satisfied" },
      { value: 6, label: "Satisfied" },
      { value: 7, label: "Very satisfied" }
    ]
  },
  {
    id: 14,
    question: "How often do you get to celebrate holidays and special occasions with loved ones?",
    options: [
      { value: 1, label: "Never" },
      { value: 2, label: "Rarely" },
      { value: 3, label: "Occasionally" },
      { value: 4, label: "Sometimes" },
      { value: 5, label: "Frequently" },
      { value: 6, label: "Usually" },
      { value: 7, label: "Always" }
    ]
  },
  {
    id: 15,
    question: "How satisfied are you with the balance between your work and personal life overall?",
    options: [
      { value: 1, label: "Very dissatisfied" },
      { value: 2, label: "Dissatisfied" },
      { value: 3, label: "Somewhat dissatisfied" },
      { value: 4, label: "Neutral" },
      { value: 5, label: "Somewhat satisfied" },
      { value: 6, label: "Satisfied" },
      { value: 7, label: "Very satisfied" }
    ]
  }
];

const TransportWorkLifeBalanceAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalQuestions = questions.length;
  const progress = (currentQuestion / totalQuestions) * 100;
  
  const handleOptionSelect = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Move to next question or show results if it's the last question
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const calculateScore = () => {
    const totalPoints = Object.values(answers).reduce((sum, value) => sum + value, 0);
    return totalPoints;
  };
  
  const getBalanceLevel = () => {
    const score = calculateScore();
    const maxPossibleScore = totalQuestions * 7;
    const percentageScore = (score / maxPossibleScore) * 100;
    
    if (percentageScore <= 40) return {
      level: "Significant Work-Life Imbalance",
      color: "text-red-600",
      description: "Your responses indicate a significant imbalance between your work and personal life. Your transportation work appears to be heavily affecting your ability to maintain personal connections and self-care routines.",
      recommendations: [
        "Consider discussing schedule modifications with your employer if possible",
        "Establish firm boundaries around your non-driving time",
        "Prioritize at least one meaningful personal connection during each work cycle",
        "Explore whether your current role aligns with your personal values and needs",
        "Consider speaking with a mental health professional about strategies for improving balance",
        "Look for transportation roles with more predictable schedules if available"
      ]
    };
    
    if (percentageScore <= 60) return {
      level: "Moderate Work-Life Imbalance",
      color: "text-orange-600",
      description: "Your responses suggest you're experiencing a moderate imbalance between your work and personal life. While you may have some systems in place, there's room for improvement in managing the demands of transportation work.",
      recommendations: [
        "Schedule regular video or phone calls with loved ones during non-driving hours",
        "Develop routines that help you transition between work and personal time",
        "Use technology to maintain presence in important family events when you can't be there physically",
        "Plan and protect blocks of recovery time between long hauls",
        "Consider whether schedule adjustments could improve your balance",
        "Practice consistent self-care routines that can be maintained on the road"
      ]
    };
    
    if (percentageScore <= 80) return {
      level: "Fair Work-Life Balance",
      color: "text-green-600",
      description: "Your responses indicate you've achieved a fair balance between your work and personal life. While there are still challenges, you've developed strategies that help you maintain personal connections despite the demands of transportation work.",
      recommendations: [
        "Continue reinforcing the boundaries and practices that are working for you",
        "Look for opportunities to further improve communication with loved ones",
        "Consider mentoring other transportation workers who struggle with balance",
        "Reflect on which aspects of your balance could still use improvement",
        "Plan meaningful activities during your time off to enhance quality of personal time",
        "Continue monitoring your work-life balance, especially during busier periods"
      ]
    };
    
    return {
      level: "Excellent Work-Life Balance",
      color: "text-blue-600",
      description: "Your responses suggest you've achieved an excellent balance between your transportation work and personal life. You appear to have developed effective strategies for maintaining meaningful connections despite the challenges of the industry.",
      recommendations: [
        "Share your successful strategies with others in the transportation industry",
        "Continue to maintain and protect the boundaries that work for you",
        "Regularly assess whether your current approach continues to meet your needs",
        "Consider ways to further enrich your personal time and connections",
        "Develop contingency plans for maintaining balance during unusually demanding work periods"
      ]
    };
  };
  
  const handleBackToPortal = () => {
    navigate("/transport-portal", { 
      state: { 
        tab: "assessments",
        stayInPortal: true,
        preventTutorial: true
      } 
    });
  };
  
  const handleDownloadResults = () => {
    toast({
      title: "Results Downloaded",
      description: "Your assessment results have been saved to your device",
      duration: 3000,
    });
    // In a real implementation, this would generate and download a PDF
  };

  return (
    <Page title="Road-Life Balance Assessment" showBackButton={false}>
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <PortalBackButton returnPath="/transport-portal" />
        </div>
        
        <div className="flex items-center mb-6">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
            <HeartHandshake className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Road-Life Balance Assessment
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Evaluate how effectively you're balancing work and personal life on the road
            </p>
          </div>
        </div>
        
        {!showResults ? (
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardDescription>
                  Question {currentQuestion + 1} of {totalQuestions}
                </CardDescription>
                <CardDescription>
                  {Math.round(progress)}% complete
                </CardDescription>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold mb-6">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto py-3 px-4 ${
                      answers[questions[currentQuestion].id] === option.value 
                        ? "border-green-500 bg-green-50 text-green-700" 
                        : ""
                    }`}
                    onClick={() => handleOptionSelect(questions[currentQuestion].id, option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border-t-4 border-t-green-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Your Results</CardTitle>
                  <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    Score: {calculateScore()} / {totalQuestions * 7}
                  </div>
                </div>
                <CardDescription>
                  Based on your responses to the Road-Life Balance Assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center mb-2">
                    <Award className={`h-5 w-5 mr-2 ${getBalanceLevel().color}`} />
                    <h3 className={`font-medium text-lg ${getBalanceLevel().color}`}>
                      {getBalanceLevel().level}
                    </h3>
                  </div>
                  <p className="text-gray-700">{getBalanceLevel().description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Recommendations:</h3>
                  <ul className="space-y-2">
                    {getBalanceLevel().recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className={`h-5 w-5 ${getBalanceLevel().color} mr-2 shrink-0 mt-0.5`} />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline"
                  className="sm:w-1/2"
                  onClick={handleDownloadResults}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Results
                </Button>
                <Button 
                  className="sm:w-1/2 bg-green-500 hover:bg-green-600"
                  onClick={handleBackToPortal}
                >
                  Back to Assessments
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Based on your assessment, we recommend the following resources to help improve your work-life balance:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center text-center border-green-200 hover:border-green-500 hover:bg-green-50"
                    onClick={() => navigate("/transport-workshops/family-connections", {
                      state: { 
                        stayInPortal: true,
                        preventTutorial: true,
                        portalPath: "/transport-portal"
                      }
                    })}
                  >
                    <span className="font-medium mb-1">Family Connections Workshop</span>
                    <span className="text-sm text-gray-500">May 22, 2025 • 7:00 PM EST</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center text-center border-green-200 hover:border-green-500 hover:bg-green-50"
                    onClick={() => navigate("/transport-resources/work-life-balance", {
                      state: { 
                        stayInPortal: true,
                        preventTutorial: true,
                        portalPath: "/transport-portal"
                      }
                    })}
                  >
                    <span className="font-medium mb-1">Road-Life Balance Guide</span>
                    <span className="text-sm text-gray-500">Practical strategies for transportation workers</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Page>
  );
};

export default TransportWorkLifeBalanceAssessment;
