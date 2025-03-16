
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2 z-50">
      <Button
        onClick={onClick}
        className="h-10 w-10 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        size="icon"
        aria-label="Get help"
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default FloatingButton;
