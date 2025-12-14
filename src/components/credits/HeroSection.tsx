
import React from "react";
import { motion } from "framer-motion";
import { WalletCards, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  credits: number;
  setActiveTab: (tab: string) => void;
  onGetStarted?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ credits, setActiveTab, onGetStarted }) => {
  
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      setActiveTab("how-it-works");
    }
  };
  
  const handleUpgrade = () => {
    setActiveTab("redeem");
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 border border-amber-400 shadow-lg">
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
          <pattern id="hero-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#fff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Points Program
          </h1>
          <p className="text-amber-100 text-sm md:text-base max-w-md">
            Earn points from wellness challenges and activities. Use them to unlock rewards and exclusive benefits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button 
              onClick={handleGetStarted}
              className="bg-[#E5C5A1] hover:bg-[#D4B48F] text-[#1a1a1f] font-semibold shadow-md"
            >
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              onClick={handleUpgrade}
              className="border-[#B87333] border-2 text-[#B87333] hover:bg-[#B87333]/20"
            >
              Upgrade Plan
            </Button>
          </div>
        </div>
        
        <motion.div 
          className="flex flex-col items-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-amber-300/50 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-white/30">
                <WalletCards className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-white font-semibold">Your Points</h2>
                <div className="flex items-baseline">
                  <span className="text-3xl md:text-4xl font-bold text-white">{credits}</span>
                  <span className="text-amber-100 ml-2">available</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
