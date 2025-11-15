import React, { useEffect } from "react";
import { toast } from "sonner";
import { useArtTherapyState } from "@/hooks/useArtTherapyState";
import { useCanvasDrawing } from "@/hooks/useCanvasDrawing";
import { usePaintByNumbers } from "@/hooks/usePaintByNumbers";
import { TherapeuticHeader } from "@/components/art-therapy/TherapeuticHeader";
import { ArtToolbar } from "@/components/art-therapy/ArtToolbar";
import { CanvasArea } from "@/components/art-therapy/CanvasArea";
import { PaintByNumbersArea } from "@/components/art-therapy/PaintByNumbersArea";
import { TherapeuticSidebar } from "@/components/art-therapy/TherapeuticSidebar";
import { LevelSelector } from "@/components/art-therapy/LevelSelector";
import { FileUploader } from "@/components/art-therapy/FileUploader";
import { SafeSvgRenderer } from "@/components/art-therapy/SafeSvgRenderer";
import BackButton from "@/components/navigation/BackButton";
import { THERAPY_THEMES } from "@/data/therapeuticThemes";
import { PBN_TEMPLATES, SAMPLE_MANDALA_SVG } from "@/data/paintByNumbersTemplates";
import { Stroke } from "@/types/artTherapyTypes";

const uid = () => Math.random().toString(36).slice(2);

export const ArtTherapyStudio: React.FC = () => {
  const {
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
    saveSession
  } = useArtTherapyState();

  const {
    canvasRef,
    previewRef,
    isDrawing,
    setIsDrawing,
    redrawCanvas,
    getCanvasPosition,
    createSymmetricStrokes,
    floodFill,
    undo,
    redo,
    clear,
    exportToPNG
  } = useCanvasDrawing();

  const { 
    templates, 
    exportPNG: exportPbnPNG, 
    downloadFile 
  } = usePaintByNumbers();

  const [pbnLevel, setPbnLevel] = React.useState<string>("beginner");
  const [pbnSvg, setPbnSvg] = React.useState<string>(PBN_TEMPLATES.beginner.svg);
  const [mandalaSvg, setMandalaSvg] = React.useState<string>(SAMPLE_MANDALA_SVG);

  // Redraw canvas when strokes change
  useEffect(() => {
    redrawCanvas(state.strokes);
  }, [state.strokes, redrawCanvas]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (state.mode !== "FREE_DRAW" && state.mode !== "MANDALA") return;
    
    setIsDrawing(true);
    const position = getCanvasPosition(e);

    if (state.tool === "STAMP") {
      const stampStroke: Stroke = {
        id: uid(),
        type: "stamp",
        stamp: state.stamp,
        x: position.x,
        y: position.y,
        size: state.brushSize * 4,
        color: state.color,
        opacity: state.opacity
      };
      
      const newStrokes = createSymmetricStrokes(stampStroke, position.x, position.y, state.symmetry);
      setStrokes([...state.strokes, ...newStrokes]);
      setIsDrawing(false);
      return;
    }

    if (state.tool === "FILL") {
      const fillStroke = floodFill(position.x, position.y, state.color, state.brushSize, state.opacity);
      setStrokes([...state.strokes, fillStroke]);
      setIsDrawing(false);
      return;
    }

    const newStroke: Stroke = {
      id: uid(),
      type: "stroke",
      color: state.tool === "ERASER" ? "#ffffff" : state.color,
      size: state.brushSize,
      opacity: state.opacity,
      points: [position]
    };

    const strokesWithSymmetry = createSymmetricStrokes(newStroke, position.x, position.y, state.symmetry);
    setStrokes([...state.strokes, ...strokesWithSymmetry]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || state.tool === "STAMP" || state.tool === "FILL") return;
    
    const position = getCanvasPosition(e);
    
    const updatedStrokes = state.strokes.map((stroke, idx) => {
      // Update the last N strokes (symmetry group)
      if (idx >= state.strokes.length - state.symmetry && stroke.type === "stroke" && stroke.points) {
        if (idx === state.strokes.length - state.symmetry) {
          // Main stroke
          return { ...stroke, points: [...stroke.points, position] };
        } else {
          // Symmetric strokes
          const canvas = canvasRef.current!;
          const cx = canvas.width / 2;
          const cy = canvas.height / 2;
          const symmetryIndex = idx - (state.strokes.length - state.symmetry) + 1;
          const angle = ((Math.PI * 2) / state.symmetry) * symmetryIndex;
          
          const dx = position.x - cx;
          const dy = position.y - cy;
          const rotatedX = cx + (dx * Math.cos(angle) - dy * Math.sin(angle));
          const rotatedY = cy + (dx * Math.sin(angle) + dy * Math.cos(angle));
          
          return { ...stroke, points: [...stroke.points, { x: rotatedX, y: rotatedY }] };
        }
      }
      return stroke;
    });
    setStrokes(updatedStrokes);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => undo(state.strokes, setStrokes);
  const handleRedo = () => redo(state.strokes, setStrokes);
  const handleClear = () => clear(setStrokes);

  const handleExport = async () => {
    try {
      if (state.mode === "PAINT_BY_NUMBERS") {
        const dataUrl = await exportPbnPNG();
        downloadFile(dataUrl, "artwork.png");
      } else {
        const dataUrl = exportToPNG();
        downloadFile(dataUrl, "artwork.png");
      }
      toast.success("Artwork exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export artwork");
    }
  };

  const handleSave = async () => {
    try {
      let pngDataUrl = "";
      if (state.mode === "PAINT_BY_NUMBERS") {
        pngDataUrl = await exportPbnPNG();
      } else {
        pngDataUrl = exportToPNG();
      }
      await saveSession(pngDataUrl);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save session");
    }
  };

  const handleLevelChange = (level: string, template: any) => {
    setPbnLevel(level);
    setPbnSvg(template.svg);
    setPbnColors({});
  };

  const currentThemeData = THERAPY_THEMES[state.currentTheme];

  return (
    <div 
      className={`w-full transition-all duration-500 animate-fade-in ${
        state.isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'
      } flex flex-col gap-4 p-4`}
      style={{ 
        background: currentThemeData.background,
        minHeight: state.isFullscreen ? '100vh' : '100vh'
      }}
    >
      {!state.isFullscreen && (
        <div className="flex justify-start">
          <BackButton />
        </div>
      )}
      
      <TherapeuticHeader
        currentTheme={state.currentTheme}
        setCurrentTheme={setCurrentTheme}
        mode={state.mode}
        setMode={setMode}
        isFullscreen={state.isFullscreen}
        setIsFullscreen={setIsFullscreen}
      />

      <ArtToolbar
        mode={state.mode}
        tool={state.tool}
        setTool={setTool}
        color={state.color}
        setColor={setColor}
        brushSize={state.brushSize}
        setBrushSize={setBrushSize}
        opacity={state.opacity}
        setOpacity={setOpacity}
        stamp={state.stamp}
        setStamp={setStamp}
        symmetry={state.symmetry}
        setSymmetry={setSymmetry}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        onExport={handleExport}
        onSave={handleSave}
        currentTheme={state.currentTheme}
      />

      <div className={`flex-1 grid gap-4 ${state.isFullscreen ? 'grid-cols-1 xl:grid-cols-4' : 'grid-cols-1 lg:grid-cols-4'}`}>
        {/* Canvas / Work Area */}
        <div className={`${state.isFullscreen ? 'xl:col-span-3' : 'lg:col-span-3'} rounded-lg border border-white/30 overflow-hidden relative bg-white/50 backdrop-blur-sm shadow-lg`}>
          {state.mode !== "PAINT_BY_NUMBERS" ? (
            <CanvasArea
              canvasRef={canvasRef}
              previewRef={previewRef}
              onStart={handleMouseDown}
              onMove={handleMouseMove}
              onEnd={handleMouseUp}
            />
          ) : (
            <PaintByNumbersArea
              pbnSvg={pbnSvg}
              color={state.color}
              setPbnColors={(fn) => setPbnColors(fn(state.pbnColors))}
            />
          )}
        </div>

        <TherapeuticSidebar
          currentTheme={state.currentTheme}
          selectedPrompt={state.selectedPrompt}
          setSelectedPrompt={setSelectedPrompt}
          reflection={state.reflection}
          setReflection={setReflection}
          isFullscreen={state.isFullscreen}
        />
      </div>

      {/* Paint by Numbers Level Selection */}
      {state.mode === "PAINT_BY_NUMBERS" && (
        <LevelSelector
          templates={templates}
          currentLevel={pbnLevel}
          onLevelChange={handleLevelChange}
        />
      )}

      {/* File Uploaders */}
      {state.mode === "PAINT_BY_NUMBERS" && (
        <FileUploader
          label="Or upload custom Paint-by-Numbers SVG"
          onFile={setPbnSvg}
          exampleName="custom_paint_by_numbers.svg"
          exampleContent={PBN_TEMPLATES.beginner.svg}
        />
      )}
      
      {state.mode === "MANDALA" && (
        <>
          <FileUploader
            label="Load a Guided Coloring SVG (e.g., mandala)"
            onFile={setMandalaSvg}
            exampleName="sample_mandala.svg"
            exampleContent={SAMPLE_MANDALA_SVG}
          />
          
          <details className="text-xs text-gray-500">
            <summary>Show Mandala SVG (read-only)</summary>
            <SafeSvgRenderer 
              svgContent={mandalaSvg}
              className="[&_svg]:w-full [&_svg]:h-auto border mt-2"
            />
            <p className="p-2">Tip: Use symmetry greater than 1 to draw radial patterns on the canvas.</p>
          </details>
        </>
      )}
    </div>
  );
};

export default ArtTherapyStudio;