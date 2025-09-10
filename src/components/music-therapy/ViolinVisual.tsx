import React, { useState, useEffect } from 'react';

interface ViolinVisualProps {
  activeNotes: Set<string>;
  onNotePress: (note: string, isKeyDown: boolean) => void;
  octave: number;
}

const ViolinVisual: React.FC<ViolinVisualProps> = ({ activeNotes, onNotePress, octave }) => {
  const [bowPosition, setBowPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (activeNotes.size > 0) {
      setIsPlaying(true);
      const interval = setInterval(() => {
        setBowPosition(prev => (prev + 10) % 100);
      }, 100);
      
      const timeout = setTimeout(() => {
        setIsPlaying(false);
        setBowPosition(50);
      }, 1000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [activeNotes]);

  const strings = [
    { name: 'E', note: `E${octave + 1}`, color: 'border-yellow-400' },
    { name: 'A', note: `A${octave}`, color: 'border-orange-400' },
    { name: 'D', note: `D${octave}`, color: 'border-red-400' },
    { name: 'G', note: `G${octave - 1}`, color: 'border-purple-400' }
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Violin body */}
      <div className="relative bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 rounded-full p-8 shadow-2xl">
        {/* F-holes with subtle glow */}
        <div className={`absolute left-1/3 top-1/4 w-1 h-16 bg-gray-800 rounded-full transform -rotate-12 transition-shadow ${
          isPlaying ? 'shadow-lg shadow-primary/30' : ''
        }`}></div>
        <div className={`absolute right-1/3 top-1/4 w-1 h-16 bg-gray-800 rounded-full transform rotate-12 transition-shadow ${
          isPlaying ? 'shadow-lg shadow-primary/30' : ''
        }`}></div>
        
        {/* Bridge */}
        <div className="absolute left-1/2 top-1/2 w-12 h-1 bg-amber-700 rounded transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Strings with vibration effect */}
        <div className="relative h-32 flex flex-col justify-between py-4">
          {strings.map((string, index) => {
            const isActive = activeNotes.has(string.note);
            
            return (
              <button
                key={string.name}
                className={`w-full h-2 border-2 rounded-full transition-all duration-200 ${
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
                {/* String vibration indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Animated bow */}
        {isPlaying && (
          <div 
            className="absolute top-8 w-32 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-full transform -rotate-12 transition-all duration-100"
            style={{ 
              left: `${bowPosition}%`,
              transform: `translateX(-50%) rotate(-12deg)`,
              opacity: isPlaying ? 1 : 0 
            }}
          >
            <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
          </div>
        )}
        
        {/* String labels */}
        <div className="absolute right-0 top-1/2 transform translate-x-8 -translate-y-1/2 flex flex-col justify-between h-32 py-4">
          {strings.map((string) => (
            <span key={string.name} className="text-sm font-bold text-foreground">
              {string.name}
            </span>
          ))}
        </div>
      </div>
      
      {/* Neck */}
      <div className="mt-4 w-8 h-16 bg-gradient-to-b from-amber-600 to-amber-700 mx-auto rounded-t-lg">
        {/* Tuning pegs */}
        <div className="flex justify-center pt-2 space-x-1">
          {[1, 2, 3, 4].map((peg) => (
            <div key={peg} className="w-1 h-2 bg-gray-800 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViolinVisual;