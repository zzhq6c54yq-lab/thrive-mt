
import React from "react";
import { motion } from "framer-motion";
import { FeatureItem } from "./featuresData";
import { isFeatureRecommended } from "./featureUtils";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

interface KeyFeaturesGridProps {
  features: FeatureItem[];
  selectedQualities: string[];
  selectedGoals: string[];
  isSpanish: boolean;
  handleNavigate: (path: string) => void;
}

// Static color mapping for icon backgrounds
const getIconColors = (color: string): string => {
  const colorMap: Record<string, string> = {
    purple: "p-2 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 group-hover:scale-110 transition-transform duration-300",
    blue: "p-2 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-300",
    green: "p-2 rounded-lg bg-gradient-to-br from-green-100 to-green-50 text-green-600 group-hover:scale-110 transition-transform duration-300",
    yellow: "p-2 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50 text-yellow-600 group-hover:scale-110 transition-transform duration-300",
    red: "p-2 rounded-lg bg-gradient-to-br from-red-100 to-red-50 text-red-600 group-hover:scale-110 transition-transform duration-300",
    indigo: "p-2 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform duration-300",
    teal: "p-2 rounded-lg bg-gradient-to-br from-teal-100 to-teal-50 text-teal-600 group-hover:scale-110 transition-transform duration-300",
    orange: "p-2 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600 group-hover:scale-110 transition-transform duration-300",
    emerald: "p-2 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform duration-300",
    violet: "p-2 rounded-lg bg-gradient-to-br from-violet-100 to-violet-50 text-violet-600 group-hover:scale-110 transition-transform duration-300",
    pink: "p-2 rounded-lg bg-gradient-to-br from-pink-100 to-pink-50 text-pink-600 group-hover:scale-110 transition-transform duration-300",
    slate: "p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 text-slate-600 group-hover:scale-110 transition-transform duration-300",
    cyan: "p-2 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-50 text-cyan-600 group-hover:scale-110 transition-transform duration-300",
    rose: "p-2 rounded-lg bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 group-hover:scale-110 transition-transform duration-300",
    amber: "p-2 rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 group-hover:scale-110 transition-transform duration-300"
  };
  return colorMap[color] || colorMap.purple;
};

// Static color mapping for buttons
const getButtonColors = (color: string): string => {
  const colorMap: Record<string, string> = {
    purple: "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg group-hover:scale-105",
    blue: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg group-hover:scale-105",
    green: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg group-hover:scale-105",
    yellow: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 shadow-md hover:shadow-lg group-hover:scale-105",
    red: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg group-hover:scale-105",
    indigo: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-md hover:shadow-lg group-hover:scale-105",
    teal: "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg group-hover:scale-105",
    orange: "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg group-hover:scale-105",
    emerald: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg group-hover:scale-105",
    violet: "bg-gradient-to-r from-violet-500 to-violet-600 text-white hover:from-violet-600 hover:to-violet-700 shadow-md hover:shadow-lg group-hover:scale-105",
    pink: "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 shadow-md hover:shadow-lg group-hover:scale-105",
    slate: "bg-gradient-to-r from-slate-500 to-slate-600 text-white hover:from-slate-600 hover:to-slate-700 shadow-md hover:shadow-lg group-hover:scale-105",
    cyan: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 shadow-md hover:shadow-lg group-hover:scale-105",
    rose: "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-md hover:shadow-lg group-hover:scale-105",
    amber: "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg group-hover:scale-105"
  };
  return colorMap[color] || colorMap.purple;
};

const KeyFeaturesGrid: React.FC<KeyFeaturesGridProps> = ({
  features,
  selectedQualities,
  selectedGoals,
  isSpanish,
  handleNavigate
}) => {
  const { toast } = useToast();
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    // Fallback to a reliable placeholder
    target.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
            onClick={() => {
              if (!feature.comingSoon) {
                toast({
                  title: isSpanish ? "Navegando..." : "Navigating...",
                  description: isSpanish 
                    ? `Accediendo a ${feature.title}` 
                    : `Accessing ${feature.title}`,
                  duration: 1500,
                });
                handleNavigate(feature.path);
              }
            }}
          >
            <div className="relative bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border/50 hover:border-primary/20">
              {/* Gradient Overlay for better visual appeal */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Coming Soon Badge */}
              {feature.comingSoon && (
                <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                  {isSpanish ? "Próximamente" : "Coming Soon"}
                </div>
              )}
              
              {/* Popular Badge */}
              {feature.popular && !recommended && (
                <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                  ⭐ {isSpanish ? "Popular" : "Popular"}
                </div>
              )}

              {/* Recommended Badge */}
              {recommended && (
                <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-purple-500 to-violet-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                  💫 {isSpanish ? "Recomendado" : "Recommended"}
                </div>
              )}

              {/* Compact Image - 50% smaller */}
              <div className="relative h-24 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Title Only - Compact */}
              <div className="p-3 relative z-10">
                <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default KeyFeaturesGrid;
