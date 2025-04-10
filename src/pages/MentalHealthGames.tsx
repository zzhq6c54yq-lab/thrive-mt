
import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Gamepad2, Filter, Search, Clock, Brain, 
  Award, Sparkles, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GameCard from "@/components/games-and-quizzes/GameCard";
import { gamesData, Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";
import GameInstructionsDialog from "@/components/games-and-quizzes/GameInstructionsDialog";
import GamePlayDialog from "@/components/games-and-quizzes/GamePlayDialog";
import GameComponentSelector from "@/components/games-and-quizzes/GameComponentSelector";

const MentalHealthGames = () => {
  const [games, setGames] = useState<Game[]>(gamesData);
  const [filteredGames, setFilteredGames] = useState<Game[]>(gamesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [gameInstructionsOpen, setGameInstructionsOpen] = useState(false);
  const [gamePlayOpen, setGamePlayOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Apply filters
  useEffect(() => {
    let results = [...games];
    
    // Text search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        game => 
          game.title.toLowerCase().includes(query) || 
          game.description.toLowerCase().includes(query) ||
          game.type.toLowerCase().includes(query)
      );
    }
    
    // Difficulty filter
    if (difficultyFilter !== "all") {
      results = results.filter(game => game.difficulty === difficultyFilter);
    }
    
    // Type filter
    if (typeFilter !== "all") {
      results = results.filter(game => game.type === typeFilter);
    }
    
    setFilteredGames(results);
  }, [searchQuery, difficultyFilter, typeFilter, games]);
  
  const handleReset = () => {
    setSearchQuery("");
    setDifficultyFilter("all");
    setTypeFilter("all");
  };
  
  const handleStartGame = (game: Game) => {
    setActiveGame(game);
    setGameInstructionsOpen(true);
  };
  
  const handlePlayGame = () => {
    setGameInstructionsOpen(false);
    setGamePlayOpen(true);
  };
  
  const handleGameComplete = (score: number) => {
    setGamePlayOpen(false);
    
    if (activeGame) {
      toast({
        title: "Game Completed!",
        description: `You scored ${score} points in ${activeGame.title}`,
        duration: 3000,
      });
    }
  };

  // Game images mapping
  const gameImages = {
    "color-match": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "memory-match": "https://images.unsplash.com/photo-1606167668584-78701c57f13d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "mental-math": "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "mini-sudoku": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "pattern-finder": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "reaction-time": "https://images.unsplash.com/photo-1611264199213-ebe0e4a1cdba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "sequence-recall": "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "shape-fit": "https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "word-association": "https://images.unsplash.com/photo-1520004434532-668416a08753?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "word-unscramble": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  };
  
  return (
    <Page title="Mental Health Games" showBackButton={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-3 flex items-center">
              <Gamepad2 className="mr-2 text-[#9b87f5]" />
              Mental Wellness Games
            </h1>
            <p className="text-gray-600 mb-6">
              Explore our collection of scientifically-designed games that promote cognitive health and mental wellbeing.
            </p>
            
            <div className="bg-white shadow-sm rounded-xl p-5 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger className="w-[130px] bg-white">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[130px] bg-white">
                      <SelectValue placeholder="Game Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="memory">Memory</SelectItem>
                      <SelectItem value="puzzle">Puzzle</SelectItem>
                      <SelectItem value="reaction">Reaction</SelectItem>
                      <SelectItem value="cognitive">Cognitive</SelectItem>
                      <SelectItem value="word">Word</SelectItem>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="visual">Visual</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="border-gray-200"
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {filteredGames.length} {filteredGames.length === 1 ? 'Game' : 'Games'} {difficultyFilter !== 'all' || typeFilter !== 'all' || searchQuery ? 'Found' : ''}
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/games-and-quizzes')}
              className="text-[#9b87f5] hover:text-[#9b87f5]/80 hover:bg-[#9b87f5]/10"
            >
              Back to Games Hub
            </Button>
          </div>
          
          {filteredGames.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl">
              <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Gamepad2 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">No games found</h3>
              <p className="text-gray-500 mt-1 mb-4">Try adjusting your search or filters</p>
              <Button onClick={handleReset} variant="outline">Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => {
                // Get appropriate image for game
                const gameImage = gameImages[game.id as keyof typeof gameImages] || 
                  "https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                
                return (
                  <GameCard
                    key={game.id}
                    game={game}
                    onStart={handleStartGame}
                    imageSrc={gameImage}
                  />
                );
              })}
            </div>
          )}
        </div>
        
        <div className="bg-gradient-to-r from-[#f8f9fa] to-[#eef1f5] rounded-xl p-6 mt-10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="text-amber-500" />
            Benefits of Cognitive Games
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white shadow-sm rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-blue-100 mr-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="font-medium">Cognitive Function</h4>
              </div>
              <p className="text-sm text-gray-600">
                Enhances memory, attention, and problem-solving abilities through regular mental exercise.
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-purple-100 mr-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <h4 className="font-medium">Mental Wellbeing</h4>
              </div>
              <p className="text-sm text-gray-600">
                Reduces stress and anxiety while promoting a sense of accomplishment and relaxation.
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-green-100 mr-2">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="font-medium">Long-term Health</h4>
              </div>
              <p className="text-sm text-gray-600">
                Regular mental exercises may help maintain cognitive function as you age and promote brain health.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/games-and-quizzes')} 
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Try Our Featured Games
          </Button>
        </div>
      </div>
      
      {/* Game Instructions Dialog */}
      <GameInstructionsDialog
        open={gameInstructionsOpen}
        onOpenChange={setGameInstructionsOpen}
        activeGame={activeGame}
        onPlayGame={handlePlayGame}
      />
      
      {/* Game Play Dialog */}
      <GamePlayDialog
        open={gamePlayOpen}
        onOpenChange={setGamePlayOpen}
        activeGame={activeGame}
        onClose={() => setGamePlayOpen(false)}
        gameComponent={
          activeGame ? (
            <GameComponentSelector 
              activeGame={activeGame} 
              onComplete={handleGameComplete} 
            />
          ) : null
        }
      />
    </Page>
  );
};

export default MentalHealthGames;
