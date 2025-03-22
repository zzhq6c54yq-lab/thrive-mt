
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Gamepad } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GameCard from "./GameCard";
import { Game } from "@/data/gamesData";

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
  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-white/50 p-3 rounded-lg backdrop-blur">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Gamepad className="h-5 w-5 text-[#9b87f5]" />
          <span>Mental Wellness Games</span>
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[130px] h-9">
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
            <SelectTrigger className="w-[130px] h-9">
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
            className="h-9 px-3" 
            onClick={() => {
              setDifficultyFilter("");
              setTypeFilter("");
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onStartGame={onStartGame} 
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GamesSection;
