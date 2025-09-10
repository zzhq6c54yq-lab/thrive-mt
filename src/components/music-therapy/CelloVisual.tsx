import React, { useState, useEffect } from 'react';

interface CelloVisualProps {
  activeNotes: Set<string>;
  onNotePress: (note: string, isKeyDown: boolean) => void;
  octave: number;
}

const CelloVisual: React.FC<CelloVisualProps> = ({ activeNotes, onNotePress, octave }) => {
  const [bowPosition, setBowPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (activeNotes.size > 0) {
      setIsPlaying(true);
      const interval = setInterval(() => {
        setBowPosition(prev => (prev + 8) % 100);
      }, 120);
      
      const timeout = setTimeout(() => {
        setIsPlaying(false);
        setBowPosition(50);
      }, 1200);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [activeNotes]);
  const strings = [
    { name: 'A', note: `A${octave}`, color: 'border-blue-400' },
    { name: 'D', note: `D${octave}`, color: 'border-green-400' },
    { name: 'G', note: `G${octave - 1}`, color: 'border-orange-400' },
    { name: 'C', note: `C${octave - 1}`, color: 'border-red-400' }
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Cello body */}
      <div className="relative bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 rounded-lg p-12 shadow-2xl" style={{ aspectRatio: '3/4' }}>
        {/* F-holes with performance glow */}
        <div className={`absolute left-1/3 top-1/3 w-2 h-20 bg-gray-800 rounded-full transform -rotate-12 transition-shadow ${
          isPlaying ? 'shadow-lg shadow-primary/30' : ''
        }`}></div>
        <div className={`absolute right-1/3 top-1/3 w-2 h-20 bg-gray-800 rounded-full transform rotate-12 transition-shadow ${
          isPlaying ? 'shadow-lg shadow-primary/30' : ''
        }`}></div>
        
        {/* Bridge */}
        <div className="absolute left-1/2 top-1/2 w-16 h-2 bg-orange-700 rounded transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Tailpiece */}
        <div className="absolute bottom-8 left-1/2 w-12 h-4 bg-gray-800 rounded transform -translate-x-1/2"></div>
        
        {/* Strings with enhanced vibration */}
        <div className="relative h-full flex flex-col justify-center">
          <div className="flex flex-col space-y-4">
            {strings.map((string, index) => {
              const isActive = activeNotes.has(string.note);
              
              return (
                <button
                  key={string.name}
                  className={`w-full h-3 border-2 rounded-full transition-all duration-200 ${
                    string.color
                  } ${
                    isActive 
                      ? 'bg-primary/40 animate-pulse transform scale-110 shadow-lg shadow-primary/50' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  onMouseDown={() => onNotePress(string.note, true)}
                  onMouseUp={() => onNotePress(string.note, false)}
                  onMouseLeave={() => onNotePress(string.note, false)}
                  onTouchStart={() => onNotePress(string.note, true)}
                  onTouchEnd={() => onNotePress(string.note, false)}
                >
                  <span className="sr-only">{string.name} string</span>
                  {/* String vibration effect */}
                  {isActive && (
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Animated bow for cello */}
        {isPlaying && (
          <div 
            className="absolute left-8 w-40 h-2 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 rounded-full transform rotate-45 transition-all duration-120"
            style={{ 
              top: `${40 + (bowPosition % 60)}%`,
              opacity: isPlaying ? 0.9 : 0 
            }}
          >
            <div className="absolute inset-0 bg-white/40 rounded-full animate-pulse"></div>
          </div>
        )}
        
        {/* String labels */}
        <div className="absolute right-0 top-1/2 transform translate-x-12 -translate-y-1/2 flex flex-col justify-center space-y-4">
          {strings.map((string) => (
            <span key={string.name} className="text-lg font-bold text-foreground">
              {string.name}
            </span>
          ))}
        </div>
      </div>
      
      {/* Neck */}
      <div className="mt-4 w-12 h-20 bg-gradient-to-b from-orange-600 to-orange-700 mx-auto rounded-t-lg">
        {/* Tuning pegs */}
        <div className="flex justify-center pt-2 space-x-1">
          {[1, 2, 3, 4].map((peg) => (
            <div key={peg} className="w-2 h-3 bg-gray-800 rounded"></div>
          ))}
        </div>
      </div>
      
      {/* Endpin */}
      <div className="w-2 h-8 bg-gray-800 mx-auto rounded-b-full"></div>
    </div>
  );
};

export default CelloVisual;