
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FirstRespondersAssessments: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const assessments = [
    {
      title: "Critical Incident Stress Assessment",
      description: "Evaluate stress levels after traumatic calls and get personalized support recommendations.",
      duration: "5 minutes",
      questions: "20 questions"
    },
    {
      title: "Burnout & Compassion Fatigue",
      description: "Assess signs of burnout and compassion fatigue specific to emergency service work.",
      duration: "4 minutes",
      questions: "15 questions"
    },
    {
      title: "PTSD Screening",
      description: "Evidence-based screening for post-traumatic stress in first responders.",
      duration: "6 minutes",
      questions: "25 questions"
    },
    {
      title: "Shift Wellness Check",
      description: "Quick assessment of physical and mental wellness during active duty periods.",
      duration: "3 minutes",
      questions: "12 questions"
    }
  ];

  const handleStartAssessment = (title: string) => {
    toast({
      title: "Starting Assessment",
      description: `Beginning ${title}...`,
      duration: 2000
    });
    navigate("/app/mental-wellness/assessments");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">First Responder Assessments</h2>
        <p className="text-white/70">
          Evidence-based assessments designed specifically for the unique challenges faced by emergency service personnel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((assessment, index) => (
          <Card key={index} className="bg-[#141921] border-red-900/30 hover:border-red-700/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-red-900/20 rounded-lg">
                  <ClipboardList className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{assessment.title}</h3>
              </div>
              <p className="text-white/70 mb-4 text-sm">{assessment.description}</p>
              <div className="flex justify-between text-white/50 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{assessment.duration}</span>
                </div>
                <span>{assessment.questions}</span>
              </div>
              <Button 
                className="w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => handleStartAssessment(assessment.title)}
              >
                Begin Assessment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FirstRespondersAssessments;
