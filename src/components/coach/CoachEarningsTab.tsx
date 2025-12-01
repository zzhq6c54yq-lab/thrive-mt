import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Calendar, Award, Zap, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CoachEarningsTab = () => {
  const monthlyEarnings = {
    current: 3240,
    previous: 2890,
    growth: 12,
    goal: 4000,
  };

  const recentSessions = [
    { date: "Dec 15", member: "Sarah M.", amount: 120, type: "1-on-1 Session" },
    { date: "Dec 14", member: "James K.", amount: 120, type: "1-on-1 Session" },
    { date: "Dec 13", member: "Lisa T.", amount: 150, type: "Extended Session" },
    { date: "Dec 12", member: "Alex P.", amount: 120, type: "1-on-1 Session" },
  ];

  const goalProgress = (monthlyEarnings.current / monthlyEarnings.goal) * 100;

  return (
    <div className="space-y-6">
      {/* Monthly Overview with Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-background/60 backdrop-blur-sm rounded-2xl border border-teal-500/20 p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="h-8 w-8 text-teal-400" />
          <h3 className="text-2xl font-bold text-foreground">
            Monthly Earnings
          </h3>
        </div>

        {/* Big Number */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">This Month</p>
          <p className="text-5xl font-bold text-foreground mb-2">
            ${monthlyEarnings.current.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 text-teal-400">
            <TrendingUp className="h-5 w-5" />
            <span className="text-lg font-bold">+{monthlyEarnings.growth}% from last month</span>
          </div>
        </div>

        {/* Progress to Goal */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-teal-400" />
              <span className="text-sm font-medium text-muted-foreground">Monthly Goal Progress</span>
            </div>
            <span className="text-sm font-bold text-teal-400">
              ${monthlyEarnings.goal.toLocaleString()}
            </span>
          </div>
          <Progress value={goalProgress} className="h-4" />
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round(goalProgress)}% complete
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/40"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-amber-400" />
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <p className="text-3xl font-bold text-foreground">27</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/40"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-teal-400" />
              <p className="text-xs text-muted-foreground">Avg/Session</p>
            </div>
            <p className="text-3xl font-bold text-foreground">$120</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/40"
          >
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-amber-400" />
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <p className="text-3xl font-bold text-foreground">4.9 ⭐</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Recent Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-background/60 backdrop-blur-sm rounded-xl border border-border/40 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-400" />
          Recent Sessions
        </h3>
        <div className="space-y-3">
          {recentSessions.map((session, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-4 rounded-lg bg-background/40 border border-border/30 hover:border-blue-500/30 transition-all"
            >
              <div>
                <p className="font-medium text-foreground">{session.member}</p>
                <p className="text-sm text-muted-foreground">{session.type}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-teal-400 text-xl">
                  ${session.amount}
                </p>
                <p className="text-sm text-muted-foreground">{session.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mini Sparkline Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-blue-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6"
      >
        <h3 className="text-lg font-bold text-foreground mb-4">Weekly Earnings Trend</h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {[65, 85, 75, 95, 88, 92, 100].map((height, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
              className="flex-1 bg-gradient-to-t from-blue-500 to-teal-500 rounded-t-lg relative group cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background/90 px-2 py-1 rounded text-xs font-bold whitespace-nowrap"
              >
                ${(height * 5).toFixed(0)}
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </motion.div>
    </div>
  );
};

export default CoachEarningsTab;
