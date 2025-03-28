import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Play, Pause, Volume2, Volume, VolumeX, 
  Moon, Brain, Heart, Music, Leaf, Cloud, 
  Headphones, SkipBack, SkipForward, Sparkles,
  BadgeInfo, WavesIcon, Zap, Stars, SunMoon,
  Clock
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
    accent: "purple",
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
    accent: "green",
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
    accent: "blue",
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
    accent: "cyan",
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
    accent: "pink",
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

  const soundWaves = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Page title="Binaural Beats Therapy">
      <div className="min-h-screen bg-gradient-to-b from-[#0c1425] via-[#162037] to-[#1d2844] text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-indigo-500/20 mix-blend-soft-light blur-[100px] animate-float" style={{animationDuration: '25s'}}></div>
            <div className="absolute top-[40%] right-[5%] w-96 h-96 rounded-full bg-cyan-500/20 mix-blend-soft-light blur-[100px] animate-float" style={{animationDuration: '30s', animationDelay: '5s'}}></div>
            <div className="absolute bottom-[10%] left-[20%] w-80 h-80 rounded-full bg-purple-500/20 mix-blend-soft-light blur-[100px] animate-float" style={{animationDuration: '20s', animationDelay: '10s'}}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="mb-12 text-center relative">
            <div className="inline-flex justify-center items-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-binaural-cyan to-binaural-indigo blur-md opacity-70"></div>
                <div className="relative bg-[#162037] rounded-full p-3">
                  <WavesIcon className="h-10 w-10 text-binaural-cyan" />
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-binaural-blue via-binaural-cyan to-binaural-teal text-transparent bg-clip-text ml-4">Binaural Beats Therapy</h1>
            </div>
            
            <div className="max-w-3xl mx-auto mt-6 relative">
              <p className="text-gray-300 text-lg">
                Experience the healing power of binaural beats to reduce stress, improve focus, enhance meditation, and promote better sleep.
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-binaural-cyan to-transparent rounded-full"></div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-8 text-binaural-cyan border-binaural-cyan/50 hover:bg-binaural-cyan/10 group relative overflow-hidden"
              onClick={() => setShowInfo(!showInfo)}
            >
              <div className="absolute inset-0 w-full h-full bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
              <BadgeInfo className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">{showInfo ? "Hide Information" : "What are Binaural Beats?"}</span>
            </Button>
          </div>
          
          {showInfo && (
            <div className="max-w-4xl mx-auto mb-12 bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/10 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-binaural-purple/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-binaural-blue/10 rounded-full blur-3xl -z-10"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-binaural-purple to-binaural-indigo flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
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
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-binaural-cyan to-binaural-teal flex items-center justify-center">
                      <Headphones className="h-4 w-4 text-white" />
                    </div>
                    <span>How to Use</span>
                  </h2>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <Headphones className="h-5 w-5 mr-2 text-binaural-cyan mt-0.5" />
                      <span>Use stereo headphones for the best experience</span>
                    </li>
                    <li className="flex items-start">
                      <Moon className="h-5 w-5 mr-2 text-binaural-cyan mt-0.5" />
                      <span>Find a quiet, comfortable place with minimal distractions</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-binaural-cyan mt-0.5" />
                      <span>Start with short sessions (15-30 minutes) and gradually increase duration</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="h-5 w-5 mr-2 text-binaural-cyan mt-0.5" />
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
                    "rounded-2xl p-6 transition-all duration-500 flex flex-col items-center justify-center text-center h-40 shadow-xl group relative overflow-hidden",
                    isActive 
                      ? `bg-gradient-to-br ${category.color} text-white border-2 border-white/50` 
                      : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl"
                  )}
                >
                  {isActive && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="animate-ripple absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="animate-ripple absolute inline-flex h-full w-full rounded-full bg-white opacity-75" style={{animationDelay: '0.5s'}}></span>
                      </div>
                    </div>
                  )}
                  
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 relative overflow-hidden",
                    isActive ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
                  )}>
                    <Icon className={cn(
                      "h-8 w-8 transition-all", 
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    )} />
                    
                    <div className={cn(
                      "absolute inset-0 rounded-full transition-opacity",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                      <span className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring"></span>
                    </div>
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
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-binaural-${currentCategory.accent} to-transparent`}></div>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center relative",
                `bg-gradient-to-br ${currentCategory.color}`
              )}>
                {React.createElement(currentCategory.icon, { className: "h-5 w-5 text-white" })}
                <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse opacity-60"></div>
              </div>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {currentCategory.name} Tracks
              </span>
            </h2>
            
            <p className="text-gray-300 mb-8 text-lg max-w-3xl">{currentCategory.description}</p>
            
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
                    <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-wave"></div>
                  )}
                  
                  <div className="flex items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-3 relative",
                      track.id === activeTrack ? "bg-white/20" : "bg-white/10"
                    )}>
                      <Music className="h-5 w-5" />
                      
                      {track.id === activeTrack && (
                        <div className="absolute inset-0">
                          <span className="absolute inset-0 rounded-full bg-white/40 animate-pulse-ring"></span>
                        </div>
                      )}
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
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
            
            <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center overflow-hidden">
              <div className="flex items-end space-x-1 h-full">
                {soundWaves.map((wave) => (
                  <div 
                    key={wave}
                    className={cn(
                      "w-2 bg-white/30 rounded-t-full",
                      isPlaying ? "animate-pulse" : "h-1"
                    )}
                    style={{ 
                      height: isPlaying ? `${Math.sin(wave / (soundWaves.length / Math.PI)) * 50 + 20}%` : '10%',
                      animationDuration: `${0.7 + (wave / 10)}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center mb-8 shadow-xl relative group animate-float" style={{animationDuration: '6s'}}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse"></div>
                <Headphones className="h-16 w-16 text-white" />
                
                {isPlaying && (
                  <>
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" style={{animationDuration: '2.5s'}}></div>
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" style={{animationDuration: '3.5s'}}></div>
                  </>
                )}
              </div>
              
              <h3 className="text-3xl font-bold mb-2 text-white flex items-center gap-2">
                <Stars className="h-5 w-5 animate-pulse" style={{animationDuration: '3s'}} />
                <span>{currentTrack.name}</span>
                <Stars className="h-5 w-5 animate-pulse" style={{animationDuration: '3s', animationDelay: '1.5s'}} />
              </h3>
              <p className="text-lg opacity-90 mb-8 font-light">{currentCategory.name}</p>
              
              <div className="w-full max-w-md mb-6 bg-white/10 backdrop-blur-sm rounded-full p-4">
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white/80 rounded-full transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-10">
                <Button 
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white w-12 h-12 shadow-lg transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                  onClick={handlePreviousTrack}
                >
                  <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full"></div>
                  <SkipBack className="h-6 w-6 relative z-10" />
                </Button>
                
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full w-20 h-20 bg-white/20 hover:bg-white/30 text-white shadow-xl transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                  onClick={handlePlayPause}
                >
                  <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full"></div>
                  <div className="relative z-10">
                    {isPlaying ? (
                      <Pause className="h-10 w-10" />
                    ) : (
                      <Play className="h-10 w-10 ml-1" />
                    )}
                  </div>
                  {isPlaying && (
                    <div className="absolute inset-0 rounded-full">
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-dot"></div>
                    </div>
                  )}
                </Button>
                
                <Button 
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white w-12 h-12 shadow-lg transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                  onClick={handleNextTrack}
                >
                  <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full"></div>
                  <SkipForward className="h-6 w-6 relative z-10" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 w-full max-w-xs">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white h-10 w-10 shadow-lg transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                  onClick={handleMuteToggle}
                >
                  <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full"></div>
                  <div className="relative z-10">
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : volume > 50 ? (
                      <Volume2 className="h-5 w-5" />
                    ) : (
                      <Volume className="h-5 w-5" />
                    )}
                  </div>
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
