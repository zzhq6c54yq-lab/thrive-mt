import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Sparkles } from 'lucide-react';
import { therapyPricing, coachingPricing, addOns, groupSessions, bundles } from '@/data/servicePricing';

const CoachServicesPricing = () => {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <DollarSign className="w-6 h-6 text-blue-400" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
            Complete Pricing & Bundle Guide
          </h2>
        </div>
        <p className="text-slate-400">Quick reference for all ThriveMT services and packages</p>
      </motion.div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Therapy - Self-Pay */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/10 to-teal-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-blue-300 mb-4">Mental Health Therapy - Self-Pay</h3>
          <div className="space-y-2">
            {therapyPricing.selfPay.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors px-2 rounded">
                <div>
                  <span className="text-slate-200">{item.service}</span>
                  <span className="text-slate-500 text-sm ml-2">{item.duration}</span>
                </div>
                <span className="text-teal-400 font-semibold">${item.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Therapy - Insurance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-emerald-300 mb-4">Therapy - Insurance</h3>
          <div className="space-y-2">
            {therapyPricing.insurance.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors px-2 rounded">
                <div>
                  <span className="text-slate-200">{item.service}</span>
                  <span className="text-slate-500 text-sm ml-2">{item.duration}</span>
                </div>
                <span className="text-emerald-400 font-semibold">${item.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Coaching */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-blue-300 mb-4">Mental Health Coaching</h3>
          <div className="space-y-2">
            {coachingPricing.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors px-2 rounded">
                <div>
                  <span className="text-slate-200">{item.service}</span>
                  <span className="text-slate-500 text-sm ml-2">{item.duration}</span>
                </div>
                <span className="text-blue-400 font-semibold">${item.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Add-Ons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-amber-300 mb-4">Add-Ons</h3>
          <div className="space-y-2">
            {addOns.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors px-2 rounded">
                <span className="text-slate-200 text-sm">{item.service}</span>
                <span className="text-amber-400 font-semibold">${item.price}{item.period}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Group Sessions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-purple-300 mb-4">Group Sessions</h3>
          <div className="space-y-2">
            {groupSessions.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors px-2 rounded">
                <div>
                  <span className="text-slate-200">{item.service}</span>
                  <span className="text-slate-500 text-sm ml-2">{item.duration}</span>
                </div>
                <span className="text-purple-400 font-semibold">${item.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bundles & Memberships - spans both columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-gradient-to-br from-teal-500/15 to-blue-500/15 backdrop-blur-sm border-2 border-teal-500/30 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-teal-400" />
            <h3 className="text-2xl font-bold text-teal-300">Bundles & Memberships</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Therapy Bundles */}
            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-3">Therapy Bundles</h4>
              <div className="space-y-3">
                {bundles.therapy.map((bundle, index) => (
                  <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-slate-200 text-sm">{bundle.name}</p>
                      <span className="text-blue-400 font-bold">${bundle.price}{bundle.period || ''}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">{bundle.description}</p>
                    {bundle.savings && (
                      <p className="text-xs text-emerald-400">Save ${bundle.savings}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Coaching Bundles */}
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-3">Coaching Bundles</h4>
              <div className="space-y-3">
                {bundles.coaching.map((bundle, index) => (
                  <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-purple-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-slate-200 text-sm">{bundle.name}</p>
                      <span className="text-purple-400 font-bold">${bundle.price}{bundle.period || ''}</span>
                    </div>
                    <p className="text-xs text-slate-400">{bundle.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hybrid Bundles */}
            <div>
              <h4 className="text-lg font-semibold text-teal-300 mb-3">Hybrid Bundles</h4>
              <div className="space-y-3">
                {bundles.hybrid.map((bundle, index) => (
                  <div key={index} className={`bg-slate-800/50 border rounded-lg p-4 hover:border-teal-500/50 transition-colors relative ${bundle.popular ? 'border-teal-500/50' : 'border-slate-700/50'}`}>
                    {bundle.popular && (
                      <div className="absolute -top-2 -right-2 bg-teal-500 text-slate-900 text-xs font-bold px-2 py-1 rounded">
                        POPULAR
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-slate-200 text-sm">{bundle.name}</p>
                      <span className="text-teal-400 font-bold">${bundle.price}</span>
                    </div>
                    <p className="text-xs text-slate-400">{bundle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CoachServicesPricing;
