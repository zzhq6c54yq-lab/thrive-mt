
import React, { useState } from "react";
import { Video, ArrowLeft, Calendar, Clock, Upload, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Page from "@/components/Page";

const VideoDiary: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [videoEntries, setVideoEntries] = useState([
    {
      id: "v1",
      title: "Weekly Reflection",
      date: "April 1, 2025",
      duration: "2:45",
      description: "Reflecting on my progress this week and setting goals for next week.",
      thumbnail: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      videoUrl: "#"
    },
    {
      id: "v2",
      title: "Message for Future Self",
      date: "March 28, 2025",
      duration: "4:12",
      description: "A reminder of my goals and aspirations to watch in six months.",
      thumbnail: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=300&q=80",
      videoUrl: "#"
    },
    {
      id: "v3",
      title: "Gratitude Message",
      date: "March 25, 2025",
      duration: "3:30",
      description: "Expressing gratitude for the support I've received from family and friends.",
      thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      videoUrl: "#"
    },
    {
      id: "v4",
      title: "Therapy Session Thoughts",
      date: "March 20, 2025",
      duration: "5:15",
      description: "Processing my thoughts after today's therapy session.",
      thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      videoUrl: "#"
    }
  ]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleCreateNew = () => {
    navigate("/video-diary/new");
  };
  
  const handleViewVideo = (videoId: string) => {
    navigate(`/video-diary/${videoId}`);
  };

  const renderVideoList = () => {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="mr-4 text-gray-400 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold">Video Diary</h1>
        </div>
        
        <p className="text-gray-300 mb-8">
          Record and save video messages for yourself or to share with loved ones. Track your journey and express your thoughts and feelings through video.
        </p>
        
        <button
          onClick={handleCreateNew}
          className="mb-10 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Video className="mr-2 h-5 w-5" />
          Record New Video Entry
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoEntries.map((entry) => (
            <div 
              key={entry.id}
              className="bg-[#2a2a3c]/80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div 
                className="relative cursor-pointer" 
                onClick={() => handleViewVideo(entry.id)}
              >
                <img 
                  src={entry.thumbnail}
                  alt={entry.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {entry.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
                <div className="flex items-center mt-2 mb-3 text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{entry.date}</span>
                </div>
                <p className="text-gray-300 text-sm">{entry.description}</p>
                
                <div className="flex mt-4 pt-4 border-t border-gray-700/50 justify-between">
                  <button className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center text-sm">
                    <Upload className="h-4 w-4 mr-1" />
                    Share
                  </button>
                  <button className="text-red-400 hover:text-red-300 transition-colors flex items-center text-sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Page title="Video Diary">
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a20] via-[#252535] to-[#2d2d3d] text-white pb-16">
        {renderVideoList()}
      </div>
    </Page>
  );
};

export default VideoDiary;
