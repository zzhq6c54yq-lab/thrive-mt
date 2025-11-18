import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Award } from 'lucide-react';
import QuickCheckIn from '../../today/QuickCheckIn';
import TodaysFocus from '../../today/TodaysFocus';
import { DashboardData } from '@/hooks/useTodayDashboard';
import { MoodPulseWidget, StreakProtectorWidget, ProgressRingWidget, QuickNotesWidget } from '../widgets/SmartWidgets';
import { useLayoutTracking } from '@/hooks/useLayoutTracking';
import { useUser } from '@/contexts/UserContext';

interface YourDaySectionProps {
  dashboardData: DashboardData;
  onCheckInComplete: () => void;
}

export default function YourDaySection({ dashboardData, onCheckInComplete }: YourDaySectionProps) {
  const navigate = useNavigate();
  const { profile } = useUser();
  const { trackClick } = useLayoutTracking({ 
    sectionId: 'your-day',
    trackScroll: true,
    trackClicks: true,
    trackTime: true
  });

  const getPortalName = (portalKey: string) => {
    const portals: Record<string, string> = {
      'veteran': 'Veterans Support',
      'cancer': 'Cancer Support',
      'single-parent': 'Single Parents Support',
      'first-responder': 'First Responders Support',
      'substance-abuse': 'Substance Abuse Support',
    };
    return portals[portalKey] || 'Specialized Portal';
  };

  const getPortalPath = (portalKey: string) => {
    const paths: Record<string, string> = {
      'veteran': '/dod-welcome',
      'cancer': '/cancer-support-welcome',
      'single-parent': '/single-parents-welcome',
      'first-responder': '/first-responders-welcome',
      'substance-abuse': '/substance-abuse-sponsor',
    };
    return paths[portalKey] || '/home';
  };

  return (
    <div className="space-y-6">
      {/* Quick Check-In */}
      <div 
        id="quick-check-in"
        onClick={() => trackClick({ component: 'quick-check-in' })}
      >
      <QuickCheckIn onCheckInComplete={onCheckInComplete} />
      </div>

      {/* Explore Portals Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-lg border border-[#B87333]/50 bg-gray-900/80 backdrop-blur-sm cursor-pointer hover:border-[#B87333] transition-all group"
        onClick={() => {
          trackClick({ component: 'explore-portals' });
          navigate('/home');
        }}
      >
        {/* Faded collage background of portal images */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="grid grid-cols-4 grid-rows-3 h-full gap-0.5">
            <img src="https://images.unsplash.com/photo-1472532944213-114e90954b63?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1509475826633-fed577a2c71b?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="" />
          </div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* ThriveMT Logo */}
            <div className="w-12 h-12">
              <img 
                src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
                alt="ThriveMT Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(184,115,51,0.6)]"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">ThriveMT</h3>
              <p className="text-sm text-gray-300">Explore Specialized Programs & Add-ons</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Explore All
          </button>
        </div>
      </motion.div>

      {/* Meet Henry Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/20 border border-[#B87333]/50 rounded-lg p-6 backdrop-blur-sm cursor-pointer hover:border-[#B87333] transition-all"
        onClick={() => {
          trackClick({ component: 'meet-henry' });
          const henryDialog = document.getElementById('henry-dialog-trigger');
          if (henryDialog) henryDialog.click();
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-0.5">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">H</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">Meet Henry</h3>
            <p className="text-sm text-gray-300">
              Your AI Mental Health Companion is here to help you 24/7
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="px-4 py-2 bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
              Chat Now
            </button>
          </div>
        </div>
      </motion.div>

      {/* Selected Portal Card - Only show if user has selected a portal */}
      {profile?.primary_portal && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/50 rounded-lg p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-purple-300 mb-1">
                Your Active Portal
              </p>
              <h3 className="text-xl font-bold text-white">
                {getPortalName(profile.primary_portal)}
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                Specialized resources and support tailored for you
              </p>
            </div>
            <button 
              onClick={() => {
                trackClick({ component: 'portal-link' });
                navigate(getPortalPath(profile.primary_portal!));
              }}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Open Portal
            </button>
          </div>
        </motion.div>
      )}

      {/* AI Insight Card */}
      {dashboardData.planMetadata?.adaptive_note && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#B87333]/10 to-[#E5C5A1]/10 border border-[#B87333]/30 rounded-lg p-4 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#B87333]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#E5C5A1]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#E5C5A1] mb-1">
                AI Insight for Today
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {dashboardData.planMetadata.adaptive_note}
              </p>
              {dashboardData.planMetadata?.plan_summary && (
                <p className="text-xs text-gray-400 mt-2 italic">
                  {dashboardData.planMetadata.plan_summary}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Today's Focus */}
      <div 
        id="todays-focus"
        onClick={() => trackClick({ component: 'todays-focus' })}
      >
        <TodaysFocus activities={dashboardData.todaysPlan} />
      </div>

      {/* Smart Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MoodPulseWidget />
        <StreakProtectorWidget streak={dashboardData.checkInStreak} />
        <ProgressRingWidget 
          completed={dashboardData.weeklyStats.challengesCompleted} 
          total={dashboardData.todaysPlan.length || 7}
        />
        <QuickNotesWidget />
      </div>

      {/* Streaks & Wins Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dashboardData.checkInStreak}</p>
              <p className="text-xs text-gray-300">Day Streak</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dashboardData.weeklyStats.challengesCompleted}</p>
              <p className="text-xs text-gray-300">Challenges Done</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-white">{dashboardData.rewardsWallet?.current_points || 0}</p>
              <p className="text-xs text-gray-300">Wellness Points</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
