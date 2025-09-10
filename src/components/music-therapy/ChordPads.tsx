import React from 'react';
import { Button } from '@/components/ui/button';

interface Chord {
  id: string;
  name: string;
  notes: string[];
  ukuleleNotes?: string[];
}

interface ChordPadsProps {
  chords: Chord[];
  activeChords: Set<string>;
  onChordPress: (chord: Chord) => void;
  onChordRelease: (chord: Chord) => void;
  selectedInstrument: string;
}

const ChordPads: React.FC<ChordPadsProps> = ({ 
  chords, 
  activeChords, 
  onChordPress, 
  onChordRelease, 
  selectedInstrument 
}) => {
  const getNotesLabel = (chord: Chord) => {
    const notes = selectedInstrument === 'ukulele' && chord.ukuleleNotes ? chord.ukuleleNotes : chord.notes;
    return notes.map(note => note.replace(/\d/, '')).join(' ');
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-white/5 rounded-lg">
      {chords.map((chord) => {
        const isActive = activeChords.has(chord.id);
        
        return (
          <Button
            key={chord.id}
            className={`h-20 flex flex-col items-center justify-center gap-2 rounded-xl border transition-all ${
              isActive 
                ? 'bg-primary/60 text-white border-primary/80 scale-95' 
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
            onMouseDown={() => onChordPress(chord)}
            onMouseUp={() => onChordRelease(chord)}
            onMouseLeave={() => onChordRelease(chord)}
            onTouchStart={() => onChordPress(chord)}
            onTouchEnd={() => onChordRelease(chord)}
          >
            <span className="text-lg font-bold">{chord.name}</span>
            <span className="text-xs opacity-75 line-clamp-1 min-h-0">
              {getNotesLabel(chord)}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default ChordPads;