
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Music, Play, Pause, SkipForward, Volume2, RefreshCcw } from "lucide-react";

interface Song {
  title: string;
  artist: string;
  duration: string;
  mood: string;
  audioSrc?: string; // Add source for audio files
}

interface MoodPlaylistGeneratorProps {
  currentMood?: string;
  className?: string;
}

const MoodPlaylistGenerator: React.FC<MoodPlaylistGeneratorProps> = ({
  currentMood = "neutral",
  className = "",
}) => {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Create audio element
  useEffect(() => {
    audioRef.current = new Audio();
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Song database categorized by mood with audio sources
  const songDatabase: Record<string, Song[]> = {
    happy: [
      { title: "Happy", artist: "Pharrell Williams", duration: "3:53", mood: "happy", audioSrc: "https://dl.dropbox.com/scl/fi/rpqr2g0l1bhq3nrq0kw8q/happy-mood.mp3?rlkey=viwkf7pj9q1h4rsg0tpxnycga" },
      { title: "Good as Hell", artist: "Lizzo", duration: "2:39", mood: "happy", audioSrc: "https://dl.dropbox.com/scl/fi/rpqr2g0l1bhq3nrq0kw8q/happy-mood.mp3?rlkey=viwkf7pj9q1h4rsg0tpxnycga" },
      { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", duration: "3:56", mood: "happy", audioSrc: "https://dl.dropbox.com/scl/fi/rpqr2g0l1bhq3nrq0kw8q/happy-mood.mp3?rlkey=viwkf7pj9q1h4rsg0tpxnycga" },
      { title: "Walking on Sunshine", artist: "Katrina & The Waves", duration: "3:58", mood: "happy", audioSrc: "https://dl.dropbox.com/scl/fi/rpqr2g0l1bhq3nrq0kw8q/happy-mood.mp3?rlkey=viwkf7pj9q1h4rsg0tpxnycga" },
      { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30", mood: "happy", audioSrc: "https://dl.dropbox.com/scl/fi/rpqr2g0l1bhq3nrq0kw8q/happy-mood.mp3?rlkey=viwkf7pj9q1h4rsg0tpxnycga" },
    ],
    sad: [
      { title: "Someone Like You", artist: "Adele", duration: "4:45", mood: "sad", audioSrc: "https://dl.dropbox.com/scl/fi/8j4zylcfhfvu8csrp3vqg/sad-mood.mp3?rlkey=cz5j67qnbnwsaakq2zyjtj7c1" },
      { title: "Fix You", artist: "Coldplay", duration: "4:55", mood: "sad", audioSrc: "https://dl.dropbox.com/scl/fi/8j4zylcfhfvu8csrp3vqg/sad-mood.mp3?rlkey=cz5j67qnbnwsaakq2zyjtj7c1" },
      { title: "Hurt", artist: "Johnny Cash", duration: "3:38", mood: "sad", audioSrc: "https://dl.dropbox.com/scl/fi/8j4zylcfhfvu8csrp3vqg/sad-mood.mp3?rlkey=cz5j67qnbnwsaakq2zyjtj7c1" },
      { title: "Everybody Hurts", artist: "R.E.M.", duration: "5:17", mood: "sad", audioSrc: "https://dl.dropbox.com/scl/fi/8j4zylcfhfvu8csrp3vqg/sad-mood.mp3?rlkey=cz5j67qnbnwsaakq2zyjtj7c1" },
      { title: "Nothing Compares 2 U", artist: "Sinéad O'Connor", duration: "5:07", mood: "sad", audioSrc: "https://dl.dropbox.com/scl/fi/8j4zylcfhfvu8csrp3vqg/sad-mood.mp3?rlkey=cz5j67qnbnwsaakq2zyjtj7c1" },
    ],
    neutral: [
      { title: "Here Comes the Sun", artist: "The Beatles", duration: "3:05", mood: "neutral", audioSrc: "https://dl.dropbox.com/scl/fi/7vcukd1oiy4ogn2lf5psh/neutral-mood.mp3?rlkey=pwlilpzlsqlpvgvb2e1u2c1h1" },
      { title: "Landslide", artist: "Fleetwood Mac", duration: "3:19", mood: "neutral", audioSrc: "https://dl.dropbox.com/scl/fi/7vcukd1oiy4ogn2lf5psh/neutral-mood.mp3?rlkey=pwlilpzlsqlpvgvb2e1u2c1h1" },
      { title: "Weightless", artist: "Marconi Union", duration: "8:10", mood: "neutral", audioSrc: "https://dl.dropbox.com/scl/fi/7vcukd1oiy4ogn2lf5psh/neutral-mood.mp3?rlkey=pwlilpzlsqlpvgvb2e1u2c1h1" },
      { title: "Clocks", artist: "Coldplay", duration: "5:07", mood: "neutral", audioSrc: "https://dl.dropbox.com/scl/fi/7vcukd1oiy4ogn2lf5psh/neutral-mood.mp3?rlkey=pwlilpzlsqlpvgvb2e1u2c1h1" },
      { title: "Strawberry Fields Forever", artist: "The Beatles", duration: "4:10", mood: "neutral", audioSrc: "https://dl.dropbox.com/scl/fi/7vcukd1oiy4ogn2lf5psh/neutral-mood.mp3?rlkey=pwlilpzlsqlpvgvb2e1u2c1h1" },
    ],
    anxious: [
      { title: "Breathe Me", artist: "Sia", duration: "4:31", mood: "anxious", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Unsteady", artist: "X Ambassadors", duration: "3:14", mood: "anxious", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Breathin", artist: "Ariana Grande", duration: "3:18", mood: "anxious", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Head Above Water", artist: "Avril Lavigne", duration: "3:42", mood: "anxious", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Rise Up", artist: "Andra Day", duration: "4:13", mood: "anxious", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
    ],
    energetic: [
      { title: "Eye of the Tiger", artist: "Survivor", duration: "4:05", mood: "energetic", audioSrc: "https://dl.dropbox.com/scl/fi/ujppn5qhnl8euxb6a4trv/energetic-mood.mp3?rlkey=w0njuimxqxhqj644vwuvf3goy" },
      { title: "Don't Stop Me Now", artist: "Queen", duration: "3:29", mood: "energetic", audioSrc: "https://dl.dropbox.com/scl/fi/ujppn5qhnl8euxb6a4trv/energetic-mood.mp3?rlkey=w0njuimxqxhqj644vwuvf3goy" },
      { title: "Till I Collapse", artist: "Eminem", duration: "4:57", mood: "energetic", audioSrc: "https://dl.dropbox.com/scl/fi/ujppn5qhnl8euxb6a4trv/energetic-mood.mp3?rlkey=w0njuimxqxhqj644vwuvf3goy" },
      { title: "Stronger", artist: "Kanye West", duration: "5:12", mood: "energetic", audioSrc: "https://dl.dropbox.com/scl/fi/ujppn5qhnl8euxb6a4trv/energetic-mood.mp3?rlkey=w0njuimxqxhqj644vwuvf3goy" },
      { title: "Unstoppable", artist: "Sia", duration: "3:37", mood: "energetic", audioSrc: "https://dl.dropbox.com/scl/fi/ujppn5qhnl8euxb6a4trv/energetic-mood.mp3?rlkey=w0njuimxqxhqj644vwuvf3goy" },
    ],
    calm: [
      { title: "Clair de Lune", artist: "Claude Debussy", duration: "5:01", mood: "calm", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Weightless", artist: "Marconi Union", duration: "8:10", mood: "calm", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "River Flows In You", artist: "Yiruma", duration: "3:07", mood: "calm", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Gymnopedie No.1", artist: "Erik Satie", duration: "3:05", mood: "calm", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Pure Shores", artist: "All Saints", duration: "4:24", mood: "calm", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
    ],
    overwhelmed: [
      { title: "Breathe (2 AM)", artist: "Anna Nalick", duration: "4:39", mood: "overwhelmed", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Gravity", artist: "John Mayer", duration: "4:05", mood: "overwhelmed", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Let It Be", artist: "The Beatles", duration: "4:03", mood: "overwhelmed", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Breathe Me", artist: "Sia", duration: "4:31", mood: "overwhelmed", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
      { title: "Fix You", artist: "Coldplay", duration: "4:55", mood: "overwhelmed", audioSrc: "https://dl.dropbox.com/scl/fi/tywwj3oqsfpcmgpw30qdm/calm-mood.mp3?rlkey=vubfyvd7oc94o83r1pjigvb1h" },
    ],
    motivated: [
      { title: "Stronger", artist: "Kelly Clarkson", duration: "3:41", mood: "motivated", audioSrc: "https://dl.dropbox.com/scl/fi/ujppn5qhnl8euxb6a4trv/energetic-mood.mp3?rlkey=w0njuimxqxhqj644vwuvf3goy" },
      { title: "Roar", artist: "Katy Perry", duration: "3:43", mood: "motivated", audioSrc: "https://dl.dropbox.com/scl/fi/ujppn5qhnl8euxb6a4trv/energetic-mood.mp3?rlkey=w0njuimxqxhqj644vwuvf3goy" },
      { title: "Survivor", artist: "Destiny's Child", duration: "4:01", mood: "motivated", audioSrc: "https://dl.dropbox.com/scl/fi/ujppn5qhnl8euxb6a4trv/energetic-mood.mp3?rlkey=w0njuimxqxhqj644vwuvf3goy" },
      { title: "Hall of Fame", artist: "The Script ft. will.i.am", duration: "3:22", mood: "motivated", audioSrc: "https://dl.dropbox.com/scl/fi/ujppn5qhnl8euxb6a4trv/energetic-mood.mp3?rlkey=w0njuimxqxhqj644vwuvf3goy" },
      { title: "Fighter", artist: "Christina Aguilera", duration: "4:05", mood: "motivated", audioSrc: "https://dl.dropbox.com/scl/fi/ujppn5qhnl8euxb6a4trv/energetic-mood.mp3?rlkey=w0njuimxqxhqj644vwuvf3goy" },
    ],
  };

  // Map common app moods to playlist moods
  const mapMoodToPlaylistCategory = (appMood: string): string => {
    const moodMap: Record<string, string> = {
      happy: "happy",
      sad: "sad",
      ok: "neutral",
      neutral: "neutral",
      down: "sad",
      overwhelmed: "overwhelmed",
      anxious: "anxious",
      energetic: "energetic",
      calm: "calm",
      motivated: "motivated"
    };
    
    return moodMap[appMood.toLowerCase()] || "neutral";
  };

  // Handle actual audio playback
  const playCurrentSong = () => {
    if (!audioRef.current || playlist.length === 0) return;
    
    const currentSong = playlist[currentSongIndex];
    if (!currentSong?.audioSrc) return;
    
    // Set audio source and play
    audioRef.current.src = currentSong.audioSrc;
    audioRef.current.play().catch(error => {
      console.error("Error playing audio:", error);
      toast({
        title: "Playback Error",
        description: "There was an issue playing this track. Please try again.",
        variant: "destructive",
      });
    });
    
    // Update progress bar
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
    }
    
    progressIntervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        const progressPercent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(isNaN(progressPercent) ? 0 : progressPercent);
      }
    }, 1000);
    
    // Add event listener for when song ends
    audioRef.current.onended = () => {
      handleSkip();
    };
  };

  // Generate a playlist based on the current mood
  const generatePlaylist = () => {
    setIsGenerating(true);
    
    // Map the app mood to our playlist categories
    const playlistMood = mapMoodToPlaylistCategory(currentMood);
    
    // Get songs for that mood, or default to neutral if no match
    const moodSongs = songDatabase[playlistMood] || songDatabase.neutral;
    
    // Add some variety - 3 songs from the main mood, 2 from complementary moods
    let newPlaylist: Song[] = [];
    
    // Add main mood songs
    newPlaylist = [...moodSongs.slice(0, 3)];
    
    // Add complementary songs based on mood
    const complementaryMoods: Record<string, string[]> = {
      happy: ["energetic", "motivated"],
      sad: ["calm", "neutral"],
      neutral: ["calm", "happy"],
      anxious: ["calm", "neutral"],
      energetic: ["happy", "motivated"],
      calm: ["neutral", "sad"],
      overwhelmed: ["calm", "neutral"],
      motivated: ["energetic", "happy"]
    };
    
    const complementary = complementaryMoods[playlistMood] || ["neutral", "calm"];
    
    // Add 1 song from each complementary mood
    complementary.forEach(mood => {
      if (songDatabase[mood] && songDatabase[mood].length > 0) {
        const randomIndex = Math.floor(Math.random() * songDatabase[mood].length);
        newPlaylist.push(songDatabase[mood][randomIndex]);
      }
    });
    
    // Shuffle the playlist
    newPlaylist.sort(() => Math.random() - 0.5);
    
    // Update state
    setPlaylist(newPlaylist);
    setCurrentSongIndex(0);
    setIsPlaying(false);
    setIsGenerating(false);
    setProgress(0);
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    toast({
      title: "Playlist Generated",
      description: `Created a new playlist based on your ${currentMood} mood`,
      duration: 3000,
    });
  };

  // Generate initial playlist when mood changes
  useEffect(() => {
    if (currentMood) {
      generatePlaylist();
    }
  }, [currentMood]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      playCurrentSong();
    }
    
    setIsPlaying(!isPlaying);
    
    toast({
      title: isPlaying ? "Paused" : "Playing",
      description: isPlaying 
        ? "Music paused" 
        : `Now playing: ${playlist[currentSongIndex]?.title} by ${playlist[currentSongIndex]?.artist}`,
      duration: 2000,
    });
  };

  const handleSkip = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    setProgress(0);
    
    // If already playing, start the next song
    if (isPlaying) {
      setTimeout(() => {
        playCurrentSong();
      }, 0);
      
      toast({
        title: "Now Playing",
        description: `${playlist[nextIndex]?.title} by ${playlist[nextIndex]?.artist}`,
        duration: 2000,
      });
    }
  };

  // Map mood to gradient color
  const getMoodGradient = (mood: string): string => {
    const gradients: Record<string, string> = {
      happy: "from-yellow-400 to-amber-500",
      sad: "from-blue-400 to-indigo-600",
      neutral: "from-gray-400 to-gray-600",
      anxious: "from-purple-400 to-purple-600",
      energetic: "from-red-400 to-orange-500",
      calm: "from-teal-400 to-cyan-600",
      overwhelmed: "from-violet-400 to-fuchsia-600",
      motivated: "from-green-400 to-emerald-600",
    };
    
    const mappedMood = mapMoodToPlaylistCategory(mood);
    return gradients[mappedMood] || "from-gray-400 to-gray-600";
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className={`py-4 px-6 bg-gradient-to-r ${getMoodGradient(currentMood)}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Music className="h-6 w-6 text-white mr-2" />
            <h3 className="text-xl font-semibold text-white">Mood Playlist</h3>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={generatePlaylist}
            disabled={isGenerating}
            className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white rounded-full"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-white/80 text-sm mt-1">
          Music to match your {currentMood} mood
        </p>
      </div>

      <CardContent className="p-4">
        {playlist.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-black/5 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-secondary-foreground">
                  Now Playing ({currentSongIndex + 1}/{playlist.length})
                </span>
                <span className="text-xs text-muted-foreground">
                  {playlist[currentSongIndex]?.duration}
                </span>
              </div>
              <div className="mb-2">
                <div className="font-bold text-lg">{playlist[currentSongIndex]?.title}</div>
                <div className="text-sm text-muted-foreground">{playlist[currentSongIndex]?.artist}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={handleSkip}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-1">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <div className="h-1 w-24 bg-gray-200 rounded-full">
                    <div 
                      className="h-1 bg-primary rounded-full transition-all duration-300" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground mb-1">Up Next</div>
              {playlist.map((song, index) => {
                if (index === currentSongIndex) return null;
                return (
                  <div 
                    key={`${song.title}-${index}`}
                    onClick={() => {
                      setCurrentSongIndex(index);
                      setIsPlaying(false);
                      setTimeout(() => {
                        setIsPlaying(true);
                        playCurrentSong();
                      }, 0);
                    }}
                    className="flex justify-between items-center p-2 hover:bg-accent rounded-md cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">{song.title}</div>
                      <div className="text-sm text-muted-foreground">{song.artist}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{song.duration}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <Music className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-center text-muted-foreground">
              Generating your personalized playlist...
            </p>
            <Button
              variant="outline"
              onClick={generatePlaylist}
              className="mt-4"
            >
              Generate Playlist
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodPlaylistGenerator;
