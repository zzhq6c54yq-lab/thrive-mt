import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Video, Sparkles } from "lucide-react";

const CoachTodayTab = () => {
  const upcomingCalls = [
    { id: 1, name: "Sarah M.", time: "2:00 PM", topic: "Career transition vibes" },
    { id: 2, name: "James K.", time: "3:30 PM", topic: "Building confidence" },
    { id: 3, name: "Lisa T.", time: "5:00 PM", topic: "Work-life balance check-in" },
  ];

  const quickWins = [
    { member: "Alex P.", achievement: "Landed dream job interview! 🎉" },
    { member: "Maria G.", achievement: "Completed 30-day wellness streak 💪" },
    { member: "David L.", achievement: "Started meditation practice 🧘" },
  ];

  return (
    <div className="space-y-6">
      {/* Today's Vibe */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-background/60 backdrop-blur-sm rounded-lg border border-border/40 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-teal-400" />
          Today's Vibe
        </h3>
        <p className="text-muted-foreground mb-4">
          You've got 3 amazing people to connect with today. Let's help them thrive! 🚀
        </p>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            View Schedule
          </Button>
          <Button variant="outline" className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10">
            Quick Prep
          </Button>
        </div>
      </motion.div>

      {/* Upcoming Hangs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-background/60 backdrop-blur-sm rounded-lg border border-border/40 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-teal-400" />
          Upcoming Hangs
        </h3>
        <div className="space-y-3">
          {upcomingCalls.map((call) => (
            <div
              key={call.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background/40 border border-border/30 hover:border-teal-500/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold">
                  {call.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{call.name}</p>
                  <p className="text-sm text-muted-foreground">{call.topic}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-teal-400 font-medium">{call.time}</span>
                <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Video className="h-4 w-4 mr-2" />
                  Let's Chat!
                </Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Wins */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-background/60 backdrop-blur-sm rounded-lg border border-border/40 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-teal-400" />
          Quick Wins 🎉
        </h3>
        <div className="space-y-3">
          {quickWins.map((win, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-gradient-to-r from-teal-500/10 to-transparent border border-teal-500/20"
            >
              <p className="text-foreground">
                <span className="font-semibold text-teal-400">{win.member}</span>
                {" - "}
                {win.achievement}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Catch-ups Needed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-background/60 backdrop-blur-sm rounded-lg border border-border/40 p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-teal-400" />
          Catch-ups Needed
        </h3>
        <p className="text-muted-foreground mb-4">
          You've got 5 messages waiting for some Maya magic ✨
        </p>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          Check Messages
        </Button>
      </motion.div>
    </div>
  );
};

export default CoachTodayTab;
