import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Video, Sparkles, Trophy, Flame, Clock } from "lucide-react";
import { useState } from "react";

const CoachTodayTab = () => {
  const [celebratedWins, setCelebratedWins] = useState<number[]>([]);

  const upcomingCalls = [
    { id: 1, name: "Sarah M.", time: "2:00 PM", topic: "Career transition vibes", minutesUntil: 23 },
    { id: 2, name: "James K.", time: "3:30 PM", topic: "Building confidence", minutesUntil: 113 },
    { id: 3, name: "Lisa T.", time: "5:00 PM", topic: "Work-life balance check-in", minutesUntil: 203 },
  ];

  const quickWins = [
    { id: 1, member: "Alex P.", achievement: "landed their dream job!", emoji: "🎉" },
    { id: 2, member: "Maria G.", achievement: "hit 30-day streak!", emoji: "💪" },
    { id: 3, member: "David L.", achievement: "started meditation!", emoji: "🧘" },
  ];

  const handleCelebrate = (id: number) => {
    if (!celebratedWins.includes(id)) {
      setCelebratedWins([...celebratedWins, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Mission Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-background/60 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <Trophy className="h-6 w-6 text-amber-400" />
          </motion.div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-slate-300 bg-clip-text text-transparent">
            TODAY'S MISSION
          </h3>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground/80">Progress</span>
            <span className="text-sm font-bold text-blue-400">3/4 sessions done! 🔥</span>
          </div>
          <div className="h-4 bg-background/40 rounded-full overflow-hidden border border-border/40">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 rounded-full relative"
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </div>
        <p className="text-muted-foreground">
          One more session to crush your daily goal! Let's gooo! 🚀
        </p>
      </motion.div>

      {/* Next Up - Highlighted */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-background/60 backdrop-blur-sm rounded-2xl border-2 border-amber-500/40 p-6 relative overflow-hidden"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="h-6 w-6 text-amber-400 animate-pulse" />
            <h3 className="text-xl font-bold text-amber-400">NEXT UP</h3>
          </div>
          <div className="flex items-center justify-between gap-4 p-5 rounded-xl bg-background/40 border border-amber-500/30">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 via-teal-500 to-slate-400 flex items-center justify-center text-white font-bold text-xl"
              >
                SM
              </motion.div>
              <div>
                <p className="text-lg font-bold text-foreground">{upcomingCalls[0].name}</p>
                <p className="text-sm text-muted-foreground mb-1">{upcomingCalls[0].topic}</p>
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock className="h-4 w-4" />
                  <motion.span 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-sm font-bold"
                  >
                    Starting in {upcomingCalls[0].minutesUntil} min
                  </motion.span>
                </div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6">
                <Video className="h-5 w-5 mr-2" />
                START 🎬
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Hangs */}
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
              className="flex items-center justify-between p-4 rounded-lg bg-background/40 border border-border/30 hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                  {call.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{call.name}</p>
                  <p className="text-sm text-muted-foreground">{call.topic}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-blue-400 font-medium">{call.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Wins */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-background/60 backdrop-blur-sm rounded-xl border border-border/40 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-teal-400" />
          Quick Wins - Celebrate your squad! 🎉
        </h3>
        <div className="space-y-3">
          {quickWins.map((win, idx) => (
            <motion.div
              key={win.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className={`p-4 rounded-lg border transition-all ${
                celebratedWins.includes(win.id)
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-500/40'
                  : 'bg-gradient-to-r from-blue-500/10 to-teal-500/10 border-blue-500/20 hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-foreground">
                  <span className="text-2xl mr-2">{win.emoji}</span>
                  <span className="font-semibold text-blue-400">{win.member}</span>
                  {" "}
                  {win.achievement}
                </p>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="sm"
                    onClick={() => handleCelebrate(win.id)}
                    className={
                      celebratedWins.includes(win.id)
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
                    }
                  >
                    {celebratedWins.includes(win.id) ? "Celebrated! ✨" : "High-five! 🙌"}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Messages Buzzing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-cyan-400" />
          💬 BUZZING - Messages that need love
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground font-medium mb-2">
              <span className="text-2xl font-bold text-cyan-400">5</span> unread - "You've got fans waiting!"
            </p>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-cyan-400"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="h-2 w-2 rounded-full bg-cyan-400"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="h-2 w-2 rounded-full bg-cyan-400"
              />
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
              Reply All 💬
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoachTodayTab;
