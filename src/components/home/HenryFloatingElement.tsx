
import React, { useRef, useEffect } from "react";

interface HenryFloatingElementProps {
  showHenry: boolean;
  mousePosition: { x: number; y: number };
  henryPosition: { x: number; y: number };
  setHenryPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

const HenryFloatingElement: React.FC<HenryFloatingElementProps> = ({
  showHenry,
  mousePosition,
  henryPosition,
  setHenryPosition
}) => {
  const henryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showHenry && henryRef.current) {
      const henryWidth = henryRef.current.offsetWidth;
      const henryHeight = henryRef.current.offsetHeight;
      
      const targetX = Math.max(20, Math.min(mousePosition.x - henryWidth/2, window.innerWidth - henryWidth - 20));
      const targetY = Math.max(20, Math.min(mousePosition.y + 100, window.innerHeight - henryHeight - 20));
      
      const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
      
      // Update with the correct type for the state setter function
      setHenryPosition(prev => ({
        x: lerp(prev.x, targetX, 0.05),
        y: lerp(prev.y, targetY, 0.05)
      }));
    }
  }, [mousePosition, showHenry, setHenryPosition]);

  if (!showHenry) return null;

  return (
    <div 
      ref={henryRef}
      style={{
        position: 'fixed',
        left: `${henryPosition.x}px`,
        top: `${henryPosition.y}px`,
        zIndex: 50,
      }}
    />
  );
};

export default HenryFloatingElement;
