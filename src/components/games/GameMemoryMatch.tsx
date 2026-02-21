
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Clock, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Sophisticated wellness-themed symbols instead of childish emojis
const SYMBOL_POOL = [
  { id: "mindfulness", label: "Mindfulness", icon: "🧘" },
  { id: "resilience", label: "Resilience", icon: "⛰️" },
  { id: "balance", label: "Balance", icon: "⚖️" },
  { id: "growth", label: "Growth", icon: "🌱" },
  { id: "clarity", label: "Clarity", icon: "💡" },
  { id: "serenity", label: "Serenity", icon: "🌊" },
  { id: "courage", label: "Courage", icon: "🦁" },
  { id: "wisdom", label: "Wisdom", icon: "📖" },
  { id: "harmony", label: "Harmony", icon: "🎶" },
  { id: "vitality", label: "Vitality", icon: "🔥" },
  { id: "focus", label: "Focus", icon: "🎯" },
  { id: "gratitude", label: "Gratitude", icon: "🙏" },
  { id: "empathy", label: "Empathy", icon: "🤝" },
  { id: "patience", label: "Patience", icon: "⏳" },
  { id: "confidence", label: "Confidence", icon: "💪" },
  { id: "peace", label: "Peace", icon: "🕊️" },
  { id: "creativity", label: "Creativity", icon: "🎨" },
  { id: "strength", label: "Strength", icon: "🏔️" },
];

interface Card {
  id: number;
  symbolId: string;
  label: string;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

type Difficulty = { label: string; pairs: number; cols: number };

const DIFFICULTIES: Difficulty[] = [
  { label: "Standard", pairs: 8, cols: 4 },
  { label: "Challenge", pairs: 12, cols: 6 },
];

const GameMemoryMatch: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const initGame = useCallback(() => {
    const symbols = [...SYMBOL_POOL].sort(() => Math.random() - 0.5).slice(0, difficulty.pairs);
    const deck: Card[] = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((sym, i) => ({
        id: i,
        symbolId: sym.id,
        label: sym.label,
        icon: sym.icon,
        flipped: false,
        matched: false,
      }));
    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
    setTimer(0);
    setIsPlaying(true);
  }, [difficulty]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (!isPlaying || gameComplete) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isPlaying, gameComplete]);

  useEffect(() => {
    const saved = localStorage.getItem(`memory-match-best-${difficulty.pairs}`);
    if (saved) setBestScore(parseInt(saved));
    else setBestScore(null);
  }, [difficulty]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length >= 2 || cards[index].flipped || cards[index].matched || gameComplete) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], flipped: true };
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (newCards[first].symbolId === newCards[second].symbolId) {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) =>
            i === first || i === second ? { ...c, matched: true } : c
          ));
          setFlippedIndices([]);
          const newMatches = matches + 1;
          setMatches(newMatches);
          if (newMatches === difficulty.pairs) {
            setGameComplete(true);
            setIsPlaying(false);
            const score = moves + 1;
            if (!bestScore || score < bestScore) {
              setBestScore(score);
              localStorage.setItem(`memory-match-best-${difficulty.pairs}`, score.toString());
            }
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) =>
            i === first || i === second ? { ...c, flipped: false } : c
          ));
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center py-6 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[60vh] rounded-xl shadow-2xl border border-[#B87333]/30">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-[#B87333]/20 border border-[#B87333]/30">
          <Brain className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <h2 className="text-2xl font-bold text-white">Memory Match</h2>
      </div>
      <p className="text-sm text-gray-400 text-center mb-4 max-w-md">
        Test your cognitive recall — find matching pairs of wellness concepts.
      </p>

      {/* Stats */}
      <div className="flex items-center gap-5 mb-4 text-sm">
        <span className="flex items-center gap-1.5 text-gray-300">
          <Clock className="w-4 h-4 text-[#D4AF37]" /> {formatTime(timer)}
        </span>
        <span className="text-gray-400">Moves: <strong className="text-white">{moves}</strong></span>
        <span className="text-gray-400">Pairs: <strong className="text-white">{matches}/{difficulty.pairs}</strong></span>
        {bestScore && (
          <span className="text-[#D4AF37] flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> {bestScore}
          </span>
        )}
      </div>

      {/* Difficulty */}
      <div className="flex gap-2 mb-5">
        {DIFFICULTIES.map(d => (
          <Button
            key={d.pairs}
            variant={difficulty.pairs === d.pairs ? "default" : "outline"}
            size="sm"
            onClick={() => setDifficulty(d)}
            className={difficulty.pairs === d.pairs
              ? "bg-gradient-to-r from-[#B87333] to-[#D4AF37] text-white border-0"
              : "border-gray-600 text-gray-300 hover:bg-gray-700"
            }
          >
            {d.label} ({d.pairs} pairs)
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div
        className="grid gap-2 mb-5"
        style={{
          gridTemplateColumns: `repeat(${difficulty.cols}, minmax(0, 1fr))`,
          maxWidth: difficulty.cols === 6 ? '420px' : '340px',
        }}
      >
        {cards.map((card, i) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(i)}
            whileTap={{ scale: 0.92 }}
            className={`
              aspect-square rounded-lg flex flex-col items-center justify-center font-semibold transition-all duration-200 border-2 relative overflow-hidden
              ${card.matched
                ? 'bg-[#B87333]/20 border-[#D4AF37]/50'
                : card.flipped
                  ? 'bg-gray-700 border-[#D4AF37]/60 shadow-lg shadow-[#D4AF37]/10'
                  : 'bg-gray-800 border-gray-600 hover:border-gray-400 cursor-pointer'
              }
            `}
            style={{ minWidth: difficulty.cols === 6 ? '56px' : '70px', minHeight: difficulty.cols === 6 ? '56px' : '70px' }}
          >
            {card.flipped || card.matched ? (
              <motion.div
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <span className={`${difficulty.cols === 6 ? 'text-xl' : 'text-2xl'}`}>{card.icon}</span>
                <span className={`text-gray-300 mt-0.5 ${difficulty.cols === 6 ? 'text-[9px]' : 'text-[10px]'} leading-tight`}>
                  {card.label}
                </span>
              </motion.div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#B87333]/40 to-[#D4AF37]/20 border border-[#B87333]/30" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Completion */}
      <AnimatePresence>
        {gameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-[#B87333]/20 to-[#D4AF37]/20 backdrop-blur-sm rounded-xl p-5 text-center shadow-lg mb-4 border border-[#D4AF37]/30"
          >
            <Trophy className="w-10 h-10 text-[#D4AF37] mx-auto mb-2" />
            <h3 className="text-xl font-bold text-white">Excellent Recall!</h3>
            <p className="text-gray-300 text-sm">
              {moves} moves • {formatTime(timer)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={initGame}
        className="bg-gradient-to-r from-[#B87333] to-[#D4AF37] text-white font-semibold"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        {gameComplete ? "Play Again" : "Restart"}
      </Button>
    </div>
  );
};

export default GameMemoryMatch;
