
import React, { useState, useRef } from "react";
import { Video, Plus, Calendar, ArrowRight, Play, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VideoDiary: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  
  const recentVideos = [
    {
      id: "v1",
      title: "Weekly Reflection",
      date: "April 1, 2025",
      duration: "2:45",
      description: "Reflecting on my progress this week and setting goals for next week.",
      thumbnail: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-32715-large.mp4"
    },
    {
      id: "v2",
      title: "Message for Future Self",
      date: "March 28, 2025",
      duration: "4:12",
      description: "A reminder of my goals and aspirations to watch in six months.",
      thumbnail: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-sitting-on-the-floor-and-meditating-42424-large.mp4"
    }
  ];
  
  const handleCreateNew = () => {
    toast({
      title: "Opening Video Recorder",
      description: "Preparing to record a new video diary entry...",
      duration: 1500
    });
    
    navigate("/app/video-diary/new", { 
      state: { from: window.location.pathname } 
    });
  };
  
  const handleViewAll = () => {
    navigate("/app/video-diary", { 
      state: { from: window.location.pathname } 
    });
  };
  
  const handleVideoClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (activeVideoId === id) {
      // Toggle play/pause
      const videoElement = videoRefs.current[id];
      if (videoElement) {
        if (videoElement.paused) {
          videoElement.play().catch(e => console.error("Video play failed:", e));
        } else {
          videoElement.pause();
        }
      }
    } else {
      // Stop previous video if any
      if (activeVideoId && videoRefs.current[activeVideoId]) {
        videoRefs.current[activeVideoId]?.pause();
      }
      
      // Set new active video
      setActiveVideoId(id);
      
      // Play new video after a short delay
      setTimeout(() => {
        if (videoRefs.current[id]) {
          videoRefs.current[id]?.play().catch(e => console.error("Video play failed:", e));
        }
      }, 100);
    }
  };
  
  const handleVideoEnd = (id: string) => {
    setActiveVideoId(null);
  };

  const isPlaying = (id: string) => {
    return activeVideoId === id && videoRefs.current[id] && !videoRefs.current[id]?.paused;
  };
  
  return (
    <div className="mb-12 bg-gradient-to-br from-[#2a2a3c] to-[#1f1f2c] rounded-3xl overflow-hidden shadow-xl">
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        
        {/* Content container with improved gradient */}
        <div className="bg-gradient-to-r from-[#F97316]/10 via-[#F59E0B]/10 to-[#F97316]/10 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Video Diary</h2>
            <Video className="h-6 w-6 text-orange-300" />
          </div>
          
          <p className="text-gray-300 text-sm mb-6">
            Record video messages for yourself or share with family members
          </p>
          
          {/* Record button with improved hover effects */}
          <button
            onClick={handleCreateNew}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl flex items-center justify-center text-white font-medium mb-6 hover:brightness-110 transition-all shadow-lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Record New Video
          </button>
          
          <div className="space-y-4">
            <h3 className="text-white font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange-300" />
              Recent Recordings
            </h3>
            
            {/* Video grid with clearer separations and enhanced visuals */}
            <div className="grid grid-cols-2 gap-4">
              {recentVideos.map((video) => (
                <div 
                  key={video.id}
                  className="group cursor-pointer relative bg-[#292938] rounded-xl overflow-hidden shadow-md border border-[#393950] hover:border-orange-500/50 transition-all"
                  onClick={() => navigate(`/app/video-diary/${video.id}`)}
                >
                  <div className="relative rounded-t-lg overflow-hidden mb-2">
                    {activeVideoId === video.id ? (
                      <video 
                        ref={el => videoRefs.current[video.id] = el}
                        src={video.videoUrl} 
                        className="w-full h-28 object-cover" 
                        onEnded={() => handleVideoEnd(video.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-28 object-cover transform transition-transform group-hover:scale-105" 
                      />
                    )}
                    
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                    
                    <div 
                      className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:opacity-100"
                      onClick={(e) => handleVideoClick(video.id, e)}
                      style={{
                        opacity: activeVideoId === video.id || (video.id === activeVideoId) ? 1 : 0
                      }}
                    >
                      {isPlaying(video.id) ? (
                        <div className="bg-orange-500 rounded-full p-1.5 shadow-lg">
                          <Pause className="h-6 w-6 text-white" />
                        </div>
                      ) : (
                        <div className="bg-orange-500 rounded-full p-1.5 shadow-lg">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Video info with improved spacing */}
                  <div className="p-3">
                    <h4 className="text-white text-sm font-medium truncate">{video.title}</h4>
                    <p className="text-gray-400 text-xs mt-1">{video.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* View all button with enhanced interactivity */}
          <button 
            onClick={handleViewAll}
            className="mt-6 flex items-center text-orange-300 hover:text-orange-200 text-sm font-medium transition-colors group"
          >
            View all recordings
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDiary;
