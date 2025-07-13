import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Play, Pause, RotateCcw, Heart, Brain, Leaf } from "lucide-react";

const MEDITATION_TYPES = [
  {
    id: 'breathing',
    name: 'Breathing Focus',
    duration: 300,
    icon: Leaf,
    instructions: [
      'Sit comfortably with your eyes closed',
      'Focus on your natural breathing rhythm',
      'When your mind wanders, gently return to your breath',
      'Count each exhale from 1 to 10, then repeat'
    ]
  },
  {
    id: 'body-scan',
    name: 'Body Scan',
    duration: 600,
    icon: Heart,
    instructions: [
      'Lie down comfortably with eyes closed',
      'Start by focusing on your toes',
      'Slowly move your attention up through your body',
      'Notice any tension and consciously relax each area'
    ]
  }
];

const GameMeditationStudio: React.FC = () => {
  const [selectedMeditation, setSelectedMeditation] = useState<typeof MEDITATION_TYPES[0] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'selection' | 'meditation' | 'completion'>('selection');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setCurrentPhase('completion');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startMeditation = (meditation: typeof MEDITATION_TYPES[0]) => {
    setSelectedMeditation(meditation);
    setTimeLeft(meditation.duration);
    setCurrentPhase('meditation');
    setIsRunning(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (currentPhase === 'completion') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-green-100 to-emerald-100">
          <CardHeader className="text-center">
            <Sparkles className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-800">Meditation Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-green-700">Well done! You completed a {selectedMeditation?.name} session.</p>
            <Button onClick={() => setCurrentPhase('selection')} className="bg-green-600 text-white">
              New Session
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentPhase === 'meditation' && selectedMeditation) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-purple-100 to-blue-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-800">{selectedMeditation.name}</CardTitle>
            <div className="text-4xl font-mono text-purple-900">{formatTime(timeLeft)}</div>
            <Progress value={((selectedMeditation.duration - timeLeft) / selectedMeditation.duration) * 100} />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 animate-pulse flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setIsRunning(!isRunning)} variant="outline">
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button onClick={() => setCurrentPhase('selection')} variant="outline">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-r from-purple-100 to-indigo-100">
        <CardHeader className="text-center">
          <Sparkles className="w-10 h-10 text-purple-600 mx-auto mb-4" />
          <CardTitle className="text-3xl text-purple-800">Meditation Studio</CardTitle>
          <p className="text-purple-600">Find your inner peace with guided meditation</p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {MEDITATION_TYPES.map((meditation) => (
          <Card key={meditation.id} className="hover:border-purple-300 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <meditation.icon className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-lg">{meditation.name}</CardTitle>
              </div>
              <p className="text-sm text-gray-600">{Math.floor(meditation.duration / 60)} minutes</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Instructions:</h4>
                <ul className="space-y-1">
                  {meditation.instructions.slice(0, 2).map((instruction, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => startMeditation(meditation)} className="w-full bg-purple-600 text-white">
                <Play className="w-4 h-4 mr-2" />
                Start Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GameMeditationStudio;