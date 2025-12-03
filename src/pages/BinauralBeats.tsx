
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BinauralBeatPlayer from "@/components/binaural/BinauralBeatPlayer";
import { ArrowLeft, Headphones, Play, Star, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

// Track data
const tracks = [
  // Meditation tracks
  {
    id: "alpha-waves",
    title: "Alpha Waves Meditation",
    description: "Promotes relaxation and reduces stress by generating alpha brain waves, ideal for light meditation.",
    category: "meditation",
    duration: "15:00",
    imageUrl: "https://images.unsplash.com/photo-1520473378652-85d9c4aee6cf?auto=format&fit=crop&w=500&q=80",
    audioUrl: "https://example.com/alpha-waves.mp3", // Mock URL
    baseFrequency: 200,
    targetFrequency: 210,
    popular: true,
    effects: ["Reduces stress", "Promotes relaxation", "Enhances creativity", "Improves mood"]
  },
  {
    id: "gamma-meditation",
    title: "Gamma Meditation",
    description: "Enhances awareness and presence with gamma frequencies that promote heightened consciousness.",
    category: "meditation",
    duration: "20:00",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80",
    audioUrl: "https://example.com/gamma-meditation.mp3", // Mock URL
    baseFrequency: 320,
    targetFrequency: 340,
    popular: false,
    effects: ["Heightened awareness", "Mental clarity", "Enhanced presence", "Cognitive boost"]
  },
  
  // Sleep tracks
  {
    id: "deep-sleep",
    title: "Deep Sleep Delta",
    description: "Helps you fall into deep sleep with delta waves that calm the mind and body.",
    category: "sleep",
    duration: "45:00",
    imageUrl: "https://images.unsplash.com/photo-1617644910775-77d4eacedb3a?auto=format&fit=crop&w=500&q=80",
    audioUrl: "https://example.com/deep-sleep.mp3", // Mock URL
    baseFrequency: 100,
    targetFrequency: 104,
    popular: true,
    effects: ["Induces deep sleep", "Reduces insomnia", "Promotes neurogenesis", "Calms racing thoughts"]
  },
  {
    id: "sleep-transition",
    title: "Sleep Transition",
    description: "Gentle theta frequencies to help you transition from wakefulness to sleep with ease.",
    category: "sleep",
    duration: "30:00",
    imageUrl: "https://images.unsplash.com/photo-1455642305337-78554836e3c6?auto=format&fit=crop&w=500&q=80",
    audioUrl: "https://example.com/sleep-transition.mp3", // Mock URL
    baseFrequency: 145,
    targetFrequency: 152,
    popular: false,
    effects: ["Easier sleep onset", "Relaxes body and mind", "Reduces sleep anxiety", "Enhances dream recall"]
  },
  
  // Focus tracks
  {
    id: "gamma-focus",
    title: "Gamma Focus",
    description: "Enhances concentration and mental clarity with gamma frequencies for deep focus.",
    category: "focus",
    duration: "30:00",
    imageUrl: "https://images.unsplash.com/photo-1589409514187-c21d14df0d04?auto=format&fit=crop&w=500&q=80",
    audioUrl: "https://example.com/gamma-focus.mp3", // Mock URL
    baseFrequency: 315,
    targetFrequency: 355,
    popular: false,
    effects: ["Enhances focus", "Improves cognitive function", "Increases mental clarity", "Boosts productivity"]
  },
  {
    id: "study-beta",
    title: "Study Beta",
    description: "Beta waves to help you maintain focus and attention during study sessions or work.",
    category: "focus",
    duration: "25:00",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80",
    audioUrl: "https://example.com/study-beta.mp3", // Mock URL
    baseFrequency: 230,
    targetFrequency: 245,
    popular: true,
    effects: ["Sustained attention", "Mental endurance", "Information retention", "Problem solving"]
  },
  
  // Relax tracks
  {
    id: "evening-relax",
    title: "Evening Relaxation",
    description: "Wind down in the evening with gentle frequencies that prepare your mind for sleep.",
    category: "relax",
    duration: "20:00",
    imageUrl: "https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=500&q=80",
    audioUrl: "https://example.com/evening-relax.mp3", // Mock URL
    baseFrequency: 136,
    targetFrequency: 142,
    popular: true,
    effects: ["Evening wind-down", "Stress reduction", "Mental decompression", "Prepares for sleep"]
  },
  {
    id: "midday-calm",
    title: "Midday Calm",
    description: "Take a refreshing mental break with this calming track designed for midday relaxation.",
    category: "relax",
    duration: "15:00",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
    audioUrl: "https://example.com/midday-calm.mp3", // Mock URL
    baseFrequency: 165,
    targetFrequency: 173,
    popular: false,
    effects: ["Mental reset", "Stress relief", "Increased calm", "Refreshed focus"]
  },
  
  // Anxiety tracks
  {
    id: "anxiety-relief",
    title: "Anxiety Relief",
    description: "Calms anxiety with theta waves that slow racing thoughts and promote tranquility.",
    category: "anxiety",
    duration: "20:00",
    imageUrl: "https://images.unsplash.com/photo-1528495612343-9ca9f4a9f67c?auto=format&fit=crop&w=500&q=80",
    audioUrl: "https://example.com/anxiety-relief.mp3", // Mock URL
    baseFrequency: 160,
    targetFrequency: 167,
    popular: true,
    effects: ["Reduces anxiety", "Calms nervous system", "Alleviates panic", "Promotes relaxation"]
  },
  {
    id: "grounding-beat",
    title: "Grounding Beat",
    description: "Connect with the present moment using grounding frequencies that help combat anxiety and stress.",
    category: "anxiety",
    duration: "18:00",
    imageUrl: "https://images.unsplash.com/photo-1551516594-56cb78394645?auto=format&fit=crop&w=500&q=80",
    audioUrl: "https://example.com/grounding-beat.mp3", // Mock URL
    baseFrequency: 140,
    targetFrequency: 148,
    popular: false,
    effects: ["Present moment awareness", "Physical grounding", "Emotional regulation", "Panic reduction"]
  },
];

interface CategoryData {
  title: string;
  description: string;
  gradient: string;
  image: string;
}

const categoryData: Record<string, CategoryData> = {
  meditation: {
    title: "Meditation",
    description: "Enhance your meditation practice with frequencies that promote calm awareness and mindfulness.",
    gradient: "from-purple-600 to-indigo-600",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
  },
  sleep: {
    title: "Sleep",
    description: "Fall asleep faster and enjoy deeper, more restful sleep with delta and theta frequencies.",
    gradient: "from-blue-600 to-blue-900",
    image: "https://images.unsplash.com/photo-1455642305337-78554836e3c6?auto=format&fit=crop&w=800&q=80"
  },
  focus: {
    title: "Focus",
    description: "Improve concentration, enhance learning, and boost productivity with beta and gamma frequencies.",
    gradient: "from-emerald-600 to-green-700",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
  },
  relax: {
    title: "Relax",
    description: "Release tension and unwind with calming frequencies designed to reduce stress and promote relaxation.",
    gradient: "from-orange-500 to-amber-600",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  anxiety: {
    title: "Anxiety",
    description: "Find relief from anxiety and racing thoughts with specialized frequencies for nervous system regulation.",
    gradient: "from-red-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1528495612343-9ca9f4a9f67c?auto=format&fit=crop&w=800&q=80"
  }
};

const BinauralBeats = () => {
  const [activeCategory, setActiveCategory] = useState<string>("meditation");
  const [currentTrack, setCurrentTrack] = useState<typeof tracks[0] | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  // Get tracks for the current category
  const getCategoryTracks = () => {
    if (showFavorites) {
      return tracks.filter(track => favorites.includes(track.id));
    }
    return tracks.filter(track => track.category === activeCategory);
  };

  // Play a track
  const handlePlayTrack = (track: typeof tracks[0]) => {
    setCurrentTrack(track);
    
    toast({
      title: `Now playing: ${track.title}`,
      description: "For best results, use stereo headphones.",
    });
  };

  // Toggle favorite status
  const toggleFavorite = (trackId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (favorites.includes(trackId)) {
      setFavorites(favorites.filter(id => id !== trackId));
      toast({
        title: "Removed from favorites",
        description: "Track has been removed from your favorites.",
      });
    } else {
      setFavorites([...favorites, trackId]);
      toast({
        title: "Added to favorites",
        description: "Track has been added to your favorites.",
      });
    }
  };

  // Navigate to next track
  const handleNextTrack = () => {
    const categoryTracks = getCategoryTracks();
    if (!currentTrack || categoryTracks.length === 0) return;
    
    const currentIndex = categoryTracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % categoryTracks.length;
    setCurrentTrack(categoryTracks[nextIndex]);
  };

  // Navigate to previous track
  const handlePreviousTrack = () => {
    const categoryTracks = getCategoryTracks();
    if (!currentTrack || categoryTracks.length === 0) return;
    
    const currentIndex = categoryTracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + categoryTracks.length) % categoryTracks.length;
    setCurrentTrack(categoryTracks[prevIndex]);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121826] via-[#1e293b] to-[#0f172a]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23ffffff%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
          
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#8B5CF6]/20 to-transparent blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-[#3B82F6]/20 to-transparent blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-start justify-between mb-8">
            <Button 
              variant="link" 
              className="text-white hover:text-[#D4AF37] transition-colors p-0 flex items-center"
              onClick={() => navigate("/app/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <HomeButton />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-3 flex items-center drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                <div className="relative mr-3">
                  <div className="absolute -inset-1 bg-[#8B5CF6] rounded-full blur opacity-60"></div>
                  <div className="relative">
                    <Headphones className="h-10 w-10 text-white" />
                  </div>
                </div>
                Binaural Beats Therapy
              </h1>
            <p className="text-xl text-gray-300 drop-shadow-sm">
              Enhance your mental state with scientifically designed audio frequencies
            </p>
            </div>
            
            <Badge 
              variant="outline" 
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border-[#8B5CF6]/50 text-[#A78BFA]"
            >
              <Headphones className="h-4 w-4 mr-2" />
              Use headphones for best results
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <TabsList className="h-12">
              {Object.keys(categoryData).map(category => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  className="min-w-[100px] data-[state=active]:bg-[#8B5CF6]"
                >
                  {categoryData[category].title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <Button
              variant={showFavorites ? "default" : "outline"}
              className={`${showFavorites ? "bg-[#8B5CF6]" : "text-[#8B5CF6] border-[#8B5CF6]/50"}`}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              <Star className={`h-4 w-4 mr-1.5 ${showFavorites ? "fill-white" : ""}`} />
              {showFavorites ? "All Tracks" : "My Favorites"}
            </Button>
          </div>
          
          {/* Category Content */}
          {Object.keys(categoryData).map(category => (
            <TabsContent key={category} value={category} className="space-y-6">
              {/* Category Header */}
              {!showFavorites && (
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-8">
                  <img 
                    src={categoryData[category].image}
                    alt={categoryData[category].title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${categoryData[category].gradient} opacity-70`}></div>
                  <div className="absolute inset-0 bg-black/30"></div>
                  
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{categoryData[category].title}</h2>
                    <p className="text-white/80 max-w-lg">{categoryData[category].description}</p>
                  </div>
                </div>
              )}
              
              {showFavorites && favorites.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-[#1e293b]/50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-10 w-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No favorites yet</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    You haven't added any tracks to your favorites. Browse categories and star the tracks you like.
                  </p>
                  <Button
                    variant="outline"
                    className="text-[#8B5CF6] border-[#8B5CF6]/50"
                    onClick={() => setShowFavorites(false)}
                  >
                    Browse All Tracks
                  </Button>
                </div>
              ) : (
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {getCategoryTracks().map(track => (
                    <motion.div key={track.id} variants={item}>
                      <Card 
                        className="overflow-hidden bg-[#1e293b]/50 border-[#1e293b] backdrop-blur-sm hover:bg-[#1e293b]/80 transition-all cursor-pointer group"
                        onClick={() => handlePlayTrack(track)}
                      >
                        <div className="relative h-48">
                          <img 
                            src={track.imageUrl}
                            alt={track.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent"></div>
                          
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
                              onClick={(e) => toggleFavorite(track.id, e)}
                            >
                              <Star className={`h-4 w-4 ${favorites.includes(track.id) ? "fill-[#8B5CF6] text-[#8B5CF6]" : ""}`} />
                            </Button>
                          </div>
                          
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-16 w-16 rounded-full bg-[#8B5CF6]/80 text-white hover:bg-[#8B5CF6] backdrop-blur-sm"
                            >
                              <Play className="h-8 w-8 ml-1" />
                            </Button>
                          </div>
                          
                          <div className="absolute bottom-3 left-3 flex gap-2">
                            <Badge className="bg-[#8B5CF6]/70 backdrop-blur-sm text-white">
                              {track.duration}
                            </Badge>
                            
                            {track.popular && (
                              <Badge className="bg-blue-600/70 backdrop-blur-sm text-white">
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <CardHeader className="py-4">
                          <CardTitle className="text-xl text-white group-hover:text-[#A78BFA] transition-colors">
                            {track.title}
                          </CardTitle>
                          <CardDescription className="text-gray-300">
                            {track.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="pt-0 pb-4">
                          <p className="text-sm text-gray-400 mb-2">
                            <span className="text-gray-300 font-medium">Frequencies: </span>
                            {track.baseFrequency} Hz ↔ {track.targetFrequency} Hz
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {track.effects.slice(0, 2).map((effect, i) => (
                              <Badge key={i} variant="outline" className="bg-[#1e293b] text-gray-300 border-gray-700">
                                {effect}
                              </Badge>
                            ))}
                            {track.effects.length > 2 && (
                              <Badge variant="outline" className="bg-[#1e293b] text-gray-300 border-gray-700">
                                +{track.effects.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        
                        <CardFooter className="pt-2 border-t border-gray-800">
                          <Button 
                            className="w-full gap-2 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#A78BFA]"
                          >
                            <Play className="h-4 w-4" />
                            Play Track
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Player Bar */}
        {currentTrack && (
          <div className="fixed bottom-8 left-0 right-0 mx-auto px-4 z-30">
            <div className="max-w-4xl mx-auto">
              <BinauralBeatPlayer 
                track={currentTrack}
                onNext={handleNextTrack}
                onPrevious={handlePreviousTrack}
              />
            </div>
          </div>
        )}
        
        {/* Info Section */}
        <div className="mt-16 bg-[#1e293b]/50 backdrop-blur-sm rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-2 mb-4 text-white">
            <Info className="h-5 w-5 text-[#8B5CF6]" />
            <h2 className="text-xl font-medium">About Binaural Beats</h2>
          </div>
          <p className="text-gray-300 mb-4">
            Binaural beats are an auditory illusion created when two slightly different frequencies are played separately to each ear. 
            Your brain perceives a third tone—the difference between the two frequencies—which can influence brainwave activity.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-white font-medium">How to Use</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Use stereo headphones for the binaural effect to work</li>
                <li>Find a quiet, comfortable space with minimal distractions</li>
                <li>Start with shorter sessions (15-20 minutes) and gradually increase</li>
                <li>Be consistent with regular practice for best results</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-medium">Types of Brainwaves</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><span className="text-[#8B5CF6]">Delta (0.5-4 Hz)</span>: Deep sleep, healing</li>
                <li><span className="text-[#8B5CF6]">Theta (4-8 Hz)</span>: Meditation, creativity</li>
                <li><span className="text-[#8B5CF6]">Alpha (8-13 Hz)</span>: Relaxation, calmness</li>
                <li><span className="text-[#8B5CF6]">Beta (13-30 Hz)</span>: Focus, alertness</li>
                <li><span className="text-[#8B5CF6]">Gamma (30-100 Hz)</span>: Higher cognitive processing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinauralBeats;
