
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useFeatureActions } from "@/hooks/useFeatureActions";
import useTranslation from "@/hooks/useTranslation";

interface BackButtonProps {
  className?: string;
  onCustomBack?: () => void; // Optional custom back handler
}

const BackButton: React.FC<BackButtonProps> = ({ 
  className = "", 
  onCustomBack 
}) => {
  const { handleBackNavigation } = useFeatureActions();
  const { isSpanish } = useTranslation();
  
  const handleClick = () => {
    if (onCustomBack) {
      onCustomBack();
    } else {
      handleBackNavigation();
    }
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      className={`bg-white/5 hover:bg-white/15 border-white/10 text-white/90 text-xs h-8 ${className}`}
      onClick={handleClick}
      title={isSpanish ? "Atrás" : "Back"}
      aria-label={isSpanish ? "Atrás" : "Back"}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
};

export default BackButton;
