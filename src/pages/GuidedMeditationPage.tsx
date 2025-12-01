import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, Volume2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const meditations = [
  {
    id: 1,
    title: "Mindful Breathing",
    duration: "5 min",
    description: "Focus on your breath to calm the mind",
    category: "Beginner"
  },
  {
    id: 2,
    title: "Body Scan",
    duration: "10 min",
    description: "Release tension from head to toe",
    category: "Intermediate"
  },
  {
    id: 3,
    title: "Loving Kindness",
    duration: "15 min",
    description: "Cultivate compassion for self and others",
    category: "All Levels"
  },
  {
    id: 4,
    title: "Anxiety Relief",
    duration: "8 min",
    description: "Calm racing thoughts and worries",
    category: "Beginner"
  }
];

const GuidedMeditationPage = () => {
  const navigate = useNavigate();
  const [selectedMeditation, setSelectedMeditation] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);

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
              Guided Meditation
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a meditation session to begin your mindfulness practice
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {meditations.map((meditation) => (
              <motion.div
                key={meditation.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all ${
                    selectedMeditation === meditation.id
                      ? "border-primary border-2 bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedMeditation(meditation.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{meditation.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {meditation.description}
                      </p>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {meditation.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {meditation.duration}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {selectedMeditation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">
                      {meditations.find((m) => m.id === selectedMeditation)?.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {meditations.find((m) => m.id === selectedMeditation)?.description}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-40"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-5 w-5 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5 mr-2" />
                          Begin
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-5 w-5 text-muted-foreground" />
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground w-12">
                        {volume[0]}%
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">Meditation Tips:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Find a quiet, comfortable space</li>
              <li>• Use headphones for the best experience</li>
              <li>• Don't worry if your mind wanders - gently bring focus back</li>
              <li>• Practice regularly for best results</li>
              <li>• Start with shorter sessions and build up</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GuidedMeditationPage;
