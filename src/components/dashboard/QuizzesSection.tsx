
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Clock,
  Star,
  BookOpen,
  Award,
  Zap,
  LineChart,
  Lightbulb,
  Heart
} from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  questions: number;
  timeEstimate: string;
  completionRate?: number;
  image?: string;
  accentColor: string;
  icon: React.ReactNode;
  popular?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
}

const QuizzesSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const quizzes: Quiz[] = [
    {
      id: "anxiety-assessment",
      title: "Anxiety Assessment",
      questions: 12,
      timeEstimate: "5-7 min",
      image: "https://images.unsplash.com/photo-1517837314158-c0af6f92b2d3?auto=format&fit=crop&w=500&q=80",
      accentColor: "border-indigo-500",
      icon: <Brain className="h-5 w-5 text-indigo-500" />,
      gradientFrom: "from-indigo-700",
      gradientTo: "to-indigo-900",
      popular: false
    },
    {
      id: "stress-check",
      title: "Stress Check",
      questions: 8,
      timeEstimate: "3-5 min",
      completionRate: 25,
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=500&q=80",
      accentColor: "border-emerald-500",
      icon: <Lightbulb className="h-5 w-5 text-emerald-500" />,
      popular: true,
      gradientFrom: "from-emerald-700",
      gradientTo: "to-emerald-900"
    },
    {
      id: "sleep-quality",
      title: "Sleep Quality Index",
      questions: 10,
      timeEstimate: "4-6 min",
      image: "https://images.unsplash.com/photo-1585645568795-f2d004bff7e8?auto=format&fit=crop&w=500&q=80",
      accentColor: "border-blue-500",
      icon: <LineChart className="h-5 w-5 text-blue-500" />,
      gradientFrom: "from-blue-700",
      gradientTo: "to-blue-900",
      popular: false
    },
    {
      id: "relationship-health",
      title: "Relationship Health Check",
      questions: 15,
      timeEstimate: "6-8 min",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
      accentColor: "border-pink-500",
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      gradientFrom: "from-pink-700",
      gradientTo: "to-pink-900",
      popular: false
    }
  ];

  const handleQuizClick = (quizId: string, quizTitle: string) => {
    toast({
      title: `Starting ${quizTitle}`,
      description: "Preparing your assessment...",
      duration: 1500,
    });
    
    const assessmentTypeMap: Record<string, string> = {
      "anxiety-assessment": "anxiety",
      "stress-check": "stress",
      "sleep-quality": "wellbeing",
      "relationship-health": "relationships"
    };
    
    const assessmentType = assessmentTypeMap[quizId] || quizId;
    
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

  const getDefaultImage = (quizId: string) => {
    switch(quizId) {
      case 'anxiety-assessment':
        return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80';
      case 'stress-check':
        return 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80';
      case 'sleep-quality':
        return 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80';
      case 'relationship-health':
        return 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizzes.map((quiz) => (
          <Card 
            key={quiz.id}
            onClick={() => handleQuizClick(quiz.id, quiz.title)}
            className="overflow-hidden hover:shadow-md transition-all cursor-pointer group border-0 rounded-xl transform hover:scale-[1.02]"
          >
            <div className="relative h-80 flex flex-col">
              {/* Top section with title */}
              <div className={`bg-gradient-to-r ${quiz.gradientFrom || 'from-purple-700'} ${quiz.gradientTo || 'to-purple-900'} px-4 py-3`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white text-lg drop-shadow-md">
                    {quiz.title}
                  </h3>
                  <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                    {quiz.icon}
                  </div>
                </div>
                
                {quiz.popular && (
                  <div className="absolute top-3 right-12 z-10 bg-[#D946EF] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    Popular
                  </div>
                )}
              </div>
              
              {/* Middle image section */}
              <div className="flex-grow relative">
                <img 
                  src={quiz.image || getDefaultImage(quiz.id)} 
                  alt={quiz.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = getDefaultImage(quiz.id);
                  }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Quiz metadata badges */}
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm py-1 px-2 rounded-full">
                    <Brain className="h-3 w-3 text-white/80" />
                    <span className="text-xs text-white/90">{quiz.questions} questions</span>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm py-1 px-2 rounded-full">
                    <Clock className="h-3 w-3 text-white/80" />
                    <span className="text-xs text-white/90">{quiz.timeEstimate}</span>
                  </div>
                </div>
              </div>
              
              {/* Bottom section with button */}
              <div className={`bg-gradient-to-r ${quiz.gradientFrom || 'from-purple-700'} ${quiz.gradientTo || 'to-purple-900'} px-4 py-3`}>
                <Button
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-between border border-white/20 text-white hover:bg-white/10 hover:text-white transition-all"
                >
                  <span>{quiz.completionRate ? "Continue" : "Start"} Assessment</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
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
