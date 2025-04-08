import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, AlertTriangle, ClipboardList, Brain, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoDAssessments = () => {
  const { toast } = useToast();
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<{[key: string]: string}>({});
  const [result, setResult] = useState<"low" | "moderate" | "high" | null>(null);
  
  const assessments = [
    {
      id: "ptsd",
      title: "PTSD Screening",
      description: "5-minute confidential assessment based on DSM-5 criteria",
      icon: Shield,
      color: "blue",
      questions: [
        {
          id: "p1",
          text: "In the past month, have you had nightmares about the event(s) or thoughts about the event(s) when you didn't want to?"
        },
        {
          id: "p2",
          text: "In the past month, have you tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of the event(s)?"
        },
        {
          id: "p3",
          text: "In the past month, have you been constantly on guard, watchful, or easily startled?"
        },
        {
          id: "p4",
          text: "In the past month, have you felt numb or detached from people, activities, or your surroundings?"
        },
        {
          id: "p5",
          text: "In the past month, have you felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?"
        }
      ]
    },
    {
      id: "depression",
      title: "Depression Check",
      description: "PHQ-9 standard screening for depression symptoms",
      icon: Brain,
      color: "indigo",
      questions: [
        {
          id: "d1",
          text: "Over the last 2 weeks, how often have you had little interest or pleasure in doing things?"
        },
        {
          id: "d2",
          text: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?"
        },
        {
          id: "d3",
          text: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?"
        },
        {
          id: "d4",
          text: "Over the last 2 weeks, how often have you felt tired or had little energy?"
        },
        {
          id: "d5",
          text: "Over the last 2 weeks, how often have you had poor appetite or been overeating?"
        },
        {
          id: "d6",
          text: "Over the last 2 weeks, how often have you felt bad about yourself or that you are a failure or have let yourself or your family down?"
        },
        {
          id: "d7",
          text: "Over the last 2 weeks, how often have you had trouble concentrating on things, such as reading or watching TV?"
        },
        {
          id: "d8",
          text: "Over the last 2 weeks, how often have you moved or spoken so slowly that other people could have noticed, or been so fidgety or restless that you have been moving around a lot more than usual?"
        },
        {
          id: "d9",
          text: "Over the last 2 weeks, how often have you had thoughts that you would be better off dead, or of hurting yourself in some way?"
        }
      ]
    },
    {
      id: "anxiety",
      title: "Anxiety Assessment",
      description: "GAD-7 screening for anxiety symptoms",
      icon: AlertCircle,
      color: "amber",
      questions: [
        {
          id: "a1",
          text: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?"
        },
        {
          id: "a2",
          text: "Over the last 2 weeks, how often have you not been able to stop or control worrying?"
        },
        {
          id: "a3",
          text: "Over the last 2 weeks, how often have you worried too much about different things?"
        },
        {
          id: "a4",
          text: "Over the last 2 weeks, how often have you had trouble relaxing?"
        },
        {
          id: "a5",
          text: "Over the last 2 weeks, how often have you been so restless that it's hard to sit still?"
        },
        {
          id: "a6",
          text: "Over the last 2 weeks, how often have you become easily annoyed or irritable?"
        },
        {
          id: "a7",
          text: "Over the last 2 weeks, how often have you felt afraid, as if something awful might happen?"
        }
      ]
    }
  ];
  
  const options = [
    { value: "0", label: "Not at all" },
    { value: "1", label: "Several days" },
    { value: "2", label: "More than half the days" },
    { value: "3", label: "Nearly every day" }
  ];
  
  const ptsdOptions = [
    { value: "0", label: "No" },
    { value: "1", label: "Yes" }
  ];

  const currentAssessment = assessments.find(a => a.id === activeAssessment);
  
  const handleStartAssessment = (assessmentId: string) => {
    setActiveAssessment(assessmentId);
    setCurrentStep(1);
    setResponses({});
    setResult(null);
    
    toast({
      title: "Assessment Started",
      description: "Your responses are confidential and not stored permanently.",
      duration: 3000
    });
  };
  
  const handleOptionSelect = (questionId: string, value: string) => {
    setResponses({
      ...responses,
      [questionId]: value
    });
  };
  
  const handleNext = () => {
    if (!currentAssessment) return;
    
    const totalQuestions = currentAssessment.questions.length;
    const currentQuestion = currentAssessment.questions[currentStep - 1];
    
    if (!responses[currentQuestion.id]) {
      toast({
        title: "Please select an option",
        description: "You must select an answer before continuing.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    if (currentStep < totalQuestions) {
      setCurrentStep(currentStep + 1);
    } else {
      const totalScore = Object.values(responses).reduce((sum, value) => sum + parseInt(value), 0);
      
      let resultLevel: "low" | "moderate" | "high";
      
      if (activeAssessment === "ptsd") {
        if (totalScore >= 3) {
          resultLevel = "high";
        } else if (totalScore >= 2) {
          resultLevel = "moderate";
        } else {
          resultLevel = "low";
        }
      } else if (activeAssessment === "depression") {
        if (totalScore >= 15) {
          resultLevel = "high";
        } else if (totalScore >= 10) {
          resultLevel = "moderate";
        } else {
          resultLevel = "low";
        }
      } else {
        if (totalScore >= 15) {
          resultLevel = "high";
        } else if (totalScore >= 10) {
          resultLevel = "moderate";
        } else {
          resultLevel = "low";
        }
      }
      
      setResult(resultLevel);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleRestart = () => {
    setActiveAssessment(null);
    setCurrentStep(1);
    setResponses({});
    setResult(null);
  };
  
  const getProgressPercentage = () => {
    if (!currentAssessment) return 0;
    return (currentStep / currentAssessment.questions.length) * 100;
  };
  
  const getResultMessage = () => {
    if (!result) return null;
    
    const messages = {
      ptsd: {
        low: "Your responses suggest minimal symptoms of PTSD. Continue to monitor your well-being.",
        moderate: "Your responses suggest some symptoms that may be related to PTSD. Consider speaking with a mental health professional.",
        high: "Your responses suggest significant symptoms that may indicate PTSD. We strongly recommend consulting with a mental health professional."
      },
      depression: {
        low: "Your responses suggest minimal symptoms of depression. Continue to monitor your well-being.",
        moderate: "Your responses suggest moderate depression symptoms. Consider speaking with a mental health professional.",
        high: "Your responses suggest severe depression symptoms. We strongly recommend consulting with a mental health professional."
      },
      anxiety: {
        low: "Your responses suggest minimal symptoms of anxiety. Continue to monitor your well-being.",
        moderate: "Your responses suggest moderate anxiety symptoms. Consider speaking with a mental health professional.",
        high: "Your responses suggest severe anxiety symptoms. We strongly recommend consulting with a mental health professional."
      }
    };
    
    return messages[activeAssessment]?.[result] || "Thank you for completing the assessment.";
  };
  
  const getResultIcon = () => {
    if (!result) return null;
    
    switch (result) {
      case "low":
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case "moderate":
        return <AlertTriangle className="h-12 w-12 text-amber-500" />;
      case "high":
        return <AlertCircle className="h-12 w-12 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Military-Specific Mental Health Assessments</h2>
        <p className="text-blue-200/80 mb-6">
          Confidential self-assessments designed specifically for service members and veterans. Your responses are not stored permanently.
        </p>
      </div>
      
      {!activeAssessment ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
              <CardHeader>
                <div className={`p-3 rounded-lg bg-${assessment.color}-900/20 w-fit mb-3`}>
                  <assessment.icon className={`h-6 w-6 text-${assessment.color}-400`} />
                </div>
                <CardTitle className="text-white text-xl">{assessment.title}</CardTitle>
                <CardDescription className="text-white/70">{assessment.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className={`w-full bg-${assessment.color}-700 hover:bg-${assessment.color}-800 text-white`}
                  onClick={() => handleStartAssessment(assessment.id)}
                >
                  Start Assessment
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-[#141921] border-blue-900/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {currentAssessment && (
                  <>
                    <div className={`p-2 rounded-lg bg-${currentAssessment.color}-900/20`}>
                      <currentAssessment.icon className={`h-5 w-5 text-${currentAssessment.color}-400`} />
                    </div>
                    <CardTitle className="text-white text-xl">{currentAssessment.title}</CardTitle>
                  </>
                )}
              </div>
              <Button variant="ghost" className="text-white/70 hover:text-white" onClick={handleRestart}>
                Exit
              </Button>
            </div>
            
            {!result && (
              <div className="mt-2">
                <div className="flex justify-between text-sm text-white/70 mb-1">
                  <span>Question {currentStep} of {currentAssessment?.questions.length}</span>
                  <span>{Math.round(getProgressPercentage())}%</span>
                </div>
                <Progress 
                  value={getProgressPercentage()} 
                  className="h-2 bg-blue-900/30"
                />
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            {result ? (
              <div className="flex flex-col items-center text-center py-8 space-y-6">
                {getResultIcon()}
                <h3 className="text-2xl font-bold text-white">
                  {result === "low" ? "Low Risk" : result === "moderate" ? "Moderate Risk" : "High Risk"}
                </h3>
                <p className="text-white/80 max-w-2xl">
                  {getResultMessage()}
                </p>
                
                <div className="w-full max-w-xl mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <h4 className="text-white font-medium mb-2">Important Note</h4>
                  <p className="text-white/80 text-sm">
                    This assessment is not a substitute for professional medical advice, diagnosis, or treatment. 
                    Always seek the advice of your physician or other qualified health provider with any questions you may have.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <Button 
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                    onClick={() => handleRestart()}
                  >
                    Take Another Assessment
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                    onClick={() => window.open('/military-resources', '_blank')}
                  >
                    Access Resources
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-6">
                {currentAssessment && currentStep <= currentAssessment.questions.length && (
                  <div className="space-y-6">
                    <h3 className="text-white text-lg font-medium">
                      {currentAssessment.questions[currentStep - 1].text}
                    </h3>
                    
                    <RadioGroup 
                      value={responses[currentAssessment.questions[currentStep - 1].id] || ""}
                      onValueChange={(value) => handleOptionSelect(currentAssessment.questions[currentStep - 1].id, value)}
                      className="space-y-3"
                    >
                      {(activeAssessment === "ptsd" ? ptsdOptions : options).map(option => (
                        <div key={option.value} className="flex items-center space-x-2 bg-blue-900/10 p-3 rounded-md hover:bg-blue-900/20 transition-colors">
                          <RadioGroupItem 
                            value={option.value}
                            id={`option-${option.value}`} 
                            className="text-blue-400 border-blue-700"
                          />
                          <Label htmlFor={`option-${option.value}`} className="text-white cursor-pointer w-full">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          
          {!result && (
            <CardFooter className="flex justify-between border-t border-blue-900/30 px-6 py-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={currentStep === 1 ? "invisible" : "border-blue-500 text-blue-300 hover:bg-blue-900/50"}
              >
                Back
              </Button>
              <Button 
                className="bg-blue-700 hover:bg-blue-800 text-white"
                onClick={handleNext}
              >
                {currentAssessment && currentStep === currentAssessment.questions.length ? "Complete" : "Next"}
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
      
      <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-4 text-center">
        <p className="text-white/80 text-sm">
          These assessments are for informational purposes only and not intended to replace professional medical advice. 
          Results are confidential and not permanently stored.
        </p>
      </div>
    </div>
  );
};

export default DoDAssessments;
