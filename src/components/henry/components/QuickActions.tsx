
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Heart, Wallet } from "lucide-react";

interface QuickActionsProps {
  onQuickAction: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAction }) => {
  return (
    <div className="mt-3 flex flex-wrap gap-1 justify-center">
      <Button 
        variant="outline" 
        size="sm"
        className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
        onClick={() => onQuickAction("anxiety")}
      >
        Anxiety <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
        onClick={() => onQuickAction("depression")}
      >
        Depression <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
        onClick={() => onQuickAction("stress")}
      >
        Stress <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7"
        onClick={() => onQuickAction("workshops")}
      >
        Workshops <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white text-xs py-1 h-7 group"
        onClick={() => onQuickAction("financial_wellness")}
      >
        <Wallet className="mr-1 h-3 w-3 group-hover:text-[#B87333]" />
        Financial Wellness <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
    </div>
  );
};

export default QuickActions;
