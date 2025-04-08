
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
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
  Lightbulb
} from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: number;
  timeEstimate: string;
  completionRate?: number;
  image?: string;
  benefits: string[];
  accentColor: string;
  icon: React.ReactNode;
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
      image: "https://images.unsplash.com/photo-1517837314158-c0af6f92b2d3?auto=format&fit=crop&w=500&q=80",
      benefits: [
        "Identify anxiety triggers",
        "Get personalized coping techniques",
        "Track progress over time"
      ],
      accentColor: "border-indigo-500",
      icon: <Brain className="h-5 w-5 text-indigo-500" />
    },
    {
      id: "stress-check",
      title: "Stress Check",
      description: "Quickly assess your stress levels and identify main stressors.",
      category: "wellbeing",
      questions: 8,
      timeEstimate: "3-5 min",
      completionRate: 25,
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=500&q=80",
      benefits: [
        "Discover key stressors",
        "Learn stress management techniques",
        "Create a personalized stress plan"
      ],
      accentColor: "border-emerald-500",
      icon: <Lightbulb className="h-5 w-5 text-emerald-500" />
    },
    {
      id: "sleep-quality",
      title: "Sleep Quality Index",
      description: "Evaluate sleep patterns and get recommendations for improvement.",
      category: "wellbeing",
      questions: 10,
      timeEstimate: "4-6 min",
      image: "https://images.unsplash.com/photo-1585645568795-f2d004bff7e8?auto=format&fit=crop&w=500&q=80",
      benefits: [
        "Analyze sleep patterns",
        "Identify sleep disruptors",
        "Get customized sleep improvement tips"
      ],
      accentColor: "border-blue-500",
      icon: <LineChart className="h-5 w-5 text-blue-500" />
    },
    {
      id: "relationship-health",
      title: "Relationship Health Check",
      description: "Assess the health of your relationships and get improvement tips.",
      category: "relationships",
      questions: 15,
      timeEstimate: "6-8 min",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
      benefits: [
        "Identify relationship strengths",
        "Target areas for improvement",
        "Find communication strategies"
      ],
      accentColor: "border-pink-500",
      icon: <Heart className="h-5 w-5 text-pink-500" />
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
      "sleep-quality": "wellbeing",
      "relationship-health": "relationships"
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

  // Get fallback image based on category
  const getDefaultImage = (category: string) => {
    switch(category) {
      case 'mental-health':
        return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80';
      case 'wellbeing':
        return 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80';
      case 'coping-strategies':
        return 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80';
      case 'relationships':
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
            className={`overflow-hidden hover:shadow-md transition-all cursor-pointer group border-0 rounded-xl transform hover:scale-[1.02] ${quiz.accentColor} border-l-4`}
          >
            {/* Cover image section */}
            <div className="h-32 w-full overflow-hidden relative">
              <img 
                src={quiz.image || getDefaultImage(quiz.category)} 
                alt={quiz.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback image if the original fails to load
                  e.currentTarget.src = getDefaultImage(quiz.category);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              
              {/* Info badges */}
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm py-1 px-2 rounded-full">
                  <Brain className="h-3 w-3 text-white/80" />
                  <span className="text-xs text-white/90">{quiz.questions} questions</span>
                </div>
              </div>
              <div className="absolute bottom-3 right-3">
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm py-1 px-2 rounded-full">
                  <Clock className="h-3 w-3 text-white/80" />
                  <span className="text-xs text-white/90">{quiz.timeEstimate}</span>
                </div>
              </div>
              
              {quiz.popular && (
                <div className="absolute top-2 right-2 z-10 bg-[#D946EF] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-white" />
                  Popular
                </div>
              )}
            </div>
            
            <CardContent className="p-4 bg-gradient-to-b from-white to-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {quiz.title}
                </h3>
                <div className="p-1.5 rounded-full bg-purple-100 group-hover:bg-white transition-colors">
                  {quiz.icon}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{quiz.description}</p>
              
              {/* Progress bar for in-progress assessments */}
              {quiz.completionRate && (
                <div className="mb-3">
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-[#D946EF]"
                      style={{ width: `${quiz.completionRate}%`, height: '100%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span className="text-gray-500">In progress</span>
                    <span className="text-purple-600 font-medium">{quiz.completionRate}%</span>
                  </div>
                </div>
              )}
              
              <div className="mt-auto">
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-between border border-gray-200 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all"
                  >
                    <span>{quiz.completionRate ? "Continue" : "Start"} Assessment</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
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
