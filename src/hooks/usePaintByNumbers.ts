import { useRef, useEffect, useCallback } from "react";
import { PBN_TEMPLATES } from "@/data/paintByNumbersTemplates";

export const usePaintByNumbers = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setupClickHandlers = useCallback((color: string, setPbnColors: (fn: (prev: Record<string, string>) => Record<string, string>) => void) => {
    const container = containerRef.current;
    if (!container) return;
    
    const svgEl = container.querySelector("svg");
    if (!svgEl) return;

    const onClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const id = target.getAttribute("id");
      if (!id) return;
      
      // Accept region-* ids or shapes
      if (id.startsWith("region-") || ["path", "circle", "rect", "polygon"].includes(target.tagName.toLowerCase())) {
        (target as any).style.fill = color;
        setPbnColors(prev => ({ ...prev, [id]: color }));
      }
    };

    svgEl.addEventListener("click", onClick);
    return () => svgEl.removeEventListener("click", onClick);
  }, []);

  const exportPNG = useCallback(async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const container = containerRef.current;
      if (!container) {
        reject(new Error("Container not found"));
        return;
      }

      const svg = container.innerHTML;
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 720;
      const ctx = canvas.getContext("2d")!;
      
      const img = new Image();
      img.onload = () => {
        try {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/png"));
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error("Failed to load SVG"));
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    });
  }, []);

  const downloadFile = useCallback((dataUrl: string, filename: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  return {
    containerRef,
    setupClickHandlers,
    exportPNG,
    downloadFile,
    templates: PBN_TEMPLATES
  };
};