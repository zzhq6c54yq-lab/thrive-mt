import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Heart, Users, Package, Sparkles } from 'lucide-react';
import { therapyPricing, coachingPricing, addOns, groupSessions, bundles } from '@/data/servicePricing';

const UserServicesPricing: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <DollarSign className="w-8 h-8 text-bronze-300" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-bronze-300 via-bronze-200 to-bronze-300 bg-clip-text text-transparent">
            Services & Pricing
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transparent pricing for all our mental health and wellness services. No hidden fees, no surprises.
        </p>
      </div>

      {/* Therapy Services */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-bronze-300" />
          <h3 className="text-xl font-semibold text-bronze-200">Therapy Sessions</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Self-Pay Therapy */}
          <div className="bg-[#141921] rounded-xl p-6 border border-bronze-300/20 space-y-3">
            <h4 className="text-lg font-semibold text-bronze-300">Self-Pay Rates</h4>
            <div className="space-y-2">
              {therapyPricing.selfPay.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.service} ({item.duration})</span>
                  <span className="text-bronze-200 font-medium">${item.price}/session</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Therapy */}
          <div className="bg-[#141921] rounded-xl p-6 border border-bronze-300/20 space-y-3">
            <h4 className="text-lg font-semibold text-bronze-300">Insurance Rates</h4>
            <div className="space-y-2">
              {therapyPricing.insurance.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.service} ({item.duration})</span>
                  <span className="text-bronze-200 font-medium">${item.price}/session</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Coaching Services */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-bronze-300" />
          <h3 className="text-xl font-semibold text-bronze-200">Mental Wellness Coaching</h3>
        </div>
        
        <div className="bg-[#141921] rounded-xl p-6 border border-bronze-300/20">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {coachingPricing.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{item.service} ({item.duration})</span>
                <span className="text-bronze-200 font-medium">${item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add-On Services */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-bronze-300" />
          <h3 className="text-xl font-semibold text-bronze-200">Add-On Services</h3>
        </div>
        
        <div className="bg-[#141921] rounded-xl p-6 border border-bronze-300/20">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {addOns.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{item.service}</span>
                <span className="text-bronze-200 font-medium">${item.price}{item.period}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Group Sessions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-bronze-300" />
          <h3 className="text-xl font-semibold text-bronze-200">Group Sessions</h3>
        </div>
        
        <div className="bg-[#141921] rounded-xl p-6 border border-bronze-300/20">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {groupSessions.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{item.service} ({item.duration})</span>
                <span className="text-bronze-200 font-medium">${item.price}/session</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bundle Packages */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-bronze-300" />
          <h3 className="text-xl font-semibold text-bronze-200">Bundle Packages</h3>
        </div>

        {/* Therapy Bundles */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Therapy Bundles</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bundles.therapy.map((bundle, idx) => (
              <div 
                key={idx}
                className={`bg-[#141921] rounded-xl p-4 border ${
                  'popular' in bundle && bundle.popular
                    ? 'border-bronze-300/40 ring-2 ring-bronze-300/20' 
                    : 'border-bronze-300/20'
                }`}
              >
                {'popular' in bundle && bundle.popular && (
                  <span className="inline-block bg-bronze-500/20 text-bronze-300 text-xs px-2 py-1 rounded-full mb-2">
                    Most Popular
                  </span>
                )}
                <h5 className="font-semibold text-bronze-200 mb-1">{bundle.name}</h5>
                <p className="text-xs text-muted-foreground mb-3">{bundle.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-bronze-300">${bundle.price}</span>
                  {'savings' in bundle && bundle.savings && (
                    <span className="text-xs text-green-400">Save ${String(bundle.savings)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coaching Bundles */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Coaching Bundles</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bundles.coaching.map((bundle, idx) => (
              <div 
                key={idx}
                className={`bg-[#141921] rounded-xl p-4 border ${
                  'popular' in bundle && bundle.popular
                    ? 'border-bronze-300/40 ring-2 ring-bronze-300/20' 
                    : 'border-bronze-300/20'
                }`}
              >
                {'popular' in bundle && bundle.popular && (
                  <span className="inline-block bg-bronze-500/20 text-bronze-300 text-xs px-2 py-1 rounded-full mb-2">
                    Most Popular
                  </span>
                )}
                <h5 className="font-semibold text-bronze-200 mb-1">{bundle.name}</h5>
                <p className="text-xs text-muted-foreground mb-3">{bundle.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-bronze-300">${bundle.price}</span>
                  {'savings' in bundle && bundle.savings && (
                    <span className="text-xs text-green-400">Save ${String(bundle.savings)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hybrid Bundles */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Hybrid Bundles</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bundles.hybrid.map((bundle, idx) => (
              <div 
                key={idx}
                className={`bg-[#141921] rounded-xl p-4 border ${
                  'popular' in bundle && bundle.popular
                    ? 'border-bronze-300/40 ring-2 ring-bronze-300/20' 
                    : 'border-bronze-300/20'
                }`}
              >
                {'popular' in bundle && bundle.popular && (
                  <span className="inline-block bg-bronze-500/20 text-bronze-300 text-xs px-2 py-1 rounded-full mb-2">
                    Most Popular
                  </span>
                )}
                <h5 className="font-semibold text-bronze-200 mb-1">{bundle.name}</h5>
                <p className="text-xs text-muted-foreground mb-3">{bundle.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-bronze-300">${bundle.price}</span>
                  {'savings' in bundle && bundle.savings && (
                    <span className="text-xs text-green-400">Save ${String(bundle.savings)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-bronze-500/10 rounded-xl p-4 border border-bronze-300/20 text-center">
        <p className="text-sm text-muted-foreground">
          All prices include our 40% margin to ensure quality care and sustainable service. 
          <br />
          Promo codes available - ask us about discounts!
        </p>
      </div>
    </motion.div>
  );
};

export default UserServicesPricing;
