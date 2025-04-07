
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
      description: "Specialized mental health support tailored specifically for veterans. Navigate post-service challenges with our expert resources.",
      path: "/military-support",
      coverImage: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-blue-700 to-blue-900",
      icon: <Shield className="h-5 w-5 text-white" />
    },
    {
      id: "college",
      title: "College Students",
      description: "Resources designed for campus mental wellness, helping you balance academics, social life, and personal growth.",
      path: "/college-portal",
      coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-purple-700 to-indigo-900",
      icon: <GraduationCap className="h-5 w-5 text-white" />
    },
    {
      id: "business",
      title: "Small Business",
      description: "Comprehensive support for entrepreneurs and small teams managing workplace wellness and stress.",
      path: "/small-business-portal",
      coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-emerald-700 to-green-900",
      icon: <Briefcase className="h-5 w-5 text-white" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {programs.map(program => (
        <Card 
          key={program.id} 
          className="overflow-hidden border-purple-500/20 h-full hover:shadow-xl transition-all duration-500 group cursor-pointer"
          onClick={() => navigateToFeature(program.path)}
        >
          <CardContent className="p-0 h-full flex flex-col">
            {/* Cover Image with Enhanced Overlay */}
            <div className="relative h-48 overflow-hidden">
              {/* Background gradients and animations */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-70 mix-blend-multiply z-5`}></div>
              
              {/* Animated particles */}
              <div className="absolute inset-0 z-20">
                <div className="absolute top-5 left-5 w-2 h-2 bg-white rounded-full animate-ping opacity-60" style={{animationDuration: '3s'}}></div>
                <div className="absolute top-20 right-10 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-40" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
                <div className="absolute bottom-10 left-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-50" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}></div>
              </div>
              
              {/* Program image */}
              <img 
                src={program.coverImage} 
                alt={program.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
                }}
              />
              
              {/* Icon with glowing effect */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm z-20 group-hover:animate-pulse">
                {program.icon}
              </div>
              
              {/* Title with special styling */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-30 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-xl text-white drop-shadow-md flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-white/70" />
                  {program.title}
                </h3>
              </div>
            </div>
            
            {/* Content area with subtle animations */}
            <div className="p-5 bg-gradient-to-b from-purple-50/80 to-white dark:from-purple-900/30 dark:to-transparent flex-grow flex flex-col relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-gradient-to-br from-purple-200/20 to-transparent blur-xl group-hover:animate-pulse" style={{animationDuration: '4s'}}></div>
              <div className="absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-200/20 to-transparent blur-xl group-hover:animate-pulse" style={{animationDuration: '5s', animationDelay: '0.5s'}}></div>
              
              {/* Description text */}
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-5 flex-grow relative z-10">
                {program.description}
              </p>
              
              {/* Explore button with hover effects */}
              <Button 
                size="sm"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg transform transition-all duration-300 group-hover:scale-[1.03]"
                onClick={() => navigateToFeature(program.path)}
              >
                <span>Explore</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SpecializedPrograms;
