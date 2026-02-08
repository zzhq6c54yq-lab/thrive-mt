import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  coverImage?: string;
  onClick: () => void;
}

const colorMap: Record<string, { bg: string; text: string; gradient: string }> = {
  'bg-rose-500': { bg: 'bg-rose-500/10 group-hover:bg-rose-500/20', text: 'text-rose-500', gradient: 'from-rose-500/80 to-rose-600/90' },
  'bg-purple-500': { bg: 'bg-purple-500/10 group-hover:bg-purple-500/20', text: 'text-purple-500', gradient: 'from-purple-500/80 to-purple-600/90' },
  'bg-blue-500': { bg: 'bg-blue-500/10 group-hover:bg-blue-500/20', text: 'text-blue-500', gradient: 'from-blue-500/80 to-blue-600/90' },
  'bg-green-500': { bg: 'bg-green-500/10 group-hover:bg-green-500/20', text: 'text-green-500', gradient: 'from-green-500/80 to-green-600/90' },
  'bg-amber-500': { bg: 'bg-amber-500/10 group-hover:bg-amber-500/20', text: 'text-amber-500', gradient: 'from-amber-500/80 to-amber-600/90' },
  'bg-pink-500': { bg: 'bg-pink-500/10 group-hover:bg-pink-500/20', text: 'text-pink-500', gradient: 'from-pink-500/80 to-pink-600/90' },
  'bg-indigo-500': { bg: 'bg-indigo-500/10 group-hover:bg-indigo-500/20', text: 'text-indigo-500', gradient: 'from-indigo-500/80 to-indigo-600/90' },
  'bg-cyan-500': { bg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20', text: 'text-cyan-500', gradient: 'from-cyan-500/80 to-cyan-600/90' },
  'bg-orange-500': { bg: 'bg-orange-500/10 group-hover:bg-orange-500/20', text: 'text-orange-500', gradient: 'from-orange-500/80 to-orange-600/90' },
  'bg-red-500': { bg: 'bg-red-500/10 group-hover:bg-red-500/20', text: 'text-red-500', gradient: 'from-red-500/80 to-red-600/90' },
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, color, coverImage, onClick }) => {
  const colors = colorMap[color] || colorMap['bg-rose-500'];
  
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group bg-card border-border/50 hover:border-primary/30"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      tabIndex={0}
      role="button"
    >
      {/* Cover Image */}
      {coverImage && (
        <div className="relative h-36 overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} to-transparent opacity-40 group-hover:opacity-30 transition-opacity`} />
          <div className="absolute top-3 left-3">
            <div className={`p-2 rounded-lg bg-black/30 backdrop-blur-sm`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-start gap-4">
          {!coverImage && (
            <div className={`p-3 rounded-xl ${colors.bg} transition-all flex-shrink-0`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
        </div>
      </div>
    </Card>
  );
};

export default FeatureCard;
