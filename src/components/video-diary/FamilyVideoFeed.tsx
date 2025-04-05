
import React, { useState } from "react";
import { Heart, Calendar, Users, Play, Bookmark, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  getSharedVideos,
  SharedVideo,
  getAllFamilyMembers,
  getFamilyMemberById
} from "@/services/familyShareService";

interface FamilyVideoFeedProps {
  onWatchVideo: (videoId: string) => void;
}

const FamilyVideoFeed: React.FC<FamilyVideoFeedProps> = ({ onWatchVideo }) => {
  const { toast } = useToast();
  const [sharedVideos] = useState<SharedVideo[]>(getSharedVideos());
  const [activeTab, setActiveTab] = useState<"received" | "shared">("received");
  
  const handleReact = (videoId: string, reaction: "like" | "save" | "comment") => {
    const actions = {
      like: "liked",
      save: "saved",
      comment: "commented on"
    };
    
    toast({
      title: `Video ${actions[reaction]}`,
      description: reaction === "comment" ? "Your comment has been added to this video" : `This video has been ${actions[reaction]}`,
    });
  };
  
  const getFamilyMemberNames = (memberIds: string[]): string => {
    if (memberIds.length === 0) return "No one yet";
    
    const members = memberIds.map(id => {
      const member = getFamilyMemberById(id);
      return member ? member.name : "Unknown";
    });
    
    if (members.length === 1) return members[0];
    if (members.length === 2) return `${members[0]} and ${members[1]}`;
    return `${members[0]}, ${members[1]} and ${members.length - 2} more`;
  };
  
  if (sharedVideos.length === 0) {
    return (
      <div className="py-12 text-center">
        <Users className="h-16 w-16 mx-auto mb-4 text-indigo-300 opacity-50" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">No Shared Videos Yet</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          When you or your family members share videos, they will appear here. Share a video from your personal diary to get started.
        </p>
        <Button
          onClick={() => toast({
            title: "Video Diary",
            description: "Go to your video diary to record and share new videos with family."
          })}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Record New Video
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex space-x-2 border-b pb-2">
        <Button
          variant={activeTab === "received" ? "default" : "ghost"}
          className={activeTab === "received" ? "bg-indigo-600" : ""}
          onClick={() => setActiveTab("received")}
        >
          From Family
        </Button>
        <Button
          variant={activeTab === "shared" ? "default" : "ghost"}
          className={activeTab === "shared" ? "bg-indigo-600" : ""}
          onClick={() => setActiveTab("shared")}
        >
          Shared by You
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sharedVideos.map((video) => (
          <div 
            key={video.videoId}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div 
              className="aspect-video relative cursor-pointer group"
              onClick={() => onWatchVideo(video.videoId)}
            >
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="bg-white rounded-full p-3">
                  <Play className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                Shared with {getFamilyMemberNames(video.sharedWith)}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{video.date}</span>
              </div>
              
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-gray-600 hover:text-red-500"
                    onClick={() => handleReact(video.videoId, "like")}
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    Like
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-gray-600 hover:text-blue-500"
                    onClick={() => handleReact(video.videoId, "comment")}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Comment
                  </Button>
                </div>
                
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-gray-600 hover:text-purple-500"
                  onClick={() => handleReact(video.videoId, "save")}
                >
                  <Bookmark className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyVideoFeed;
