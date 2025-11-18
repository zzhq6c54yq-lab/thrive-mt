import React from 'react';
import { useTodayDashboard } from '@/hooks/useTodayDashboard';
import { useUser } from '@/contexts/UserContext';
import { Skeleton } from '@/components/ui/skeleton';
import DashboardNavigation from './DashboardNavigation';
import YourDaySection from './sections/YourDaySection';
import ToolkitSection from './sections/ToolkitSection';
import ProgressSection from './sections/ProgressSection';
import SafetyStrip from '../today/SafetyStrip';

export default function EpicDashboard() {
  const { dashboardData, loading, refetch } = useTodayDashboard();
  const { profile } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-4 pb-20">
        <div className="container mx-auto max-w-7xl space-y-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-48 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-96 w-full lg:col-span-2" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 pb-24">
      {/* Navigation */}
      <DashboardNavigation userName={profile?.display_name || 'there'} />

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 space-y-6 mt-6">
        {/* Your Day Section */}
        <YourDaySection 
          dashboardData={dashboardData}
          onCheckInComplete={refetch}
        />

        {/* Main Grid: Toolkit + Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Toolkit Section (2 columns) */}
          <div className="lg:col-span-2">
            <ToolkitSection userGoals={profile?.goals || []} />
          </div>

          {/* Progress Section (1 column) */}
          <div>
            <ProgressSection dashboardData={dashboardData} />
          </div>
        </div>
      </div>

      {/* Safety Strip */}
      <SafetyStrip />
    </div>
  );
}
