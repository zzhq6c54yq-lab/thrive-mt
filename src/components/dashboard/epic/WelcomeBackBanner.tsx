import React from 'react';
import { motion } from 'framer-motion';
import { useLastSeen } from '@/hooks/useLastSeen';

interface WelcomeBackBannerProps {
  user: any;
  profile: any;
}

const WelcomeBackBanner: React.FC<WelcomeBackBannerProps> = ({ user, profile }) => {
  const { lastCheckIn } = useLastSeen();

  const getTimeAwareGreeting = () => {
    const hour = new Date().getHours();
    const name = profile?.display_name?.split(' ')[0] || 'friend';
    
    if (hour < 5) {
      return `Late night, ${name}? We're here with you - because you're worth it.`;
    } else if (hour < 9) {
      return `Good morning, ${name}. Thank you for showing up today - you deserve this.`;
    } else if (hour < 17) {
      return `Welcome back, ${name}. We've been waiting for you - because you matter.`;
    } else if (hour < 21) {
      return `Good evening, ${name}. Time to reconnect with yourself - you hold worth.`;
    } else {
      return `Welcome home, ${name}. You made it through today - you deserve rest.`;
    }
  };

  const getAffirmingMessage = () => {
    const hour = new Date().getHours();
    
    if (hour < 5) {
      return "Sometimes the hardest work happens in the quiet hours. You're doing it.";
    } else if (hour < 12) {
      return "Every moment you choose yourself matters. This is one of them.";
    } else if (hour < 17) {
      return "You're here. That's the most important thing you'll do today.";
    } else if (hour < 21) {
      return "Taking time for yourself isn't selfish. It's necessary. We're proud of you.";
    } else {
      return "You showed up for yourself today. That takes real strength.";
    }
  };

  const getDaysSinceLastVisit = () => {
    if (!lastCheckIn) return null;
    
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastCheckIn.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const daysSinceLastVisit = getDaysSinceLastVisit();

  const getVisitMessage = () => {
    if (!daysSinceLastVisit) return null;
    
    if (daysSinceLastVisit === 0) {
      return "You're back! We love seeing you twice today.";
    } else if (daysSinceLastVisit === 1) {
      return "Welcome back. We missed you yesterday.";
    } else {
      return `It's been ${daysSinceLastVisit} days. We've been thinking about you.`;
    }
  };

  // Generate floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 via-[#F5E6D3]/10 to-[#D4AF37]/20 border border-[#D4AF37]/30 p-6 md:p-8 backdrop-blur-sm"
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#D4AF37]/30 rounded-full"
            initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0 }}
            animate={{
              x: [`${particle.x}%`, `${particle.x + 10}%`, `${particle.x}%`],
              y: [`${particle.y}%`, `${particle.y - 20}%`, `${particle.y}%`],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        {/* Bronze skull breathing animation */}
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex-shrink-0"
        >
          <img
            src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
            alt="ThriveMT"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full"
          />
        </motion.div>

        <div className="flex-1">
          {/* Time-aware greeting */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-3xl font-light text-foreground mb-2"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            {getTimeAwareGreeting()}
          </motion.h2>

          {/* Affirming message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-base md:text-lg text-muted-foreground font-light"
          >
            {getAffirmingMessage()}
          </motion.p>

          {/* Days since last visit */}
          {daysSinceLastVisit !== null && daysSinceLastVisit > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-sm text-muted-foreground/80 mt-2 italic"
            >
              {getVisitMessage()}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeBackBanner;
