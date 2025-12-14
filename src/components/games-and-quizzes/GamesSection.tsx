
import React from "react";
import { Puzzle } from "lucide-react";
import GameCard from "@/components/games-and-quizzes/GameCard";

interface GamesSectionProps {
  filteredGames: any[];
  difficultyFilter: string;
  typeFilter: string;
  setDifficultyFilter: (filter: string) => void;
  setTypeFilter: (filter: string) => void;
  onStartGame: (game: any) => void;
}

const GamesSection: React.FC<GamesSectionProps> = ({
  filteredGames,
  difficultyFilter,
  typeFilter,
  setDifficultyFilter,
  setTypeFilter,
  onStartGame
}) => {

  const renderGameCards = () => {
    if (filteredGames.length === 0) {
      return (
        <div className="col-span-full py-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
            <Puzzle className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">No games found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try adjusting your filters or check back later for new games
          </p>
        </div>
      );
    }

    // Ensure each game has a unique, high-quality image
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

    return filteredGames.map(game => {
      // Ensure each game has an image
      const gameImage = gameImages[game.id as keyof typeof gameImages] || "https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
      
      return (
        <GameCard 
          key={game.id} 
          game={game} 
          onStart={onStartGame}
          imageSrc={gameImage}
        />
      );
    });
  };
  
  return (
    <div>
      {/* Filter Section */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty:</label>
            <select
              id="difficulty"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
            <select
              id="type"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="memory">Memory</option>
              <option value="logic">Logic</option>
              <option value="math">Math</option>
              <option value="word">Word</option>
            </select>
          </div>
        </div>
        
        {/* Reset Filters Button */}
        <button
          onClick={() => {
            setDifficultyFilter("all");
            setTypeFilter("all");
          }}
          className="bg-muted hover:bg-muted/80 text-foreground font-semibold py-2 px-4 border border-border rounded shadow transition-colors"
        >
          Reset Filters
        </button>
      </div>
      
      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {renderGameCards()}
      </div>
    </div>
  );
};

export default GamesSection;
