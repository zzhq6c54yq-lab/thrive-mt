
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
  
  // Ensure image error handling
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});
  
  const handleImageError = (id: string) => {
    console.log(`Image error for addon ${id}`);
    setImageErrors(prev => ({...prev, [id]: true}));
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
          const hasImageError = imageErrors[addon.id] || false;
          
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
                <div className="absolute inset-0">
                  <img
                    src={hasImageError ? "https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" : addon.imagePath}
                    alt={addon.title}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(addon.id)}
                    loading="eager"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${addon.gradient}`}></div>
                </div>
                
                <div className="relative z-10 h-full flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{addon.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2">{addon.description}</p>
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
