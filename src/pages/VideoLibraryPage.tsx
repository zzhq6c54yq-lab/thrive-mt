
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Calendar, Clock, Download, Share2, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/navigation/BackButton";
import ActionButton from "@/components/navigation/ActionButton";

const VideoLibraryPage: React.FC = () => {
  const location = useLocation();
  const params = useParams<{ videoId?: string }>();
  const isViewingVideo = !!params.videoId;
  
  // Sample video data - in a real app this would come from an API or state
  const videoEntries = [
    { id: "yesterday", title: "Daily Check-In", date: "Yesterday", duration: "2 mins" },
    { id: "3-days-ago", title: "Guided Reflection", date: "3 days ago", duration: "4 mins" },
    { id: "last-week", title: "Daily Check-In", date: "Last week", duration: "5 mins" },
    { id: "two-weeks-ago", title: "Custom Prompt", date: "2 weeks ago", duration: "7 mins" },
    { id: "last-month", title: "Gratitude Reflection", date: "Last month", duration: "3 mins" },
  ];
  
  // Find the current video if viewing a specific one
  const currentVideo = isViewingVideo ? 
    videoEntries.find(v => v.id === params.videoId) || videoEntries[0] : 
    null;
  
  return (
    <Page title={isViewingVideo ? `Video: ${currentVideo?.title}` : "Video Library"} showBackButton={false}>
      <div className="flex flex-col p-4">
        <div className="flex justify-start mb-6">
          <BackButton />
        </div>
        
        {isViewingVideo && currentVideo ? (
          <div className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardContent className="p-6">
                <div className="w-full aspect-video bg-black/60 rounded-lg flex items-center justify-center mb-4 relative group cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-16 w-16 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h2 className="text-xl text-white font-medium">{currentVideo.title}</h2>
                    <div className="flex items-center gap-4 mt-1 text-white/70">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {currentVideo.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {currentVideo.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <Button variant="outline" size="sm" className="text-white/70">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                    <Button variant="outline" size="sm" className="text-white/70">
                      <Share2 className="h-4 w-4 mr-1" /> Share
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="text-white/90 mb-2 font-medium">Notes</h3>
                  <p className="text-white/70 text-sm">
                    Your personal notes and reflections will appear here. You can edit them at any time.
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 text-[#9b87f5]">
                    <Edit className="h-4 w-4 mr-1" /> Edit Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white/90">Related Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {videoEntries.filter(v => v.id !== params.videoId).slice(0, 3).map(video => (
                    <div key={video.id} className="bg-black/50 rounded-lg overflow-hidden group cursor-pointer">
                      <div className="aspect-video bg-gray-800 relative flex items-center justify-center">
                        <Play className="h-10 w-10 text-white/50 group-hover:text-white/90 transition-colors" />
                      </div>
                      <div className="p-3">
                        <p className="text-white/80 text-sm font-medium">{video.title}</p>
                        <p className="text-white/50 text-xs">{video.date} • {video.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white/90">My Video Diary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {videoEntries.map(video => (
                    <div key={video.id} className="bg-black/50 rounded-lg overflow-hidden group cursor-pointer">
                      <div className="aspect-video bg-gray-800 relative flex items-center justify-center">
                        <Play className="h-12 w-12 text-white/50 group-hover:text-white/90 transition-colors" />
                        <div className="absolute inset-0 group-hover:bg-black/20 transition-colors"></div>
                      </div>
                      <div className="p-3">
                        <p className="text-white/80 text-sm font-medium">{video.title}</p>
                        <p className="text-white/50 text-xs">{video.date} • {video.duration}</p>
                        <div className="mt-2">
                          <ActionButton
                            type="other"
                            title="View"
                            path={`/video-diary/view/${video.id}`}
                            variant="ghost"
                            size="sm"
                            className="text-[#9b87f5] p-0"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <ActionButton
                type="record"
                title="Record New Video"
                variant="gold"
                className="mr-4"
              />
              <Button variant="gold-outline">
                Manage Videos
              </Button>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default VideoLibraryPage;
