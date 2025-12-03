import { useState, useEffect, useCallback } from "react";
import { ArtTherapyState, SaveData, ThemeKey, Mode, Tool, StampType, Stroke } from "@/types/artTherapyTypes";
import { THERAPY_THEMES } from "@/data/therapeuticThemes";
import { toast } from "sonner";

const LS_KEY = "artTherapyStudio.v2";

// Stub: wire this to your Supabase instance later.
async function saveToSupabase(_payload: SaveData) {
  // In a real implementation, this would save to Supabase
  return { ok: true };
}

function persistLocal<T>(data: T) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to persist to localStorage:", error);
  }
}

function readLocal<T>(fallback: T): T {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.error("Failed to read from localStorage:", error);
    return fallback;
  }
}

const initialState: ArtTherapyState = {
  mode: "FREE_DRAW",
  currentTheme: "calm",
  color: THERAPY_THEMES.calm.palette[0],
  brushSize: 8,
  opacity: 1,
  tool: "BRUSH",
  stamp: "HEART",
  symmetry: 1,
  reflection: "",
  selectedPrompt: "",
  isFullscreen: false,
  strokes: [],
  pbnColors: {},
  guidedColoring: {}
};

export const useArtTherapyState = () => {
  const [state, setState] = useState<ArtTherapyState>(initialState);

  // Load saved state on mount
  useEffect(() => {
    const savedState = readLocal<Partial<ArtTherapyState>>({});
    setState(prevState => ({ ...prevState, ...savedState }));
  }, []);

  // Persist state changes
  useEffect(() => {
    persistLocal(state);
  }, [state]);

  const updateState = useCallback(<K extends keyof ArtTherapyState>(
    key: K, 
    value: ArtTherapyState[K]
  ) => {
    setState(prevState => ({ ...prevState, [key]: value }));
  }, []);

  const setMode = useCallback((mode: Mode) => updateState("mode", mode), [updateState]);
  
  const setCurrentTheme = useCallback((theme: ThemeKey) => {
    updateState("currentTheme", theme);
    updateState("color", THERAPY_THEMES[theme].palette[0]);
    updateState("selectedPrompt", "");
  }, [updateState]);

  const setColor = useCallback((color: string) => updateState("color", color), [updateState]);
  const setBrushSize = useCallback((size: number) => updateState("brushSize", size), [updateState]);
  const setOpacity = useCallback((opacity: number) => updateState("opacity", opacity), [updateState]);
  const setTool = useCallback((tool: Tool) => updateState("tool", tool), [updateState]);
  const setStamp = useCallback((stamp: StampType) => updateState("stamp", stamp), [updateState]);
  const setSymmetry = useCallback((symmetry: number) => updateState("symmetry", symmetry), [updateState]);
  const setReflection = useCallback((reflection: string) => updateState("reflection", reflection), [updateState]);
  const setSelectedPrompt = useCallback((prompt: string) => updateState("selectedPrompt", prompt), [updateState]);
  const setIsFullscreen = useCallback((fullscreen: boolean) => updateState("isFullscreen", fullscreen), [updateState]);
  const setStrokes = useCallback((strokes: Stroke[]) => updateState("strokes", strokes), [updateState]);
  const setPbnColors = useCallback((colors: Record<string, string>) => updateState("pbnColors", colors), [updateState]);
  const setGuidedColoring = useCallback((coloring: Record<string, string>) => updateState("guidedColoring", coloring), [updateState]);

  const saveSession = useCallback(async (pngDataUrl: string) => {
    const jsonState = {
      mode: state.mode,
      strokes: state.strokes,
      pbnColors: state.pbnColors,
      reflection: state.reflection,
      symmetry: state.symmetry,
      tool: state.tool,
      color: state.color,
      brushSize: state.brushSize,
      opacity: state.opacity
    };

    try {
      await saveToSupabase({ 
        pngDataUrl, 
        jsonState, 
        reflection: state.reflection, 
        mode: state.mode 
      });
      toast.success("Session saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      toast.success("Session saved locally!");
    }
  }, [state]);

  return {
    state,
    setMode,
    setCurrentTheme,
    setColor,
    setBrushSize,
    setOpacity,
    setTool,
    setStamp,
    setSymmetry,
    setReflection,
    setSelectedPrompt,
    setIsFullscreen,
    setStrokes,
    setPbnColors,
    setGuidedColoring,
    saveSession
  };
};