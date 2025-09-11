export type Mode = "FREE_DRAW" | "PAINT_BY_NUMBERS" | "MANDALA";
export type Tool = "BRUSH" | "ERASER" | "FILL" | "STAMP";
export type StampType = "HEART" | "STAR" | "SMILE";
export type ThemeKey = "calm" | "grounding" | "energizing" | "healing" | "clarity" | "selfLove";

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  type: "stroke" | "stamp";
  color: string;
  size: number;
  opacity: number;
  points?: Point[];
  stamp?: StampType;
  x?: number;
  y?: number;
}

export interface TherapeuticTheme {
  name: string;
  description: string;
  palette: string[];
  background: string;
  benefit: string;
}

export interface PaintByNumbersTemplate {
  name: string;
  svg: string;
  regions: number;
}

export interface ArtTherapyState {
  mode: Mode;
  currentTheme: ThemeKey;
  color: string;
  brushSize: number;
  opacity: number;
  tool: Tool;
  stamp: StampType;
  symmetry: number;
  reflection: string;
  selectedPrompt: string;
  isFullscreen: boolean;
  strokes: Stroke[];
  pbnColors: Record<string, string>;
  guidedColoring: Record<string, string>;
}

export interface SaveData {
  pngDataUrl: string;
  jsonState: Partial<ArtTherapyState>;
  reflection?: string;
  mode: Mode;
}