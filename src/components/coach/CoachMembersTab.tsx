import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Video, TrendingUp, Star, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const CoachMembersTab = () => {
  const members = [
    {
      id: 1,
      name: "Sarah M.",
      lastSession: "2 days ago",
      progress: 85,
      status: "On Fire",
      statusColor: "from-orange-500 to-red-500",
      statusBg: "from-orange-500/20 to-red-500/20",
      mood: "🔥",
      avatar: "SM"
    },
    {
      id: 2,
      name: "James K.",
      lastSession: "5 days ago",
      progress: 60,
      status: "Growing",
      statusColor: "from-emerald-500 to-cyan-500",
      statusBg: "from-emerald-500/20 to-cyan-500/20",
      mood: "📈",
      avatar: "JK"
    },
    {
      id: 3,
      name: "Lisa T.",
      lastSession: "1 week ago",
      progress: 92,
      status: "Thriving",
      statusColor: "from-purple-500 to-pink-500",
      statusBg: "from-purple-500/20 to-pink-500/20",
      mood: "💚",
      avatar: "LT"
    },
    {
      id: 4,
      name: "Alex P.",
      lastSession: "3 days ago",
      progress: 78,
      status: "Crushing It",
      statusColor: "from-amber-500 to-yellow-500",
      statusBg: "from-amber-500/20 to-yellow-500/20",
      mood: "🎯",
      avatar: "AP"
    },
  ];

  const spotlightMember = members[0];

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search your squad..." 
            className="pl-10 bg-background/60 border-border/40 focus:border-blue-500/40"
          />
        </div>
        <Button variant="outline" className="border-border/40">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-background/60 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6"
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-slate-300 bg-clip-text text-transparent mb-2">
          👥 YOUR SQUAD
        </h3>
        <p className="text-muted-foreground">
          {members.length} amazing humans you're helping thrive
        </p>
      </motion.div>

      {/* Member Spotlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className={`bg-gradient-to-br ${spotlightMember.statusBg} backdrop-blur-sm rounded-2xl border-2 border-orange-500/40 p-6 relative overflow-hidden`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-amber-400">MEMBER SPOTLIGHT</span>
          </div>
            <p className="text-lg text-foreground">
            <span className="font-bold text-blue-400">{spotlightMember.name}</span> just crushed their career transition interview! 🎉
          </p>
        </div>
      </motion.div>

      {/* Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-background/60 backdrop-blur-sm rounded-xl border border-border/40 hover:border-blue-500/40 p-5 transition-all"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${member.statusColor} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                  >
                    {member.avatar}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{member.name}</h4>
                    <p className="text-xs text-muted-foreground">Last: {member.lastSession}</p>
                  </div>
                </div>
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl"
                >
                  {member.mood}
                </motion.div>
              </div>

              {/* Status Badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${member.statusBg} border border-${member.statusColor.split(' ')[1].replace('to-', '')}/30`}>
                <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${member.statusColor} animate-pulse`} />
                <span className="text-sm font-bold bg-gradient-to-r ${member.statusColor} bg-clip-text text-transparent">
                  {member.status}
                </span>
              </div>

              {/* Progress Ring */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-bold text-blue-400">{member.progress}%</span>
                </div>
                <Progress value={member.progress} className="h-2" />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                  >
                    <MessageCircle className="h-3 w-3" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    className="w-full bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30"
                  >
                    <Video className="h-3 w-3" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30"
                  >
                    <Star className="h-3 w-3" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoachMembersTab;
