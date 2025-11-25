import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TherapistWelcomeBannerProps {
  therapistName: string;
  todaySessionCount: number;
  nextSessionTime?: string;
}

export default function TherapistWelcomeBanner({ 
  therapistName, 
  todaySessionCount,
  nextSessionTime 
}: TherapistWelcomeBannerProps) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1f] via-[#242432] to-[#272730] border border-[#B87333]/20 p-8 mb-8"
    >
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#B87333]/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: 0 
            }}
            animate={{
              y: [null, Math.random() * 100 + "%"],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Breathing bronze skull animation */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
          alt="" 
          className="w-32 h-32 object-contain filter drop-shadow-[0_0_20px_rgba(184,115,51,0.6)]"
        />
      </motion.div>

      <div className="relative z-10">
        <motion.h1 
          className="text-4xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {greeting}, Dr. {therapistName.split(' ')[1] || therapistName}
        </motion.h1>
        
        <motion.p 
          className="text-lg text-[#E5C5A1] mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {todaySessionCount === 0 
            ? "Your schedule is clear today - a moment to breathe."
            : todaySessionCount === 1
            ? "You have 1 session scheduled today. Your clients value your presence."
            : `You have ${todaySessionCount} sessions scheduled today. Your clients value your presence.`
          }
        </motion.p>

        {nextSessionTime && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#B87333]/10 border border-[#B87333]/30 rounded-lg"
          >
            <div className="w-2 h-2 bg-[#B87333] rounded-full animate-pulse" />
            <span className="text-sm text-white">Next session at {nextSessionTime}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
