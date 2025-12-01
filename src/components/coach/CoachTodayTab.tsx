import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Video, Star, Target, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CoachTodayTab = () => {
  const dailyProgress = 75;

  const upcomingCalls = [
    { id: 1, name: "Sarah M.", time: "2:00 PM", topic: "Career transition", minutesUntil: 23 },
    { id: 2, name: "James K.", time: "3:30 PM", topic: "Building confidence", minutesUntil: 113 },
    { id: 3, name: "Lisa T.", time: "5:00 PM", topic: "Work-life balance check-in", minutesUntil: 203 },
  ];

  const quickWins = [
    { id: 1, member: "Alex P.", achievement: "Landed their dream job", color: "from-amber-500 to-yellow-500" },
    { id: 2, member: "Jordan M.", achievement: "Celebrated 30 days alcohol-free", color: "from-emerald-500 to-cyan-500" },
    { id: 3, member: "Casey L.", achievement: "Completed their first meditation", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Daily Mission Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-teal-500/10 via-slate-500/10 to-background/60 backdrop-blur-sm rounded-2xl border border-teal-500/20 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-teal-400" />
          <h3 className="text-xl font-bold text-foreground">Daily Mission</h3>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-bold text-teal-400">3 of 4 sessions complete</span>
          </div>
          <Progress value={dailyProgress} className="h-3" />
        </div>
        <p className="text-muted-foreground">
          One more session to reach today's goal.
        </p>
      </motion.div>

      {/* Next Up - Highlighted */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-teal-500/20 to-background/60 backdrop-blur-sm rounded-2xl border border-teal-500/40 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-teal-400 fill-teal-400" />
          <h3 className="text-xl font-bold text-teal-400">Next Session</h3>
        </div>
        <div className="flex items-center justify-between gap-4 p-5 rounded-xl bg-background/40 border border-teal-500/30">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              SM
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{upcomingCalls[0].name}</p>
              <p className="text-sm text-muted-foreground">Career transition</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-sm font-bold text-teal-400">
              Starting in 15 min
            </span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold">
                <Video className="h-4 w-4 mr-2" />
                Start Session
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-background/60 backdrop-blur-sm rounded-xl border border-border/40 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-400" />
          Rest of Today
        </h3>
        <div className="space-y-3">
          {upcomingCalls.slice(1).map((call, idx) => (
            <motion.div
              key={call.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-4 rounded-lg bg-background/40 border border-border/30 hover:border-teal-500/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {call.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{call.name}</p>
                  <p className="text-sm text-muted-foreground">{call.topic}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-teal-400 font-medium">{call.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Client Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-background/60 backdrop-blur-sm rounded-xl border border-border/40 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
          Client Achievements
        </h3>
        <div className="space-y-3">
          {quickWins.map((win, idx) => (
            <motion.div
              key={win.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              whileHover={{ x: 5 }}
              className="p-4 rounded-lg bg-background/40 border border-border/30 hover:border-teal-500/30 transition-all"
            >
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${win.color}`} />
                <span className="text-foreground font-medium">{win.member}</span>
                <span className="text-muted-foreground">{win.achievement}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Messages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-blue-500/10 to-background/60 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-400" />
            <h3 className="text-xl font-bold text-foreground">Messages</h3>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground font-medium mb-2">
              <span className="text-2xl font-bold text-blue-400">5</span> unread messages
            </p>
            <p className="text-sm text-muted-foreground">Clients awaiting your response</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
              Reply All
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoachTodayTab;
