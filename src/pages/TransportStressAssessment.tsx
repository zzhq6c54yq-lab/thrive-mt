
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import PortalBackButton from "@/components/navigation/PortalBackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ChevronRight, Award, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    id: 1,
    question: "How often do you feel stressed by traffic congestion when driving?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Occasionally" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Very frequently" }
    ]
  },
  {
    id: 2,
    question: "How much does meeting tight delivery schedules affect your stress levels?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Slightly" },
      { value: 3, label: "Moderately" },
      { value: 4, label: "Considerably" },
      { value: 5, label: "Extremely" }
    ]
  },
  {
    id: 3,
    question: "How often do you feel stressed by adverse weather conditions while driving?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Occasionally" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Very frequently" }
    ]
  },
  {
    id: 4,
    question: "How stressed do you feel by driving long hours?",
    options: [
      { value: 1, label: "Not at all stressed" },
      { value: 2, label: "Slightly stressed" },
      { value: 3, label: "Moderately stressed" },
      { value: 4, label: "Very stressed" },
      { value: 5, label: "Extremely stressed" }
    ]
  },
  {
    id: 5,
    question: "How often do you feel anxiety about potential vehicle issues or breakdowns?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Occasionally" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Very frequently" }
    ]
  },
  {
    id: 6,
    question: "How much do interactions with other drivers on the road affect your mood?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Slightly" },
      { value: 3, label: "Moderately" },
      { value: 4, label: "Considerably" },
      { value: 5, label: "Extremely" }
    ]
  },
  {
    id: 7,
    question: "How stressed do you feel about finding safe and legal parking for rest periods?",
    options: [
      { value: 1, label: "Not at all stressed" },
      { value: 2, label: "Slightly stressed" },
      { value: 3, label: "Moderately stressed" },
      { value: 4, label: "Very stressed" },
      { value: 5, label: "Extremely stressed" }
    ]
  },
  {
    id: 8,
    question: "How often do you feel pressured by dispatchers or management?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Occasionally" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Very frequently" }
    ]
  },
  {
    id: 9,
    question: "How stressed do you feel about finding healthy food options while on the road?",
    options: [
      { value: 1, label: "Not at all stressed" },
      { value: 2, label: "Slightly stressed" },
      { value: 3, label: "Moderately stressed" },
      { value: 4, label: "Very stressed" },
      { value: 5, label: "Extremely stressed" }
    ]
  },
  {
    id: 10,
    question: "How often do you feel that road conditions (poor roads, construction) cause you stress?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Occasionally" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Very frequently" }
    ]
  },
  {
    id: 11,
    question: "How much does being away from family and friends affect your stress levels?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Slightly" },
      { value: 3, label: "Moderately" },
      { value: 4, label: "Considerably" },
      { value: 5, label: "Extremely" }
    ]
  },
  {
    id: 12,
    question: "How often do you feel stressed about finding adequate facilities for personal needs (showers, restrooms, etc.)?",
    options: [
      { value: 1, label: "Rarely or never" },
      { value: 2, label: "Occasionally" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Very frequently" }
    ]
  }
];

const TransportStressAssessment: React.FC = () => {
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
    const maxPoints = totalQuestions * 5;
    return (totalPoints / maxPoints) * 100;
  };
  
  const getScoreCategory = () => {
    const score = calculateScore();
    
    if (score <= 30) return {
      category: "Low Road Stress",
      description: "You appear to be managing the stresses of transportation work well. You likely have good coping strategies in place.",
      recommendations: [
        "Continue with your current stress management techniques",
        "Consider mentoring others who struggle with road stress",
        "Practice gratitude for your resilience and coping skills",
        "Monitor for any changes in your stress levels"
      ]
    };
    
    if (score <= 60) return {
      category: "Moderate Road Stress",
      description: "You're experiencing some stress from your transportation work. There are opportunities to develop stronger coping mechanisms.",
      recommendations: [
        "Establish clear boundaries between work time and personal time",
        "Practice brief relaxation techniques during breaks",
        "Consider using stress-reduction apps while off duty",
        "Identify your specific stressors and develop plans for each"
      ]
    };
    
    return {
      category: "High Road Stress",
      description: "Your transportation work is causing significant stress. It's important to implement stress management strategies soon.",
      recommendations: [
        "Schedule a consultation with a mental health professional",
        "Learn and practice deep breathing techniques to use during high-stress moments",
        "Consider discussing schedule adjustments with your employer if possible",
        "Join a support group for transportation professionals",
        "Prioritize sleep, nutrition, and physical activity to build resilience"
      ]
    };
  };
  
  const handleBackToPortal = () => {
    navigate("/app/transport-portal", { 
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
    <Page title="Road Stress Assessment" showBackButton={false}>
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <PortalBackButton returnPath="/transport-portal" />
        </div>
        
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
            <AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Road Stress Assessment
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Evaluate how driving-related stressors are affecting your wellbeing
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
                        ? "border-blue-500 bg-blue-50 text-blue-700" 
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
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Your Results</CardTitle>
                  <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {Math.round(calculateScore())}%
                  </div>
                </div>
                <CardDescription>
                  Based on your responses to the Road Stress Assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 mr-2 text-blue-500" />
                    <h3 className="font-medium text-lg">{getScoreCategory().category}</h3>
                  </div>
                  <p className="text-gray-700">{getScoreCategory().description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Recommendations:</h3>
                  <ul className="space-y-2">
                    {getScoreCategory().recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
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
                  className="sm:w-1/2 bg-blue-500 hover:bg-blue-600"
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
                  Based on your assessment, we recommend the following resources to help manage your road-related stress:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center text-center border-blue-200 hover:border-blue-500 hover:bg-blue-50"
                    onClick={() => navigate("/app/transport-practice/stress-management", {
                      state: { 
                        stayInPortal: true,
                        preventTutorial: true,
                        portalPath: "/app/transport-portal"
                      }
                    })}
                  >
                    <span className="font-medium mb-1">Road Stress Management Practice</span>
                    <span className="text-sm text-gray-500">10-minute guided session</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center text-center border-blue-200 hover:border-blue-500 hover:bg-blue-50"
                    onClick={() => navigate("/app/transport-workshops/stress-management", {
                      state: { 
                        stayInPortal: true,
                        preventTutorial: true,
                        portalPath: "/app/transport-portal"
                      }
                    })}
                  >
                    <span className="font-medium mb-1">Stress Management Workshop</span>
                    <span className="text-sm text-gray-500">May 15, 2025 • 8:00 PM EST</span>
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

export default TransportStressAssessment;
