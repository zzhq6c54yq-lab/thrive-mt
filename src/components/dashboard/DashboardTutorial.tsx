
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FeatureTutorial from "@/components/tutorials/FeatureTutorial";

interface DashboardTutorialProps {
  showTutorial: boolean;
  userName: string;
  onClose: () => void;
}

const DashboardTutorial: React.FC<DashboardTutorialProps> = ({ 
  showTutorial,
  userName,
  onClose
}) => {
  if (!showTutorial) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="w-full max-w-lg mx-4 relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <FeatureTutorial 
          featureId="dashboard" 
          onClose={onClose}
          userName={userName}
        />
      </div>
    </div>
  );
};

export default DashboardTutorial;
