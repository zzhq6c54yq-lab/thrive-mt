import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Crown, Star, Sparkles, Shield, Lock } from 'lucide-react';
import { useSubscriptionFeatures, SubscriptionTier } from '@/hooks/useSubscriptionFeatures';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const tierIcons: Record<SubscriptionTier, React.ReactNode> = {
  Free: <Shield className="w-6 h-6" />,
  Basic: <Shield className="w-6 h-6" />,
  Gold: <Star className="w-6 h-6" />,
  Platinum: <Sparkles className="w-6 h-6" />,
  Trinity: <Crown className="w-6 h-6" />,
};

const tierGradients: Record<string, string> = {
  Free: 'from-gray-700 to-gray-800 border-gray-600/30',
  Gold: 'from-[#D4AF37]/20 to-[#B87333]/20 border-[#D4AF37]/40',
  Platinum: 'from-[#E5E4E2]/20 to-gray-300/10 border-[#E5E4E2]/40',
  Trinity: 'from-[#D4AF37]/30 via-[#E5C5A1]/20 to-[#D4AF37]/30 border-[#D4AF37]/60',
};

const tierData = [
  {
    tier: 'Free' as SubscriptionTier,
    name: 'Free',
    price: 0,
    description: 'Start your journey',
    henryLimit: '5 daily messages',
    features: ['Basic mood tracking', 'Daily check-ins', 'Community wall (read)', 'Crisis resources', '5 Henry AI messages/day'],
    cta: 'Current Plan',
  },
  {
    tier: 'Gold' as SubscriptionTier,
    name: 'Gold',
    price: 5,
    description: 'Unlock your potential',
    henryLimit: '20 daily messages',
    features: ['Everything in Free', '20 Henry AI messages/day', 'Extended journaling', 'Breathing exercises', 'Binaural beats', 'Community posting', 'Art therapy', 'Sleep tracker'],
    cta: 'Upgrade to Gold',
    popular: false,
  },
  {
    tier: 'Platinum' as SubscriptionTier,
    name: 'Platinum',
    price: 10,
    description: 'Full access experience',
    henryLimit: 'Unlimited messages',
    features: ['Everything in Gold', 'Unlimited Henry AI', 'Video diary', 'All assessments', 'Therapist matching', 'Advanced analytics', 'Priority support'],
    cta: 'Go Platinum',
    popular: true,
  },
  {
    tier: 'Trinity' as SubscriptionTier,
    name: 'Trinity',
    price: 23,
    description: 'The complete ecosystem',
    henryLimit: 'Unlimited messages',
    features: ['Everything in Platinum', '1 specialized portal', 'Thrive ST access', 'Thrive PT access', 'Trinity Dashboard', 'Elite support', 'Cross-platform sync'],
    cta: 'Trinity Dashboard',
    elite: true,
  },
];

const SubscriptionTiers: React.FC = () => {
  const { currentTier } = useSubscriptionFeatures();
  const { user, session } = useUser();
  const { toast } = useToast();

  const handleSubscribe = async (tier: SubscriptionTier) => {
    if (tier === 'Free') return;
    
    if (tier === 'Trinity') {
      // Trinity is purchased from the Trinity Dashboard
      toast({
        title: '✨ Trinity Awaits',
        description: 'Trinity subscriptions are managed from the Trinity Dashboard — your unified gateway to all Thrive platforms.',
      });
      return;
    }

    if (!user || !session) {
      toast({ title: 'Please sign in first', variant: 'destructive' });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planTier: tier,
          billingCycle: 'monthly',
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again or contact support.',
        variant: 'destructive',
      });
    }
  };

  const isCurrentTier = (tier: SubscriptionTier) => {
    if (tier === 'Free' && (currentTier === 'Free' || currentTier === 'Basic')) return true;
    return currentTier === tier;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {tierData.map((t, i) => {
        const isCurrent = isCurrentTier(t.tier);
        const gradient = tierGradients[t.tier] || tierGradients.Free;

        return (
          <motion.div
            key={t.tier}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl border bg-gradient-to-b ${gradient} p-5 flex flex-col ${
              t.elite ? 'ring-2 ring-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.2)]' : ''
            } ${t.popular ? 'ring-1 ring-[#E5E4E2]/30' : ''}`}
          >
            {t.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E5E4E2] text-black text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            {t.elite && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Crown className="w-3 h-3" /> ELITE
              </div>
            )}

            <div className="flex items-center gap-2 mb-2">
              <div className={t.elite ? 'text-[#D4AF37]' : t.tier === 'Platinum' ? 'text-[#E5E4E2]' : t.tier === 'Gold' ? 'text-[#D4AF37]' : 'text-gray-400'}>
                {tierIcons[t.tier]}
              </div>
              <h3 className="text-lg font-bold text-white">{t.name}</h3>
            </div>

            <p className="text-sm text-gray-400 mb-3">{t.description}</p>

            <div className="mb-4">
              <span className="text-3xl font-bold text-white">${t.price}</span>
              <span className="text-gray-400 text-sm">/mo</span>
            </div>

            <div className="text-xs font-medium text-[#D4AF37] mb-3 flex items-center gap-1">
              💬 {t.henryLimit}
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSubscribe(t.tier)}
              disabled={isCurrent}
              className={`w-full ${
                t.elite
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#E5C5A1] to-[#D4AF37] text-black hover:from-[#E5C5A1] hover:to-[#D4AF37] font-bold'
                  : t.tier === 'Platinum'
                  ? 'bg-gradient-to-r from-[#E5E4E2] to-white text-black hover:from-white hover:to-[#E5E4E2]'
                  : t.tier === 'Gold'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B87333] text-black hover:from-[#B87333] hover:to-[#D4AF37]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isCurrent ? '✓ Current Plan' : t.cta}
            </Button>

            {t.tier !== 'Trinity' && t.tier !== 'Free' && (
              <p className="text-center text-xs text-gray-500 mt-2">
                Add-on portals: ${t.tier === 'Gold' ? '2' : t.tier === 'Platinum' ? '1' : '3'}/mo each
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default SubscriptionTiers;
