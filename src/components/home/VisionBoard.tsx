
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Sparkles, Heart, Brain, Target, Star, Lightbulb, ArrowRight } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<'qualities' | 'goals'>('qualities');
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);
  const [showInspirationMsg, setShowInspirationMsg] = useState(false);
  const [inspirationMessages, setInspirationMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const qualities = [
    { id: "peaceful", label: "Peaceful", icon: "🕊️", description: "Finding inner calm amidst life's storms" },
    { id: "mindful", label: "Mindful", icon: "🧠", description: "Present in each moment, aware of your thoughts" },
    { id: "resilient", label: "Resilient", icon: "🌱", description: "Bouncing back stronger from challenges" },
    { id: "grateful", label: "Grateful", icon: "🙏", description: "Appreciating the gifts in your life" },
    { id: "balanced", label: "Balanced", icon: "⚖️", description: "Finding harmony in all life dimensions" },
    { id: "creative", label: "Creative", icon: "🎨", description: "Expressing yourself in unique ways" },
    { id: "empathetic", label: "Empathetic", icon: "💗", description: "Understanding others with compassion" },
    { id: "focused", label: "Focused", icon: "🎯", description: "Directing your energy with intention" },
    { id: "present", label: "Present", icon: "⏱️", description: "Fully engaged in the here and now" },
    { id: "joyful", label: "Joyful", icon: "😊", description: "Finding delight in everyday moments" },
    { id: "energetic", label: "Energetic", icon: "⚡", description: "Living with vibrance and enthusiasm" }
  ];

  const goals = [
    { id: "reducing-anxiety", label: "Reducing Anxiety", icon: "🌈", description: "Finding peace when worry creeps in" },
    { id: "managing-stress", label: "Managing Stress", icon: "🌊", description: "Flowing with life's pressure points" },
    { id: "improving-sleep", label: "Improving Sleep", icon: "💤", description: "Restful nights for energized days" },
    { id: "emotional-regulation", label: "Emotional Regulation", icon: "🎭", description: "Mastering your emotional responses" },
    { id: "better-relationships", label: "Better Relationships", icon: "🤝", description: "Nurturing connections that matter" },
    { id: "work-life-balance", label: "Work-Life Balance", icon: "⚖️", description: "Harmony between ambition and wellbeing" },
    { id: "finding-purpose", label: "Finding Purpose", icon: "🧭", description: "Discovering what makes your soul sing" },
    { id: "building-confidence", label: "Building Confidence", icon: "💪", description: "Strengthening your self-belief" },
    { id: "setting-boundaries", label: "Setting Boundaries", icon: "🛡️", description: "Protecting your energy and values" },
    { id: "career-growth", label: "Career Growth", icon: "📈", description: "Advancing your professional journey" },
    { id: "health-wellness", label: "Health & Wellness", icon: "🌿", description: "Nurturing your body and mind" },
    { id: "overcoming-trauma", label: "Overcoming Trauma", icon: "🌄", description: "Healing past wounds for future growth" }
  ];

  const inspirations = [
    "Your vision board is a map to your future self!",
    "Each quality you choose plants a seed of growth.",
    "These goals aren't just dreams - they're your destination.",
    "Your future self is cheering you on right now!",
    "Every selection is a step toward the person you're becoming.",
    "You're designing your life with intention - how powerful!",
    "Small choices today create big changes tomorrow.",
    "Your vision board is as unique as your fingerprint.",
    "The qualities you select today shape who you'll be tomorrow.",
    "Your journey is yours alone - make it magnificent!"
  ];

  // Show a random inspiration message occasionally
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomMessage = inspirations[Math.floor(Math.random() * inspirations.length)];
        if (!inspirationMessages.includes(randomMessage)) {
          setInspirationMessages(prev => [randomMessage, ...prev].slice(0, 3));
          setShowInspirationMsg(true);
          setTimeout(() => setShowInspirationMsg(false), 4000);
        }
      }
    }, 8000);
    
    return () => clearInterval(timer);
  }, [inspirationMessages]);

  const handleToggle = (id: string, type: 'quality' | 'goal') => {
    setAnimatingCard(id);
    setTimeout(() => setAnimatingCard(null), 600);
    
    if (type === 'quality') {
      onQualityToggle(id);
    } else {
      onGoalToggle(id);
    }

    // Show toast for added items
    if ((type === 'quality' && !selectedQualities.includes(id)) || 
        (type === 'goal' && !selectedGoals.includes(id))) {
      toast({
        title: "Added to your vision board!",
        description: `This ${type} will help personalize your experience.`,
        duration: 2000,
      });
    }
  };

  const navToPersonalized = () => {
    toast({
      title: "Heading to your personalized content",
      description: "Taking you to content tailored just for you",
      duration: 2000,
    });
    navigate("/personalized-content", { state: { qualities: selectedQualities, goals: selectedGoals } });
  };

  // Get color classes based on selection
  const getCardClasses = (id: string, selectedItems: string[]) => {
    const isSelected = selectedItems.includes(id);
    const isAnimating = animatingCard === id;
    
    let classes = "relative rounded-xl border p-4 transition-all duration-300 cursor-pointer transform shadow-sm ";
    
    if (isAnimating && isSelected) {
      classes += "scale-110 shadow-lg animate-pulse ";
    } else if (isSelected) {
      classes += "bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/20 border-[#B87333] scale-105 shadow-md ";
    } else {
      classes += "hover:scale-105 hover:shadow-md bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 ";
    }
    
    return classes;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#32325e] to-[#16213e] py-10 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-50">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-[#B87333]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] right-[10%] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[30%] w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[60%] right-[25%] w-40 h-40 bg-[#B87333]/15 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#E5C5A1] to-[#B87333] animate-pulse">
            Create Your Vision Board
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Select the qualities you want to embody and goals you want to achieve on your mental wellness journey.
            Make this vision board your own personal roadmap to transformation!
          </p>
          
          {/* Inspiration message toast */}
          <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#B87333]/90 to-[#E5C5A1]/90 text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-md transition-all duration-500 z-50 max-w-md ${showInspirationMsg ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <p className="text-white font-medium text-sm">{inspirationMessages[0]}</p>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl mb-8 p-1 flex gap-1 max-w-xs mx-auto">
          <button
            onClick={() => setActiveTab('qualities')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'qualities' 
                ? 'bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white shadow-md' 
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <Star className={`h-4 w-4 ${activeTab === 'qualities' ? 'text-white' : 'text-[#B87333]'}`} />
            <span className="font-medium">Qualities</span>
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'goals' 
                ? 'bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white shadow-md' 
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            <Target className={`h-4 w-4 ${activeTab === 'goals' ? 'text-white' : 'text-[#B87333]'}`} />
            <span className="font-medium">Goals</span>
          </button>
        </div>

        {/* Selection counter */}
        <div className="mb-6 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
            <span className="font-medium">
              {activeTab === 'qualities' 
                ? `${selectedQualities.length} of ${qualities.length} qualities selected` 
                : `${selectedGoals.length} of ${goals.length} goals selected`}
            </span>
          </div>
        </div>

        {/* Qualities Tab Content */}
        {activeTab === 'qualities' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {qualities.map((quality) => (
                <div 
                  key={quality.id}
                  onClick={() => handleToggle(quality.id, 'quality')}
                  className={getCardClasses(quality.id, selectedQualities)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{quality.icon}</div>
                    <h3 className={`text-lg font-medium mb-1 ${
                      selectedQualities.includes(quality.id) ? "text-[#B87333]" : "text-white/90"
                    }`}>
                      {quality.label}
                    </h3>
                    <p className="text-xs text-white/60">{quality.description}</p>
                  </div>
                  
                  {selectedQualities.includes(quality.id) && (
                    <div className="absolute -top-2 -right-2 bg-[#B87333] rounded-full p-1 shadow-lg animate-pulse">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Goals Tab Content */}
        {activeTab === 'goals' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {goals.map((goal) => (
                <div 
                  key={goal.id}
                  onClick={() => handleToggle(goal.id, 'goal')}
                  className={getCardClasses(goal.id, selectedGoals)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{goal.icon}</div>
                    <h3 className={`text-lg font-medium mb-1 ${
                      selectedGoals.includes(goal.id) ? "text-[#B87333]" : "text-white/90"
                    }`}>
                      {goal.label}
                    </h3>
                    <p className="text-xs text-white/60">{goal.description}</p>
                  </div>
                  
                  {selectedGoals.includes(goal.id) && (
                    <div className="absolute -top-2 -right-2 bg-[#B87333] rounded-full p-1 shadow-lg animate-pulse">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Button navigation */}
        <div className="flex flex-wrap justify-between mt-12 gap-4">
          <Button 
            onClick={onPrevious} 
            variant="outline" 
            className="bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
          >
            Previous
          </Button>
          
          <Button 
            onClick={onSkip} 
            variant="ghost" 
            className="text-white/60 hover:text-white hover:bg-white/5"
          >
            Skip
          </Button>
          
          <Button 
            onClick={onContinue}
            className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continue
          </Button>
        </div>

        {/* Personalized recommendations footer */}
        <div className="mt-16 bg-gradient-to-r from-[#1a1a2e]/60 to-[#32325e]/60 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl animate-pulse">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] p-3 rounded-full shadow-lg">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">See Your Personalized Recommendations</h3>
                <p className="text-white/70">We've crafted unique content based on your selections</p>
              </div>
            </div>
            <Button 
              onClick={navToPersonalized}
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] shadow-lg group transition-all duration-300"
            >
              Visit Personalized Content
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;
