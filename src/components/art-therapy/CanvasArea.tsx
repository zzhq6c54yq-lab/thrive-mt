import React, { useEffect, useRef } from "react";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  previewRef: React.RefObject<HTMLCanvasElement>;
  onStart: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onEnd: () => void;
}

export const CanvasArea: React.FC<Props> = ({ 
  canvasRef, 
  previewRef, 
  onStart, 
  onMove, 
  onEnd 
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resize = () => {
      const el = containerRef.current;
      const cvs = canvasRef.current;
      const prev = previewRef.current;
      if (!el || !cvs || !prev) return;
      
      const rect = el.getBoundingClientRect();
      // Crisp drawing without blur
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      
      cvs.width = w * 2; 
      cvs.height = h * 2; // hi-dpi internal
      prev.width = w * 2; 
      prev.height = h * 2;
      
      cvs.style.width = w + "px";
      cvs.style.height = h + "px";
      prev.style.width = w + "px";
      prev.style.height = h + "px";
      
      const ctx = cvs.getContext("2d");
      const pctx = prev.getContext("2d");
      if (ctx) ctx.scale(2, 2);
      if (pctx) pctx.scale(2, 2);
    };
    
    resize();
    const obs = new ResizeObserver(resize);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [canvasRef, previewRef]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[70vh] sm:h-[75vh] bg-white/90 relative rounded-lg overflow-hidden shadow-inner"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none cursor-crosshair"
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
      />
      <canvas 
        ref={previewRef} 
        className="absolute inset-0 pointer-events-none" 
      />
    </div>
  );
};