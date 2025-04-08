
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Brain, Shield, ArrowRight, ArrowLeft } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
}

interface AssessmentProps {
  type: string;
  title: string;
  returnPath: string;
}

const MilitaryAssessment: React.FC<AssessmentProps> = ({ type, title, returnPath }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Assessment questions based on type
  const getQuestions = (): Question[] => {
    switch (type) {
      case "ptsd":
        return [
          {
            id: 1,
            text: "In the past month, how often have you been bothered by repeated, disturbing, and unwanted memories of the stressful experience?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "A little bit" },
              { value: 2, label: "Moderately" },
              { value: 3, label: "Quite a bit" },
              { value: 4, label: "Extremely" }
            ]
          },
          {
            id: 2,
            text: "In the past month, how often have you been bothered by repeated, disturbing dreams of the stressful experience?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "A little bit" },
              { value: 2, label: "Moderately" },
              { value: 3, label: "Quite a bit" },
              { value: 4, label: "Extremely" }
            ]
          },
          {
            id: 3,
            text: "In the past month, how often have you suddenly felt or acted as if the stressful experience were actually happening again (as if you were back there reliving it)?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "A little bit" },
              { value: 2, label: "Moderately" },
              { value: 3, label: "Quite a bit" },
              { value: 4, label: "Extremely" }
            ]
          },
          {
            id: 4,
            text: "In the past month, how often have you felt very upset when something reminded you of the stressful experience?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "A little bit" },
              { value: 2, label: "Moderately" },
              { value: 3, label: "Quite a bit" },
              { value: 4, label: "Extremely" }
            ]
          },
          {
            id: 5,
            text: "In the past month, how often have you had strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "A little bit" },
              { value: 2, label: "Moderately" },
              { value: 3, label: "Quite a bit" },
              { value: 4, label: "Extremely" }
            ]
          }
        ];
      case "depression":
        return [
          {
            id: 1,
            text: "Over the last 2 weeks, how often have you had little interest or pleasure in doing things?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "Several days" },
              { value: 2, label: "More than half the days" },
              { value: 3, label: "Nearly every day" }
            ]
          },
          {
            id: 2,
            text: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "Several days" },
              { value: 2, label: "More than half the days" },
              { value: 3, label: "Nearly every day" }
            ]
          },
          {
            id: 3,
            text: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "Several days" },
              { value: 2, label: "More than half the days" },
              { value: 3, label: "Nearly every day" }
            ]
          },
          {
            id: 4,
            text: "Over the last 2 weeks, how often have you felt tired or had little energy?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "Several days" },
              { value: 2, label: "More than half the days" },
              { value: 3, label: "Nearly every day" }
            ]
          },
          {
            id: 5,
            text: "Over the last 2 weeks, how often have you had poor appetite or overeating?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "Several days" },
              { value: 2, label: "More than half the days" },
              { value: 3, label: "Nearly every day" }
            ]
          }
        ];
      case "anxiety":
        return [
          {
            id: 1,
            text: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "Several days" },
              { value: 2, label: "More than half the days" },
              { value: 3, label: "Nearly every day" }
            ]
          },
          {
            id: 2,
            text: "Over the last 2 weeks, how often have you not been able to stop or control worrying?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "Several days" },
              { value: 2, label: "More than half the days" },
              { value: 3, label: "Nearly every day" }
            ]
          },
          {
            id: 3,
            text: "Over the last 2 weeks, how often have you worried too much about different things?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "Several days" },
              { value: 2, label: "More than half the days" },
              { value: 3, label: "Nearly every day" }
            ]
          },
          {
            id: 4,
            text: "Over the last 2 weeks, how often have you had trouble relaxing?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "Several days" },
              { value: 2, label: "More than half the days" },
              { value: 3, label: "Nearly every day" }
            ]
          },
          {
            id: 5,
            text: "Over the last 2 weeks, how often have you been so restless that it is hard to sit still?",
            options: [
              { value: 0, label: "Not at all" },
              { value: 1, label: "Several days" },
              { value: 2, label: "More than half the days" },
              { value: 3, label: "Nearly every day" }
            ]
          }
        ];
      case "stress":
        return [
          {
            id: 1,
            text: "In the last month, how often have you been upset because of something that happened unexpectedly?",
            options: [
              { value: 0, label: "Never" },
              { value: 1, label: "Almost never" },
              { value: 2, label: "Sometimes" },
              { value: 3, label: "Fairly often" },
              { value: 4, label: "Very often" }
            ]
          },
          {
            id: 2,
            text: "In the last month, how often have you felt that you were unable to control the important things in your life?",
            options: [
              { value: 0, label: "Never" },
              { value: 1, label: "Almost never" },
              { value: 2, label: "Sometimes" },
              { value: 3, label: "Fairly often" },
              { value: 4, label: "Very often" }
            ]
          },
          {
            id: 3,
            text: "In the last month, how often have you felt nervous and stressed?",
            options: [
              { value: 0, label: "Never" },
              { value: 1, label: "Almost never" },
              { value: 2, label: "Sometimes" },
              { value: 3, label: "Fairly often" },
              { value: 4, label: "Very often" }
            ]
          },
          {
            id: 4,
            text: "In the last month, how often have you felt confident about your ability to handle your personal problems?",
            options: [
              { value: 4, label: "Never" },
              { value: 3, label: "Almost never" },
              { value: 2, label: "Sometimes" },
              { value: 1, label: "Fairly often" },
              { value: 0, label: "Very often" }
            ]
          },
          {
            id: 5,
            text: "In the last month, how often have you felt that things were going your way?",
            options: [
              { value: 4, label: "Never" },
              { value: 3, label: "Almost never" },
              { value: 2, label: "Sometimes" },
              { value: 1, label: "Fairly often" },
              { value: 0, label: "Very often" }
            ]
          }
        ];
      case "readjustment":
        return [
          {
            id: 1,
            text: "Since returning from deployment, how difficult has it been for you to adjust to civilian social situations?",
            options: [
              { value: 0, label: "Not at all difficult" },
              { value: 1, label: "Slightly difficult" },
              { value: 2, label: "Moderately difficult" },
              { value: 3, label: "Very difficult" },
              { value: 4, label: "Extremely difficult" }
            ]
          },
          {
            id: 2,
            text: "How difficult has it been for you to maintain relationships with people who haven't served in the military?",
            options: [
              { value: 0, label: "Not at all difficult" },
              { value: 1, label: "Slightly difficult" },
              { value: 2, label: "Moderately difficult" },
              { value: 3, label: "Very difficult" },
              { value: 4, label: "Extremely difficult" }
            ]
          },
          {
            id: 3,
            text: "How difficult has it been for you to find meaning or purpose in civilian life?",
            options: [
              { value: 0, label: "Not at all difficult" },
              { value: 1, label: "Slightly difficult" },
              { value: 2, label: "Moderately difficult" },
              { value: 3, label: "Very difficult" },
              { value: 4, label: "Extremely difficult" }
            ]
          },
          {
            id: 4,
            text: "How difficult has it been for you to adjust to the pace and structure (or lack thereof) of civilian life?",
            options: [
              { value: 0, label: "Not at all difficult" },
              { value: 1, label: "Slightly difficult" },
              { value: 2, label: "Moderately difficult" },
              { value: 3, label: "Very difficult" },
              { value: 4, label: "Extremely difficult" }
            ]
          },
          {
            id: 5,
            text: "How difficult has it been for you to feel like you belong in civilian society?",
            options: [
              { value: 0, label: "Not at all difficult" },
              { value: 1, label: "Slightly difficult" },
              { value: 2, label: "Moderately difficult" },
              { value: 3, label: "Very difficult" },
              { value: 4, label: "Extremely difficult" }
            ]
          }
        ];
      default:
        return [];
    }
  };

  const questions = getQuestions();

  const handleOptionSelect = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate results
      calculateResults();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    setScore(totalScore);
    setShowResults(true);
  };

  const getResultInterpretation = () => {
    switch (type) {
      case "ptsd":
        if (score >= 15) {
          return {
            level: "High",
            message: "Your responses suggest a significant level of post-traumatic stress symptoms. It's recommended that you speak with a mental health professional for a complete evaluation.",
            color: "text-red-500"
          };
        } else if (score >= 10) {
          return {
            level: "Moderate",
            message: "Your responses indicate a moderate level of post-traumatic stress symptoms. Consider consulting with a mental health professional.",
            color: "text-amber-500"
          };
        } else {
          return {
            level: "Low",
            message: "Your responses suggest minimal post-traumatic stress symptoms. Continue to practice self-care and monitoring.",
            color: "text-green-500"
          };
        }
      case "depression":
        if (score >= 10) {
          return {
            level: "Moderate to Severe",
            message: "Your responses suggest significant depressive symptoms that may require attention from a healthcare provider.",
            color: "text-red-500"
          };
        } else if (score >= 5) {
          return {
            level: "Mild",
            message: "Your responses indicate mild depressive symptoms. Consider discussing these feelings with a healthcare provider.",
            color: "text-amber-500"
          };
        } else {
          return {
            level: "Minimal",
            message: "Your responses suggest minimal depressive symptoms.",
            color: "text-green-500"
          };
        }
      case "anxiety":
        if (score >= 10) {
          return {
            level: "Severe",
            message: "Your responses suggest severe anxiety symptoms. We recommend consulting with a healthcare professional.",
            color: "text-red-500"
          };
        } else if (score >= 5) {
          return {
            level: "Moderate",
            message: "Your responses indicate moderate anxiety symptoms. Consider reaching out to a mental health professional.",
            color: "text-amber-500"
          };
        } else {
          return {
            level: "Mild",
            message: "Your responses suggest mild or minimal anxiety symptoms.",
            color: "text-green-500"
          };
        }
      case "stress":
        if (score > 13) {
          return {
            level: "High",
            message: "Your responses suggest high levels of perceived stress. Consider stress management techniques or speaking with a healthcare provider.",
            color: "text-red-500"
          };
        } else if (score > 6) {
          return {
            level: "Moderate",
            message: "Your responses indicate moderate levels of perceived stress. Consider incorporating stress reduction practices into your routine.",
            color: "text-amber-500"
          };
        } else {
          return {
            level: "Low",
            message: "Your responses suggest low levels of perceived stress.",
            color: "text-green-500"
          };
        }
      case "readjustment":
        if (score >= 15) {
          return {
            level: "Significant",
            message: "Your responses indicate significant readjustment challenges. Consider connecting with military transition programs or counseling services.",
            color: "text-red-500"
          };
        } else if (score >= 8) {
          return {
            level: "Moderate",
            message: "Your responses suggest moderate readjustment challenges. Peer support groups might be beneficial.",
            color: "text-amber-500"
          };
        } else {
          return {
            level: "Mild",
            message: "Your responses indicate mild readjustment challenges. Continue practicing self-care and utilizing your support network.",
            color: "text-green-500"
          };
        }
      default:
        return {
          level: "Unknown",
          message: "Could not determine results. Please try again later.",
          color: "text-gray-500"
        };
    }
  };

  const getResourcesForType = () => {
    switch (type) {
      case "ptsd":
        return [
          "VA PTSD Program Locator - Find specialized treatment near you",
          "Military OneSource counseling services - Available 24/7 at 800-342-9647",
          "PTSD Coach Mobile App - Free self-help tool for symptom management",
          "Peer Support Groups through local VA centers"
        ];
      case "depression":
        return [
          "Military Crisis Line - 988, Press 1 (available 24/7)",
          "Military OneSource non-medical counseling",
          "VA Mental Health Services",
          "DoD's Real Warriors Campaign resources"
        ];
      case "anxiety":
        return [
          "VA Anxiety Disorder Treatment Programs",
          "Mindfulness Coach App - Free VA self-help tool",
          "Military OneSource counseling services",
          "Defense Health Agency Mental Health Resources"
        ];
      case "stress":
        return [
          "Military OneSource stress management resources",
          "VA Whole Health program",
          "DoD's inTransition Program for service members in transition",
          "VA Mindfulness Training"
        ];
      case "readjustment":
        return [
          "Vet Centers - Readjustment counseling services",
          "VA's Transition and Care Management Program",
          "Soldier For Life - Transition Assistance Program",
          "American Corporate Partners - Mentoring for veterans"
        ];
      default:
        return [
          "Military OneSource - 800-342-9647",
          "VA Mental Health Services",
          "Defense Health Agency Mental Health Resources"
        ];
    }
  };

  const handleReturnToDashboard = () => {
    navigate(returnPath, {
      state: {
        preventTutorial: true,
        returnToPortal: "/dod-portal",
        assessmentCompleted: true,
        assessmentType: type
      }
    });
    
    toast({
      title: "Assessment Complete",
      description: `Your ${title} results have been saved`,
      duration: 2000,
    });
  };

  const currentQuestionData = questions[currentQuestion];
  const resultInterpretation = getResultInterpretation();
  const resources = getResourcesForType();

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="relative p-6 rounded-lg bg-gradient-to-r from-blue-950 to-blue-900 border border-blue-800/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-900/40 rounded-full">
            {type === "ptsd" ? (
              <Shield className="h-6 w-6 text-blue-400" />
            ) : (
              <Brain className="h-6 w-6 text-blue-400" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400">
              {title}
            </h2>
            <p className="text-blue-200/80">
              {!showResults ? 
                `Question ${currentQuestion + 1} of ${questions.length}` : 
                "Assessment Complete"
              }
            </p>
          </div>
        </div>
      </div>
      
      {!showResults ? (
        <Card className="bg-[#141921] border-blue-900/30">
          <CardHeader className="pb-2 border-b border-blue-900/30">
            <CardTitle className="text-white">Question {currentQuestion + 1}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <h3 className="text-lg text-white mb-6">{currentQuestionData?.text}</h3>
            
            <div className="space-y-3">
              {currentQuestionData?.options.map((option) => (
                <div 
                  key={option.value}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    answers[currentQuestionData.id] === option.value 
                      ? "bg-blue-900/50 border-blue-500" 
                      : "bg-[#0F1621] border-blue-900/20 hover:border-blue-900/50"
                  }`}
                  onClick={() => handleOptionSelect(currentQuestionData.id, option.value)}
                >
                  <p className="text-white">{option.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-blue-900/30 pt-4">
            <Button 
              variant="outline" 
              className="border-blue-500/50 text-blue-400 hover:bg-blue-900/30"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white"
              onClick={handleNextQuestion}
              disabled={answers[currentQuestionData?.id] === undefined}
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Complete Assessment"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="bg-[#141921] border-blue-900/30">
            <CardHeader>
              <CardTitle className="text-white">Assessment Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-1">
                  Your {title} Level: <span className={resultInterpretation.color}>{resultInterpretation.level}</span>
                </h3>
                <p className="text-white/70">{resultInterpretation.message}</p>
              </div>
              
              <div className="bg-[#0F1621] p-4 rounded-lg border border-blue-900/30">
                <h4 className="font-medium text-white mb-3">Recommended Resources</h4>
                <ul className="space-y-2">
                  {resources.map((resource, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span className="text-white/80">{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-3">
              <Button 
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={handleReturnToDashboard}
              >
                Return to Dashboard
              </Button>
              <Button 
                variant="outline"
                className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-900/30"
                onClick={() => navigate("/contact", {
                  state: {
                    preventTutorial: true,
                    returnToPortal: "/dod-portal",
                    subject: `${title} Follow-up`,
                    message: `I recently completed the ${title} assessment and would like to discuss my results with a professional.`
                  }
                })}
              >
                Request Follow-up Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MilitaryAssessment;
