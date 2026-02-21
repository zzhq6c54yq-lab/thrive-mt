
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, CheckCircle, XCircle, Lightbulb, BookOpen, Trophy, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// Mental health & wellness vocabulary — adult-level words
const wordList = [
  { word: "RESILIENCE", hint: "The ability to recover from setbacks", category: "Strength" },
  { word: "MINDFULNESS", hint: "Present-moment, non-judgmental awareness", category: "Practice" },
  { word: "GRATITUDE", hint: "Appreciation for what one has", category: "Emotion" },
  { word: "EMPATHY", hint: "Understanding another's feelings", category: "Connection" },
  { word: "SERENITY", hint: "A state of calm and peace", category: "Wellbeing" },
  { word: "BOUNDARIES", hint: "Healthy limits in relationships", category: "Self-Care" },
  { word: "COMPASSION", hint: "Concern for the suffering of others", category: "Connection" },
  { word: "ACCEPTANCE", hint: "Embracing reality without resistance", category: "Practice" },
  { word: "MEDITATION", hint: "Practice of focused contemplation", category: "Practice" },
  { word: "VULNERABILITY", hint: "Courage to be open and authentic", category: "Strength" },
  { word: "PERSPECTIVE", hint: "A particular way of viewing things", category: "Growth" },
  { word: "EQUILIBRIUM", hint: "Mental or emotional balance", category: "Wellbeing" },
  { word: "INTENTION", hint: "A purposeful plan or aim", category: "Practice" },
  { word: "TRANQUILITY", hint: "Freedom from agitation of mind", category: "Wellbeing" },
  { word: "PERSEVERANCE", hint: "Persistence despite difficulty", category: "Strength" },
];

const scrambleWord = (word: string): string => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.join('') === word) return scrambleWord(word);
  return arr.join('');
};

const GameWordUnscramble: React.FC = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState<number>(() => {
    const saved = localStorage.getItem('word-unscramble-best');
    return saved ? parseInt(saved) : 0;
  });

  const currentWord = wordList[currentIndex];

  useEffect(() => {
    setScrambled(scrambleWord(currentWord.word));
    setGuess("");
    setShowResult(null);
    setShowHint(false);
  }, [currentIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim()) return;

    if (guess.toUpperCase().trim() === currentWord.word) {
      setShowResult('correct');
      const points = showHint ? 5 : 10;
      const newScore = score + points;
      setScore(newScore);
      setStreak(s => s + 1);

      setTimeout(() => {
        if (currentIndex < wordList.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setGameOver(true);
          if (newScore > bestScore) {
            setBestScore(newScore);
            localStorage.setItem('word-unscramble-best', newScore.toString());
          }
          toast({
            title: "Session Complete!",
            description: `Final score: ${newScore}/${wordList.length * 10}`,
          });
        }
      }, 1200);
    } else {
      setShowResult('incorrect');
      setStreak(0);
      setTimeout(() => setShowResult(null), 1000);
    }
  };

  const handleSkip = () => {
    setStreak(0);
    if (currentIndex < wordList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setGuess("");
    setShowResult(null);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center py-10 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[60vh] rounded-xl shadow-2xl border border-[#B87333]/30">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Trophy className="w-14 h-14 text-[#D4AF37] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Session Complete</h2>
          <p className="text-gray-300 text-lg mb-1">Score: <strong className="text-[#D4AF37]">{score}</strong> / {wordList.length * 10}</p>
          <p className="text-gray-400 text-sm mb-6">Best: {bestScore}</p>
          <Button onClick={handleRestart} className="bg-gradient-to-r from-[#B87333] to-[#D4AF37] text-white font-semibold">
            <RefreshCw className="w-4 h-4 mr-2" /> Play Again
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[60vh] rounded-xl shadow-2xl border border-[#B87333]/30">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-[#B87333]/20 border border-[#B87333]/30">
          <BookOpen className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <h2 className="text-2xl font-bold text-white">Word Unscramble</h2>
      </div>
      <p className="text-sm text-gray-400 text-center mb-5 max-w-md">
        Decode wellness vocabulary — strengthen your cognitive agility.
      </p>

      {/* Stats */}
      <div className="flex items-center gap-5 mb-5 text-sm">
        <span className="text-gray-400">Score: <strong className="text-[#D4AF37]">{score}</strong></span>
        <span className="text-gray-400">Word: <strong className="text-white">{currentIndex + 1}/{wordList.length}</strong></span>
        {streak > 1 && (
          <span className="text-orange-400 font-semibold">🔥 {streak} streak</span>
        )}
        {bestScore > 0 && (
          <span className="text-gray-500 flex items-center gap-1">
            <Trophy className="w-3 h-3" /> {bestScore}
          </span>
        )}
      </div>

      {/* Category tag */}
      <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#B87333]/15 text-[#D4AF37] border border-[#B87333]/30 mb-4">
        {currentWord.category}
      </span>

      {/* Scrambled Letters */}
      <div className="bg-gray-950 rounded-xl px-6 py-5 mb-5 border border-gray-700">
        <div className="flex gap-1.5 justify-center flex-wrap">
          {scrambled.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="w-9 h-11 flex items-center justify-center bg-gray-800 text-white text-lg font-bold rounded-lg border border-gray-600"
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-gray-400 mb-4 italic flex items-center gap-2"
          >
            <Lightbulb className="w-4 h-4 text-[#D4AF37]" />
            {currentWord.hint}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm">
        <Input
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          placeholder="Type your answer..."
          className={`text-center text-lg font-medium uppercase bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] ${
            showResult === 'correct'
              ? 'border-green-500 bg-green-900/20'
              : showResult === 'incorrect'
                ? 'border-red-500 bg-red-900/20'
                : ''
          }`}
          maxLength={currentWord.word.length + 2}
          autoComplete="off"
        />

        {showResult === 'correct' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" /> Correct!
          </motion.div>
        )}
        {showResult === 'incorrect' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-400">
            <XCircle className="w-5 h-5" /> Not quite — try again.
          </motion.div>
        )}

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={!guess.trim() || showResult === 'correct'}
            className="bg-gradient-to-r from-[#B87333] to-[#D4AF37] text-white font-semibold"
          >
            Check Answer
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowHint(true)}
            disabled={showHint}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Lightbulb className="w-4 h-4 mr-1" /> Hint
          </Button>
        </div>

        <div className="flex gap-3 mt-1">
          <Button
            type="button"
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-400 hover:text-white"
          >
            Skip <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleRestart}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Restart
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GameWordUnscramble;
