
import React from "react";
import { Button } from "@/components/ui/button";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      size="icon"
      aria-label="Get help"
    >
      <div className="relative h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold border-2 border-white/30">
        <span className="text-2xl">H</span>
      </div>
    </Button>
  );
};

export default FloatingButton;
