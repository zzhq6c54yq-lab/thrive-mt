
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
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
    className="bg-white dark:bg-[#1A1616] border-rose-200/30 dark:border-rose-900/30 hover:border-rose-300/50 dark:hover:border-rose-700/50 transition-colors shadow-md cursor-pointer hover:shadow-lg"
  >
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full ${color} bg-opacity-20 dark:bg-opacity-30`}>
          <Icon className="h-5 w-5 text-gray-800 dark:text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-white/70 text-sm">{description}</p>
    </CardContent>
  </Card>
);

export default FeatureCard;
