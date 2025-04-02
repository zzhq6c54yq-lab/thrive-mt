
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import FeatureTutorial from "./FeatureTutorial";

interface TutorialButtonProps {
  featureId: string;
  className?: string;
}

const TutorialButton: React.FC<TutorialButtonProps> = ({ 
  featureId,
  className = "" 
}) => {
  const [showTutorial, setShowTutorial] = useState(false);

  const handleOpenTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={`bg-white/5 hover:bg-white/15 border-white/10 text-white/90 text-xs ${className}`}
        onClick={handleOpenTutorial}
      >
        <HelpCircle className="h-4 w-4 mr-1.5" />
        How to use this feature
      </Button>
      
      {showTutorial && (
        <FeatureTutorial 
          featureId={featureId} 
          onClose={() => setShowTutorial(false)} 
        />
      )}
    </>
  );
};

export default TutorialButton;
