import { motion } from "framer-motion";
import { Calendar, MessageCircle, TrendingUp, Sparkles, Award } from "lucide-react";

interface CoachWelcomeBannerProps {
  coachName: string;
}

const CoachWelcomeBanner: React.FC<CoachWelcomeBannerProps> = ({ coachName }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    if (hour < 12) return `Yo ${coachName}! ☀️ ${day} morning vibes!`;
    if (hour < 18) return `Hey ${coachName}! 👋 Happy ${day}!`;
    return `Evening, ${coachName}! 🌙 ${day} wind-down mode`;
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Ready to change some lives today? 🚀",
      "Your squad is about to level up! 💫",
      "Let's help some people absolutely crush it! 🎯",
      "Time to spread some serious good vibes! 🌟",
      "You're making a massive impact! Keep going! 💪",
      "Today's gonna be legendary! Let's do this! ⚡"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm p-8"
    >
      {/* Animated confetti particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ['#3b82f6', '#14b8a6', '#06b6d4', '#f59e0b'][i % 4],
            left: `${(i * 8) + 10}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      <div className="relative z-10 flex items-start gap-6">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="hidden md:flex h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 via-teal-500 to-slate-400 items-center justify-center text-white font-bold text-3xl flex-shrink-0 shadow-2xl"
        >
          {coachName.charAt(0).toUpperCase()}
        </motion.div>

        <div className="flex-1">
          <motion.h2 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-slate-300 bg-clip-text text-transparent mb-2"
          >
            {getGreeting()}
          </motion.h2>
          <motion.p 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-foreground/80 mb-6 flex items-center gap-2"
          >
            {getMotivationalMessage()}
          </motion.p>

          {/* Fun stats with animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-12 w-12 rounded-full bg-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/50 transition-colors"
                >
                  <Calendar className="h-6 w-6 text-blue-400" />
                </motion.div>
                <div>
                  <motion.p 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    className="text-3xl font-bold text-blue-400"
                  >
                    3
                  </motion.p>
                  <p className="text-xs text-muted-foreground">Hangs Today</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 backdrop-blur-sm rounded-xl p-4 border border-teal-500/30 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-12 w-12 rounded-full bg-teal-500/30 flex items-center justify-center group-hover:bg-teal-500/50 transition-colors relative"
                >
                  <MessageCircle className="h-6 w-6 text-teal-400" />
                  <motion.div
                    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-teal-400/30"
                  />
                </motion.div>
                <div>
                  <motion.p 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.3 }}
                    className="text-3xl font-bold text-teal-400"
                  >
                    5
                  </motion.p>
                  <p className="text-xs text-muted-foreground">Messages</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm rounded-xl p-4 border border-amber-500/30 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="h-12 w-12 rounded-full bg-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/50 transition-colors"
                >
                  <TrendingUp className="h-6 w-6 text-amber-400" />
                </motion.div>
                <div>
                  <motion.p 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.6 }}
                    className="text-3xl font-bold text-amber-400"
                  >
                    12
                  </motion.p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/30 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ 
                    boxShadow: ['0 0 0px rgba(16, 185, 129, 0.4)', '0 0 20px rgba(16, 185, 129, 0.6)', '0 0 0px rgba(16, 185, 129, 0.4)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-12 w-12 rounded-full bg-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/50 transition-colors"
                >
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                </motion.div>
                <div>
                  <motion.p 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.9 }}
                    className="text-3xl font-bold text-emerald-400"
                  >
                    4.9
                  </motion.p>
                  <p className="text-xs text-muted-foreground">Rating ⭐</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Vibe check progress */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground/80">Your vibe check:</span>
                <span className="text-sm font-bold text-transparent bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text">
                  🔥 FIRE MODE
                </span>
              </div>
              <div className="h-3 bg-background/40 rounded-full overflow-hidden border border-border/40">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '92%' }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 via-teal-500 to-amber-500 rounded-full relative"
                >
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Award className="h-8 w-8 text-amber-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoachWelcomeBanner;
