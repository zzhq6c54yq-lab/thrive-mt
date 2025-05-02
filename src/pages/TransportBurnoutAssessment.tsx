
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import PortalBackButton from "@/components/navigation/PortalBackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronRight, Award, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    id: 1,
    question: "How often do you feel exhausted at the end of your driving day?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 2,
    question: "How often do you feel that your job as a transportation worker is meaningless?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 3,
    question: "How frequently do you find yourself disconnected from passengers, colleagues, or other drivers?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 4,
    question: "How often do you feel that you have nothing more to give to your job?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 5,
    question: "How often do you feel that your job is making you cynical or negative?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 6,
    question: "How often do you find it difficult to concentrate while driving?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 7,
    question: "How often do you feel a lack of accomplishment in your work?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 8,
    question: "How often do you feel physically drained after your work shifts?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 9,
    question: "How often do you have difficulty feeling positive emotions about your work?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 10,
    question: "How often do you feel that the demands of your job exceed your capacity to deliver?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 11,
    question: "How often do you think about finding a different occupation outside of transportation?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 12,
    question: "How often do you find it challenging to feel motivated at the start of your work shift?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 13,
    question: "How often do you feel emotionally numb towards your work responsibilities?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 14,
    question: "How often do you feel that your performance at work is suffering due to mental or physical exhaustion?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  },
  {
    id: 15,
    question: "How often do you feel irritable or impatient with other drivers, passengers, or dispatchers?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Once a month or less" },
      { value: 3, label: "A few times a month" },
      { value: 4, label: "Once a week" },
      { value: 5, label: "Multiple times per week" },
      { value: 6, label: "Almost every day" }
    ]
  }
];

const TransportBurnoutAssessment: React.FC = () => {
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
  
  const getBurnoutLevel = () => {
    const score = calculateScore();
    const maxPossibleScore = totalQuestions * 6;
    const percentageScore = (score / maxPossibleScore) * 100;
    
    if (percentageScore <= 25) return {
      level: "Low Risk of Burnout",
      color: "text-green-600",
      description: "You appear to have good emotional resilience and job satisfaction. Your responses suggest you're managing the demands of transportation work well.",
      recommendations: [
        "Continue with your current self-care routines",
        "Stay connected with your support network",
        "Consider mentoring others in the industry who might be struggling",
        "Keep monitoring your wellbeing, especially during high-stress periods"
      ]
    };
    
    if (percentageScore <= 50) return {
      level: "Moderate Risk of Burnout",
      color: "text-yellow-600",
      description: "You're showing some signs of burnout that warrant attention. While not severe, these signs suggest you should take steps to address potential burnout.",
      recommendations: [
        "Review your work-life boundaries and strengthen them where needed",
        "Incorporate more regular breaks into your routes when possible",
        "Practice stress-reduction techniques like deep breathing or brief meditation during breaks",
        "Seek social connections with others in the industry who understand your challenges",
        "Consider speaking with a mental health professional to develop personalized strategies"
      ]
    };
    
    if (percentageScore <= 75) return {
      level: "High Risk of Burnout",
      color: "text-orange-600",
      description: "You're experiencing significant symptoms of burnout that require attention. It's important to address these symptoms soon to prevent worsening.",
      recommendations: [
        "Consider speaking with a mental health professional about your symptoms",
        "Take time off if possible to rest and recover",
        "Evaluate aspects of your work that could be modified to reduce stress",
        "Establish firm boundaries between work and personal life",
        "Reconnect with activities and relationships that bring you joy outside of work",
        "Practice daily self-care activities focusing on sleep, nutrition, and exercise"
      ]
    };
    
    return {
      level: "Severe Risk of Burnout",
      color: "text-red-600",
      description: "Your responses indicate you're experiencing severe burnout symptoms. Immediate action is recommended to address these concerns.",
      recommendations: [
        "Prioritize speaking with a healthcare provider or mental health professional as soon as possible",
        "Consider taking leave from work if available to focus on recovery",
        "Evaluate whether your current position or schedule needs significant modification",
        "Implement a structured recovery plan with professional guidance",
        "Focus on basic self-care: adequate sleep, nutrition, hydration, and physical activity",
        "Seek support from loved ones and consider professional support groups"
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
    <Page title="Driver Burnout Assessment" showBackButton={false}>
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <PortalBackButton returnPath="/transport-portal" />
        </div>
        
        <div className="flex items-center mb-6">
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-red-600 dark:text-red-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Driver Burnout Assessment
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Identify signs and symptoms of burnout in transportation roles
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
                        ? "border-red-500 bg-red-50 text-red-700" 
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
            <Card className="border-t-4 border-t-red-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Your Results</CardTitle>
                  <div className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    Score: {calculateScore()} / {totalQuestions * 6}
                  </div>
                </div>
                <CardDescription>
                  Based on your responses to the Driver Burnout Assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center mb-2">
                    <Award className={`h-5 w-5 mr-2 ${getBurnoutLevel().color}`} />
                    <h3 className={`font-medium text-lg ${getBurnoutLevel().color}`}>
                      {getBurnoutLevel().level}
                    </h3>
                  </div>
                  <p className="text-gray-700">{getBurnoutLevel().description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Recommendations:</h3>
                  <ul className="space-y-2">
                    {getBurnoutLevel().recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className={`h-5 w-5 ${getBurnoutLevel().color} mr-2 shrink-0 mt-0.5`} />
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
                  className="sm:w-1/2 bg-red-500 hover:bg-red-600"
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
                  Based on your assessment, we recommend the following resources to help address potential burnout:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center text-center border-red-200 hover:border-red-500 hover:bg-red-50"
                    onClick={() => navigate("/transport-community/burnout", {
                      state: { 
                        stayInPortal: true,
                        preventTutorial: true,
                        portalPath: "/transport-portal"
                      }
                    })}
                  >
                    <span className="font-medium mb-1">Burnout Support Group</span>
                    <span className="text-sm text-gray-500">Connect with others experiencing similar challenges</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center text-center border-red-200 hover:border-red-500 hover:bg-red-50"
                    onClick={() => navigate("/transport-resources/burnout-recovery", {
                      state: { 
                        stayInPortal: true,
                        preventTutorial: true,
                        portalPath: "/transport-portal"
                      }
                    })}
                  >
                    <span className="font-medium mb-1">Burnout Recovery Guide</span>
                    <span className="text-sm text-gray-500">Step-by-step recovery plan for transportation workers</span>
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

export default TransportBurnoutAssessment;
