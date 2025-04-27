
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Clock, CheckCircle, AlertTriangle, Clipboard, Brain, Heart, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import useFeatureActions from "@/hooks/useFeatureActions";

const LawEnforcementAssessments = () => {
  const { handleActionClick } = useFeatureActions();
  
  const assessments = [
    {
      id: "le1",
      title: "Law Enforcement Readiness Assessment",
      description: "Evaluate your mental readiness for duty and identify areas for support",
      icon: Shield,
      time: "10-15 minutes",
      questions: 42,
      urgency: "recommended",
      category: "readiness"
    },
    {
      id: "le2",
      title: "PTSD Screening (PCL-5)",
      description: "Standard screening tool for symptoms of post-traumatic stress disorder",
      icon: Brain,
      time: "5-7 minutes",
      questions: 20,
      urgency: "high",
      category: "clinical"
    },
    {
      id: "le3",
      title: "Critical Incident Stress Evaluation",
      description: "Assessment focused on critical incident related stress and adjustment",
      icon: Activity,
      time: "8-10 minutes",
      questions: 25,
      urgency: "medium",
      category: "clinical"
    },
    {
      id: "le4",
      title: "Family Wellbeing Assessment",
      description: "Evaluate the wellbeing and resilience of your family unit",
      icon: Heart,
      time: "10-12 minutes",
      questions: 30,
      urgency: "recommended",
      category: "family"
    },
    {
      id: "le5",
      title: "Sleep & Shift Work Impact",
      description: "Assess how shift work is affecting your sleep and overall health",
      icon: Clock,
      time: "8 minutes",
      questions: 24,
      urgency: "medium",
      category: "wellness"
    },
    {
      id: "le6",
      title: "Depression Screening (PHQ-9)",
      description: "Standard screening tool for symptoms of depression",
      icon: Brain,
      time: "3-5 minutes",
      questions: 9,
      urgency: "high",
      category: "clinical"
    }
  ];

  const getUrgencyLabel = (urgency) => {
    switch(urgency) {
      case 'high': 
        return (
          <div className="flex items-center gap-1.5 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span>High Priority</span>
          </div>
        );
      case 'medium': 
        return (
          <div className="flex items-center gap-1.5 text-amber-400">
            <Clock className="h-4 w-4" />
            <span>Recommended</span>
          </div>
        );
      case 'recommended':
      default:
        return (
          <div className="flex items-center gap-1.5 text-blue-400">
            <CheckCircle className="h-4 w-4" />
            <span>Beneficial</span>
          </div>
        );
    }
  };
  
  const getUserProgress = (assessmentId) => {
    // In a real app, this would come from user data
    const completedAssessments = ["le2", "le4"];
    const partialAssessments = {
      "le1": 65,
      "le3": 30,
    };
    
    if (completedAssessments.includes(assessmentId)) {
      return {
        completed: true,
        progress: 100
      };
    }
    
    if (assessmentId in partialAssessments) {
      return {
        completed: false,
        progress: partialAssessments[assessmentId]
      };
    }
    
    return {
      completed: false,
      progress: 0
    };
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Mental Health Assessments</h2>
        <p className="text-blue-200/80 mb-6 max-w-3xl">
          These confidential assessments are designed specifically for law enforcement personnel. Results are private and used to connect you with appropriate resources.
        </p>
      </div>
      
      {/* Information Card */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-700/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-blue-900/30 mt-1">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Confidential & Secure</h3>
              <p className="text-blue-200/70 mb-3">
                Your assessment results are completely confidential. Results are not shared with your department 
                or command structure unless you choose to share them. These tools are designed to help you understand 
                your mental health needs and connect with appropriate resources.
              </p>
              <Button variant="link" className="text-blue-400 p-0">Learn more about our privacy policy</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Assessments Categories */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Available Assessments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => {
            const progress = getUserProgress(assessment.id);
            
            return (
              <Card key={assessment.id} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors overflow-hidden flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-blue-900/30">
                      <assessment.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">{assessment.title}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2">{assessment.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Time to complete:</span>
                      <span className="text-white">{assessment.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Questions:</span>
                      <span className="text-white">{assessment.questions}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Priority:</span>
                      {getUrgencyLabel(assessment.urgency)}
                    </div>
                    
                    {/* Progress if started */}
                    {progress.progress > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/70">Your progress:</span>
                          <span className="text-blue-400">{progress.progress}%</span>
                        </div>
                        <Progress value={progress.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  {progress.completed ? (
                    <Button 
                      variant="outline" 
                      className="w-full border-green-500/50 text-green-400 hover:bg-green-900/20"
                      onClick={() => handleActionClick({
                        type: 'assessment',
                        id: assessment.id,
                        title: `View ${assessment.title} Results`
                      })}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> View Results
                    </Button>
                  ) : progress.progress > 0 ? (
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleActionClick({
                        type: 'assessment',
                        id: assessment.id,
                        title: `Continue ${assessment.title}`
                      })}
                    >
                      Continue Assessment
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleActionClick({
                        type: 'assessment',
                        id: assessment.id,
                        title: `Start ${assessment.title}`
                      })}
                    >
                      Start Assessment
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Results Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Your Assessment History</h3>
        <Card className="bg-[#141921] border-blue-900/30">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Completed Assessments</h3>
                <p className="text-blue-200/70">
                  View your past assessment results and track changes over time.
                </p>
              </div>
              <Button 
                className="bg-blue-700 hover:bg-blue-800 text-white sm:self-center"
                onClick={() => handleActionClick({
                  type: 'other',
                  path: '/law-enforcement-assessment-history',
                  title: 'Assessment History'
                })}
              >
                View Assessment History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LawEnforcementAssessments;
