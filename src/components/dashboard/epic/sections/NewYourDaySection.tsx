import React from 'react';
import { DashboardData } from '@/hooks/useTodayDashboard';
import { TodayOverviewCard } from '../TodayOverviewCard';
import { CareHubSection } from '../CareHubSection';

interface NewYourDaySectionProps {
  dashboardData: DashboardData;
  onCheckInComplete: () => void;
}

export const NewYourDaySection: React.FC<NewYourDaySectionProps> = ({
  dashboardData,
  onCheckInComplete,
}) => {
  return (
    <div className="space-y-6">
      {/* Today Overview Card */}
      <TodayOverviewCard
        dashboardData={dashboardData}
        onCheckInComplete={onCheckInComplete}
      />

      {/* Care Hub Section */}
      <CareHubSection dashboardData={dashboardData} />
    </div>
  );
};
