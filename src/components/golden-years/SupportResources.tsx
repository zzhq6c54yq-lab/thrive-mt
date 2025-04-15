
import React from "react";
import { Button } from "@/components/ui/button";
import { LifeBuoy } from "lucide-react";

interface SupportResourcesProps {
  onResourceClick: (resource: string) => void;
}

const SupportResources: React.FC<SupportResourcesProps> = ({ onResourceClick }) => {
  return (
    <div className="bg-amber-900/20 border border-amber-300/30 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="mb-4 md:mb-0">
        <div className="flex items-center">
          <LifeBuoy className="h-5 w-5 text-amber-300 mr-2" />
          <h3 className="font-medium text-lg">Need Assistance?</h3>
        </div>
        <p className="text-sm text-amber-100">Resources for emergency help, caregiver support, or technical assistance.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          size="sm" 
          className="bg-amber-700 hover:bg-amber-800 text-white"
          onClick={() => onResourceClick("Emergency Resources")}
        >
          Emergency Resources
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-amber-400 text-amber-100 hover:bg-amber-900/50"
          onClick={() => onResourceClick("Technical Support")}
        >
          Technical Support
        </Button>
      </div>
    </div>
  );
};

export default SupportResources;
