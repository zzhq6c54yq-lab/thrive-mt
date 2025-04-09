
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clipboard, BarChart4, Clock, Brain, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

const AssessmentsTab: React.FC = () => {
  const { toast } = useToast();
  const location = useLocation();
  const fromSpecializedProgram = location.state?.fromSpecializedProgram;
  const returnToPortal = location.state?.returnToPortal;

  const handleAssessmentStart = (assessmentType: string) => {
    toast({
      title: `Starting ${assessmentType} Assessment`,
      description: "Your assessment is being prepared...",
      duration: 2000,
    });
    
    // In a real app, this would navigate to the specific assessment
    // For now, we'll just show a completion toast after a delay
    setTimeout(() => {
      toast({
        title: "Assessment Ready",
        description: `Begin your ${assessmentType} assessment now`,
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clipboard className="h-5 w-5 text-[#9b87f5]" />
          Mental Health Assessments
        </h2>
        <p className="text-gray-600 mb-6">
          These research-backed tools can help you better understand your mental health and track changes over time.
          All assessments are confidential and take 5-10 minutes to complete.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Self-Assessment</Badge>
                <span className="text-xs flex items-center gap-1 text-gray-500">
                  <Clock className="h-3 w-3" /> 5 minutes
                </span>
              </div>
              <CardTitle className="mt-2">Anxiety Screening (GAD-7)</CardTitle>
              <CardDescription>Evaluate symptoms of generalized anxiety disorder</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600">
                This validated 7-question screening tool helps identify anxiety symptoms and their severity over the past two weeks.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-[#9b87f5] to-[#8b77e5] hover:from-[#8b77e5] hover:to-[#7b67d5] group"
                onClick={() => handleAssessmentStart("Anxiety")}
              >
                Start Assessment <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Self-Assessment</Badge>
                <span className="text-xs flex items-center gap-1 text-gray-500">
                  <Clock className="h-3 w-3" /> 5 minutes
                </span>
              </div>
              <CardTitle className="mt-2">Depression Inventory (PHQ-9)</CardTitle>
              <CardDescription>Screen for signs of depression and monitor severity</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600">
                A 9-question tool to assess the presence and severity of depression symptoms according to DSM standards.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-[#9b87f5] to-[#8b77e5] hover:from-[#8b77e5] hover:to-[#7b67d5] group"
                onClick={() => handleAssessmentStart("Depression")}
              >
                Start Assessment <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Self-Assessment</Badge>
                <span className="text-xs flex items-center gap-1 text-gray-500">
                  <Clock className="h-3 w-3" /> 8 minutes
                </span>
              </div>
              <CardTitle className="mt-2">Stress Assessment (PSS)</CardTitle>
              <CardDescription>Measure your current stress levels</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600">
                The Perceived Stress Scale helps you understand how different situations affect your stress levels.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-[#9b87f5] to-[#8b77e5] hover:from-[#8b77e5] hover:to-[#7b67d5] group"
                onClick={() => handleAssessmentStart("Stress")}
              >
                Start Assessment <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Self-Assessment</Badge>
                <span className="text-xs flex items-center gap-1 text-gray-500">
                  <Clock className="h-3 w-3" /> 10 minutes
                </span>
              </div>
              <CardTitle className="mt-2">Well-Being Index</CardTitle>
              <CardDescription>Assess your overall mental wellness</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600">
                A holistic evaluation of your emotional, psychological, and social well-being factors.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-[#9b87f5] to-[#8b77e5] hover:from-[#8b77e5] hover:to-[#7b67d5] group"
                onClick={() => handleAssessmentStart("Well-Being")}
              >
                Start Assessment <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8 bg-[#9b87f5]/10 p-5 rounded-lg border border-[#9b87f5]/30">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="p-3 rounded-full bg-[#9b87f5]/20">
              <BarChart4 className="h-6 w-6 text-[#9b87f5]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Track Your Progress</h3>
              <p className="text-gray-600 mt-1 mb-3">
                Regular assessments can help you and your healthcare providers monitor changes in your mental health over time.
                We recommend taking these assessments every 2-4 weeks.
              </p>
              <Button 
                variant="outline" 
                className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/5"
                onClick={() => {
                  toast({
                    title: "Assessment History",
                    description: "Loading your previous assessment results",
                    duration: 2000,
                  });
                }}
              >
                View Your Assessment History
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsTab;
