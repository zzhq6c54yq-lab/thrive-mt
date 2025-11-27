
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Clock, HeartHandshake, AlertTriangle, Brain, ArrowRight, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TransportAssessments: React.FC = () => {
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
        portalPath: "/transport-portal",
        fromPortal: true,
        portalType: "transport",
        startAssessment: true
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Transport Industry Wellness Assessments</h2>
        <p className="text-white/70">
          Specialized tools designed to evaluate the unique mental health challenges faced by truck drivers and transportation workers
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Road Stress Assessment */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-blue-500" />
                Road Stress Assessment
              </CardTitle>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                12 min
              </span>
            </div>
            <CardDescription>
              Evaluate how driving-related stressors are affecting your wellbeing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              This assessment focuses on the specific stressors common in transportation roles, including traffic congestion, 
              tight delivery schedules, long hours behind the wheel, and other road-related challenges. Get personalized insights and recommendations.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-white/60">18 questions</div>
            <Button 
              onClick={() => handleAssessmentStart("/transport-assessments/stress", "Road Stress Assessment")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Driver Burnout Assessment */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                Driver Burnout Assessment
              </CardTitle>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                10 min
              </span>
            </div>
            <CardDescription>
              Identify signs and symptoms of burnout in transportation roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              Long-haul driving and transportation work can be physically and emotionally demanding. This assessment helps identify 
              if you're experiencing burnout and provides strategies for recovery and prevention specifically tailored to transportation professionals.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-white/60">15 questions</div>
            <Button 
              onClick={() => handleAssessmentStart("/transport-assessments/burnout", "Driver Burnout Assessment")}
              className="bg-red-500 hover:bg-red-600"
            >
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Road-Life Balance Assessment */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-green-500" />
                Road-Life Balance Assessment
              </CardTitle>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                14 min
              </span>
            </div>
            <CardDescription>
              Evaluate how effectively you're balancing work and personal life on the road
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              Designed specifically for those with extended time away from home, this assessment evaluates your work-life balance 
              and provides strategies for maintaining family connections and personal time in an industry that often requires significant time on the road.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-white/60">20 questions</div>
            <Button 
              onClick={() => handleAssessmentStart("/transport-assessments/work-life-balance", "Road-Life Balance Assessment")}
              className="bg-green-500 hover:bg-green-600"
            >
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Driver Resilience Check */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Driver Resilience Check
              </CardTitle>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                16 min
              </span>
            </div>
            <CardDescription>
              Measure your ability to bounce back from transport-related challenges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">
              The transportation industry comes with unique challenges from adverse weather to mechanical issues and delivery pressures. This assessment evaluates your resilience 
              in the face of these situations and provides strategies to build mental toughness on the road.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-white/60">22 questions</div>
            <Button 
              onClick={() => handleAssessmentStart("/transport-assessments/resilience", "Driver Resilience Check")}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
            <Truck className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">Why Take These Assessments?</h3>
            <p className="text-white/70 text-sm">
              These assessments are designed specifically for the unique challenges of transportation work. 
              They can help you identify stressors, measure burnout risk, and develop strategies for managing the demands 
              of long-distance driving and transportation roles. All assessment results are completely private and include personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportAssessments;
