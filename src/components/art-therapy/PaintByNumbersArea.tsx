import React, { useEffect } from "react";
import { usePaintByNumbers } from "@/hooks/usePaintByNumbers";
import { SafeSvgRenderer } from "./SafeSvgRenderer";

interface Props {
  pbnSvg: string;
  color: string;
  setPbnColors: (fn: (prev: Record<string, string>) => Record<string, string>) => void;
}

export const PaintByNumbersArea: React.FC<Props> = ({ 
  pbnSvg, 
  color, 
  setPbnColors 
}) => {
  const { containerRef, setupClickHandlers } = usePaintByNumbers();

  useEffect(() => {
    const cleanup = setupClickHandlers(color, setPbnColors);
    return cleanup;
  }, [color, setPbnColors, setupClickHandlers]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-white/90 overflow-auto p-4"
    >
      <SafeSvgRenderer 
        svgContent={pbnSvg}
        className="max-w-[900px] mx-auto [&_svg]:w-full [&_svg]:h-auto"
      />
    </div>
  );
};