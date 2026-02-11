import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Grid, RotateCcw, Trophy, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EMOJI_POOL = [
  "🧠", "💜", "🌿", "🎯", "🦋", "🌸", "⭐", "🔮",
  "🎵", "🌊", "🍃", "💎", "🌈", "🕊️", "🌻", "🧘",
  "🎨", "📚", "🌙", "🔥"
];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const GameMemoryMatch: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gridSize, setGridSize] = useState(4); // 4x4 = 16 cards = 8 pairs
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const totalPairs = (gridSize * gridSize) / 2;

  const initGame = useCallback(() => {
    const pairCount = (gridSize * gridSize) / 2;
    const shuffled = [...EMOJI_POOL].sort(() => Math.random() - 0.5).slice(0, pairCount);
    const deck = [...shuffled, ...shuffled]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setGameComplete(false);
    setTimer(0);
    setIsPlaying(true);
  }, [gridSize]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (!isPlaying || gameComplete) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isPlaying, gameComplete]);

  useEffect(() => {
    const saved = localStorage.getItem(`memory-match-best-${gridSize}`);
    if (saved) setBestScore(parseInt(saved));
  }, [gridSize]);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length >= 2 ||
      cards[index].flipped ||
      cards[index].matched ||
      gameComplete
    ) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (newCards[first].emoji === newCards[second].emoji) {
        setTimeout(() => {
          const matched = [...newCards];
          matched[first].matched = true;
          matched[second].matched = true;
          setCards(matched);
          setFlippedIndices([]);
          const newMatches = matches + 1;
          setMatches(newMatches);
          if (newMatches === totalPairs) {
            setGameComplete(true);
            setIsPlaying(false);
            const score = moves + 1;
            if (!bestScore || score < bestScore) {
              setBestScore(score);
              localStorage.setItem(`memory-match-best-${gridSize}`, score.toString());
            }
          }
        }, 400);
      } else {
        setTimeout(() => {
          const reset = [...newCards];
          reset[first].flipped = false;
          reset[second].flipped = false;
          setCards(reset);
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center py-6 px-4 bg-gradient-to-br from-teal-200 to-lime-100 min-h-[60vh] rounded-xl shadow-lg">
      <Grid className="w-10 h-10 text-lime-600 mb-2" />
      <h2 className="text-2xl font-bold mb-1 text-lime-900">Memory Match</h2>
      <p className="text-sm text-lime-700 text-center mb-4 max-w-md">
        Flip cards and find matching pairs. Train your memory!
      </p>

      {/* Stats bar */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <span className="flex items-center gap-1 text-lime-800">
          <Clock className="w-4 h-4" /> {formatTime(timer)}
        </span>
        <span className="text-lime-800">Moves: {moves}</span>
        <span className="text-lime-800">Matches: {matches}/{totalPairs}</span>
        {bestScore && <span className="text-emerald-700 font-semibold">Best: {bestScore} moves</span>}
      </div>

      {/* Difficulty selector */}
      <div className="flex gap-2 mb-4">
        {[{ label: "Easy", size: 4 }, { label: "Hard", size: 6 }].map(d => (
          <Button
            key={d.size}
            variant={gridSize === d.size ? "default" : "outline"}
            size="sm"
            onClick={() => { setGridSize(d.size); }}
            className={gridSize === d.size ? "bg-lime-600 hover:bg-lime-700" : ""}
          >
            {d.label} ({d.size}x{d.size})
          </Button>
        ))}
      </div>

      {/* Game grid */}
      <div
        className="grid gap-2 mb-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: gridSize === 6 ? '360px' : '280px'
        }}
      >
        {cards.map((card, i) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(i)}
            className={`aspect-square rounded-lg text-2xl flex items-center justify-center font-bold transition-all border-2
              ${card.matched
                ? 'bg-emerald-200 border-emerald-400 scale-95'
                : card.flipped
                  ? 'bg-white border-lime-400 shadow-md'
                  : 'bg-lime-500 border-lime-600 hover:bg-lime-400 cursor-pointer shadow-sm'
              }`}
            whileTap={{ scale: 0.9 }}
            style={{ fontSize: gridSize === 6 ? '1.2rem' : '1.5rem' }}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </motion.button>
        ))}
      </div>

      {/* Game complete */}
      <AnimatePresence>
        {gameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg mb-4"
          >
            <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-lime-900">Great Job!</h3>
            <p className="text-lime-700">
              Completed in {moves} moves • {formatTime(timer)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={initGame}
        className="bg-gradient-to-r from-lime-500 to-green-400 text-lime-900 font-bold"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        {gameComplete ? "Play Again" : "Restart"}
      </Button>
    </div>
  );
};

export default GameMemoryMatch;
