import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Calendar, Award } from "lucide-react";

const CoachEarningsTab = () => {
  const monthlyEarnings = {
    current: 3240,
    previous: 2890,
    growth: 12,
  };

  const recentSessions = [
    { date: "Dec 15", member: "Sarah M.", amount: 120, type: "1-on-1 Session" },
    { date: "Dec 14", member: "James K.", amount: 120, type: "1-on-1 Session" },
    { date: "Dec 13", member: "Lisa T.", amount: 150, type: "Extended Session" },
    { date: "Dec 12", member: "Alex P.", amount: 120, type: "1-on-1 Session" },
  ];

  return (
    <div className="space-y-6">
      {/* Monthly Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 backdrop-blur-sm rounded-lg border border-teal-500/20 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-teal-400" />
          Your Earnings 💰
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background/60 backdrop-blur-sm rounded-lg p-5 border border-border/40">
            <p className="text-sm text-muted-foreground mb-2">This Month</p>
            <p className="text-3xl font-bold text-foreground mb-1">
              ${monthlyEarnings.current.toLocaleString()}
            </p>
            <div className="flex items-center gap-2 text-teal-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+{monthlyEarnings.growth}% from last month</span>
            </div>
          </div>

          <div className="bg-background/60 backdrop-blur-sm rounded-lg p-5 border border-border/40">
            <p className="text-sm text-muted-foreground mb-2">Last Month</p>
            <p className="text-3xl font-bold text-foreground">
              ${monthlyEarnings.previous.toLocaleString()}
            </p>
          </div>

          <div className="bg-background/60 backdrop-blur-sm rounded-lg p-5 border border-border/40">
            <p className="text-sm text-muted-foreground mb-2">Total Sessions</p>
            <p className="text-3xl font-bold text-foreground">27</p>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-background/60 backdrop-blur-sm rounded-lg border border-border/40 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-teal-400" />
          Recent Sessions
        </h3>
        <div className="space-y-3">
          {recentSessions.map((session, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between p-4 rounded-lg bg-background/40 border border-border/30"
            >
              <div>
                <p className="font-medium text-foreground">{session.member}</p>
                <p className="text-sm text-muted-foreground">{session.type}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-teal-400 text-lg">
                  ${session.amount}
                </p>
                <p className="text-sm text-muted-foreground">{session.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-lg border border-amber-500/20 p-6 text-center"
      >
        <Award className="h-12 w-12 text-amber-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-foreground mb-2">
          You're on fire! 🔥
        </h3>
        <p className="text-muted-foreground">
          You've helped 27 people this month. That's incredible impact! Keep spreading the good vibes! ✨
        </p>
      </motion.div>
    </div>
  );
};

export default CoachEarningsTab;
