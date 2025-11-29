import { motion } from "framer-motion";
import { Calendar, MessageCircle, TrendingUp } from "lucide-react";

const CoachWelcomeBanner = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning, Maya! ☀️";
    if (hour < 18) return "Hey Maya! 👋";
    return "Evening, Maya! 🌙";
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Ready to make some magic today? ✨",
      "Your squad is lucky to have you! 💫",
      "Let's help some people thrive! 🚀",
      "Time to spread some good vibes! 🌟",
      "You're making a real difference! 💪"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-600/10 border border-teal-500/20 backdrop-blur-sm p-8"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {getGreeting()}
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          {getMotivationalMessage()}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-border/40"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Check-ins Today</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-border/40"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">What's Buzzing?</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-border/40"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Connections This Week</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoachWelcomeBanner;
