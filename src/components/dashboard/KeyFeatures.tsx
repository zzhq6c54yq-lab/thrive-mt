import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, BookOpen, Brain, BarChart3, Video, Calendar, Headphones,
  BookText, Sparkles, MessageCircle, Leaf, Rocket, Globe, Heart, Users, HandHeart
} from "lucide-react";

interface KeyFeaturesProps {
  navigateToFeature: (path: string) => void;
  selectedQualities?: string[];
  selectedGoals?: string[];
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ 
  navigateToFeature,
  selectedQualities = [],
  selectedGoals = []
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  const isRecommended = (feature: string) => {
    const featureMap: { [key: string]: string[] } = {
      "progress-reports": ["consistency", "data-driven", "reflective", "goal-oriented"],
      "family-resources": ["supportive", "family-oriented", "compassionate", "community"],
      "mental-wellness": ["mindful", "balanced", "wellness-focused", "creative"],
      "games": ["curious", "analytical", "intellectual", "playful"],
      "physical-wellness": ["active", "energetic", "disciplined", "health-conscious"],
      "community-support": ["social", "collaborative", "communicative", "empathetic"],
      "video-diary": ["reflective", "expressive", "authentic", "introspective"],
      "wellness-challenges": ["motivated", "disciplined", "competitive", "growth-focused"],
      "resource-library": ["curious", "informed", "analytical", "studious"],
      "sponsor-alternative": ["supportive", "recovery-focused", "accountable", "healing"],
      "binaural-beats": ["mindful", "experimental", "relaxation-focused", "open-minded"],
      "workshops": ["engaged", "learning-oriented", "growth-focused", "curious"],
      "journaling": ["reflective", "expressive", "creative", "introspective"],
      "real-time-therapy": ["communicative", "open", "healing-focused", "expressive"],
      "holistic-wellness": ["balanced", "holistic", "natural", "wellness-focused"],
      "alternative-therapies": ["experimental", "open-minded", "holistic", "healing-focused"]
    };
    
    const qualityMatch = selectedQualities.some(quality => 
      featureMap[feature] && featureMap[feature].includes(quality.toLowerCase())
    );
    
    const goalMatch = selectedGoals.some(goal => 
      goal.toLowerCase().includes(feature.replace('-', ' '))
    );
    
    return qualityMatch || goalMatch;
  };
  
  const handleNavigate = (path: string) => {
    toast({
      title: isSpanish ? "Navegando..." : "Navigating...",
      description: isSpanish ? "Cargando recurso solicitado" : "Loading requested resource",
      duration: 1500,
    });
    
    navigate(path, { 
      state: { 
        from: window.location.pathname,
        qualities: selectedQualities, 
        goals: selectedGoals 
      }
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const features = [
    {
      id: "progress-reports",
      title: "Progress Reports",
      icon: <BarChart3 />,
      path: "/progress-reports",
      color: "from-purple-600 to-blue-600",
      description: "Track your mental wellness journey"
    },
    {
      id: "family-resources",
      title: "Family Resources",
      icon: <HandHeart />,
      path: "/family-resources",
      color: "from-pink-600 to-purple-600",
      description: "Support for you and your loved ones"
    },
    {
      id: "mental-wellness",
      title: "Mental Wellness",
      icon: <BookOpen />,
      path: "/mental-wellness",
      color: "from-blue-600 to-indigo-600",
      description: "Tools and assessments for your wellbeing"
    },
    {
      id: "games",
      title: "Brain Games",
      icon: <Brain />,
      path: "/games-and-quizzes",
      color: "from-orange-600 to-red-600",
      description: "Fun activities to engage your mind"
    },
    {
      id: "video-diary",
      title: "Video Diary",
      icon: <Video />,
      path: "/video-diary",
      color: "from-amber-500 to-orange-600",
      description: "Record and reflect on your journey"
    },
    {
      id: "wellness-challenges",
      title: "Wellness Challenges",
      icon: <Activity />,
      path: "/wellness-challenges",
      color: "from-emerald-600 to-green-600",
      description: "Daily challenges to boost wellbeing"
    },
    {
      id: "resource-library",
      title: "Resource Library",
      icon: <BookText />,
      path: "/resource-library",
      color: "from-cyan-600 to-blue-600",
      description: "Extensive collection of helpful materials"
    },
    {
      id: "sponsor-alternative",
      title: "My Sponsor",
      icon: <Users />,
      path: "/my-sponsor",
      color: "from-rose-600 to-pink-600",
      description: "Support for your recovery journey"
    },
    {
      id: "binaural-beats",
      title: "Binaural Beats",
      icon: <Headphones />,
      path: "/binaural-beats",
      color: "from-violet-600 to-purple-600",
      description: "Audio therapy for relaxation"
    },
    {
      id: "workshops",
      title: "Workshops",
      icon: <Calendar />,
      path: "/workshops",
      color: "from-emerald-600 to-teal-600",
      description: "Interactive sessions with professionals"
    },
    {
      id: "journaling",
      title: "Journaling",
      icon: <BookText />,
      path: "/journaling",
      color: "from-blue-600 to-cyan-600",
      description: "Express thoughts and track emotions"
    },
    {
      id: "mindfulness",
      title: "Mindfulness & Sleep",
      icon: <Sparkles />,
      path: "/mindfulness-sleep",
      color: "from-violet-600 to-indigo-600",
      description: "Practices for better rest and awareness"
    },
    {
      id: "real-time-therapy",
      title: "Real-Time Therapy",
      icon: <MessageCircle />,
      path: "/real-time-therapy",
      color: "from-red-600 to-rose-600",
      description: "Connect with therapists instantly"
    },
    {
      id: "holistic-wellness",
      title: "Holistic Wellness",
      icon: <Leaf />,
      path: "/holistic-wellness",
      color: "from-green-600 to-lime-600",
      description: "Whole-person approach to wellbeing"
    },
    {
      id: "alternative-therapies",
      title: "Alternative Therapies",
      icon: <Rocket />,
      path: "/alternative-therapies",
      color: "from-teal-600 to-cyan-600",
      description: "Explore innovative healing methods"
    },
    {
      id: "community-support",
      title: "Community Support",
      icon: <Globe />,
      path: "/community-support",
      color: "from-blue-600 to-indigo-600",
      description: "Connect with others on similar journeys"
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-2">
        <div className="p-1.5 rounded-full bg-[#9b87f5]/30">
          <Heart className="h-5 w-5 text-[#9b87f5]" />
        </div>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] via-[#ffffff] to-[#ffffff] border-b-2 border-[#9b87f5]/30 pb-1">
          Key Features
        </span>
      </h2>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feature) => (
          <motion.div 
            key={feature.id}
            variants={item}
            className="relative"
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => handleNavigate(feature.path)}
              className="w-full h-full text-left"
              aria-label={feature.title}
            >
              <div className={`relative overflow-hidden rounded-xl p-4 h-full bg-gradient-to-br ${feature.color} shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="absolute -right-8 -top-8 w-16 h-16 rounded-full bg-white/10 blur-xl"></div>
                <div className="absolute -left-4 -bottom-4 w-12 h-12 rounded-full bg-white/10 blur-lg"></div>
                
                <div className="flex flex-col h-full z-10 relative">
                  <div className="p-2.5 rounded-full bg-white/20 w-fit mb-3 backdrop-blur-sm">
                    {React.cloneElement(feature.icon, { className: "h-5 w-5 text-white drop-shadow-sm" })}
                  </div>
                  
                  <h3 className="font-bold text-sm text-white mb-1">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xs text-white/80 mb-2 line-clamp-2">
                    {feature.description}
                  </p>
                  
                  {isRecommended(feature.id) && (
                    <div className="mt-auto">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium inline-block">
                        Recommended
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-1.5 right-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
                      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default KeyFeatures;
