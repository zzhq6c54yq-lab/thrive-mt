
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
        staggerChildren: 0.05
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
        <div className="p-1.5 rounded-full bg-[#9b87f5]/30">
          <Heart className="h-5 w-5 text-[#9b87f5]" />
        </div>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] to-[#ffffff] border-b-2 border-[#9b87f5]/30 pb-1">
          Key Features
        </span>
      </h2>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5" 
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Progress Reports */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#4842c7] to-[#281f75] hover:shadow-[0_0_15px_rgba(99,102,241,0.7)] ${
              isRecommended("progress-reports")
                ? "shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/progress-reports')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <BarChart3 className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Progress Reports</span>
            {isRecommended("progress-reports") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Family Resources */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#a51dc3] to-[#6a1b8b] hover:shadow-[0_0_15px_rgba(217,70,239,0.7)] ${
              isRecommended("family-resources")
                ? "shadow-[0_0_20px_rgba(217,70,239,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/family-resources')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <HandHeart className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Family Resources</span>
            {isRecommended("family-resources") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Mental Wellness */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#2255e0] to-[#123792] hover:shadow-[0_0_15px_rgba(59,130,246,0.7)] ${
              isRecommended("mental-wellness")
                ? "shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/mental-wellness')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <BookOpen className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Mental Wellness</span>
            {isRecommended("mental-wellness") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Brain Games */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#e04414] to-[#8f290b] hover:shadow-[0_0_15px_rgba(249,115,22,0.7)] ${
              isRecommended("games")
                ? "shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/games-and-quizzes')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Brain className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Brain Games</span>
            {isRecommended("games") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Video Diary */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#dd7707] to-[#8f4a06] hover:shadow-[0_0_15px_rgba(245,158,11,0.7)] ${
              isRecommended("video-diary")
                ? "shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/video-diary')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Video className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Video Diary</span>
            {isRecommended("video-diary") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Wellness Challenges */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#088851] to-[#05563c] hover:shadow-[0_0_15px_rgba(16,185,129,0.7)] ${
              isRecommended("wellness-challenges")
                ? "shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/wellness-challenges')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Activity className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Wellness Challenges</span>
            {isRecommended("wellness-challenges") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Resource Library */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#0275a8] to-[#053f5e] hover:shadow-[0_0_15px_rgba(3,105,161,0.7)] ${
              isRecommended("resource-library")
                ? "shadow-[0_0_20px_rgba(3,105,161,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/resource-library')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <BookText className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Resource Library</span>
            {isRecommended("resource-library") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* My Sponsor (NA/AA alternative) */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#d12a82] to-[#86134e] hover:shadow-[0_0_15px_rgba(236,72,153,0.7)] ${
              isRecommended("sponsor-alternative")
                ? "shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/my-sponsor')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Users className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">My Sponsor</span>
            {isRecommended("sponsor-alternative") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Binaural Beats */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#6826e0] to-[#3a1686] hover:shadow-[0_0_15px_rgba(139,92,246,0.7)] ${
              isRecommended("binaural-beats")
                ? "shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/binaural-beats')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Headphones className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Binaural Beats</span>
            {isRecommended("binaural-beats") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Workshops */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#03734f] to-[#034d35] hover:shadow-[0_0_15px_rgba(5,150,105,0.7)] ${
              isRecommended("workshops")
                ? "shadow-[0_0_20px_rgba(5,150,105,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/workshops')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Calendar className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Workshops</span>
            {isRecommended("workshops") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Journaling */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#0066a3] to-[#00395c] hover:shadow-[0_0_15px_rgba(2,132,199,0.7)] ${
              isRecommended("journaling")
                ? "shadow-[0_0_20px_rgba(2,132,199,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/journaling')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <BookText className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Journaling</span>
            {isRecommended("journaling") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Mindfulness & Sleep */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#5820c6] to-[#2d1070] hover:shadow-[0_0_15px_rgba(124,58,237,0.7)] ${
              isRecommended("mindfulness")
                ? "shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/mindfulness-sleep')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Sparkles className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Mindfulness & Sleep</span>
            {isRecommended("mindfulness") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Real-Time Therapy */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#c00f2e] to-[#7a0a21] hover:shadow-[0_0_15px_rgba(225,29,72,0.7)] ${
              isRecommended("real-time-therapy")
                ? "shadow-[0_0_20px_rgba(225,29,72,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/real-time-therapy')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <MessageCircle className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Real-Time Therapy</span>
            {isRecommended("real-time-therapy") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Holistic Wellness */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#4c7c08] to-[#2e4a08] hover:shadow-[0_0_15px_rgba(101,163,13,0.7)] ${
              isRecommended("holistic-wellness")
                ? "shadow-[0_0_20px_rgba(101,163,13,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/holistic-wellness')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Leaf className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Holistic Wellness</span>
            {isRecommended("holistic-wellness") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Alternative Therapies */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#077572] to-[#08585a] hover:shadow-[0_0_15px_rgba(13,148,136,0.7)] ${
              isRecommended("alternative-therapies")
                ? "shadow-[0_0_20px_rgba(13,148,136,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/alternative-therapies')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Rocket className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Alternative Therapies</span>
            {isRecommended("alternative-therapies") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        {/* Community Support */}
        <motion.div variants={item} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-1.5 py-3 px-2 group border-none bg-gradient-to-br from-[#1947d1] to-[#12328f] hover:shadow-[0_0_15px_rgba(37,99,235,0.7)] ${
              isRecommended("community-support")
                ? "shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                : ""
            }`}
            onClick={() => handleNavigate('/community-support')}
          >
            <div className="p-1.5 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Globe className="h-4 w-4 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <span className="text-xs font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">Community Support</span>
            {isRecommended("community-support") && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium animate-pulse">Recommended</span>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KeyFeatures;
