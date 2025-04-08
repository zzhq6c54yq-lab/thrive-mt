
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Shield, 
  GraduationCap, 
  Briefcase,
  Medal,
  Users,
  Flag,
  Award,
  Anchor,
  BookOpen,
  Laptop,
  Building
} from "lucide-react";

export interface SpecializedProgramsProps {
  navigateToFeature: (path: string) => void;
}

const SpecializedPrograms: React.FC<SpecializedProgramsProps> = ({ navigateToFeature }) => {
  const programs = [
    {
      id: "veterans",
      title: "Veterans Program",
      path: "/dod-welcome",
      primaryIcon: <Shield className="h-6 w-6 text-white" />,
      secondaryIcon: <Medal className="h-6 w-6" />,
      tertiaryIcon: <Flag className="h-6 w-6" />,
      gradientFrom: "from-black",
      gradientTo: "to-[#111]",
      accentColor: "border-[#B87333]",
      buttonColor: "bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#B87333] hover:to-[#E5C5A1]/80",
      isVeteran: true,
      image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "college",
      title: "College Students",
      path: "/college-welcome",
      primaryIcon: <GraduationCap className="h-6 w-6 text-white" />,
      secondaryIcon: <BookOpen className="h-6 w-6" />,
      tertiaryIcon: <Laptop className="h-6 w-6" />,
      gradientFrom: "from-black",
      gradientTo: "to-[#111]",
      accentColor: "border-[#E5C5A1]",
      buttonColor: "bg-gradient-to-r from-[#E5C5A1] to-[#B87333] hover:from-[#E5C5A1] hover:to-[#B87333]/80",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "business",
      title: "Small Business",
      path: "/small-business-welcome",
      primaryIcon: <Briefcase className="h-6 w-6 text-white" />,
      secondaryIcon: <Building className="h-6 w-6" />,
      tertiaryIcon: <Users className="h-6 w-6" />,
      gradientFrom: "from-black",
      gradientTo: "to-[#111]",
      accentColor: "border-[#B87333]/70",
      buttonColor: "bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80 hover:from-[#B87333] hover:to-[#E5C5A1]",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {programs.map(program => (
        <Card 
          key={program.id} 
          className={`overflow-hidden border-0 hover:shadow-2xl transition-all duration-700 cursor-pointer rounded-xl h-auto transform hover:scale-[1.03] shadow-xl shadow-black`}
          onClick={() => navigateToFeature(program.path)}
        >
          <div className="relative h-[460px] flex flex-col">
            {/* Top colored section with title - now with enhanced gradients */}
            <div className={`bg-gradient-to-r ${program.gradientFrom} via-white/5 ${program.gradientTo} border-b-2 ${program.accentColor} px-6 py-8 relative overflow-hidden`}>
              {/* Diagonal accent lines */}
              <div className="absolute -inset-full h-20 w-[200%] bg-gradient-to-r from-transparent via-[#c0c0c0]/15 to-transparent transform rotate-45 translate-x-[25%] translate-y-[-60%] animate-pulse" style={{animationDuration: '5s'}}></div>
              <div className="absolute -inset-full h-20 w-[200%] bg-gradient-to-r from-transparent via-[#B87333]/15 to-transparent transform -rotate-30 translate-x-[-25%] translate-y-[-40%] animate-pulse" style={{animationDuration: '7s'}}></div>
              
              <div className="flex items-center gap-3 justify-center relative z-10">
                <div className="p-3 rounded-full bg-gradient-to-br from-[#B87333]/30 to-[#E5C5A1]/15 backdrop-blur-sm shadow-inner border border-[#c0c0c0]/40 rotate-6">
                  {program.primaryIcon}
                </div>
                <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] via-[#ffffff] to-[#E5C5A1] drop-shadow-md -rotate-1">
                  {program.title}
                </h3>
              </div>
              
              {/* Bottom accent lines */}
              <div className="absolute -inset-full h-10 w-[200%] bg-gradient-to-r from-transparent via-[#E5C5A1]/15 to-transparent transform -rotate-45 translate-x-[-20%] translate-y-[200%] animate-pulse" style={{animationDuration: '7s'}}></div>
              <div className="absolute -inset-full h-10 w-[200%] bg-gradient-to-r from-transparent via-[#ffffff]/10 to-transparent transform rotate-30 translate-x-[20%] translate-y-[180%] animate-pulse" style={{animationDuration: '9s'}}></div>
            </div>
            
            {/* Middle image section with white/silver/gold accents */}
            <div className="flex-grow relative">
              <img 
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20"></div>
              
              {/* Overlay icons with new styling and silver accents */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-[#c0c0c0]/40 rotate-12">
                {program.secondaryIcon}
              </div>
              <div className="absolute bottom-4 left-4 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-[#E5C5A1]/40 -rotate-6">
                {program.tertiaryIcon}
              </div>
              
              {/* Enhanced diagonal accents with white/silver */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-[#ffffff]/30 to-transparent top-1/3 -left-1/2 rotate-[30deg] transform"></div>
                <div className="absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-[#c0c0c0]/30 to-transparent bottom-1/3 -left-1/2 -rotate-[20deg] transform"></div>
                <div className="absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-[#B87333]/20 to-transparent top-2/3 -left-1/2 rotate-[15deg] transform"></div>
              </div>
              
              {/* Additional floating light particles */}
              <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white/60 animate-pulse" style={{animationDuration: '3s'}}></div>
              <div className="absolute bottom-1/3 right-1/3 w-1 h-1 rounded-full bg-[#E5C5A1]/60 animate-pulse" style={{animationDuration: '4s'}}></div>
            </div>
            
            {/* Bottom section with button - enhanced with gradients */}
            <div className={`bg-gradient-to-r ${program.gradientFrom} via-white/5 ${program.gradientTo} border-t-2 ${program.accentColor} px-6 py-6 relative overflow-hidden`}>
              {/* Diagonal accents for bottom section */}
              <div className="absolute -inset-full h-20 w-[200%] bg-gradient-to-r from-transparent via-[#ffffff]/10 to-transparent transform -rotate-45 translate-y-[-60%] animate-pulse" style={{animationDuration: '8s'}}></div>
              <div className="absolute -inset-full h-15 w-[200%] bg-gradient-to-r from-transparent via-[#c0c0c0]/10 to-transparent transform rotate-30 translate-y-[-40%] animate-pulse" style={{animationDuration: '10s'}}></div>
              
              <Button 
                className={`w-full text-black font-medium ${program.buttonColor} shadow-lg group transition-all duration-500 relative z-10`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToFeature(program.path);
                }}
              >
                <span className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-500">•</span>
                <span>Explore Program</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1">&rarr;</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SpecializedPrograms;
