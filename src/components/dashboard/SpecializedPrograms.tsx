
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, GraduationCap, Briefcase, Flag } from "lucide-react";

export interface SpecializedProgramsProps {
  navigateToFeature: (path: string) => void;
}

const SpecializedPrograms: React.FC<SpecializedProgramsProps> = ({ navigateToFeature }) => {
  const programs = [
    {
      id: "veterans",
      title: "Veterans Program",
      description: "Specialized mental health support tailored specifically for veterans. Navigate post-service challenges with our expert resources.",
      path: "/military-support",
      coverImage: "https://images.unsplash.com/photo-1543781977-41e2323338f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-blue-700 to-red-600",
      icon: <Flag className="h-5 w-5 text-white" />
    },
    {
      id: "college",
      title: "College Students",
      description: "Resources designed for campus mental wellness, helping you balance academics, social life, and personal growth.",
      path: "/college-portal",
      coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-purple-500 to-indigo-400",
      icon: <GraduationCap className="h-5 w-5 text-white" />
    },
    {
      id: "business",
      title: "Small Business",
      description: "Comprehensive support for entrepreneurs and small teams managing workplace wellness and stress.",
      path: "/small-business-portal",
      coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-emerald-500 to-teal-400",
      icon: <Briefcase className="h-5 w-5 text-white" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {programs.map(program => {
        // Special styling for Veterans card
        const isVeterans = program.id === "veterans";
        
        return (
          <Card 
            key={program.id} 
            className={`overflow-hidden border-purple-500/20 h-full hover:shadow-xl transition-all duration-500 group cursor-pointer ${
              isVeterans ? 'border-blue-700/50' : ''
            }`}
            onClick={() => navigateToFeature(program.path)}
          >
            <CardContent className="p-0 h-full flex flex-col">
              {/* Cover Image with Enhanced Overlay */}
              <div className="relative h-48 overflow-hidden">
                {/* Background gradients */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 ${
                  isVeterans ? 'from-blue-900/70' : ''
                }`}></div>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-60 mix-blend-multiply z-5`}></div>
                
                {/* Animated particles */}
                <div className="absolute inset-0 z-20">
                  <div className="absolute top-5 left-5 w-2 h-2 bg-white rounded-full animate-ping opacity-60" style={{animationDuration: '3s'}}></div>
                  <div className="absolute top-20 right-10 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-40" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
                  <div className="absolute bottom-10 left-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-50" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}></div>
                </div>
                
                {/* Program image with brightness filter */}
                <img 
                  src={program.coverImage} 
                  alt={program.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter brightness-110 contrast-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                
                {/* Special patriotic overlay for veterans card */}
                {isVeterans && (
                  <div className="absolute inset-0 opacity-20 z-15">
                    {/* Red and white stripes at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1/5 w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
                        />
                      ))}
                    </div>
                    
                    {/* Blue field with stars */}
                    <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-800">
                      <div className="grid grid-cols-3 gap-1 p-1">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="flex items-center justify-center">
                            <div className="h-1 w-1 bg-white transform rotate-45"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Custom Icon with glowing effect */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm z-20 group-hover:animate-pulse">
                  {program.icon}
                </div>
                
                {/* Title with special styling */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-30 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className={`font-bold text-xl text-white drop-shadow-md flex items-center gap-2 ${
                    isVeterans ? 'text-shadow-lg' : ''
                  }`}>
                    <Sparkles className="h-4 w-4 text-white/80" />
                    {program.title}
                  </h3>
                </div>
              </div>
              
              {/* Content area with gradient background instead of white */}
              <div className={`p-5 flex-grow flex flex-col relative overflow-hidden ${
                isVeterans 
                  ? 'bg-gradient-to-b from-blue-950/5 to-red-950/5 dark:from-blue-900/40 dark:to-red-900/30' 
                  : 'bg-gradient-to-b from-sky-50 to-indigo-50 dark:from-purple-900/40 dark:to-indigo-900/30'
              }`}>
                {/* Animated background elements */}
                <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-gradient-to-br from-purple-200/30 to-transparent blur-xl group-hover:animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-gradient-to-tr from-blue-200/30 to-transparent blur-xl group-hover:animate-pulse" style={{animationDuration: '5s', animationDelay: '0.5s'}}></div>
                
                {/* Description text */}
                <p className={`text-sm mb-5 flex-grow relative z-10 ${
                  isVeterans 
                    ? 'text-blue-950 dark:text-blue-200' 
                    : 'text-purple-900 dark:text-purple-200'
                }`}>
                  {program.description}
                </p>
                
                {/* Explore button with hover effects */}
                <Button 
                  size="sm"
                  className={`w-full shadow-md hover:shadow-lg transform transition-all duration-300 group-hover:scale-[1.03] ${
                    isVeterans 
                      ? 'bg-gradient-to-r from-blue-700 to-red-700 hover:from-blue-800 hover:to-red-800 text-white' 
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                  }`}
                  onClick={() => navigateToFeature(program.path)}
                >
                  <span>Explore</span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SpecializedPrograms;
