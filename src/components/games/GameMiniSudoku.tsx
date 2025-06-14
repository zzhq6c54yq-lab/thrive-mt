
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";

const PUZZLE = [
  [0, 2, 0, 4],
  [3, 0, 0, 0],
  [0, 0, 3, 1],
  [1, 0, 4, 0],
];
const SOLUTION = [
  [4, 2, 1, 3],
  [3, 1, 2, 4],
  [2, 4, 3, 1],
  [1, 3, 4, 2],
];

const LOCAL_KEY = "miniSudokuGrid";
const LOCAL_COMPLETED_KEY = "miniSudokuCompleted";
const LOCAL_HIGHSCORE_KEY = "miniSudokuHighScore";

interface GameMiniSudokuProps {
  game?: Game;
  onComplete?: (score: number) => void;
}

const GameMiniSudoku: React.FC<GameMiniSudokuProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const { getTranslatedText } = useTranslation();

  // Load grid and completion status from localStorage if present
  const [grid, setGrid] = useState<number[][]>(() => {
    const persisted = localStorage.getItem(LOCAL_KEY);
    if (persisted) {
      try {
        return JSON.parse(persisted);
      } catch {
        return PUZZLE.map(row => [...row]);
      }
    }
    return PUZZLE.map(row => [...row]);
  });
  const [completed, setCompleted] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_COMPLETED_KEY) === "true";
  });
  const [wrong, setWrong] = useState(false);
  const [highScore, setHighScore] = useState<number>(() => {
    const hs = localStorage.getItem(LOCAL_HIGHSCORE_KEY);
    return hs ? Number(hs) : 0;
  });

  // Persist grid and completion status to localStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(grid));
  }, [grid]);
  useEffect(() => {
    localStorage.setItem(LOCAL_COMPLETED_KEY, completed ? "true" : "false");
  }, [completed]);

  // High score sync
  useEffect(() => {
    localStorage.setItem(LOCAL_HIGHSCORE_KEY, String(highScore));
  }, [highScore]);

  // Called when user changes a cell
  const handleInput = (row: number, col: number, value: number) => {
    if (PUZZLE[row][col] !== 0) return; // original clue
    if (value < 1 || value > 4) return; // only allow 1-4
    const newGrid = grid.map(arr => [...arr]);
    newGrid[row][col] = value;
    setGrid(newGrid);
    setWrong(false);
  };

  // Check the user's solution
  const checkSolution = () => {
    if (JSON.stringify(grid) === JSON.stringify(SOLUTION)) {
      setCompleted(true);
      setWrong(false);

      const score = 40;
      if (onComplete) onComplete(score);
      // Update high score if it's better
      if (score > highScore) {
        setHighScore(score);
      }

      toast({
        title: getTranslatedText("miniSudokuCompletedTitle") || "🎉 Completed!",
        description: getTranslatedText("miniSudokuCompletedDesc") || "You finished the mini Sudoku!",
        duration: 2200
      });
    } else {
      setWrong(true);
      toast({
        title: getTranslatedText("miniSudokuIncorrectTitle") || "❌ Not Quite!",
        description: getTranslatedText("miniSudokuIncorrectDesc") || "There's a mistake. Try again?",
        duration: 1800
      });
    }
  };

  // Restart game (also clears saved progress)
  const handleRestart = () => {
    setGrid(PUZZLE.map(row => [...row]));
    setCompleted(false);
    setWrong(false);
    localStorage.removeItem(LOCAL_KEY);
    localStorage.removeItem(LOCAL_COMPLETED_KEY);
  };

  return (
    <div className="max-w-sm mx-auto flex flex-col items-center pt-2 pb-8">
      <h2 className="text-lg font-bold mb-2 text-[#B87333]">
        {getTranslatedText("miniSudokuTitle") || "Mini Sudoku"}
      </h2>
      <p className="text-zinc-700 text-xs mb-2 text-center">
        {getTranslatedText("miniSudokuInstructions") ||
          "Fill the grid so each row and column has 1–4. You cannot change orange cells."}
      </p>
      <div className="grid grid-cols-4 gap-1 mb-4">
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <input
              key={rowIdx + "-" + colIdx}
              type="number"
              min={1}
              max={4}
              value={cell === 0 ? "" : cell}
              onChange={e => handleInput(rowIdx, colIdx, Number(e.target.value))}
              disabled={PUZZLE[rowIdx][colIdx] !== 0 || completed}
              className={`w-12 h-12 text-center border rounded 
                ${PUZZLE[rowIdx][colIdx] !== 0 ? "bg-orange-100 font-bold border-orange-400 text-orange-700" : "bg-white border-zinc-300"}
                text-lg mx-auto focus:outline-[#B87333]
              `}
              aria-label={getTranslatedText("miniSudokuCellAria") || "Sudoku cell"}
            />
          ))
        )}
      </div>
      {wrong && (
        <div className="text-red-600 mb-2">
          {getTranslatedText("miniSudokuFeedbackWrong") || "Something is incorrect."}
        </div>
      )}
      <div className="text-xs text-zinc-600 mb-2">
        {getTranslatedText("miniSudokuHighScoreLabel") || "High Score"}: {highScore}
      </div>
      {completed ? (
        <>
          <div className="text-green-700 font-semibold mb-2">
            {getTranslatedText("miniSudokuFeedbackSolved") || "Sudoku solved! 🥳"}
          </div>
          <Button className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white mt-1" onClick={handleRestart}>
            {getTranslatedText("miniSudokuPlayAgain") || "Play Again"}
          </Button>
        </>
      ) : (
        <Button className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white w-full" onClick={checkSolution}>
          {getTranslatedText("miniSudokuCheckSolution") || "Check Solution"}
        </Button>
      )}
    </div>
  );
};

export default GameMiniSudoku;
