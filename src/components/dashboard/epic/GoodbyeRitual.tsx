import React from 'react';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';

interface GoodbyeRitualProps {
  userName?: string;
  todayStats?: {
    checkIns: number;
    activitiesCompleted: number;
    minutesOfSelfCare: number;
  };
  onClose: () => void;
}

const GoodbyeRitual: React.FC<GoodbyeRitualProps> = ({ 
  userName = 'friend', 
  todayStats = { checkIns: 0, activitiesCompleted: 0, minutesOfSelfCare: 0 },
  onClose 
}) => {
  const tomorrow = format(addDays(new Date(), 1), 'EEEE, MMMM d');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-background/95"
    >
      <div className="text-center space-y-8 px-4 max-w-2xl">
        {/* Henry watching you leave */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mx-auto mb-8"
        >
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
            className="absolute inset-0 bg-[#D4AF37] rounded-full blur-3xl"
          />
          <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] via-[#E5C5A1] to-[#B8941F] flex items-center justify-center shadow-2xl">
            <img 
              src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
              alt="Henry" 
              className="w-16 h-16 object-contain"
            />
          </div>
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-light text-foreground">
            You showed up for yourself today, {userName}
          </h2>
          
          {/* Today's recap */}
          {(todayStats.checkIns > 0 || todayStats.activitiesCompleted > 0) && (
            <div className="flex items-center justify-center gap-6 text-muted-foreground">
              {todayStats.checkIns > 0 && (
                <span className="text-sm font-light">
                  {todayStats.checkIns} check-in{todayStats.checkIns > 1 ? 's' : ''}
                </span>
              )}
              {todayStats.activitiesCompleted > 0 && (
                <span className="text-sm font-light">
                  {todayStats.activitiesCompleted} activit{todayStats.activitiesCompleted > 1 ? 'ies' : 'y'}
                </span>
              )}
              {todayStats.minutesOfSelfCare > 0 && (
                <span className="text-sm font-light">
                  {todayStats.minutesOfSelfCare} minutes of self-care
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Tomorrow preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-2"
        >
          <p className="text-lg text-muted-foreground font-light">
            Rest well. We'll be here when you're ready.
          </p>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="inline-block px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20"
          >
            <span className="text-sm text-[#D4AF37] font-light">
              {tomorrow}
            </span>
          </motion.div>
        </motion.div>

        {/* Final message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-muted-foreground/60 font-light"
        >
          We're proud of you. See you soon.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default GoodbyeRitual;
