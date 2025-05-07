
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { addOns } from "@/components/home/subscription-addons/data";
import useTranslation from "@/hooks/useTranslation";
import BaseCard from "./BaseCard";

interface SpecializedProgramsGridProps {
  onProgramClick: (path: string) => void;
}

const SpecializedProgramsGrid: React.FC<SpecializedProgramsGridProps> = ({ onProgramClick }) => {
  const { isSpanish } = useTranslation();
  const [refreshKey, setRefreshKey] = useState(Date.now());
  
  useEffect(() => {
    console.log("SpecializedProgramsGrid mounted/updated, refreshKey:", refreshKey);
    
    // Force refresh after a short delay to ensure images are properly loaded
    const refreshTimer = setTimeout(() => {
      setRefreshKey(Date.now());
      console.log("Forcing refresh of SpecializedProgramsGrid");
    }, 500);
    
    return () => clearTimeout(refreshTimer);
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="py-6" key={`specialized-programs-${refreshKey}`}>
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {addOns.map((addon) => {
          const Icon = addon.icon;
          
          // Create badge for recommended programs
          const badge = addon.recommended ? (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium">
              {isSpanish ? "Recomendado" : "Recommended"}
            </span>
          ) : null;
          
          // Add timestamp to imagePath to prevent caching
          const imageWithCacheBust = `${addon.imagePath}${addon.imagePath.includes('?') ? '&' : '?'}bust=${refreshKey}`;
          console.log(`[SpecializedProgramsGrid] Rendering ${addon.id} with image: ${imageWithCacheBust}`);
          
          return (
            <BaseCard
              key={`${addon.id}-${refreshKey}`}
              id={addon.id}
              title={addon.title}
              imagePath={imageWithCacheBust}
              path={addon.path}
              gradient={addon.gradient}
              icon={<Icon className="h-4 w-4 text-white" />}
              onClick={onProgramClick}
              badge={badge}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default SpecializedProgramsGrid;
