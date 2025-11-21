import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Award, Check, Shield, CreditCard } from 'lucide-react';
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

      {/* Premium Real-Time Therapy Marketing Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900 shadow-2xl"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 p-10">
          {/* LEFT SIDE: Visual + Social Proof */}
          <div className="space-y-6">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/40 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-medium text-[#D4AF37]">Premium Feature</span>
            </div>

            {/* Main headline */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5C5A1] to-[#D4AF37] mb-3 leading-tight">
                Talk to a Real Therapist
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Professional, licensed therapists ready to support your mental health journey
              </p>
            </div>

          {/* Professional credentials emphasis */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-sm">Board-certified licensed professionals</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm">HIPAA compliant & completely confidential</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
                <CreditCard className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="text-sm">Insurance accepted - as low as $15/session</span>
            </div>
          </div>
          </div>

          {/* RIGHT SIDE: CTA + Value Props */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Key benefits with icons */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#D4AF37]/20 rounded-lg flex-shrink-0">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Video or Phone Sessions</h4>
                  <p className="text-sm text-gray-400">Connect from anywhere, on your schedule</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-rose-500/20 rounded-lg flex-shrink-0">
                  <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">100% Confidential</h4>
                  <p className="text-sm text-gray-400">HIPAA-compliant, secure platform</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
                  <Award className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Licensed Professionals</h4>
                  <p className="text-sm text-gray-400">All therapists are board-certified</p>
                </div>
              </div>
            </div>

            {/* Pricing teaser */}
            <div className="bg-gradient-to-r from-[#D4AF37]/10 to-rose-500/10 border border-[#D4AF37]/30 rounded-xl p-5">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">$80</span>
                <span className="text-gray-400">/session</span>
                <span className="ml-auto">
                  <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-semibold px-2 py-1 rounded-full">
                    Insurance Accepted
                  </span>
                </span>
              </div>
              <p className="text-sm text-gray-400">As low as $15 with insurance • First session 50% off</p>
            </div>

            {/* Primary CTA Button */}
            <button
              onClick={() => {
                trackClick({ component: 'real-time-therapy-cta' });
                navigate('/real-time-therapy');
              }}
              className="w-full h-16 bg-gradient-to-r from-[#D4AF37] via-[#E5C5A1] to-[#D4AF37] hover:from-[#B8941F] hover:via-[#D4AF37] hover:to-[#B8941F] text-black font-bold text-lg rounded-xl shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></span>
              <span className="relative flex items-center justify-center gap-2">
                Find Your Therapist
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            {/* Trust badge */}
            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Backed by 10,000+ satisfied clients
            </p>
          </div>
        </div>
      </motion.div>

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
