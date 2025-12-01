
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Filter, Brain, Star, ArrowRight, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

interface Quiz {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  questionsCount: number;
  timeToComplete: string;
  benefits: string[];
  popular: boolean;
}

interface QuizzesSectionProps {
  quizzes: Quiz[];
  onStartQuiz: (quiz: Quiz) => void;
}

const QuizzesSection: React.FC<QuizzesSectionProps> = ({ 
  quizzes,
  onStartQuiz
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const fromDoD = location.state?.fromSpecializedProgram && location.state?.returnToPortal === "/dod-portal";
  
  // If coming directly from DoD portal with a specific assessment request, show toast
  useEffect(() => {
    if (fromDoD) {
      toast({
        title: "Military Mental Health Assessments",
        description: "Browse our specialized assessments for military personnel and veterans",
        duration: 3000,
      });
    }
  }, [fromDoD, toast]);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Fixed quiz images that were causing issues
  const getDefaultImage = (category: string) => {
    switch(category) {
      case 'mental-health':
        return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80';
      case 'wellbeing':
        return 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80';
      case 'coping-strategies':
        return 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80';
      case 'self-awareness':
        return 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80';
      case 'relationships':
        return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80';
    }
  };

  const handleViewMoreAssessments = () => {
    toast({
      title: "Loading More Assessments",
      description: "Taking you to the full assessment library",
      duration: 2000,
    });
    
    setTimeout(() => {
      navigate("/app/mental-wellness/assessments", { 
        state: { 
          activeTab: "assessments", 
          preventTutorial: true,
          fromSpecializedProgram: location.state?.fromSpecializedProgram,
          returnToPortal: location.state?.returnToPortal
        } 
      });
    }, 500);
  };

  const handleReturnToPortal = () => {
    if (location.state?.returnToPortal) {
      toast({
        title: "Returning to Portal",
        description: "Taking you back to your specialized portal",
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate(location.state.returnToPortal);
      }, 500);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-white/70 p-4 rounded-xl backdrop-blur shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-[#D946EF]/20 to-[#9b87f5]/20">
            <Brain className="h-5 w-5 text-[#D946EF]" />
          </div>
          <span>Mental Health Assessments</span>
        </h2>
        
        {fromDoD && (
          <Button 
            variant="outline" 
            size="sm"
            className="border-blue-500 text-blue-700 hover:bg-blue-50"
            onClick={handleReturnToPortal}
          >
            Return to Military Portal
          </Button>
        )}
      </div>
      
      {quizzes.length === 0 ? (
        <div className="text-center py-10">
          <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">No quizzes found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              variants={item}
              className="group"
            >
              <div className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col cursor-pointer">
                {quiz.popular && (
                  <div className="absolute top-2 right-2 z-10 bg-[#D946EF] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    Popular
                  </div>
                )}
                
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={quiz.image || getDefaultImage(quiz.category)} 
                    alt={quiz.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between text-white">
                      <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
                        <Brain className="h-3 w-3 mr-1" />
                        {quiz.questionsCount} questions
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-[#D946EF] transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-gray-700">Benefits:</div>
                      <div className="text-xs bg-[#D946EF]/10 text-[#D946EF] font-medium px-2 py-0.5 rounded flex items-center">
                        {quiz.timeToComplete}
                      </div>
                    </div>
                    <ul className="text-xs text-gray-600 mb-4">
                      {quiz.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start mb-1">
                          <div className="text-[#D946EF] mr-1 mt-0.5">•</div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full bg-[#D946EF] hover:bg-[#D946EF]/90"
                      onClick={() => onStartQuiz(quiz)}
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      Start Assessment
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="mt-12 text-center">
        <div className="relative inline-block">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#9b87f5] rounded-full blur"></div>
          <Button 
            className="relative bg-white text-[#D946EF] hover:bg-[#D946EF]/10 border border-[#D946EF]/20 shadow-sm px-6"
            onClick={handleViewMoreAssessments}
          >
            <Star className="h-4 w-4 mr-2" />
            View more assessments
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizzesSection;
