
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Play, Pause, Volume2, Volume, VolumeX, 
  Moon, Brain, Heart, Music, Leaf, Cloud, 
  Headphones, SkipBack, SkipForward, Sparkles,
  BadgeInfo, WavesIcon, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const beatCategories = [
  {
    id: "chakra",
    name: "Chakra Balancing",
    icon: Brain,
    color: "from-purple-600 to-indigo-600",
    description: "Harmonize your energy centers with specific frequencies for each chakra.",
    tracks: [
      { id: "root", name: "Root Chakra (396 Hz)", frequency: 396, duration: 20 },
      { id: "sacral", name: "Sacral Chakra (417 Hz)", frequency: 417, duration: 20 },
      { id: "solar", name: "Solar Plexus (528 Hz)", frequency: 528, duration: 20 },
      { id: "heart", name: "Heart Chakra (639 Hz)", frequency: 639, duration: 20 },
      { id: "throat", name: "Throat Chakra (741 Hz)", frequency: 741, duration: 20 },
      { id: "third-eye", name: "Third Eye (852 Hz)", frequency: 852, duration: 20 },
      { id: "crown", name: "Crown Chakra (963 Hz)", frequency: 963, duration: 20 },
    ]
  },
  {
    id: "stress",
    name: "Stress Relief",
    icon: Leaf,
    color: "from-green-500 to-emerald-400",
    description: "Calm your mind and release tension with these soothing frequencies.",
    tracks: [
      { id: "calm-mind", name: "Calm Mind (432 Hz)", frequency: 432, duration: 30 },
      { id: "anxiety-relief", name: "Anxiety Relief (63 Hz)", frequency: 63, duration: 25 },
      { id: "deep-relaxation", name: "Deep Relaxation (8 Hz)", frequency: 8, duration: 30 },
      { id: "stress-release", name: "Stress Release (174 Hz)", frequency: 174, duration: 25 },
    ]
  },
  {
    id: "sleep",
    name: "Sleep & Relaxation",
    icon: Moon,
    color: "from-blue-600 to-indigo-700",
    description: "Achieve deeper, more restorative sleep with these gentle frequencies.",
    tracks: [
      { id: "deep-sleep", name: "Deep Sleep (3 Hz)", frequency: 3, duration: 480 }, // 8 hours
      { id: "gentle-sleep", name: "Gentle Sleep (6 Hz)", frequency: 6, duration: 480 }, // 8 hours
      { id: "bedtime-relaxation", name: "Bedtime Relaxation (4 Hz)", frequency: 4, duration: 60 },
      { id: "night-calm", name: "Night Calm (2 Hz)", frequency: 2, duration: 480 }, // 8 hours
    ]
  },
  {
    id: "meditation",
    name: "Meditation",
    icon: Cloud,
    color: "from-cyan-500 to-blue-500",
    description: "Enhance your meditation practice with frequencies that promote mindfulness.",
    tracks: [
      { id: "mindfulness", name: "Mindfulness (7.83 Hz)", frequency: 7.83, duration: 30 },
      { id: "theta-meditation", name: "Theta Meditation (6 Hz)", frequency: 6, duration: 45 },
      { id: "zen-focus", name: "Zen Focus (10 Hz)", frequency: 10, duration: 40 },
      { id: "transcendental", name: "Transcendental (7 Hz)", frequency: 7, duration: 60 },
    ]
  },
  {
    id: "depression",
    name: "Depression Relief",
    icon: Heart,
    color: "from-pink-500 to-rose-400",
    description: "Lift your mood and promote emotional balance with these uplifting frequencies.",
    tracks: [
      { id: "mood-lift", name: "Mood Lift (10 Hz)", frequency: 10, duration: 30 },
      { id: "happiness-boost", name: "Happiness Boost (8.4 Hz)", frequency: 8.4, duration: 25 },
      { id: "joy-inducer", name: "Joy Inducer (7.5 Hz)", frequency: 7.5, duration: 30 },
      { id: "serotonin-boost", name: "Serotonin Boost (10.5 Hz)", frequency: 10.5, duration: 25 },
    ]
  }
];

const BinauralBeats: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const trackParam = searchParams.get("track");
  
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || "chakra");
  const [activeTrack, setActiveTrack] = useState<string>(trackParam || "root");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    setSearchParams({ category: activeCategory, track: activeTrack });
  }, [activeCategory, activeTrack, setSearchParams]);

  const getCurrentCategory = () => beatCategories.find(cat => cat.id === activeCategory) || beatCategories[0];
  const getCurrentTrack = () => {
    const category = getCurrentCategory();
    return category.tracks.find(track => track.id === activeTrack) || category.tracks[0];
  };

  const setupAudio = () => {
    cleanup();

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const track = getCurrentTrack();
    const baseFrequency = track.frequency;
    const beatFrequency = 5;

    const leftOscillator = audioContext.createOscillator();
    const rightOscillator = audioContext.createOscillator();
    
    leftOscillator.type = 'sine';
    rightOscillator.type = 'sine';
    
    leftOscillator.frequency.value = baseFrequency;
    rightOscillator.frequency.value = baseFrequency + beatFrequency;
    
    leftOscillatorRef.current = leftOscillator;
    rightOscillatorRef.current = rightOscillator;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume / 100;
    gainNodeRef.current = gainNode;
    
    const leftPanner = audioContext.createStereoPanner();
    leftPanner.pan.value = -1;
    
    const rightPanner = audioContext.createStereoPanner();
    rightPanner.pan.value = 1;
    
    leftOscillator.connect(leftPanner);
    rightOscillator.connect(rightPanner);
    
    leftPanner.connect(gainNode);
    rightPanner.connect(gainNode);
    
    gainNode.connect(audioContext.destination);
    
    leftOscillator.start();
    rightOscillator.start();
    
    startTimeRef.current = audioContext.currentTime;
    setDuration(track.duration * 60);
    
    updateTime();
  };

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (leftOscillatorRef.current) {
      try {
        leftOscillatorRef.current.stop();
        leftOscillatorRef.current.disconnect();
      } catch (e) {
        console.log("Error stopping left oscillator", e);
      }
    }
    
    if (rightOscillatorRef.current) {
      try {
        rightOscillatorRef.current.stop();
        rightOscillatorRef.current.disconnect();
      } catch (e) {
        console.log("Error stopping right oscillator", e);
      }
    }
    
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {
        console.log("Error closing audio context", e);
      }
    }
    
    leftOscillatorRef.current = null;
    rightOscillatorRef.current = null;
    gainNodeRef.current = null;
    audioContextRef.current = null;
  };

  const updateTime = () => {
    if (!audioContextRef.current || !isPlaying) return;
    
    const currentTime = audioContextRef.current.currentTime - startTimeRef.current;
    setCurrentTime(currentTime);
    
    if (currentTime >= duration) {
      handleStop();
      return;
    }
    
    animationFrameRef.current = requestAnimationFrame(updateTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.suspend();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.resume();
        updateTime();
      } else {
        setupAudio();
      }
      
      const track = getCurrentTrack();
      toast({
        title: "Now Playing",
        description: `${track.name} - ${getCurrentCategory().name}`,
        duration: 3000,
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    cleanup();
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    
    const category = beatCategories.find(cat => cat.id === categoryId);
    if (!category) return;
    
    setActiveCategory(categoryId);
    setActiveTrack(category.tracks[0].id);
    
    if (isPlaying) {
      handleStop();
      setTimeout(() => {
        setIsPlaying(true);
        setupAudio();
      }, 100);
    }
  };

  const handleTrackChange = (trackId: string) => {
    if (trackId === activeTrack) return;
    
    setActiveTrack(trackId);
    
    if (isPlaying) {
      handleStop();
      setTimeout(() => {
        setIsPlaying(true);
        setupAudio();
      }, 100);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume / 100;
    }
  };

  const handleMuteToggle = () => {
    if (gainNodeRef.current) {
      if (isMuted) {
        gainNodeRef.current.gain.value = volume / 100;
      } else {
        gainNodeRef.current.gain.value = 0;
      }
    }
    
    setIsMuted(!isMuted);
  };

  const handlePreviousTrack = () => {
    const category = getCurrentCategory();
    const currentIndex = category.tracks.findIndex(track => track.id === activeTrack);
    const newIndex = currentIndex <= 0 ? category.tracks.length - 1 : currentIndex - 1;
    handleTrackChange(category.tracks[newIndex].id);
  };

  const handleNextTrack = () => {
    const category = getCurrentCategory();
    const currentIndex = category.tracks.findIndex(track => track.id === activeTrack);
    const newIndex = currentIndex >= category.tracks.length - 1 ? 0 : currentIndex + 1;
    handleTrackChange(category.tracks[newIndex].id);
  };

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const currentCategory = getCurrentCategory();
  const currentTrack = getCurrentTrack();

  return (
    <Page title="Binaural Beats Therapy">
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <WavesIcon className="h-10 w-10 text-cyan-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">Binaural Beats Therapy</h1>
              <WavesIcon className="h-10 w-10 text-teal-400" />
            </div>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto text-lg">
              Experience the healing power of binaural beats to reduce stress, improve focus, enhance meditation, and promote better sleep.
            </p>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10"
              onClick={() => setShowInfo(!showInfo)}
            >
              <BadgeInfo className="h-4 w-4 mr-2" />
              {showInfo ? "Hide Information" : "What are Binaural Beats?"}
            </Button>
          </div>
          
          {showInfo && (
            <div className="max-w-4xl mx-auto mb-12 bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-cyan-400" />
                    <span>What are Binaural Beats?</span>
                  </h2>
                  <p className="mb-4 text-gray-300">
                    Binaural beats occur when two slightly different frequencies are played separately to each ear,
                    causing the brain to perceive a third "beat" frequency equal to the difference between the two tones.
                  </p>
                  <p className="text-gray-300">
                    For example, if a 420 Hz tone is played in your left ear and a 430 Hz tone in your right ear,
                    your brain perceives a 10 Hz binaural beat. This can help induce specific brainwave states
                    associated with relaxation, focus, creativity, or sleep.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Headphones className="h-5 w-5 text-cyan-400" />
                    <span>How to Use</span>
                  </h2>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <Headphones className="h-5 w-5 mr-2 text-cyan-400 mt-0.5" />
                      <span>Use stereo headphones for the best experience</span>
                    </li>
                    <li className="flex items-start">
                      <Moon className="h-5 w-5 mr-2 text-cyan-400 mt-0.5" />
                      <span>Find a quiet, comfortable place with minimal distractions</span>
                    </li>
                    <li className="flex items-start">
                      <Brain className="h-5 w-5 mr-2 text-cyan-400 mt-0.5" />
                      <span>Start with short sessions (15-30 minutes) and gradually increase duration</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="h-5 w-5 mr-2 text-cyan-400 mt-0.5" />
                      <span>Be consistent for best results - regular practice enhances benefits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {beatCategories.map((category) => {
              const Icon = category.icon;
              const isActive = category.id === activeCategory;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "rounded-2xl p-6 transition-all duration-500 flex flex-col items-center justify-center text-center h-40 shadow-xl group",
                    isActive 
                      ? `bg-gradient-to-br ${category.color} text-white border-2 border-white/50` 
                      : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl"
                  )}
                >
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500",
                    isActive ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
                  )}>
                    <Icon className={cn(
                      "h-8 w-8 transition-all", 
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    )} />
                  </div>
                  <h3 className={cn(
                    "font-medium text-lg transition-all",
                    isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                  )}>
                    {category.name}
                  </h3>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-white/30"></div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10 mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-40 pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                `bg-gradient-to-br ${currentCategory.color}`
              )}>
                {React.createElement(currentCategory.icon, { className: "h-4 w-4 text-white" })}
              </div>
              <span>{currentCategory.name} Tracks</span>
            </h2>
            
            <p className="text-gray-300 mb-6 text-lg">{currentCategory.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentCategory.tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackChange(track.id)}
                  className={cn(
                    "p-5 rounded-xl transition-all duration-300 text-left hover:scale-[1.02] relative overflow-hidden",
                    track.id === activeTrack
                      ? `bg-gradient-to-r ${currentCategory.color} text-white`
                      : "bg-white/5 hover:bg-white/10 text-gray-200"
                  )}
                >
                  {track.id === activeTrack && (
                    <div className="absolute right-2 top-2">
                      <Sparkles className="h-4 w-4 text-white/70 animate-pulse" />
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                      track.id === activeTrack ? "bg-white/20" : "bg-white/10"
                    )}>
                      <Music className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-base">{track.name}</h3>
                      <p className="text-sm opacity-80">{track.duration} min</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className={`bg-gradient-to-r ${currentCategory.color} rounded-2xl p-10 shadow-2xl relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            
            {/* Animated waves background */}
            <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-24 bg-white/10 transform -skew-y-3 animate-float" style={{animationDuration: '10s'}}></div>
              <div className="absolute top-20 left-0 right-0 h-16 bg-white/5 transform skew-y-3 animate-float" style={{animationDuration: '13s', animationDelay: '1s'}}></div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/10 transform -skew-y-3 animate-float" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
            </div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center mb-6 shadow-xl relative group animate-float" style={{animationDuration: '6s'}}>
                <Headphones className="h-16 w-16 text-white" />
                
                {isPlaying && (
                  <>
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" style={{animationDuration: '2s'}}></div>
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" style={{animationDuration: '3s'}}></div>
                  </>
                )}
              </div>
              
              <h3 className="text-3xl font-bold mb-2 text-white">{currentTrack.name}</h3>
              <p className="text-lg opacity-90 mb-8 font-light">{currentCategory.name}</p>
              
              <div className="w-full max-w-md mb-6 bg-white/10 backdrop-blur-sm rounded-full p-4">
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white animate-pulse"
                    style={{ width: `${(currentTime / duration) * 100}%`, animationDuration: '2s' }}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-10">
                <Button 
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white w-12 h-12 shadow-lg transition-all duration-300 hover:scale-110"
                  onClick={handlePreviousTrack}
                >
                  <SkipBack className="h-6 w-6" />
                </Button>
                
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full w-20 h-20 bg-white/20 hover:bg-white/30 text-white shadow-xl transition-all duration-300 hover:scale-110"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-10 w-10" />
                  ) : (
                    <Play className="h-10 w-10 ml-1" />
                  )}
                </Button>
                
                <Button 
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white w-12 h-12 shadow-lg transition-all duration-300 hover:scale-110"
                  onClick={handleNextTrack}
                >
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 w-full max-w-xs">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white h-10 w-10 shadow-lg transition-all duration-300 hover:scale-110"
                  onClick={handleMuteToggle}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : volume > 50 ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <Volume className="h-5 w-5" />
                  )}
                </Button>
                
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BinauralBeats;
