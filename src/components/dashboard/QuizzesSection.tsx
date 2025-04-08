
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Brain, ArrowRight, Sparkles, CheckCircle, Clock } from "lucide-react";

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
      ]
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
      ]
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
      ]
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

  // Get category-specific colors and styles
  const getCategoryStyles = (category: string, completionRate?: number) => {
    switch(category) {
      case "mental-health":
        return {
          gradientColors: "from-indigo-500 to-purple-600",
          accentColor: "#8B5CF6",
          bgGradient: "bg-gradient-to-r from-purple-50 to-indigo-50",
          iconBg: "bg-indigo-100",
          iconColor: "text-indigo-500",
          hoverBg: "hover:bg-indigo-50",
          hoverBorder: "group-hover:border-indigo-300",
          progressBg: completionRate ? "bg-gradient-to-r from-indigo-500 to-purple-500" : ""
        };
      case "wellbeing":
        return {
          gradientColors: "from-emerald-500 to-teal-600",
          accentColor: "#10B981",
          bgGradient: "bg-gradient-to-r from-emerald-50 to-teal-50",
          iconBg: "bg-emerald-100",
          iconColor: "text-emerald-500",
          hoverBg: "hover:bg-emerald-50",
          hoverBorder: "group-hover:border-emerald-300",
          progressBg: completionRate ? "bg-gradient-to-r from-emerald-500 to-teal-500" : ""
        };
      default:
        return {
          gradientColors: "from-blue-500 to-cyan-600",
          accentColor: "#3B82F6",
          bgGradient: "bg-gradient-to-r from-blue-50 to-cyan-50",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-500",
          hoverBg: "hover:bg-blue-50",
          hoverBorder: "group-hover:border-blue-300",
          progressBg: completionRate ? "bg-gradient-to-r from-blue-500 to-cyan-500" : ""
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quizzes.map((quiz) => {
          const styles = getCategoryStyles(quiz.category, quiz.completionRate);
          
          return (
            <Card 
              key={quiz.id}
              className="bg-white overflow-hidden hover:shadow-md transition-all cursor-pointer group border border-gray-200 hover:border-gray-300 relative rounded-xl"
            >
              {quiz.image && (
                <div className="h-40 w-full overflow-hidden relative">
                  <img 
                    src={quiz.image} 
                    alt={quiz.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback image if the original fails to load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Floating brain particles for visual interest */}
                  <div className="absolute top-2 right-2 opacity-70">
                    <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  {quiz.category === "mental-health" && (
                    <>
                      <div className="absolute top-8 left-4 animate-pulse opacity-40" style={{animationDuration: '3s'}}>
                        <Sparkles className="h-3 w-3 text-purple-200" />
                      </div>
                      <div className="absolute bottom-10 right-8 animate-pulse opacity-40" style={{animationDuration: '4s'}}>
                        <Sparkles className="h-2 w-2 text-purple-200" />
                      </div>
                    </>
                  )}
                  
                  {/* Time info overlay */}
                  <div className="absolute bottom-3 right-3">
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm py-1 px-2 rounded-full">
                      <Clock className="h-3 w-3 text-white/80" />
                      <span className="text-xs text-white/90">{quiz.timeEstimate}</span>
                    </div>
                  </div>
                  
                  {/* Questions count overlay */}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-black/40 backdrop-blur-sm py-1 px-2 rounded-full">
                      <span className="text-xs text-white/90">{quiz.questions} questions</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div 
                className="h-1.5"
                style={{ background: `linear-gradient(to right, ${styles.accentColor}, ${styles.accentColor}CC)` }}
              ></div>
              
              <CardContent className={`p-4 ${styles.bgGradient}`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800 group-hover:text-[${styles.accentColor}] transition-colors">
                    {quiz.title}
                  </h3>
                  <div className={`p-1.5 rounded-full ${styles.iconBg} group-hover:bg-white transition-colors`}>
                    <Brain className={`h-4 w-4 ${styles.iconColor}`} />
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{quiz.description}</p>
                
                {/* Benefits */}
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-1.5">Benefits:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {quiz.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-1 mt-0.5" style={{color: styles.accentColor}} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {quiz.completionRate ? (
                  <div className="mb-3">
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={styles.progressBg}
                        style={{ width: `${quiz.completionRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span className="text-gray-500">In progress</span>
                      <span style={{color: styles.accentColor}} className="font-medium">{quiz.completionRate}%</span>
                    </div>
                  </div>
                ) : null}
                
                <Button
                  variant="ghost" 
                  size="sm"
                  className={`w-full justify-between border border-gray-200 ${styles.hoverBg} hover:text-[${styles.accentColor}] ${styles.hoverBorder} transition-all`}
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
          );
        })}
      </div>
      
      <div className="flex justify-center pt-4">
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
