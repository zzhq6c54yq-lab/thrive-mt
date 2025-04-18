
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import useTranslation from "@/hooks/useTranslation";
import AddOnCard from "./subscription-addons/AddOnCard";
import BillingToggle from "./subscription-addons/BillingToggle";
import SelectedAddOns from "./subscription-addons/SelectedAddOns";
import { addOns } from "./subscription-addons/data";
import type { SubscriptionAddOnsProps } from "./subscription-addons/types";

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

  const getPriceDisplay = (addOn: AddOn) => {
    let basePrice = 0;
    if (!selectedPlan || selectedPlan.toLowerCase() === 'basic') {
      basePrice = 3;
    } else if (selectedPlan.toLowerCase() === 'gold') {
      basePrice = 2;
    } else if (selectedPlan.toLowerCase() === 'platinum') {
      basePrice = 1;
    }

    if (billingCycle === 'yearly') {
      const yearlyPrice = basePrice * 12;
      const discountedPrice = Math.round(yearlyPrice * 0.8);
      return (
        <div className="flex flex-col items-end">
          <span className="text-xs text-white/70 line-through">${yearlyPrice}/year</span>
          <span className="text-lg font-bold">${discountedPrice}/year</span>
        </div>
      );
    }
    return `$${basePrice}/month`;
  };

  const getAddOnPrice = (id: string) => {
    const addOn = addOns.find(a => a.id === id);
    if (!addOn) return "$0";
    
    let basePrice = 0;
    if (!selectedPlan || selectedPlan.toLowerCase() === 'basic') {
      basePrice = 3;
    } else if (selectedPlan.toLowerCase() === 'gold') {
      basePrice = 2;
    } else if (selectedPlan.toLowerCase() === 'platinum') {
      basePrice = 1;
    }

    if (billingCycle === 'yearly') {
      const yearlyPrice = basePrice * 12;
      const discountedPrice = Math.round(yearlyPrice * 0.8);
      return `$${discountedPrice}/year`;
    }
    
    return `$${basePrice}/month`;
  };

  const calculateTotalPrice = () => {
    if (selectedAddOns.length === 0) return 0;
    
    let basePrice = 0;
    if (!selectedPlan || selectedPlan.toLowerCase() === 'basic') {
      basePrice = 3;
    } else if (selectedPlan.toLowerCase() === 'gold') {
      basePrice = 2;
    } else if (selectedPlan.toLowerCase() === 'platinum') {
      basePrice = 1;
    }
    
    const monthlyTotal = basePrice * selectedAddOns.length;
    
    if (billingCycle === 'yearly') {
      const yearlyPrice = monthlyTotal * 12;
      return Math.round(yearlyPrice * 0.8);
    }
    
    return monthlyTotal;
  };

  const getPaymentPeriodText = (isYearly: boolean) => {
    if (preferredLanguage === 'Español') {
      return isYearly ? 'Anual' : 'Mensual';
    } else if (preferredLanguage === 'Português') {
      return isYearly ? 'Anual' : 'Mensal';
    }
    return isYearly ? 'Yearly' : 'Monthly';
  };

  const savingsText = () => {
    if (preferredLanguage === 'Español') {
      return '¡Ahorra 20%!';
    } else if (preferredLanguage === 'Português') {
      return 'Economize 20%!';
    }
    return 'Save 20%!';
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white animate-fade-in py-10 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#D946EF]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl w-full mx-auto px-4 z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">
            {getTranslatedText('deepenJourney')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {getTranslatedText('addSpecializedPrograms')}
          </p>
          
          {selectedPlan && (
            <div className="mt-4 mb-2">
              <span className="font-medium text-amber-300 inline-block py-1 px-3 rounded-full bg-amber-900/30 border border-amber-500/20">
                {selectedPlan} {getTranslatedText('planSelected')}
              </span>
              <p className="text-sm text-amber-200/70 mt-2">{getPricingExplanation()}</p>
            </div>
          )}

          <div className="flex items-center justify-center mt-6">
            <BillingToggle
              billingCycle={billingCycle}
              onBillingChange={setBillingCycle}
              getPaymentPeriodText={getPaymentPeriodText}
              savingsText={savingsText()}
            />
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {addOns.map((addOn) => (
            <motion.div key={addOn.id} variants={cardVariants}>
              <AddOnCard
                addOn={addOn}
                isSelected={selectedAddOns.includes(addOn.id)}
                expandedAddon={expandedAddon}
                priceDisplay={getPriceDisplay(addOn)}
                onToggleExpand={toggleExpandAddon}
                onToggle={onAddOnToggle}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <SelectedAddOns
          selectedAddOns={selectedAddOns}
          addOns={addOns}
          billingCycle={billingCycle}
          getAddOnPrice={getAddOnPrice}
          calculateTotalPrice={calculateTotalPrice}
        />
        
        <div className="flex flex-wrap justify-center space-x-4 gap-3 mt-8">
          <Button 
            variant="outline"
            className="border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 flex items-center gap-2"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-4 w-4" />
            {getTranslatedText('previous')}
          </Button>
          <Button 
            className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white flex items-center gap-2"
            onClick={onContinue}
          >
            {getTranslatedText('continue')}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={onSkip}
          >
            {getTranslatedText('skipForNow')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAddOns;
