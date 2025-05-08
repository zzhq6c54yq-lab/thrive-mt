
import React from 'react';
import { getPriceDisplayWithStrikethrough } from './PriceCalculator';

interface PriceDisplayProps {
  plan: string | null;
  billingCycle: 'monthly' | 'yearly';
}

/**
 * Component to display price with strikethrough for yearly discounts
 */
export const PriceDisplayWithStrikethrough: React.FC<PriceDisplayProps> = ({ plan, billingCycle }) => {
  const priceData = getPriceDisplayWithStrikethrough(plan, billingCycle);
  
  if (typeof priceData === 'string') {
    return <span>{priceData}</span>;
  }
  
  const { yearlyPrice, discountedPrice } = priceData;
  
  return (
    <div className="flex flex-col items-end">
      <span className="text-xs text-white/70 line-through">${yearlyPrice}/year</span>
      <span className="text-lg font-bold">${discountedPrice}/year</span>
    </div>
  );
};
