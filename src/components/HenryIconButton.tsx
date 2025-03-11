
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HenryIconButtonProps {
  className?: string;
  onClick?: () => void;
}

const HenryIconButton: React.FC<HenryIconButtonProps> = ({ 
  className = "",
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/", { state: { screenState: 'main' } });
    }
  };

  return (
    <Button
      variant="bronze"
      size="h-icon"
      className={`rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 p-0 ${className}`}
      onClick={handleClick}
      aria-label="Henry Assistant"
      title="Henry Assistant"
    >
      <div className="h-full w-full flex items-center justify-center">
        <div className="relative h-6 w-6 rounded-full flex items-center justify-center bg-[#B87333] text-white font-semibold shadow-inner">
          <span className="text-sm">H</span>
          <div className="absolute inset-0 rounded-full border-2 border-[#B87333]/50 animate-ping opacity-40"></div>
        </div>
      </div>
    </Button>
  );
};

export default HenryIconButton;
