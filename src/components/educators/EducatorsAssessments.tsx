
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, ClipboardList, Users, Heart } from "lucide-react";
import ActionButton from "@/components/navigation/ActionButton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EducatorsAssessments: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const assessments = [
    {
      id: "educator-burnout",
      title: "Educator Burnout Assessment",
      description: "Evaluate your current burnout level and receive personalized strategies for recovery and prevention.",
      estimatedTime: "10-12 min",
      icon: Brain,
      category: "Professional Well-being",
      recommended: true,
      path: "/educators-assessments/educator-burnout"
    },
    {
      id: "classroom-stress",
      title: "Classroom Stress Inventory",
      description: "Identify specific classroom situations that trigger stress responses and learn adaptive coping mechanisms.",
      estimatedTime: "8-10 min",
      icon: BookOpen,
      category: "Classroom Management",
      recommended: false,
      path: "/educators-assessments/classroom-stress"
    },
    {
      id: "work-life-balance",
      title: "Work-Life Balance Audit",
      description: "Analyze how effectively you're balancing professional obligations with personal well-being.",
      estimatedTime: "12-15 min",
      icon: ClipboardList,
      category: "Life Balance",
      recommended: false,
      path: "/educators-assessments/work-life-balance"
    },
    {
      id: "collegial-relationships",
      title: "Professional Relationship Assessment",
      description: "Evaluate the health of your professional relationships and identify improvement opportunities.",
      estimatedTime: "8-10 min",
      icon: Users,
      category: "Workplace Dynamics",
      recommended: false,
    },
    {
      id: "selfcare-habits",
      title: "Educator Self-Care Inventory",
      description: "Assess your current self-care practices and discover areas for improvement.",
      estimatedTime: "10-12 min",
      icon: Heart,
      category: "Self-Care",
      recommended: false,
    }
  ];

  const handleStartAssessment = (assessment: any) => {
    if (assessment.path) {
      navigate(assessment.path, { 
        state: { 
          stayInPortal: true,
          preventTutorial: true
        }
      });
    } else {
      toast({
        title: "Coming Soon",
        description: "This assessment will be available in the next update",
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-6 rounded-lg border border-purple-500/30 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Educator Mental Health Assessments</h2>
        <p className="text-gray-200">
          These assessments are designed specifically for education professionals to help identify stressors, evaluate well-being, and provide tailored recommendations for maintaining mental health in educational settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="bg-[#1e1e2f]/80 border-purple-500/20 overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="bg-purple-900/50 p-2 rounded-lg mr-4">
                    <assessment.icon className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{assessment.title}</CardTitle>
                    <CardDescription className="text-gray-300">{assessment.category}</CardDescription>
                  </div>
                </div>
                {assessment.recommended && (
                  <Badge variant="secondary" className="bg-purple-700 text-white">Recommended</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 mb-2">{assessment.description}</p>
              <p className="text-sm text-gray-400">Estimated time: {assessment.estimatedTime}</p>
            </CardContent>
            <CardFooter className="border-t border-purple-500/20 pt-4">
              <button
                onClick={() => handleStartAssessment(assessment)}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded transition-colors"
              >
                Start Assessment
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducatorsAssessments;
