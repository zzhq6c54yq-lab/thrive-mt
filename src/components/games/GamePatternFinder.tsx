import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface GamePatternFinderProps {
  game: Game;
  onComplete: (score: number) => void;
}

type PatternType = 'number' | 'shape' | 'color';

interface PatternRound {
  sequence: string[];
  options: string[];
  correctAnswer: string;
  type: PatternType;
}

const SHAPES = ['●', '■', '▲', '◆', '★', '⬟'];
const COLORS = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];

function generateNumberPattern(): PatternRound {
  const patterns = [
    { rule: (i: number) => 2 * i + 1, name: 'odd' },
    { rule: (i: number) => i * i, name: 'squares' },
    { rule: (i: number) => i * 3, name: 'multiples3' },
    { rule: (i: number) => Math.pow(2, i), name: 'powers2' },
    { rule: (i: number) => i * (i + 1) / 2, name: 'triangular' },
  ];
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  const start = Math.floor(Math.random() * 3) + 1;
  const sequence = Array.from({ length: 4 }, (_, i) => String(pattern.rule(start + i)));
  const correct = String(pattern.rule(start + 4));
  const wrong1 = String(Number(correct) + Math.floor(Math.random() * 5) + 1);
  const wrong2 = String(Number(correct) - Math.floor(Math.random() * 3) - 1);
  const wrong3 = String(Number(correct) + Math.floor(Math.random() * 10) - 5 || Number(correct) + 7);
  const options = [correct, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
  return { sequence, options, correctAnswer: correct, type: 'number' };
}

function generateShapePattern(): PatternRound {
  const base = SHAPES.slice(0, 3);
  const repeated = [...base, ...base].slice(0, 4);
  const correct = base[0];
  const wrongs = SHAPES.filter(s => s !== correct).slice(0, 3);
  const options = [correct, ...wrongs].sort(() => Math.random() - 0.5);
  return { sequence: repeated, options, correctAnswer: correct, type: 'shape' };
}

function generateColorPattern(): PatternRound {
  const base = COLORS.slice(0, 3);
  const repeated = [...base, ...base].slice(0, 4);
  const correct = base[0];
  const wrongs = COLORS.filter(c => c !== correct).slice(0, 3);
  const options = [correct, ...wrongs].sort(() => Math.random() - 0.5);
  return { sequence: repeated, options, correctAnswer: correct, type: 'color' };
}

function generateRound(): PatternRound {
  const generators = [generateNumberPattern, generateShapePattern, generateColorPattern];
  return generators[Math.floor(Math.random() * generators.length)]();
}

const TOTAL_ROUNDS = 8;

const GamePatternFinder: React.FC<GamePatternFinderProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState<PatternRound | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const nextRound = useCallback(() => {
    setCurrentRound(generateRound());
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setRound(0);
    nextRound();
  };

  useEffect(() => {
    if (!gameStarted || showResult || !currentRound) return;
    if (timeLeft <= 0) {
      handleAnswer('__timeout__');
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, showResult, currentRound]);

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    const isCorrect = answer === currentRound?.correctAnswer;
    if (isCorrect) {
      const bonus = Math.max(1, Math.ceil(timeLeft / 3));
      setScore(s => s + 10 + bonus);
    }

    setTimeout(() => {
      const nextRoundNum = round + 1;
      if (nextRoundNum >= TOTAL_ROUNDS) {
        const finalScore = isCorrect ? score + 10 + Math.max(1, Math.ceil(timeLeft / 3)) : score;
        toast({ title: "Game Complete!", description: `Final score: ${finalScore}` });
        onComplete(finalScore);
      } else {
        setRound(nextRoundNum);
        nextRound();
      }
    }, 1200);
  };

  if (!gameStarted) {
    return (
      <div className="w-full text-center space-y-4">
        <p className="text-lg font-medium">Find the next item in each sequence!</p>
        <p className="text-sm text-muted-foreground">{TOTAL_ROUNDS} rounds • Numbers, shapes & colors</p>
        <Button onClick={startGame} style={{ backgroundColor: game.color, color: "#fff" }}>Start Game</Button>
      </div>
    );
  }

  if (!currentRound) return null;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Round {round + 1}/{TOTAL_ROUNDS}</span>
        <span className="text-sm font-bold">Score: {score}</span>
        <span className={`text-sm font-mono ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`}>
          ⏱ {timeLeft}s
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${((round) / TOTAL_ROUNDS) * 100}%` }} />
      </div>

      {/* Sequence */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-3">What comes next?</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {currentRound.sequence.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              className="w-14 h-14 flex items-center justify-center rounded-lg bg-card border border-border text-xl font-bold"
            >
              {item}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-14 h-14 flex items-center justify-center rounded-lg border-2 border-dashed border-primary/50 text-2xl text-primary"
          >
            ?
          </motion.div>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence>
          {currentRound.options.map((option, i) => {
            const isCorrect = option === currentRound.correctAnswer;
            const isSelected = option === selectedAnswer;
            let bg = 'bg-card hover:bg-accent';
            if (showResult && isCorrect) bg = 'bg-green-500/20 border-green-500';
            if (showResult && isSelected && !isCorrect) bg = 'bg-red-500/20 border-red-500';

            return (
              <motion.button
                key={option + i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                disabled={showResult}
                onClick={() => handleAnswer(option)}
                className={`p-4 rounded-lg border text-lg font-semibold transition-colors ${bg} ${showResult ? '' : 'cursor-pointer'}`}
              >
                {option}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamePatternFinder;
