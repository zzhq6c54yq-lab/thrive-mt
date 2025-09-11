import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
  return { ok: true };
}

/* ------------------------------------------------------------------
   THERAPEUTIC THEMES FOR MENTAL HEALTH
-------------------------------------------------------------------*/
const THERAPY_THEMES = {
  calm: {
    name: "Calm & Serenity",
    description: "Soft blues and greens to reduce anxiety and promote peace",
    palette: ["#E8F4FD", "#B8E0D2", "#D6EAF8", "#EAEDED", "#F8F9FA", "#A2D2FF", "#BDE4FF", "#CCD1FF"],
    background: "linear-gradient(135deg, #E8F4FD 0%, #D6EAF8 100%)",
    benefit: "Promotes relaxation and reduces stress"
  },
  grounding: {
    name: "Grounding & Stability",
    description: "Earth tones to foster feelings of safety and connection",
    palette: ["#F4E4BC", "#D4B996", "#C19A6B", "#A0815A", "#8B6F47", "#E6CCB2", "#DDB892", "#B68D40"],
    background: "linear-gradient(135deg, #F4E4BC 0%, #DDB892 100%)",
    benefit: "Helps with anxiety and promotes feeling centered"
  },
  energizing: {
    name: "Gentle Energy",
    description: "Warm, uplifting colors to combat depression and boost mood",
    palette: ["#FFE5B4", "#FFCC5C", "#FFB347", "#FF8C69", "#FFA07A", "#FFDAB9", "#F0E68C", "#FFE4B5"],
    background: "linear-gradient(135deg, #FFE5B4 0%, #FFDAB9 100%)",
    benefit: "Elevates mood and increases motivation"
  },
  healing: {
    name: "Healing & Growth",
    description: "Gentle greens and purples for emotional healing and self-compassion",
    palette: ["#E8F5E8", "#C8E6C9", "#A5D6A7", "#81C784", "#DCC9E8", "#C8A2C8", "#E1BEE7", "#F3E5F5"],
    background: "linear-gradient(135deg, #E8F5E8 0%, #F3E5F5 100%)",
    benefit: "Supports emotional healing and self-acceptance"
  },
  clarity: {
    name: "Mental Clarity",
    description: "Clear, fresh colors to enhance focus and clear mental fog",
    palette: ["#F0F8FF", "#E0F6FF", "#B0E0E6", "#87CEEB", "#E6F3FF", "#F5F5DC", "#FFFACD", "#F0FFFF"],
    background: "linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%)",
    benefit: "Improves concentration and mental clarity"
  },
  selfLove: {
    name: "Self-Love & Acceptance",
    description: "Warm pinks and soft tones to nurture self-compassion",
    palette: ["#FFF0F5", "#FFE4E1", "#FFC0CB", "#FFB6C1", "#F8BBD9", "#E8A2C2", "#F5DEB3", "#FFEEF0"],
    background: "linear-gradient(135deg, #FFF0F5 0%, #FFEEF0 100%)",
    benefit: "Encourages self-compassion and inner kindness"
  }
};

const THERAPEUTIC_PROMPTS = {
  calm: [
    "Paint your safe space - where do you feel most at peace?",
    "Create flowing water or gentle clouds to represent letting go",
    "Draw your breath - what does calm breathing look like?"
  ],
  grounding: [
    "Paint roots growing deep into the earth",
    "Create a mountain that represents your inner strength",
    "Draw the feeling of your feet on solid ground"
  ],
  energizing: [
    "Paint a sunrise that represents new hope",
    "Create flowers blooming to show your growth",
    "Draw warm light filling a dark space"
  ],
  healing: [
    "Paint a garden where your emotions can grow safely",
    "Create bandages of color over old wounds",
    "Draw yourself giving yourself a gentle hug"
  ],
  clarity: [
    "Paint clearing fog to reveal a beautiful landscape",
    "Create organized patterns that feel calming",
    "Draw light breaking through clouds"
  ],
  selfLove: [
    "Paint a warm embrace you're giving yourself",
    "Create a mirror that shows your kind inner voice",
    "Draw all the things you appreciate about yourself"
  ]
};

const DEFAULT_BRUSH_SIZES = [2, 4, 8, 12, 18, 24];
const DEFAULT_OPACITIES = [1, 0.8, 0.6, 0.4, 0.2];

const BEGINNER_PBN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360">
  <rect width="540" height="360" fill="#ffffff"/>
  <!-- Simple flower -->
  <circle id="region-1" cx="270" cy="180" r="40" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-2" cx="240" cy="150" r="25" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-3" cx="300" cy="150" r="25" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-4" cx="300" cy="210" r="25" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-5" cx="240" cy="210" r="25" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <rect id="region-6" x="265" y="220" width="10" height="60" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Numbers -->
  <text x="270" y="185" font-size="16" text-anchor="middle" fill="#666">1</text>
  <text x="240" y="155" font-size="14" text-anchor="middle" fill="#666">2</text>
  <text x="300" y="155" font-size="14" text-anchor="middle" fill="#666">3</text>
  <text x="300" y="215" font-size="14" text-anchor="middle" fill="#666">4</text>
  <text x="240" y="215" font-size="14" text-anchor="middle" fill="#666">5</text>
  <text x="270" y="255" font-size="14" text-anchor="middle" fill="#666">6</text>
</svg>
`;

const INTERMEDIATE_PBN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360">
  <rect width="540" height="360" fill="#ffffff"/>
  <!-- Butterfly design -->
  <!-- Body -->
  <ellipse id="region-1" cx="270" cy="180" rx="8" ry="60" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Left wing upper -->
  <path id="region-2" d="M262 140 Q220 120, 200 140 Q190 160, 210 180 Q240 190, 262 170 Z" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Left wing lower -->
  <path id="region-3" d="M262 190 Q230 200, 210 220 Q200 240, 220 250 Q250 240, 262 210 Z" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Right wing upper -->
  <path id="region-4" d="M278 140 Q320 120, 340 140 Q350 160, 330 180 Q300 190, 278 170 Z" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Right wing lower -->
  <path id="region-5" d="M278 190 Q310 200, 330 220 Q340 240, 320 250 Q290 240, 278 210 Z" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Wing details -->
  <circle id="region-6" cx="230" cy="160" r="12" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-7" cx="310" cy="160" r="12" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-8" cx="225" cy="225" r="8" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-9" cx="315" cy="225" r="8" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Antennae -->
  <path id="region-10" d="M265 130 Q255 110, 250 100" fill="none" stroke="#888" stroke-width="3"/>
  <path id="region-11" d="M275 130 Q285 110, 290 100" fill="none" stroke="#888" stroke-width="3"/>
  <circle id="region-12" cx="250" cy="100" r="4" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <circle id="region-13" cx="290" cy="100" r="4" fill="#ffffff" stroke="#888" stroke-width="2"/>
  <!-- Numbers -->
  <text x="270" y="185" font-size="12" text-anchor="middle" fill="#666">1</text>
  <text x="230" y="155" font-size="12" text-anchor="middle" fill="#666">2</text>
  <text x="235" y="220" font-size="12" text-anchor="middle" fill="#666">3</text>
  <text x="310" y="155" font-size="12" text-anchor="middle" fill="#666">4</text>
  <text x="305" y="220" font-size="12" text-anchor="middle" fill="#666">5</text>
  <text x="230" y="165" font-size="10" text-anchor="middle" fill="#666">6</text>
  <text x="310" y="165" font-size="10" text-anchor="middle" fill="#666">7</text>
  <text x="225" y="230" font-size="10" text-anchor="middle" fill="#666">8</text>
  <text x="315" y="230" font-size="10" text-anchor="middle" fill="#666">9</text>
  <text x="262" y="120" font-size="8" text-anchor="middle" fill="#666">10</text>
  <text x="278" y="120" font-size="8" text-anchor="middle" fill="#666">11</text>
  <text x="250" y="105" font-size="8" text-anchor="middle" fill="#666">12</text>
  <text x="290" y="105" font-size="8" text-anchor="middle" fill="#666">13</text>
</svg>
`;

const ADVANCED_PBN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 360">
  <rect width="540" height="360" fill="#ffffff"/>
  <!-- Complex castle scene -->
  <!-- Sky sections -->
  <path id="region-1" d="M0 0 L540 0 L540 100 L0 100 Z" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <path id="region-2" d="M0 100 L540 100 L540 140 L0 140 Z" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Castle main tower -->
  <rect id="region-3" x="220" y="140" width="100" height="120" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Castle battlements -->
  <rect id="region-4" x="210" y="130" width="20" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-5" x="240" y="130" width="20" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-6" x="270" y="130" width="20" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-7" x="300" y="130" width="20" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-8" x="330" y="130" width="20" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Side towers -->
  <rect id="region-9" x="180" y="180" width="40" height="80" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-10" x="320" y="180" width="40" height="80" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Tower tops -->
  <polygon id="region-11" points="180,180 200,160 220,180" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <polygon id="region-12" points="320,180 340,160 360,180" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Windows -->
  <rect id="region-13" x="240" y="160" width="15" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-14" x="285" y="160" width="15" height="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-15" x="190" y="200" width="10" height="15" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-16" x="330" y="200" width="10" height="15" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Gate -->
  <path id="region-17" d="M255 260 Q255 240, 275 240 Q295 240, 295 260 L295 280 L255 280 Z" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Ground -->
  <path id="region-18" d="M0 260 L540 260 L540 310 L0 310 Z" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Grass -->
  <path id="region-19" d="M0 310 L540 310 L540 360 L0 360 Z" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Clouds -->
  <circle id="region-20" cx="100" cy="60" r="25" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-21" cx="120" cy="50" r="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-22" cx="80" cy="50" r="18" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-23" cx="420" cy="70" r="22" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-24" cx="440" cy="60" r="18" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <!-- Trees -->
  <rect id="region-25" x="50" y="220" width="15" height="40" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-26" cx="57" cy="220" r="25" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <rect id="region-27" x="450" y="230" width="12" height="30" fill="#ffffff" stroke="#888" stroke-width="1"/>
  <circle id="region-28" cx="456" cy="230" r="20" fill="#ffffff" stroke="#888" stroke-width="1"/>
  
  <!-- Numbers (smaller due to complexity) -->
  <text x="270" y="50" font-size="8" text-anchor="middle" fill="#666">1</text>
  <text x="270" y="120" font-size="8" text-anchor="middle" fill="#666">2</text>
  <text x="270" y="200" font-size="8" text-anchor="middle" fill="#666">3</text>
  <text x="220" y="140" font-size="7" text-anchor="middle" fill="#666">4</text>
  <text x="250" y="140" font-size="7" text-anchor="middle" fill="#666">5</text>
  <text x="280" y="140" font-size="7" text-anchor="middle" fill="#666">6</text>
  <text x="310" y="140" font-size="7" text-anchor="middle" fill="#666">7</text>
  <text x="340" y="140" font-size="7" text-anchor="middle" fill="#666">8</text>
  <text x="200" y="220" font-size="7" text-anchor="middle" fill="#666">9</text>
  <text x="340" y="220" font-size="7" text-anchor="middle" fill="#666">10</text>
  <text x="200" y="170" font-size="6" text-anchor="middle" fill="#666">11</text>
  <text x="340" y="170" font-size="6" text-anchor="middle" fill="#666">12</text>
  <text x="247" y="170" font-size="6" text-anchor="middle" fill="#666">13</text>
  <text x="292" y="170" font-size="6" text-anchor="middle" fill="#666">14</text>
  <text x="195" y="207" font-size="6" text-anchor="middle" fill="#666">15</text>
  <text x="335" y="207" font-size="6" text-anchor="middle" fill="#666">16</text>
  <text x="275" y="250" font-size="6" text-anchor="middle" fill="#666">17</text>
  <text x="270" y="285" font-size="8" text-anchor="middle" fill="#666">18</text>
  <text x="270" y="335" font-size="8" text-anchor="middle" fill="#666">19</text>
  <text x="100" y="65" font-size="6" text-anchor="middle" fill="#666">20</text>
  <text x="120" y="55" font-size="6" text-anchor="middle" fill="#666">21</text>
  <text x="80" y="55" font-size="6" text-anchor="middle" fill="#666">22</text>
  <text x="420" y="75" font-size="6" text-anchor="middle" fill="#666">23</text>
  <text x="440" y="65" font-size="6" text-anchor="middle" fill="#666">24</text>
  <text x="57" y="240" font-size="6" text-anchor="middle" fill="#666">25</text>
  <text x="57" y="225" font-size="6" text-anchor="middle" fill="#666">26</text>
  <text x="456" y="245" font-size="6" text-anchor="middle" fill="#666">27</text>
  <text x="456" y="235" font-size="6" text-anchor="middle" fill="#666">28</text>
</svg>
`;

const PBN_TEMPLATES = {
  beginner: { name: "Beginner - Simple Flower", svg: BEGINNER_PBN_SVG, regions: 6 },
  intermediate: { name: "Intermediate - Butterfly", svg: INTERMEDIATE_PBN_SVG, regions: 13 },
  advanced: { name: "Advanced - Castle Scene", svg: ADVANCED_PBN_SVG, regions: 28 }
};

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
  const [currentTheme, setCurrentTheme] = useState<keyof typeof THERAPY_THEMES>("calm");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Shared UI state
  const [color, setColor] = useState(THERAPY_THEMES.calm.palette[0]);
  const [brushSize, setBrushSize] = useState(8);
  const [opacity, setOpacity] = useState(1);
  const [tool, setTool] = useState<Tool>("BRUSH");
  const [reflection, setReflection] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");

  // For Free Draw
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<any[]>([]);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [stamp, setStamp] = useState<"HEART" | "STAR" | "SMILE">("HEART");
  const [symmetry, setSymmetry] = useState<number>(1);

  // For Paint by Numbers
  const pbnContainerRef = useRef<HTMLDivElement | null>(null);
  const [pbnLevel, setPbnLevel] = useState<keyof typeof PBN_TEMPLATES>("beginner");
  const [pbnSvg, setPbnSvg] = useState<string>(PBN_TEMPLATES.beginner.svg);
  const [pbnColors, setPbnColors] = useState<Record<string, string>>({});

  // For Mandala / Guided
  const [mandalaSvg, setMandalaSvg] = useState<string>(SAMPLE_MANDALA_SVG);
  const [guidedColoring, setGuidedColoring] = useState<Record<string, string>>({});

  // Restore last session
  useEffect(() => {
    const s = readLocal<any>({
      color, brushSize, opacity, tool, mode, strokes, pbnColors, reflection, symmetry, guidedColoring, currentTheme, selectedPrompt
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
    setCurrentTheme(s.currentTheme ?? "calm");
    setSelectedPrompt(s.selectedPrompt ?? "");
  }, []);

  // Persist on change
  useEffect(() => {
    persistLocal({
      color, brushSize, opacity, tool, mode, strokes, pbnColors, reflection, symmetry, guidedColoring, currentTheme, selectedPrompt
    });
  }, [color, brushSize, opacity, tool, mode, strokes, pbnColors, reflection, symmetry, guidedColoring, currentTheme, selectedPrompt]);

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
    }) as unknown as string;
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
      toast.success("Saved successfully!");
    } catch (e) {
      console.error(e);
      toast.success("Saved locally!");
    }
  }

  /* ----------------------------- RENDER ----------------------------- */
  const currentThemeData = THERAPY_THEMES[currentTheme];
  const currentPrompts = THERAPEUTIC_PROMPTS[currentTheme];

  return (
    <div 
      className={`w-full transition-all duration-500 animate-fade-in ${
        isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'
      } flex flex-col gap-4 p-4`}
      style={{ 
        background: currentThemeData.background,
        minHeight: isFullscreen ? '100vh' : '100vh'
      }}
    >
      {/* Therapeutic Theme Header */}
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
              onClick={() => {
                setCurrentTheme(key as keyof typeof THERAPY_THEMES);
                setColor(theme.palette[0]);
                setSelectedPrompt("");
              }}
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
        currentTheme={currentTheme}
      />

      <div className={`flex-1 grid gap-4 ${isFullscreen ? 'grid-cols-1 xl:grid-cols-4' : 'grid-cols-1 lg:grid-cols-4'}`}>
        {/* Canvas / Work Area */}
        <div className={`${isFullscreen ? 'xl:col-span-3' : 'lg:col-span-3'} rounded-lg border border-white/30 overflow-hidden relative bg-white/50 backdrop-blur-sm shadow-lg`}>
          {mode !== "PAINT_BY_NUMBERS" ? (
            <CanvasArea
              canvasRef={canvasRef}
              previewRef={previewRef}
              onStart={startDraw}
              onMove={moveDraw}
              onEnd={endDraw}
            />
          ) : (
            <div ref={pbnContainerRef} className="w-full h-full bg-white/90 overflow-auto p-4">
              <div
                className="max-w-[900px] mx-auto [&_svg]:w-full [&_svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: pbnSvg }}
              />
            </div>
          )}
        </div>

        {/* Therapeutic Sidebar */}
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
      </div>

      {/* Paint by Numbers Level Selection */}
      {mode === "PAINT_BY_NUMBERS" && (
        <div className="rounded-lg border border-white/30 p-4 bg-white/80 backdrop-blur-sm shadow-lg flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-800">Complexity Level:</span>
          <div className="flex items-center gap-2">
            {Object.entries(PBN_TEMPLATES).map(([key, template]) => (
              <button
                key={key}
                onClick={() => {
                  setPbnLevel(key as keyof typeof PBN_TEMPLATES);
                  setPbnSvg(template.svg);
                  setPbnColors({});
                }}
                className={`px-3 py-1.5 text-sm rounded-md border transition-all hover-scale ${
                  pbnLevel === key
                    ? "bg-white text-gray-800 border-gray-300 shadow-md"
                    : "bg-white/60 text-gray-600 border-gray-200 hover:bg-white/80"
                }`}
              >
                {template.name} ({template.regions} regions)
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom SVG uploader */}
      {mode === "PAINT_BY_NUMBERS" && (
        <FileRow
          label="Or upload custom Paint-by-Numbers SVG"
          onFile={(text) => setPbnSvg(text)}
          exampleName="custom_paint_by_numbers.svg"
          exampleContent={PBN_TEMPLATES.beginner.svg}
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
        <details className="text-xs text-gray-500">
          <summary>Show Mandala SVG (read-only)</summary>
          <div
            className="[&_svg]:w-full [&_svg]:h-auto border mt-2"
            dangerouslySetInnerHTML={{ __html: mandalaSvg }}
          />
          <p className="p-2">Tip: Use symmetry greater than 1 to draw radial patterns on the canvas.</p>
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
  currentTheme: keyof typeof THERAPY_THEMES;
}> = ({
  mode, tool, setTool, color, setColor, brushSize, setBrushSize, opacity, setOpacity,
  stamp, setStamp, symmetry, setSymmetry, onUndo, onRedo, onClear, onExport, onSave, currentTheme
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
          <Sel value={stamp} setValue={(v) => setStamp(v as any)} options={["HEART","STAR","SMILE"]} />
        </div>
      )}

      <div className="h-6 w-px bg-gray-300 mx-1" />

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-700 font-medium">Therapeutic Colors</span>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-8 p-0 border rounded-md" />
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
        <Sel value={String(brushSize)} setValue={(v) => setBrushSize(Number(v))} options={DEFAULT_BRUSH_SIZES.map(String)} />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-700 font-medium">Opacity</span>
        <Sel value={String(opacity)} setValue={(v) => setOpacity(Number(v))} options={DEFAULT_OPACITIES.map(String)} />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-700 font-medium">Symmetry</span>
        <Sel value={String(symmetry)} setValue={(v) => setSymmetry(Number(v))} options={["1","2","4","6","8","12"]} />
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
    <div ref={containerRef} className="w-full h-[70vh] sm:h-[75vh] bg-white/90 relative rounded-lg overflow-hidden shadow-inner">
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
    <div className="rounded-lg border border-white/30 p-3 bg-white/80 backdrop-blur-sm shadow-lg flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-800">{label}</span>
      <input type="file" accept=".svg" onChange={handle} className="text-sm" />
      <button className={btn()} onClick={loadExample}>Load Example ({exampleName})</button>
    </div>
  );
};

/* ------------------------------------------------------------------
   UI helpers
-------------------------------------------------------------------*/
function btn(primary = false) {
  return `px-3 py-1.5 text-sm rounded-md border transition-all hover-scale ${
    primary
      ? "bg-white text-gray-800 border-gray-300 shadow-md"
      : "bg-white/80 text-gray-700 border-gray-200 hover:bg-white"
  }`;
}
const Sel: React.FC<{ value: string; setValue: (v: string) => void; options: string[] }> = ({ value, setValue, options }) => (
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

export default ArtTherapyStudio;