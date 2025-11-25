// Sound Design System - Multi-Modal Experience
// Subtle audio feedback that makes ThriveMT feel alive

export type SoundType = 
  | 'login' 
  | 'achievement' 
  | 'complete'
  | 'notification'
  | 'error'
  | 'breath_in'
  | 'breath_out'
  | 'plant_grow'
  | 'star_appear';

export type AmbientSound = 'none' | 'fireplace' | 'rain' | 'forest' | 'ocean';

class SoundSystem {
  private audioContext: AudioContext | null = null;
  private sounds: Map<SoundType, AudioBuffer> = new Map();
  private ambientAudio: HTMLAudioElement | null = null;
  private enabled: boolean = true;
  private volume: number = 0.3;

  constructor() {
    // Check for user preference from localStorage
    const savedPrefs = localStorage.getItem('sound-preferences');
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      this.enabled = prefs.enabled ?? true;
      this.volume = prefs.volume ?? 0.3;
    }
  }

  async initialize() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
  }

  // Generate sounds using Web Audio API (procedural audio)
  private async generateSound(type: SoundType): Promise<AudioBuffer> {
    await this.initialize();
    const ctx = this.audioContext!;
    
    switch (type) {
      case 'login': // Soft chime - C major chord
        return this.createChime(ctx, [261.63, 329.63, 392.00], 0.8);
      
      case 'achievement': // Bright bell - ascending notes
        return this.createBell(ctx, [523.25, 659.25, 783.99], 1.0);
      
      case 'complete': // Gentle confirmation
        return this.createTone(ctx, 440, 0.3, 'sine');
      
      case 'notification': // Subtle pulse
        return this.createPulse(ctx, 880, 0.2);
      
      case 'error': // Low frequency hum (not harsh)
        return this.createTone(ctx, 220, 0.3, 'triangle');
      
      case 'breath_in': // Rising tone
        return this.createBreath(ctx, 'in');
      
      case 'breath_out': // Falling tone
        return this.createBreath(ctx, 'out');
      
      case 'plant_grow': // Sparkle effect
        return this.createSparkle(ctx);
      
      case 'star_appear': // Twinkle
        return this.createTwinkle(ctx);
      
      default:
        return this.createTone(ctx, 440, 0.2, 'sine');
    }
  }

  // Sound generators
  private createChime(ctx: AudioContext, frequencies: number[], duration: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-3 * t); // Exponential decay
      
      // Sum multiple frequencies for rich harmonic content
      let sample = 0;
      frequencies.forEach((freq, index) => {
        const amplitude = 1 / (index + 1); // Reduce amplitude for higher harmonics
        sample += Math.sin(2 * Math.PI * freq * t) * amplitude;
      });
      
      data[i] = sample * envelope * 0.3;
    }

    return buffer;
  }

  private createBell(ctx: AudioContext, frequencies: number[], duration: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-2 * t);
      
      let sample = 0;
      frequencies.forEach((freq, index) => {
        const delay = index * 0.1; // Stagger notes
        if (t >= delay) {
          sample += Math.sin(2 * Math.PI * freq * (t - delay)) * Math.exp(-2 * (t - delay));
        }
      });
      
      data[i] = sample * envelope * 0.25;
    }

    return buffer;
  }

  private createTone(ctx: AudioContext, frequency: number, duration: number, type: OscillatorType): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-5 * t);
      data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.2;
    }

    return buffer;
  }

  private createPulse(ctx: AudioContext, frequency: number, duration: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.sin(Math.PI * t / duration); // Pulse envelope
      data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.15;
    }

    return buffer;
  }

  private createBreath(ctx: AudioContext, direction: 'in' | 'out'): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const duration = 4; // 4 second breath
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    const startFreq = direction === 'in' ? 220 : 440;
    const endFreq = direction === 'in' ? 440 : 220;

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const progress = t / duration;
      const freq = startFreq + (endFreq - startFreq) * progress;
      const envelope = Math.sin(Math.PI * progress); // Smooth rise and fall
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.1;
    }

    return buffer;
  }

  private createSparkle(ctx: AudioContext): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const duration = 0.5;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    // Multiple high frequencies with random phases
    const frequencies = [2093, 2349, 2637, 2960];
    
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-10 * t);
      
      let sample = 0;
      frequencies.forEach(freq => {
        sample += Math.sin(2 * Math.PI * freq * t + Math.random() * 2 * Math.PI);
      });
      
      data[i] = (sample / frequencies.length) * envelope * 0.15;
    }

    return buffer;
  }

  private createTwinkle(ctx: AudioContext): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const duration = 0.6;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    const frequencies = [1047, 1319, 1568]; // C6, E6, G6 - major triad
    
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-4 * t) * (1 + 0.3 * Math.sin(20 * t)); // Shimmering effect
      
      let sample = 0;
      frequencies.forEach(freq => {
        sample += Math.sin(2 * Math.PI * freq * t);
      });
      
      data[i] = (sample / frequencies.length) * envelope * 0.2;
    }

    return buffer;
  }

  // Play sound
  async play(type: SoundType) {
    if (!this.enabled) return;

    try {
      await this.initialize();
      
      // Generate sound if not cached
      if (!this.sounds.has(type)) {
        const buffer = await this.generateSound(type);
        this.sounds.set(type, buffer);
      }

      const buffer = this.sounds.get(type)!;
      const source = this.audioContext!.createBufferSource();
      const gainNode = this.audioContext!.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = this.volume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);
      
      source.start(0);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Ambient sounds (looping background)
  async playAmbient(type: AmbientSound) {
    // Stop current ambient sound
    this.stopAmbient();
    
    if (type === 'none' || !this.enabled) return;

    // In production, these would be actual audio files
    // For now, we'll use Web Audio API to generate simple ambient sounds
    this.ambientAudio = new Audio();
    
    // Generate looping ambient based on type
    // This would ideally load from Supabase Storage
    console.log(`Playing ambient sound: ${type}`);
  }

  stopAmbient() {
    if (this.ambientAudio) {
      this.ambientAudio.pause();
      this.ambientAudio = null;
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    this.savePreferences();
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.savePreferences();
  }

  private savePreferences() {
    localStorage.setItem('sound-preferences', JSON.stringify({
      enabled: this.enabled,
      volume: this.volume
    }));
  }

  // Haptic feedback (mobile devices)
  vibrate(pattern: number | number[]) {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }
}

// Singleton instance
export const soundSystem = new SoundSystem();

// Convenience functions
export const playSound = (type: SoundType) => soundSystem.play(type);
export const playAmbient = (type: AmbientSound) => soundSystem.playAmbient(type);
export const stopAmbient = () => soundSystem.stopAmbient();
export const vibrate = (pattern: number | number[]) => soundSystem.vibrate(pattern);
