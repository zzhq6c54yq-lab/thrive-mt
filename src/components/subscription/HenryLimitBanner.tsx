import React from 'react';
import { AlertTriangle, ArrowUpCircle } from 'lucide-react';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HenryLimitBanner: React.FC = () => {
  const { canSendHenryMessage, henryMessagesRemaining, henryDailyLimit, currentTier } = useSubscriptionFeatures();
  const navigate = useNavigate();

  if (henryDailyLimit === -1) return null; // Unlimited
  if (canSendHenryMessage && henryMessagesRemaining > 2) return null; // Plenty left

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
      !canSendHenryMessage 
        ? 'bg-red-500/10 border border-red-500/30 text-red-300' 
        : 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-300'
    }`}>
      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="flex-1">
        {!canSendHenryMessage 
          ? "You've reached your daily message limit." 
          : `${henryMessagesRemaining} message${henryMessagesRemaining === 1 ? '' : 's'} remaining today.`}
      </span>
      {currentTier !== 'Platinum' && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate('/app/subscription')}
          className="text-[#D4AF37] hover:text-[#E5C5A1] h-6 px-2 text-xs"
        >
          <ArrowUpCircle className="w-3 h-3 mr-1" />
          Upgrade
        </Button>
      )}
    </div>
  );
};

export default HenryLimitBanner;
