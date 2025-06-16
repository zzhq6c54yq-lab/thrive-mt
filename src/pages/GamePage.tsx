
import React from "react";
import { useParams } from "react-router-dom";
import Page from "@/components/Page";
import GameMiniSudoku from "@/components/games/GameMiniSudoku";
import GameMemoryMatch from "@/components/games/GameMemoryMatch";
import GameWordUnscramble from "@/components/games/GameWordUnscramble";
import GameSleepTracker from "@/components/games/GameSleepTracker";
import GameMeditationStudio from "@/components/games/GameMeditationStudio";
import GameCareerCoaching from "@/components/games/GameCareerCoaching";

const GamePage: React.FC = () => {
  const { gameId } = useParams();

  const renderGame = () => {
    switch (gameId) {
      case "mini-sudoku":
        return <GameMiniSudoku />;
      case "memory-match":
        return <GameMemoryMatch />;
      case "word-unscramble":
        return <GameWordUnscramble />;
      case "sleep-tracker":
        return <GameSleepTracker />;
      case "meditation-studio":
        return <GameMeditationStudio />;
      case "career-coaching":
        return <GameCareerCoaching />;
      default:
        return (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Game Not Found</h2>
            <p className="text-gray-600">The requested game could not be found.</p>
          </div>
        );
    }
  };

  const getGameTitle = () => {
    switch (gameId) {
      case "mini-sudoku":
        return "Mini Sudoku";
      case "memory-match":
        return "Memory Match";
      case "word-unscramble":
        return "Word Unscramble";
      case "sleep-tracker":
        return "Sleep Tracker";
      case "meditation-studio":
        return "Meditation Studio";
      case "career-coaching":
        return "Career Coaching";
      default:
        return "Game";
    }
  };

  return (
    <Page title={getGameTitle()} returnToMain>
      <div className="container mx-auto px-4 py-8">
        {renderGame()}
      </div>
    </Page>
  );
};

export default GamePage;
