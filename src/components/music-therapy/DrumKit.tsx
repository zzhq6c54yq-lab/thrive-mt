import React, { useState, useEffect } from 'react';

interface DrumKitProps {
  onDrumHit: (drumType: string) => void;
}

const DrumKit: React.FC<DrumKitProps> = ({ onDrumHit }) => {
  const [activeDrums, setActiveDrums] = useState<Set<string>>(new Set());

  const hitDrum = (drumType: string) => {
    onDrumHit(drumType);
    setActiveDrums(prev => new Set(prev).add(drumType));
    
    // Remove active state after animation
    setTimeout(() => {
      setActiveDrums(prev => {
        const newSet = new Set(prev);
        newSet.delete(drumType);
        return newSet;
      });
    }, 150);
  };

  const drums = [
    { id: 'kick', name: 'Kick', position: 'bottom-4 left-1/2 transform -translate-x-1/2', size: 'w-24 h-24', color: 'from-gray-800 to-gray-900' },
    { id: 'snare', name: 'Snare', position: 'bottom-16 left-1/3 transform -translate-x-1/2', size: 'w-16 h-16', color: 'from-gray-600 to-gray-700' },
    { id: 'hihat', name: 'Hi-Hat', position: 'top-8 left-1/4', size: 'w-12 h-12', color: 'from-yellow-400 to-yellow-600' },
    { id: 'crash', name: 'Crash', position: 'top-4 right-1/4', size: 'w-16 h-16', color: 'from-yellow-400 to-yellow-600' },
    { id: 'tom1', name: 'Tom 1', position: 'top-12 left-1/2 transform -translate-x-1/2', size: 'w-14 h-14', color: 'from-red-600 to-red-700' },
    { id: 'tom2', name: 'Tom 2', position: 'top-20 right-1/3', size: 'w-14 h-14', color: 'from-red-600 to-red-700' },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto h-96 bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
      {/* Stage/Floor */}
      <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-gray-700 to-gray-800"></div>
      
      {/* Drum Kit Setup */}
      {drums.map((drum) => {
        const isActive = activeDrums.has(drum.id);
        
        return (
          <button
            key={drum.id}
            className={`absolute ${drum.position} ${drum.size} rounded-full cursor-pointer transition-all duration-150 transform-gpu ${
              isActive ? 'scale-90 shadow-inner' : 'hover:scale-105 shadow-lg'
            } bg-gradient-to-br ${drum.color} border-2 border-white/20`}
            onMouseDown={() => hitDrum(drum.id)}
            onTouchStart={(e) => {
              e.preventDefault();
              hitDrum(drum.id);
            }}
          >
            {/* Drum surface reflection */}
            <div className={`absolute inset-2 rounded-full bg-white/10 transition-opacity ${
              isActive ? 'opacity-100' : 'opacity-20'
            }`}></div>
            
            {/* Drum label */}
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium">
              {drum.name}
            </span>
            
            {/* Impact animation */}
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
            )}
          </button>
        );
      })}
      
      {/* Drumsticks */}
      <div className="absolute bottom-20 right-8 flex space-x-2">
        <div className="w-1 h-16 bg-gradient-to-t from-amber-600 to-amber-400 rounded-full transform rotate-12"></div>
        <div className="w-1 h-16 bg-gradient-to-t from-amber-600 to-amber-400 rounded-full transform -rotate-12"></div>
      </div>
    </div>
  );
};

export default DrumKit;