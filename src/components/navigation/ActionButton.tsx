import React from "react";
import { Button } from "@/components/ui/button";
import { useFeatureActions } from "@/hooks/useFeatureActions";

// Define the action types that we support
type ActionType = 'workshop' | 'assessment' | 'download' | 'practice' | 'discussion' | 
                 'hangout' | 'join' | 'redeem' | 'record' | 'view' | 'other';

// Update to match the allowed button variants from button.tsx
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | 
                    "gold" | "gold-outline" | "henry" | "bronze" | "amber" | "amber-outline";

// Props interface for ActionButton
interface ActionButtonProps {
  type: ActionType;
  id?: string;
  title: string;
  path?: string;
  className?: string;
  variant?: ButtonVariant | "amber" | "amber-outline"; // Allow our custom variants
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

  // Fix for TypeScript error by ensuring variant is a valid value
  const getButtonVariant = (): ButtonVariant => {
    // If variant is one of our custom types, use 'outline' as the base
    if (variant === "amber" || variant === "amber-outline") {
      return "outline";
    }
    // Otherwise, return the variant as is since it should be a valid ButtonVariant
    return variant as ButtonVariant;
  };

  return (
    <Button
      onClick={handleClick}
      variant={getButtonVariant()}
      size={size}
      className={getButtonClasses()}
    >
      {title}
    </Button>
  );
};

export default ActionButton;
