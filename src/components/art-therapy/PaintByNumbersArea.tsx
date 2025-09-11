import React, { useEffect } from "react";
import { usePaintByNumbers } from "@/hooks/usePaintByNumbers";

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
      <div
        className="max-w-[900px] mx-auto [&_svg]:w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: pbnSvg }}
      />
    </div>
  );
};