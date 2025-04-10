
import React from "react";
import { motion } from "framer-motion";
import { Puzzle, Gamepad2, Brain, Sparkles, ArrowLeft, Trophy, Timer, BarChart4, Heart, Star, ThumbsUp, Clock, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Game } from "@/data/gamesData";

interface GameCardProps {
  game: Game;
  onStart: (game: Game) => void;
  imageSrc: string; // Make this required
}

// Export this function for use in other components
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'hard':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const GameCard: React.FC<GameCardProps> = ({ game, onStart, imageSrc }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <motion.div
      className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image Section - ensure it's always displayed */}
      <div className="h-40 overflow-hidden relative">
        <img 
          src={imageSrc}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Difficulty Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
          game.difficulty === 'easy' 
            ? 'bg-green-500/80 text-white' 
            : game.difficulty === 'medium'
              ? 'bg-yellow-500/80 text-white'
              : 'bg-red-500/80 text-white'
        }`}>
          {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
        </div>
        
        {/* Game Type Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-800">
          {game.type.charAt(0).toUpperCase() + game.type.slice(1)}
        </div>
        
        <div className="absolute bottom-3 left-3">
          <h3 className="text-lg font-semibold text-white mb-1">
            {game.title}
          </h3>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[40px]">
          {game.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Brain className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-gray-500">{game.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-500">{game.timeToComplete}</span>
            </div>
          </div>
          
          <button
            onClick={() => onStart(game)}
            className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
          >
            <PlayCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
