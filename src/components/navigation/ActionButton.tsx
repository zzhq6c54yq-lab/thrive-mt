
import React from "react";
import { Button } from "@/components/ui/button";
import { useFeatureActions } from "@/hooks/useFeatureActions";

// Define the action types that we support
type ActionType = 'workshop' | 'assessment' | 'download' | 'practice' | 'discussion' | 
                 'hangout' | 'join' | 'redeem' | 'record' | 'view' | 'other';

// Props interface for ActionButton
interface ActionButtonProps {
  type: ActionType;
  id?: string;
  title: string;
  path?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "amber" | "amber-outline" | string;
  size?: "default" | "sm" | "lg" | "icon";
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  type, 
  id, 
  title, 
  path,
  className = "", 
  variant = "default",
  size = "default"
}) => {
  const { handleActionClick } = useFeatureActions();
  
  // Map custom variants to standard button variants and classes
  const getButtonClasses = () => {
    if (variant === "amber") {
      return `bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white ${className}`;
    }
    else if (variant === "amber-outline") {
      return `bg-white/10 backdrop-blur-sm border border-amber-400 text-amber-600 hover:bg-amber-50 ${className}`;
    }
    else {
      // Default to regular Button styling
      return className;
    }
  };
  
  const handleClick = () => {
    // Use the handleActionClick hook for standardized action handling
    handleActionClick({
      type,
      id,
      title,
      path,
      // This allows custom handlers to be injected if needed
      action: undefined
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant !== "amber" && variant !== "amber-outline" ? variant : "outline"}
      size={size}
      className={getButtonClasses()}
    >
      {title}
    </Button>
  );
};

export default ActionButton;
