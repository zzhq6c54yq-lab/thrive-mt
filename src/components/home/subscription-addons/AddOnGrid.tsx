import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, cardVariants } from './AnimationVariants';
import AddOnCard from './AddOnCard';
import { AddOn } from './data';
import { PriceDisplayWithStrikethrough } from './PriceDisplay';
import { getPriceDisplay } from './PriceCalculator';

interface AddOnGridProps {
  addOns: AddOn[];
  selectedAddOns: string[];
  expandedAddon: string | null;
  billingCycle: 'monthly' | 'yearly';
  onToggleExpand: (id: string) => void;
  onToggle: (id: string) => void;
  selectedPlan: string | null;
  onCheckout?: (addOnId: string) => void;
}

const AddOnGrid: React.FC<AddOnGridProps> = ({
  addOns,
  selectedAddOns,
  expandedAddon,
  billingCycle,
  onToggleExpand,
  onToggle,
  selectedPlan,
  onCheckout
}) => {
  return (
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
            priceDisplay={billingCycle === 'yearly' 
              ? <PriceDisplayWithStrikethrough plan={selectedPlan} billingCycle={billingCycle} />
              : getPriceDisplay(selectedPlan, billingCycle)}
            selectedPlan={selectedPlan}
            onToggleExpand={onToggleExpand}
            onToggle={onToggle}
            onCheckout={onCheckout}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AddOnGrid;
