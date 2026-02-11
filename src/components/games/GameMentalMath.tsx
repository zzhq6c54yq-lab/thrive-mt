import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Game } from "@/data/gamesData";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface GameMentalMathProps {
  game: Game;
  onComplete: (score: number) => void;
}

interface MathProblem {
  question: string;
  answer: number;
}

function generateProblem(difficulty: number): MathProblem {
  const ops = ['+', '-', '×'];
  const op = ops[Math.floor(Math.random() * (difficulty > 5 ? 3 : 2))];
  const max = Math.min(10 + difficulty * 5, 50);
  let a = Math.floor(Math.random() * max) + 1;
  let b = Math.floor(Math.random() * max) + 1;
  let answer: number;

  switch (op) {
    case '+': answer = a + b; break;
    case '-':
      if (b > a) [a, b] = [b, a];
      answer = a - b; break;
    case '×':
      b = Math.floor(Math.random() * 12) + 1;
      answer = a * b; break;
    default: answer = a + b;
  }
  return { question: `${a} ${op} ${b}`, answer };
}

const TOTAL_PROBLEMS = 10;

const GameMentalMath: React.FC<GameMentalMathProps> = ({ game, onComplete }) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
  const [timeLeft, setTimeLeft] = useState(12);
  const [streak, setStreak] = useState(0);

  const nextProblem = useCallback(() => {
    setProblem(generateProblem(round + 1));
    setUserAnswer('');
    setShowResult(null);
    setTimeLeft(12);
  }, [round]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setRound(0);
    setStreak(0);
    setProblem(generateProblem(1));
    setTimeLeft(12);
  };

  useEffect(() => {
    if (!gameStarted || showResult || !problem) return;
    if (timeLeft <= 0) {
      submitAnswer(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, showResult, problem]);

  const submitAnswer = (timedOut = false) => {
    if (showResult) return;
    const isCorrect = !timedOut && Number(userAnswer) === problem?.answer;
    setShowResult(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      const bonus = Math.ceil(timeLeft / 2) + streak * 2;
      setScore(s => s + 10 + bonus);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      const nextRound = round + 1;
      if (nextRound >= TOTAL_PROBLEMS) {
        const finalScore = isCorrect ? score + 10 + Math.ceil(timeLeft / 2) + streak * 2 : score;
        toast({ title: "Game Complete!", description: `Final score: ${finalScore}` });
        onComplete(finalScore);
      } else {
        setRound(nextRound);
        setProblem(generateProblem(nextRound + 1));
        setUserAnswer('');
        setShowResult(null);
        setTimeLeft(12);
      }
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submitAnswer();
  };

  if (!gameStarted) {
    return (
      <div className="w-full text-center space-y-4">
        <p className="text-lg font-medium">Solve math problems as fast as you can!</p>
        <p className="text-sm text-muted-foreground">{TOTAL_PROBLEMS} problems • Speed bonus • Streak multiplier</p>
        <Button onClick={startGame} style={{ backgroundColor: game.color, color: "#fff" }}>Start Game</Button>
      </div>
    );
  }

  if (!problem) return null;

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Problem {round + 1}/{TOTAL_PROBLEMS}</span>
        <span className="text-sm font-bold">Score: {score}</span>
        <span className={`text-sm font-mono ${timeLeft <= 4 ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`}>
          ⏱ {timeLeft}s
        </span>
      </div>

      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${((round) / TOTAL_PROBLEMS) * 100}%` }} />
      </div>

      {streak > 1 && (
        <div className="text-center text-xs font-bold text-amber-500">🔥 {streak} streak! +{streak * 2} bonus</div>
      )}

      <motion.div
        key={round}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <p className="text-5xl font-bold tracking-wider">{problem.question}</p>
      </motion.div>

      <div className="flex gap-3">
        <Input
          type="number"
          inputMode="numeric"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Your answer"
          disabled={!!showResult}
          autoFocus
          className="text-center text-xl font-bold h-14"
        />
        <Button
          onClick={() => submitAnswer()}
          disabled={!!showResult || !userAnswer}
          style={{ backgroundColor: game.color, color: "#fff" }}
          className="h-14 px-8"
        >
          Submit
        </Button>
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-3 rounded-lg ${showResult === 'correct' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
        >
          {showResult === 'correct' ? '✓ Correct!' : `✗ Answer was ${problem.answer}`}
        </motion.div>
      )}
    </div>
  );
};

export default GameMentalMath;
