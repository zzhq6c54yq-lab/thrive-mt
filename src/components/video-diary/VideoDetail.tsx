
import React, { useState, useRef, useEffect } from "react";
import { Calendar, Clock, Share2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { VideoEntry } from "@/types/video-diary";
import FamilyShareDialog from "./FamilyShareDialog";

interface VideoDetailProps {
  videoId: string;
  currentVideo: VideoEntry | null;
  onBack: () => void;
}

const VideoDetail: React.FC<VideoDetailProps> = ({ videoId, currentVideo, onBack }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (currentVideo && videoRef.current) {
      videoRef.current.load();
      
      const handleMetadataLoaded = () => {
        setIsVideoLoaded(true);
      };
      
      videoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
        }
      };
    }
  }, [currentVideo]);

  const handleShareVideo = () => {
    if (currentVideo) {
      setShareDialogOpen(true);
    }
  };

  const handleVideoPlay = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // This ensures clicks on the video don't propagate to parent elements
  };

  if (!currentVideo) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-medium text-gray-400">Video not found</h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="bg-[#2a2a3c]/80 rounded-xl overflow-hidden shadow-xl mb-8">
        <div className="relative">
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}
          <video 
            ref={videoRef}
            src={currentVideo.videoUrl} 
            controls 
            className="w-full aspect-video"
            poster={currentVideo.thumbnail}
            preload="auto"
            onCanPlay={() => setIsVideoLoaded(true)}
            onClick={handleVideoPlay}
            onTouchStart={handleVideoPlay}
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-400" />
              <span className="text-gray-300">{currentVideo.date}</span>
              <Clock className="h-5 w-5 ml-4 mr-2 text-indigo-400" />
              <span className="text-gray-300">{currentVideo.duration}</span>
            </div>
            
            <div className="flex space-x-4">
              <button 
                className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
                onClick={handleShareVideo}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share with Family
              </button>
              <button 
                className="text-red-400 hover:text-red-300 transition-colors flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  toast({
                    title: "Video Deleted",
                    description: "Your video has been removed",
                    duration: 1500
                  });
                  navigate("/video-diary");
                }}
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete
              </button>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3">{currentVideo.title}</h3>
          <p className="text-gray-300">{currentVideo.description}</p>
        </div>
      </div>

      {/* Family Share Dialog */}
      <FamilyShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        videoId={currentVideo.id}
        videoTitle={currentVideo.title}
        videoUrl={currentVideo.videoUrl}
        thumbnailUrl={currentVideo.thumbnail}
      />
    </div>
  );
};

export default VideoDetail;
