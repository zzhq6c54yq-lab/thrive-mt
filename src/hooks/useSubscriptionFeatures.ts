import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';

export type SubscriptionTier = 'Free' | 'Basic' | 'Gold' | 'Platinum' | 'Trinity';

interface TierConfig {
  henryDailyLimit: number; // -1 = unlimited
  price: number;
  features: string[];
  portalAccess: 'none' | 'one' | 'all';
  crossPlatformAccess: boolean;
}

const TIER_CONFIG: Record<SubscriptionTier, TierConfig> = {
  Free: {
    henryDailyLimit: 5,
    price: 0,
    features: ['Basic mood tracking', 'Daily check-ins', 'Community wall (read)', 'Crisis resources'],
    portalAccess: 'none',
    crossPlatformAccess: false,
  },
  Basic: {
    henryDailyLimit: 5,
    price: 0,
    features: ['Basic mood tracking', 'Daily check-ins', 'Community wall (read)', 'Crisis resources'],
    portalAccess: 'none',
    crossPlatformAccess: false,
  },
  Gold: {
    henryDailyLimit: 20,
    price: 5,
    features: ['Everything in Free', 'Extended journaling', 'Breathing exercises', 'Binaural beats', 'Community wall (post)', 'Art therapy', 'Sleep tracker'],
    portalAccess: 'none',
    crossPlatformAccess: false,
  },
  Platinum: {
    henryDailyLimit: -1,
    price: 10,
    features: ['Everything in Gold', 'Unlimited Henry messages', 'Video diary', 'All assessments', 'Therapist matching', 'Advanced analytics', 'Priority support'],
    portalAccess: 'none',
    crossPlatformAccess: false,
  },
  Trinity: {
    henryDailyLimit: -1,
    price: 23,
    features: ['Everything in Platinum', '1 specialized portal included', 'Thrive ST access', 'Thrive PT access', 'Trinity Dashboard', 'Elite priority support', 'Cross-platform data sync'],
    portalAccess: 'one',
    crossPlatformAccess: true,
  },
};

export function useSubscriptionFeatures() {
  const { user, subscription } = useUser();
  const [dailyUsage, setDailyUsage] = useState(0);
  const [loadingUsage, setLoadingUsage] = useState(true);

  const currentTier: SubscriptionTier = (() => {
    const tier = subscription?.subscription_tier;
    if (tier === 'Trinity') return 'Trinity';
    if (tier === 'Platinum') return 'Platinum';
    if (tier === 'Gold') return 'Gold';
    if (tier === 'Basic') return 'Free';
    return 'Free';
  })();

  const config = TIER_CONFIG[currentTier];

  const fetchDailyUsage = useCallback(async () => {
    if (!user) { setLoadingUsage(false); return; }
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('henry_daily_usage')
        .select('message_count')
        .eq('user_id', user.id)
        .eq('usage_date', today)
        .maybeSingle();
      setDailyUsage(data?.message_count ?? 0);
    } catch {
      setDailyUsage(0);
    } finally {
      setLoadingUsage(false);
    }
  }, [user]);

  useEffect(() => { fetchDailyUsage(); }, [fetchDailyUsage]);

  const henryDailyLimit = config.henryDailyLimit;
  const henryMessagesRemaining = henryDailyLimit === -1 ? Infinity : Math.max(0, henryDailyLimit - dailyUsage);
  const canSendHenryMessage = henryDailyLimit === -1 || dailyUsage < henryDailyLimit;

  const incrementHenryUsage = useCallback(async () => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    const { data: existing } = await supabase
      .from('henry_daily_usage')
      .select('id, message_count')
      .eq('user_id', user.id)
      .eq('usage_date', today)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('henry_daily_usage')
        .update({ message_count: existing.message_count + 1 })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('henry_daily_usage')
        .insert({ user_id: user.id, usage_date: today, message_count: 1 });
    }
    setDailyUsage(prev => prev + 1);
  }, [user]);

  const isFeatureLocked = useCallback((feature: string): boolean => {
    const goldFeatures = ['journaling', 'breathing', 'binaural', 'community_post', 'art_therapy', 'sleep_tracker'];
    const platinumFeatures = ['video_diary', 'assessments', 'therapist_matching', 'advanced_analytics'];
    const trinityFeatures = ['cross_platform', 'trinity_dashboard'];

    if (trinityFeatures.includes(feature)) return currentTier !== 'Trinity';
    if (platinumFeatures.includes(feature)) return !['Platinum', 'Trinity'].includes(currentTier);
    if (goldFeatures.includes(feature)) return !['Gold', 'Platinum', 'Trinity'].includes(currentTier);
    return false;
  }, [currentTier]);

  const isPortalLocked = useCallback((_portalId: string): boolean => {
    if (currentTier === 'Trinity') return false; // Trinity gets one portal free — simplified; real logic would track which one
    return true; // All other tiers: portals locked
  }, [currentTier]);

  return {
    currentTier,
    config,
    dailyUsage,
    henryDailyLimit,
    henryMessagesRemaining,
    canSendHenryMessage,
    incrementHenryUsage,
    isFeatureLocked,
    isPortalLocked,
    loadingUsage,
    refreshUsage: fetchDailyUsage,
    tierConfigs: TIER_CONFIG,
  };
}
