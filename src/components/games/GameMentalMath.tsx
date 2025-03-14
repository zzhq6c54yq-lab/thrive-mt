
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameMentalMathProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameMentalMath: React.FC<GameMentalMathProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  // This is a placeholder implementation
  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started",
      description: "Solve math problems as quickly as you can!",
    });
  };

  const completeGame = () => {
    onComplete(score);
  };

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Ready to test your mental math skills?</p>
          <Button 
            onClick={startGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">This is a placeholder for the Mental Math game.</p>
            <p className="text-sm text-gray-600">In a full implementation, math problems would appear here for you to solve.</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-lg font-bold">{score}</p>
          </div>
          
          <Button 
            onClick={completeGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Complete Game (Demo)
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameMentalMath;
