import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface GameShapeFitProps {
  game: Game;
  onComplete: (score: number) => void;
}

interface ShapeRound {
  targetShape: string;
  targetColor: string;
  options: { shape: string; color: string; id: number }[];
  correctId: number;
}

const SHAPES = ['●', '■', '▲', '◆', '★', '⬠'];
const SHAPE_COLORS = [
  'text-blue-500', 'text-red-500', 'text-green-500',
  'text-yellow-500', 'text-purple-500', 'text-pink-500',
];

function generateShapeRound(difficulty: number): ShapeRound {
  const shapeIdx = Math.floor(Math.random() * SHAPES.length);
  const colorIdx = Math.floor(Math.random() * SHAPE_COLORS.length);
  const targetShape = SHAPES[shapeIdx];
  const targetColor = SHAPE_COLORS[colorIdx];

  const optionCount = Math.min(4 + Math.floor(difficulty / 3), 9);
  const correctPos = Math.floor(Math.random() * optionCount);

  const options = Array.from({ length: optionCount }, (_, i) => {
    if (i === correctPos) return { shape: targetShape, color: targetColor, id: i };
    // Generate a distractor that differs in shape OR color
    let s = targetShape, c = targetColor;
    if (Math.random() > 0.5) {
      while (s === targetShape) s = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    } else {
      while (c === targetColor) c = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];
    }
    // Sometimes both differ for harder rounds
    if (difficulty > 4 && Math.random() > 0.6) {
      while (s === targetShape) s = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      while (c === targetColor) c = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];
    }
    return { shape: s, color: c, id: i };
  });

  return { targetShape, targetColor, options, correctId: correctPos };
}

const TOTAL_ROUNDS = 10;

const GameShapeFit: React.FC<GameShapeFitProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState<ShapeRound | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(8);

  const nextRound = useCallback(() => {
    setCurrentRound(generateShapeRound(round + 1));
    setSelectedId(null);
    setShowResult(false);
    setTimeLeft(Math.max(4, 8 - Math.floor(round / 3)));
  }, [round]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setRound(0);
    setCurrentRound(generateShapeRound(1));
    setTimeLeft(8);
  };

  useEffect(() => {
    if (!gameStarted || showResult || !currentRound) return;
    if (timeLeft <= 0) { handleSelect(-1); return; }
    const t = setTimeout(() => setTimeLeft(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameStarted, showResult, currentRound]);

  const handleSelect = (id: number) => {
    if (showResult) return;
    setSelectedId(id);
    setShowResult(true);
    const isCorrect = id === currentRound?.correctId;
    if (isCorrect) setScore(s => s + 10 + timeLeft * 2);

    setTimeout(() => {
      const next = round + 1;
      if (next >= TOTAL_ROUNDS) {
        const finalScore = isCorrect ? score + 10 + timeLeft * 2 : score;
        toast({ title: "Game Complete!", description: `Final score: ${finalScore}` });
        onComplete(finalScore);
      } else {
        setRound(next);
        setCurrentRound(generateShapeRound(next + 1));
        setSelectedId(null);
        setShowResult(false);
        setTimeLeft(Math.max(4, 8 - Math.floor(next / 3)));
      }
    }, 800);
  };

  if (!gameStarted) {
    return (
      <div className="w-full text-center space-y-4">
        <p className="text-lg font-medium">Find the matching shape & color!</p>
        <p className="text-sm text-muted-foreground">{TOTAL_ROUNDS} rounds • Gets harder • Speed bonus</p>
        <Button onClick={startGame} style={{ backgroundColor: game.color, color: "#fff" }}>Start Game</Button>
      </div>
    );
  }

  if (!currentRound) return null;

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Round {round + 1}/{TOTAL_ROUNDS}</span>
        <span className="text-sm font-bold">Score: {score}</span>
        <span className={`text-sm font-mono ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`}>⏱ {timeLeft}s</span>
      </div>

      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${(round / TOTAL_ROUNDS) * 100}%` }} />
      </div>

      {/* Target */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Find this shape:</p>
        <div className={`text-6xl ${currentRound.targetColor} mx-auto`}>
          {currentRound.targetShape}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3">
        {currentRound.options.map((opt) => {
          const isCorrect = opt.id === currentRound.correctId;
          const isSelected = opt.id === selectedId;
          let border = 'border-border';
          if (showResult && isCorrect) border = 'border-green-500 bg-green-500/10';
          if (showResult && isSelected && !isCorrect) border = 'border-red-500 bg-red-500/10';

          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: opt.id * 0.04 }}
              disabled={showResult}
              onClick={() => handleSelect(opt.id)}
              className={`aspect-square flex items-center justify-center rounded-xl border-2 text-3xl transition-all ${border} ${!showResult ? 'hover:border-primary hover:scale-105 cursor-pointer' : ''}`}
            >
              <span className={opt.color}>{opt.shape}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default GameShapeFit;
