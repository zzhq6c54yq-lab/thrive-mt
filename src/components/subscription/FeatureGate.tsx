import React from 'react';
import { Lock, Crown, ArrowUpCircle } from 'lucide-react';
import { useSubscriptionFeatures, SubscriptionTier } from '@/hooks/useSubscriptionFeatures';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiredTier?: SubscriptionTier;
}

const DEFAULT_FALLBACK: React.FC<{ feature: string; requiredTier?: SubscriptionTier }> = ({ feature, requiredTier }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center gap-3">
      <div className="p-3 rounded-full bg-[#D4AF37]/10">
        <Lock className="w-6 h-6 text-[#D4AF37]" />
      </div>
      <h3 className="text-white font-semibold text-sm">Premium Feature</h3>
      <p className="text-white/60 text-xs max-w-[200px]">
        {requiredTier === 'Trinity' 
          ? 'This feature is exclusive to Trinity subscribers.'
          : `Upgrade to ${requiredTier || 'Gold'} or higher to unlock this feature.`}
      </p>
      <Button
        size="sm"
        onClick={() => navigate('/app/subscription')}
        className="bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] hover:from-[#B8941F] hover:to-[#D4B491] text-black font-medium mt-1"
      >
        <ArrowUpCircle className="w-3.5 h-3.5 mr-1.5" />
        Upgrade Plan
      </Button>
    </div>
  );
};

const FeatureGate: React.FC<FeatureGateProps> = ({ feature, children, fallback, requiredTier }) => {
  const { isFeatureLocked } = useSubscriptionFeatures();

  if (isFeatureLocked(feature)) {
    return <>{fallback || <DEFAULT_FALLBACK feature={feature} requiredTier={requiredTier} />}</>;
  }

  return <>{children}</>;
};

export default FeatureGate;
