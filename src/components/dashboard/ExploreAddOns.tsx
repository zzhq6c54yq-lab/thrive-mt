import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addOns } from '@/components/home/subscription-addons/data';
import AddOnGrid from '@/components/home/subscription-addons/AddOnGrid';
import useTranslation from '@/hooks/useTranslation';

const ExploreAddOns: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [expandedAddon, setExpandedAddon] = useState<string | null>(null);
  const [billingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { isSpanish } = useTranslation();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddOnToggle = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) 
        ? prev.filter(addOnId => addOnId !== id)
        : [...prev, id]
    );
  };

  const handleToggleExpand = (id: string) => {
    setExpandedAddon(expandedAddon === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 mb-6">
      <Button
        onClick={handleToggle}
        className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A66B2E] hover:to-[#D4B490] text-black font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-between group"
      >
        <span className="text-lg">
          {isSpanish ? 'Explorar Complementos' : 'Explore Add-ons'}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <ChevronUp className="h-6 w-6 transition-transform group-hover:scale-110" />
          ) : (
            <ChevronDown className="h-6 w-6 transition-transform group-hover:scale-110" />
          )}
        </motion.div>
      </Button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div className="mt-6 bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1] mb-2">
              {isSpanish ? 'Programas Especializados' : 'Specialized Programs'}
            </h3>
            <p className="text-gray-300">
              {isSpanish 
                ? 'Descubre recursos especializados diseñados para tu situación específica'
                : 'Discover specialized resources designed for your specific situation'
              }
            </p>
          </div>

          <AddOnGrid
            addOns={addOns}
            selectedAddOns={selectedAddOns}
            expandedAddon={expandedAddon}
            billingCycle={billingCycle}
            onToggleExpand={handleToggleExpand}
            onToggle={handleAddOnToggle}
            selectedPlan="Basic"
          />

          {selectedAddOns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 mt-6"
            >
              <h4 className="font-semibold mb-3 text-[#E5C5A1]">
                {isSpanish ? 'Programas Seleccionados:' : 'Selected Programs:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedAddOns.map(id => {
                  const addOn = addOns.find(a => a.id === id);
                  if (!addOn) return null;
                  const Icon = addOn.icon;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#B87333]/20 to-[#E5C5A1]/20 border border-[#B87333]/30 rounded-full px-3 py-1"
                    >
                      <Icon className="h-4 w-4 text-[#B87333]" />
                      <span className="text-sm font-medium text-white">
                        {isSpanish ? addOn.titleSpanish : addOn.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ExploreAddOns;