
import React from "react";
import { motion } from "framer-motion";
import RobustImage from "@/components/ui/robust-image";
import { THRIVE_LOGO } from "@/constants/branding";

export interface BaseCardProps {
  id: string;
  title: string;
  imagePath: string;
  path: string;
  gradient?: string;
  icon?: React.ReactNode;
  onClick?: (path: string) => void;
  badge?: React.ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({
  id,
  title,
  imagePath,
  path,
  gradient = "bg-gradient-to-r from-blue-600 to-indigo-600",
  icon,
  onClick,
  badge
}) => {
  const handleClick = () => {
    if (onClick) {
      console.log("[BaseCard] Navigating to:", path);
      onClick(path);
    }
  };

  // Get stable fallback image based on program ID
  const getFallbackImage = (id: string): string => {
    if (id.includes("military") || id.includes("dod")) {
      return "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png";
    } else if (id.includes("golden") || id.includes("senior")) {
      return "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png";
    } else if (id.includes("adolescent") || id.includes("teen")) {
      return "/lovable-uploads/11170587-bb45-4563-93d6-add9916cea87.png";
    } else if (id.includes("responder") || id.includes("emergency")) {
      return "/lovable-uploads/776b4638-0382-4cd8-bb25-0a7e36accaf1.png";
    } else if (id.includes("law") || id.includes("enforcement")) {
      return "/lovable-uploads/10d9c6f1-9335-46e4-8942-4d4c198d3f5b.png";
    } else if (id.includes("small-business")) {
      return THRIVE_LOGO;
    } else if (id.includes("cancer")) {
      return "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png";
    }
    // Use a reliable Unsplash fallback instead of placeholder.svg
    return "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80";
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const fallback = getFallbackImage(id);
    console.log("[BaseCard] Image failed to load, using fallback:", fallback);
    target.src = fallback;
  };

  // Animation variants - simplified to prevent conflicts
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={item}
      className="relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={handleClick}
        className="w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-[#B87333] focus:ring-opacity-50 rounded-xl"
        aria-label={title}
      >
        <div className="relative rounded-xl overflow-hidden h-44 shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Image Section (3/4 of height) */}
          <div className="absolute inset-0 h-[75%] overflow-hidden">
            <img 
              src={imagePath}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={handleImageError}
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Icon overlay */}
            {icon && (
              <div className="absolute top-2 left-2">
                <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                  {icon}
                </div>
              </div>
            )}
            
            {/* Badge if provided */}
            {badge && (
              <div className="absolute top-2 right-2">
                {badge}
              </div>
            )}
          </div>
          
          {/* Color Section with Title (1/4 of height) */}
          <div className={`absolute bottom-0 left-0 right-0 h-[25%] ${gradient} flex items-center justify-center`}>
            <h3 className="font-bold text-sm text-white truncate text-center w-full px-2">
              {title}
            </h3>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

export default BaseCard;
