
import React, { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Workshop from "@/components/Workshop";
import { workshopData } from "@/data/workshopData";
import Page from "@/components/Page";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Volume, Volume2, ArrowLeft, Download } from "lucide-react";

const WorkshopDetail = () => {
  const { workshopId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);
  
  const workshop = workshopData.find(w => w.id === workshopId);
  
  if (!workshop) {
    return <Navigate to="/workshops" replace />;
  }
  
  const handleBack = () => {
    toast({
      title: "Returning to Workshops",
      description: "Taking you back to the workshops page"
    });
    
    navigate("/workshops");
  };

  const handleMainMenu = () => {
    toast({
      title: "Returning to Main Menu",
      description: "Taking you back to the main menu"
    });
    
    navigate("/", { state: { screenState: 'main' } });
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Sound Enabled" : "Sound Muted",
      description: isMuted ? "Workshop audio is now playing" : "Workshop audio is now muted",
      duration: 1500,
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Downloading Materials",
      description: "Your workshop materials are being downloaded",
      duration: 3000,
    });
    
    // In a real app, this would trigger an actual download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Workshop materials have been downloaded successfully",
        duration: 3000,
      });
    }, 2000);
  };
  
  return (
    <Page title={workshop.title} showBackButton={true} onBackClick={handleBack}>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          {/* Workshop video container */}
          <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
            <video 
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted={isMuted}
              poster={`https://picsum.photos/seed/${workshop.id}/1280/720`}
            >
              {/* Using a sample video URL - in production you would use actual workshop videos */}
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute bottom-4 left-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={toggleMute}
              >
                {isMuted ? <Volume className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                {isMuted ? "Unmute" : "Mute"}
              </Button>
            </div>
          </div>
          
          {/* Workshop facilitator information */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] flex items-center justify-center text-white font-bold text-xl">
              H
            </div>
            <div>
              <h3 className="font-medium">Facilitated by Henry</h3>
              <p className="text-sm text-gray-500">Mental Health Specialist</p>
            </div>
          </div>
          
          {/* Workshop content */}
          <div className="space-y-6 mt-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">About This Workshop</h2>
              <p className="text-gray-700">{workshop.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Workshop Materials</h3>
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{workshop.title} - Workbook</p>
                    <p className="text-sm text-gray-500">PDF, 2.4MB</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Workshops
            </Button>
            
            <Button
              className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white"
              onClick={handleMainMenu}
            >
              Return to Main Menu
            </Button>
          </div>
        </div>
        
        {/* The Workshop component provided by the application */}
        <Workshop workshopData={workshop} />
      </div>
    </Page>
  );
};

export default WorkshopDetail;
