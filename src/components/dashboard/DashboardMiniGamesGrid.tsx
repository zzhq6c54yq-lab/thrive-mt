
import React from "react";
import PlaceholderMiniGame from "@/components/dashboard/PlaceholderMiniGame";
import { useNavigate } from "react-router-dom";
import useTranslation from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";

/**
 * Upgraded grid: two playable, rest still "coming soon".
 */
const MINI_GAME_FEATURES = [
  { title: "Memory Match", playable: true, route: "/games/memory-match" },
  { title: "Word Unscramble", playable: true, route: "/games/word-scramble" },
  { title: "Sleep Tracker", playable: false },
  { title: "Career Coaching", playable: false },
  { title: "Meditation Studio", playable: false }
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
      {MINI_GAME_FEATURES.map((feature) =>
        feature.playable ? (
          <div key={feature.title} className="flex flex-col items-center justify-center min-h-[200px] p-8 bg-zinc-100 rounded shadow">
            <h3 className="text-xl font-bold text-zinc-700 mb-3">{feature.title}</h3>
            <Button 
              onClick={() => feature.route && navigate(feature.route)}
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white hover:scale-105 transition"
            >
              {labels.play}
            </Button>
          </div>
        ) : (
          <PlaceholderMiniGame key={feature.title} title={feature.title} comingSoon={labels.comingSoon} />
        )
      )}
    </div>
  );
};

export default DashboardMiniGamesGrid;
