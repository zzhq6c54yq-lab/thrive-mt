
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Play, Pause, SkipForward, SkipBack, VolumeX, Volume1, Volume2, ChevronUp, ChevronDown } from "lucide-react";

interface BinauralBeatPlayerProps {
  track: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    audioUrl: string;
    baseFrequency: number;
    targetFrequency: number;
    duration: string;
    category: string;
  } | null;
  onNext: () => void;
  onPrevious: () => void;
}

const BinauralBeatPlayer: React.FC<BinauralBeatPlayerProps> = ({ track, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!track) return;
    
    // Create audio context for binaural beat generation
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Set up oscillators for binaural beat
    const leftOscillator = audioContext.createOscillator();
    const rightOscillator = audioContext.createOscillator();
    const leftGain = audioContext.createGain();
    const rightGain = audioContext.createGain();
    const merger = audioContext.createChannelMerger(2);
    
    // Set frequencies
    leftOscillator.frequency.value = track.baseFrequency;
    rightOscillator.frequency.value = track.targetFrequency;
    
    // Connect nodes
    leftOscillator.connect(leftGain);
    rightOscillator.connect(rightGain);
    leftGain.connect(merger, 0, 0);
    rightGain.connect(merger, 0, 1);
    merger.connect(audioContext.destination);
    
    // Set gain values based on volume
    leftGain.gain.value = volume / 100;
    rightGain.gain.value = volume / 100;
    
    if (isPlaying) {
      leftOscillator.start();
      rightOscillator.start();
      
      // Set a dummy duration for demonstration
      const durationInSeconds = parseInt(track.duration.split(":")[0]) * 60 + parseInt(track.duration.split(":")[1]);
      setDuration(durationInSeconds);
      
      // Start a timer to update currentTime
      const timer = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= durationInSeconds) {
            clearInterval(timer);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(timer);
        leftOscillator.stop();
        rightOscillator.stop();
        audioContext.close();
      };
    }
    
    return () => {
      audioContext.close();
    };
  }, [track, isPlaying, volume]);
  
  const togglePlay = () => {
    if (!track) return;
    setIsPlaying(!isPlaying);
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
  };
  
  const handleSeek = (value: number[]) => {
    if (!track) return;
    setCurrentTime(value[0]);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  if (!track) return null;
  
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-indigo-900 rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-20 md:h-24">
        <img 
          src={track.imageUrl} 
          alt={track.title} 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        
        <div className="absolute inset-0 flex items-center p-4">
          <div className="flex items-center space-x-4 w-full">
            <div className="flex-shrink-0">
              <Button
                onClick={togglePlay}
                className="h-12 w-12 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </Button>
            </div>
            
            <div className="flex-grow space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">{track.title}</h3>
                <span className="text-xs text-gray-300">{track.category}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex-grow">
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-300 w-10 text-right">
                  {formatTime(currentTime)} / {track.duration}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={onPrevious}
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-300 hover:text-white"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={onNext}
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-300 hover:text-white"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className={cn(
          "bg-gray-900 transition-all duration-300 ease-in-out",
          showDetails ? "max-h-96 py-4" : "max-h-0"
        )}
      >
        {showDetails && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-white text-sm font-medium mb-1">Binaural Frequencies</h4>
                <p className="text-gray-400 text-xs">
                  Left: {track.baseFrequency} Hz | Right: {track.targetFrequency} Hz | 
                  Difference: {track.targetFrequency - track.baseFrequency} Hz
                </p>
              </div>
              
              <div className="flex items-center">
                {volume === 0 ? (
                  <VolumeX className="h-4 w-4 text-gray-400 mr-2" />
                ) : volume < 50 ? (
                  <Volume1 className="h-4 w-4 text-gray-400 mr-2" />
                ) : (
                  <Volume2 className="h-4 w-4 text-gray-400 mr-2" />
                )}
                <Slider
                  value={[volume]}
                  min={0}
                  max={100}
                  step={1}
                  className="w-24"
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-white text-sm font-medium mb-1">About This Track</h4>
              <p className="text-gray-400 text-sm">{track.description}</p>
            </div>
            
            <div>
              <h4 className="text-white text-sm font-medium mb-1">Best For</h4>
              <div className="flex flex-wrap gap-2">
                {track.category === "meditation" && (
                  ["Focus", "Mindfulness", "Presence", "Awareness"].map(tag => (
                    <span key={tag} className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full">{tag}</span>
                  ))
                )}
                
                {track.category === "sleep" && (
                  ["Deep Sleep", "Relaxation", "Dream Enhancement", "Insomnia"].map(tag => (
                    <span key={tag} className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded-full">{tag}</span>
                  ))
                )}
                
                {track.category === "focus" && (
                  ["Concentration", "Productivity", "Study", "Learning"].map(tag => (
                    <span key={tag} className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">{tag}</span>
                  ))
                )}
                
                {track.category === "relax" && (
                  ["Stress Relief", "Calmness", "Peace", "Tranquility"].map(tag => (
                    <span key={tag} className="text-xs bg-purple-900 text-purple-300 px-2 py-0.5 rounded-full">{tag}</span>
                  ))
                )}
                
                {track.category === "anxiety" && (
                  ["Anxiety Relief", "Panic Control", "Grounding", "Stability"].map(tag => (
                    <span key={tag} className="text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded-full">{tag}</span>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="w-full flex items-center justify-center py-1 text-gray-400 hover:text-white hover:bg-gray-800"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? (
          <>
            <ChevronUp className="h-4 w-4 mr-1" />
            Hide Details
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-1" />
            Show Details
          </>
        )}
      </Button>
    </div>
  );
};

export default BinauralBeatPlayer;
