
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Brain, ArrowRight, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: number;
  timeEstimate: string;
  completionRate?: number;
  coverImage: string;
  color: string;
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
      coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      color: "from-purple-600 to-violet-400"
    },
    {
      id: "stress-check",
      title: "Stress Check",
      description: "Quickly assess your stress levels and identify main stressors.",
      category: "wellbeing",
      questions: 8,
      timeEstimate: "3-5 min",
      completionRate: 25,
      coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-500 to-sky-400"
    },
    {
      id: "sleep-quality",
      title: "Sleep Quality Index",
      description: "Evaluate sleep patterns and get recommendations for improvement.",
      category: "wellbeing",
      questions: 10,
      timeEstimate: "4-6 min",
      coverImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      color: "from-indigo-600 to-indigo-400"
    }
  ];

  const handleQuizClick = (quizId: string, quizTitle: string) => {
    toast({
      title: `Starting ${quizTitle}`,
      description: "Loading your assessment...",
      duration: 1500,
    });
    
    // Navigate directly to the assessment instead of the assessment page
    navigate(`/mental-wellness/assessments/${quizId}`, { 
      state: { 
        quizId, 
        quizTitle,
        preventTutorial: true,
        fromQuizCard: true,
        startAssessment: true
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
        preventTutorial: true,
        directToAssessment: true
      } 
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <motion.div
            key={quiz.id}
            className="relative cursor-pointer"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleQuizClick(quiz.id, quiz.title)}
          >
            <Card className="overflow-hidden border border-gray-200 h-full bg-white/90 backdrop-blur shadow-sm hover:shadow-md transition-all group">
              <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gradient-to-b ${quiz.color}"></div>
              <div className="h-36 relative overflow-hidden">
                <img 
                  src={quiz.coverImage} 
                  alt={quiz.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end">
                  {quiz.completionRate && quiz.completionRate > 0 ? (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      In progress
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                      <Brain className="h-3 w-3 mr-1" />
                      Assessment
                    </span>
                  )}
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {quiz.timeEstimate}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#8B5CF6] transition-colors text-lg">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{quiz.description}</p>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <span>{quiz.questions} questions</span>
                  <div className="flex items-center">
                    <Brain className="h-3.5 w-3.5 mr-1 text-[#8B5CF6]" />
                    <span>{quiz.category === 'mental-health' ? 'Mental Health' : 'Wellbeing'}</span>
                  </div>
                </div>
                
                {quiz.completionRate ? (
                  <div className="mb-3">
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${quiz.color}`}
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
                  size="sm"
                  className={`w-full mt-2 bg-gradient-to-r ${quiz.color} hover:opacity-90 text-white`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuizClick(quiz.id, quiz.title);
                  }}
                >
                  {quiz.completionRate ? "Continue Assessment" : "Start Assessment"}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
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
