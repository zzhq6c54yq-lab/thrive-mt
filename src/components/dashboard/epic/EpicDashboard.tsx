import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodayDashboard } from '@/hooks/useTodayDashboard';
import { useDashboardState } from '@/hooks/useDashboardState';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardNavigation from './DashboardNavigation';
import { StatusChips } from './StatusChips';
import { NewYourDaySection } from './sections/NewYourDaySection';
import { MoodPulseWidget, StreakProtectorWidget, ProgressRingWidget, QuickNotesWidget } from './widgets/SmartWidgets';
import HealthSyncWidget from './widgets/HealthSyncWidget';
import EngagementMetricsWidget from './widgets/EngagementMetricsWidget';
import MicroGoalsWidget from './widgets/MicroGoalsWidget';
import ToolkitSection from './sections/ToolkitSection';
import SpecializedProgramsSection from './sections/SpecializedProgramsSection';
import LearningDiscoverySection from './sections/LearningDiscoverySection';
import SafetyStrip from '../today/SafetyStrip';
import QuickActions from './QuickActions';
import CommandPalette from './CommandPalette';
import AIContextualHelper from './AIContextualHelper';
import LayoutControls from './LayoutControls';
import HenryDialog from '@/components/henry/HenryDialog';
import IncomingCallModal from '@/components/client/IncomingCallModal';
import TermsReconsentModal from '@/components/compliance/TermsReconsentModal';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import EmpathyLoadingState from '@/components/shared/EmpathyLoadingState';
import EmpathyErrorState from '@/components/shared/EmpathyErrorState';
import WelcomeHomeHero from './WelcomeHomeHero';
import ConversationalCheckIn from './ConversationalCheckIn';
import { HenryCompanionSection } from './HenryCompanionSection';
import CoachingSection from './sections/CoachingSection';
import ServicesPricingCard from './sections/ServicesPricingCard';
import { WeeklyProgressSection } from './sections/WeeklyProgressSection';
import { DashboardFooter } from './sections/DashboardFooter';
import { THRIVE_LOGO } from '@/constants/branding';
import { useLastSeen } from '@/hooks/useLastSeen';
import { BadgesSection } from './sections/BadgesSection';
import { SupportCircleSection } from './sections/SupportCircleSection';
import { BuddySystemSection } from './sections/BuddySystemSection';
import { CommunityGroupsSection } from './sections/CommunityGroupsSection';
import GamesShortcutSection from './sections/GamesShortcutSection';
import LifeChallengesShortcutSection from './sections/LifeChallengesShortcutSection';

interface EpicDashboardProps {
  demoMode?: boolean;
}

export default function EpicDashboard({ demoMode = false }: EpicDashboardProps) {
  const navigate = useNavigate();
  const { user, profile, loading: userLoading, needsReconsent, clearReconsentFlag } = useUser();
  const { dashboardData, loading: dashboardLoading, refetch } = useTodayDashboard();
  
  // Provide fallback profile data for demo users
  const displayProfile = profile || {
    display_name: 'Demo User',
    goals: ['stress_management', 'sleep_improvement', 'mindfulness']
  };

  // Provide mock dashboard data for demo mode - memoized to prevent useEffect reruns
  const displayDashboardData = useMemo(() => {
    if (demoMode) {
      return {
        profile: displayProfile,
        todaysPlan: [
          { id: '1', slug: 'morning-meditation', title: 'Morning Meditation', description: 'Start your day mindfully', category: 'mindfulness', estimated_minutes: 10, icon_name: 'brain', route_path: '/app/meditation', points_reward: 50, order: 1, time_of_day: 'morning' },
          { id: '2', slug: 'breathing-exercise', title: 'Breathing Exercise', description: 'Calm your nervous system', category: 'stress', estimated_minutes: 5, icon_name: 'wind', route_path: '/app/breathing', points_reward: 30, order: 2, time_of_day: 'afternoon' },
          { id: '3', slug: 'evening-journal', title: 'Evening Reflection', description: 'Process your day', category: 'journaling', estimated_minutes: 10, icon_name: 'book', route_path: '/app/journal', points_reward: 40, order: 3, time_of_day: 'evening' }
        ],
        checkInStreak: 7,
        recentCheckIns: [
          { mood_score: 4, created_at: new Date().toISOString(), tags: ['motivated', 'calm'] }
        ],
        upcomingAppointments: [],
        rewardsWallet: { current_points: 250, copay_credits_usd: 5, lifetime_earned: 500 },
        latestInsight: { insight_text: "You've been consistent with your morning routines. Keep it up!", insight_type: 'encouragement' },
        weeklyStats: {
          challengesCompleted: 12,
          latestAssessment: { score: 6, label: 'Mild' },
          moodTrend: [
            { date: 'Nov 25', score: 3 },
            { date: 'Nov 26', score: 4 },
            { date: 'Nov 27', score: 4 },
            { date: 'Nov 28', score: 5 },
            { date: 'Nov 29', score: 4 },
            { date: 'Nov 30', score: 5 },
            { date: 'Dec 01', score: 5 }
          ]
        }
      };
    }
    return dashboardData;
  }, [demoMode, dashboardData, displayProfile]);
  
  const { state: dashboardState } = useDashboardState(displayDashboardData);
  const { lastCheckIn } = useLastSeen();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showHenryDialog, setShowHenryDialog] = useState(false);
  const [showOpeningRitual, setShowOpeningRitual] = useState(() => {
    const hasSeenRitual = sessionStorage.getItem('hasSeenOpeningRitual');
    return !hasSeenRitual;
  });
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [ritualStep, setRitualStep] = useState<'welcome' | 'breathe' | 'fade'>('welcome');

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onCommandPalette: () => setIsCommandPaletteOpen(true)
  });

  // Redirect to auth if not authenticated (skip for demo mode)
  useEffect(() => {
    if (!userLoading && !user && !demoMode) {
      navigate('/app/auth');
    }
  }, [user, userLoading, navigate, demoMode]);

  // In demo mode, don't wait for dashboard data loading (it will never complete without a user)
  const loading = demoMode ? false : (userLoading || dashboardLoading);

  // Render status chips into navigation header
  useEffect(() => {
    if (!loading && displayDashboardData) {
      const container = document.getElementById('status-chips-container');
      if (container) {
        createPortal(
          <StatusChips dashboardData={displayDashboardData} />,
          container
        );
      }
    }
  }, [loading, !!displayDashboardData]);

  // Enhanced opening ritual effect
  useEffect(() => {
    if (!loading && displayDashboardData && showOpeningRitual) {
      // Step 1: Welcome message (2s)
      const welcomeTimer = setTimeout(() => {
        setRitualStep('breathe');
      }, 2000);

      // Step 2: Breathing cycle (3 breaths, ~9s)
      const breatheTimer = setInterval(() => {
        setBreathingPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 3000);

      // Step 3: Fade to dashboard (after 11s total)
      const fadeTimer = setTimeout(() => {
        setRitualStep('fade');
      }, 11000);

      const hideTimer = setTimeout(() => {
        setShowOpeningRitual(false);
        sessionStorage.setItem('hasSeenOpeningRitual', 'true');
      }, 12500);

      return () => {
        clearTimeout(welcomeTimer);
        clearInterval(breatheTimer);
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [loading, !!displayDashboardData, showOpeningRitual]);

  // Time-based greeting helper
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) return "Sometimes the night feels long. We're here with you.";
    if (hour >= 5 && hour < 9) return "A new day. Let's start gently.";
    if (hour >= 9 && hour < 17) return "How's your day treating you?";
    if (hour >= 17 && hour < 21) return "Evening. Time to check in with yourself.";
    return "Winding down. You made it through today.";
  };

  // Loading state with empathy
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900">
        <EmpathyLoadingState />
      </div>
    );
  }

  // Error state with empathy (skip for demo mode)
  if ((!user || !profile) && !demoMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 flex items-center justify-center p-4">
        <EmpathyErrorState
          title={!user ? 'Please log in' : "Let's finish setting up"}
          message={!user 
            ? "We need you to log in so we can personalize your experience." 
            : "Your profile isn't complete yet. Let's take a moment to finish it together."}
          onRetry={() => navigate(!user ? '/app/auth' : '/app/onboarding')}
          showHomeButton={false}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 pb-24 relative overflow-hidden">
      {/* Terms Re-consent Modal */}
      {user && needsReconsent && !demoMode && (
        <TermsReconsentModal
          isOpen={needsReconsent}
          userId={user.id}
          onAccept={clearReconsentFlag}
          onDecline={() => {
            supabase.auth.signOut();
            navigate('/app/auth');
          }}
        />
      )}
      {/* Ambient background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Enhanced Opening Ritual */}
      <AnimatePresence>
        {showOpeningRitual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-background/95"
          >
            {/* Ambient particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -100, 0],
                    x: [0, Math.random() * 100 - 50, 0],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute w-1 h-1 bg-[#D4AF37]/50 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            <div className="relative text-center space-y-12 px-4">
              {/* Step 1: Personalized Welcome */}
              {ritualStep === 'welcome' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4"
                >
                  {/* Bronze skull logo breathing */}
                  <motion.div
                    animate={{
                      scale: [0.95, 1.05, 0.95],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-24 h-24 mx-auto mb-8"
                  >
                    <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-2xl opacity-40" />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#E5C5A1] to-[#B8941F] flex items-center justify-center shadow-2xl">
                      <img 
                        src={THRIVE_LOGO} 
                        alt="ThriveMT"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  </motion.div>

                  <h2 className="text-4xl font-light text-foreground mb-2">
                    {getTimeBasedGreeting()}
                  </h2>
                   <p className="text-xl text-muted-foreground font-light">
                    We're glad you're here, {displayProfile?.display_name?.split(' ')[0] || 'friend'}
                  </p>
                </motion.div>
              )}

              {/* Step 2: Breathing Together */}
              {ritualStep === 'breathe' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-12"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl text-foreground/90 font-light"
                  >
                    Let's take a breath together
                  </motion.p>

                  {/* Breathing Circle with enhanced physics */}
                  <div className="relative w-48 h-48 mx-auto">
                    {/* Outer glow ring */}
                    <motion.div
                      animate={{
                        scale: breathingPhase === 'inhale' ? 1.5 : breathingPhase === 'hold' ? 1.5 : 1,
                        opacity: breathingPhase === 'inhale' ? 0.6 : breathingPhase === 'hold' ? 0.6 : 0.2,
                      }}
                      transition={{
                        duration: 3,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-xl"
                    />

                    {/* Main breathing circle */}
                    <motion.div
                      animate={{
                        scale: breathingPhase === 'inhale' ? 1.3 : breathingPhase === 'hold' ? 1.3 : 0.7,
                      }}
                      transition={{
                        duration: 3,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="absolute inset-8 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#E5C5A1] to-[#B8941F] shadow-2xl"
                    />

                    {/* Center text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.p
                        key={breathingPhase}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg font-light text-background capitalize"
                      >
                        {breathingPhase}
                      </motion.p>
                    </div>
                  </div>

                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-sm text-muted-foreground font-light"
                  >
                    You showed up for yourself today. That takes strength.
                  </motion.p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <DashboardNavigation userName={displayProfile?.display_name?.split(' ')[0] || 'there'} />
      </motion.div>

      {/* Main Content with staggered animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="container mx-auto max-w-7xl px-4 space-y-8 mt-6 relative z-10"
      >
        {/* Welcome Home Hero - The Magnetic Focal Point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <WelcomeHomeHero
            user={user}
            profile={displayProfile}
            lastCheckIn={lastCheckIn}
            moodTrend={displayDashboardData.weeklyStats.moodTrend}
            checkInStreak={displayDashboardData.checkInStreak}
          />
        </motion.div>

        {/* Henry Companion - Star of the Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <HenryCompanionSection
            userName={displayProfile?.display_name?.split(' ')[0] || user?.email?.split('@')[0]}
            onChatWithHenry={() => setShowHenryDialog(true)}
          />
        </motion.div>

        {/* Micro-Goals Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <MicroGoalsWidget />
        </motion.div>

        {/* Engagement Metrics Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.6 }}
        >
          <EngagementMetricsWidget />
        </motion.div>

        {/* Health Sync Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <HealthSyncWidget />
        </motion.div>

        {/* Conversational Check-In - Daily Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <ConversationalCheckIn onComplete={refetch} />
        </motion.div>

        {/* Section Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent my-8" />

        {/* Two-Column Grid: Services & Coaching */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <ServicesPricingCard />
          <CoachingSection />
        </motion.div>

        {/* Section Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent my-8" />

        {/* Toolkit Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <ToolkitSection userGoals={displayProfile?.goals || []} />
        </motion.div>

        {/* Learning & Discovery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <LearningDiscoverySection />
        </motion.div>

        {/* Section Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent my-8" />

        {/* Weekly Progress Section - NEW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <WeeklyProgressSection />
        </motion.div>

        {/* Specialized Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <SpecializedProgramsSection />
        </motion.div>

        {/* Section Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent my-8" />

        {/* Engagement Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <BadgesSection />
          <SupportCircleSection />
          <BuddySystemSection />
          <CommunityGroupsSection />
        </motion.div>

        {/* Section Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent my-8" />

        {/* Games & Life Challenges Shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="space-y-6"
        >
          <GamesShortcutSection />
          <LifeChallengesShortcutSection />
        </motion.div>

        {/* Section Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent my-8" />

        {/* Smart Widgets Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <MoodPulseWidget moodData={displayDashboardData.weeklyStats.moodTrend} />
            <StreakProtectorWidget streak={displayDashboardData.checkInStreak} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ProgressRingWidget completed={0} total={displayDashboardData.todaysPlan.length} />
            <QuickNotesWidget />
          </div>
        </motion.div>

        {/* Dashboard Footer - NEW */}
        <DashboardFooter />
      </motion.div>

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
        userName={displayProfile?.display_name?.split(' ')[0] || 'there'}
      />

      {/* Incoming Call Modal for Video/Audio Sessions */}
      <IncomingCallModal />

      {/* Hidden trigger button for YourDaySection */}
      <button
        id="henry-dialog-trigger"
        className="hidden"
        onClick={() => setShowHenryDialog(true)}
      />
    </div>
  );
}
