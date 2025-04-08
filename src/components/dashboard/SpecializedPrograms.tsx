
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, GraduationCap, Briefcase } from "lucide-react";

export interface SpecializedProgramsProps {
  navigateToFeature: (path: string) => void;
}

const SpecializedPrograms: React.FC<SpecializedProgramsProps> = ({ navigateToFeature }) => {
  const programs = [
    {
      id: "veterans",
      title: "Veterans Program",
      path: "/dod-welcome",
      coverImage: "https://images.unsplash.com/photo-1586893079425-527e5052b4b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", // American flag image
      color: "blue",
      icon: <Shield className="h-6 w-6 text-white" />
    },
    {
      id: "college",
      title: "College Students",
      path: "/college-welcome",
      coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "purple",
      icon: <GraduationCap className="h-6 w-6 text-white" />
    },
    {
      id: "business",
      title: "Small Business",
      path: "/small-business-welcome",
      coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "emerald",
      icon: <Briefcase className="h-6 w-6 text-white" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {programs.map(program => {
        // Define program-specific styles
        const getStyles = () => {
          switch(program.id) {
            case "veterans":
              return {
                overlayGradient: "from-blue-900/80 to-blue-700/40",
                iconBg: "bg-blue-600",
                starColor: "text-blue-200"
              };
            case "college":
              return {
                overlayGradient: "from-purple-900/80 to-purple-700/40",
                iconBg: "bg-purple-600",
                starColor: "text-purple-200"
              };
            case "business":
              return {
                overlayGradient: "from-emerald-900/80 to-emerald-700/40",
                iconBg: "bg-emerald-600",
                starColor: "text-emerald-200"
              };
            default:
              return {
                overlayGradient: "from-blue-900/80 to-blue-700/40",
                iconBg: "bg-blue-600",
                starColor: "text-blue-200"
              };
          }
        };
        
        const styles = getStyles();
        
        return (
          <Card 
            key={program.id} 
            className="overflow-hidden border-0 h-48 rounded-xl hover:shadow-xl transition-all duration-500 group cursor-pointer relative"
            onClick={() => navigateToFeature(program.path)}
          >
            {/* Image with overlay */}
            <div className="absolute inset-0">
              <img 
                src={program.coverImage} 
                alt={program.title} 
                className={`w-full h-full object-cover transform ${program.id === "veterans" ? "opacity-60" : ""} group-hover:scale-110 transition-transform duration-700`}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
                }}
              />
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${styles.overlayGradient}`}></div>
              
              {/* Special effects for Veterans card */}
              {program.id === "veterans" && (
                <div className="absolute inset-0">
                  {/* Enhanced American flag styling */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-transparent">
                    {/* Enhanced red and white stripes at bottom with better visibility */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30">
                      {[...Array(7)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-[14.3%] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
                        />
                      ))}
                    </div>
                    
                    {/* Stars in top left with better visibility */}
                    <div className="absolute top-2 left-2 h-16 w-24 bg-blue-900/40 opacity-60">
                      <div className="grid grid-cols-4 gap-1 p-1">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="flex items-center justify-center">
                            <Sparkles className="h-2 w-2 text-white" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 z-30">
                {/* Title */}
                <h3 className="font-bold text-2xl text-white drop-shadow-md mb-2 flex items-center gap-2">
                  {program.title}
                </h3>
                
                {/* Explore button */}
                <Button 
                  size="sm"
                  className={`bg-white text-gray-800 hover:bg-opacity-90 shadow-md hover:shadow-lg`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToFeature(program.path);
                  }}
                >
                  <span>Explore</span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
                </Button>
              </div>
              
              {/* Icon */}
              <div className={`absolute top-4 right-4 p-2 rounded-full ${styles.iconBg} backdrop-blur-sm z-20`}>
                {program.icon}
              </div>
              
              {/* Animated stars/sparkles */}
              <div className="absolute inset-0 z-10 overflow-hidden opacity-60">
                <Sparkles className={`absolute top-[15%] left-[20%] h-3 w-3 ${styles.starColor} animate-pulse`} style={{animationDuration: '3s'}} />
                <Sparkles className={`absolute top-[45%] left-[75%] h-2 w-2 ${styles.starColor} animate-pulse`} style={{animationDuration: '4s'}} />
                <Sparkles className={`absolute top-[75%] left-[30%] h-2.5 w-2.5 ${styles.starColor} animate-pulse`} style={{animationDuration: '5s'}} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SpecializedPrograms;
