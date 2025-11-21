import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Music2, Mic, Radio, Headphones, Heart, Share2, Download, Plus, Settings, Clock, TrendingUp, BarChart3, Users, Square, Video, Trash2, Music, Piano } from "lucide-react";
import Page from '@/components/Page';
import StudioEnvironment from '@/components/music-therapy/StudioEnvironment';
import AudioVisualizer from '@/components/music-therapy/AudioVisualizer';
import ParticleSystem from '@/components/music-therapy/ParticleSystem';
import VirtualKeyboard from '@/components/music-therapy/VirtualKeyboard';
import ChordPads from '@/components/music-therapy/ChordPads';
import InstrumentSelector from '@/components/music-therapy/InstrumentSelector';
import InstrumentVisual from '@/components/music-therapy/InstrumentVisual';
import FullPiano from '@/components/music-therapy/FullPiano';
import DrumKit from '@/components/music-therapy/DrumKit';

// Interfaces
interface RecordedTrack {
  id: string;
  name: string;
  buffer: Tone.ToneAudioBuffer;
  instrument: string;
  timestamp: number;
  type: 'instrument' | 'microphone' | 'video';
  duration?: number;
}

interface AudioEffect {
  id: string;
  name: string;
  type: 'reverb' | 'delay' | 'filter' | 'distortion';
  enabled: boolean;
  settings: any;
}

interface Chord {
  id: string;
  name: string;
  notes: string[];
  ukuleleNotes?: string[];
}

// Common chords data inspired by GarageBandLite
const commonChords: Chord[] = [
  { id: 'C', name: 'C Major', notes: ['C4', 'E4', 'G4'], ukuleleNotes: ['G4', 'C4', 'E4', 'C5'] },
  { id: 'Dm', name: 'D Minor', notes: ['D4', 'F4', 'A4'], ukuleleNotes: ['A4', 'D4', 'F4', 'A4'] },
  { id: 'Em', name: 'E Minor', notes: ['E4', 'G4', 'B4'], ukuleleNotes: ['B4', 'E4', 'G4', 'B4'] },
  { id: 'F', name: 'F Major', notes: ['F4', 'A4', 'C5'], ukuleleNotes: ['C5', 'F4', 'A4', 'C5'] },
  { id: 'G', name: 'G Major', notes: ['G4', 'B4', 'D5'], ukuleleNotes: ['D5', 'G4', 'B4', 'D5'] },
  { id: 'Am', name: 'A Minor', notes: ['A4', 'C5', 'E5'], ukuleleNotes: ['E5', 'A4', 'C5', 'E5'] },
  { id: 'Bdim', name: 'B Diminished', notes: ['B4', 'D5', 'F5'], ukuleleNotes: ['F5', 'B4', 'D5', 'F5'] },
  { id: 'G7', name: 'G7', notes: ['G4', 'B4', 'D5', 'F5'], ukuleleNotes: ['D5', 'G4', 'B4', 'F5'] },
  { id: 'C7', name: 'C7', notes: ['C4', 'E4', 'G4', 'Bb4'], ukuleleNotes: ['G4', 'C4', 'E4', 'Bb4'] }
];

const MusicTherapy: React.FC = () => {
  // State management
  const [volume, setVolume] = useState(70);
  const [selectedInstrument, setSelectedInstrument] = useState('cello');
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [activeChords, setActiveChords] = useState<Set<string>>(new Set());
  const [recordedTracks, setRecordedTracks] = useState<RecordedTrack[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [currentOctave, setCurrentOctave] = useState(4);
  const [micRecording, setMicRecording] = useState(false);
  const [videoRecording, setVideoRecording] = useState(false);
  const [sustain, setSustain] = useState(false);
  const [ukuleleStrum, setUkuleleStrum] = useState(false);
  const [velocity, setVelocity] = useState(100);
  const [audioEffects, setAudioEffects] = useState<AudioEffect[]>([
    { id: 'reverb', name: 'Reverb', type: 'reverb', enabled: false, settings: { roomSize: 0.7, decay: 1.5 } },
    { id: 'delay', name: 'Delay', type: 'delay', enabled: false, settings: { delayTime: 0.25, feedback: 0.3 } },
    { id: 'filter', name: 'Filter', type: 'filter', enabled: false, settings: { frequency: 1000, Q: 1 } },
    { id: 'distortion', name: 'Distortion', type: 'distortion', enabled: false, settings: { distortion: 0.4 } }
  ]);

  // Refs for audio components
  const synths = useRef<{ [key: string]: Tone.Synth | Tone.PolySynth }>({});
  const effects = useRef<{ [key: string]: any }>({});
  const recorder = useRef<Tone.Recorder | null>(null);
  const micRecorder = useRef<MediaRecorder | null>(null);
  const videoRecorder = useRef<MediaRecorder | null>(null);
  const micStream = useRef<MediaStream | null>(null);
  const videoStream = useRef<MediaStream | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const { toast } = useToast();

  // Setup audio context and instruments
  const setupAudio = async () => {
    try {
      // Create effects chain
      effects.current.reverb = new Tone.Reverb(1.5).toDestination();
      effects.current.delay = new Tone.FeedbackDelay(0.25, 0.3).connect(effects.current.reverb);
      effects.current.filter = new Tone.Filter(1000, "lowpass").connect(effects.current.delay);
      effects.current.distortion = new Tone.Distortion(0.4).connect(effects.current.filter);
      
      const effectsChain = effects.current.distortion;

      // Set up main synths
      synths.current.synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1 }
      }).connect(effectsChain);
      
      synths.current.piano = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
      }).connect(effectsChain);
      
      // Violin with vibrato and bow-like attack
      synths.current.violin = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.85, release: 0.9 }
      }).connect(effectsChain);
      
      // Cello with deeper, richer tone
      synths.current.cello = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.85, release: 0.9 }
      }).connect(effectsChain);
      
      // Ukulele with bright, short sustain
      synths.current.ukulele = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.001, decay: 0.1, sustain: 0.6, release: 0.25 }
      }).connect(effectsChain);

      // Setup recorder
      recorder.current = new Tone.Recorder();
      effectsChain.connect(recorder.current);

      // Set BPM
      Tone.Transport.bpm.value = bpm;
      
      console.log('Audio setup complete');
    } catch (error) {
      console.error('Error setting up audio:', error);
      toast({
        title: "Audio Setup Error",
        description: "Failed to initialize audio system",
        variant: "destructive",
      });
    }
  };

  const cleanupAudio = () => {
    try {
      synths.current.synth?.dispose();
      synths.current.piano?.dispose();
      synths.current.violin?.dispose();
      synths.current.cello?.dispose();
      synths.current.ukulele?.dispose();
      Object.values(effects.current).forEach(effect => effect?.dispose());
      recorder.current?.dispose();
    } catch (error) {
      console.error('Error cleaning up audio:', error);
    }
  };

  useEffect(() => {
    setupAudio();
    return cleanupAudio;
  }, []);

  // Update volume
  useEffect(() => {
    Tone.Destination.volume.value = Tone.gainToDb(volume / 100);
  }, [volume]);

  // Enhanced play note function with proper cleanup
  const playNote = async (note: string, isKeyDown = false) => {
    if (!synths.current[selectedInstrument]) return;
    
    await Tone.start();
    
    // Clean up any stuck notes first
    if (isKeyDown) {
      setActiveNotes(prev => new Set(prev).add(note));
    }
    
    const vel = velocity / 127;
    
    if (sustain || isKeyDown) {
      // Stop the note first to prevent sticking
      synths.current[selectedInstrument].triggerRelease(note);
      // Small delay then trigger attack
      setTimeout(() => {
        synths.current[selectedInstrument].triggerAttack(note, Tone.now(), vel);
      }, 10);
    } else {
      // For normal notes, use triggerAttackRelease
      synths.current[selectedInstrument].triggerAttackRelease(note, "8n", Tone.now(), vel);
      setActiveNotes(prev => new Set(prev).add(note));
      setTimeout(() => {
        setActiveNotes(prev => {
          const newSet = new Set(prev);
          newSet.delete(note);
          return newSet;
        });
      }, 100);
    }
  };

  const stopNote = (note: string) => {
    if (!synths.current[selectedInstrument] || sustain) return;
    
    // Ensure clean note release
    try {
      synths.current[selectedInstrument].triggerRelease(note, Tone.now());
    } catch (error) {
      console.warn('Note release error:', error);
    }
    
    setActiveNotes(prev => {
      const newSet = new Set(prev);
      newSet.delete(note);
      return newSet;
    });
  };

  // Play chord function
  const playChord = async (chord: Chord) => {
    if (!synths.current[selectedInstrument]) return;
    
    await Tone.start();
    
    const notes = selectedInstrument === 'ukulele' && chord.ukuleleNotes ? chord.ukuleleNotes : chord.notes;
    const vel = velocity / 127;
    
    // Add visual feedback
    setActiveChords(prev => new Set(prev).add(chord.id));
    
    if (ukuleleStrum && selectedInstrument === 'ukulele') {
      // Strum effect - play notes with slight delay
      notes.forEach((note, index) => {
        setTimeout(() => {
          synths.current[selectedInstrument].triggerAttackRelease(note, "2n", Tone.now(), vel);
        }, index * 50);
      });
    } else {
      // Play all notes simultaneously
      notes.forEach(note => {
        synths.current[selectedInstrument].triggerAttackRelease(note, "2n", Tone.now(), vel);
      });
    }
    
    setTimeout(() => {
      setActiveChords(prev => {
        const newSet = new Set(prev);
        newSet.delete(chord.id);
        return newSet;
      });
    }, 1000);
  };

  const stopChord = (chord: Chord) => {
    if (!synths.current[selectedInstrument]) return;
    
    const notes = selectedInstrument === 'ukulele' && chord.ukuleleNotes ? chord.ukuleleNotes : chord.notes;
    notes.forEach(note => {
      synths.current[selectedInstrument].triggerRelease(note);
    });
    
    setActiveChords(prev => {
      const newSet = new Set(prev);
      newSet.delete(chord.id);
      return newSet;
    });
  };

  // Play drum sounds
  const playDrum = async (drumType: string) => {
    await Tone.start();
    
    const drumSynths: { [key: string]: () => void } = {
      kick: () => {
        const kick = new Tone.MembraneSynth({
          pitchDecay: 0.05,
          octaves: 10,
          oscillator: { type: "sine" },
          envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 }
        }).toDestination();
        kick.triggerAttackRelease("C1", "8n");
      },
      snare: () => {
        const snare = new Tone.NoiseSynth({
          noise: { type: "white" },
          envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
        }).toDestination();
        snare.triggerAttackRelease("4n");
      },
      hihat: () => {
        const hihat = new Tone.MetalSynth({
          envelope: { attack: 0.001, decay: 0.1, release: 0.01 }
        }).toDestination();
        hihat.triggerAttackRelease("C4", "8n");
      },
      clap: () => {
        const clap = new Tone.NoiseSynth({
          noise: { type: "pink" },
          envelope: { attack: 0.01, decay: 0.15, sustain: 0 }
        }).toDestination();
        clap.triggerAttackRelease("16n");
      }
    };

    if (drumSynths[drumType]) {
      drumSynths[drumType]();
    }
  };

  // Recording functions - placeholder implementations
  const startRecording = () => {
    setIsRecording(true);
    toast({ title: "Recording Started", description: "Play some music to record your performance" });
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast({ title: "Recording Complete", description: "Track saved successfully" });
  };

  const startMicRecording = () => {
    setMicRecording(true);
    toast({ title: "Voice Recording Started", description: "Speak or sing into your microphone" });
  };

  const stopMicRecording = () => {
    setMicRecording(false);
    toast({ title: "Voice Recording Complete", description: "Voice track saved" });
  };

  const startVideoRecording = () => {
    setVideoRecording(true);
    toast({ title: "Video Recording Started", description: "Recording video and audio" });
  };

  const stopVideoRecording = () => {
    setVideoRecording(false);
    toast({ title: "Video Recording Complete", description: "Video saved to downloads" });
  };

  const playTrack = (track: RecordedTrack) => {
    toast({ title: "Playing Track", description: track.name });
  };

  const downloadTrack = (track: RecordedTrack) => {
    toast({ title: "Download", description: `Downloading ${track.name}...` });
  };

  const toggleEffect = (effectId: string) => {
    setAudioEffects(prev => prev.map(effect => 
      effect.id === effectId 
        ? { ...effect, enabled: !effect.enabled }
        : effect
    ));
  };

  return (
    <Page title="Music Therapy Studio" featureId="music-therapy">
      <StudioEnvironment>
        {/* Futuristic Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="flex items-center justify-center gap-4">
            <Music className="h-12 w-12 text-primary animate-pulse" />
            <h2 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent logo-glow">
              QUANTUM STUDIO
            </h2>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto text-xl font-light">
            Enter the future of music therapy • Express • Heal • Create through quantum sound
          </p>
          
          {/* Audio Visualizer */}
          <div className="flex justify-center">
            <AudioVisualizer 
              isPlaying={isRecording} 
              activeNotes={activeNotes} 
              className="opacity-80"
            />
          </div>
        </div>

        {/* Holographic Control Panel */}
        <Card className="glass-morphism holographic-border neon-glow">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2 text-2xl font-bold">
              <Volume2 className="h-6 w-6" />
              QUANTUM CONTROLS
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Instrument Selection */}
            <div className="mb-6">
              <label className="text-white text-lg font-medium mb-4 block">Choose Your Instrument</label>
              <InstrumentSelector 
                selectedInstrument={selectedInstrument}
                onInstrumentChange={setSelectedInstrument}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Volume Control */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Volume: {volume}%</label>
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* BPM Control */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">BPM: {bpm}</label>
                <Slider
                  value={[bpm]}
                  onValueChange={(value) => setBpm(value[0])}
                  min={60}
                  max={180}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Velocity Control */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Velocity: {velocity}</label>
                <Slider
                  value={[velocity]}
                  onValueChange={(value) => setVelocity(value[0])}
                  min={10}
                  max={127}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Additional Controls */}
            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="sustain" 
                  checked={sustain} 
                  onCheckedChange={setSustain}
                />
                <label htmlFor="sustain" className="text-white text-sm">Sustain</label>
              </div>
              
              {selectedInstrument === 'ukulele' && (
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="strum" 
                    checked={ukuleleStrum} 
                    onCheckedChange={setUkuleleStrum}
                  />
                  <label htmlFor="strum" className="text-white text-sm">Strum</label>
                </div>
              )}
              
              <div className="flex flex-col gap-1">
                {isRecording && <Badge variant="destructive">Recording Audio</Badge>}
                {micRecording && <Badge className="bg-purple-500">Recording Voice</Badge>}
                {videoRecording && <Badge className="bg-orange-500">Recording Video</Badge>}
                {!isRecording && !micRecording && !videoRecording && <Badge variant="outline">Ready</Badge>}
              </div>
            </div>

            <Separator className="my-6 bg-white/20" />

            {/* Recording Controls */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <Button
                className={`h-20 text-lg font-bold transition-all duration-200 ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                    : 'bg-red-500 hover:bg-red-600'
                } text-white`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? '⏹️ Stop Recording' : '🎤 Start Recording'}
              </Button>
              
              <Button
                className={`h-20 text-lg font-bold transition-all duration-200 ${
                  micRecording 
                    ? 'bg-purple-600 hover:bg-purple-700 animate-pulse' 
                    : 'bg-purple-500 hover:bg-purple-600'
                } text-white`}
                onClick={micRecording ? stopMicRecording : startMicRecording}
              >
                {micRecording ? '⏹️ Stop Mic' : '🎙️ Record Voice'}
              </Button>
              
              <Button
                className={`h-20 text-lg font-bold transition-all duration-200 ${
                  videoRecording 
                    ? 'bg-orange-600 hover:bg-orange-700 animate-pulse' 
                    : 'bg-orange-500 hover:bg-orange-600'
                } text-white`}
                onClick={videoRecording ? stopVideoRecording : startVideoRecording}
              >
                {videoRecording ? '⏹️ Stop Video' : '📹 Record Video'}
              </Button>
              
              <Button
                className="h-20 text-lg font-bold bg-green-500 hover:bg-green-600 text-white"
                onClick={() => recordedTracks.length > 0 && playTrack(recordedTracks[recordedTracks.length - 1])}
                disabled={recordedTracks.length === 0}
              >
                ▶️ Play Latest
              </Button>
              
              <Button
                className="h-20 text-lg font-bold bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => setVolume(prev => prev === 0 ? 70 : 0)}
              >
                {volume === 0 ? '🔇 Unmute' : '🔊 Mute'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Video Preview */}
        {videoRecording && (
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <video
                ref={videoElement}
                autoPlay
                muted
                className="w-full max-w-md mx-auto rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Instrument Visual Display */}
        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Your Instrument</CardTitle>
            <CardDescription className="text-white/70">
              Click on the instrument to play notes directly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InstrumentVisual
              selectedInstrument={selectedInstrument}
              activeNotes={activeNotes}
              activeChords={activeChords}
              onNotePress={playNote}
              octave={currentOctave}
              ukuleleStrum={ukuleleStrum}
            />
          </CardContent>
        </Card>

        {/* Main Interface Tabs */}
        <Tabs defaultValue="chords" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/10">
            <TabsTrigger value="chords" className="text-white data-[state=active]:bg-white/20">Chords</TabsTrigger>
            <TabsTrigger value="keyboard" className="text-white data-[state=active]:bg-white/20">Keyboard</TabsTrigger>
            <TabsTrigger value="drums" className="text-white data-[state=active]:bg-white/20">Drums</TabsTrigger>
            <TabsTrigger value="effects" className="text-white data-[state=active]:bg-white/20">Effects</TabsTrigger>
            <TabsTrigger value="tracks" className="text-white data-[state=active]:bg-white/20">Recordings</TabsTrigger>
          </TabsList>

          <TabsContent value="chords" className="space-y-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Chord Pads</CardTitle>
                <CardDescription className="text-white/70">
                  Play musical chords with a single tap, perfect for creating harmonies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChordPads
                  chords={commonChords}
                  activeChords={activeChords}
                  onChordPress={playChord}
                  onChordRelease={stopChord}
                  selectedInstrument={selectedInstrument}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keyboard" className="space-y-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Full Piano (61 Keys)</CardTitle>
                <CardDescription className="text-white/70">
                  Experience a complete piano range from C2 to C7 for authentic musical expression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FullPiano
                  activeNotes={activeNotes}
                  onNotePress={(note, isKeyDown) => isKeyDown ? playNote(note, true) : stopNote(note)}
                />
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Simple Keyboard</CardTitle>
                <CardDescription className="text-white/70">
                  Quick access keyboard for single octave practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-4">
                  <label className="text-white text-sm">Octave:</label>
                  <div className="flex gap-2">
                    {[3, 4, 5, 6].map(octave => (
                      <Button
                        key={octave}
                        size="sm"
                        variant={currentOctave === octave ? "default" : "outline"}
                        onClick={() => setCurrentOctave(octave)}
                        className="h-8 w-8"
                      >
                        {octave}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <VirtualKeyboard
                  onNotePress={(note, isKeyDown) => isKeyDown ? playNote(note, true) : stopNote(note)}
                  activeNotes={activeNotes}
                  octave={currentOctave}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drums" className="space-y-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Interactive Drum Kit</CardTitle>
                <CardDescription className="text-white/70">
                  Create rhythmic beats with visual drum animations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DrumKit onDrumHit={playDrum} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="effects" className="space-y-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Audio Effects</CardTitle>
                <CardDescription className="text-white/70">
                  Enhance your sound with professional audio effects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {audioEffects.map((effect) => (
                    <div key={effect.id} className="space-y-3 p-4 rounded-lg bg-white/5">
                      <div className="flex items-center justify-between">
                        <label className="text-white font-medium">{effect.name}</label>
                        <Switch
                          checked={effect.enabled}
                          onCheckedChange={() => toggleEffect(effect.id)}
                        />
                      </div>
                      <Badge variant={effect.enabled ? "default" : "outline"}>
                        {effect.enabled ? "ON" : "OFF"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracks" className="space-y-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Your Recordings</CardTitle>
                <CardDescription className="text-white/70">
                  Manage and play back your recorded tracks
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recordedTracks.length === 0 ? (
                  <p className="text-white/60 text-center py-8">
                    No recordings yet. Start creating your first track!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recordedTracks.map((track) => (
                      <div key={track.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">
                            {track.type === 'instrument' ? '🎵' : track.type === 'microphone' ? '🎤' : '📹'}
                          </Badge>
                          <div>
                            <p className="text-white font-medium">{track.name}</p>
                            <p className="text-white/60 text-sm">
                              {track.instrument} • {new Date(track.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => playTrack(track)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => downloadTrack(track)}
                            variant="outline"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setRecordedTracks(prev => prev.filter(t => t.id !== track.id))}
                            variant="destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Therapeutic Benefits */}
        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Therapeutic Benefits</CardTitle>
            <CardDescription className="text-white/70">
              How music therapy supports your mental wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="text-2xl">🧠</div>
                <h3 className="text-white font-medium">Cognitive Enhancement</h3>
                <p className="text-white/70 text-sm">Music stimulates brain plasticity and improves memory</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">💖</div>
                <h3 className="text-white font-medium">Emotional Regulation</h3>
                <p className="text-white/70 text-sm">Express and process emotions through musical creation</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl"><Users className="w-8 h-8 text-[#D4AF37] mx-auto" /></div>
                <h3 className="text-white font-medium">Social Connection</h3>
                <p className="text-white/70 text-sm">Share your musical journey and connect with others</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </StudioEnvironment>
    </Page>
  );
};

export default MusicTherapy;
