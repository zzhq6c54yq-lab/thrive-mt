import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Video, TrendingUp, User } from "lucide-react";

const CoachMembersTab = () => {
  const members = [
    {
      id: 1,
      name: "Sarah Mitchell",
      lastSession: "2 days ago",
      progress: "Career transition - crushing it! 🎯",
      mood: "Motivated",
      avatar: "SM"
    },
    {
      id: 2,
      name: "James Kim",
      lastSession: "5 days ago",
      progress: "Building confidence - seeing real growth! 💪",
      mood: "Optimistic",
      avatar: "JK"
    },
    {
      id: 3,
      name: "Lisa Thompson",
      lastSession: "1 week ago",
      progress: "Work-life balance - making awesome progress! 🌟",
      mood: "Balanced",
      avatar: "LT"
    },
    {
      id: 4,
      name: "Alex Patterson",
      lastSession: "3 days ago",
      progress: "Dream job landed! Celebration mode! 🎉",
      mood: "Excited",
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
        <h3 className="text-2xl font-bold text-foreground mb-2">Your Squad 💫</h3>
        <p className="text-muted-foreground mb-6">
          Amazing people you're helping thrive
        </p>

        <div className="space-y-4">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-lg bg-background/40 border border-border/30 hover:border-teal-500/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-lg mb-1">
                      {member.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Last hang: {member.lastSession}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-teal-400" />
                      <p className="text-sm text-foreground">{member.progress}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
                      <div className="h-2 w-2 rounded-full bg-teal-400" />
                      <span className="text-xs text-teal-400 font-medium">
                        {member.mood}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10">
                    <Video className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Empty state for when there are no members */}
      {members.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-background/60 backdrop-blur-sm rounded-lg border border-border/40 p-12 text-center"
        >
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Your squad is forming! 🌱
          </h3>
          <p className="text-muted-foreground">
            Soon you'll have amazing people to help thrive here
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CoachMembersTab;
