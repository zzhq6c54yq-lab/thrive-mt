
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "barter" | "plan" | "copay";
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, icon: Icon, onClick, variant = "plan" }) => {
  const getButtonStyles = () => {
    switch (variant) {
      case "barter":
        return {
          background: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)",
          borderColor: "#6b7280",
          textColor: "text-white",
          iconBg: "bg-gray-600/30"
        };
      case "copay":
        return {
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
          borderColor: "#3b82f6",
          textColor: "text-white",
          iconBg: "bg-blue-600/30"
        };
      default: // plan
        return {
          background: "linear-gradient(135deg, #B87333 0%, #E5C5A1 50%, #F5E6D3 100%)",
          borderColor: "#B87333",
          textColor: "text-white",
          iconBg: "bg-white/20"
        };
    }
  };

  const styles = getButtonStyles();

  return (
    <motion.button
      onClick={onClick}
      className={`relative px-6 py-4 rounded-xl border-2 ${styles.textColor} font-semibold text-sm transition-all duration-300 min-h-[80px] flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
      style={{
        background: styles.background,
        borderColor: styles.borderColor,
        boxShadow: `0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.2)`
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.3)`
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon container with better prominence */}
      <div className={`${styles.iconBg} p-2 rounded-lg backdrop-blur-sm border border-white/10`}>
        <Icon className="h-6 w-6" />
      </div>
      
      {/* Button text */}
      <span className="text-center leading-tight">{title}</span>
      
      {/* Inner glow effect */}
      <div 
        className="absolute inset-1 rounded-lg opacity-30"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 60%)"
        }}
      />
    </motion.button>
  );
};

interface ActionButtonGroupProps {
  onBarterClick: () => void;
  onPlanClick: () => void;
  onCoPayClick: () => void;
}

const ActionButtonGroup: React.FC<ActionButtonGroupProps> = ({
  onBarterClick,
  onPlanClick,
  onCoPayClick
}) => {
  // Using placeholder icons since we can't import the exact ones
  const BarterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
    </svg>
  );
  
  const PlanIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  );
  
  const CoPayIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
      <ActionButton
        title="Barter"
        icon={BarterIcon as any}
        onClick={onBarterClick}
        variant="barter"
      />
      <ActionButton
        title="Plan"
        icon={PlanIcon as any}
        onClick={onPlanClick}
        variant="plan"
      />
      <ActionButton
        title="Co-Pay"
        icon={CoPayIcon as any}
        onClick={onCoPayClick}
        variant="copay"
      />
    </div>
  );
};

export default ActionButtonGroup;
