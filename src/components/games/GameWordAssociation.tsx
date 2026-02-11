import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface GameWordAssociationProps {
  game: Game;
  onComplete: (score: number) => void;
}

interface WordRound {
  prompt: string;
  correctAnswer: string;
  options: string[];
  category: string;
}

const WORD_SETS: WordRound[] = [
  { prompt: "Sun", correctAnswer: "Moon", options: ["Moon", "Water", "Chair", "Book"], category: "Opposites" },
  { prompt: "Doctor", correctAnswer: "Hospital", options: ["Hospital", "Library", "Market", "Stadium"], category: "Places" },
  { prompt: "Brush", correctAnswer: "Paint", options: ["Paint", "Drive", "Swim", "Cook"], category: "Tools" },
  { prompt: "Rain", correctAnswer: "Umbrella", options: ["Umbrella", "Sunglasses", "Scarf", "Gloves"], category: "Association" },
  { prompt: "Bee", correctAnswer: "Honey", options: ["Honey", "Milk", "Bread", "Juice"], category: "Products" },
  { prompt: "Key", correctAnswer: "Lock", options: ["Lock", "Bridge", "Fence", "Gate"], category: "Pairs" },
  { prompt: "Pen", correctAnswer: "Paper", options: ["Paper", "Stone", "Metal", "Glass"], category: "Pairs" },
  { prompt: "Teacher", correctAnswer: "Student", options: ["Student", "Patient", "Client", "Guest"], category: "Roles" },
  { prompt: "Seed", correctAnswer: "Flower", options: ["Flower", "Rock", "River", "Cloud"], category: "Growth" },
  { prompt: "Joy", correctAnswer: "Sadness", options: ["Sadness", "Anger", "Fear", "Boredom"], category: "Emotions" },
  { prompt: "Winter", correctAnswer: "Snow", options: ["Snow", "Sand", "Leaves", "Pollen"], category: "Seasons" },
  { prompt: "Music", correctAnswer: "Rhythm", options: ["Rhythm", "Color", "Texture", "Weight"], category: "Elements" },
];

const TOTAL_ROUNDS = 8;

const GameWordAssociation: React.FC<GameWordAssociationProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState<WordRound | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());

  const pickRound = useCallback(() => {
    let idx: number;
    const available = WORD_SETS.map((_, i) => i).filter(i => !usedIndices.has(i));
    if (available.length === 0) {
      idx = Math.floor(Math.random() * WORD_SETS.length);
    } else {
      idx = available[Math.floor(Math.random() * available.length)];
    }
    setUsedIndices(prev => new Set(prev).add(idx));
    const r = { ...WORD_SETS[idx], options: [...WORD_SETS[idx].options].sort(() => Math.random() - 0.5) };
    setCurrentRound(r);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(10);
  }, [usedIndices]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setRound(0);
    setUsedIndices(new Set());
    pickRound();
  };

  useEffect(() => {
    if (!gameStarted || showResult || !currentRound) return;
    if (timeLeft <= 0) { handleAnswer('__timeout__'); return; }
    const t = setTimeout(() => setTimeLeft(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameStarted, showResult, currentRound]);

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    const isCorrect = answer === currentRound?.correctAnswer;
    if (isCorrect) setScore(s => s + 10 + Math.max(0, timeLeft));

    setTimeout(() => {
      const next = round + 1;
      if (next >= TOTAL_ROUNDS) {
        const finalScore = isCorrect ? score + 10 + Math.max(0, timeLeft) : score;
        toast({ title: "Game Complete!", description: `Final score: ${finalScore}` });
        onComplete(finalScore);
      } else {
        setRound(next);
        pickRound();
      }
    }, 1200);
  };

  if (!gameStarted) {
    return (
      <div className="w-full text-center space-y-4">
        <p className="text-lg font-medium">Match words by their associations!</p>
        <p className="text-sm text-muted-foreground">{TOTAL_ROUNDS} rounds • Speed bonus</p>
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

      <div className="text-center space-y-1">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{currentRound.category}</span>
        <motion.p key={round} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-4xl font-bold">
          {currentRound.prompt}
        </motion.p>
        <p className="text-sm text-muted-foreground">Which word is most closely associated?</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {currentRound.options.map((option, i) => {
          const isCorrect = option === currentRound.correctAnswer;
          const isSelected = option === selectedAnswer;
          let cls = 'bg-card hover:bg-accent border';
          if (showResult && isCorrect) cls = 'bg-green-500/20 border-green-500';
          if (showResult && isSelected && !isCorrect) cls = 'bg-red-500/20 border-red-500';

          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              disabled={showResult}
              onClick={() => handleAnswer(option)}
              className={`p-4 rounded-lg text-base font-medium transition-colors ${cls}`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default GameWordAssociation;
