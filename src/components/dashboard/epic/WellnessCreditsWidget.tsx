import React from 'react';
import { motion } from 'framer-motion';
import { Coins, DollarSign, TrendingUp, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface WellnessCreditsWidgetProps {
  currentPoints: number;
  copayCredits: number;
  lifetimeEarned: number;
}

export const WellnessCreditsWidget: React.FC<WellnessCreditsWidgetProps> = ({
  currentPoints,
  copayCredits,
  lifetimeEarned,
}) => {
  const navigate = useNavigate();
  
  // Calculate offset percentage (example: if therapy costs $100/session and they have $32 in credits)
  const estimatedSessionCost = 100;
  const offsetPercentage = Math.min((copayCredits / estimatedSessionCost) * 100, 100);

  // Level system
  const silverThreshold = 500;
  const goldThreshold = 1000;
  const platinumThreshold = 2000;
  
  let currentLevel = 'Bronze';
  let nextLevel = 'Silver';
  let progressToNext = (lifetimeEarned / silverThreshold) * 100;
  let pointsToNext = silverThreshold - lifetimeEarned;

  if (lifetimeEarned >= platinumThreshold) {
    currentLevel = 'Platinum';
    nextLevel = 'Platinum';
    progressToNext = 100;
    pointsToNext = 0;
  } else if (lifetimeEarned >= goldThreshold) {
    currentLevel = 'Gold';
    nextLevel = 'Platinum';
    progressToNext = ((lifetimeEarned - goldThreshold) / (platinumThreshold - goldThreshold)) * 100;
    pointsToNext = platinumThreshold - lifetimeEarned;
  } else if (lifetimeEarned >= silverThreshold) {
    currentLevel = 'Silver';
    nextLevel = 'Gold';
    progressToNext = ((lifetimeEarned - silverThreshold) / (goldThreshold - silverThreshold)) * 100;
    pointsToNext = goldThreshold - lifetimeEarned;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-br from-[#D4AF37]/5 to-background border border-[#D4AF37]/30 rounded-lg p-6"
    >
      <h3 className="text-2xl font-bold mb-6 text-shadow flex items-center gap-2">
        <Coins className="w-5 h-5 text-[#D4AF37]" />
        Wellness Credits
      </h3>

      {/* Section 1: Points */}
      <div className="mb-4 pb-4 border-b border-border">
        <p className="text-sm text-muted-foreground mb-1">Points Available</p>
        <h4 className="text-3xl font-bold mb-2">{currentPoints} pts</h4>
        <div className="text-xs text-muted-foreground">
          <p>Earn: 10 pts per check-in · 25 pts per exercise · 50 pts per session</p>
        </div>
      </div>

      {/* Section 2: Co-pay Credits */}
      <div className="mb-4 pb-4 border-b border-[#D4AF37]/20">
        <p className="text-sm text-muted-foreground mb-1">Co-pay Credits</p>
        <h4 className="text-3xl font-bold text-[#D4AF37] mb-2 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          {copayCredits.toFixed(2)}
        </h4>
        <p className="text-xs text-muted-foreground">
          Applies automatically to your next session
        </p>
      </div>

      {/* Section 3: This Month */}
      <div className="mb-4 pb-4 border-b border-[#D4AF37]/20">
        <p className="text-sm text-muted-foreground mb-1">This Month</p>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
          <p className="text-xl font-bold">
            You've offset {offsetPercentage.toFixed(0)}% of therapy costs
          </p>
        </div>
        <p className="text-xs text-muted-foreground">with your activity</p>
      </div>

      {/* Level Up Bar */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/10 rounded-lg p-4 mb-4 border border-[#D4AF37]/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <p className="text-sm font-semibold">Level: {currentLevel} Member</p>
          </div>
          {currentLevel === 'Bronze' && <p className="text-xs text-muted-foreground">0% back</p>}
          {currentLevel === 'Silver' && <p className="text-xs text-muted-foreground">3% back</p>}
          {currentLevel === 'Gold' && <p className="text-xs text-muted-foreground">5% back</p>}
          {currentLevel === 'Platinum' && <p className="text-xs text-muted-foreground">10% back</p>}
        </div>
        {currentLevel !== 'Platinum' && (
          <>
            <Progress value={progressToNext} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">
              {pointsToNext} pts to {nextLevel}
            </p>
          </>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="gold" className="flex-1" onClick={() => navigate('/app/rewards')}>
          View All Rewards
        </Button>
        <Button variant="outline" onClick={() => navigate('/app/rewards')}>
          How it works
        </Button>
      </div>
    </motion.div>
  );
};
