
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
      description: "Resources for current and former service members and their families",
      features: ["Mental health resources", "Transition support", "Family assistance"],
      primaryIcon: <Shield className="h-6 w-6 text-white" />,
      secondaryIcon: <Medal className="h-6 w-6" />,
      tertiaryIcon: <Flag className="h-6 w-6" />,
      gradientFrom: "from-blue-900",
      gradientTo: "to-indigo-800",
      accentColor: "border-red-500",
      buttonColor: "bg-gradient-to-r from-red-600 via-blue-600 to-blue-700 hover:from-red-700 hover:via-blue-700 to-blue-800",
      isVeteran: true
    },
    {
      id: "college",
      title: "College Students",
      path: "/college-welcome",
      description: "Support for students navigating academic challenges",
      features: ["Stress management", "Study resources", "Peer support"],
      primaryIcon: <GraduationCap className="h-6 w-6 text-white" />,
      secondaryIcon: <BookOpen className="h-6 w-6" />,
      tertiaryIcon: <Laptop className="h-6 w-6" />,
      gradientFrom: "from-purple-900",
      gradientTo: "to-violet-800",
      accentColor: "border-yellow-400",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      id: "business",
      title: "Small Business",
      path: "/small-business-welcome",
      description: "Tools for entrepreneurs and small business owners",
      features: ["Leadership wellness", "Employee resources", "Work-life balance"],
      primaryIcon: <Briefcase className="h-6 w-6 text-white" />,
      secondaryIcon: <Building className="h-6 w-6" />,
      tertiaryIcon: <Users className="h-6 w-6" />,
      gradientFrom: "from-emerald-900",
      gradientTo: "to-green-800",
      accentColor: "border-amber-400",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {programs.map(program => (
        <Card 
          key={program.id} 
          className={`overflow-hidden border-0 hover:shadow-xl transition-all duration-500 group cursor-pointer rounded-xl h-auto transform hover:scale-[1.02] ${program.accentColor} border-l-4`}
          onClick={() => navigateToFeature(program.path)}
        >
          {/* Main content area */}
          <div className="relative h-64">
            {/* Background for Veterans Program - American Flag & Service Branches */}
            {program.isVeteran ? (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[#041E42]">
                  {/* Red and white stripes */}
                  <div className="absolute inset-0">
                    {[...Array(13)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-[7.69%] w-full ${i % 2 === 0 ? 'bg-[#B31942]' : 'bg-white'}`}
                      />
                    ))}
                  </div>
                  
                  {/* Blue field with stars */}
                  <div className="absolute top-0 left-0 w-1/2 h-[46.15%] bg-[#041E42]">
                    <div className="grid grid-cols-6 grid-rows-5 h-full w-full p-0.5">
                      {[...Array(30)].map((_, i) => (
                        <div key={i} className="flex items-center justify-center">
                          <div className="text-white text-[8px]">★</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Military Branch Emblems */}
                  <div className="absolute bottom-0 right-0 w-1/3 h-1/3 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                    <div className="bg-white/10 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white/70" />
                    </div>
                    <div className="bg-white/10 rounded-full flex items-center justify-center">
                      <Anchor className="h-4 w-4 text-white/70" />
                    </div>
                    <div className="bg-white/10 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-white/70" />
                    </div>
                    <div className="bg-white/10 rounded-full flex items-center justify-center">
                      <Medal className="h-4 w-4 text-white/70" />
                    </div>
                  </div>
                </div>
                
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
            ) : (
              <div className="absolute inset-0">
                <div className={`absolute inset-0 bg-gradient-to-b ${program.gradientFrom} ${program.gradientTo} opacity-90`}></div>
              </div>
            )}

            {/* Content overlay */}
            <CardContent className="relative z-10 h-full p-6 flex flex-col justify-between">
              <div>
                {/* Header section with icon and title */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm shadow-inner border border-white/20">
                    {program.primaryIcon}
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-white drop-shadow-md mb-1">
                      {program.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {program.description}
                    </p>
                  </div>
                </div>
                
                {/* Features list */}
                <div className="space-y-2 mb-4">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-1 h-1 bg-white/70 rounded-full mr-2"></div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating decorative icons */}
              <div className="absolute right-6 bottom-16 opacity-10">
                {program.secondaryIcon &&
                  <div className="absolute right-0 bottom-0">
                    {React.cloneElement(program.secondaryIcon, { className: "h-20 w-20 text-white" })}
                  </div>
                }
                {program.tertiaryIcon &&
                  <div className="absolute right-20 bottom-0">
                    {React.cloneElement(program.tertiaryIcon, { className: "h-16 w-16 text-white/40" })}
                  </div>
                }
              </div>
              
              {/* Button area */}
              <div className="relative z-10">
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
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SpecializedPrograms;
