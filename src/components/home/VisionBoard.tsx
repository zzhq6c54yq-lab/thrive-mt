
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check, ChevronRight, Sparkles, Star, Brain, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface VisionBoardProps {
  selectedQualities: string[];
  selectedGoals: string[];
  onQualityToggle: (id: string) => void;
  onGoalToggle: (id: string) => void;
  onContinue: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const VisionBoard: React.FC<VisionBoardProps> = ({
  selectedQualities,
  selectedGoals,
  onQualityToggle,
  onGoalToggle,
  onContinue,
  onPrevious,
  onSkip
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<'qualities' | 'goals'>('qualities');
  const [animateSelection, setAnimateSelection] = useState<string | null>(null);
  
  const qualities = [
    { id: "peaceful", label: "Peaceful" },
    { id: "mindful", label: "Mindful" },
    { id: "resilient", label: "Resilient" },
    { id: "grateful", label: "Grateful" },
    { id: "balanced", label: "Balanced" },
    { id: "creative", label: "Creative" },
    { id: "empathetic", label: "Empathetic" },
    { id: "focused", label: "Focused" },
    { id: "present", label: "Present" },
    { id: "joyful", label: "Joyful" },
    { id: "energetic", label: "Energetic" }
  ];

  const goals = [
    { id: "reducing-anxiety", label: "Reducing Anxiety" },
    { id: "managing-stress", label: "Managing Stress" },
    { id: "improving-sleep", label: "Improving Sleep" },
    { id: "emotional-regulation", label: "Emotional Regulation" },
    { id: "better-relationships", label: "Better Relationships" },
    { id: "work-life-balance", label: "Work-Life Balance" },
    { id: "finding-purpose", label: "Finding Purpose" },
    { id: "building-confidence", label: "Building Confidence" },
    { id: "setting-boundaries", label: "Setting Boundaries" },
    { id: "career-growth", label: "Career Growth" },
    { id: "health-wellness", label: "Health & Wellness" },
    { id: "overcoming-trauma", label: "Overcoming Trauma" }
  ];

  const handleQualityToggle = (id: string) => {
    setAnimateSelection(id);
    setTimeout(() => setAnimateSelection(null), 600);
    onQualityToggle(id);
  };

  const handleGoalToggle = (id: string) => {
    setAnimateSelection(id);
    setTimeout(() => setAnimateSelection(null), 600);
    onGoalToggle(id);
  };

  const handleGetRecommendations = () => {
    toast({
      title: "Recommendations Ready!",
      description: "Check out your personalized content based on your vision board.",
    });
    navigate('/personalized-content', { state: { qualities: selectedQualities, goals: selectedGoals } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.03%22/></svg>')] opacity-20"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#B87333]/5 to-transparent blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#9b87f5]/5 to-transparent blur-3xl"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="h-6 w-6 text-[#B87333]" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">Create Your Vision Board</h1>
            <Heart className="h-6 w-6 text-[#B87333]" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select qualities you want to embody and goals you want to achieve in your mental wellness journey.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white shadow-md rounded-lg p-2 inline-flex">
            <Button 
              variant={activeCategory === 'qualities' ? "default" : "ghost"} 
              onClick={() => setActiveCategory('qualities')}
              className={activeCategory === 'qualities' ? "bg-[#B87333] hover:bg-[#B87333]/90" : ""}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Qualities
            </Button>
            <Button 
              variant={activeCategory === 'goals' ? "default" : "ghost"} 
              onClick={() => setActiveCategory('goals')}
              className={activeCategory === 'goals' ? "bg-[#B87333] hover:bg-[#B87333]/90" : ""}
            >
              <Star className="mr-2 h-4 w-4" />
              Goals
            </Button>
          </div>
        </div>

        {activeCategory === 'qualities' && (
          <div className="mb-12 animate-fade-in">
            <Card className="border-[#B87333]/20 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#B87333]" />
                  Qualities I Want to Embody
                </CardTitle>
                <CardDescription>
                  Select 3-5 qualities that resonate with who you want to become
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {qualities.map((quality) => (
                    <Button
                      key={quality.id}
                      onClick={() => handleQualityToggle(quality.id)}
                      variant="outline"
                      className={`h-auto py-3 relative transition-all duration-300 ${
                        selectedQualities.includes(quality.id)
                          ? "bg-[#B87333]/10 border-[#B87333] text-[#B87333] shadow-md transform hover:scale-105"
                          : "hover:border-[#B87333]/50 hover:text-[#B87333]/80"
                      } ${
                        animateSelection === quality.id ? "animate-pulse" : ""
                      }`}
                    >
                      {quality.label}
                      {selectedQualities.includes(quality.id) && (
                        <Check className="h-4 w-4 absolute top-1 right-1 text-[#B87333]" />
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <div className="text-sm text-gray-500 mr-auto">
                  Selected: {selectedQualities.length} qualities
                </div>
                <Button 
                  onClick={() => setActiveCategory('goals')} 
                  className="bg-[#B87333] hover:bg-[#B87333]/90"
                >
                  Next: Goals <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeCategory === 'goals' && (
          <div className="mb-12 animate-fade-in">
            <Card className="border-[#B87333]/20 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#B87333]" />
                  Goals I Want to Achieve
                </CardTitle>
                <CardDescription>
                  Select 3-5 goals that you'd like to work on
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {goals.map((goal) => (
                    <Button
                      key={goal.id}
                      onClick={() => handleGoalToggle(goal.id)}
                      variant="outline"
                      className={`h-auto py-3 relative transition-all duration-300 ${
                        selectedGoals.includes(goal.id)
                          ? "bg-[#B87333]/10 border-[#B87333] text-[#B87333] shadow-md transform hover:scale-105"
                          : "hover:border-[#B87333]/50 hover:text-[#B87333]/80"
                      } ${
                        animateSelection === goal.id ? "animate-pulse" : ""
                      }`}
                    >
                      {goal.label}
                      {selectedGoals.includes(goal.id) && (
                        <Check className="h-4 w-4 absolute top-1 right-1 text-[#B87333]" />
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveCategory('qualities')}
                >
                  Back to Qualities
                </Button>
                <div className="text-sm text-gray-500 flex items-center">
                  Selected: {selectedGoals.length} goals
                </div>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Personalized Recommendations Section */}
        <div className="mt-8 mb-12">
          <Card className="border-[#B87333]/20 bg-gradient-to-br from-[#FFFBF7] to-[#F8F1E8] shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Star className="h-6 w-6 text-[#B87333]" />
                Your Personalized Recommendations
              </CardTitle>
              <CardDescription className="text-center">
                Based on your selected qualities and goals, we've prepared personalized content just for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="p-3 bg-[#B87333]/10 rounded-lg text-center">
                    <p className="font-medium text-[#B87333]">Selected Qualities</p>
                    <p className="text-gray-600 text-sm">{selectedQualities.length} qualities</p>
                  </div>
                  <div className="p-3 bg-[#B87333]/10 rounded-lg text-center">
                    <p className="font-medium text-[#B87333]">Selected Goals</p>
                    <p className="text-gray-600 text-sm">{selectedGoals.length} goals</p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGetRecommendations}
                  disabled={selectedQualities.length === 0 && selectedGoals.length === 0}
                  className="w-full max-w-md mt-4 bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white py-6 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full animate-shimmer"></span>
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5 group-hover:animate-spin" />
                    Check Your Personalized Content
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-12">
          <Button onClick={onPrevious} variant="outline">
            Previous
          </Button>
          <Button onClick={onSkip} variant="ghost">
            Skip
          </Button>
          <Button 
            onClick={onContinue}
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;
