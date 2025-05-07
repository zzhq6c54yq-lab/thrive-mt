
import React from "react";
import { motion } from "framer-motion";
import { addOns } from "@/components/home/subscription-addons/data";
import useTranslation from "@/hooks/useTranslation";

interface SpecializedProgramsGridProps {
  onProgramClick: (path: string) => void;
}

const SpecializedProgramsGrid: React.FC<SpecializedProgramsGridProps> = ({ onProgramClick }) => {
  const { isSpanish } = useTranslation();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="py-6">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {addOns.map((addon) => {
          const Icon = addon.icon;
          
          return (
            <motion.div
              key={addon.id}
              variants={item}
              className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => onProgramClick(addon.path)}
            >
              <div className="h-48 relative">
                {/* Image Section (3/4 of height) */}
                <div className="absolute inset-0 h-[75%] overflow-hidden">
                  <img
                    src={addon.imagePath}
                    alt={addon.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image for ${addon.id}`, e);
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000";
                    }}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
                
                {/* Color Section (1/4 of height) */}
                <div className={`absolute bottom-0 left-0 right-0 h-[25%] ${addon.gradient} flex items-center justify-center`}>
                  <h3 className="text-lg font-semibold text-white text-center px-2 truncate w-full">
                    {addon.title}
                  </h3>
                </div>
                
                {/* Icon overlay in top corner */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SpecializedProgramsGrid;
