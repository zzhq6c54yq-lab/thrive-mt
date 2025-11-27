import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@supabase/supabase-js';
import { format, formatDistanceToNow } from 'date-fns';
import { Heart, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface WelcomeHomeHeroProps {
  user: User;
  profile: any;
  lastCheckIn?: Date;
  moodTrend?: { date: string; score: number }[];
  checkInStreak?: number;
}

const WelcomeHomeHero: React.FC<WelcomeHomeHeroProps> = ({
  user,
  profile,
  lastCheckIn,
  moodTrend = [],
  checkInStreak = 0,
}) => {
  const getTimeAwareGreeting = () => {
    const hour = new Date().getHours();
    const name = profile?.display_name?.split(' ')[0] || 'friend';
    
    if (hour >= 0 && hour < 5) {
      return {
        main: `Hey, ${name}... rough night?`,
        sub: "We're here, no judgment. Just you and us.",
      };
    }
    if (hour >= 5 && hour < 12) {
      return {
        main: `Morning, ${name}`,
        sub: "We wondered if you'd come by today. Glad you're here.",
      };
    }
    if (hour >= 12 && hour < 17) {
      return {
        main: `We've been waiting for you, ${name}`,
        sub: "How's your day been treating you?",
      };
    }
    if (hour >= 17 && hour < 21) {
      return {
        main: `You came back, ${name}`,
        sub: "That means something. Let's unwind together.",
      };
    }
    return {
      main: `${name}, you're here`,
      sub: "Rest is healing too. We see you.",
    };
  };

  const getLastSeenMessage = () => {
    if (!lastCheckIn) return "This is your first time here today. Welcome.";
    
    const hoursAgo = Math.floor((Date.now() - lastCheckIn.getTime()) / (1000 * 60 * 60));
    
    if (hoursAgo < 6) {
      return "You're back already? We love the consistency.";
    }
    if (hoursAgo < 24) {
      return `It's been ${hoursAgo} hours since we last saw you.`;
    }
    if (hoursAgo < 48) {
      return "We missed you yesterday. Everything okay?";
    }
    return "We were thinking about you. Welcome back home.";
  };

  const getMoodTrendInfo = () => {
    if (moodTrend.length < 2) return null;
    
    const recent = moodTrend.slice(-3);
    const avg = recent.reduce((sum, item) => sum + item.score, 0) / recent.length;
    const previous = moodTrend.slice(-6, -3);
    const prevAvg = previous.length > 0 
      ? previous.reduce((sum, item) => sum + item.score, 0) / previous.length 
      : avg;
    
    if (avg > prevAvg + 0.5) {
      return { trend: 'rising', icon: TrendingUp, message: "Your mood has been rising" };
    }
    if (avg < prevAvg - 0.5) {
      return { trend: 'falling', icon: TrendingDown, message: "You might need some extra support" };
    }
    return { trend: 'steady', icon: Minus, message: "Your mood has been steady" };
  };

  const greeting = getTimeAwareGreeting();
  const lastSeenMsg = getLastSeenMessage();
  const moodInfo = getMoodTrendInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 via-background/50 to-[#B8941F]/10 backdrop-blur-xl border border-[#D4AF37]/20 p-8 md:p-12 shadow-2xl mb-8"
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-[#D4AF37]/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left side: Greeting and insights */}
        <div className="flex-1 space-y-4">
          {/* Main greeting */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-2 leading-tight">
              {greeting.main}
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {greeting.sub}
            </p>
          </motion.div>

          {/* Last seen message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-sm text-muted-foreground/80"
          >
            <Heart className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-light">{lastSeenMsg}</span>
          </motion.div>

          {/* Mood trend */}
          {moodInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-background/30 backdrop-blur-sm w-fit"
            >
              <moodInfo.icon className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-light">{moodInfo.message}</span>
            </motion.div>
          )}

          {/* Streak badge */}
          {checkInStreak > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-background text-sm font-light shadow-lg"
            >
              <span className="text-lg">🔥</span>
              <span>{checkInStreak} day streak - You're building something real</span>
            </motion.div>
          )}
        </div>

        {/* Right side: Henry watching */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          {/* Glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-[#D4AF37] rounded-full blur-2xl"
          />
          
          {/* Henry skull */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#E5C5A1] to-[#B8941F] flex items-center justify-center shadow-2xl">
            <img 
              src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
              alt="Henry" 
              className="w-24 h-24 object-contain"
            />
          </div>
        </motion.div>
      </div>

      {/* Breathing animation on the entire card */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 40px rgba(212, 175, 55, 0.1)",
            "0 0 60px rgba(212, 175, 55, 0.2)",
            "0 0 40px rgba(212, 175, 55, 0.1)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-3xl pointer-events-none"
      />
    </motion.div>
  );
};

export default WelcomeHomeHero;
