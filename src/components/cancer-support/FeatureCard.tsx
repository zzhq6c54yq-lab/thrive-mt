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
  'bg-rose-500': 'bg-rose-500/20 dark:bg-rose-500/30',
  'bg-purple-500': 'bg-purple-500/20 dark:bg-purple-500/30',
  'bg-blue-500': 'bg-blue-500/20 dark:bg-blue-500/30',
  'bg-green-500': 'bg-green-500/20 dark:bg-green-500/30',
  'bg-amber-500': 'bg-amber-500/20 dark:bg-amber-500/30',
  'bg-indigo-500': 'bg-indigo-500/20 dark:bg-indigo-500/30',
  'bg-cyan-500': 'bg-cyan-500/20 dark:bg-cyan-500/30',
  'bg-orange-500': 'bg-orange-500/20 dark:bg-orange-500/30',
  'bg-red-500': 'bg-red-500/20 dark:bg-red-500/30',
  'bg-pink-500': 'bg-pink-500/20 dark:bg-pink-500/30',
};

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  coverImage,
  onClick 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  const bgColor = colorMap[color] || colorMap['bg-rose-500'];
  
  return (
    <Card 
      onClick={handleClick}
      className="overflow-hidden bg-white dark:bg-[#1A1616] border-rose-200/30 dark:border-rose-900/30 
              hover:border-rose-300/50 dark:hover:border-rose-700/50 transition-all 
              shadow-md cursor-pointer hover:shadow-xl transform hover:-translate-y-1 
              duration-300 group"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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
              <Icon className="h-5 w-5 text-gray-800 dark:text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-1">{title}</h3>
            <p className="text-gray-600 dark:text-white/70 text-sm mt-1 line-clamp-2">{description}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 dark:text-white/40 group-hover:text-rose-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
