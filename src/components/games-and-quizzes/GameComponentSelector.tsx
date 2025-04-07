
import React from "react";
import { Game } from "@/data/gamesData";
import GameMemoryMatch from "@/components/games/GameMemoryMatch";
import GameWordUnscramble from "@/components/games/GameWordUnscramble";
import GameReactionTime from "@/components/games/GameReactionTime";
import GamePatternFinder from "@/components/games/GamePatternFinder";
import GameMentalMath from "@/components/games/GameMentalMath";
import GameColorMatch from "@/components/games/GameColorMatch";
import GameMiniSudoku from "@/components/games/GameMiniSudoku";
import GameWordAssociation from "@/components/games/GameWordAssociation";
import GameSequenceRecall from "@/components/games/GameSequenceRecall";
import GameShapeFit from "@/components/games/GameShapeFit";

interface GameComponentSelectorProps {
  activeGame: Game;
  onComplete: (score: number) => void;
}

const GameComponentSelector: React.FC<GameComponentSelectorProps> = ({
  activeGame,
  onComplete
}) => {
  // Check if activeGame is valid
  if (!activeGame || !activeGame.id) {
    console.error("Invalid game data provided to GameComponentSelector");
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Error loading game. Please try again later.</p>
      </div>
    );
  }
  
  // Choose the correct game component based on the game ID
  switch (activeGame.id) {
    case "memory-match":
      return <GameMemoryMatch game={activeGame} onComplete={onComplete} />;
      
    case "word-scramble":
      return <GameWordUnscramble game={activeGame} onComplete={onComplete} />;
      
    case "reaction-time":
      return <GameReactionTime game={activeGame} onComplete={onComplete} />;
      
    case "pattern-recognition":
      return <GamePatternFinder game={activeGame} onComplete={onComplete} />;
      
    case "math-challenge":
      return <GameMentalMath game={activeGame} onComplete={onComplete} />;
      
    case "color-match":
      return <GameColorMatch game={activeGame} onComplete={onComplete} />;
      
    case "sudoku-mini":
      return <GameMiniSudoku game={activeGame} onComplete={onComplete} />;
      
    case "word-association":
      return <GameWordAssociation game={activeGame} onComplete={onComplete} />;
      
    case "memory-sequence":
      return <GameSequenceRecall game={activeGame} onComplete={onComplete} />;
      
    case "shape-fit":
      return <GameShapeFit game={activeGame} onComplete={onComplete} />;
      
    default:
      console.warn(`No game component found for game ID: ${activeGame.id}`);
      return (
        <div className="p-6 text-center">
          <p>This game is coming soon! Please check back later.</p>
        </div>
      );
  }
};

export default GameComponentSelector;
