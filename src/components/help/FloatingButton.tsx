
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HenryDialog from "@/components/HenryDialog";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [showHenry, setShowHenry] = useState(false);
  const { toast } = useToast();
  
  const handleHenryClick = () => {
    setShowHenry(true);
    toast({
      title: "H.E.N.R.Y. Assistant",
      description: "How can I help you today?",
      duration: 3000,
    });
  };

  return (
    <>
      <div className="fixed right-6 bottom-24 flex flex-col items-center gap-2 z-50">
        {/* Help button */}
        <Button
          onClick={onClick}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label="Get help"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </div>
      
      <HenryDialog 
        isOpen={showHenry} 
        onOpenChange={setShowHenry}
      />
    </>
  );
};

export default FloatingButton;
