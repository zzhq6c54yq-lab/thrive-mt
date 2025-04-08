
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
      coverImage: "https://images.unsplash.com/photo-1476370648495-3533f64427a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
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
                bgGradient: "bg-gradient-to-br from-blue-900 to-indigo-800",
                buttonBg: "bg-blue-600 hover:bg-blue-700",
                iconBg: "bg-blue-500/30",
                highlight: "border-l-4 border-red-500"
              };
            case "college":
              return {
                bgGradient: "bg-gradient-to-br from-purple-900 to-violet-800",
                buttonBg: "bg-purple-600 hover:bg-purple-700",
                iconBg: "bg-purple-500/30",
                highlight: "border-l-4 border-yellow-400"
              };
            case "business":
              return {
                bgGradient: "bg-gradient-to-br from-emerald-900 to-green-800",
                buttonBg: "bg-emerald-600 hover:bg-emerald-700",
                iconBg: "bg-emerald-500/30",
                highlight: "border-l-4 border-amber-400"
              };
            default:
              return {
                bgGradient: "bg-gradient-to-br from-gray-900 to-slate-800",
                buttonBg: "bg-gray-600 hover:bg-gray-700",
                iconBg: "bg-gray-500/30",
                highlight: "border-l-4 border-blue-400"
              };
          }
        };
        
        const styles = getStyles();
        
        return (
          <Card 
            key={program.id} 
            className={`overflow-hidden border-0 h-60 rounded-xl hover:shadow-xl transition-all duration-500 group cursor-pointer relative ${styles.highlight}`}
            onClick={() => navigateToFeature(program.path)}
          >
            {/* Background overlay with dark gradient */}
            <div className="absolute inset-0 opacity-80">
              <img 
                src={program.coverImage} 
                alt={program.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className={`absolute inset-0 ${styles.bgGradient} opacity-90`}></div>
            </div>
            
            {/* Content overlay */}
            <CardContent className="relative z-10 h-full p-6 flex flex-col justify-between">
              <div>
                {/* Top section with icon and title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2.5 rounded-full ${styles.iconBg} backdrop-blur-sm`}>
                    {program.icon}
                  </div>
                  <h3 className="font-bold text-2xl text-white drop-shadow-md">
                    {program.title}
                  </h3>
                </div>
                
                {/* Description based on program */}
                <p className="text-white/80 mb-2 line-clamp-2">
                  {program.id === "veterans" 
                    ? "Resources for current and former service members and their families" 
                    : program.id === "college" 
                      ? "Support for students navigating academic challenges" 
                      : "Tools for entrepreneurs and small business owners"}
                </p>
              </div>
              
              {/* Program-specific design elements */}
              {program.id === "veterans" && (
                <div className="absolute right-4 bottom-16 opacity-20">
                  <Shield className="h-24 w-24 text-white" />
                </div>
              )}
              
              {program.id === "college" && (
                <div className="absolute right-4 bottom-16 opacity-20">
                  <GraduationCap className="h-24 w-24 text-white" />
                </div>
              )}
              
              {program.id === "business" && (
                <div className="absolute right-4 bottom-16 opacity-20">
                  <Briefcase className="h-24 w-24 text-white" />
                </div>
              )}
              
              {/* Bottom action area */}
              <div className="relative z-10">
                <Button 
                  className={`w-full text-white ${styles.buttonBg}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToFeature(program.path);
                  }}
                >
                  <span>Explore Program</span>
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
