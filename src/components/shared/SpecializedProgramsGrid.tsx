
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { addOns } from "@/components/home/subscription-addons/data";
import useTranslation from "@/hooks/useTranslation";
import BaseCard from "./BaseCard";

interface SpecializedProgramsGridProps {
  onProgramClick: (path: string) => void;
}

const SpecializedProgramsGrid: React.FC<SpecializedProgramsGridProps> = ({ onProgramClick }) => {
  const { isSpanish } = useTranslation();
  
  // Memoize processed data to prevent unnecessary re-renders
  const processedAddOns = useMemo(() => {
    return addOns.map(addon => ({
      ...addon,
      imagePath: addon.imagePath || "/placeholder.svg"
    }));
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  return (
    <div className="py-6">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {processedAddOns.map((addon) => {
          const Icon = addon.icon;
          
          const badge = addon.recommended ? (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium">
              {isSpanish ? "Recomendado" : "Recommended"}
            </span>
          ) : null;
          
          return (
            <BaseCard
              key={addon.id}
              id={addon.id}
              title={addon.title}
              imagePath={addon.imagePath}
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
