
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, BookOpen, Brain, BarChart3, Video, Calendar, Headphones,
  BookText, Sparkles, MessageCircle, Leaf, Rocket, Globe, Heart, Users, HandHeart, Gamepad
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
    
    // Special handling for games section to ensure proper navigation
    if (path === '/games-and-quizzes' || path === '/mental-health-games' || path === '/cosmic-games') {
      navigate(path, { 
        state: { 
          from: window.location.pathname,
          qualities: selectedQualities, 
          goals: selectedGoals,
          activeTab: path === '/games-and-quizzes' ? "games" : "games" // Ensure games tab is active by default
        }
      });
    } else {
      navigate(path, { 
        state: { 
          from: window.location.pathname,
          qualities: selectedQualities, 
          goals: selectedGoals 
        }
      });
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  // Define the container animation variant
  const container = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Updated feature colors with warmer, more inviting palette
  const features = [
    {
      id: "progress-reports",
      title: "Progress Reports",
      icon: <BarChart3 />,
      path: "/progress-reports",
      color: "from-amber-400 to-amber-600",
      textBgColor: "from-white via-amber-50 to-amber-100",
      description: "Track your mental wellness journey",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "family-resources",
      title: "Family Resources",
      icon: <HandHeart />,
      path: "/family-resources",
      color: "from-rose-400 to-pink-500",
      textBgColor: "from-white via-rose-50 to-rose-100",
      description: "Support for you and your loved ones",
      coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "mental-wellness",
      title: "Mental Wellness",
      icon: <BookOpen />,
      path: "/mental-wellness",
      color: "from-sky-400 to-indigo-500",
      textBgColor: "from-white via-sky-50 to-sky-100",
      description: "Tools and assessments for your wellbeing",
      coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "games",
      title: "Brain Games",
      icon: <Brain />,
      path: "/games-and-quizzes",
      color: "from-orange-400 to-orange-600",
      textBgColor: "from-white via-orange-50 to-orange-100",
      description: "Fun activities to engage your mind",
      coverImage: "https://images.unsplash.com/photo-1596496181871-9681eacf9764?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "video-diary",
      title: "Video Diary",
      icon: <Video />,
      path: "/video-diary",
      color: "from-amber-400 to-orange-500",
      textBgColor: "from-white via-amber-50 to-amber-100",
      description: "Record and reflect on your journey",
      coverImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "wellness-challenges",
      title: "Wellness Challenges",
      icon: <Activity />,
      path: "/wellness-challenges",
      color: "from-lime-400 to-green-500",
      textBgColor: "from-white via-lime-50 to-lime-100",
      description: "Daily challenges to boost wellbeing",
      coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "resource-library",
      title: "Resource Library",
      icon: <BookText />,
      path: "/resource-library",
      color: "from-teal-400 to-sky-500",
      textBgColor: "from-white via-teal-50 to-teal-100",
      description: "Extensive collection of helpful materials",
      coverImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "sponsor-alternative",
      title: "My Sponsor",
      icon: <Users />,
      path: "/my-sponsor",
      color: "from-pink-400 to-rose-500",
      textBgColor: "from-white via-pink-50 to-pink-100",
      description: "Support for your recovery journey",
      coverImage: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "binaural-beats",
      title: "Binaural Beats",
      icon: <Headphones />,
      path: "/binaural-beats",
      color: "from-purple-400 to-violet-500",
      textBgColor: "from-white via-purple-50 to-purple-100",
      description: "Audio therapy for relaxation",
      coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "workshops",
      title: "Workshops",
      icon: <Calendar />,
      path: "/workshops",
      color: "from-emerald-400 to-teal-500",
      textBgColor: "from-white via-emerald-50 to-emerald-100",
      description: "Interactive sessions with professionals",
      coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "journaling",
      title: "Journaling",
      icon: <BookText />,
      path: "/journaling",
      color: "from-blue-400 to-cyan-500",
      textBgColor: "from-white via-blue-50 to-blue-100",
      description: "Express thoughts and track emotions",
      coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "mindfulness",
      title: "Mindfulness & Sleep",
      icon: <Sparkles />,
      path: "/mindfulness-sleep",
      color: "from-indigo-400 to-violet-500",
      textBgColor: "from-white via-indigo-50 to-indigo-100",
      description: "Practices for better rest and awareness",
      coverImage: "https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "real-time-therapy",
      title: "Real-Time Therapy",
      icon: <MessageCircle />,
      path: "/real-time-therapy",
      color: "from-red-400 to-rose-500",
      textBgColor: "from-white via-red-50 to-red-100",
      description: "Connect with therapists instantly",
      coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "holistic-wellness",
      title: "Holistic Wellness",
      icon: <Leaf />,
      path: "/holistic-wellness",
      color: "from-green-400 to-lime-500",
      textBgColor: "from-white via-green-50 to-green-100",
      description: "Whole-person approach to wellbeing",
      coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "alternative-therapies",
      title: "Alternative Therapies",
      icon: <Rocket />,
      path: "/alternative-therapies",
      color: "from-teal-400 to-cyan-500",
      textBgColor: "from-white via-teal-50 to-teal-100",
      description: "Explore innovative healing methods",
      coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "community-support",
      title: "Community Support",
      icon: <Globe />,
      path: "/community-support",
      color: "from-blue-400 to-indigo-500",
      textBgColor: "from-white via-blue-50 to-blue-100",
      description: "Connect with others on similar journeys",
      coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-2">
        <div className="p-1.5 rounded-full bg-amber-100">
          <Heart className="h-5 w-5 text-amber-500" />
        </div>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 pb-1">
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
              <div className="relative overflow-hidden rounded-xl h-full shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                {/* Cover Image - Top Half */}
                <div className="relative h-24 overflow-hidden">
                  <img 
                    src={feature.coverImage} 
                    alt={feature.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback image if the original fails to load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-30`}></div>
                  
                  {/* Icon on the image */}
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/50 backdrop-blur-sm">
                    {React.cloneElement(feature.icon, { className: "h-4 w-4 text-white drop-shadow-sm" })}
                  </div>
                </div>
                
                {/* Text Content - Bottom Half */}
                <div className={`p-3 bg-gradient-to-br ${feature.textBgColor} flex-grow flex flex-col justify-between`}>
                  <div>
                    <h3 className={`font-bold text-sm text-gray-800 mb-1`}>
                      {feature.title}
                    </h3>
                    
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {isRecommended(feature.id) && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                        Recommended
                      </span>
                    )}
                    
                    <div className="ml-auto text-gray-400">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
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
