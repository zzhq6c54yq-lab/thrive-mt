import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWebRTC } from '@/hooks/useWebRTC';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function ClientVideoSession() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sessionId: sessionIdParam } = useParams();
  const [searchParams] = useSearchParams();
  const sessionIdFromQuery = searchParams.get('sessionId');
  
  const sessionId = sessionIdParam || sessionIdFromQuery || crypto.randomUUID();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const dragConstraintsRef = useRef<HTMLDivElement>(null);

  // Client is NOT the initiator in WebRTC
  const {
    localStream,
    remoteStream,
    isConnected,
    toggleMute,
    toggleVideo,
    disconnect
  } = useWebRTC({
    sessionId,
    isInitiator: false,
    onRemoteStream: (stream) => {
      console.log('Client: Received remote stream');
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    },
    onConnectionStateChange: (state) => {
      console.log('Client: Connection state:', state);
      if (state === 'failed' || state === 'disconnected') {
        toast({
          title: "Connection issue",
          description: "Video connection was interrupted. Attempting to reconnect...",
          variant: "destructive"
        });
      }
    }
  });

  // Set up local video
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Get user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        toast({
          title: "Authentication required",
          description: "Please log in to join the session",
          variant: "destructive"
        });
        navigate('/app/auth');
      }
    };
    getUser();
  }, [navigate, toast]);

  const handleToggleMute = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  const handleToggleVideo = () => {
    const videoOff = toggleVideo();
    setIsVideoOff(videoOff);
  };

  const handleEndCall = () => {
    disconnect();
    toast({
      title: "Call ended",
      description: "You have left the session",
    });
    navigate('/app/dashboard');
  };

  return (
    <div 
      ref={dragConstraintsRef}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col"
    >
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Video Session with Dr. Chris Hopkins</h1>
            <p className="text-sm text-gray-300">
              {isConnected ? '● Connected' : '○ Connecting...'}
            </p>
          </div>
          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            className="gap-2"
          >
            <PhoneOff className="w-5 h-5" />
            End Call
          </Button>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Therapist Video (Full Screen) */}
        <div className="absolute inset-0">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: 'translateZ(0)' }}
          />
          {!isConnected && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <Video className="w-10 h-10 text-[#D4AF37] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Connecting to therapist...</h3>
                  <p className="text-gray-400">Please wait while we establish the connection</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Client Video (Picture-in-Picture) */}
        <motion.div
          drag
          dragConstraints={dragConstraintsRef}
          dragMomentum={false}
          dragElastic={0}
          className="absolute bottom-24 right-6 w-64 h-48 rounded-lg overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl cursor-move"
          style={{ willChange: 'transform' }}
        >
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: 'translateZ(0) scaleX(-1)' }}
          />
          {isVideoOff && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <VideoOff className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">You</span>
          </div>
        </motion.div>
      </div>

      {/* Control Bar */}
      <div className="bg-black/40 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={handleToggleMute}
            className="w-16 h-16 rounded-full"
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            variant={isVideoOff ? "destructive" : "secondary"}
            size="lg"
            onClick={handleToggleVideo}
            className="w-16 h-16 rounded-full"
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-16 h-16 rounded-full"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <style>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}