import React, { useState } from "react";
import { ArrowLeft, CircleHelp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import HomeButton from "./HomeButton";
import HenryIconButton from "./HenryIconButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PageProps {
  title: string;
  children?: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Page: React.FC<PageProps> = ({ title, children, showBackButton = true, onBackClick }) => {
  const navigate = useNavigate();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate("/", { state: { screenState: 'main' } });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl relative overflow-hidden border border-white/5">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-white hover:bg-white/15 transition-all duration-300"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            
            <h1 className="text-3xl md:text-4xl font-light tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1] drop-shadow-sm">{title}</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="bronze"
                  size="sm"
                  className="flex items-center gap-2 hover:shadow-[0_0_10px_rgba(184,115,51,0.5)]"
                >
                  <div className="h-6 w-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold shadow-inner">
                    <span className="text-sm">H</span>
                  </div>
                  Meet H.E.N.R.Y
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 bg-black/85 backdrop-blur-md border border-[#B87333]/50">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="h-16 w-16 rounded-full flex items-center justify-center border-2 border-[#B87333]/50 bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white">
                      <span className="text-2xl font-bold">H</span>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">
                        H.E.N.R.Y
                      </h3>
                      <p className="text-sm text-white/70 mt-1">
                        <span className="font-medium">H</span>elpful 
                        <span className="font-medium"> E</span>lectronic 
                        <span className="font-medium"> N</span>avigator 
                        <span className="font-medium"> R</span>esponding 
                        <span className="font-medium"> Y</span>es
                      </p>
                    </div>
                    
                    <div className="text-sm text-white/80">
                      <p>
                        I'm your dedicated virtual assistant for the Thrive MT platform. 
                        My purpose is to help you navigate through your mental wellness journey
                        with personalized guidance and support.
                      </p>
                      <p className="mt-2">
                        You can find me throughout the app ready to answer questions,
                        provide resources, and assist you with any features you need help with.
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <HomeButton className="bg-white/5 hover:bg-white/15" />
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-inner transition-all duration-300 hover:shadow-lg">
          {children || (
            <div className="p-8 rounded-lg bg-white/5 text-center backdrop-blur-sm">
              <p className="text-lg text-gray-300">Coming soon! This feature is under development.</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-center mt-6">
          <img 
            src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
            alt="Thrive MT Logo" 
            className="h-8 opacity-60 hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_0_3px_rgba(184,115,51,0.4)]"
          />
        </div>
      </div>
      
      {/* The floating Help (Henry) button */}
      <HenryIconButton />
    </div>
  );
};

export default Page;
