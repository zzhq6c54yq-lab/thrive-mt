import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Moon, Sun, Coffee, Smartphone, BookOpen, ThermometerSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SleepImprovement = () => {
  const navigate = useNavigate();

  const tips = [
    {
      icon: Moon,
      title: "Consistent Schedule",
      description: "Go to bed and wake up at the same time every day, even on weekends"
    },
    {
      icon: ThermometerSun,
      title: "Cool Environment",
      description: "Keep your bedroom between 60-67°F (15-19°C) for optimal sleep"
    },
    {
      icon: Smartphone,
      title: "Digital Sunset",
      description: "Avoid screens 1 hour before bed or use blue light filters"
    },
    {
      icon: Coffee,
      title: "Caffeine Curfew",
      description: "Avoid caffeine at least 6 hours before bedtime"
    },
    {
      icon: Sun,
      title: "Morning Light",
      description: "Get natural sunlight exposure within 30 minutes of waking"
    },
    {
      icon: BookOpen,
      title: "Bedtime Routine",
      description: "Create a relaxing 30-minute wind-down ritual before sleep"
    }
  ];

  const exercises = [
    {
      title: "4-7-8 Breathing",
      steps: ["Inhale for 4 seconds", "Hold for 7 seconds", "Exhale for 8 seconds", "Repeat 4 times"]
    },
    {
      title: "Progressive Muscle Relaxation",
      steps: ["Tense each muscle group for 5 seconds", "Release and notice the relaxation", "Start from toes, move up to head", "Take 10-15 minutes"]
    },
    {
      title: "Body Scan Meditation",
      steps: ["Lie comfortably in bed", "Focus attention on each body part", "Notice sensations without judgment", "Move from head to toes"]
    }
  ];

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
              Sleep Improvement
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Evidence-based strategies to improve your sleep quality and duration
            </p>
          </div>

          <Tabs defaultValue="tips" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="tips">Sleep Hygiene</TabsTrigger>
              <TabsTrigger value="exercises">Sleep Exercises</TabsTrigger>
            </TabsList>

            <TabsContent value="tips" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tips.map((tip, index) => {
                  const Icon = tip.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 h-full hover:shadow-lg transition-all">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="exercises" className="mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                {exercises.map((exercise, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 h-full">
                      <h3 className="font-semibold text-lg mb-4">{exercise.title}</h3>
                      <ol className="space-y-3">
                        {exercise.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                              {stepIndex + 1}
                            </span>
                            <span className="text-sm text-muted-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                      <Button className="w-full mt-6" onClick={() => navigate("/app/mindfulness-sleep")}>
                        Try This Exercise
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Track Your Sleep</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Monitor your sleep patterns to identify what works best for you
              </p>
              <Button size="lg" onClick={() => navigate("/app/sleep-tracker")}>
                Open Sleep Tracker
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">When to Seek Professional Help:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Difficulty falling asleep for more than 30 minutes regularly</li>
              <li>• Waking up frequently during the night</li>
              <li>• Feeling exhausted despite adequate sleep time</li>
              <li>• Loud snoring or breathing pauses during sleep</li>
              <li>• Sleep issues lasting more than 3 months</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SleepImprovement;
