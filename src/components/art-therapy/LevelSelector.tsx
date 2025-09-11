import React from "react";
import { PaintByNumbersTemplate } from "@/types/artTherapyTypes";

interface Props {
  templates: Record<string, PaintByNumbersTemplate>;
  currentLevel: string;
  onLevelChange: (level: string, template: PaintByNumbersTemplate) => void;
}

export const LevelSelector: React.FC<Props> = ({ 
  templates, 
  currentLevel, 
  onLevelChange 
}) => {
  return (
    <div className="rounded-lg border border-white/30 p-4 bg-white/80 backdrop-blur-sm shadow-lg flex flex-wrap items-center gap-4">
      <span className="text-sm font-medium text-gray-800">Complexity Level:</span>
      <div className="flex items-center gap-2">
        {Object.entries(templates).map(([key, template]) => (
          <button
            key={key}
            onClick={() => onLevelChange(key, template)}
            className={`px-3 py-1.5 text-sm rounded-md border transition-all hover-scale ${
              currentLevel === key
                ? "bg-white text-gray-800 border-gray-300 shadow-md"
                : "bg-white/60 text-gray-600 border-gray-200 hover:bg-white/80"
            }`}
          >
            {template.name} ({template.regions} regions)
          </button>
        ))}
      </div>
    </div>
  );
};