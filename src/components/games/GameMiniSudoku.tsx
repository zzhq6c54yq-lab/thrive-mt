
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { RotateCcw, CheckCircle, Trophy, Lightbulb, X } from "lucide-react";

// Multiple 4x4 Sudoku puzzles for variety
const PUZZLES = [
  {
    puzzle: [
      [0, 2, 0, 4],
      [3, 0, 0, 0],
      [0, 0, 3, 1],
      [1, 0, 4, 0],
    ],
    solution: [
      [4, 2, 1, 3],
      [3, 1, 2, 4],
      [2, 4, 3, 1],
      [1, 3, 4, 2],
    ],
  },
  {
    puzzle: [
      [0, 3, 0, 1],
      [1, 0, 3, 0],
      [0, 1, 0, 3],
      [3, 0, 1, 0],
    ],
    solution: [
      [2, 3, 4, 1],
      [1, 4, 3, 2],
      [4, 1, 2, 3],
      [3, 2, 1, 4],
    ],
  },
  {
    puzzle: [
      [0, 0, 2, 0],
      [2, 0, 0, 1],
      [0, 2, 0, 0],
      [1, 0, 0, 2],
    ],
    solution: [
      [3, 1, 2, 4],
      [2, 4, 3, 1],
      [4, 2, 1, 3],
      [1, 3, 4, 2],
    ],
  },
];

const LOCAL_KEY = "miniSudokuGrid";
const LOCAL_COMPLETED_KEY = "miniSudokuCompleted";
const LOCAL_HIGHSCORE_KEY = "miniSudokuHighScore";
const LOCAL_PUZZLE_KEY = "miniSudokuPuzzleIndex";

interface GameMiniSudokuProps {
  game?: Game;
  onComplete?: (score: number) => void;
}

const GameMiniSudoku: React.FC<GameMiniSudokuProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const { getTranslatedText } = useTranslation();

  const [puzzleIndex, setPuzzleIndex] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_PUZZLE_KEY);
    return saved ? Number(saved) : 0;
  });

  const currentPuzzle = PUZZLES[puzzleIndex % PUZZLES.length];

  const [grid, setGrid] = useState<number[][]>(() => {
    const persisted = localStorage.getItem(LOCAL_KEY);
    if (persisted) {
      try { return JSON.parse(persisted); } catch { /* fall through */ }
    }
    return currentPuzzle.puzzle.map(row => [...row]);
  });

  const [completed, setCompleted] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_COMPLETED_KEY) === "true";
  });

  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [highScore, setHighScore] = useState<number>(() => {
    const hs = localStorage.getItem(LOCAL_HIGHSCORE_KEY);
    return hs ? Number(hs) : 0;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(grid));
  }, [grid]);

  useEffect(() => {
    localStorage.setItem(LOCAL_COMPLETED_KEY, completed ? "true" : "false");
  }, [completed]);

  useEffect(() => {
    localStorage.setItem(LOCAL_HIGHSCORE_KEY, String(highScore));
  }, [highScore]);

  useEffect(() => {
    localStorage.setItem(LOCAL_PUZZLE_KEY, String(puzzleIndex));
  }, [puzzleIndex]);

  // Timer
  useEffect(() => {
    if (!isPlaying || completed) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isPlaying, completed]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  // Validate a cell against the solution
  const validateCell = (row: number, col: number, value: number): boolean => {
    return value === currentPuzzle.solution[row][col];
  };

  const handleCellClick = (row: number, col: number) => {
    if (currentPuzzle.puzzle[row][col] !== 0 || completed) return;
    setSelectedCell([row, col]);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || completed) return;
    const [row, col] = selectedCell;
    if (currentPuzzle.puzzle[row][col] !== 0) return;

    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = num;
    setGrid(newGrid);

    // Check if incorrect
    const newErrors = new Set(errors);
    const key = `${row}-${col}`;
    if (!validateCell(row, col, num)) {
      newErrors.add(key);
    } else {
      newErrors.delete(key);
    }
    setErrors(newErrors);

    // Check completion
    if (JSON.stringify(newGrid) === JSON.stringify(currentPuzzle.solution)) {
      setCompleted(true);
      setIsPlaying(false);
      const score = Math.max(100 - timer, 40);
      if (onComplete) onComplete(score);
      if (score > highScore) setHighScore(score);
      toast({
        title: "🎉 Puzzle Solved!",
        description: `Completed in ${formatTime(timer)}. Well done!`,
        duration: 3000,
      });
    }
  };

  const handleClear = () => {
    if (!selectedCell || completed) return;
    const [row, col] = selectedCell;
    if (currentPuzzle.puzzle[row][col] !== 0) return;
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = 0;
    setGrid(newGrid);
    const newErrors = new Set(errors);
    newErrors.delete(`${row}-${col}`);
    setErrors(newErrors);
  };

  const handleRestart = () => {
    setGrid(currentPuzzle.puzzle.map(row => [...row]));
    setCompleted(false);
    setErrors(new Set());
    setSelectedCell(null);
    setTimer(0);
    setIsPlaying(true);
    localStorage.removeItem(LOCAL_KEY);
    localStorage.removeItem(LOCAL_COMPLETED_KEY);
  };

  const handleNewPuzzle = () => {
    const nextIndex = (puzzleIndex + 1) % PUZZLES.length;
    setPuzzleIndex(nextIndex);
    const next = PUZZLES[nextIndex];
    setGrid(next.puzzle.map(row => [...row]));
    setCompleted(false);
    setErrors(new Set());
    setSelectedCell(null);
    setTimer(0);
    setIsPlaying(true);
    localStorage.removeItem(LOCAL_KEY);
    localStorage.removeItem(LOCAL_COMPLETED_KEY);
  };

  const isSelected = (r: number, c: number) =>
    selectedCell && selectedCell[0] === r && selectedCell[1] === c;

  const isInSelectedRowOrCol = (r: number, c: number) =>
    selectedCell && (selectedCell[0] === r || selectedCell[1] === c);

  return (
    <div className="flex flex-col items-center py-6 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[60vh] rounded-xl shadow-2xl border border-[#B87333]/30">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-[#B87333]/20 border border-[#B87333]/30">
          <Lightbulb className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <h2 className="text-2xl font-bold text-white">Mini Sudoku</h2>
      </div>
      <p className="text-sm text-gray-400 text-center mb-4 max-w-sm">
        Fill every row and column with 1–4. No repeats. Tap a cell, then choose a number.
      </p>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-4 text-sm">
        <span className="text-gray-300 font-mono">{formatTime(timer)}</span>
        <span className="text-gray-400">Puzzle {(puzzleIndex % PUZZLES.length) + 1}/{PUZZLES.length}</span>
        {highScore > 0 && (
          <span className="text-[#D4AF37] flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> {highScore}
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-1 mb-5 p-2 bg-gray-950 rounded-xl border border-gray-700">
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            const isClue = currentPuzzle.puzzle[rowIdx][colIdx] !== 0;
            const hasError = errors.has(`${rowIdx}-${colIdx}`);
            const sel = isSelected(rowIdx, colIdx);
            const highlight = isInSelectedRowOrCol(rowIdx, colIdx);

            return (
              <motion.button
                key={`${rowIdx}-${colIdx}`}
                onClick={() => handleCellClick(rowIdx, colIdx)}
                whileTap={!isClue && !completed ? { scale: 0.9 } : {}}
                className={`
                  w-16 h-16 sm:w-18 sm:h-18 rounded-lg text-xl font-bold flex items-center justify-center transition-all duration-150 border-2
                  ${isClue
                    ? 'bg-[#B87333]/20 border-[#B87333]/40 text-[#D4AF37] cursor-default'
                    : sel
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 cursor-pointer'
                      : hasError
                        ? 'bg-red-900/30 border-red-500/50 text-red-400 cursor-pointer'
                        : highlight
                          ? 'bg-gray-700/50 border-gray-600 text-white cursor-pointer'
                          : 'bg-gray-800 border-gray-700 text-white cursor-pointer hover:border-gray-500'
                  }
                `}
              >
                {cell !== 0 ? cell : ''}
              </motion.button>
            );
          })
        )}
      </div>

      {/* Number Pad */}
      {!completed && (
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map(num => (
            <motion.button
              key={num}
              onClick={() => handleNumberInput(num)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#B87333] to-[#D4AF37] text-white text-xl font-bold shadow-lg hover:shadow-[#B87333]/30 transition-shadow"
            >
              {num}
            </motion.button>
          ))}
          <motion.button
            onClick={handleClear}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-xl bg-gray-700 border border-gray-600 text-gray-300 flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
      )}

      {/* Completion */}
      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-[#B87333]/20 to-[#D4AF37]/20 backdrop-blur-sm rounded-xl p-5 text-center border border-[#D4AF37]/30 mb-4"
        >
          <CheckCircle className="w-10 h-10 text-[#D4AF37] mx-auto mb-2" />
          <h3 className="text-xl font-bold text-white">Puzzle Complete!</h3>
          <p className="text-gray-300 text-sm">Solved in {formatTime(timer)}</p>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleRestart}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restart
        </Button>
        <Button
          onClick={handleNewPuzzle}
          className="bg-gradient-to-r from-[#B87333] to-[#D4AF37] text-white font-semibold"
        >
          New Puzzle
        </Button>
      </div>
    </div>
  );
};

export default GameMiniSudoku;
