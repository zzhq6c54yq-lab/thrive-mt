import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  coverImage?: string;
  onClick: () => void;
}

const colorMap: Record<string, string> = {
  'bg-green-500': 'bg-green-500/20',
  'bg-blue-500': 'bg-blue-500/20',
  'bg-purple-500': 'bg-purple-500/20',
  'bg-amber-500': 'bg-amber-500/20',
  'bg-indigo-500': 'bg-indigo-500/20',
  'bg-cyan-500': 'bg-cyan-500/20',
  'bg-orange-500': 'bg-orange-500/20',
  'bg-red-500': 'bg-red-500/20',
  'bg-rose-500': 'bg-rose-500/20',
  'bg-pink-500': 'bg-pink-500/20',
};

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  coverImage,
  onClick 
}) => {
  const bgColor = colorMap[color] || colorMap['bg-green-500'];
  
  return (
    <Card 
      onClick={onClick}
      className="overflow-hidden bg-[#101820] border-green-900/30 hover:border-green-700/50 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-xl group"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-black/30 to-transparent" />
          <div className="absolute top-3 left-3">
            <div className="p-1.5 rounded-lg bg-black/30 backdrop-blur-sm">
              <Icon className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          {!coverImage && (
            <div className={`p-2 rounded-full ${bgColor} flex-shrink-0`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors line-clamp-1">{title}</h3>
            <p className="text-white/70 text-sm mt-1 line-clamp-2">{description}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-green-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
