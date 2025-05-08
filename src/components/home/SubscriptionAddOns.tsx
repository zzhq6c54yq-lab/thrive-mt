
import React, { useState } from "react";
import { motion } from "framer-motion";
import useTranslation from "@/hooks/useTranslation";
import { addOns } from "./subscription-addons/data";
import type { SubscriptionAddOnsProps } from "./subscription-addons/types";
import BackgroundEffect from "./subscription-addons/BackgroundEffect";
import Header from "./subscription-addons/Header";
import AddOnGrid from "./subscription-addons/AddOnGrid";
import SelectedAddOns from "./subscription-addons/SelectedAddOns";
import NavigationButtons from "./subscription-addons/NavigationButtons";
import { 
  getAddOnPrice,
  calculateTotalPrice,
  getPricingExplanation
} from "./subscription-addons/PriceCalculator";

const SubscriptionAddOns: React.FC<SubscriptionAddOnsProps> = ({
  selectedPlan,
  selectedAddOns,
  onAddOnToggle,
  onContinue,
  onPrevious,
  onSkip,
}) => {
  const { getTranslatedText, preferredLanguage } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedAddon, setExpandedAddon] = useState<string | null>(null);

  const toggleExpandAddon = (id: string) => {
    setExpandedAddon(expandedAddon === id ? null : id);
  };

  // Create wrapper functions that use our utility functions but pass the current state
  const getAddOnPriceFormatted = (id: string) => getAddOnPrice(id, selectedPlan, billingCycle);
  const calculateTotalPriceFormatted = () => calculateTotalPrice(selectedAddOns, selectedPlan, billingCycle);
  
  const pricingExplanation = getPricingExplanation(selectedPlan, getTranslatedText);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white animate-fade-in py-10 relative">
      <BackgroundEffect />
      
      <div className="max-w-6xl w-full mx-auto px-4 z-10">
        <Header 
          getTranslatedText={getTranslatedText}
          selectedPlan={selectedPlan}
          billingCycle={billingCycle}
          onBillingChange={setBillingCycle}
          preferredLanguage={preferredLanguage}
          pricingExplanation={pricingExplanation}
        />
        
        <AddOnGrid 
          addOns={addOns}
          selectedAddOns={selectedAddOns}
          expandedAddon={expandedAddon}
          billingCycle={billingCycle}
          onToggleExpand={toggleExpandAddon}
          onToggle={onAddOnToggle}
          selectedPlan={selectedPlan}
        />
        
        <SelectedAddOns
          selectedAddOns={selectedAddOns}
          addOns={addOns}
          billingCycle={billingCycle}
          getAddOnPrice={getAddOnPriceFormatted}
          calculateTotalPrice={calculateTotalPriceFormatted}
        />
        
        <NavigationButtons 
          getTranslatedText={getTranslatedText}
          onPrevious={onPrevious}
          onContinue={onContinue}
          onSkip={onSkip}
        />
      </div>
    </div>
  );
};

export default SubscriptionAddOns;
