
import React from "react";
import { motion } from "framer-motion";
import { FeatureItem } from "./featuresData";
import { isFeatureRecommended } from "./featureUtils";

interface KeyFeaturesGridProps {
  features: FeatureItem[];
  selectedQualities: string[];
  selectedGoals: string[];
  isSpanish: boolean;
  handleNavigate: (path: string) => void;
}

const KeyFeaturesGrid: React.FC<KeyFeaturesGridProps> = ({
  features,
  selectedQualities,
  selectedGoals,
  isSpanish,
  handleNavigate
}) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {features.map((feature) => {
        const recommended = isFeatureRecommended(feature.id, selectedQualities, selectedGoals);
        
        return (
          <motion.div
            key={feature.id}
            variants={item}
            className="group cursor-pointer"
            onClick={() => handleNavigate(feature.path)}
          >
            <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Coming Soon Badge */}
              {feature.comingSoon && (
                <div className="absolute top-2 right-2 z-10 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {isSpanish ? "Próximamente" : "Coming Soon"}
                </div>
              )}
              
              {/* Popular Badge */}
              {feature.popular && (
                <div className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {isSpanish ? "Popular" : "Popular"}
                </div>
              )}

              {/* Recommended Badge */}
              {recommended && (
                <div className="absolute top-2 left-2 z-10 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {isSpanish ? "Recomendado" : "Recommended"}
                </div>
              )}

              {/* Feature Image */}
              <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-${feature.color}-600/50 to-transparent`}></div>
              </div>

              {/* Feature Content */}
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  {feature.icon}
                  <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3">
                  {feature.description}
                </p>
                <button 
                  className={`w-full px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
                    feature.comingSoon 
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                      : `bg-${feature.color}-100 text-${feature.color}-700 hover:bg-${feature.color}-200`
                  }`}
                  disabled={feature.comingSoon}
                >
                  {feature.comingSoon 
                    ? (isSpanish ? "Próximamente" : "Coming Soon")
                    : (isSpanish ? "Explorar" : "Explore")
                  }
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default KeyFeaturesGrid;
