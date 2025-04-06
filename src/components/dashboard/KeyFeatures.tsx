
import React from "react";
import { Button } from "@/components/ui/button";
import { Activity, BookOpen, Dumbbell, Heart, Users, HandHeart, Brain, BarChart3 } from "lucide-react";
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
      "brain-games": ["curious", "analytical", "intellectual", "playful"],
      "physical-wellness": ["active", "energetic", "disciplined", "health-conscious"],
      "community-support": ["social", "collaborative", "communicative", "empathetic"]
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
      <h2 className="text-lg md:text-xl font-medium mb-5 flex items-center gap-2">
        <span className="p-1 rounded-full bg-[#9b87f5]/10">
          <Heart className="h-5 w-5 text-[#9b87f5]" />
        </span>
        Key Features
      </h2>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-3" 
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#9b87f5]/10 ${
              isRecommended("progress-reports")
                ? "bg-gradient-to-br from-[#9b87f5]/20 to-[#6C85DD]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/progress-reports')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#9b87f5]/20 transition-colors">
              <BarChart3 className="h-5 w-5 text-[#9b87f5]" />
            </div>
            <span className="text-sm font-medium">Progress Reports</span>
            {isRecommended("progress-reports") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#9b87f5] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#D946EF]/10 ${
              isRecommended("family-resources")
                ? "bg-gradient-to-br from-[#D946EF]/20 to-[#8D65C5]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/family-resources')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#D946EF]/20 transition-colors">
              <HandHeart className="h-5 w-5 text-[#D946EF]" />
            </div>
            <span className="text-sm font-medium">Family Resources</span>
            {isRecommended("family-resources") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#D946EF] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#6C85DD]/10 ${
              isRecommended("mental-wellness")
                ? "bg-gradient-to-br from-[#6C85DD]/20 to-[#9b87f5]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/mental-wellness')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#6C85DD]/20 transition-colors">
              <BookOpen className="h-5 w-5 text-[#6C85DD]" />
            </div>
            <span className="text-sm font-medium">Mental Wellness</span>
            {isRecommended("mental-wellness") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#6C85DD] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#FF8364]/10 ${
              isRecommended("brain-games")
                ? "bg-gradient-to-br from-[#FF8364]/20 to-[#FF97A1]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/games-and-quizzes')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#FF8364]/20 transition-colors">
              <Brain className="h-5 w-5 text-[#FF8364]" />
            </div>
            <span className="text-sm font-medium">Brain Games</span>
            {isRecommended("brain-games") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF8364] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#10B981]/10 ${
              isRecommended("physical-wellness")
                ? "bg-gradient-to-br from-[#10B981]/20 to-[#6EE7B7]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/physical-wellness')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#10B981]/20 transition-colors">
              <Dumbbell className="h-5 w-5 text-[#10B981]" />
            </div>
            <span className="text-sm font-medium">Physical Wellness</span>
            {isRecommended("physical-wellness") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#10B981] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
        
        <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="outline"
            className={`w-full h-auto flex flex-col items-center gap-2 p-4 group border-[#F59E0B]/10 ${
              isRecommended("community-support")
                ? "bg-gradient-to-br from-[#F59E0B]/20 to-[#FBBF24]/10"
                : "bg-white/5"
            }`}
            onClick={() => handleNavigate('/community-support')}
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#F59E0B]/20 transition-colors">
              <Users className="h-5 w-5 text-[#F59E0B]" />
            </div>
            <span className="text-sm font-medium">Community Support</span>
            {isRecommended("community-support") && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F59E0B] text-white">Recommended</span>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KeyFeatures;
