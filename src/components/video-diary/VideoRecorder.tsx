
import React, { useState, useRef, useEffect } from "react";
import { Camera, Video, X, Pause, Play, Save, Mic, MicOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface VideoRecorderProps {
  onSave: (videoBlob: Blob, title: string) => void;
  onCancel: () => void;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({ onSave, onCancel }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedVideoURL, setRecordedVideoURL] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBrowserCompatible, setIsBrowserCompatible] = useState(true);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<number | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  
  const recordingPrompts = [
    "Share your thoughts on how you're feeling today",
    "Reflect on a recent challenge you overcame",
    "Express gratitude for something or someone in your life",
    "Talk about a goal you're working towards",
    "Share a message for your future self",
    "Record a meaningful message for a family member"
  ];

  // Check browser compatibility on mount
  useEffect(() => {
    // Check if MediaRecorder is supported
    if (!window.MediaRecorder) {
      setIsBrowserCompatible(false);
      setErrorMessage("Your browser doesn't support video recording. Please use Chrome, Firefox, or Edge.");
      return;
    }

    // Check if getUserMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsBrowserCompatible(false);
      setErrorMessage("Camera access is not supported in your browser. Please use an updated browser.");
      return;
    }
  }, []);

  const startRecording = async () => {
    try {
      // Clear any previous errors
      setErrorMessage(null);
      
      // Clear previous recording data
      setRecordedChunks([]);
      if (recordedVideoURL) {
        URL.revokeObjectURL(recordedVideoURL);
        setRecordedVideoURL(null);
      }
      
      const constraints = { 
        audio: audioEnabled, 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user" 
        } 
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.muted = true;
      }
      
      // Check for supported MIME types
      const mimeType = getSupportedMimeType();
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };
      
      mediaRecorder.onstart = () => {
        setIsRecording(true);
        setRecordingTime(0);
        recordingTimerRef.current = window.setInterval(() => {
          setRecordingTime((prevTime) => prevTime + 1);
        }, 1000);
      };
      
      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setErrorMessage("An error occurred while recording. Please try again.");
        stopRecording();
      };
      
      mediaRecorder.onstop = () => {
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
        
        setIsRecording(false);
        
        if (recordedChunks.length > 0) {
          const blob = new Blob(recordedChunks, {
            type: mimeType || 'video/webm'
          });
          
          const url = URL.createObjectURL(blob);
          setRecordedVideoURL(url);
        }
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
      
      mediaRecorder.start(1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      let errorMsg = "Could not access camera or microphone. Please check permissions.";
      
      if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
          errorMsg = "Camera or microphone access was denied. Please check your browser permissions.";
        } else if (error.name === 'NotFoundError') {
          errorMsg = "No camera or microphone found. Please ensure your devices are properly connected.";
        } else if (error.name === 'NotReadableError') {
          errorMsg = "Your camera or microphone is already in use by another application.";
        } else if (error.name === 'OverconstrainedError') {
          errorMsg = "The requested camera constraints could not be satisfied.";
        }
      }
      
      setErrorMessage(errorMsg);
      toast({
        title: "Recording Error",
        description: errorMsg,
        variant: "destructive"
      });
    }
  };
  
  // Helper function to get supported MIME type
  const getSupportedMimeType = () => {
    const types = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/webm',
      'video/mp4'
    ];
    
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    
    return null;
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } catch (error) {
        console.error("Error stopping recording:", error);
        setErrorMessage("There was a problem stopping the recording.");
      }
    }
  };
  
  const discardRecording = () => {
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    
    setRecordedChunks([]);
    if (recordedVideoURL) {
      URL.revokeObjectURL(recordedVideoURL);
    }
    setRecordedVideoURL(null);
    setTitle("");
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setRecordingTime(0);
    
    setShowPrompt(true);
    setErrorMessage(null);
  };
  
  const handleSaveRecording = () => {
    if (recordedChunks.length === 0) {
      toast({
        title: "No Recording",
        description: "There is no recording to save.",
        variant: "destructive"
      });
      return;
    }
    
    const finalTitle = title.trim() || `Video Diary - ${new Date().toLocaleDateString()}`;
    
    const blob = new Blob(recordedChunks, {
      type: getSupportedMimeType() || 'video/webm'
    });
    
    onSave(blob, finalTitle);
  };
  
  const changePrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % recordingPrompts.length);
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    
    if (isRecording && streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !audioEnabled;
      });
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (recordedVideoURL) {
        URL.revokeObjectURL(recordedVideoURL);
      }
    };
  }, []);
  
  if (!isBrowserCompatible) {
    return (
      <div className="p-6 bg-[#2a2a3c] rounded-xl shadow-lg text-white">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Compatibility Issue</AlertTitle>
          <AlertDescription>{errorMessage || "Your browser doesn't support video recording."}</AlertDescription>
        </Alert>
        <p className="mb-4">For the best experience, please use one of these browsers:</p>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li>Google Chrome (latest version)</li>
          <li>Mozilla Firefox (latest version)</li>
          <li>Microsoft Edge (latest version)</li>
        </ul>
        <Button onClick={onCancel}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#2a2a3c]/80 to-[#1f1f2c]/80 rounded-xl overflow-hidden shadow-xl">
      <div className="p-5 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Camera className="mr-2 h-5 w-5 text-orange-400" />
          {recordedVideoURL ? "Review Your Recording" : "Record Video Diary Entry"}
        </h2>
        {isRecording && (
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
            <span className="text-red-400 font-medium">{formatTime(recordingTime)}</span>
          </div>
        )}
      </div>
      
      {errorMessage && (
        <Alert variant="destructive" className="m-4 border-red-600">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Recording Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <div className="relative">
        {showPrompt && !isRecording && !recordedVideoURL ? (
          <div className="aspect-video bg-black/70 flex flex-col items-center justify-center text-center p-8">
            <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-6 rounded-xl backdrop-blur-sm border border-orange-500/30 max-w-md">
              <h3 className="text-xl text-orange-300 font-medium mb-3">Prompt Suggestion</h3>
              <p className="text-white text-lg mb-4">"{recordingPrompts[currentPrompt]}"</p>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={changePrompt}
                  className="border-orange-500/50 text-orange-300 hover:bg-orange-500/20"
                >
                  Try Another Prompt
                </Button>
                <Button 
                  onClick={() => setShowPrompt(false)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90"
                >
                  Start Recording
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-black relative">
            {!recordedVideoURL ? (
              <video 
                ref={videoPreviewRef}
                autoPlay 
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <video 
                src={recordedVideoURL}
                controls
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
      </div>
      
      <div className="p-5">
        {recordedVideoURL && (
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Give your recording a title:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter a title for your recording"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        )}
        
        <div className="flex flex-wrap justify-center gap-4">
          {!isRecording && !recordedVideoURL && (
            <>
              <Button
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 flex-1 sm:flex-none"
                onClick={startRecording}
              >
                <Camera className="mr-2 h-5 w-5" />
                Start Recording
              </Button>
              <Button
                variant="outline"
                className="border-orange-500/50 text-orange-300 hover:bg-orange-500/20 flex-1 sm:flex-none"
                onClick={toggleAudio}
              >
                {audioEnabled ? <Mic className="mr-2 h-5 w-5" /> : <MicOff className="mr-2 h-5 w-5" />}
                {audioEnabled ? "Mute Audio" : "Enable Audio"}
              </Button>
            </>
          )}
          
          {isRecording && (
            <>
              <Button
                variant="destructive"
                className="flex-1 sm:flex-none"
                onClick={stopRecording}
              >
                <Pause className="mr-2 h-5 w-5" />
                Stop Recording
              </Button>
            </>
          )}
          
          {recordedVideoURL && (
            <>
              <Button
                className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:opacity-90 flex-1 sm:flex-none"
                onClick={handleSaveRecording}
              >
                <Save className="mr-2 h-5 w-5" />
                Save Recording
              </Button>
              <Button
                variant="outline"
                className="border-orange-300 text-orange-300 hover:bg-orange-500/20 flex-1 sm:flex-none"
                onClick={() => {
                  if (recordedVideoURL) {
                    URL.revokeObjectURL(recordedVideoURL);
                  }
                  setRecordedVideoURL(null);
                  setRecordedChunks([]);
                  setTitle("");
                  startRecording();
                }}
              >
                <Camera className="mr-2 h-5 w-5" />
                Record Again
              </Button>
              <Button
                variant="destructive"
                className="flex-1 sm:flex-none"
                onClick={discardRecording}
              >
                <X className="mr-2 h-5 w-5" />
                Discard Recording
              </Button>
            </>
          )}
        </div>
        
        {!showPrompt && !isRecording && !recordedVideoURL && (
          <button
            onClick={() => setShowPrompt(true)} 
            className="mt-4 text-center w-full text-sm text-orange-300 hover:text-orange-200"
          >
            Show Prompt Suggestions
          </button>
        )}
        
        <Button 
          variant="ghost" 
          className="mt-4 text-gray-400 hover:text-white w-full"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default VideoRecorder;
