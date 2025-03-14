
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";

interface GameSequenceRecallProps {
  game: Game;
  onComplete: (score: number) => void;
}

const GameSequenceRecall: React.FC<GameSequenceRecallProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  
  // Start the game with an initial sequence
  const startGame = () => {
    setGameStarted(true);
    setCurrentRound(1);
    setScore(0);
    generateNewSequence();
    
    toast({
      title: "Game Started",
      description: "Watch the sequence and repeat it back correctly!",
    });
  };
  
  // Generate a new random sequence
  const generateNewSequence = () => {
    const newSequence = Array.from({ length: currentRound + 2 }, () => Math.floor(Math.random() * 9) + 1);
    setSequence(newSequence);
    setUserSequence([]);
    showSequence();
  };
  
  // Display the sequence to the user
  const showSequence = () => {
    setIsShowingSequence(true);
    setTimeout(() => {
      setIsShowingSequence(false);
    }, (currentRound + 2) * 1000); // Show each digit for 1 second
  };
  
  // Handle user input
  const handleNumberClick = (number: number) => {
    if (isShowingSequence) return;
    
    const newUserSequence = [...userSequence, number];
    setUserSequence(newUserSequence);
    
    // Check if the user has completed the sequence
    if (newUserSequence.length === sequence.length) {
      checkSequence(newUserSequence);
    }
  };
  
  // Check if the user's sequence matches the original
  const checkSequence = (userSeq: number[]) => {
    const isCorrect = userSeq.every((num, idx) => num === sequence[idx]);
    
    if (isCorrect) {
      // Success - move to next round
      setScore(prevScore => prevScore + (currentRound * 10));
      setCurrentRound(prevRound => prevRound + 1);
      
      toast({
        title: "Correct Sequence!",
        description: `Moving to round ${currentRound + 1}`,
      });
      
      setTimeout(generateNewSequence, 1500);
    } else {
      // Failure - game over
      toast({
        title: "Wrong Sequence",
        description: "Game over! Try again.",
        variant: "destructive"
      });
      
      setGameStarted(false);
    }
  };

  // Complete the game (for demonstration purposes)
  const completeGame = () => {
    onComplete(score);
  };

  return (
    <div className="w-full text-center">
      {!gameStarted ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Ready to test your memory?</p>
          <Button 
            onClick={startGame}
            style={{ backgroundColor: game.color, color: "#fff" }}
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500">Round</p>
            <p className="text-lg font-bold">{currentRound}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              {isShowingSequence 
                ? "Watch carefully..." 
                : "Now repeat the sequence!"}
            </p>
            
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  className="h-12 w-12"
                  variant="outline"
                  style={{
                    backgroundColor: isShowingSequence && sequence[0] === num 
                      ? game.color 
                      : undefined
                  }}
                  onClick={() => handleNumberClick(num)}
                  disabled={isShowingSequence}
                >
                  {num}
                </Button>
              ))}
            </div>
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

export default GameSequenceRecall;
