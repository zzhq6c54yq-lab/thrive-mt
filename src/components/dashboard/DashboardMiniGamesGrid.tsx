
import React from "react";
// PlaceholderMiniGame removed - all games are now playable
import { useNavigate } from "react-router-dom";
import useTranslation from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";

/**
 * All mini games are now playable with correct routes.
 */
const MINI_GAME_FEATURES = [
  { title: "Mini Sudoku", playable: true, route: "/app/games/mini-sudoku" },
  { title: "Memory Match", playable: true, route: "/app/games/memory-match" },
  { title: "Word Unscramble", playable: true, route: "/app/games/word-unscramble" },
  { title: "Sleep Tracker", playable: true, route: "/app/sleep-tracker" },
  { title: "Career Coaching", playable: true, route: "/app/career-coaching" },
  { title: "Meditation Studio", playable: true, route: "/app/meditation-studio" }
];

const DashboardMiniGamesGrid: React.FC = () => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();
  const labels = {
    comingSoon: isSpanish ? "¡Próximamente!" : "Coming soon!",
    play: isSpanish ? "Jugar" : "Play"
  };

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {MINI_GAME_FEATURES.map((feature) => (
        <div key={feature.title} className="flex flex-col items-center justify-center min-h-[200px] p-8 bg-zinc-100 rounded shadow hover-scale cursor-pointer">
          <h3 className="text-xl font-bold text-zinc-700 mb-3">{feature.title}</h3>
          <Button 
            onClick={() => feature.route && navigate(feature.route)}
            className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white font-semibold shadow-md hover:scale-105 transition duration-150 w-40 h-14 text-lg rounded-xl"
            style={{ minWidth: "10rem", minHeight: "3.5rem", fontSize: "1.2rem" }}
          >
            {labels.play}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DashboardMiniGamesGrid;
