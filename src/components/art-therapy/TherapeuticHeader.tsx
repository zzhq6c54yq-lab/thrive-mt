import React from "react";
import { Mode, ThemeKey } from "@/types/artTherapyTypes";
import { THERAPY_THEMES } from "@/data/therapeuticThemes";

interface Props {
  currentTheme: ThemeKey;
  setCurrentTheme: (theme: ThemeKey) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  isFullscreen: boolean;
  setIsFullscreen: (fullscreen: boolean) => void;
}

const ModeTab: React.FC<{ current: Mode; label: string; onClick: () => void }> = ({ current, label, onClick }) => {
  const active =
    (current === "FREE_DRAW" && label.startsWith("Free")) ||
    (current === "PAINT_BY_NUMBERS" && label.startsWith("Guided")) ||
    (current === "MANDALA" && label.startsWith("Mindful"));
  
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md border text-sm transition-all hover-scale ${
        active ? "bg-white text-gray-800 border-gray-300 shadow-md" : "bg-white/60 text-gray-600 border-gray-200 hover:bg-white/80"
      }`}
    >
      {label}
    </button>
  );
};

export const TherapeuticHeader: React.FC<Props> = ({
  currentTheme,
  setCurrentTheme,
  mode,
  setMode,
  isFullscreen,
  setIsFullscreen
}) => {
  const currentThemeData = THERAPY_THEMES[currentTheme];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg animate-scale-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Art Therapy Studio</h2>
          <p className="text-sm text-gray-600">
            <span className="font-medium">{currentThemeData.name}</span> • {currentThemeData.benefit}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-3 py-1.5 text-sm bg-white/80 hover:bg-white rounded-md border border-gray-200 transition-all hover-scale"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? "Exit Fullscreen" : "🖼️ Fullscreen"}
          </button>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-medium text-gray-700">Therapeutic Theme:</span>
        {Object.entries(THERAPY_THEMES).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => setCurrentTheme(key as ThemeKey)}
            className={`px-3 py-1.5 text-xs rounded-md border transition-all hover-scale ${
              currentTheme === key
                ? "bg-white text-gray-800 border-gray-300 shadow-md"
                : "bg-white/60 text-gray-600 border-gray-200 hover:bg-white/80"
            }`}
            title={theme.description}
          >
            {theme.name}
          </button>
        ))}
      </div>

      {/* Mode Selection */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Activity:</span>
        <ModeTab current={mode} label="Free Expression" onClick={() => setMode("FREE_DRAW")} />
        <ModeTab current={mode} label="Guided Coloring" onClick={() => setMode("PAINT_BY_NUMBERS")} />
        <ModeTab current={mode} label="Mindful Mandala" onClick={() => setMode("MANDALA")} />
      </div>
    </div>
  );
};