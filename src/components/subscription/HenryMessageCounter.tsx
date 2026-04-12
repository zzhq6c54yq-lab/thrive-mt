import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Infinity, Crown } from 'lucide-react';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';

const HenryMessageCounter: React.FC = () => {
  const { currentTier, dailyUsage, henryDailyLimit, henryMessagesRemaining, canSendHenryMessage } = useSubscriptionFeatures();

  const isUnlimited = henryDailyLimit === -1;
  const percentage = isUnlimited ? 100 : Math.min(100, (dailyUsage / henryDailyLimit) * 100);

  const tierColor = {
    Free: 'text-gray-400',
    Basic: 'text-gray-400',
    Gold: 'text-[#D4AF37]',
    Platinum: 'text-[#E5E4E2]',
    Trinity: 'text-[#D4AF37]',
  }[currentTier];

  const barColor = {
    Free: 'bg-gray-500',
    Basic: 'bg-gray-500',
    Gold: 'bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1]',
    Platinum: 'bg-gradient-to-r from-[#E5E4E2] to-white',
    Trinity: 'bg-gradient-to-r from-[#D4AF37] via-[#E5C5A1] to-[#D4AF37]',
  }[currentTier];

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
      <MessageSquare className={`w-4 h-4 ${tierColor}`} />
      
      {isUnlimited ? (
        <div className="flex items-center gap-1.5">
          <Infinity className={`w-4 h-4 ${tierColor}`} />
          <span className={`text-xs font-medium ${tierColor}`}>Unlimited</span>
          {currentTier === 'Trinity' && <Crown className="w-3 h-3 text-[#D4AF37]" />}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${barColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className={`text-xs font-medium ${!canSendHenryMessage ? 'text-red-400' : 'text-gray-300'}`}>
            {henryMessagesRemaining}/{henryDailyLimit}
          </span>
        </div>
      )}
    </div>
  );
};

export default HenryMessageCounter;
