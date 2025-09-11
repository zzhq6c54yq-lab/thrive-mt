import React from "react";
import { Mode, Tool, StampType, ThemeKey } from "@/types/artTherapyTypes";
import { THERAPY_THEMES } from "@/data/therapeuticThemes";

interface Props {
  mode: Mode;
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  stamp: StampType;
  setStamp: (stamp: StampType) => void;
  symmetry: number;
  setSymmetry: (symmetry: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onExport: () => void;
  onSave: () => void;
  currentTheme: ThemeKey;
}

const DEFAULT_BRUSH_SIZES = [2, 4, 8, 12, 18, 24];
const DEFAULT_OPACITIES = [1, 0.8, 0.6, 0.4, 0.2];

const btn = (primary = false) => `px-3 py-1.5 text-sm rounded-md border transition-all hover-scale ${
  primary
    ? "bg-white text-gray-800 border-gray-300 shadow-md"
    : "bg-white/80 text-gray-700 border-gray-200 hover:bg-white"
}`;

const Select: React.FC<{ value: string; setValue: (v: string) => void; options: string[] }> = ({ value, setValue, options }) => (
  <select
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="px-2 py-1 rounded-md border border-gray-200 bg-white/90 text-sm"
  >
    {options.map((o) => (
      <option key={o} value={o}>{o}</option>
    ))}
  </select>
);

export const ArtToolbar: React.FC<Props> = ({
  mode, tool, setTool, color, setColor, brushSize, setBrushSize, 
  opacity, setOpacity, stamp, setStamp, symmetry, setSymmetry,
  onUndo, onRedo, onClear, onExport, onSave, currentTheme
}) => {
  const currentPalette = THERAPY_THEMES[currentTheme].palette;

  return (
    <div className="w-full rounded-lg border border-white/30 bg-white/80 backdrop-blur-sm shadow-lg p-3 flex flex-wrap items-center gap-3 animate-scale-in">
      <div className="flex items-center gap-1">
        <button
          className={btn(tool === "BRUSH")}
          onClick={() => setTool("BRUSH")}
          title="Brush - Express freely"
        >🖌️ Brush</button>
        <button
          className={btn(tool === "ERASER")}
          onClick={() => setTool("ERASER")}
          title="Eraser - Let go and release"
        >🧽 Eraser</button>
        {mode !== "PAINT_BY_NUMBERS" && (
          <button
            className={btn(tool === "FILL")}
            onClick={() => setTool("FILL")}
            title="Fill - Complete and nurture"
          >🪣 Fill</button>
        )}
        <button
          className={btn(tool === "STAMP")}
          onClick={() => setTool("STAMP")}
          title="Stamp - Add joy and playfulness"
        >✨ Stamp</button>
      </div>

      {tool === "STAMP" && (
        <div className="flex items-center gap-1 ml-1">
          <Select 
            value={stamp} 
            setValue={(v) => setStamp(v as StampType)} 
            options={["HEART","STAR","SMILE"]} 
          />
        </div>
      )}

      <div className="h-6 w-px bg-gray-300 mx-1" />

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-700 font-medium">Therapeutic Colors</span>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          className="h-8 w-8 p-0 border rounded-md" 
        />
        <div className="flex items-center gap-1">
          {currentPalette.slice(0, 8).map((c) => (
            <button
              key={c}
              className="h-7 w-7 rounded-md border-2 border-white shadow-sm hover-scale transition-all"
              style={{ background: c }}
              onClick={() => setColor(c)}
              title={c}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-700 font-medium">Size</span>
        <Select 
          value={String(brushSize)} 
          setValue={(v) => setBrushSize(Number(v))} 
          options={DEFAULT_BRUSH_SIZES.map(String)} 
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-700 font-medium">Opacity</span>
        <Select 
          value={String(opacity)} 
          setValue={(v) => setOpacity(Number(v))} 
          options={DEFAULT_OPACITIES.map(String)} 
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-700 font-medium">Symmetry</span>
        <Select 
          value={String(symmetry)} 
          setValue={(v) => setSymmetry(Number(v))} 
          options={["1","2","4","6","8","12"]} 
        />
        <span className="text-[10px] text-gray-500">(great for Mandala)</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className={btn()} onClick={onUndo} title="Undo - Go back gently">↶ Undo</button>
        <button className={btn()} onClick={onRedo} title="Redo - Move forward">↷ Redo</button>
        <button className={btn()} onClick={onClear} title="Clear - Fresh start">🗑️ Clear</button>
        <button className={btn(true)} onClick={onExport} title="Export - Share your creation">💾 Export</button>
        <button className={btn(true)} onClick={onSave} title="Save - Preserve this moment">💾 Save</button>
      </div>
    </div>
  );
};