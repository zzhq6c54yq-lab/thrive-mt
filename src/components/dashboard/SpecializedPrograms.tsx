
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
      gradientFrom: "from-[#1a0d29]",
      gradientTo: "to-[#2d1a46]",
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
      gradientFrom: "from-[#1a0d29]",
      gradientTo: "to-[#2d1a46]",
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
      gradientFrom: "from-[#1a0d29]",
      gradientTo: "to-[#2d1a46]",
      accentColor: "border-[#B87333]/70",
      buttonColor: "bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80 hover:from-[#B87333] hover:to-[#E5C5A1]",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {programs.map(program => (
        <Card 
          key={program.id} 
          className={`overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-xl h-auto transform hover:scale-[1.02] shadow-lg shadow-black/20`}
          onClick={() => navigateToFeature(program.path)}
        >
          <div className="relative h-96 flex flex-col">
            {/* Top colored section with title */}
            <div className={`bg-gradient-to-r ${program.gradientFrom} ${program.gradientTo} border-b border-${program.accentColor} px-6 py-6`}>
              <div className="flex items-center gap-3 justify-center">
                <div className="p-3 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#E5C5A1]/10 backdrop-blur-sm shadow-inner border border-[#B87333]/30">
                  {program.primaryIcon}
                </div>
                <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1] drop-shadow-md">
                  {program.title}
                </h3>
              </div>
            </div>
            
            {/* Middle image section */}
            <div className="flex-grow relative">
              <img 
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
            
            {/* Bottom section with button */}
            <div className={`bg-gradient-to-r ${program.gradientFrom} ${program.gradientTo} border-t border-${program.accentColor} px-6 py-5`}>
              <Button 
                className={`w-full text-white ${program.buttonColor} shadow-lg group`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToFeature(program.path);
                }}
              >
                <span>Explore Program</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">&rarr;</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SpecializedPrograms;
