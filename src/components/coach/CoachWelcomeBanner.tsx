import { motion } from "framer-motion";
import { Calendar, MessageCircle, TrendingUp, Star } from "lucide-react";

interface CoachWelcomeBannerProps {
  coachName: string;
}

const CoachWelcomeBanner: React.FC<CoachWelcomeBannerProps> = ({ coachName }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    if (hour < 12) return `Good morning, ${coachName}. Let's make ${day} count.`;
    if (hour < 18) return `Good afternoon, ${coachName}. Hope your ${day} is going well.`;
    return `Good evening, ${coachName}. Wrapping up ${day}.`;
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Your clients are counting on you today.",
      "Ready to help your clients reach their goals?",
      "Another day to make a meaningful impact.",
      "Your expertise matters. Let's get started."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const stats = {
    sessionsToday: 3,
    messages: 5,
    weeklyProgress: 12,
    rating: 4.9
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/10 via-slate-500/10 to-background/60 border border-teal-500/20 backdrop-blur-sm p-8"
    >
      <div className="flex items-start gap-6">
        <div className="hidden md:flex h-20 w-20 rounded-full bg-gradient-to-br from-teal-600 via-slate-500 to-slate-400 items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0">
          {coachName.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <motion.h2 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-3xl font-bold text-foreground mb-2"
          >
            {getGreeting()}
          </motion.h2>
          <motion.p 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-6"
          >
            {getMotivationalMessage()}
          </motion.p>

          {/* Professional stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-background/60 backdrop-blur-sm rounded-xl border border-border/40 p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-teal-400" />
                <span className="text-sm text-muted-foreground">Sessions Today</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {stats.sessionsToday}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-background/60 backdrop-blur-sm rounded-xl border border-border/40 p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-muted-foreground">Messages</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {stats.messages}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-background/60 backdrop-blur-sm rounded-xl border border-border/40 p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <span className="text-sm text-muted-foreground">Weekly Progress</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                +{stats.weeklyProgress}%
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-background/60 backdrop-blur-sm rounded-xl border border-border/40 p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="text-sm text-muted-foreground">Rating</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {stats.rating}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoachWelcomeBanner;
