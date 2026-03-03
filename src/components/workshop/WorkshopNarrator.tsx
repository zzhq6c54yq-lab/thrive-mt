import React from 'react';
import { Play, Pause, Square, Volume2, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface WorkshopNarratorProps {
  isPlaying: boolean;
  isPaused: boolean;
  rate: number;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onRateChange: (rate: number) => void;
  onVoiceChange: (voice: SpeechSynthesisVoice) => void;
}

const WorkshopNarrator: React.FC<WorkshopNarratorProps> = ({
  isPlaying,
  isPaused,
  rate,
  availableVoices,
  selectedVoice,
  onPlay,
  onPause,
  onStop,
  onRateChange,
  onVoiceChange,
}) => {
  return (
    <div className="rounded-xl bg-[#0f1419] border border-white/[0.06] p-4 md:p-5">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          {!isPlaying || isPaused ? (
            <Button
              onClick={onPlay}
              size="icon"
              className="h-10 w-10 rounded-full bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#B87333]/90 hover:to-[#D4AF37]/90 text-white shadow-lg shadow-[#B87333]/20"
            >
              <Play className="h-4 w-4 ml-0.5" />
            </Button>
          ) : (
            <Button
              onClick={onPause}
              size="icon"
              className="h-10 w-10 rounded-full bg-[#B87333]/20 border border-[#B87333]/30 hover:bg-[#B87333]/30 text-[#E5C5A1]"
            >
              <Pause className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            onClick={onStop}
            size="icon"
            variant="ghost"
            disabled={!isPlaying && !isPaused}
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/[0.06] disabled:opacity-30"
          >
            <Square className="h-3.5 w-3.5" />
          </Button>

          {/* Playing indicator */}
          {isPlaying && !isPaused && (
            <div className="flex items-center gap-1.5 ml-2">
              <div className="flex gap-0.5">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="w-0.5 bg-[#D4AF37] rounded-full animate-pulse"
                    style={{
                      height: `${8 + i * 4}px`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-[#E5C5A1] ml-1">Playing</span>
            </div>
          )}
        </div>

        <div className="flex-1 w-full md:w-auto" />

        {/* Speed & Voice Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          {/* Speed */}
          <div className="flex items-center gap-3 min-w-[180px]">
            <Gauge className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Slider
              value={[rate]}
              onValueChange={([value]) => onRateChange(value)}
              min={0.5}
              max={2}
              step={0.1}
              className="flex-1"
            />
            <span className="text-xs font-mono text-muted-foreground w-9 text-right">{rate.toFixed(1)}x</span>
          </div>

          {/* Voice */}
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Select
              value={selectedVoice?.name}
              onValueChange={(voiceName) => {
                const voice = availableVoices.find(v => v.name === voiceName);
                if (voice) onVoiceChange(voice);
              }}
            >
              <SelectTrigger className="w-[180px] h-9 bg-white/[0.03] border-white/[0.08] text-sm">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopNarrator;
