
import React from "react";

interface BillingToggleProps {
  billingCycle: 'monthly' | 'yearly';
  onBillingChange: (cycle: 'monthly' | 'yearly') => void;
  getPaymentPeriodText: (isYearly: boolean) => string;
  savingsText: string;
}

const BillingToggle: React.FC<BillingToggleProps> = ({
  billingCycle,
  onBillingChange,
  getPaymentPeriodText,
  savingsText,
}) => {
  return (
    <div className="flex p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
      <button
        className={`px-4 py-2 rounded-md text-sm transition-all ${
          billingCycle === 'monthly' 
            ? 'bg-[#B87333] text-white shadow-lg' 
            : 'text-gray-300 hover:text-white'
        }`}
        onClick={() => onBillingChange('monthly')}
      >
        {getPaymentPeriodText(false)}
      </button>
      <button
        className={`px-4 py-2 rounded-md text-sm transition-all flex items-center gap-2 ${
          billingCycle === 'yearly' 
            ? 'bg-[#B87333] text-white shadow-lg' 
            : 'text-gray-300 hover:text-white'
        }`}
        onClick={() => onBillingChange('yearly')}
      >
        {getPaymentPeriodText(true)}
        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
          {savingsText}
        </span>
      </button>
    </div>
  );
};

export default BillingToggle;
