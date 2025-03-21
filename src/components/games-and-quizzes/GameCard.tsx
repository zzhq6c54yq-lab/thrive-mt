
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import { Game } from "@/data/gamesData";
import { motion } from "framer-motion";

interface GameCardProps {
  game: Game;
  onStartGame: (game: Game) => void;
}

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy": return "text-green-500";
    case "medium": return "text-yellow-500";
    case "hard": return "text-red-500";
    default: return "";
  }
};

const GameCard: React.FC<GameCardProps> = ({ game, onStartGame }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 border-[1px] border-[color:var(--border-color)]" 
            style={{ "--border-color": `${game.color}40` } as React.CSSProperties}>
        <CardHeader 
          className="pb-2 relative"
          style={{ backgroundColor: `${game.color}10` }}
        >
          <div className="absolute right-4 top-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full bg-white/80 hover:bg-white"
              onClick={() => onStartGame(game)}
            >
              <game.icon className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div 
              className="rounded-md p-2"
              style={{ backgroundColor: `${game.color}30` }}
            >
              <game.icon className="h-5 w-5" style={{ color: game.color }} />
            </div>
            <div>
              <CardTitle className="text-lg">{game.title}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow py-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-sm bg-gray-50 p-2 rounded flex flex-col items-center justify-center">
              <span className="text-gray-500 text-xs">Difficulty</span>
              <span className={`font-medium ${getDifficultyColor(game.difficulty)}`}>
                {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
              </span>
            </div>
            <div className="text-sm bg-gray-50 p-2 rounded flex flex-col items-center justify-center">
              <span className="text-gray-500 text-xs">Time</span>
              <span className="font-medium text-gray-700 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {game.timeToComplete}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <game.icon className="h-4 w-4" style={{ color: game.color }} />
              <span>Benefits</span>
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {game.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            className="w-full"
            onClick={() => onStartGame(game)}
            style={{ 
              backgroundColor: game.color,
              color: "#fff"
            }}
          >
            Play Game
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default GameCard;
