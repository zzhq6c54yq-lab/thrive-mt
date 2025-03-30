
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Upload, Play, Share2, Calendar, Clock, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface VideoMessage {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  date: string;
  shared: boolean;
}

const VideoMessagesTab = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoMessage[]>([
    {
      id: "1",
      title: "Birthday Wishes for Mom",
      thumbnail: "/lovable-uploads/776b4638-0382-4cd8-bb25-0a7e36accaf1.png",
      duration: "1:23",
      date: "April 15, 2023",
      shared: true
    },
    {
      id: "2",
      title: "Family Reunion Message",
      thumbnail: "/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png",
      duration: "2:45",
      date: "June 10, 2023",
      shared: false
    }
  ]);

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your video is being uploaded...",
    });
    
    // Simulate upload completion after 2 seconds
    setTimeout(() => {
      const newVideo = {
        id: `${videos.length + 1}`,
        title: "New Video Message",
        thumbnail: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png",
        duration: "0:48",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        shared: false
      };
      
      setVideos([...videos, newVideo]);
      
      toast({
        title: "Upload Complete",
        description: "Your video message has been uploaded successfully!",
      });
    }, 2000);
  };

  const handleShare = (id: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, shared: true } : video
    ));
    
    toast({
      title: "Video Shared",
      description: "Your video has been shared with your loved ones.",
    });
  };

  const handleDelete = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
    
    toast({
      title: "Video Deleted",
      description: "Your video has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl backdrop-blur-sm">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
            <Video className="h-5 w-5 mr-2 text-blue-400" />
            Video Messages
          </h2>
          <p className="text-gray-400">Record and share special moments with your loved ones.</p>
        </div>
        <Button 
          onClick={handleUpload}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Video
        </Button>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
          <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">No Videos Yet</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Start by uploading your first video message to share with your loved ones.
          </p>
          <Button 
            onClick={handleUpload}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Your First Video
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="relative aspect-video bg-gray-800 overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-3 w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 text-gray-300 mr-1" />
                        <span className="text-xs text-gray-300">{video.duration}</span>
                      </div>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-200 mb-1 line-clamp-1">{video.title}</h3>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{video.date}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleShare(video.id)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        <span>{video.shared ? "Shared" : "Share"}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(video.id)}>
                        <Video className="h-4 w-4 mr-2" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {video.shared && (
                  <div className="mt-2 flex items-center">
                    <div className="bg-blue-500/20 text-blue-400 text-xs py-1 px-2 rounded-full flex items-center">
                      <Share2 className="h-3 w-3 mr-1" />
                      <span>Shared</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoMessagesTab;
