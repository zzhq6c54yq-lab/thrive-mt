
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

  // Default rating of 4 if not present in the Game type
  const rating = 4;

  return (
    <motion.div variants={item}>
      <Card className="group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border border-white bg-white/90 backdrop-blur">
        <div className="h-1.5" style={{ backgroundColor: game.color }}></div>
        
        {/* Cover image section */}
        <div className="relative h-40 overflow-hidden">
          <img 
            src={game.coverImage} 
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback image if the original fails to load
              e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute top-2 right-2">
            <div 
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}
            >
              {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex justify-between text-white">
              <div className="flex items-center">
                <game.icon className="h-4 w-4 mr-1" style={{ color: game.color }} />
                <span className="text-sm font-medium">{game.type.charAt(0).toUpperCase() + game.type.slice(1)}</span>
              </div>
              <div className="text-xs flex items-center bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                <Clock className="h-3 w-3 mr-1" />
                {game.timeToComplete}
              </div>
            </div>
          </div>
        </div>
        
        <CardHeader 
          className="pb-2"
          style={{ backgroundColor: `${game.color}10` }}
        >
          <div className="flex items-start gap-3">
            <div 
              className="rounded-md p-2.5 mt-1"
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
                  className={`h-4 w-4 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                />
              ))}
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
