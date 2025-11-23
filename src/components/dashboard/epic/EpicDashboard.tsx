import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTodayDashboard } from '@/hooks/useTodayDashboard';
import { useDashboardState } from '@/hooks/useDashboardState';
import { useUser } from '@/contexts/UserContext';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import DashboardNavigation from './DashboardNavigation';
import { StatusChips } from './StatusChips';
import { NewYourDaySection } from './sections/NewYourDaySection';
import { MoodPulseWidget, StreakProtectorWidget, ProgressRingWidget, QuickNotesWidget } from './widgets/SmartWidgets';
import ToolkitSection from './sections/ToolkitSection';
import SafetyStrip from '../today/SafetyStrip';
import QuickActions from './QuickActions';
import CommandPalette from './CommandPalette';
import AIContextualHelper from './AIContextualHelper';
import LayoutControls from './LayoutControls';
import HenryDialog from '@/components/henry/HenryDialog';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function EpicDashboard() {
  const navigate = useNavigate();
  const { user, profile, loading: userLoading } = useUser();
  const { dashboardData, loading: dashboardLoading, refetch } = useTodayDashboard();
  const { state: dashboardState } = useDashboardState(dashboardData);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showHenryDialog, setShowHenryDialog] = useState(false);

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onCommandPalette: () => setIsCommandPaletteOpen(true)
  });

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      navigate('/auth');
    }
  }, [user, userLoading, navigate]);

  const loading = userLoading || dashboardLoading;

  // Render status chips into navigation header
  useEffect(() => {
    if (!loading && dashboardData) {
      const container = document.getElementById('status-chips-container');
      if (container) {
        createPortal(
          <StatusChips dashboardData={dashboardData} />,
          container
        );
      }
    }
  }, [loading, dashboardData]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 p-4 pb-20">
        <div className="container mx-auto max-w-7xl space-y-6">
          {/* Navigation skeleton */}
          <Skeleton className="h-16 w-full bg-white/10" />
          
          {/* Your Day section skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-48 bg-white/10" />
            <Skeleton className="h-48 bg-white/10 lg:col-span-2" />
          </div>
          
          {/* Main content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-64 bg-white/10" />
              <Skeleton className="h-64 bg-white/10" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 bg-white/10" />
              <Skeleton className="h-32 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state - user not found
  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            {!user ? 'Authentication Required' : 'Profile Setup Required'}
          </h2>
          <p className="text-white/70 mb-6">
            {!user 
              ? "Please log in to access your dashboard." 
              : "Your profile needs to be set up. Let's complete your onboarding."}
          </p>
          <button
            onClick={() => navigate(!user ? '/auth' : '/onboarding')}
            className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {!user ? 'Login' : 'Complete Setup'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 pb-24">
      {/* Navigation */}
      <DashboardNavigation userName={profile?.display_name || 'there'} />

      {/* Main Content - New Command Center Layout */}
      <div className="container mx-auto max-w-7xl px-4 space-y-6 mt-6">
        <NewYourDaySection
          dashboardData={dashboardData}
          onCheckInComplete={refetch}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <MoodPulseWidget moodData={dashboardData.weeklyStats.moodTrend} />
          <StreakProtectorWidget streak={dashboardData.checkInStreak} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ProgressRingWidget completed={0} total={dashboardData.todaysPlan.length} />
          <QuickNotesWidget />
        </div>

        <ToolkitSection userGoals={profile?.goals || []} />
        <QuickActions />
        <LayoutControls />
        <AIContextualHelper />
      </div>

      {/* Safety Strip */}
      <SafetyStrip />

      {/* AI-Powered Enhancements */}
      <LayoutControls />
      <QuickActions />
      <AIContextualHelper />
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />

      {/* Henry Dialog */}
      <HenryDialog 
        isOpen={showHenryDialog} 
        onOpenChange={setShowHenryDialog}
        userName={profile?.display_name || 'there'}
      />

      {/* Hidden trigger button for YourDaySection */}
      <button
        id="henry-dialog-trigger"
        className="hidden"
        onClick={() => setShowHenryDialog(true)}
      />
    </div>
  );
}
