
import React from "react";
import { Shield, Star, Flag, Medal, Heart } from "lucide-react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";

const DoDWelcome: React.FC = () => {
  const whatToExpect = [
    "Access to specialized PTSD and combat stress management resources developed by experts with military experience",
    "Tools specifically designed to support transition to civilian life, including career resources and adjustment strategies",
    "Family support resources for deployments, relocations, and navigating the unique challenges of military family life",
    "Peer community connections with other service members and veterans who understand your experiences",
    "Evidence-based assessments designed for military-specific challenges, with confidential results",
    "Access to workshops led by professionals with military experience who understand your unique challenges"
  ];

  return (
    <div className="min-h-screen text-white py-8 px-4 relative">
      {/* Enhanced patriotic background with improved American flag elements */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0c1b44] via-[#101d36] to-[#1a1e2c]">
        {/* Red and white stripes - more visible */}
        <div className="absolute bottom-0 left-0 right-0 h-full opacity-20">
          {[...Array(13)].map((_, i) => (
            <div 
              key={i} 
              className={`h-[7.69%] w-full ${i % 2 === 0 ? 'bg-red-700' : 'bg-white'}`}
            />
          ))}
        </div>
        
        {/* Stars field in the upper left - more prominent */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 opacity-25">
          <div className="grid grid-cols-6 gap-6 p-6">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="text-white">
                <Star className="h-5 w-5 fill-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <SpecializedProgramWelcome
        title="Service Member & Veteran Support"
        description="Welcome to a space designed specifically for those who have bravely served our nation. Your service matters, and so does your wellbeing."
        whatToExpect={whatToExpect}
        color="blue-600"
        gradientFrom="blue-700"
        gradientTo="blue-500"
        borderColor="#3B82F6"
        portalPath="/dod-portal"
        icon={<Shield className="h-12 w-12 text-blue-300" />}
        textColor="text-white"
        descriptionTextColor="text-white"
        backgroundColor="bg-gradient-to-b from-[#0c1b44] via-[#101d36] to-[#1a1e2c]"
      />
    </div>
  );
};

export default DoDWelcome;
