
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Volume2, Clock, Moon, Brain, Sun, Zap, Heart, Sparkles } from "lucide-react";
import Page from "@/components/Page";
import { useToast } from "@/hooks/use-toast";

interface BinauralBeat {
  id: string;
  title: string;
  description: string;
  frequency: number;
  duration: number;
  category: "sleep" | "focus" | "meditation" | "healing" | "energy";
  icon: React.ElementType;
}

const BinauralBeats: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [selectedBeat, setSelectedBeat] = useState<BinauralBeat | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const binauralBeats: BinauralBeat[] = [
    {
      id: "delta-sleep",
      title: "Delta Sleep Waves",
      description: "1-4 Hz frequencies to promote deep, restorative sleep and healing",
      frequency: 2.5,
      duration: 480, // 8 hours in seconds
      category: "sleep",
      icon: Moon
    },
    {
      id: "theta-meditation",
      title: "Theta Meditation",
      description: "4-8 Hz to enhance meditation, creativity, and relaxation",
      frequency: 6.0,
      duration: 30 * 60, // 30 minutes
      category: "meditation",
      icon: Sparkles
    },
    {
      id: "alpha-relax",
      title: "Alpha Relaxation",
      description: "8-14 Hz to promote relaxed alertness and reduce anxiety",
      frequency: 10.5,
      duration: 20 * 60, // 20 minutes
      category: "meditation",
      icon: Heart
    },
    {
      id: "beta-focus",
      title: "Beta Focus",
      description: "14-30 Hz to enhance concentration, focus, and cognitive processing",
      frequency: 18.0,
      duration: 45 * 60, // 45 minutes
      category: "focus",
      icon: Brain
    },
    {
      id: "gamma-insight",
      title: "Gamma Insight",
      description: "30-100 Hz to promote heightened perception, insight, and mental clarity",
      frequency: 40.0,
      duration: 20 * 60, // 20 minutes
      category: "focus",
      icon: Zap
    },
    {
      id: "healing-432hz",
      title: "Healing 432 Hz",
      description: "Resonates with the universe's natural frequency to promote healing",
      frequency: 432,
      duration: 60 * 60, // 60 minutes
      category: "healing",
      icon: Heart
    },
    {
      id: "morning-energy",
      title: "Morning Energy",
      description: "Energizing frequencies to wake up your mind and body",
      frequency: 20.0,
      duration: 15 * 60, // 15 minutes
      category: "energy",
      icon: Sun
    }
  ];

  const handlePlayPause = () => {
    if (selectedBeat) {
      setIsPlaying(!isPlaying);
      
      // In a real app, we would actually play the binaural beat here
      // For now, we'll just show a toast message
      toast({
        title: !isPlaying ? "Now Playing" : "Paused",
        description: !isPlaying 
          ? `Playing ${selectedBeat.title} at ${selectedBeat.frequency} Hz` 
          : `${selectedBeat.title} paused`,
        duration: 2000
      });
    } else {
      toast({
        title: "No Beat Selected",
        description: "Please select a binaural beat first",
        variant: "destructive",
        duration: 2000
      });
    }
  };

  const handleBeatSelect = (beat: BinauralBeat) => {
    setSelectedBeat(beat);
    setCurrentTime(0);
    setIsPlaying(false);
    
    toast({
      title: "Beat Selected",
      description: `${beat.title} ready to play`,
      duration: 2000
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  // Group beats by category
  const beatsByCategory = binauralBeats.reduce((acc, beat) => {
    if (!acc[beat.category]) {
      acc[beat.category] = [];
    }
    acc[beat.category].push(beat);
    return acc;
  }, {} as Record<string, BinauralBeat[]>);

  return (
    <Page title="Binaural Beats">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-2">
            Binaural <span className="text-indigo-400">Beats</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Binaural beats are auditory processing artifacts that can help induce relaxation, 
            meditation, creativity, and other desirable mental states.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="sleep" className="w-full">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="sleep" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" /> Sleep
                </TabsTrigger>
                <TabsTrigger value="focus" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" /> Focus
                </TabsTrigger>
                <TabsTrigger value="meditation" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Meditation
                </TabsTrigger>
                <TabsTrigger value="healing" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Healing
                </TabsTrigger>
                <TabsTrigger value="energy" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" /> Energy
                </TabsTrigger>
              </TabsList>

              {["sleep", "focus", "meditation", "healing", "energy"].map(category => (
                <TabsContent key={category} value={category} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {beatsByCategory[category]?.map(beat => (
                      <Card 
                        key={beat.id} 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedBeat?.id === beat.id ? 'border-indigo-500 bg-indigo-900/10' : 'bg-white/5'
                        }`}
                        onClick={() => handleBeatSelect(beat)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <beat.icon className="h-5 w-5 text-indigo-400" />
                            {beat.title}
                          </CardTitle>
                          <CardDescription>{beat.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between text-sm">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" /> {formatTime(beat.duration)}
                            </span>
                            <span className="flex items-center">
                              {beat.frequency} Hz
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-4 backdrop-blur-sm bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg">Now Playing</CardTitle>
                <CardDescription>
                  {selectedBeat ? (
                    <span className="text-indigo-400 font-medium">{selectedBeat.title}</span>
                  ) : (
                    <span className="text-gray-400">Select a binaural beat</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center h-40 bg-gradient-to-r from-indigo-800/20 via-purple-800/20 to-indigo-800/20 rounded-lg">
                  {selectedBeat ? (
                    <div className="text-center">
                      <selectedBeat.icon className="h-12 w-12 mx-auto text-indigo-400 mb-4" />
                      <p className="text-indigo-300">{selectedBeat.frequency} Hz</p>
                      <p className="text-gray-400 text-sm mt-2">Duration: {formatTime(selectedBeat.duration)}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400">No beat selected</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className={`rounded-full w-14 h-14 flex items-center justify-center ${
                        isPlaying ? 'bg-indigo-800/50 text-white border-indigo-500' : 'bg-white/10'
                      }`}
                      onClick={handlePlayPause}
                      disabled={!selectedBeat}
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Volume2 className="h-4 w-4 mr-2 text-gray-400" />
                      <Slider
                        value={[volume]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                        className="flex-1"
                      />
                      <span className="ml-2 text-xs text-gray-400 w-8">{volume}%</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-2">Tips:</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Use headphones for best results</li>
                      <li>• Find a quiet, comfortable space</li>
                      <li>• Start with 15-20 minute sessions</li>
                      <li>• Consistent practice enhances benefits</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-indigo-900/20 rounded-xl">
          <h2 className="text-2xl font-medium mb-4 text-indigo-300">The Science Behind Binaural Beats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                Binaural beats occur when two slightly different frequencies are played separately into each ear. 
                Your brain perceives a third "beat" frequency, which is the mathematical difference between the two frequencies.
              </p>
              <p className="text-gray-300 mb-4">
                For example, if a 200 Hz tone is played in your right ear and a 210 Hz tone in your left ear, 
                your brain perceives a 10 Hz binaural beat, which can promote alpha brainwave states associated with relaxation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3 text-indigo-300">Brainwave Frequencies</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <Moon className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <span className="font-medium">Delta (1-4 Hz):</span> Deep sleep, healing
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <span className="font-medium">Theta (4-8 Hz):</span> Meditation, creativity
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <span className="font-medium">Alpha (8-14 Hz):</span> Relaxation, calmness
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Brain className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <span className="font-medium">Beta (14-30 Hz):</span> Focus, alertness
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <span className="font-medium">Gamma (30-100 Hz):</span> Higher mental activity
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BinauralBeats;
