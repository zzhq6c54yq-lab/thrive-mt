import { useEffect, useRef, useState } from 'react';

export const useBinauralBeats = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const startBinauralBeat = (frequency: number, beatFrequency: number, volume: number = 0.3) => {
    // Create AudioContext
    audioContextRef.current = new AudioContext();
    const ctx = audioContextRef.current;
    
    // Create stereo panner for left/right channels
    const leftGain = ctx.createGain();
    const rightGain = ctx.createGain();
    const leftPanner = ctx.createStereoPanner();
    const rightPanner = ctx.createStereoPanner();
    
    leftPanner.pan.value = -1; // Full left
    rightPanner.pan.value = 1;  // Full right
    
    leftGain.gain.value = volume;
    rightGain.gain.value = volume;
    
    // Left ear: base frequency
    const leftOsc = ctx.createOscillator();
    leftOsc.type = 'sine';
    leftOsc.frequency.value = frequency;
    leftOscillatorRef.current = leftOsc;
    
    // Right ear: base frequency + beat frequency
    const rightOsc = ctx.createOscillator();
    rightOsc.type = 'sine';
    rightOsc.frequency.value = frequency + beatFrequency;
    rightOscillatorRef.current = rightOsc;
    
    // Connect nodes
    leftOsc.connect(leftGain).connect(leftPanner).connect(ctx.destination);
    rightOsc.connect(rightGain).connect(rightPanner).connect(ctx.destination);
    
    // Start oscillators
    leftOsc.start();
    rightOsc.start();
    
    setIsPlaying(true);
  };
  
  const stopBinauralBeat = () => {
    if (leftOscillatorRef.current) {
      leftOscillatorRef.current.stop();
      leftOscillatorRef.current = null;
    }
    if (rightOscillatorRef.current) {
      rightOscillatorRef.current.stop();
      rightOscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsPlaying(false);
  };
  
  useEffect(() => {
    return () => {
      stopBinauralBeat();
    };
  }, []);
  
  return { startBinauralBeat, stopBinauralBeat, isPlaying };
};
