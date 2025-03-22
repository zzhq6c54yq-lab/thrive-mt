
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
import { CheckCircle, Clock, Star, ArrowRight } from "lucide-react";
import { Game } from "@/data/gamesData";
import { motion } from "framer-motion";

interface GameCardProps {
  game: Game;
  onStartGame: (game: Game) => void;
}

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy": return "text-green-500 bg-green-50";
    case "medium": return "text-amber-500 bg-amber-50";
    case "hard": return "text-rose-500 bg-rose-50";
    default: return "";
  }
};

const GameCard: React.FC<GameCardProps> = ({ game, onStartGame }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div variants={item}>
      <Card className="group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border border-white bg-white/90 backdrop-blur">
        <div className="h-1.5" style={{ backgroundColor: game.color }}></div>
        <CardHeader 
          className="pb-2 relative"
          style={{ backgroundColor: `${game.color}10` }}
        >
          <div className="absolute right-4 top-4">
            <div 
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}
            >
              {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div 
              className="rounded-md p-2.5"
              style={{ backgroundColor: `${game.color}30` }}
            >
              <game.icon className="h-5 w-5" style={{ color: game.color }} />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">{game.title}</CardTitle>
              <CardDescription className="mt-1">{game.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-4 w-4 ${star <= game.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {game.timeToComplete}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1" style={{ color: game.color }}>
              <game.icon className="h-4 w-4" />
              <span>Brain Benefits</span>
            </h4>
            <ul className="text-xs text-gray-600 space-y-1.5">
              {game.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            className="w-full group relative overflow-hidden flex items-center justify-center"
            onClick={() => onStartGame(game)}
            style={{ 
              backgroundColor: game.color,
              color: "#fff"
            }}
          >
            <span className="relative z-10 mr-1">Play Game</span>
            <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 bg-white transition-opacity"></div>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default GameCard;
