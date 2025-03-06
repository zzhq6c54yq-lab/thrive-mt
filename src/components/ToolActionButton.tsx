
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lock, Percent } from 'lucide-react';

interface ToolActionButtonProps {
  label: string;
  toolName: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "copper" | "outline_copper" | "bronze" | "animated_bronze" | "animated_copper" | "neutral";
  disabledForFree?: boolean;
  requiredTier?: 'Gold' | 'Platinum';
}

const ToolActionButton: React.FC<ToolActionButtonProps> = ({ 
  label, 
  toolName, 
  className = "",
  variant = "copper",
  disabledForFree = false,
  requiredTier
}) => {
  const { toast } = useToast();

  const handleAction = () => {
    if (disabledForFree) {
      const creditInfo = requiredTier === 'Gold' ? '15%' : '25%';
      toast({
        title: "Premium Feature",
        description: `This feature requires a ${requiredTier} subscription with ${creditInfo} co-pay credit. Upgrade your account to access all features.`,
      });
      return;
    }

    // In a real app, this would perform the actual tool action
    toast({
      title: `${toolName} - ${label}`,
      description: "This feature will be available soon. We're working on making this tool fully functional.",
    });
  };

  return (
    <Button
      variant={variant}
      onClick={handleAction}
      className={`hero-button ${className}`}
    >
      {disabledForFree && <Lock className="mr-2 h-4 w-4" />}
      {label}
    </Button>
  );
};

export default ToolActionButton;
