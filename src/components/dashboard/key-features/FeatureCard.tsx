
import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  description: string;
  image: string;
  isRecommended: boolean;
  isSpanish: boolean;
  handleNavigate: (path: string) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  title,
  icon,
  path,
  color,
  description,
  image,
  isRecommended,
  isSpanish,
  handleNavigate
}) => {
  // Animation variants for motion
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  const fallbackImage = "https://images.unsplash.com/photo-1506057527569-d23d4eb7c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";

  return (
    <motion.div 
      key={id}
      variants={item}
      className="relative"
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={() => handleNavigate(path)}
        className="w-full h-full text-left"
        aria-label={title}
      >
        <div className="relative overflow-hidden rounded-xl h-44 shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Image Section (3/4 of height) */}
          <div className="absolute inset-0 h-[75%] overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Image failed to load for ${id}:`, image);
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Icon overlay */}
            <div className="absolute top-2 left-2">
              <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                {icon}
              </div>
            </div>
            
            {/* Recommended badge */}
            {isRecommended && (
              <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium">
                {isSpanish ? "Recomendado" : "Recommended"}
              </span>
            )}
          </div>
          
          {/* Color Section with Title (1/4 of height) */}
          <div className={`absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-br ${color} flex items-center justify-center`}>
            <h3 className="font-bold text-sm text-white truncate text-center w-full px-2">
              {title}
            </h3>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

export default FeatureCard;
