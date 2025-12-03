import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Circle, Square, RotateCcw, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VideoMessageRecorderProps {
  onComplete: (videoUrl: string) => void;
  onCancel: () => void;
}

export const VideoMessageRecorder: React.FC<VideoMessageRecorderProps> = ({ onComplete, onCancel }) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const MAX_DURATION = 300; // 5 minutes in seconds

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
        audio: true
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera access denied",
        description: "Please allow camera and microphone access to record a video message.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=vp9'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(blob);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.src = URL.createObjectURL(blob);
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(1000); // Collect data every second
    setIsRecording(true);
    setRecordingTime(0);

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= MAX_DURATION - 1) {
          stopRecording();
          return MAX_DURATION;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      stopCamera();
    }
  };

  const resetRecording = async () => {
    setRecordedBlob(null);
    setRecordingTime(0);
    chunksRef.current = [];
    await startCamera();
  };

  const uploadAndSubmit = async () => {
    if (!recordedBlob) return;

    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const fileName = `video-message-${user.id}-${Date.now()}.webm`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('video-messages')
        .upload(fileName, recordedBlob, {
          contentType: 'video/webm',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('video-messages')
        .getPublicUrl(fileName);

      onComplete(publicUrl);
      
      toast({
        title: "Video message recorded",
        description: "Your video message has been sent to Dr. Chris Hopkins.",
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload video message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] bg-clip-text text-transparent">
            Record Video Message
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Preview */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted={!recordedBlob}
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Recording indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 text-white px-3 py-1 rounded-full">
              <Circle className="w-3 h-3 fill-current animate-pulse" />
              <span className="font-semibold">{formatTime(recordingTime)}</span>
            </div>
          )}

          {/* Time limit warning */}
          {isRecording && recordingTime >= MAX_DURATION - 30 && (
            <div className="absolute top-14 left-4 bg-yellow-500/90 text-black px-3 py-1 rounded text-sm font-semibold">
              {MAX_DURATION - recordingTime}s remaining
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {!recordedBlob ? (
            <>
              {!isRecording ? (
                <Button
                  size="lg"
                  variant="gold"
                  onClick={startRecording}
                  className="gap-2"
                >
                  <Circle className="w-5 h-5" />
                  Start Recording
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={stopRecording}
                  className="gap-2"
                >
                  <Square className="w-5 h-5" />
                  Stop Recording
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={resetRecording}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Re-record
              </Button>
              <Button
                variant="gold"
                onClick={uploadAndSubmit}
                disabled={isUploading}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                {isUploading ? 'Sending...' : 'Send Message'}
              </Button>
            </>
          )}
        </div>

        {/* Info text */}
        <p className="text-sm text-center text-muted-foreground">
          {!recordedBlob 
            ? `Record up to ${MAX_DURATION / 60} minutes. Your message will be sent to Dr. Chris Hopkins.`
            : `Video recorded: ${formatTime(recordingTime)}. Review and send when ready.`
          }
        </p>
      </CardContent>
    </Card>
  );
};