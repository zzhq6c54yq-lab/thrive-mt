import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodayDashboard } from '@/hooks/useTodayDashboard';
import { useUser } from '@/contexts/UserContext';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import DashboardNavigation from './DashboardNavigation';
import YourDaySection from './sections/YourDaySection';
import ToolkitSection from './sections/ToolkitSection';
import ProgressSection from './sections/ProgressSection';
import SafetyStrip from '../today/SafetyStrip';
import QuickActions from './QuickActions';
import CommandPalette from './CommandPalette';
import AIContextualHelper from './AIContextualHelper';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function EpicDashboard() {
  const navigate = useNavigate();
  const { user, profile, loading: userLoading } = useUser();
  const { dashboardData, loading: dashboardLoading, refetch } = useTodayDashboard();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-4 pb-20">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Unable to Load Dashboard</h2>
          <p className="text-white/70 mb-6">
            We couldn't load your profile. Please try refreshing the page or logging in again.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Return to Login
          </button>
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
          <div className="lg:col-span-2" id="toolkit-section">
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

      {/* AI-Powered Enhancements */}
      <QuickActions />
      <AIContextualHelper />
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
    </div>
  );
}
