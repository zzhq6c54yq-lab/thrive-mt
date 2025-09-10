import React from 'react';

interface PianoVisualProps {
  activeNotes: Set<string>;
  onNotePress: (note: string, isKeyDown: boolean) => void;
  octave: number;
}

const PianoVisual: React.FC<PianoVisualProps> = ({ activeNotes, onNotePress, octave }) => {
  // Extended range for visual display - 3 octaves
  const generateVisualKeys = () => {
    const keys = [];
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    for (let oct = octave - 1; oct <= octave + 1; oct++) {
      for (let i = 0; i < noteNames.length; i++) {
        keys.push({
          note: `${noteNames[i]}${oct}`,
          isBlack: noteNames[i].includes('#'),
          noteName: noteNames[i],
          octave: oct
        });
      }
    }
    return keys;
  };

  const allKeys = generateVisualKeys();
  const whiteKeys = allKeys.filter(key => !key.isBlack);
  const blackKeys = allKeys.filter(key => key.isBlack);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Grand piano body with realistic styling */}
      <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-lg p-6 shadow-2xl overflow-hidden">
        <div className="relative h-48">
          {/* White keys with enhanced styling */}
          <div className="flex h-full gap-0.5">
            {whiteKeys.map((key, index) => {
              const isActive = activeNotes.has(key.note);
              
              return (
                <button
                  key={key.note}
                  className={`flex-1 min-w-[32px] h-full rounded-b-lg border-2 transition-all duration-100 transform-gpu ${
                    isActive 
                      ? 'bg-gradient-to-b from-primary/60 to-primary/80 border-primary scale-95 shadow-inner' 
                      : 'bg-gradient-to-b from-white to-gray-100 border-gray-300 hover:from-gray-50 hover:to-gray-200 shadow-lg'
                  }`}
                  onMouseDown={() => onNotePress(key.note, true)}
                  onMouseUp={() => onNotePress(key.note, false)}
                  onMouseLeave={() => onNotePress(key.note, false)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    onNotePress(key.note, true);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    onNotePress(key.note, false);
                  }}
                >
                  <span className={`block mt-auto mb-4 text-xs font-mono transition-colors ${
                    isActive ? 'text-white font-bold' : 'text-gray-700'
                  }`}>
                    {key.noteName}{key.octave}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Black keys positioned over white keys */}
          <div className="absolute top-0 left-0 right-0 flex h-32">
            {whiteKeys.map((whiteKey, index) => {
              // Find if there's a black key after this white key
              const blackKey = blackKeys.find(bk => {
                const whiteNote = whiteKey.note.replace(/\d/, '');
                const blackNote = bk.note.replace(/\d/, '').replace('#', '');
                const octave = whiteKey.octave;
                return blackNote === whiteNote && bk.octave === octave;
              });
              
              return (
                <div key={whiteKey.note} className="flex-1 min-w-[32px] relative">
                  {blackKey && (
                    <button
                      className={`absolute right-0 transform translate-x-1/2 w-6 h-full rounded-b-md transition-all duration-100 ${
                        activeNotes.has(blackKey.note)
                          ? 'bg-gradient-to-b from-primary/70 to-primary/90 shadow-inner scale-95' 
                          : 'bg-gradient-to-b from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 shadow-md'
                      }`}
                      onMouseDown={() => onNotePress(blackKey.note, true)}
                      onMouseUp={() => onNotePress(blackKey.note, false)}
                      onMouseLeave={() => onNotePress(blackKey.note, false)}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        onNotePress(blackKey.note, true);
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        onNotePress(blackKey.note, false);
                      }}
                    >
                      <span className="block mt-auto mb-4 text-xs font-mono text-white">
                        {blackKey.noteName.replace('#', '♯')}
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Piano legs */}
      <div className="flex justify-between px-8">
        <div className="w-4 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-md"></div>
        <div className="w-4 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-md"></div>
      </div>
    </div>
  );
};

export default PianoVisual;