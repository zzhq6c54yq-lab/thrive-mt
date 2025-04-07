import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Page from "@/components/Page";
import VideoRecorder from "@/components/video-diary/VideoRecorder";
import FamilyShareDialog from "@/components/video-diary/FamilyShareDialog";
import VideoList from "@/components/video-diary/VideoList";
import VideoDetail from "@/components/video-diary/VideoDetail";
import { VideoEntry } from "@/types/video-diary";

const VideoDiary: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoEntry | null>(null);
  
  // Personal video entries with updated images and videos
  const personalVideoEntries: VideoEntry[] = [
    {
      id: "v1",
      title: "Weekly Reflection",
      date: "April 1, 2025",
      duration: "2:45",
      description: "Reflecting on my progress this week and setting goals for next week. This helps me track my journey and stay accountable to myself.",
      thumbnail: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-32715-large.mp4"
    },
    {
      id: "v2",
      title: "Message for Future Self",
      date: "March 28, 2025",
      duration: "4:12",
      description: "A reminder of my goals and aspirations to watch in six months. These time capsule messages help me see my growth over time.",
      thumbnail: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-sitting-on-the-floor-and-meditating-42424-large.mp4"
    },
    {
      id: "v3",
      title: "Gratitude Message",
      date: "March 25, 2025",
      duration: "3:30",
      description: "Expressing gratitude for the support I've received from family and friends. Focusing on gratitude improves my mental well-being.",
      thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-meditating-in-a-fitness-studio-42113-large.mp4"
    },
    {
      id: "v4",
      title: "Therapy Session Thoughts",
      date: "March 20, 2025",
      duration: "5:15",
      description: "Processing my thoughts after today's therapy session. These reflections help me integrate insights from therapy into daily life.",
      thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-exercising-in-a-park-with-a-jumping-rope-42526-large.mp4"
    }
  ];
  
  const lovedOnesVideoEntries: VideoEntry[] = [
    {
      id: "v5",
      title: "Birthday Message for Mom",
      date: "March 30, 2025",
      duration: "3:20",
      description: "A special birthday message for my mom to let her know how much I appreciate her support through my mental health journey.",
      thumbnail: "https://images.unsplash.com/photo-1581579438747-104c53633e4d?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4"
    },
    {
      id: "v6",
      title: "Anniversary Message",
      date: "March 15, 2025",
      duration: "4:45",
      description: "Sharing my feelings with my partner on our anniversary, expressing gratitude for their support in my recovery.",
      thumbnail: "https://images.unsplash.com/photo-1515552726023-7125c8d07fb1?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-a-happy-couple-in-love-hugging-each-other-4909-large.mp4"
    },
    {
      id: "v7",
      title: "Update for Support Group",
      date: "March 10, 2025",
      duration: "6:10",
      description: "Sharing my progress and insights with my support group members who have been there through difficult times.",
      thumbnail: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?auto=format&fit=crop&w=300&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-partying-happily-4640-large.mp4"
    }
  ];

  const handleSaveRecording = (videoBlob: Blob, title: string) => {
    // Create a unique ID for the new video
    const newVideoId = `v${Date.now()}`;
    
    // Create URL for the blob to simulate saved video
    const videoUrl = URL.createObjectURL(videoBlob);
    
    // Create a new video entry
    const newVideo: VideoEntry = {
      id: newVideoId,
      title: title,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      duration: "0:30", // Placeholder duration
      description: "Video diary entry recorded on " + new Date().toLocaleDateString(),
      thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80", // Placeholder thumbnail
      videoUrl: videoUrl
    };
    
    // In a real app, we would upload this to a server
    // For now, just show a toast message
    toast({
      title: "Video Saved",
      description: "Your video diary entry has been saved successfully."
    });
    
    setIsRecording(false);
    navigate("/video-diary");
  };
  
  useEffect(() => {
    if (id) {
      const allVideos = [...personalVideoEntries, ...lovedOnesVideoEntries];
      const video = allVideos.find(v => v.id === id);
      
      if (video) {
        setCurrentVideo(video);
      } else {
        console.log("Video not found:", id);
      }
    } else {
      setCurrentVideo(null);
    }
  }, [id]);
  
  const handleBack = () => {
    // Fix back button navigation
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      // Navigate to /home instead of going back to initial screen
      navigate("/home");
    }
  };
  
  const handleCreateNew = () => {
    setIsRecording(true);
    navigate("/video-diary/new");
  };
  
  const handleShareVideo = (video: VideoEntry) => {
    setCurrentVideo(video);
    setShareDialogOpen(true);
  };

  const renderContent = () => {
    if (id === "new" || isRecording) {
      return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate("/video-diary")}
              className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span className="mr-2">←</span>
              Back to Video Diary
            </button>
          </div>
          
          <VideoRecorder 
            onSave={handleSaveRecording}
            onCancel={() => navigate("/video-diary")}
          />
        </div>
      );
    }
    
    if (id && currentVideo) {
      return <VideoDetail videoId={id} currentVideo={currentVideo} onBack={handleBack} />;
    }
    
    return (
      <VideoList 
        personalVideoEntries={personalVideoEntries}
        lovedOnesVideoEntries={lovedOnesVideoEntries}
        onShareVideo={handleShareVideo}
        onRecordNew={handleCreateNew}
      />
    );
  };

  return (
    <Page 
      title="Video Diary" 
      showBackButton={true} 
      onBackClick={handleBack}
    >
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a20] via-[#252535] to-[#2d2d3d] text-white pb-16">
        {renderContent()}

        {/* Family Share Dialog */}
        {currentVideo && (
          <FamilyShareDialog
            open={shareDialogOpen}
            onOpenChange={setShareDialogOpen}
            videoId={currentVideo.id}
            videoTitle={currentVideo.title}
            videoUrl={currentVideo.videoUrl}
            thumbnailUrl={currentVideo.thumbnail}
          />
        )}
      </div>
    </Page>
  );
};

export default VideoDiary;
