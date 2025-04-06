
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
    className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg cursor-pointer hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
  >
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full ${color} bg-opacity-20`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-white/70 text-sm">{description}</p>
    </CardContent>
  </Card>
);

export default FeatureCard;
