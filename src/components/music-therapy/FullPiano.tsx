import React from 'react';

interface FullPianoProps {
  activeNotes: Set<string>;
  onNotePress: (note: string, isKeyDown: boolean) => void;
}

const FullPiano: React.FC<FullPianoProps> = ({ activeNotes, onNotePress }) => {
  // Generate 61 keys (5 octaves) starting from C2 to C7
  const generateKeys = () => {
    const keys = [];
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    for (let octave = 2; octave <= 6; octave++) {
      for (let i = 0; i < noteNames.length; i++) {
        if (octave === 6 && i > 0) break; // Stop at C7
        keys.push({
          note: `${noteNames[i]}${octave}`,
          isBlack: noteNames[i].includes('#'),
          noteName: noteNames[i]
        });
      }
    }
    return keys;
  };

  const allKeys = generateKeys();
  const whiteKeys = allKeys.filter(key => !key.isBlack);
  const blackKeys = allKeys.filter(key => key.isBlack);

  return (
    <div className="relative w-full overflow-x-auto">
      <div className="min-w-[1200px] mx-auto">
        {/* Piano body with realistic styling */}
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-t-xl p-6 shadow-2xl">
          <div className="relative h-56">
            {/* White keys */}
            <div className="flex h-full gap-0.5">
              {whiteKeys.map((key, index) => {
                const isActive = activeNotes.has(key.note);
                
                return (
                  <button
                    key={key.note}
                    className={`flex-1 min-w-[20px] h-full rounded-b-lg border-2 transition-all duration-100 transform-gpu ${
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
                      {key.noteName}
                    </span>
                  </button>
                );
              })}
            </div>
            
            {/* Black keys positioned over white keys */}
            <div className="absolute top-0 left-0 right-0 flex h-36">
              {whiteKeys.map((whiteKey, index) => {
                // Find if there's a black key after this white key
                const blackKey = blackKeys.find(bk => {
                  const whiteNote = whiteKey.note.replace(/\d/, '');
                  const blackNote = bk.note.replace(/\d/, '').replace('#', '');
                  const octave = whiteKey.note.match(/\d/)?.[0];
                  return blackNote === whiteNote && bk.note.includes(octave || '');
                });
                
                return (
                  <div key={whiteKey.note} className="flex-1 min-w-[20px] relative">
                    {blackKey && (
                      <button
                        className={`absolute right-0 transform translate-x-1/2 w-3 h-full rounded-b-md transition-all duration-100 ${
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
          
          {/* Piano brand label */}
          <div className="text-center mt-4">
            <div className="text-gold-400 font-serif text-lg tracking-wide">THRIVE PIANO</div>
          </div>
        </div>
        
        {/* Piano legs and pedals */}
        <div className="flex justify-between items-end px-12 relative">
          <div className="w-6 h-12 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg"></div>
          <div className="flex space-x-4 absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-3 bg-gold-600 rounded-full shadow-md"></div>
            <div className="w-8 h-3 bg-gold-600 rounded-full shadow-md"></div>
            <div className="w-8 h-3 bg-gold-600 rounded-full shadow-md"></div>
          </div>
          <div className="w-6 h-12 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default FullPiano;