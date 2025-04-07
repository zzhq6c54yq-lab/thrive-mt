
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
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
    {/* Animated gradient highlight */}
    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
      style={{ background: `linear-gradient(145deg, ${color} 0%, transparent 100%)` }}></div>
    
    {/* Top highlight line */}
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    
    <CardContent className="p-6 relative z-10">
      <div className="flex flex-col items-center text-center">
        <div className={`p-4 rounded-full ${color} bg-opacity-20 mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">{title}</h3>
        
        <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">{description}</p>
      </div>
      
      {/* Subtle animated arrow appearing on hover */}
      <div className="absolute bottom-3 right-3 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <div className={`text-xs font-medium ${color} text-opacity-80`}>
          Explore →
        </div>
      </div>
    </CardContent>
  </Card>
);

export default FeatureCard;
