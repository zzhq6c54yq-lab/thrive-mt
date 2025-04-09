
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
      return null;
  }
};

export default GameComponentSelector;
