
import { LucideIcon } from "lucide-react";

export interface AddOn {
  id: string;
  title: string;
  description: string;
  targetAudience?: string;
  features?: string[];
  icon: LucideIcon;
  path: string;
  gradient: string;
  borderColor?: string;
  imagePath: string;
  price: {
    basic?: string;
    gold?: string;
    platinum?: string;
    monthly?: number;
    yearly?: number;
  };
  recommended?: boolean;
  free?: boolean;
}

export interface SubscriptionAddOnsProps {
  selectedPlan: string | null;
  selectedAddOns: string[];
  onAddOnToggle: (id: string) => void;
  onContinue: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}
