
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, Volume2, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock playlist data
const getMoodPlaylists = (mood: string) => {
  const playlists = {
    happy: [
      { title: "Walking on Sunshine", artist: "Katrina & The Waves", duration: "3:45" },
      { title: "Happy", artist: "Pharrell Williams", duration: "3:53" },
      { title: "Good Vibrations", artist: "The Beach Boys", duration: "3:36" },
    ],
    sad: [
      { title: "Someone Like You", artist: "Adele", duration: "4:45" },
      { title: "Hurt", artist: "Johnny Cash", duration: "3:38" },
      { title: "Fix You", artist: "Coldplay", duration: "4:55" },
    ],
    neutral: [
      { title: "Weightless", artist: "Marconi Union", duration: "8:10" },
      { title: "Gymnopédie No.1", artist: "Erik Satie", duration: "3:05" },
      { title: "Watermark", artist: "Enya", duration: "2:26" },
    ],
    overwhelmed: [
      { title: "Breathe", artist: "Télépopmusik", duration: "4:40" },
      { title: "Teardrop", artist: "Massive Attack", duration: "5:30" },
      { title: "Everything In Its Right Place", artist: "Radiohead", duration: "4:11" },
    ],
    focus: [
      { title: "Brain Waves Alpha", artist: "Meditation Music", duration: "10:15" },
      { title: "Deep Focus", artist: "Study Music", duration: "8:30" },
      { title: "Concentration", artist: "Focus Lab", duration: "9:45" },
    ],
    relaxation: [
      { title: "Ocean Waves", artist: "Nature Sounds", duration: "12:20" },
      { title: "Sunset Meditation", artist: "Relaxation Masters", duration: "8:15" },
      { title: "Gentle Rain", artist: "Nature Therapy", duration: "15:30" },
    ],
    uplift: [
      { title: "Walking on Sunshine", artist: "Katrina & The Waves", duration: "3:45" },
      { title: "Happy", artist: "Pharrell Williams", duration: "3:53" },
      { title: "Dancing Queen", artist: "ABBA", duration: "3:51" },
    ],
    sleep: [
      { title: "Dream State", artist: "Sleep Sounds", duration: "45:00" },
      { title: "Night Forest", artist: "Sleep Well", duration: "60:00" },
      { title: "Lullaby", artist: "Sleep Therapy", duration: "30:00" },
    ]
  };
  
  // Return the playlist for the requested mood or a default one
  return playlists[mood as keyof typeof playlists] || playlists.neutral;
};

// Mock audio URLs
const getMockAudioUrl = (mood: string) => {
  const audioFiles: Record<string, string> = {
    happy: "https://cdn.freesound.org/previews/648/648899_13686955-lq.mp3",
    sad: "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3",
    neutral: "https://cdn.freesound.org/previews/452/452593_9098894-lq.mp3",
    overwhelmed: "https://cdn.freesound.org/previews/417/417486_5121236-lq.mp3",
    focus: "https://cdn.freesound.org/previews/571/571324_7493294-lq.mp3",
    relaxation: "https://cdn.freesound.org/previews/649/649109_5674468-lq.mp3",
    uplift: "https://cdn.freesound.org/previews/353/353925_5450487-lq.mp3",
    sleep: "https://cdn.freesound.org/previews/453/453483_9098894-lq.mp3"
  };
  
  return audioFiles[mood] || audioFiles.neutral;
};

interface MoodPlaylistGeneratorProps {
  currentMood: string;
  className?: string;
}

const MoodPlaylistGenerator: React.FC<MoodPlaylistGeneratorProps> = ({ currentMood, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [volume, setVolume] = useState<number>(80);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    // Set up audio event listeners
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };
    
    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      handleNextTrack();
    };
    
    const handleError = (e: Event) => {
      console.error("Error playing audio:", e);
      toast({
        title: "Playback Error",
        description: "There was an error playing this track. Please try another.",
        variant: "destructive",
      });
      setIsPlaying(false);
    };
    
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    
    // Clean up event listeners on unmount
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      
      // Stop audio on unmount
      audio.pause();
    };
  }, [toast]);
  
  // When currentMood changes, reset the player
  useEffect(() => {
    if (isPlaying) {
      handlePlayPause(); // Stop playing current track
    }
    setCurrentTrack(0);
  }, [currentMood]);
  
  // Update audio source when currentTrack changes
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.src = getMockAudioUrl(currentMood);
      audio.volume = volume / 100;
      
      if (isPlaying) {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Playback error:", error);
            setIsPlaying(false);
            toast({
              title: "Playback Error",
              description: "Unable to play audio automatically. Please try clicking play.",
              variant: "destructive",
            });
          });
        }
      }
    }
  }, [currentTrack, currentMood, isPlaying, volume, toast]);
  
  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Playback error:", error);
            toast({
              title: "Playback Error",
              description: "Unable to play this track. Please try another.",
              variant: "destructive",
            });
          });
      }
    }
  };
  
  const handleNextTrack = () => {
    const playlist = getMoodPlaylists(currentMood);
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
    
    // If was playing, continue playing next track
    if (isPlaying) {
      setIsPlaying(true);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const playlist = getMoodPlaylists(currentMood);
  const currentSong = playlist[currentTrack];
  
  return (
    <Card className={`p-4 bg-black/30 backdrop-blur-sm ${className}`}>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Music className="h-5 w-5 mr-2 text-primary" />
            <div>
              <p className="font-medium text-white">{currentSong.title}</p>
              <p className="text-xs text-white/70">{currentSong.artist}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-primary/20 text-primary hover:bg-primary/30"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
              onClick={handleNextTrack}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="space-y-1">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-100" 
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/70">
            <span>{formatTime(currentTime)}</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>
        
        {/* Volume control */}
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-white/70" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(values) => setVolume(values[0])}
            className="w-20 md:w-28"
          />
        </div>
        
        {/* Playlist */}
        <div className="mt-2">
          <p className="text-xs text-white/70 uppercase tracking-wider mb-2">Playlist: {currentMood}</p>
          <div className="space-y-1">
            {playlist.map((track, index) => (
              <div 
                key={index} 
                className={`text-xs p-2 rounded cursor-pointer flex justify-between items-center ${
                  index === currentTrack ? 'bg-primary/20 text-primary' : 'hover:bg-white/10'
                }`}
                onClick={() => {
                  setCurrentTrack(index);
                  setIsPlaying(true);
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 text-center">{index + 1}</span>
                  <span>{track.title}</span>
                </div>
                <span>{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MoodPlaylistGenerator;
