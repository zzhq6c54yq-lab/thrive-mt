import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SubscriptionPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, session, loading } = useUser();
  const { toast } = useToast();

  // Display prices for UI
  const displayPrices = {
    gold: { month: 5, year: 60 },
    platinum: { month: 10, year: 120 }
  };

  const handleCheckout = async (tier: 'gold' | 'platinum') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue with your subscription.",
        variant: "destructive"
      });
      return;
    }

    if (!session) {
      toast({
        title: "Session Error",
        description: "Please refresh the page and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Call the existing create-checkout edge function
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          planType: tier,
          billingCycle: isYearly ? 'yearly' : 'monthly'
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getPrice = (tier: 'gold' | 'platinum') => {
    return isYearly ? displayPrices[tier].year : displayPrices[tier].month;
  };

  const getPeriod = () => {
    return isYearly ? 'year' : 'month';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0c0d10] to-[#1a1a1f]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c0d10] to-[#1a1a1f] text-white">
      <div className="container max-w-4xl mx-auto px-5 py-7">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Begin Your Journey</h1>
          <div className="text-sm text-gray-400">
            {user ? `Signed in: ${user.email}` : 'Not signed in'}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[#15171d] border border-[#222631] rounded-xl p-5">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400">
              Complete your purchase to unlock your personalized mental wellness journey
            </div>
            
            {/* Billing Toggle */}
            <div className="inline-flex border border-[#222631] rounded-lg overflow-hidden">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  !isYearly 
                    ? 'bg-[#1e2430] text-white font-bold' 
                    : 'bg-[#11141a] text-[#9fb0ce]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isYearly 
                    ? 'bg-[#1e2430] text-white font-bold' 
                    : 'bg-[#11141a] text-[#9fb0ce]'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gold Plan */}
            <div className="bg-[#0f1218] border border-[#272c38] rounded-xl p-4 flex flex-col gap-3">
              <div className="font-bold text-lg">Gold</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">${getPrice('gold')}</span>
                <span className="text-gray-400 text-sm">/ {getPeriod()}</span>
              </div>
              <div className="text-gray-400 text-sm flex-grow">
                Premium tools, guided workshops, and AI insights.
              </div>
              <Button
                onClick={() => handleCheckout('gold')}
                disabled={isProcessing || !user}
                className="w-full bg-[#ff9922] hover:bg-[#e6850f] text-black font-bold py-3 rounded-lg disabled:opacity-60"
              >
                {isProcessing ? 'Processing...' : 'Choose Gold'}
              </Button>
            </div>

            {/* Platinum Plan */}
            <div className="bg-[#0f1218] border border-[#272c38] rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-lg">Platinum</div>
                {isYearly && (
                  <div className="bg-[#14361d] text-[#78ffa1] border border-[#1e5330] rounded-full px-3 py-1 text-xs font-bold">
                    Save 20%
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">${getPrice('platinum')}</span>
                <span className="text-gray-400 text-sm">/ {getPeriod()}</span>
              </div>
              <div className="text-gray-400 text-sm flex-grow">
                Everything in Gold + advanced analytics & early AI features.
              </div>
              <Button
                onClick={() => handleCheckout('platinum')}
                disabled={isProcessing || !user}
                className="w-full bg-[#ff9922] hover:bg-[#e6850f] text-black font-bold py-3 rounded-lg disabled:opacity-60"
              >
                {isProcessing ? 'Processing...' : 'Choose Platinum'}
              </Button>
            </div>
          </div>

          {/* Auth Notice */}
          {!user && (
            <div className="bg-[#2a1a1a] border border-[#5a2a2a] text-[#ffb3b3] p-3 rounded-lg mt-4">
              Authentication required. Please complete registration to continue with your subscription.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;