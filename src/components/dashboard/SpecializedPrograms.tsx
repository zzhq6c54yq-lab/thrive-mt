
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
      coverImage: "https://images.unsplash.com/photo-1476370648495-3533f64427a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", // Better American flag image
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
                overlayGradient: "from-blue-900/70 to-red-700/30",
                iconBg: "bg-blue-600",
                starColor: "text-blue-200",
                cardBg: "bg-gradient-to-r from-white to-blue-50"
              };
            case "college":
              return {
                overlayGradient: "from-purple-900/80 to-purple-700/40",
                iconBg: "bg-purple-600",
                starColor: "text-purple-200",
                cardBg: "bg-gradient-to-r from-white to-purple-50"
              };
            case "business":
              return {
                overlayGradient: "from-emerald-900/80 to-emerald-700/40",
                iconBg: "bg-emerald-600",
                starColor: "text-emerald-200",
                cardBg: "bg-gradient-to-r from-white to-emerald-50"
              };
            default:
              return {
                overlayGradient: "from-blue-900/80 to-blue-700/40",
                iconBg: "bg-blue-600",
                starColor: "text-blue-200",
                cardBg: "bg-gradient-to-r from-white to-blue-50"
              };
          }
        };
        
        const styles = getStyles();
        
        return (
          <Card 
            key={program.id} 
            className="overflow-hidden border-0 h-60 rounded-xl hover:shadow-xl transition-all duration-500 group cursor-pointer relative"
            onClick={() => navigateToFeature(program.path)}
          >
            {/* Top half: Image with overlay */}
            <div className="absolute inset-0 h-1/2">
              <img 
                src={program.coverImage} 
                alt={program.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
                }}
              />
              
              {/* Gradient overlay for top half */}
              <div className={`absolute inset-0 bg-gradient-to-t ${styles.overlayGradient}`}></div>
              
              {/* Special effects for Veterans card */}
              {program.id === "veterans" && (
                <div className="absolute inset-0">
                  {/* Enhanced American flag styling */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent">
                    {/* Enhanced red and white stripes with better visibility */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 opacity-40">
                      {[...Array(7)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-[14.3%] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
                        />
                      ))}
                    </div>
                    
                    {/* Stars in top left with better visibility */}
                    <div className="absolute top-2 left-2 h-16 w-24 bg-blue-900/40 opacity-70">
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
              
              {/* College-specific design elements */}
              {program.id === "college" && (
                <div className="absolute inset-0">
                  <div className="absolute bottom-2 right-2 w-20 h-20 opacity-20">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 border-[3px] border-purple-200 rounded-full"></div>
                      <div className="absolute inset-2 border-[3px] border-purple-300 rounded-full"></div>
                      <div className="absolute inset-4 border-[3px] border-purple-400 rounded-full"></div>
                      <div className="absolute inset-6 border-[3px] border-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  {/* Floating graduation caps */}
                  <div className="absolute top-4 left-8">
                    <GraduationCap className="h-4 w-4 text-purple-200 animate-bounce" style={{animationDuration: '3s'}} />
                  </div>
                  <div className="absolute bottom-8 right-10">
                    <GraduationCap className="h-3 w-3 text-purple-200 animate-bounce" style={{animationDuration: '2.3s', animationDelay: '0.5s'}} />
                  </div>
                </div>
              )}
              
              {/* Business-specific design elements */}
              {program.id === "business" && (
                <div className="absolute inset-0">
                  <div className="absolute inset-0">
                    {/* Abstract grid pattern for business */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="h-full w-full grid grid-cols-8 grid-rows-5">
                        {[...Array(40)].map((_, i) => (
                          <div key={i} className={`border border-emerald-400 ${i % 6 === 0 ? 'bg-emerald-500/20' : ''}`}></div>
                        ))}
                      </div>
                    </div>
                    {/* Growth chart */}
                    <div className="absolute bottom-4 left-2 right-2 h-12 opacity-30">
                      <div className="relative h-full w-full">
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-emerald-200"></div>
                        <div className="absolute bottom-0 left-[20%] h-2 w-1 bg-emerald-300"></div>
                        <div className="absolute bottom-0 left-[40%] h-4 w-1 bg-emerald-400"></div>
                        <div className="absolute bottom-0 left-[60%] h-6 w-1 bg-emerald-500"></div>
                        <div className="absolute bottom-0 left-[80%] h-9 w-1 bg-emerald-600"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-8 border-b border-l border-emerald-400/50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Icon */}
              <div className={`absolute top-4 right-4 p-2 rounded-full ${styles.iconBg} backdrop-blur-sm z-20`}>
                {program.icon}
              </div>
            </div>
            
            {/* Bottom half: Solid color with gradient and text */}
            <div className={`absolute bottom-0 left-0 right-0 h-1/2 ${styles.cardBg} p-4 flex flex-col justify-between`}>
              {/* Title */}
              <h3 className="font-bold text-xl text-gray-800 drop-shadow-sm mb-1 flex items-center gap-2">
                {program.title}
              </h3>
              
              {/* Description based on program */}
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {program.id === "veterans" 
                  ? "Resources for current and former service members and their families" 
                  : program.id === "college" 
                    ? "Support for students navigating academic challenges" 
                    : "Tools for entrepreneurs and small business owners"}
              </p>
              
              {/* Explore button */}
              <Button 
                size="sm"
                className={`bg-white text-gray-800 hover:bg-opacity-90 shadow-md hover:shadow-lg w-fit`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToFeature(program.path);
                }}
              >
                <span>Explore Program</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SpecializedPrograms;
