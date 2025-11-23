import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Award, Coins, Gift, TrendingUp, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export default function Rewards() {
  const navigate = useNavigate();

  const { data: wallet } = useQuery({
    queryKey: ['rewards-wallet'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('rewards_wallet')
        .select('*')
        .eq('user_id', user.id)
        .single();

      return data;
    },
  });

  const recentRewards = [
    { id: 1, title: 'Daily Check-in Streak', points: 10, date: '2024-01-15', type: 'streak' },
    { id: 2, title: 'Completed Mini Session', points: 25, date: '2024-01-14', type: 'activity' },
    { id: 3, title: 'Journal Entry', points: 15, date: '2024-01-13', type: 'journal' },
    { id: 4, title: 'Weekly Goal Achieved', points: 50, date: '2024-01-12', type: 'goal' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
            Rewards & Achievements
          </h1>
          <p className="text-gray-300 text-lg">Track your progress and redeem rewards</p>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border-[#D4AF37]/40 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Current Points</p>
                  <p className="text-4xl font-bold text-[#D4AF37]">{wallet?.current_points || 0}</p>
                </div>
                <Coins className="w-12 h-12 text-[#D4AF37]" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border-[#D4AF37]/40 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Copay Credits</p>
                  <p className="text-4xl font-bold text-[#D4AF37]">${wallet?.copay_credits_usd || 0}</p>
                </div>
                <Gift className="w-12 h-12 text-[#D4AF37]" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border-[#D4AF37]/40 p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Lifetime Earned</p>
                  <p className="text-4xl font-bold text-[#D4AF37]">{wallet?.lifetime_earned || 0}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-[#D4AF37]" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold text-white">Recent Rewards</h2>
          </div>
          
          <div className="space-y-4">
            {recentRewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{reward.title}</p>
                    <p className="text-gray-400 text-sm">{new Date(reward.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-[#D4AF37] font-bold">+{reward.points}</div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Redeem Options */}
        <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold text-white">Redeem Your Points</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40">
              <h3 className="text-xl font-bold text-white mb-2">Therapy Copay Credit</h3>
              <p className="text-gray-300 mb-4">1000 points = $10 off your next session</p>
              <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black hover:opacity-90">
                Redeem
              </Button>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40">
              <h3 className="text-xl font-bold text-white mb-2">Premium Features</h3>
              <p className="text-gray-300 mb-4">500 points = 1 week of premium access</p>
              <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black hover:opacity-90">
                Redeem
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
