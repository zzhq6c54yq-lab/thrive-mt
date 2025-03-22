
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Gamepad, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GameCard from "./GameCard";
import { Game } from "@/data/gamesData";
import { motion } from "framer-motion";

interface GamesSectionProps {
  filteredGames: Game[];
  difficultyFilter: string;
  typeFilter: string;
  setDifficultyFilter: (value: string) => void;
  setTypeFilter: (value: string) => void;
  onStartGame: (game: Game) => void;
}

const GamesSection: React.FC<GamesSectionProps> = ({
  filteredGames,
  difficultyFilter,
  typeFilter,
  setDifficultyFilter,
  setTypeFilter,
  onStartGame
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-white/50 p-4 rounded-xl backdrop-blur shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-[#9b87f5]/20 to-[#D946EF]/20">
            <Gamepad className="h-5 w-5 text-[#9b87f5]" />
          </div>
          <span>Therapeutic Mental Wellness Games</span>
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[130px] h-9 bg-white border-[#9b87f5]/20">
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
            <SelectTrigger className="w-[130px] h-9 bg-white border-[#9b87f5]/20">
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
            className="h-9 px-3 border-[#9b87f5]/20 text-[#9b87f5] hover:bg-[#9b87f5]/10" 
            onClick={() => {
              setDifficultyFilter("all");
              setTypeFilter("all");
            }}
          >
            <Filter className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>
      
      {filteredGames.length === 0 ? (
        <div className="text-center py-10">
          <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Gamepad className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">No games found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredGames.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onStartGame={onStartGame} 
            />
          ))}
        </motion.div>
      )}

      <div className="mt-12 text-center">
        <div className="relative inline-block">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9b87f5] to-[#D946EF] rounded-full blur"></div>
          <Button 
            className="relative bg-white text-[#9b87f5] hover:bg-[#9b87f5]/10 border border-[#9b87f5]/20 shadow-sm px-6"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            View more games
          </Button>
        </div>
      </div>
    </>
  );
};

export default GamesSection;
