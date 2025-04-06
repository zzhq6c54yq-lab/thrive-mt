
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Activity, BookOpen, Dumbbell, Heart, Users, HandHeart, 
  Brain, BarChart3, Video, Calendar, Headphones, BookText, 
  Sparkles, MessageCircle, Leaf, Rocket, Globe
} from "lucide-react";
import { motion } from "framer-motion";

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
  // Helper to check if a feature should be highlighted based on user's qualities and goals
  const isRecommended = (feature: string) => {
    // Map features to relevant qualities and goals
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
    
    // Check if any of the user's qualities match the feature's relevant qualities
    const qualityMatch = selectedQualities.some(quality => 
      featureMap[feature] && featureMap[feature].includes(quality.toLowerCase())
    );
    
    // Check if any of the user's goals match the feature
    const goalMatch = selectedGoals.some(goal => 
      goal.toLowerCase().includes(feature.replace('-', ' '))
    );
    
    return qualityMatch || goalMatch;
  };
  
  const handleNavigate = (path: string) => {
    // Pass fromMainMenu flag to new pages for proper back navigation
    navigateToFeature(path);
  };
  
  // Container animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-2 text-white">
        <span className="p-1 rounded-full bg-[#9b87f5]/30">
          <Heart className="h-5 w-5 text-[#9b87f5]" />
        </span>
        Key Features
      </h2>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" 
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Progress Reports */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#6366F1] to-[#4338CA] hover:shadow-[0_0_15px_rgba(99,102,241,0.7)] ${
              isRecommended("progress-reports")
                ? "shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/progress-reports')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <BarChart3 className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Progress Reports</span>
            {isRecommended("progress-reports") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Family Resources */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#D946EF] to-[#8B5CF6] hover:shadow-[0_0_15px_rgba(217,70,239,0.7)] ${
              isRecommended("family-resources")
                ? "shadow-[0_0_20px_rgba(217,70,239,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/family-resources')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <HandHeart className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Family Resources</span>
            {isRecommended("family-resources") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Mental Wellness */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] hover:shadow-[0_0_15px_rgba(59,130,246,0.7)] ${
              isRecommended("mental-wellness")
                ? "shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/mental-wellness')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <BookOpen className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Mental Wellness</span>
            {isRecommended("mental-wellness") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Brain Games */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#F97316] to-[#C2410C] hover:shadow-[0_0_15px_rgba(249,115,22,0.7)] ${
              isRecommended("games")
                ? "shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/games-and-quizzes')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Brain className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Brain Games</span>
            {isRecommended("games") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Video Diary */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#F59E0B] to-[#B45309] hover:shadow-[0_0_15px_rgba(245,158,11,0.7)] ${
              isRecommended("video-diary")
                ? "shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/video-diary')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Video className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Video Diary</span>
            {isRecommended("video-diary") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Wellness Challenges */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#10B981] to-[#047857] hover:shadow-[0_0_15px_rgba(16,185,129,0.7)] ${
              isRecommended("wellness-challenges")
                ? "shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/wellness-challenges')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Activity className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Wellness Challenges</span>
            {isRecommended("wellness-challenges") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Resource Library */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#0369A1] to-[#075985] hover:shadow-[0_0_15px_rgba(3,105,161,0.7)] ${
              isRecommended("resource-library")
                ? "shadow-[0_0_20px_rgba(3,105,161,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/resource-library')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <BookText className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Resource Library</span>
            {isRecommended("resource-library") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* My Sponsor (NA/AA alternative) */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#EC4899] to-[#BE185D] hover:shadow-[0_0_15px_rgba(236,72,153,0.7)] ${
              isRecommended("sponsor-alternative")
                ? "shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/my-sponsor')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Users className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">My Sponsor</span>
            {isRecommended("sponsor-alternative") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Binaural Beats */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] hover:shadow-[0_0_15px_rgba(139,92,246,0.7)] ${
              isRecommended("binaural-beats")
                ? "shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/binaural-beats')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Headphones className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Binaural Beats</span>
            {isRecommended("binaural-beats") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Workshops */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#059669] to-[#065F46] hover:shadow-[0_0_15px_rgba(5,150,105,0.7)] ${
              isRecommended("workshops")
                ? "shadow-[0_0_20px_rgba(5,150,105,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/workshops')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Calendar className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Workshops</span>
            {isRecommended("workshops") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Journaling */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#0284C7] to-[#075985] hover:shadow-[0_0_15px_rgba(2,132,199,0.7)] ${
              isRecommended("journaling")
                ? "shadow-[0_0_20px_rgba(2,132,199,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/journaling')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <BookText className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Journaling</span>
            {isRecommended("journaling") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Mindfulness & Sleep */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] hover:shadow-[0_0_15px_rgba(124,58,237,0.7)] ${
              isRecommended("mindfulness")
                ? "shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/mindfulness-sleep')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Sparkles className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Mindfulness & Sleep</span>
            {isRecommended("mindfulness") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Real-Time Therapy */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#E11D48] to-[#9F1239] hover:shadow-[0_0_15px_rgba(225,29,72,0.7)] ${
              isRecommended("real-time-therapy")
                ? "shadow-[0_0_20px_rgba(225,29,72,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/real-time-therapy')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <MessageCircle className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Real-Time Therapy</span>
            {isRecommended("real-time-therapy") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Holistic Wellness */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#65A30D] to-[#3F6212] hover:shadow-[0_0_15px_rgba(101,163,13,0.7)] ${
              isRecommended("holistic-wellness")
                ? "shadow-[0_0_20px_rgba(101,163,13,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/holistic-wellness')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Leaf className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Holistic Wellness</span>
            {isRecommended("holistic-wellness") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Alternative Therapies */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#0D9488] to-[#0F766E] hover:shadow-[0_0_15px_rgba(13,148,136,0.7)] ${
              isRecommended("alternative-therapies")
                ? "shadow-[0_0_20px_rgba(13,148,136,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/alternative-therapies')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Rocket className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Alternative Therapies</span>
            {isRecommended("alternative-therapies") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Community Support */}
        <motion.div variants={item} whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-none bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] hover:shadow-[0_0_15px_rgba(37,99,235,0.7)] ${
              isRecommended("community-support")
                ? "shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/community-support')}
          >
            <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Globe className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-sm md:text-base font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Community Support</span>
            {isRecommended("community-support") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KeyFeatures;
