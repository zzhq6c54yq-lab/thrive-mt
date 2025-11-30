import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServicesPricingModal from './ServicesPricingModal';

const ServicesPricingCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#141921] to-[#1a2332] border border-bronze-300/20 hover:border-bronze-300/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:scale-[1.02]">
          {/* Header Section */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bronze-500 to-bronze-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-bronze-300 via-bronze-200 to-bronze-300 bg-clip-text text-transparent">
                    Services & Pricing
                  </h2>
                  <p className="text-bronze-100 text-sm">Transparent pricing. No hidden fees.</p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Professional therapy, mental wellness coaching, group sessions, and bundles designed to fit your needs and budget.
            </p>

            {/* Quick Price Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-[#1a2332] px-3 py-2 rounded-lg border border-bronze-300/10">
                <span className="text-sm text-muted-foreground">Individual Therapy</span>
                <span className="text-bronze-300 font-semibold">from $35</span>
              </div>
              <div className="flex items-center justify-between bg-[#1a2332] px-3 py-2 rounded-lg border border-bronze-300/10">
                <span className="text-sm text-muted-foreground">Mental Wellness Coaching</span>
                <span className="text-bronze-300 font-semibold">from $25</span>
              </div>
              <div className="flex items-center justify-between bg-[#1a2332] px-3 py-2 rounded-lg border border-bronze-300/10">
                <span className="text-sm text-muted-foreground">Group Sessions</span>
                <span className="text-bronze-300 font-semibold">from $12</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-bronze-300/10">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-white group"
                size="lg"
              >
                View All Pricing
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Visual Enhancement - Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/5 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Pricing Modal */}
      <ServicesPricingModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default ServicesPricingCard;
