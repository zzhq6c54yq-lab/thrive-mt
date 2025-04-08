
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
      gradientFrom: "from-blue-900",
      gradientTo: "to-indigo-800",
      accentColor: "border-red-500",
      buttonColor: "bg-gradient-to-r from-red-600 via-blue-600 to-blue-700 hover:from-red-700 hover:via-blue-700 to-blue-800",
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
      gradientFrom: "from-purple-900",
      gradientTo: "to-violet-800",
      accentColor: "border-yellow-400",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "business",
      title: "Small Business",
      path: "/small-business-welcome",
      primaryIcon: <Briefcase className="h-6 w-6 text-white" />,
      secondaryIcon: <Building className="h-6 w-6" />,
      tertiaryIcon: <Users className="h-6 w-6" />,
      gradientFrom: "from-emerald-900",
      gradientTo: "to-green-800",
      accentColor: "border-amber-400",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {programs.map(program => (
        <Card 
          key={program.id} 
          className={`overflow-hidden border-0 hover:shadow-xl transition-all duration-500 cursor-pointer rounded-xl h-auto transform hover:scale-[1.02]`}
          onClick={() => navigateToFeature(program.path)}
        >
          <div className="relative h-96 flex flex-col">
            {/* Top colored section with title */}
            <div className={`bg-gradient-to-r ${program.gradientFrom} ${program.gradientTo} px-6 py-5`}>
              <div className="flex items-center gap-3 justify-center">
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm shadow-inner border border-white/20">
                  {program.primaryIcon}
                </div>
                <h3 className="font-bold text-2xl text-white drop-shadow-md">
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
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            
            {/* Bottom section with button */}
            <div className={`bg-gradient-to-r ${program.gradientFrom} ${program.gradientTo} px-6 py-5`}>
              <Button 
                className={`w-full text-white ${program.buttonColor} shadow-lg`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToFeature(program.path);
                }}
              >
                <span>Explore Program</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SpecializedPrograms;
