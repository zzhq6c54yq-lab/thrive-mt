import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardData } from '@/hooks/useTodayDashboard';
import { StatusChips } from '../StatusChips';
import { TodayOverviewCard } from '../TodayOverviewCard';
import { CareHubSection } from '../CareHubSection';
import { HenryMiniWidget } from '../HenryMiniWidget';
import { HenryDailyInsight } from '../HenryDailyInsight';
import { WellnessCreditsWidget } from '../WellnessCreditsWidget';
import { SafetyPlanCard } from '../SafetyPlanCard';
import { useNavigate } from 'react-router-dom';

interface NewYourDaySectionProps {
  dashboardData: DashboardData;
  onCheckInComplete: () => void;
}

export const NewYourDaySection: React.FC<NewYourDaySectionProps> = ({
  dashboardData,
  onCheckInComplete,
}) => {
  const navigate = useNavigate();
  const [henryWidgetVisible, setHenryWidgetVisible] = useState(true);

  // Generate contextual Henry message based on mood data
  const getHenryMessage = () => {
    const recentMood = dashboardData.recentCheckIns[0]?.mood_score || 0;
    if (recentMood < 2.5) {
      return "Hey, I noticed your mood has been lower recently. Want a 3-minute reset together?";
    }
    return "Your check-ins show you're most stressed at night. Want to try a morning routine this week?";
  };

  const getHenryInsight = () => {
    return "You tend to check in late at night when you're most stressed. Want to try a 1-minute morning check-in this week?";
  };

  return (
    <div className="space-y-6">
      {/* Status Chips - displayed at top */}
      <StatusChips dashboardData={dashboardData} />

      {/* Today Overview Card */}
      <TodayOverviewCard
        dashboardData={dashboardData}
        onCheckInComplete={onCheckInComplete}
      />

      {/* Care Hub Section */}
      <CareHubSection dashboardData={dashboardData} />

      {/* Henry Mini Widget */}
      {henryWidgetVisible && (
        <HenryMiniWidget
          message={getHenryMessage()}
          onStart={() => navigate('/henry')}
          onDismiss={() => setHenryWidgetVisible(false)}
        />
      )}

      {/* Mood Pulse + Streak Protector Grid will be in parent component */}

      {/* Henry's Daily Insight */}
      <HenryDailyInsight
        insight={getHenryInsight()}
        onSetReminder={() => {
          // TODO: Set reminder logic
          alert('Reminder set for 9:00 AM');
        }}
        onAskHenry={() => navigate('/henry')}
      />

      {/* Wellness Credits Widget */}
      <WellnessCreditsWidget
        currentPoints={dashboardData.rewardsWallet?.current_points || 0}
        copayCredits={dashboardData.rewardsWallet?.copay_credits_usd || 0}
        lifetimeEarned={dashboardData.rewardsWallet?.lifetime_earned || 0}
      />

      {/* Safety Plan Card */}
      <SafetyPlanCard />
    </div>
  );
};
