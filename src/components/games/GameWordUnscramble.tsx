
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const WORDS = ["thrive", "mental", "growth", "courage", "calm", "happy"];

const shuffle = (word: string) =>
  word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

interface GameWordUnscrambleProps {
  onComplete?: (score: number) => void;
  // future: optionally accept difficulty, etc.
}

const GameWordUnscramble: React.FC<GameWordUnscrambleProps> = ({ onComplete }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentWord = WORDS[wordIdx];
  const scrambled = shuffle(currentWord);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === currentWord) {
      setScore(s => s + 10);
      setMessage("✅ Correct!");
      if (wordIdx + 1 < WORDS.length) {
        setTimeout(() => {
          setWordIdx(idx => idx + 1);
          setInput("");
          setMessage("");
        }, 900);
      } else {
        setFinished(true);
        if (onComplete) onComplete(score + 10);
      }
    } else {
      setMessage("❌ Try again!");
    }
  };

  const handleRestart = () => {
    setWordIdx(0);
    setInput("");
    setMessage("");
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Word Unscramble</h2>
      {!finished ? (
        <>
          <div className="mb-3 text-xl font-mono bg-zinc-100 px-4 py-2 rounded">{scrambled}</div>
          <form onSubmit={handleSubmit} className="mb-2 flex flex-col items-center">
            <input
              className="border rounded p-2 w-40 text-center text-lg"
              placeholder="Unscramble..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              aria-label="Unscramble the word"
            />
            <Button type="submit" className="mt-2 bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white">
              Submit
            </Button>
          </form>
          <div className="min-h-[28px] text-base font-semibold">{message}</div>
          <div className="mt-2 text-sm">Score: <span className="font-bold">{score}</span></div>
        </>
      ) : (
        <>
          <div className="mb-4 text-green-600 font-bold">You win! 🎉 Final score: {score}</div>
          <Button onClick={handleRestart} className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white">
            Play Again
          </Button>
        </>
      )}
    </div>
  );
};

export default GameWordUnscramble;
