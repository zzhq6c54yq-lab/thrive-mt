import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Plus } from "lucide-react";

const CoachScheduleTab = () => {
  const upcomingHangs = [
    {
      id: 1,
      member: "Sarah M.",
      date: "Today",
      time: "2:00 PM",
      duration: "60 min",
      topic: "Career transition check-in",
      type: "Video",
      avatar: "SM",
      status: "soon",
      color: "from-emerald-500 to-cyan-500"
    },
    {
      id: 2,
      member: "James K.",
      date: "Today",
      time: "3:30 PM",
      duration: "60 min",
      topic: "Building confidence workshop",
      type: "Video",
      avatar: "JK",
      status: "soon",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      member: "Lisa T.",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "60 min",
      topic: "Work-life balance strategies",
      type: "Video",
      avatar: "LT",
      status: "later",
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 4,
      member: "Alex P.",
      date: "Friday",
      time: "1:00 PM",
      duration: "60 min",
      topic: "Celebrating wins & next steps",
      type: "Video",
      avatar: "AP",
      status: "later",
      color: "from-blue-500 to-cyan-500"
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-background/60 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-slate-300 bg-clip-text text-transparent mb-2">
              Upcoming Sessions
            </h3>
            <p className="text-muted-foreground">
              Your coaching sessions this week
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </motion.div>
        </div>

        {/* Timeline View */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-teal-500 to-cyan-500" />

          <div className="space-y-6">
            {upcomingHangs.map((hang, idx) => (
              <motion.div
                key={hang.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 top-6 h-5 w-5 rounded-full bg-gradient-to-br ${hang.color} border-4 border-background z-10`} />

                <motion.div
                  whileHover={{ x: 5, scale: 1.02 }}
                  className={`p-6 rounded-xl border transition-all ${
                    hang.status === 'soon'
                      ? `bg-gradient-to-r ${hang.color.replace('from-', 'from-').replace('to-', 'to-')}/20 border-${hang.color.split(' ')[1].replace('to-', '')}/40`
                      : 'bg-background/40 border-border/30 hover:border-blue-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${hang.color} flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0`}>
                        {hang.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-foreground text-lg">
                            {hang.member}
                          </h4>
                          {hang.status === 'soon' && (
                            <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold border border-teal-500/30">
                              Soon
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3">{hang.topic}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-blue-400 font-medium">
                            <Calendar className="h-4 w-4" />
                            <span>{hang.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-teal-400 font-medium">
                            <Clock className="h-4 w-4" />
                            <span>{hang.time} • {hang.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-cyan-400">
                            <Video className="h-4 w-4" />
                            <span>{hang.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          size="sm" 
                          className={`bg-gradient-to-r ${hang.color} hover:opacity-90 text-white font-bold`}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Join
                        </Button>
                      </motion.div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-border/40 hover:border-blue-500/40"
                      >
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Free Slots */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground mb-1">Free slots available</p>
              <p className="text-sm text-muted-foreground">5:00 PM - 7:00 PM today</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Session
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Week view visualization */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <p className="text-sm text-muted-foreground mb-3">This week at a glance:</p>
          <div className="flex gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <motion.div
                key={day}
                whileHover={{ scale: 1.1 }}
                className="flex-1"
              >
                <div className="text-center mb-2">
                  <p className="text-xs text-muted-foreground">{day}</p>
                </div>
                <div className={`h-12 rounded-lg ${
                  idx < 2 
                    ? 'bg-gradient-to-t from-blue-500/40 to-teal-500/40 border border-blue-500/40' 
                    : 'bg-background/20 border border-border/20'
                }`} />
              </motion.div>
            ))}
          </div>
              <p className="text-xs text-center text-muted-foreground mt-2">
            2 sessions scheduled this week
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CoachScheduleTab;
