import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Video, VideoOff, Mic, MicOff, MonitorUp, MessageSquare, 
  FileText, Phone, AlertCircle, Maximize, Minimize, Settings 
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

export default function TherapistVideoSession() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientName = searchParams.get("client") || "Client";
  
  const [sessionTime, setSessionTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [notes, setNotes] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    if (confirm("Are you sure you want to end this session?")) {
      navigate('/therapist-dashboard');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-4">
          <img 
            src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
            alt="ThriveMT"
            className="h-10 w-10 object-contain filter drop-shadow-[0_0_8px_rgba(184,115,51,0.6)]"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">{clientName}</h2>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Live Session</span>
              </div>
              <span>•</span>
              <span>{formatTime(sessionTime)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-white/20 text-white/70 hover:text-white hover:bg-white/5"
            onClick={() => setShowNotes(!showNotes)}
          >
            <FileText className="h-4 w-4 mr-2" />
            Notes
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-red-500/50 text-red-400 hover:bg-red-500/20"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Emergency
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleEndCall}
            className="bg-red-600 hover:bg-red-700"
          >
            <Phone className="h-4 w-4 mr-2" />
            End Call
          </Button>
        </div>
      </header>

      {/* Main Video Area */}
      <main className="flex-1 relative overflow-hidden">
        {/* Client Video (Main) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {/* Demo: Placeholder for client video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[#B87333]/20 flex items-center justify-center">
                <span className="text-5xl font-bold text-[#B87333]">
                  {clientName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <p className="text-2xl font-semibold text-white mb-2">{clientName}</p>
              <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
            </div>
          </div>

          {/* Video quality indicator */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-black/50 text-white border-white/20">
              HD • 1080p
            </Badge>
          </div>
        </div>

        {/* Therapist Video (PiP) */}
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={{ top: 0, left: 0, right: 800, bottom: 400 }}
          className="absolute bottom-24 right-6 w-64 h-48 rounded-xl overflow-hidden border-2 border-[#B87333]/50 shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 cursor-move z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isVideoOff ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <VideoOff className="h-12 w-12 text-white/40" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#B87333]/30 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-[#B87333]">You</span>
                </div>
                <p className="text-sm text-white/60">Your Video</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Side Panel: Notes */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-96 bg-black/95 backdrop-blur-sm border-l border-white/10 p-6 z-30"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Session Notes</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowNotes(false)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </Button>
              </div>
              <Textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Record observations, key points, and follow-up items..."
                className="h-[calc(100vh-200px)] bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
              />
              <Button 
                className="w-full mt-4 bg-[#B87333] hover:bg-[#B8941F] text-black"
              >
                Save Notes
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Overlay */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ y: 400, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 400, opacity: 0 }}
              className="absolute bottom-24 left-6 w-96 bg-black/95 backdrop-blur-sm border border-white/20 rounded-xl p-4 z-30"
            >
              <h4 className="text-sm font-semibold text-white mb-3">Chat</h4>
              <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                <p className="text-sm text-white/60 text-center py-4">No messages yet</p>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B87333]"
                />
                <Button size="sm" className="bg-[#B87333] hover:bg-[#B8941F] text-black">
                  Send
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Controls */}
      <footer className="bg-gradient-to-t from-black/90 to-transparent backdrop-blur-sm border-t border-white/10 px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="lg"
            onClick={() => setIsMuted(!isMuted)}
            className={isMuted ? "bg-red-600" : "border-white/20 text-white hover:bg-white/10"}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <Button
            variant={isVideoOff ? "destructive" : "outline"}
            size="lg"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={isVideoOff ? "bg-red-600" : "border-white/20 text-white hover:bg-white/10"}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowChat(!showChat)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <MonitorUp className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={toggleFullscreen}
            className="border-white/20 text-white hover:bg-white/10"
          >
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
