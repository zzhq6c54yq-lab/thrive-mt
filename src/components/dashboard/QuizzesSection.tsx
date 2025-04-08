
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
      accentColor: "border-[#B87333]",
      icon: <Brain className="h-5 w-5 text-[#B87333]" />,
      gradientFrom: "from-[#1a0d29]",
      gradientTo: "to-[#2d1a46]",
      popular: false
    },
    {
      id: "stress-check",
      title: "Stress Check",
      questions: 8,
      timeEstimate: "3-5 min",
      completionRate: 25,
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=500&q=80",
      accentColor: "border-[#E5C5A1]",
      icon: <Lightbulb className="h-5 w-5 text-[#E5C5A1]" />,
      popular: true,
      gradientFrom: "from-[#1a0d29]",
      gradientTo: "to-[#2d1a46]"
    },
    {
      id: "sleep-quality",
      title: "Sleep Quality Index",
      questions: 10,
      timeEstimate: "4-6 min",
      image: "https://images.unsplash.com/photo-1585645568795-f2d004bff7e8?auto=format&fit=crop&w=500&q=80",
      accentColor: "border-[#B87333]/80",
      icon: <LineChart className="h-5 w-5 text-[#B87333]/80" />,
      gradientFrom: "from-[#1a0d29]",
      gradientTo: "to-[#2d1a46]",
      popular: false
    },
    {
      id: "relationship-health",
      title: "Relationship Health Check",
      questions: 15,
      timeEstimate: "6-8 min",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
      accentColor: "border-[#E5C5A1]/80",
      icon: <Heart className="h-5 w-5 text-[#E5C5A1]/80" />,
      gradientFrom: "from-[#1a0d29]",
      gradientTo: "to-[#2d1a46]",
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizzes.map((quiz) => (
          <Card 
            key={quiz.id}
            onClick={() => handleQuizClick(quiz.id, quiz.title)}
            className="overflow-hidden hover:shadow-2xl shadow-lg shadow-black/20 transition-all cursor-pointer group border-0 rounded-xl transform hover:scale-[1.02]"
          >
            <div className="relative h-80 flex flex-col">
              {/* Top section with title */}
              <div className={`bg-gradient-to-r ${quiz.gradientFrom} ${quiz.gradientTo} border-b ${quiz.accentColor} px-4 py-4`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-lg">
                    {quiz.title}
                  </h3>
                  <div className="p-1.5 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/10 backdrop-blur-sm border border-[#B87333]/30">
                    {quiz.icon}
                  </div>
                </div>
                
                {quiz.popular && (
                  <div className="absolute top-3 right-12 z-10 bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Quiz metadata badges */}
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm py-1 px-2 rounded-full border border-[#B87333]/20">
                    <Brain className="h-3 w-3 text-[#E5C5A1]/80" />
                    <span className="text-xs text-white/90">{quiz.questions} questions</span>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm py-1 px-2 rounded-full border border-[#E5C5A1]/20">
                    <Clock className="h-3 w-3 text-[#B87333]/80" />
                    <span className="text-xs text-white/90">{quiz.timeEstimate}</span>
                  </div>
                </div>
              </div>
              
              {/* Bottom section with button */}
              <div className={`bg-gradient-to-r ${quiz.gradientFrom} ${quiz.gradientTo} border-t ${quiz.accentColor} px-4 py-4`}>
                <Button
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-between border border-[#B87333]/30 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:bg-[#B87333]/10 hover:text-white transition-all group"
                >
                  <span>{quiz.completionRate ? "Continue" : "Start"} Assessment</span>
                  <ArrowRight className="h-4 w-4 text-[#E5C5A1] group-hover:translate-x-1 transition-transform" />
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
          className="border-[#B87333]/30 bg-gradient-to-r from-transparent to-transparent hover:from-[#B87333]/10 hover:to-[#E5C5A1]/10 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]"
        >
          View More Assessments
          <ArrowRight className="ml-2 h-4 w-4 text-[#E5C5A1]" />
        </Button>
      </div>
    </div>
  );
};

export default QuizzesSection;
