
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import ThriveButton from "@/components/navigation/ThriveButton";
import PortalBackButton from "@/components/navigation/PortalBackButton";

const AdolescentSelection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const ageGroups = [
    {
      title: "Early Childhood",
      ageRange: "Ages 2-7",
      description: "Playful, creative activities to help young children understand and express emotions",
      color: "from-pink-500 to-rose-400",
      textColor: "text-pink-50",
      borderColor: "border-pink-300",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      id: "early-childhood",
      icon: "🧸"
    },
    {
      title: "Middle Childhood",
      ageRange: "Ages 8-13",
      description: "Interactive tools to help school-age children build resilience and social-emotional skills",
      color: "from-purple-500 to-indigo-500",
      textColor: "text-purple-50",
      borderColor: "border-purple-300",
      image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      id: "middle-childhood",
      icon: "🌟"
    },
    {
      title: "Adolescence",
      ageRange: "Ages 14+",
      description: "Resources to support teenagers with identity, independence, and emotional well-being",
      color: "from-blue-500 to-violet-500",
      textColor: "text-blue-50",
      borderColor: "border-blue-300",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      id: "adolescence",
      icon: "✨"
    }
  ];

  const handleAgeGroupSelect = (id: string) => {
    toast({
      title: "Accessing Age Portal",
      description: `Taking you to the ${id} section`,
      duration: 1500,
    });

    navigate("/adolescent-portal", { 
      state: { 
        ageGroup: id,
        stayInPortal: true,
        preventTutorial: true 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6d28d9] via-[#7e22ce] to-[#a21caf] text-white py-8 px-4 relative">
      {/* Navigation buttons */}
      <div className="absolute top-4 left-4 z-20">
        <PortalBackButton returnPath="/adolescent-welcome" />
      </div>
      <div className="absolute top-4 right-4 z-20">
        <ThriveButton size="sm" />
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating balloons and stars for kids-friendly atmosphere */}
        <div className="absolute top-10 left-[10%] w-12 h-12 text-3xl animate-bounce">🎈</div>
        <div className="absolute top-16 right-[20%] w-12 h-12 text-3xl animate-[bounce_4s_infinite]">⭐</div>
        <div className="absolute top-40 left-[30%] w-12 h-12 text-3xl animate-[bounce_5s_infinite]">🎈</div>
        <div className="absolute bottom-20 right-[15%] w-12 h-12 text-3xl animate-[bounce_6s_infinite]">🌟</div>
        <div className="absolute bottom-40 left-[15%] w-12 h-12 text-3xl animate-[bounce_7s_infinite]">✨</div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 mt-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">Age Group</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Select the age group that best fits your child's developmental stage to access tailored resources and support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ageGroups.map((group) => (
            <div 
              key={group.id}
              className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 border ${group.borderColor}`}
              onClick={() => handleAgeGroupSelect(group.id)}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={group.image} 
                  alt={group.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                  {group.icon}
                </div>
              </div>
              
              <div className={`p-6 bg-gradient-to-r ${group.color} text-white`}>
                <h3 className="text-2xl font-semibold mb-1">
                  {group.title}
                </h3>
                <p className="text-sm text-white/80 font-medium mb-4">
                  {group.ageRange}
                </p>
                <p className={`${group.textColor} mb-6`}>
                  {group.description}
                </p>
                <Button 
                  className="w-full bg-white text-purple-700 hover:bg-white/90"
                >
                  Enter Portal <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdolescentSelection;
