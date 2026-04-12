import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Star } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';

interface TrinityWelcomeProps {
  isReturning?: boolean;
}

const TrinityWelcome: React.FC<TrinityWelcomeProps> = ({ isReturning = false }) => {
  const { profile } = useUser();
  const { currentTier } = useSubscriptionFeatures();
  
  if (currentTier !== 'Trinity') return null;

  const name = profile?.display_name || 'there';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-br from-black via-[#1a1508] to-black p-6 mb-6"
    >
      {/* Animated gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -20, -40],
              scale: [0.5, 1, 0.5],
            }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <Crown className="w-12 h-12 text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
            <Sparkles className="w-5 h-5 text-[#E5C5A1] absolute -top-1 -right-1" />
          </div>
        </motion.div>

        <div className="flex-1">
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold"
          >
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#E5C5A1] to-[#D4AF37] bg-clip-text text-transparent">
              {isReturning ? `Welcome back, ${name}` : `Welcome to Trinity, ${name}`}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-sm mt-1 leading-relaxed"
          >
            {isReturning
              ? "We're honored you chose to return. Your complete wellness ecosystem is ready — Thrive MT, ST, and PT are synchronized and waiting for you."
              : "You've joined an exclusive community of individuals committed to total wellness. Your journey across mind, spirit, and body begins now."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 mt-3"
          >
            {['Thrive MT', 'Thrive ST', 'Thrive PT'].map((app) => (
              <div
                key={app}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20"
              >
                <Star className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-xs font-medium text-[#D4AF37]">{app}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrinityWelcome;
