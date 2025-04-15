
import React from "react";
import { Button } from "@/components/ui/button";
import { Trophy, BookOpen, ArrowRight } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface FeaturedContentProps {
  onFeatureClick: (feature: string) => void;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ onFeatureClick }) => {
  const { getTranslatedText } = useTranslation();
  
  return (
    <div className="bg-gradient-to-br from-[#1E1916]/90 to-[#2A2420]/90 backdrop-blur-md border-2 border-[#D4AF37]/40 rounded-xl p-6 mb-10 shadow-lg relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z%22 fill=%22%23D4AF37%22 fill-opacity=%220.05%22/></svg>')] opacity-30 pointer-events-none"></div>
      
      {/* Metallic accent elements */}
      <div className="absolute top-0 right-0 w-32 h-32 -rotate-12 transform translate-x-8 -translate-y-8 opacity-30 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/10 rounded-full blur-md"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 rotate-12 transform -translate-x-8 translate-y-8 opacity-20 bg-gradient-to-tl from-[#D4AF37]/20 to-[#B8860B]/10 rounded-full blur-md"></div>
      
      {/* Highlight badge */}
      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-4 py-1 rounded-bl-xl rounded-tr-xl text-white font-semibold text-sm shadow-lg z-20 border border-[#FFC000]/40">
        Featured Resource
      </div>
      
      <div className="relative z-10 grid md:grid-cols-5 gap-6">
        {/* Content Section: 3 columns */}
        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold mb-4 flex items-center text-[#D4AF37]">
            <Trophy className="mr-3 h-7 w-7 text-[#D4AF37]" />
            Legacy Journal
          </h2>
          
          <p className="mb-6 text-white text-lg leading-relaxed">
            Preserve your life story, wisdom, and memories in our beautifully designed Legacy Journal. Create a meaningful keepsake that can be shared with your loved ones and future generations. Document your journey, experiences, and the lessons you've learned throughout your life.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white px-6 py-5 text-lg font-medium shadow-lg flex items-center space-x-2 transform transition-all duration-300 hover:-translate-y-1 border border-[#FFC000]/30"
              onClick={() => onFeatureClick("Legacy Journal")}
            >
              <BookOpen className="mr-2" />
              Start Your Journal
            </Button>
            <Button 
              variant="outline" 
              className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 px-6 py-5 text-lg transform transition-all duration-300 hover:-translate-y-1"
              onClick={() => onFeatureClick("Legacy Journal Guide")}
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Image Section: 2 columns */}
        <div className="md:col-span-2 flex items-center justify-center">
          <div className="relative w-full h-64 md:h-full rounded-xl overflow-hidden border-2 border-[#D4AF37]/30">
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500"
              alt="Legacy Journal" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1811]/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="px-3 py-1 bg-[#D4AF37]/80 text-white text-sm font-medium rounded-full">
                Preserve Your Story
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
