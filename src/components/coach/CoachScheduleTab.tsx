import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin } from "lucide-react";

const CoachScheduleTab = () => {
  const upcomingHangs = [
    {
      id: 1,
      member: "Sarah Mitchell",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      topic: "Career transition check-in",
      type: "Video",
      avatar: "SM"
    },
    {
      id: 2,
      member: "James Kim",
      date: "Today",
      time: "3:30 PM - 4:30 PM",
      topic: "Building confidence workshop",
      type: "Video",
      avatar: "JK"
    },
    {
      id: 3,
      member: "Lisa Thompson",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      topic: "Work-life balance strategies",
      type: "Video",
      avatar: "LT"
    },
    {
      id: 4,
      member: "Alex Patterson",
      date: "Friday",
      time: "1:00 PM - 2:00 PM",
      topic: "Celebrating wins & next steps",
      type: "Video",
      avatar: "AP"
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background/60 backdrop-blur-sm rounded-lg border border-border/40 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Upcoming Hangs 📅
            </h3>
            <p className="text-muted-foreground">
              Your coaching calls this week
            </p>
          </div>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
        </div>

        <div className="space-y-4">
          {upcomingHangs.map((hang, idx) => (
            <motion.div
              key={hang.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-lg bg-background/40 border border-border/30 hover:border-teal-500/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {hang.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-lg mb-2">
                      {hang.member}
                    </h4>
                    <p className="text-muted-foreground mb-3">{hang.topic}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-teal-400">
                        <Calendar className="h-4 w-4" />
                        <span>{hang.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{hang.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Video className="h-4 w-4" />
                        <span>{hang.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Video className="h-4 w-4 mr-2" />
                    Join
                  </Button>
                  <Button size="sm" variant="outline" className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10">
                    Reschedule
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Free Day Message */}
      {upcomingHangs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 backdrop-blur-sm rounded-lg border border-teal-500/20 p-12 text-center"
        >
          <MapPin className="h-16 w-16 text-teal-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            You've got a free day! 🌴
          </h3>
          <p className="text-muted-foreground mb-6">
            Perfect time to recharge or catch up on prep work
          </p>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            Schedule Some Hangs
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default CoachScheduleTab;
