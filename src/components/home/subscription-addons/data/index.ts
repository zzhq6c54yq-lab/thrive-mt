
import { AddOn, addonTypes, categorizedAddOns } from './types';
import { professionAddOns } from './profession-addons';
import { demographicAddOns } from './demographic-addons';
import { conditionAddOns } from './condition-addons';

// Combine all add-ons into a single array for compatibility with existing code
export const addOns: AddOn[] = [
  ...professionAddOns,
  ...demographicAddOns,
  ...conditionAddOns
];

// Re-export types and helpers
export { addonTypes, categorizedAddOns };
export type { AddOn };

// Helper function to get add-ons by category
export const getAddOnsByCategory = (categoryId: string) => {
  const addOnIds = categorizedAddOns[categoryId as keyof typeof categorizedAddOns] || [];
  return addOns.filter(addon => addOnIds.includes(addon.id));
};

// Helper to get addon by id
export const getAddOnById = (id: string) => {
  return addOns.find(addon => addon.id === id);
};
