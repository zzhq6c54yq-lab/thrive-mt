import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  coverImage?: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  coverImage,
  onClick
}) => (
  <Card 
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
    className="relative overflow-hidden backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg cursor-pointer group hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
    style={{
      background: `linear-gradient(145deg, rgba(31,27,21,0.8) 0%, rgba(24,20,14,0.9) 100%)`,
    }}
  >
    {coverImage && (
      <div className="relative h-32 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f1b15] via-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <div className="p-1.5 rounded-lg bg-black/30 backdrop-blur-sm">
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    )}
    
    {/* Animated gradient highlight */}
    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
      style={{ background: `linear-gradient(145deg, ${color} 0%, transparent 100%)` }}></div>
    
    <CardContent className="p-5 relative z-10">
      <div className="flex items-start gap-3">
        {!coverImage && (
          <div className={`p-3 rounded-full ${color} bg-opacity-20 transform transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors duration-300 line-clamp-1">{title}</h3>
          <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300 mt-1 line-clamp-2">{description}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-amber-300 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </div>
    </CardContent>
  </Card>
);

export default FeatureCard;
