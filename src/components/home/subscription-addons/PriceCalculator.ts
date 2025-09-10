
// Utility functions for price calculations in the subscription add-ons section
import React from 'react';

/**
 * Calculate the display price for an add-on based on plan and billing cycle
 * @param plan The selected subscription plan
 * @param billingCycle Monthly or yearly billing cycle
 * @returns The formatted price string
 */
export const getPriceDisplay = (
  plan: string | null, 
  billingCycle: 'monthly' | 'yearly'
): string => {
  let basePrice = getBasePriceForPlan(plan);
  
  if (billingCycle === 'yearly') {
    const yearlyPrice = basePrice * 12;
    const discountedPrice = Math.round(yearlyPrice * 0.8);
    return `$${discountedPrice}/year`;
  }
  return `$${basePrice}/month`;
};

/**
 * Create the JSX for price display with strikethrough for yearly discounts
 * @param plan The selected subscription plan
 * @param billingCycle Monthly or yearly billing cycle
 * @returns Price display information for JSX rendering
 */
export const getPriceDisplayWithStrikethrough = (
  plan: string | null,
  billingCycle: 'monthly' | 'yearly'
): { discountedPrice: number; yearlyPrice: number; } | string => {
  let basePrice = getBasePriceForPlan(plan);
  
  if (billingCycle === 'yearly') {
    const yearlyPrice = basePrice * 12;
    const discountedPrice = Math.round(yearlyPrice * 0.8);
    return { discountedPrice, yearlyPrice };
  }
  return `$${basePrice}/month`;
};

/**
 * Get the price for a specific add-on ID
 * @param id Add-on identifier
 * @param plan Currently selected plan
 * @param billingCycle Monthly or yearly billing cycle
 * @returns Formatted price string
 */
export const getAddOnPrice = (
  id: string, 
  plan: string | null,
  billingCycle: 'monthly' | 'yearly'
): string => {
  let basePrice = getBasePriceForPlan(plan);
  
  if (billingCycle === 'yearly') {
    const yearlyPrice = basePrice * 12;
    const discountedPrice = Math.round(yearlyPrice * 0.8);
    return `$${discountedPrice}/year`;
  }
  
  return `$${basePrice}/month`;
};

/**
 * Calculate the total price for all selected add-ons
 * @param selectedAddOns Array of selected add-on IDs
 * @param plan Currently selected plan
 * @param billingCycle Monthly or yearly billing cycle
 * @returns Total price as a number
 */
export const calculateTotalPrice = (
  selectedAddOns: string[],
  plan: string | null,
  billingCycle: 'monthly' | 'yearly'
): number => {
  if (selectedAddOns.length === 0) return 0;
  
  let basePrice = getBasePriceForPlan(plan);
  const monthlyTotal = basePrice * selectedAddOns.length;
  
  if (billingCycle === 'yearly') {
    const yearlyPrice = monthlyTotal * 12;
    return Math.round(yearlyPrice * 0.8);
  }
  
  return monthlyTotal;
};

/**
 * Get the base price for an add-on based on the selected plan
 * @param plan Currently selected plan
 * @returns Base price number
 */
export const getBasePriceForPlan = (plan: string | null): number => {
  if (!plan) return 2;
  
  const planLower = plan.toLowerCase();
  if (planLower === 'basic') {
    return 2;
  } else if (planLower === 'gold') {
    return 2;
  } else if (planLower === 'platinum') {
    return 1;
  }
  
  return 2; // Default to basic price
};

/**
 * Get explanation text for pricing based on the selected plan
 * @param plan Currently selected plan
 * @param getTranslatedText Function to translate text
 * @returns Explanation text
 */
export const getPricingExplanation = (
  plan: string | null,
  getTranslatedText: (key: string) => string | undefined
): string => {
  if (!plan) return '';
  
  const planLower = plan.toLowerCase();
  if (planLower === 'basic') {
    return getTranslatedText('basicPlanAddonsExplanation') || 'Basic plan members pay standard add-on pricing';
  } else if (planLower === 'gold') {
    return getTranslatedText('goldPlanAddonsExplanation') || 'Gold plan members receive a discount on add-ons';
  } else if (planLower === 'platinum') {
    return getTranslatedText('platinumPlanAddonsExplanation') || 'Platinum plan members receive maximum discounts on add-ons';
  }
  
  return '';
};
