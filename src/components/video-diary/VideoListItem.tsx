
import React from "react";
import { Calendar, Clock, Share2, Trash2, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VideoEntry } from "@/types/video-diary";

interface VideoListItemProps {
  entry: VideoEntry;
  onView: (videoId: string) => void;
  onShare: (video: VideoEntry) => void;
}

const VideoListItem: React.FC<VideoListItemProps> = ({ entry, onView, onShare }) => {
  const { toast } = useToast();

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onView(entry.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare(entry);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Video Deleted",
      description: "Your video has been removed",
      duration: 1500
    });
  };

  return (
    <div 
      className="bg-[#2a2a3c]/80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
      onClick={handleItemClick}
    >
      <div className="relative">
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
          <button 
            className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center text-sm"
            onClick={handleShareClick}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </button>
          <button 
            className="text-red-400 hover:text-red-300 transition-colors flex items-center text-sm"
            onClick={handleDeleteClick}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoListItem;
