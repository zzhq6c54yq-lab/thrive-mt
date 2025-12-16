import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, ChevronRight } from 'lucide-react';

const PricingCalculator: React.FC = () => {
  const [serviceType, setServiceType] = useState<'therapy' | 'coaching'>('therapy');
  const [sessionFrequency, setSessionFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');
  const [hasInsurance, setHasInsurance] = useState<boolean | null>(null);
  const [showEstimate, setShowEstimate] = useState(false);

  const calculateEstimate = () => {
    let basePrice = 0;
    
    if (serviceType === 'therapy') {
      basePrice = hasInsurance ? 25 : 180; // Insurance copay vs self-pay
    } else {
      basePrice = 120; // Coaching hourly rate
    }

    const sessionsPerMonth = sessionFrequency === 'weekly' ? 4 : sessionFrequency === 'biweekly' ? 2 : 1;
    const monthlyTotal = basePrice * sessionsPerMonth;
    const savings = hasInsurance && serviceType === 'therapy' ? (180 - 25) * sessionsPerMonth : 0;

    return { basePrice, sessionsPerMonth, monthlyTotal, savings };
  };

  const handleCalculate = () => {
    setShowEstimate(true);
  };

  const estimate = calculateEstimate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-black border-[#D4AF37]/20 p-5 md:p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <Calculator className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37] flex-shrink-0" />
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground">Pricing Calculator</h3>
            <p className="text-xs md:text-sm text-foreground/60">Get a personalized cost estimate</p>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 md:mb-3">
              What service are you interested in?
            </label>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <button
                onClick={() => setServiceType('therapy')}
                className={`p-3 md:p-4 rounded-lg border transition-all text-left ${
                  serviceType === 'therapy'
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-foreground'
                    : 'bg-background/50 border-border/30 text-muted-foreground hover:border-[#D4AF37]/50'
                }`}
              >
                <div className="font-semibold text-sm md:text-base">Therapy</div>
                <div className="text-xs mt-1">Licensed therapist</div>
              </button>
              <button
                onClick={() => setServiceType('coaching')}
                className={`p-3 md:p-4 rounded-lg border transition-all text-left ${
                  serviceType === 'coaching'
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-foreground'
                    : 'bg-background/50 border-border/30 text-muted-foreground hover:border-[#D4AF37]/50'
                }`}
              >
                <div className="font-semibold text-sm md:text-base">Coaching</div>
                <div className="text-xs mt-1">Mental wellness coach</div>
              </button>
            </div>
          </div>

          {/* Session Frequency */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 md:mb-3">
              How often would you like sessions?
            </label>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {(['weekly', 'biweekly', 'monthly'] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setSessionFrequency(freq)}
                  className={`p-2 md:p-3 rounded-lg border text-xs md:text-sm transition-all ${
                    sessionFrequency === freq
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-foreground'
                      : 'bg-background/50 border-border/30 text-muted-foreground hover:border-[#D4AF37]/50'
                  }`}
                >
                  {freq === 'weekly' ? 'Weekly' : freq === 'biweekly' ? 'Bi-weekly' : 'Monthly'}
                </button>
              ))}
            </div>
          </div>

          {/* Insurance */}
          {serviceType === 'therapy' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 md:mb-3">
                Do you have insurance?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <button
                  onClick={() => setHasInsurance(true)}
                  className={`p-3 md:p-4 rounded-lg border transition-all text-sm md:text-base ${
                    hasInsurance === true
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-foreground'
                      : 'bg-background/50 border-border/30 text-muted-foreground hover:border-[#D4AF37]/50'
                  }`}
                >
                  Yes, I have insurance
                </button>
                <button
                  onClick={() => setHasInsurance(false)}
                  className={`p-3 md:p-4 rounded-lg border transition-all text-sm md:text-base ${
                    hasInsurance === false
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-foreground'
                      : 'bg-background/50 border-border/30 text-muted-foreground hover:border-[#D4AF37]/50'
                  }`}
                >
                  No, I'll self-pay
                </button>
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            disabled={serviceType === 'therapy' && hasInsurance === null}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold text-sm md:text-base"
          >
            Calculate Estimate
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>

          {/* Estimate Results */}
          {showEstimate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="mt-4 md:mt-6 p-4 md:p-6 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg"
            >
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Your Estimate</h4>
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-foreground/70">Per Session</span>
                  <span className="font-semibold text-foreground">${estimate.basePrice}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-foreground/70">Sessions per Month</span>
                  <span className="font-semibold text-foreground">{estimate.sessionsPerMonth}</span>
                </div>
                {estimate.savings > 0 && (
                  <div className="flex justify-between text-green-400 text-sm md:text-base">
                    <span>Insurance Savings</span>
                    <span className="font-semibold">-${estimate.savings}</span>
                  </div>
                )}
                <div className="border-t border-[#D4AF37]/30 pt-2 md:pt-3 mt-2 md:mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-medium text-foreground">Monthly Total</span>
                    <span className="text-xl md:text-2xl font-bold text-[#D4AF37]">${estimate.monthlyTotal}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 md:mt-6 bg-[#D4AF37] hover:bg-[#E5C5A1] text-black font-semibold text-sm md:text-base">
                Schedule Consultation
              </Button>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default PricingCalculator;
