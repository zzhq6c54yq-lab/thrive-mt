
import React from "react";
import { Button } from "@/components/ui/button";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  // Use fixed positioning in the bottom-right corner instead of following cursor
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      size="icon"
    >
      <span className="text-2xl font-bold">H</span>
    </Button>
  );
};

export default FloatingButton;
