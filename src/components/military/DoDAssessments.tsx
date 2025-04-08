import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, AlertCircle, HeartPulse, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoDAssessments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartAssessment = (assessmentType: string, title: string) => {
    toast({
      title: `Starting ${title}`,
      description: "Loading assessment questions...",
      duration: 1500,
    });
    
    // Navigate to the dedicated military assessment page
    navigate("/military-assessment", {
      state: {
        preventTutorial: true,
        returnToPortal: "/dod-portal",
        assessmentType,
        assessmentTitle: title
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with American flag-themed styling */}
      <div className="relative overflow-hidden rounded-lg border border-blue-800/50 bg-gradient-to-r from-blue-950 to-blue-900 p-6">
        {/* Subtle flag background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-1/4 h-1/3 bg-blue-700">
            <div className="grid grid-cols-4 gap-1 p-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center justify-center text-white">
                  ★
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2/3">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className={`h-[14.28%] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 mb-2">
            Military Mental Health Assessments
          </h2>
          <p className="text-blue-200/80 max-w-3xl">
            These specialized assessments are designed specifically for service members, veterans, and their families. All assessments are confidential and provide immediate results along with tailored recommendations.
          </p>
        </div>
      </div>
      
      {/* Primary Assessments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
          <CardHeader className="pb-2 border-b border-blue-900/30">
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400">PTSD Screening</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">PCL-5 Assessment</h3>
                <p className="text-white/70 text-sm">
                  The PTSD Checklist (PCL-5) is a 20-item self-report measure that assesses the presence and severity of PTSD symptoms.
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm text-white/60 mb-2 gap-1">
              <span className="text-blue-400">•</span> Takes approximately 5-10 minutes
            </div>
            <div className="flex items-center text-sm text-white/60 mb-2 gap-1">
              <span className="text-blue-400">•</span> Confidential results with immediate feedback
            </div>
            <div className="flex items-center text-sm text-white/60 mb-2 gap-1">
              <span className="text-blue-400">•</span> Developed specifically for military experiences
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => handleStartAssessment("ptsd", "PTSD Screening")}
            >
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
          <CardHeader className="pb-2 border-b border-blue-900/30">
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400">Depression Check</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <Brain className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">PHQ-9 Assessment</h3>
                <p className="text-white/70 text-sm">
                  The Patient Health Questionnaire (PHQ-9) is a reliable screening tool for measuring depression severity.
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm text-white/60 mb-2 gap-1">
              <span className="text-blue-400">•</span> Takes approximately 3-5 minutes
            </div>
            <div className="flex items-center text-sm text-white/60 mb-2 gap-1">
              <span className="text-blue-400">•</span> Provides severity score and suggested next steps
            </div>
            <div className="flex items-center text-sm text-white/60 mb-2 gap-1">
              <span className="text-blue-400">•</span> Validated for military and veteran populations
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => handleStartAssessment("depression", "Depression Check")}
            >
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Secondary Assessments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#141921] border-blue-900/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-blue-900/30 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Anxiety Assessment</h3>
                <p className="text-sm text-white/60 mb-3">
                  GAD-7 tool for screening and measuring anxiety severity.
                </p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => handleStartAssessment("anxiety", "Anxiety Assessment")}
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-[#141921] border-blue-900/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-blue-900/30 rounded-lg">
                <HeartPulse className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Stress Assessment</h3>
                <p className="text-sm text-white/60 mb-3">
                  Military-specific stress evaluation with coping strategies.
                </p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => handleStartAssessment("stress", "Stress Assessment")}
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-[#141921] border-blue-900/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-blue-900/30 rounded-lg">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Social Readjustment</h3>
                <p className="text-sm text-white/60 mb-3">
                  Evaluate adjustment challenges after deployment or service.
                </p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              onClick={() => handleStartAssessment("readjustment", "Social Readjustment Assessment")}
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Assessment Information */}
      <Card className="bg-[#0F1621] border-blue-700/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <h3 className="text-lg font-medium text-white">Important Information</h3>
          </div>
          <p className="text-white/80 mb-3 text-sm">
            These assessments are not meant to replace professional diagnosis or treatment. If you're experiencing a mental health emergency, please seek immediate help.
          </p>
          <Button 
            variant="outline" 
            className="border-red-500 text-red-300 hover:bg-red-900/20 w-full md:w-auto"
            onClick={() => navigate("/crisis-support", { 
              state: { 
                fromMilitary: true,
                preventTutorial: true,
                returnToPortal: "/dod-portal"
              }
            })}
          >
            Get Immediate Help
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoDAssessments;
