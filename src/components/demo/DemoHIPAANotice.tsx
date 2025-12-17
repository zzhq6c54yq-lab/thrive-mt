import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Heart, CheckCircle, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DemoHIPAANoticeProps {
  onContinue: () => void;
}

const DemoHIPAANotice: React.FC<DemoHIPAANoticeProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onContinue}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
      </motion.button>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        {/* Shield icon with glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative mb-6 sm:mb-8"
        >
          <div className="absolute inset-0 bg-[#B87333]/30 blur-2xl rounded-full scale-150" />
          <div className="relative p-4 sm:p-6 bg-gradient-to-br from-[#B87333]/20 to-[#D4A574]/20 rounded-full border border-[#B87333]/30">
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-[#D4A574]" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-3 sm:mb-4"
        >
          Your Privacy Matters
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg text-white/70 text-center max-w-md mb-8 sm:mb-10 px-4"
        >
          ThriveMT is built with HIPAA-compliant security to protect your mental health journey.
        </motion.p>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm sm:max-w-md space-y-3 sm:space-y-4 px-4"
        >
          {[
            { icon: Lock, title: 'End-to-End Encryption', desc: 'Your data is encrypted at rest and in transit' },
            { icon: Shield, title: 'HIPAA Compliant', desc: 'Healthcare-grade privacy protection' },
            { icon: Heart, title: 'You Control Your Data', desc: 'Access, export, or delete anytime' },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="p-2 bg-[#B87333]/20 rounded-lg shrink-0">
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574]" />
              </div>
              <div>
                <h3 className="font-medium text-white text-sm sm:text-base">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-white/60">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Acknowledgment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 sm:mt-8 flex items-center gap-2 text-white/50 text-xs sm:text-sm px-4 text-center"
        >
          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
          <span>By continuing, you acknowledge our commitment to your privacy</span>
        </motion.div>
      </div>

      {/* Bottom action area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="p-4 sm:p-6 pb-8 sm:pb-10"
      >
        <Button
          onClick={onContinue}
          className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 py-5 sm:py-6 bg-gradient-to-r from-[#B87333] to-[#D4A574] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-base sm:text-lg"
        >
          Continue to ThriveMT
          <ChevronUp className="w-5 h-5 animate-bounce" />
        </Button>

        {/* Swipe hint for mobile */}
        <p className="text-center text-white/40 text-xs mt-3 sm:hidden">
          Tap button or swipe up to continue
        </p>
      </motion.div>
    </div>
  );
};

export default DemoHIPAANotice;
