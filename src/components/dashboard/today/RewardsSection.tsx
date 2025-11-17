import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, DollarSign, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface RewardsSectionProps {
  wallet: {
    current_points: number;
    copay_credits_usd: number;
    lifetime_earned: number;
  } | null;
  challengesCompleted: number;
}

export default function RewardsSection({ wallet, challengesCompleted }: RewardsSectionProps) {
  const currentPoints = wallet?.current_points || 0;
  const copayCredits = wallet?.copay_credits_usd || 0;
  const lifetimeEarned = wallet?.lifetime_earned || 0;

  return (
    <Card className="bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border-amber-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Coins className="w-5 h-5 text-amber-500" />
          Your Wellness Credits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Current Points */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 rounded-lg bg-background/50 border border-border/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium">Points</span>
            </div>
            <p className="text-3xl font-bold text-amber-500">{currentPoints}</p>
            <p className="text-xs text-muted-foreground mt-1">Available to redeem</p>
          </motion.div>

          {/* Copay Credits */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-lg bg-background/50 border border-border/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Credits</span>
            </div>
            <p className="text-3xl font-bold text-green-500">${copayCredits.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-1">Copay credits</p>
          </motion.div>
        </div>

        {/* Lifetime Stats */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/30">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm">Lifetime Earned</span>
          </div>
          <span className="text-sm font-semibold">{lifetimeEarned} points</span>
        </div>

        {/* This Month */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/30">
          <span className="text-sm">Challenges Completed This Month</span>
          <span className="text-sm font-semibold">{challengesCompleted}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700">
            Redeem Credits
          </Button>
          <Button variant="outline" size="sm">
            How it works
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
