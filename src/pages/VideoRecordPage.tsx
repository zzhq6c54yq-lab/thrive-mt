
import React from "react";
import { useLocation } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent } from "@/components/ui/card";
import { VideoIcon, Mic, MicOff, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/navigation/BackButton";

const VideoRecordPage: React.FC = () => {
  const location = useLocation();
  const recordingType = location.state?.recordingType || "Video Recording";
  
  return (
    <Page title={`Record: ${recordingType}`} showBackButton={false}>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="flex justify-start mb-6">
            <BackButton />
          </div>
          
          <Card className="w-full bg-black/40 border-white/10">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-full aspect-video bg-black/60 rounded-lg flex items-center justify-center mb-4">
                  <VideoIcon className="h-16 w-16 text-white/30" />
                </div>
                
                <h2 className="text-xl text-white mb-6">{recordingType}</h2>
                
                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="rounded-full h-14 w-14 p-0 border-red-400/50 hover:border-red-400 hover:bg-red-400/10"
                  >
                    <MicOff className="h-6 w-6 text-red-400" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="rounded-full h-14 w-14 p-0 border-red-500 bg-red-500/10 hover:bg-red-500/20"
                  >
                    <StopCircle className="h-8 w-8 text-red-500" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="rounded-full h-14 w-14 p-0 border-green-400/50 hover:border-green-400 hover:bg-green-400/10"
                  >
                    <Mic className="h-6 w-6 text-green-400" />
                  </Button>
                </div>
                
                <p className="mt-6 text-white/70 text-sm">
                  You can pause and resume your recording at any time. When finished, click the stop button.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default VideoRecordPage;
