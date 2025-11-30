import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DollarSign, Users, Sparkles, Package } from 'lucide-react';
import { therapyPricing, coachingPricing, addOns, groupSessions, bundles } from '@/data/servicePricing';

interface ServicesPricingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServicesPricingModal: React.FC<ServicesPricingModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden bg-[#141921] border-bronze-300/20">
        <DialogHeader className="p-6 pb-4 border-b border-bronze-300/10">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-bronze-300 via-bronze-200 to-bronze-300 bg-clip-text text-transparent">
            Services & Pricing
          </DialogTitle>
          <p className="text-lg text-bronze-100 mt-2">
            Transparent pricing designed to fit your needs and budget
          </p>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-140px)]">
          <div className="p-6 space-y-8">
            {/* Therapy Sessions */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">Therapy Sessions</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Self-Pay */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-bronze-200">Self-Pay</h4>
                  {therapyPricing.selfPay.map((item, idx) => (
                    <div key={idx} className="bg-[#1a2332]/50 rounded-lg p-4 border border-bronze-300/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-bronze-100">{item.service}</p>
                          <p className="text-sm text-muted-foreground">{item.duration}</p>
                        </div>
                        <p className="text-xl font-bold text-bronze-300">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Insurance */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-bronze-200">Insurance Rates</h4>
                  {therapyPricing.insurance.map((item, idx) => (
                    <div key={idx} className="bg-[#1a2332]/50 rounded-lg p-4 border border-bronze-300/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-bronze-100">{item.service}</p>
                          <p className="text-sm text-muted-foreground">{item.duration}</p>
                        </div>
                        <p className="text-xl font-bold text-bronze-300">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* Coaching Sessions */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">Mental Wellness Coaching</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coachingPricing.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-bronze-500/10 to-bronze-600/5 border border-bronze-300/20 rounded-lg p-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-bronze-100">{item.service}</p>
                      <p className="text-sm text-muted-foreground">{item.duration}</p>
                      <p className="text-2xl font-bold text-bronze-300">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* Add-On Services */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">Add-On Services</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addOns.map((item, idx) => (
                  <div key={idx} className="bg-[#1a2332]/50 rounded-lg p-4 border border-bronze-300/10">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-bronze-100">{item.service}</p>
                      <p className="text-xl font-bold text-bronze-300">
                        ${item.price}{item.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* Group Sessions */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">Group Sessions</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {groupSessions.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-bronze-500/10 to-bronze-600/5 border border-bronze-300/20 rounded-lg p-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-bronze-100">{item.service}</p>
                      <p className="text-sm text-muted-foreground">{item.duration}</p>
                      <p className="text-2xl font-bold text-bronze-300">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* Bundle Packages */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-bronze-300" />
                <h3 className="text-2xl font-bold text-bronze-100">Bundle Packages</h3>
              </div>

              {/* Therapy Bundles */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-bronze-200">Therapy Bundles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bundles.therapy.map((bundle, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 border-2 border-bronze-300/30 rounded-lg p-6"
                    >
                      <h5 className="text-xl font-bold text-bronze-200 mb-2">{bundle.name}</h5>
                      <p className="text-sm text-muted-foreground mb-3">{bundle.description}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-bronze-300">${bundle.price}</p>
                        {bundle.period && <span className="text-sm text-muted-foreground">{bundle.period}</span>}
                      </div>
                      {bundle.savings && (
                        <p className="text-sm text-green-400 mt-2">Save ${bundle.savings}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Coaching Bundles */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-bronze-200">Coaching Bundles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bundles.coaching.map((bundle, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 border-2 border-bronze-300/30 rounded-lg p-6"
                    >
                      <h5 className="text-xl font-bold text-bronze-200 mb-2">{bundle.name}</h5>
                      <p className="text-sm text-muted-foreground mb-3">{bundle.description}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-bronze-300">${bundle.price}</p>
                        {bundle.period && <span className="text-sm text-muted-foreground">{bundle.period}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hybrid Bundles */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-bronze-200">Hybrid Bundles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bundles.hybrid.map((bundle, idx) => (
                    <div
                      key={idx}
                      className={`bg-gradient-to-br from-bronze-500/30 to-bronze-600/20 border-2 ${
                        bundle.popular ? 'border-bronze-300/50' : 'border-bronze-300/30'
                      } rounded-lg p-6 relative`}
                    >
                      {bundle.popular && (
                        <div className="absolute top-0 right-0 bg-bronze-300 text-background px-3 py-1 text-xs font-bold">
                          POPULAR
                        </div>
                      )}
                      <h5 className="text-xl font-bold text-bronze-200 mb-2">{bundle.name}</h5>
                      <p className="text-sm text-muted-foreground mb-3">{bundle.description}</p>
                      <p className="text-3xl font-bold text-bronze-300">${bundle.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-bronze-300/20 to-transparent" />

            {/* Footer Note */}
            <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm text-blue-200 mb-2">
                <span className="font-semibold">💡 Pricing Note:</span> All prices include a 40% profit margin to sustain ThriveMT's operations.
              </p>
              <p className="text-sm text-blue-100">
                Use promo code <span className="font-bold text-bronze-300">ThriveMT</span> for 100% discount on your first therapy session.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ServicesPricingModal;
