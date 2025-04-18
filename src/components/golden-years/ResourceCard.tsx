
import React from "react";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onResourceClick: (title: string) => void;
  buttonText?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  description, 
  icon, 
  onResourceClick,
  buttonText
}) => {
  const { preferredLanguage } = useTranslation();
  
  const defaultButtonTexts = {
    'English': 'Explore Resources',
    'Español': 'Explorar Recursos',
    'Português': 'Explorar Recursos'
  };
  
  const finalButtonText = buttonText || defaultButtonTexts[preferredLanguage as keyof typeof defaultButtonTexts] || defaultButtonTexts['English'];

  return (
    <div className="bg-amber-900/20 backdrop-blur-sm border border-amber-200/20 rounded-xl p-6 hover:bg-amber-900/30 transition">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-medium">{title}</h3>
        <div className="p-2 bg-amber-600/40 rounded-full">
          {icon}
        </div>
      </div>
      <p className="mb-6 text-amber-100">
        {description}
      </p>
      <Button 
        className="w-full bg-amber-700 hover:bg-amber-800 text-white"
        onClick={() => onResourceClick(title)}
      >
        {finalButtonText}
      </Button>
    </div>
  );
};

export default ResourceCard;
