import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Dumbbell, Brain, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const exercises = [
  {
    id: 1,
    title: "Mindful Walking",
    icon: Dumbbell,
    duration: "10-20 min",
    difficulty: "Easy",
    description: "Walk slowly and focus on each step, your breath, and surroundings",
    benefits: ["Reduces anxiety", "Improves focus", "Boosts mood"],
    steps: [
      "Find a quiet path or space",
      "Walk at a slow, steady pace",
      "Focus on the sensation of each step",
      "Notice your breath and surroundings",
      "Gently return focus when mind wanders"
    ]
  },
  {
    id: 2,
    title: "Yoga Flow",
    icon: Brain,
    duration: "15-30 min",
    difficulty: "Medium",
    description: "Gentle yoga sequence combining movement, breath, and mindfulness",
    benefits: ["Relieves tension", "Improves flexibility", "Calms mind"],
    steps: [
      "Start in a comfortable seated position",
      "Move through gentle stretches",
      "Sync movement with breath",
      "Hold each pose for 5-8 breaths",
      "End with relaxation pose"
    ]
  },
  {
    id: 3,
    title: "Tai Chi Basics",
    icon: Heart,
    duration: "20-30 min",
    difficulty: "Medium",
    description: "Slow, flowing movements that calm the mind and strengthen the body",
    benefits: ["Reduces stress", "Improves balance", "Enhances well-being"],
    steps: [
      "Stand with feet shoulder-width apart",
      "Begin with gentle arm movements",
      "Flow slowly between positions",
      "Maintain deep, steady breathing",
      "Focus on smooth transitions"
    ]
  },
  {
    id: 4,
    title: "Progressive Exercise",
    icon: Zap,
    duration: "5-10 min",
    difficulty: "Easy",
    description: "Build energy gradually with progressive physical activity",
    benefits: ["Energizes body", "Clears mind", "Builds confidence"],
    steps: [
      "Start with gentle stretches",
      "Add light cardio (marching in place)",
      "Increase intensity gradually",
      "Peak with moderate activity",
      "Cool down with deep breathing"
    ]
  }
];

const MentalWellnessExercise = () => {
  const navigate = useNavigate();

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
              Mind-Body Exercises
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Physical exercises designed to enhance mental well-being and reduce stress
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {exercises.map((exercise, index) => {
              const Icon = exercise.icon;
              return (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl mb-1">{exercise.title}</h3>
                        <div className="flex gap-3 text-sm text-muted-foreground">
                          <span>{exercise.duration}</span>
                          <span>•</span>
                          <span>{exercise.difficulty}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {exercise.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exercise.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Steps:</h4>
                      <ol className="space-y-2">
                        {exercise.steps.map((step, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="font-medium text-primary">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <Button className="w-full">Start Exercise</Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">Exercise Safety Tips:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Start slowly and listen to your body</li>
              <li>• Stay hydrated before, during, and after exercise</li>
              <li>• Wear comfortable, breathable clothing</li>
              <li>• Stop if you feel pain or extreme discomfort</li>
              <li>• Consult a healthcare provider if you have health concerns</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MentalWellnessExercise;
