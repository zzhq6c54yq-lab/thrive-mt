import { useRef, useState, useCallback, useEffect } from "react";
import { Stroke, Point, StampType } from "@/types/artTherapyTypes";

const uid = () => Math.random().toString(36).slice(2);
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const useCanvasDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [undoStack, setUndoStack] = useState<Stroke[]>([]);

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.type === "stroke" && stroke.points) {
      ctx.globalAlpha = stroke.opacity;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      stroke.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else if (stroke.type === "stamp" && stroke.x !== undefined && stroke.y !== undefined) {
      drawStamp(ctx, stroke);
    }
  }, []);

  const drawStamp = useCallback((ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.x === undefined || stroke.y === undefined) return;
    
    ctx.save();
    ctx.globalAlpha = stroke.opacity;
    ctx.fillStyle = stroke.color;
    ctx.translate(stroke.x, stroke.y);
    
    if (stroke.stamp === "HEART") {
      heartPath(ctx, stroke.size);
    } else if (stroke.stamp === "STAR") {
      starPath(ctx, stroke.size);
    } else if (stroke.stamp === "SMILE") {
      smilePath(ctx, stroke.size);
    }
    
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
  }, []);

  const heartPath = (ctx: CanvasRenderingContext2D, size: number) => {
    const r = size / 2;
    ctx.beginPath();
    ctx.moveTo(0, r / 2);
    ctx.bezierCurveTo(r, -r / 2, r * 1.5, r, 0, r * 1.6);
    ctx.bezierCurveTo(-r * 1.5, r, -r, -r / 2, 0, r / 2);
  };

  const starPath = (ctx: CanvasRenderingContext2D, size: number) => {
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
  };

  const smilePath = (ctx: CanvasRenderingContext2D, size: number) => {
    const r = size / 2;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.moveTo(-r / 2, -r / 4);
    ctx.arc(-r / 2.5, -r / 4, r / 10, 0, Math.PI * 2);
    ctx.moveTo(r / 2.5, -r / 4);
    ctx.arc(r / 2.5, -r / 4, r / 10, 0, Math.PI * 2);
    ctx.moveTo(-r / 2, r / 4);
    ctx.quadraticCurveTo(0, r / 1.2, r / 2, r / 4);
  };

  const redrawCanvas = useCallback((strokes: Stroke[]) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    strokes.forEach((stroke) => drawStroke(ctx, stroke));
  }, [drawStroke]);

  const getCanvasPosition = useCallback((e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);
    // Scale to canvas resolution
    const canvas = canvasRef.current!;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: x * scaleX, y: y * scaleY };
  }, []);

  const rotatePoint = useCallback((x: number, y: number, cx: number, cy: number, angle: number): Point => {
    const dx = x - cx, dy = y - cy;
    const rx = cx + (dx * Math.cos(angle) - dy * Math.sin(angle));
    const ry = cy + (dx * Math.sin(angle) + dy * Math.cos(angle));
    return { x: rx, y: ry };
  }, []);

  const createSymmetricStrokes = useCallback((
    baseStroke: Stroke, 
    x: number, 
    y: number, 
    symmetry: number
  ): Stroke[] => {
    if (symmetry <= 1) return [baseStroke];

    const canvas = canvasRef.current!;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const angleStep = (Math.PI * 2) / symmetry;

    const strokes = [baseStroke];
    for (let i = 1; i < symmetry; i++) {
      const angle = angleStep * i;
      const rotated = rotatePoint(x, y, cx, cy, angle);
      
      const symmetricStroke: Stroke = {
        ...baseStroke,
        id: uid(),
        x: rotated.x,
        y: rotated.y,
        points: baseStroke.points ? [rotated] : undefined
      };
      strokes.push(symmetricStroke);
    }
    return strokes;
  }, [rotatePoint]);

  const floodFill = useCallback((x: number, y: number, color: string, brushSize: number, opacity: number): Stroke => {
    // Simple flood fill implementation (creates a filled circle)
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d")!;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, brushSize * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    return {
      id: uid(),
      type: "stamp",
      stamp: "SMILE", // Use smile as fill indicator
      x,
      y,
      size: brushSize * 4,
      color,
      opacity
    };
  }, []);

  const undo = useCallback((strokes: Stroke[], setStrokes: (strokes: Stroke[]) => void) => {
    if (strokes.length === 0) return;
    const lastStroke = strokes[strokes.length - 1];
    setUndoStack(prev => [...prev, lastStroke]);
    setStrokes(strokes.slice(0, -1));
  }, []);

  const redo = useCallback((strokes: Stroke[], setStrokes: (strokes: Stroke[]) => void) => {
    if (undoStack.length === 0) return;
    const strokeToRestore = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    setStrokes([...strokes, strokeToRestore]);
  }, [undoStack]);

  const clear = useCallback((setStrokes: (strokes: Stroke[]) => void) => {
    setStrokes([]);
    setUndoStack([]);
  }, []);

  const exportToPNG = useCallback((): string => {
    const cvs = canvasRef.current!;
    return cvs.toDataURL("image/png");
  }, []);

  return {
    canvasRef,
    previewRef,
    isDrawing,
    setIsDrawing,
    undoStack,
    redrawCanvas,
    getCanvasPosition,
    createSymmetricStrokes,
    floodFill,
    undo,
    redo,
    clear,
    exportToPNG
  };
};