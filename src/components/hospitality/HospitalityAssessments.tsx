
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Clock, HeartHandshake, AlertTriangle, Brain, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const HospitalityAssessments: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleAssessmentStart = (path: string, title: string) => {
    toast({
      title: "Starting Assessment",
      description: `Loading ${title}...`,
      duration: 1500,
    });
    navigate(path, {
      state: {
        stayInPortal: true,
        preventTutorial: true,
        portalPath: "/hospitality-portal",
        fromPortal: true,
        portalType: "hospitality",
        startAssessment: true
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Hospitality Wellness Assessments</h2>
        <p className="text-white/70">
          Specialized tools designed to evaluate the unique mental health challenges faced by restaurant and hospitality professionals
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Industry Stress Assessment */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Service Industry Stress Assessment
              </CardTitle>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300">
                10 min
              </span>
            </div>
            <CardDescription>
              Measure how work-related stressors are affecting your wellbeing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              This assessment focuses on the specific stressors common in hospitality roles, including customer interactions, 
              high-pressure environments, and irregular schedules. Get personalized insights and recommendations.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-white/70">15 questions</div>
            <Button 
              onClick={() => handleAssessmentStart("/hospitality-assessments/stress", "Service Industry Stress Assessment")}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Hospitality Burnout Assessment */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                Hospitality Burnout Assessment
              </CardTitle>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                8 min
              </span>
            </div>
            <CardDescription>
              Identify signs and symptoms of burnout in service roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              Restaurant and hospitality work can be physically and emotionally demanding. This assessment helps identify 
              if you're experiencing burnout and provides strategies for recovery and prevention.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-white/70">12 questions</div>
            <Button 
              onClick={() => handleAssessmentStart("/hospitality-assessments/burnout", "Hospitality Burnout Assessment")}
              className="bg-red-500 hover:bg-red-600"
            >
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Work-Life Balance Assessment */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-purple-500" />
                Work-Life Balance Assessment
              </CardTitle>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                12 min
              </span>
            </div>
            <CardDescription>
              Evaluate how effectively you're balancing work and personal life
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              Designed specifically for those working non-standard hours, this assessment evaluates your work-life balance 
              and provides strategies for maintaining boundaries and personal time in an industry that often blurs them.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-white/70">18 questions</div>
            <Button 
              onClick={() => handleAssessmentStart("/hospitality-assessments/work-life-balance", "Work-Life Balance Assessment")}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Emotional Resilience Check */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                Emotional Resilience Check
              </CardTitle>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                15 min
              </span>
            </div>
            <CardDescription>
              Measure your ability to bounce back from service-related challenges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              The hospitality industry can be emotionally taxing. This assessment evaluates your resilience in the face of 
              difficult interactions, high-stress situations, and the emotional labor required in service roles.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-white/70">20 questions</div>
            <Button 
              onClick={() => handleAssessmentStart("/hospitality-assessments/burnout", "Emotional Resilience Check")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
        <div className="flex items-start space-x-4">
          <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
            <ClipboardCheck className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-purple-900 dark:text-purple-300 mb-2">Why Take These Assessments?</h3>
            <p className="text-white/70 text-sm">
              These assessments are designed specifically for the unique challenges of restaurant and hospitality work. 
              They can help you identify stressors, measure burnout, and develop strategies for managing the demands 
              of service roles. All assessment results are completely private and include personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalityAssessments;
