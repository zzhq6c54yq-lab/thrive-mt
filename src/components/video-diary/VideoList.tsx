
import React, { useState, useRef } from "react";
import { Video, BookOpen, Heart, Users, Play, Pause, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VideoEntry } from "@/types/video-diary";
import VideoListItem from "./VideoListItem";
import FamilyVideoFeed from "./FamilyVideoFeed";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface VideoListProps {
  personalVideoEntries: VideoEntry[];
  lovedOnesVideoEntries: VideoEntry[];
  onShareVideo: (video: VideoEntry) => void;
  onRecordNew: () => void;
}

const VideoList: React.FC<VideoListProps> = ({ 
  personalVideoEntries, 
  lovedOnesVideoEntries, 
  onShareVideo,
  onRecordNew
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'personal' | 'loved-ones' | 'family-feed'>('personal');
  const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enhanced video entries with more relevant content
  const enhancedPersonalEntries = personalVideoEntries.map(entry => ({
    ...entry,
    videoUrl: getRelevantVideoUrl(entry.title, 'personal')
  }));
  
  const enhancedLovedOnesEntries = lovedOnesVideoEntries.map(entry => ({
    ...entry,
    videoUrl: getRelevantVideoUrl(entry.title, 'loved-ones')
  }));

  function getRelevantVideoUrl(title: string, type: 'personal' | 'loved-ones'): string {
    const videoMappings: {[key: string]: string} = {
      // Personal reflection videos
      "Weekly Reflection": "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-32715-large.mp4",
      "Therapy Progress": "https://assets.mixkit.co/videos/preview/mixkit-woman-sitting-in-a-living-room-talking-4817-large.mp4",
      "Gratitude Journal": "https://assets.mixkit.co/videos/preview/mixkit-man-writing-in-a-notebook-in-a-cafe-4838-large.mp4",
      "Coping With Anxiety": "https://assets.mixkit.co/videos/preview/mixkit-man-sitting-on-the-floor-in-despair-45938-large.mp4",
      "Sleep Progress": "https://assets.mixkit.co/videos/preview/mixkit-man-sleeping-on-a-couch-5896-large.mp4",
      "Depression Management": "https://assets.mixkit.co/videos/preview/mixkit-young-woman-sitting-on-the-floor-and-meditating-42424-large.mp4",
      "Mindfulness Practice": "https://assets.mixkit.co/videos/preview/mixkit-woman-sitting-in-a-lotus-position-at-sunset-4179-large.mp4",
      "Medication Update": "https://assets.mixkit.co/videos/preview/mixkit-man-taking-pills-from-a-bottle-4450-large.mp4",
      
      // Family/loved ones videos
      "Message for Future Self": "https://assets.mixkit.co/videos/preview/mixkit-man-giving-an-advice-4835-large.mp4",
      "Message to Family": "https://assets.mixkit.co/videos/preview/mixkit-family-sitting-on-the-grass-during-sunset-4829-large.mp4",
      "Message to Children": "https://assets.mixkit.co/videos/preview/mixkit-father-and-son-having-fun-on-beach-4822-large.mp4",
      "Message to Partner": "https://assets.mixkit.co/videos/preview/mixkit-couple-walking-and-holding-hands-4586-large.mp4",
      "Support Group Share": "https://assets.mixkit.co/videos/preview/mixkit-group-of-people-in-a-support-group-session-48922-large.mp4",
      "Gratitude to Friends": "https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-eating-together-at-home-4964-large.mp4",
      "Recovery Journey": "https://assets.mixkit.co/videos/preview/mixkit-man-sitting-on-a-cliff-looking-at-the-sea-4832-large.mp4",
      "Milestone Celebration": "https://assets.mixkit.co/videos/preview/mixkit-excited-girl-talking-on-a-smartphone-4825-large.mp4"
    };
    
    // Return mapped video or a default based on type
    if (title in videoMappings) {
      return videoMappings[title];
    } else {
      return type === 'personal' 
        ? "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-32715-large.mp4"
        : "https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-45658-large.mp4";
    }
  }

  const handleViewVideo = (videoId: string) => {
    const video = [...enhancedPersonalEntries, ...enhancedLovedOnesEntries].find(v => v.id === videoId);
    if (video) {
      setActiveVideo(video);
      setShowVideoModal(true);
    } else {
      navigate(`/video-diary/${videoId}`);
    }
  };
  
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.error("Error playing video:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const getActiveVideos = () => {
    return activeTab === 'personal' ? enhancedPersonalEntries : enhancedLovedOnesEntries;
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="bg-[#2a2a3c]/50 backdrop-blur-md rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-indigo-500/20 rounded-lg">
            <Video className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Express, Reflect, Connect</h2>
            <p className="text-gray-300">
              Your Video Diary is a powerful tool for self-expression and emotional processing. 
              Record private video reflections for your personal journey or create meaningful 
              messages for loved ones and family members. Studies show that verbally expressing thoughts and feelings 
              can significantly reduce stress and provide clarity during mental health challenges.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'personal'
              ? 'bg-indigo-500 text-white'
              : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
          }`}
        >
          <BookOpen className="h-4 w-4 inline mr-2" />
          Personal Reflections
        </button>
        <button
          onClick={() => setActiveTab('loved-ones')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'loved-ones'
              ? 'bg-pink-500 text-white'
              : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
          }`}
        >
          <Heart className="h-4 w-4 inline mr-2" />
          For My Loved Ones
        </button>
        <button
          onClick={() => setActiveTab('family-feed')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'family-feed'
              ? 'bg-amber-500 text-white'
              : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          Family Feed
        </button>
      </div>
      
      <Button
        onClick={onRecordNew}
        className="mb-10 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center text-white font-medium hover:opacity-90 transition-opacity"
      >
        <Video className="mr-2 h-5 w-5" />
        Record New Video Entry
      </Button>
      
      {activeTab === 'family-feed' ? (
        <div className="mb-8">
          <FamilyVideoFeed onWatchVideo={handleViewVideo} />
        </div>
      ) : activeTab === 'loved-ones' ? (
        <div className="bg-[#2a2a3c]/30 backdrop-blur-sm rounded-xl p-5 mb-8">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 mr-2 text-pink-400" />
            <h3 className="text-xl font-semibold text-white">Messages for Loved Ones</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Create heartfelt video messages for family members, friends, or support groups to express 
            gratitude, share your journey, or maintain connection during your recovery process. 
            These messages can strengthen your support network and provide emotional comfort during challenging times.
          </p>
          <p className="text-gray-300 text-sm mt-3">
            Research shows that expressing gratitude and appreciation to others not only benefits them but also
            significantly improves your own mental well-being. The act of creating and sharing these messages
            activates the brain's reward centers and releases dopamine and serotonin, promoting feelings of happiness and connection.
          </p>
        </div>
      ) : null}
      
      {activeTab !== 'family-feed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getActiveVideos().map((entry) => (
            <VideoListItem
              key={entry.id}
              entry={{...entry, videoUrl: entry.videoUrl || ''}}
              onView={() => handleViewVideo(entry.id)}
              onShare={() => onShareVideo(entry)}
            />
          ))}
        </div>
      )}
      
      {/* Video Player Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="bg-[#1a1a2e] border-[#3a3a4c] text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-white flex items-center gap-2">
              <Video className="h-5 w-5 text-indigo-400" />
              {activeVideo?.title}
            </DialogTitle>
            {activeVideo?.description && (
              <DialogDescription className="text-gray-300">
                {activeVideo.description}
              </DialogDescription>
            )}
          </DialogHeader>
          
          <div className="w-full aspect-video bg-black/70 rounded-md overflow-hidden relative">
            {activeVideo?.videoUrl && (
              <>
                <video 
                  ref={videoRef}
                  src={activeVideo.videoUrl}
                  className="w-full h-full object-contain"
                  onEnded={handleVideoEnded}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20"
                  onClick={handlePlayPause}
                >
                  <button 
                    className={`
                      w-16 h-16 rounded-full bg-indigo-500/80 flex items-center justify-center
                      text-white transition-opacity ${isPlaying ? 'opacity-0' : 'opacity-100'}
                    `}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                </div>
              </>
            )}
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>Recorded on {activeVideo?.date || 'Unknown date'}</span>
            </div>
            
            {activeTab === 'loved-ones' && (
              <Button
                size="sm"
                variant="outline"
                className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10"
                onClick={() => {
                  setShowVideoModal(false);
                  if (activeVideo) onShareVideo(activeVideo);
                }}
              >
                <Heart className="h-4 w-4 mr-1" />
                Share with Loved Ones
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoList;
