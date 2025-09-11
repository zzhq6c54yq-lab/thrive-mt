import React from "react";
import { ThemeKey } from "@/types/artTherapyTypes";
import { THERAPY_THEMES, THERAPEUTIC_PROMPTS } from "@/data/therapeuticThemes";

interface Props {
  currentTheme: ThemeKey;
  selectedPrompt: string;
  setSelectedPrompt: (prompt: string) => void;
  reflection: string;
  setReflection: (reflection: string) => void;
  isFullscreen: boolean;
}

export const TherapeuticSidebar: React.FC<Props> = ({
  currentTheme,
  selectedPrompt,
  setSelectedPrompt,
  reflection,
  setReflection,
  isFullscreen
}) => {
  const currentThemeData = THERAPY_THEMES[currentTheme];
  const currentPrompts = THERAPEUTIC_PROMPTS[currentTheme];

  return (
    <aside className={`${isFullscreen ? 'xl:col-span-1' : 'lg:col-span-1'} space-y-4`}>
      {/* Therapeutic Prompts */}
      <div className="rounded-lg border border-white/30 p-4 bg-white/80 backdrop-blur-sm shadow-lg animate-fade-in">
        <h3 className="font-semibold mb-3 text-gray-800">Guided Prompts</h3>
        <p className="text-xs text-gray-600 mb-3">{currentThemeData.description}</p>
        <div className="space-y-2">
          {currentPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setSelectedPrompt(prompt)}
              className={`w-full text-left p-2 rounded-md text-sm transition-all hover-scale ${
                selectedPrompt === prompt
                  ? "bg-white text-gray-800 shadow-md border border-gray-200"
                  : "bg-white/60 text-gray-700 hover:bg-white/80"
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Reflection */}
      <div className="rounded-lg border border-white/30 p-4 bg-white/80 backdrop-blur-sm shadow-lg">
        <h3 className="font-semibold mb-2 text-gray-800">Reflection Space</h3>
        {selectedPrompt && (
          <div className="mb-3 p-2 bg-blue-50 rounded-md border border-blue-200">
            <p className="text-xs text-blue-800 font-medium">Current prompt:</p>
            <p className="text-sm text-blue-700">{selectedPrompt}</p>
          </div>
        )}
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="w-full h-32 p-3 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-sm bg-white/90"
          placeholder="How did this creative process feel? What emotions came up? What did you discover?"
        />
      </div>
    </aside>
  );
};