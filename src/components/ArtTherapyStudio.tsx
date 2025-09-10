// src/components/ArtTherapyStudio.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------
   TYPES
-------------------------------------------------------------------*/
type Mode = "FREE_DRAW" | "PAINT_BY_NUMBERS" | "MANDALA";
type Tool = "BRUSH" | "ERASER" | "FILL" | "STAMP";

/* ------------------------------------------------------------------
   UTIL: small helpers
-------------------------------------------------------------------*/
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const uid = () => Math.random().toString(36).slice(2);

/* ------------------------------------------------------------------
   STORAGE (localStorage) + placeholder Supabase
-------------------------------------------------------------------*/
const LS_KEY = "artTherapyStudio.v1";

function persistLocal<T>(data: T) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {}
}
function readLocal<T>(fallback: T): T {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// Stub: wire this to your Supabase instance later.
async function saveToSupabase(_payload: {
  pngDataUrl: string;
  jsonState: unknown;
  reflection?: string;
  mode: Mode;
}) {
  // Example:
  // const { data, error } = await supabase.from("artworks").insert({
  //   png: _payload.pngDataUrl,
  //   json_state: _payload.jsonState,
  //   reflection: _payload.reflection,
  //   mode: _payload.mode
  // });
  // if (error) throw error;
  return { ok: true };
}

/* ------------------------------------------------------------------
   PRESETS (palettes, SVGs)
-------------------------------------------------------------------*/
const PASTEL_PALETTE = [
  "#7FB3D5", "#A9DFBF", "#F9E79F", "#F5CBA7",
  "#D7BDE2", "#FADBD8", "#AED6F1", "#ABEBC6"
];

const DEFAULT_BRUSH_SIZES = [2, 4, 8, 12, 18, 24];
const DEFAULT_OPACITIES = [1, 0.8, 0.6, 0.4, 0.2];

const SAMPLE_PBN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360">
  <rect width="540" height="360" fill="#ffffff"/>
  <!-- Simple three-region landscape -->
  <path id="region-1" d="M0 250 L540 250 L540 360 L0 360 Z" fill="#ffffff" stroke="#888" />
  <path id="region-2" d="M0 120 C140 60, 400 60, 540 120 L540 250 L0 250 Z" fill="#ffffff" stroke="#888" />
  <circle id="region-3" cx="420" cy="90" r="35" fill="#ffffff" stroke="#888"/>
  <!-- Numbers -->
  <text x="270" y="320" font-size="24" text-anchor="middle" fill="#999">1</text>
  <text x="270" y="190" font-size="24" text-anchor="middle" fill="#999">2</text>
  <text x="420" y="95" font-size="24" text-anchor="middle" fill="#999">3</text>
</svg>
`;

const SAMPLE_MANDALA_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 540">
  <rect width="540" height="540" fill="#ffffff"/>
  <g stroke="#aaa" fill="none">
    <circle cx="270" cy="270" r="220"/>
    <circle cx="270" cy="270" r="180"/>
    <circle cx="270" cy="270" r="140"/>
    <circle cx="270" cy="270" r="100"/>
    <circle cx="270" cy="270" r="60"/>
    <!-- petals -->
    ${Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const x = 270 + Math.cos(angle) * 180;
      const y = 270 + Math.sin(angle) * 180;
      return `<line x1="270" y1="270" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" />`;
    }).join("\n")}
  </g>
</svg>
`;

/* ------------------------------------------------------------------
   MAIN COMPONENT
-------------------------------------------------------------------*/
export const ArtTherapyStudio: React.FC = () => {
  const [mode, setMode] = useState<Mode>("FREE_DRAW");

  // Shared UI state
  const [color, setColor] = useState(PASTEL_PALETTE[0]);
  const [brushSize, setBrushSize] = useState(8);
  const [opacity, setOpacity] = useState(1);
  const [tool, setTool] = useState<Tool>("BRUSH");
  const [reflection, setReflection] = useState("");

  // For Free Draw
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<any[]>([]);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [stamp, setStamp] = useState<"HEART" | "STAR" | "SMILE">("HEART");
  const [symmetry, setSymmetry] = useState<number>(1); // used in mandala mode too

  // For Paint by Numbers
  const pbnContainerRef = useRef<HTMLDivElement | null>(null);
  const [pbnSvg, setPbnSvg] = useState<string>(SAMPLE_PBN_SVG);
  const [pbnColors, setPbnColors] = useState<Record<string, string>>({}); // id -> color

  // For Mandala / Guided
  const [mandalaSvg, setMandalaSvg] = useState<string>(SAMPLE_MANDALA_SVG);
  const [guidedColoring, setGuidedColoring] = useState<Record<string, string>>({}); // id -> color

  // Restore last session
  useEffect(() => {
    const s = readLocal<any>({
      color, brushSize, opacity, tool, mode, strokes, pbnColors, reflection, symmetry, guidedColoring
    });
    setColor(s.color ?? color);
    setBrushSize(s.brushSize ?? brushSize);
    setOpacity(s.opacity ?? opacity);
    setTool(s.tool ?? tool);
    setMode(s.mode ?? mode);
    setStrokes(s.strokes ?? []);
    setPbnColors(s.pbnColors ?? {});
    setReflection(s.reflection ?? "");
    setSymmetry(s.symmetry ?? 1);
    setGuidedColoring(s.guidedColoring ?? {});
  }, []); // eslint-disable-line

  // Persist on change
  useEffect(() => {
    persistLocal({
      color, brushSize, opacity, tool, mode, strokes, pbnColors, reflection, symmetry, guidedColoring
    });
  }, [color, brushSize, opacity, tool, mode, strokes, pbnColors, reflection, symmetry, guidedColoring]);

  /* ----------------------------- FREE DRAW ----------------------------- */
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    // redraw strokes
    strokes.forEach((s) => {
      if (s.type === "stroke") {
        ctx.globalAlpha = s.opacity;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        s.points.forEach((p: any, i: number) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else if (s.type === "stamp") {
        drawStamp(ctx, s);
      }
    });
  }, [strokes]);

  function startDraw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (mode !== "FREE_DRAW" && mode !== "MANDALA") return;
    setIsDrawing(true);
    const { x, y } = getCanvasPos(e);
    if (tool === "STAMP") {
      const stampStroke = {
        id: uid(),
        type: "stamp",
        stamp,
        x, y,
        size: brushSize * 4,
        color,
        opacity
      };
      setStrokes((arr) => [...arr, stampStroke]);
      setUndoStack([]);
      setIsDrawing(false);
      return;
    }
    if (tool === "FILL") {
      floodFillAtPoint(x, y);
      setIsDrawing(false);
      return;
    }
    const newStroke = {
      id: uid(),
      type: "stroke",
      color: tool === "ERASER" ? "#ffffff" : color,
      size: brushSize,
      opacity,
      points: [{ x, y }]
    };
    // Symmetry (Mandala & optionally Free Draw)
    let toAdd = [newStroke];
    if (symmetry > 1) {
      const cx = canvasRef.current!.width / 2;
      const cy = canvasRef.current!.height / 2;
      const angleStep = (Math.PI * 2) / symmetry;
      const rotated = Array.from({ length: symmetry - 1 }, (_, i) => {
        const ang = angleStep * (i + 1);
        const rx = rotatePoint(x, y, cx, cy, ang);
        return {
          ...newStroke,
          id: uid(),
          points: [rx]
        };
      });
      toAdd = [newStroke, ...rotated];
    }
    setStrokes((arr) => [...arr, ...toAdd]);
    setUndoStack([]);
  }

  function moveDraw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const { x, y } = getCanvasPos(e);
    setStrokes((arr) =>
      arr.map((s, idx) => {
        if (idx >= arr.length - symmetry) {
          // push point to last N strokes (symmetry group)
          if (s.type === "stroke") {
            const updated = { ...s };
            if (idx === arr.length - symmetry) {
              updated.points = [...updated.points, { x, y }];
            } else {
              // rotate around center
              const cx = canvasRef.current!.width / 2;
              const cy = canvasRef.current!.height / 2;
              const i = (idx - (arr.length - symmetry)) + 1;
              const ang = ((Math.PI * 2) / symmetry) * i;
              const rxy = rotatePoint(x, y, cx, cy, ang);
              updated.points = [...updated.points, rxy];
            }
            return updated;
          }
        }
        return s;
      })
    );
  }

  function endDraw() {
    setIsDrawing(false);
  }

  function getCanvasPos(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);
    // Scale to canvas resolution
    const scaleX = (canvasRef.current!.width) / rect.width;
    const scaleY = (canvasRef.current!.height) / rect.height;
    return { x: x * scaleX, y: y * scaleY };
  }

  function rotatePoint(x: number, y: number, cx: number, cy: number, ang: number) {
    const dx = x - cx, dy = y - cy;
    const rx = cx + (dx * Math.cos(ang) - dy * Math.sin(ang));
    const ry = cy + (dx * Math.sin(ang) + dy * Math.cos(ang));
    return { x: rx, y: ry };
  }

  function drawStamp(ctx: CanvasRenderingContext2D, s: any) {
    ctx.save();
    ctx.globalAlpha = s.opacity;
    ctx.fillStyle = s.color;
    ctx.translate(s.x, s.y);
    if (s.stamp === "HEART") {
      heartPath(ctx, s.size);
    } else if (s.stamp === "STAR") {
      starPath(ctx, s.size);
    } else {
      smilePath(ctx, s.size);
    }
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function heartPath(ctx: CanvasRenderingContext2D, size: number) {
    const r = size / 2;
    ctx.beginPath();
    ctx.moveTo(0, r / 2);
    ctx.bezierCurveTo(r, -r / 2, r * 1.5, r, 0, r * 1.6);
    ctx.bezierCurveTo(-r * 1.5, r, -r, -r / 2, 0, r / 2);
  }

  function starPath(ctx: CanvasRenderingContext2D, size: number) {
    const spikes = 5, outer = size / 2, inner = size / 5;
    let rot = Math.PI / 2 * 3;
    let x = 0, y = 0;
    ctx.beginPath();
    ctx.moveTo(0, -outer);
    for (let i = 0; i < spikes; i++) {
      x = Math.cos(rot) * outer;
      y = Math.sin(rot) * outer;
      ctx.lineTo(x, y);
      rot += Math.PI / 5;
      x = Math.cos(rot) * inner;
      y = Math.sin(rot) * inner;
      ctx.lineTo(x, y);
      rot += Math.PI / 5;
    }
    ctx.lineTo(0, -outer);
    ctx.closePath();
  }

  function smilePath(ctx: CanvasRenderingContext2D, size: number) {
    const r = size / 2;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.moveTo(-r / 2, -r / 4);
    ctx.arc(-r / 2.5, -r / 4, r / 10, 0, Math.PI * 2);
    ctx.moveTo(r / 2.5, -r / 4);
    ctx.arc(r / 2.5, -r / 4, r / 10, 0, Math.PI * 2);
    ctx.moveTo(-r / 2, r / 4);
    ctx.quadraticCurveTo(0, r / 1.2, r / 2, r / 4);
  }

  // Basic flood fill (canvas-based). For simplicity here: fill small circle (therapeutic-friendly, not perfect fill algo).
  function floodFillAtPoint(x: number, y: number) {
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d")!;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, brushSize * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    setStrokes((arr) => [...arr, { id: uid(), type: "stamp", stamp: "FILL", x, y, size: brushSize * 4, color, opacity }]);
  }

  function undo() {
    setUndoStack((u) => [...u, strokes[strokes.length - 1]]);
    setStrokes((arr) => arr.slice(0, -1));
  }
  function redo() {
    const last = undoStack[undoStack.length - 1];
    if (!last) return;
    setUndoStack((u) => u.slice(0, -1));
    setStrokes((arr) => [...arr, last]);
  }
  function clearCanvas() {
    setStrokes([]);
    setUndoStack([]);
  }

  /* -------------------------- PAINT BY NUMBERS -------------------------- */
  useEffect(() => {
    if (mode !== "PAINT_BY_NUMBERS") return;
    // Wire click-to-fill on SVG paths by id
    const container = pbnContainerRef.current;
    if (!container) return;
    const svgEl = container.querySelector("svg");
    if (!svgEl) return;

    function onClick(e: Event) {
      const t = e.target as HTMLElement;
      if (!t) return;
      const id = t.getAttribute("id");
      if (!id) return;
      // Accept region-* ids or shapes
      if (id.startsWith("region-") || ["path", "circle", "rect", "polygon"].includes(t.tagName.toLowerCase())) {
        (t as any).style.fill = color;
        setPbnColors((m) => ({ ...m, [id]: color }));
      }
    }
    svgEl.addEventListener("click", onClick);
    return () => svgEl.removeEventListener("click", onClick);
  }, [mode, color]);

  function exportPbnPng(): string | null {
    const container = pbnContainerRef.current;
    if (!container) return null;
    const svg = container.innerHTML;
    // Convert SVG to image on temp canvas
    const cvs = document.createElement("canvas");
    cvs.width = 1080;
    cvs.height = 720;
    const ctx = cvs.getContext("2d")!;
    const img = new Image();
    return new Promise<string>((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
        resolve(cvs.toDataURL("image/png"));
      };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    }) as unknown as string; // we'll await where we use it
  }

  /* ----------------------------- EXPORT / SAVE ----------------------------- */
  async function exportPNG() {
    if (mode === "PAINT_BY_NUMBERS") {
      // @ts-ignore (we returned a Promise as string cast above)
      const dataUrl = await exportPbnPng();
      downloadDataUrl(dataUrl, "artwork.png");
      return;
    }
    const cvs = canvasRef.current!;
    const dataUrl = cvs.toDataURL("image/png");
    downloadDataUrl(dataUrl, "artwork.png");
  }

  function downloadDataUrl(dataUrl: string | null, filename: string) {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.click();
  }

  async function saveSession() {
    let pngDataUrl = "";
    if (mode === "PAINT_BY_NUMBERS") {
      // @ts-ignore
      pngDataUrl = await exportPbnPng();
    } else {
      pngDataUrl = canvasRef.current!.toDataURL("image/png");
    }
    const jsonState = {
      mode,
      strokes,
      pbnColors,
      reflection,
      symmetry,
      tool,
      color,
      brushSize,
      opacity
    };
    try {
      await saveToSupabase({ pngDataUrl, jsonState, reflection, mode });
      alert("Saved!");
    } catch (e) {
      console.error(e);
      alert("Saved locally (Supabase not yet wired).");
    }
  }

  /* ----------------------------- RENDER ----------------------------- */
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 bg-background">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-foreground">Art Therapy Studio</h2>
        <div className="flex items-center gap-2">
          <ModeTab current={mode} label="Free Draw" onClick={() => setMode("FREE_DRAW")} />
          <ModeTab current={mode} label="Paint by Numbers" onClick={() => setMode("PAINT_BY_NUMBERS")} />
          <ModeTab current={mode} label="Mandala / Guided" onClick={() => setMode("MANDALA")} />
        </div>
      </header>

      <Toolbar
        mode={mode}
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        opacity={opacity}
        setOpacity={setOpacity}
        stamp={stamp}
        setStamp={setStamp}
        symmetry={symmetry}
        setSymmetry={setSymmetry}
        onUndo={undo}
        onRedo={redo}
        onClear={clearCanvas}
        onExport={exportPNG}
        onSave={saveSession}
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Canvas / Work Area */}
        <div className="lg:col-span-4 rounded-md border border-border overflow-hidden relative">
          {mode !== "PAINT_BY_NUMBERS" ? (
            <CanvasArea
              canvasRef={canvasRef}
              previewRef={previewRef}
              onStart={startDraw}
              onMove={moveDraw}
              onEnd={endDraw}
            />
          ) : (
            <div ref={pbnContainerRef} className="w-full h-full bg-card overflow-auto p-4">
              <div
                className="max-w-[900px] mx-auto [&_svg]:w-full [&_svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: pbnSvg }}
              />
            </div>
          )}
        </div>

        {/* Reflection / Prompts */}
        <aside className="lg:col-span-1 rounded-md border border-border p-3 bg-card">
          <h3 className="font-medium mb-2 text-foreground">Reflection</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Optional: How did creating this make you feel? Anything you'd like to remember?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full h-40 p-2 rounded-md border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-ring"
            placeholder="Write a few thoughts..."
          />
          <div className="mt-3 text-xs text-muted-foreground">
            Prompts:
            <ul className="list-disc ml-4 space-y-1">
              <li>What feelings surfaced while drawing?</li>
              <li>What colors did you choose and why?</li>
              <li>What would you tell yourself looking at this piece?</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Guided assets uploaders (optional) */}
      {mode === "PAINT_BY_NUMBERS" && (
        <FileRow
          label="Load a Paint-by-Numbers SVG"
          onFile={(text) => setPbnSvg(text)}
          exampleName="sample_paint_by_numbers.svg"
          exampleContent={SAMPLE_PBN_SVG}
        />
      )}
      {mode === "MANDALA" && (
        <FileRow
          label="Load a Guided Coloring SVG (e.g., mandala)"
          onFile={(text) => setMandalaSvg(text)}
          exampleName="sample_mandala.svg"
          exampleContent={SAMPLE_MANDALA_SVG}
        />
      )}

      {/* Hidden target for Mandala SVG (for future fill-on-click extension) */}
      {mode === "MANDALA" && (
        <details className="text-xs text-muted-foreground">
          <summary>Show Mandala SVG (read-only)</summary>
          <div
            className="[&_svg]:w-full [&_svg]:h-auto border mt-2"
            dangerouslySetInnerHTML={{ __html: mandalaSvg }}
          />
          <p className="p-2">Tip: Use symmetry &gt; 1 to draw radial patterns on the canvas.</p>
        </details>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------
   SUB COMPONENTS
-------------------------------------------------------------------*/
const ModeTab: React.FC<{ current: Mode; label: string; onClick: () => void }> = ({ current, label, onClick }) => {
  const active =
    (current === "FREE_DRAW" && label.startsWith("Free")) ||
    (current === "PAINT_BY_NUMBERS" && label.startsWith("Paint")) ||
    (current === "MANDALA" && label.startsWith("Mandala"));
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md border text-sm transition ${
        active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-card-foreground border-border hover:bg-accent"
      }`}
    >
      {label}
    </button>
  );
};

const Toolbar: React.FC<{
  mode: Mode;
  tool: Tool;
  setTool: (t: Tool) => void;
  color: string;
  setColor: (c: string) => void;
  brushSize: number;
  setBrushSize: (n: number) => void;
  opacity: number;
  setOpacity: (n: number) => void;
  stamp: "HEART" | "STAR" | "SMILE";
  setStamp: (s: "HEART" | "STAR" | "SMILE") => void;
  symmetry: number;
  setSymmetry: (n: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onExport: () => void;
  onSave: () => void;
}> = ({
  mode, tool, setTool, color, setColor, brushSize, setBrushSize, opacity, setOpacity,
  stamp, setStamp, symmetry, setSymmetry, onUndo, onRedo, onClear, onExport, onSave
}) => {
  return (
    <div className="w-full rounded-md border border-border bg-card p-2 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1">
        <button
          className={btn(tool === "BRUSH")}
          onClick={() => setTool("BRUSH")}
          title="Brush"
        >🖌️ Brush</button>
        <button
          className={btn(tool === "ERASER")}
          onClick={() => setTool("ERASER")}
          title="Eraser"
        >🧽 Eraser</button>
        {mode !== "PAINT_BY_NUMBERS" && (
          <button
            className={btn(tool === "FILL")}
            onClick={() => setTool("FILL")}
            title="Soft Fill"
          >🪣 Fill</button>
        )}
        <button
          className={btn(tool === "STAMP")}
          onClick={() => setTool("STAMP")}
          title="Stamp"
        >✨ Stamp</button>
      </div>

      {tool === "STAMP" && (
        <div className="flex items-center gap-1 ml-1">
          <Sel value={stamp} setValue={(v) => setStamp(v as any)} options={["HEART","STAR","SMILE"]} />
        </div>
      )}

      <div className="h-6 w-px bg-border mx-1" />

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Color</span>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-7 w-7 p-0 border rounded" />
        <div className="flex items-center gap-1">
          {PASTEL_PALETTE.map((c) => (
            <button
              key={c}
              className="h-6 w-6 rounded border border-border"
              style={{ background: c }}
              onClick={() => setColor(c)}
              title={c}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Size</span>
        <Sel value={String(brushSize)} setValue={(v) => setBrushSize(Number(v))} options={DEFAULT_BRUSH_SIZES.map(String)} />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Opacity</span>
        <Sel value={String(opacity)} setValue={(v) => setOpacity(Number(v))} options={DEFAULT_OPACITIES.map(String)} />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Symmetry</span>
        <Sel value={String(symmetry)} setValue={(v) => setSymmetry(Number(v))} options={["1","2","4","6","8","12"]} />
        <span className="text-[10px] text-muted-foreground">(great for Mandala)</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className={btn()} onClick={onUndo} title="Undo">↶ Undo</button>
        <button className={btn()} onClick={onRedo} title="Redo">↷ Redo</button>
        <button className={btn()} onClick={onClear} title="Clear">🗑️ Clear</button>
        <button className={btn(true)} onClick={onExport} title="Export PNG">⬇️ Export</button>
        <button className={btn(true)} onClick={onSave} title="Save (Supabase/local)">💾 Save</button>
      </div>
    </div>
  );
};

const CanvasArea: React.FC<{
  canvasRef: React.RefObject<HTMLCanvasElement>;
  previewRef: React.RefObject<HTMLCanvasElement>;
  onStart: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onEnd: () => void;
}> = ({ canvasRef, previewRef, onStart, onMove, onEnd }) => {
  // Setup resolution
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resize = () => {
      const el = containerRef.current;
      const cvs = canvasRef.current;
      const prev = previewRef.current;
      if (!el || !cvs || !prev) return;
      const rect = el.getBoundingClientRect();
      // crisp drawing without blur
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      cvs.width = w * 2; cvs.height = h * 2; // hi-dpi internal
      prev.width = w * 2; prev.height = h * 2;
      cvs.style.width = w + "px";
      cvs.style.height = h + "px";
      prev.style.width = w + "px";
      prev.style.height = h + "px";
      const ctx = cvs.getContext("2d")!;
      ctx.scale(2, 2);
      const pctx = prev.getContext("2d")!;
      pctx.scale(2, 2);
    };
    resize();
    const obs = new ResizeObserver(resize);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[60vh] sm:h-[70vh] bg-background relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none cursor-crosshair"
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
      />
      <canvas ref={previewRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
};

const FileRow: React.FC<{
  label: string;
  onFile: (text: string) => void;
  exampleName: string;
  exampleContent: string;
}> = ({ label, onFile, exampleName, exampleContent }) => {
  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    onFile(text);
  }
  function loadExample() {
    onFile(exampleContent);
  }
  return (
    <div className="rounded-md border border-border p-3 bg-card flex flex-wrap items-center gap-2">
      <span className="text-sm text-foreground">{label}</span>
      <input type="file" accept=".svg" onChange={handle} className="text-sm" />
      <button className={btn()} onClick={loadExample}>Load Example ({exampleName})</button>
    </div>
  );
};

/* ------------------------------------------------------------------
   UI helpers
-------------------------------------------------------------------*/
function btn(primary = false) {
  return `px-3 py-1.5 text-sm rounded-md border transition ${
    primary
      ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
      : "bg-card text-card-foreground border-border hover:bg-accent"
  }`;
}
const Sel: React.FC<{ value: string; setValue: (v: string) => void; options: string[] }> = ({ value, setValue, options }) => (
  <select
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="px-2 py-1 rounded-md border border-border bg-background text-foreground text-sm"
  >
    {options.map((o) => (
      <option key={o} value={o}>{o}</option>
    ))}
  </select>
);

export default ArtTherapyStudio;