import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Volume2, Mic, Video } from "lucide-react";

interface VideoSessionSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoSessionSettings({
  isOpen,
  onClose
}: VideoSessionSettingsProps) {
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMic, setSelectedMic] = useState<string>('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('');
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [volume, setVolume] = useState([80]);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setAudioDevices(devices.filter(d => d.kind === 'audioinput' || d.kind === 'audiooutput'));
        setVideoDevices(devices.filter(d => d.kind === 'videoinput'));
        
        // Set defaults
        const defaultMic = devices.find(d => d.kind === 'audioinput');
        const defaultSpeaker = devices.find(d => d.kind === 'audiooutput');
        const defaultCamera = devices.find(d => d.kind === 'videoinput');
        
        if (defaultMic) setSelectedMic(defaultMic.deviceId);
        if (defaultSpeaker) setSelectedSpeaker(defaultSpeaker.deviceId);
        if (defaultCamera) setSelectedCamera(defaultCamera.deviceId);
      } catch (error) {
        console.error('Error loading devices:', error);
      }
    };

    if (isOpen) {
      loadDevices();
    }
  }, [isOpen]);

  const testAudio = () => {
    const audio = new Audio('/sounds/test-chime.mp3');
    audio.volume = volume[0] / 100;
    audio.play().catch(err => console.error('Error playing test audio:', err));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background/95 backdrop-blur-xl border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[hsl(var(--primary))]">
            Audio & Video Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Microphone Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-[hsl(var(--primary))]" />
              Microphone
            </Label>
            <Select value={selectedMic} onValueChange={setSelectedMic}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select microphone" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-xl">
                {audioDevices
                  .filter(d => d.kind === 'audioinput')
                  .map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Speaker Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[hsl(var(--primary))]" />
              Speaker
            </Label>
            <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select speaker" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-xl">
                {audioDevices
                  .filter(d => d.kind === 'audiooutput')
                  .map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label || `Speaker ${device.deviceId.slice(0, 5)}`}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <Label>Volume: {volume[0]}%</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
              <Button onClick={testAudio} variant="outline" size="sm">
                Test Audio
              </Button>
            </div>
          </div>

          {/* Camera Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Video className="w-4 h-4 text-[hsl(var(--primary))]" />
              Camera
            </Label>
            <Select value={selectedCamera} onValueChange={setSelectedCamera}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select camera" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-xl">
                {videoDevices.map((device) => (
                  <SelectItem key={device.deviceId} value={device.deviceId}>
                    {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Video Quality */}
          <div className="space-y-2">
            <Label>Video Quality</Label>
            <Select defaultValue="hd">
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-xl">
                <SelectItem value="low">Low (360p)</SelectItem>
                <SelectItem value="medium">Medium (720p)</SelectItem>
                <SelectItem value="hd">HD (1080p)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Virtual Background */}
          <div className="space-y-2">
            <Label>Virtual Background</Label>
            <Select defaultValue="none">
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-xl">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="blur">Blur Background</SelectItem>
                <SelectItem value="office">Office Background</SelectItem>
                <SelectItem value="nature">Nature Background</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
