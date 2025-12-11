import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Smile, Heart, Sparkles, Music, Coffee, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const activities = [
  {
    id: 1,
    title: "Gratitude List",
    icon: Heart,
    description: "Write 3 things you're grateful for today",
    action: "Start Writing",
    color: "from-rose-500/20 to-pink-500/20"
  },
  {
    id: 2,
    title: "Dance Break",
    icon: Music,
    description: "Put on your favorite song and move",
    action: "Play Music",
    color: "from-purple-500/20 to-violet-500/20"
  },
  {
    id: 3,
    title: "Power Pose",
    icon: Sparkles,
    description: "Strike a confident pose for 2 minutes",
    action: "Start Pose",
    color: "from-amber-500/20 to-yellow-500/20"
  },
  {
    id: 4,
    title: "Smile Exercise",
    icon: Smile,
    description: "Smile for 30 seconds - it triggers happiness",
    action: "Start Smiling",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 5,
    title: "Coffee/Tea Ritual",
    icon: Coffee,
    description: "Mindfully enjoy a warm beverage",
    action: "Begin Ritual",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    id: 6,
    title: "Sunshine Break",
    icon: Sun,
    description: "Step outside for 5 minutes of sunlight",
    action: "Go Outside",
    color: "from-yellow-500/20 to-orange-500/20"
  }
];

const MoodBoost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleActivityStart = (title: string) => {
    toast({
      title: "Activity Started! 🎉",
      description: `You're doing: ${title}. Take your time and enjoy!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/app/mental-wellness-tools")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Wellness Tools
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Quick Mood Boost
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple activities to lift your spirits in just a few minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all group">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activity.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {activity.description}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => handleActivityStart(activity.title)}
                    >
                      {activity.action}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Why These Work</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These quick activities are scientifically proven to boost mood by triggering
                the release of endorphins, serotonin, and dopamine - your brain's natural
                feel-good chemicals.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">Mood Boost Tips:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Try a different activity each day</li>
              <li>• Combine multiple activities for stronger effects</li>
              <li>• Make these part of your daily routine</li>
              <li>• Notice how you feel before and after</li>
              <li>• Share activities with friends for extra fun</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodBoost;
