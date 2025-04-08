
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Brain, ArrowRight } from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: number;
  timeEstimate: string;
  completionRate?: number;
  image?: string;
}

const QuizzesSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const quizzes: Quiz[] = [
    {
      id: "anxiety-assessment",
      title: "Anxiety Assessment",
      description: "Understand your anxiety levels and get personalized coping strategies.",
      category: "mental-health",
      questions: 12,
      timeEstimate: "5-7 min",
      image: "https://images.unsplash.com/photo-1517837314158-c0af6f92b2d3?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: "stress-check",
      title: "Stress Check",
      description: "Quickly assess your stress levels and identify main stressors.",
      category: "wellbeing",
      questions: 8,
      timeEstimate: "3-5 min",
      completionRate: 25,
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: "sleep-quality",
      title: "Sleep Quality Index",
      description: "Evaluate sleep patterns and get recommendations for improvement.",
      category: "wellbeing",
      questions: 10,
      timeEstimate: "4-6 min",
      image: "https://images.unsplash.com/photo-585645568795-f2d004bff7e8?auto=format&fit=crop&w=500&q=80"
    }
  ];

  const handleQuizClick = (quizId: string, quizTitle: string) => {
    toast({
      title: `Starting ${quizTitle}`,
      description: "Preparing your assessment...",
      duration: 1500,
    });
    
    // For better alignment with our military-oriented assessments
    const assessmentTypeMap: Record<string, string> = {
      "anxiety-assessment": "anxiety",
      "stress-check": "stress",
      "sleep-quality": "wellbeing"
    };
    
    const assessmentType = assessmentTypeMap[quizId] || quizId;
    
    // Navigate to the mental wellness assessments page
    navigate("/mental-wellness", { 
      state: { 
        activeTab: "assessments",
        preventTutorial: true,
        openAssessment: true,
        assessmentType,
        assessmentTitle: quizTitle
      } 
    });
  };

  const handleViewMoreClick = () => {
    toast({
      title: "Loading Assessments",
      description: "Taking you to the assessment library",
      duration: 1500,
    });
    
    navigate("/mental-wellness", { 
      state: { 
        activeTab: "assessments",
        preventTutorial: true 
      } 
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <Card 
            key={quiz.id}
            className="bg-white overflow-hidden hover:shadow-md transition-all cursor-pointer group border border-gray-200 relative"
          >
            {quiz.image && (
              <div className="h-32 w-full overflow-hidden">
                <img 
                  src={quiz.image} 
                  alt={quiz.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback image if the original fails to load
                    e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500&q=80";
                  }}
                />
              </div>
            )}
            <div 
              className="h-2 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]"
            ></div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 group-hover:text-[#8B5CF6] transition-colors">
                  {quiz.title}
                </h3>
                <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-purple-100 transition-colors">
                  <Brain className="h-4 w-4 text-gray-500 group-hover:text-[#8B5CF6]" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{quiz.description}</p>
              
              <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                <span>{quiz.questions} questions</span>
                <span>{quiz.timeEstimate}</span>
              </div>
              
              {quiz.completionRate ? (
                <div className="mb-3">
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]" 
                      style={{ width: `${quiz.completionRate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span className="text-gray-500">In progress</span>
                    <span className="text-[#8B5CF6] font-medium">{quiz.completionRate}%</span>
                  </div>
                </div>
              ) : null}
              
              <Button
                variant="ghost" 
                size="sm"
                className="w-full justify-between border border-gray-200 hover:bg-[#8B5CF6]/5 hover:text-[#8B5CF6] group-hover:border-[#8B5CF6]/30 transition-all"
                onClick={() => handleQuizClick(quiz.id, quiz.title)}
              >
                <span>{quiz.completionRate ? "Continue" : "Start"} Assessment</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
            
            {/* Add an overlay that makes the entire card clickable */}
            <div 
              className="absolute inset-0 cursor-pointer z-10"
              onClick={() => handleQuizClick(quiz.id, quiz.title)}
              aria-label={`Start ${quiz.title} assessment`}
            >
              <span className="sr-only">Start {quiz.title}</span>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center pt-2">
        <Button 
          variant="outline"
          onClick={handleViewMoreClick}
          className="border-[#8B5CF6]/30 text-[#8B5CF6] hover:bg-[#8B5CF6]/5"
        >
          View More Assessments
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuizzesSection;
