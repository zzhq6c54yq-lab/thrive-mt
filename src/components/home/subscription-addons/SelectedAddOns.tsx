
import React from "react";
import { AddOn } from "./types";

interface SelectedAddOnsProps {
  selectedAddOns: string[];
  addOns: AddOn[];
  billingCycle: 'monthly' | 'yearly';
  getAddOnPrice: (id: string) => string;
  calculateTotalPrice: () => number;
}

const SelectedAddOns: React.FC<SelectedAddOnsProps> = ({
  selectedAddOns,
  addOns,
  billingCycle,
  getAddOnPrice,
  calculateTotalPrice,
}) => {
  if (selectedAddOns.length === 0) return null;

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">
        Selected Add-ons
      </h3>
      <div className="space-y-3">
        {selectedAddOns.map(id => {
          const addOn = addOns.find(a => a.id === id);
          if (!addOn) return null;
          const Icon = addOn.icon;
          return (
            <div key={id} className="flex justify-between items-center py-1">
              <div className="flex items-center">
                <Icon className="h-5 w-5 mr-3 text-[#B87333]" />
                <span className="font-medium">{addOn.title}</span>
              </div>
              <span className="font-medium">{getAddOnPrice(id)}</span>
            </div>
          );
        })}
        <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-2 font-bold">
          <span>{billingCycle === 'yearly' ? 'Yearly Total:' : 'Monthly Total:'}</span>
          <span className="text-xl text-[#E5C5A1]">
            ${calculateTotalPrice()}{billingCycle === 'yearly' ? '/year' : '/month'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectedAddOns;
