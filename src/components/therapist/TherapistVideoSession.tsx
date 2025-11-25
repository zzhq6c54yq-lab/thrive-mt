import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import VideoSessionHeader from "./video-session/VideoSessionHeader";
import VideoSessionControls from "./video-session/VideoSessionControls";
import VideoSessionSidePanel from "./video-session/VideoSessionSidePanel";
import VideoSessionSettings from "./video-session/VideoSessionSettings";
import HIPAANotice from "./video-session/HIPAANotice";

export default function TherapistVideoSession() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { toast } = useToast();
  
  // Video refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  // State
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<1 | 2 | 3 | 4>(4);
  const [showReaction, setShowReaction] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // Mock data - replace with real session data
  const clientName = "Sarah Johnson";
  const sessionType = "Individual Therapy";
  const therapistCredentials = "Licensed Therapist, LMFT";
  const therapistId = "therapist-id"; // Get from auth
  const clientId = "client-id"; // Get from session

  // Initialize video stream
  useEffect(() => {
    const initializeStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
          audio: true
        });
        
        setLocalStream(stream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Log session start
        await logSessionEvent('session_started');
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast({
          title: "Camera/Microphone Access Required",
          description: "Please allow access to continue",
          variant: "destructive"
        });
      }
    };

    initializeStream();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Monitor connection quality (mock - implement real WebRTC stats)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate connection quality changes
      const quality = Math.floor(Math.random() * 4) + 1 as 1 | 2 | 3 | 4;
      setConnectionQuality(quality);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const logSessionEvent = async (eventType: string, metadata?: any) => {
    if (!sessionId) return;
    
    await supabase.from('video_session_logs').insert({
      session_id: sessionId || 'mock-session-id',
      event_type: eventType,
      user_id: therapistId,
      metadata
    });
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
        logSessionEvent('audio_toggled', { muted: !audioTrack.enabled });
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
        logSessionEvent('video_toggled', { off: !videoTrack.enabled });
      }
    }
  };

  const switchCamera = async () => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    
    try {
      // Stop current stream
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }

      // Get new stream with switched camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newMode },
        audio: true
      });

      setLocalStream(stream);
      setFacingMode(newMode);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      logSessionEvent('camera_switched', { facingMode: newMode });
    } catch (error) {
      console.error('Error switching camera:', error);
      toast({
        title: "Camera switch failed",
        variant: "destructive"
      });
    }
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setIsScreenSharing(true);
        logSessionEvent('screen_share_started');
        
        // Stop screen sharing when user stops it
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          logSessionEvent('screen_share_ended');
        };
      } catch (error) {
        console.error('Error sharing screen:', error);
      }
    } else {
      setIsScreenSharing(false);
      logSessionEvent('screen_share_ended');
    }
  };

  const sendReaction = (emoji: string) => {
    setShowReaction(emoji);
    logSessionEvent('reaction_sent', { emoji });
    
    // Broadcast reaction via Supabase Realtime
    supabase.channel(`session-${sessionId}`).send({
      type: 'broadcast',
      event: 'reaction',
      payload: { emoji, from: 'therapist' }
    });

    setTimeout(() => setShowReaction(null), 3000);
  };

  const handleEndCall = async () => {
    const confirmed = confirm("Are you sure you want to end this session?");
    if (!confirmed) return;

    await logSessionEvent('session_ended');

    // Stop all tracks
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }

    // Clear session data
    sessionStorage.removeItem(`session-${sessionId}`);

    navigate('/therapist-dashboard');
    
    toast({
      title: "Session Ended",
      description: "Session notes have been saved"
    });
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Header */}
      <VideoSessionHeader
        clientName={clientName}
        sessionType={sessionType}
        therapistCredentials={therapistCredentials}
        connectionQuality={connectionQuality}
      />

      {/* Main Video Area */}
      <div className="absolute inset-0 top-[72px] bottom-[88px]">
        {/* Client Video (Full Screen) */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
        />

        {/* Placeholder for client video (remove when real WebRTC implemented) */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[hsl(var(--primary))]/20 to-background/50">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-[hsl(var(--primary))]/20 border-4 border-[hsl(var(--primary))] mx-auto flex items-center justify-center">
              <span className="text-4xl font-bold text-[hsl(var(--primary))]">
                {clientName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <p className="text-xl font-semibold text-foreground">{clientName}</p>
            <p className="text-sm text-muted-foreground">Waiting for connection...</p>
          </div>
        </div>

        {/* Therapist Video (Draggable PiP) */}
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={{ top: 0, left: 0, right: 500, bottom: 500 }}
          className="absolute bottom-6 right-6 w-64 h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-[hsl(var(--primary))] cursor-move z-10"
        >
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/70 text-xs text-white">
            You
          </div>
        </motion.div>

        {/* Reaction Animation */}
        <AnimatePresence>
          {showReaction && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: 1, y: -50 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl pointer-events-none z-20"
            >
              {showReaction}
            </motion.div>
          )}
        </AnimatePresence>

        {/* HIPAA Notice */}
        <HIPAANotice />
      </div>

      {/* Side Panel */}
      <VideoSessionSidePanel
        sessionId={sessionId || 'mock-session-id'}
        therapistId={therapistId}
        clientId={clientId}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Bottom Controls */}
      <VideoSessionControls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isChatOpen={isChatOpen}
        isScreenSharing={isScreenSharing}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
        onSwitchCamera={switchCamera}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onToggleScreenShare={toggleScreenShare}
        onSendReaction={sendReaction}
        onToggleFiles={() => setIsChatOpen(true)} // Opens side panel to Files tab
        onOpenSettings={() => setIsSettingsOpen(true)}
        onEndCall={handleEndCall}
      />

      {/* Settings Modal */}
      <VideoSessionSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
