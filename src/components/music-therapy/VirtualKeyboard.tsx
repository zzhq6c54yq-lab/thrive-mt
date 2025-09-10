import React from 'react';
import { Button } from '@/components/ui/button';

interface VirtualKeyboardProps {
  onNotePress: (note: string, isKeyDown: boolean) => void;
  activeNotes: Set<string>;
  octave: number;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onNotePress, activeNotes, octave }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', null, 'F#', 'G#', 'A#', null];

  const getNoteName = (key: string) => `${key}${octave}`;

  return (
    <div className="relative h-20 bg-white/5 rounded-lg p-2">
      <div className="flex h-full gap-0.5">
        {/* White keys */}
        {whiteKeys.map((key, index) => {
          const noteName = getNoteName(key);
          const isActive = activeNotes.has(noteName);
          
          return (
            <Button
              key={key}
              className={`flex-1 h-full rounded-sm border border-white/20 transition-all ${
                isActive 
                  ? 'bg-primary/60 text-white' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
              onMouseDown={() => onNotePress(noteName, true)}
              onMouseUp={() => onNotePress(noteName, false)}
              onMouseLeave={() => onNotePress(noteName, false)}
              onTouchStart={() => onNotePress(noteName, true)}
              onTouchEnd={() => onNotePress(noteName, false)}
            >
              <span className="text-xs font-mono">{key}</span>
            </Button>
          );
        })}
      </div>
      
      {/* Black keys */}
      <div className="absolute top-2 left-2 right-2 flex h-12 gap-0.5">
        {blackKeys.map((key, index) => {
          if (!key) {
            return <div key={index} className="flex-1" />;
          }
          
          const noteName = getNoteName(key);
          const isActive = activeNotes.has(noteName);
          
          return (
            <div key={index} className="flex-1 relative">
              <Button
                className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-full rounded-sm transition-all ${
                  isActive 
                    ? 'bg-primary/80 text-white' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
                onMouseDown={() => onNotePress(noteName, true)}
                onMouseUp={() => onNotePress(noteName, false)}
                onMouseLeave={() => onNotePress(noteName, false)}
                onTouchStart={() => onNotePress(noteName, true)}
                onTouchEnd={() => onNotePress(noteName, false)}
              >
                <span className="text-xs font-mono">{key.replace('#', '♯')}</span>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualKeyboard;