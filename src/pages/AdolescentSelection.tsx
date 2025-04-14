import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import HomeButton from "@/components/HomeButton";

const AdolescentSelection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const ageGroups = [
    {
      title: "Early Childhood",
      ageRange: "Ages 2-7",
      description: "Playful, creative activities to help young children understand and express emotions",
      color: "bg-pink-100 dark:bg-pink-900/20",
      textColor: "text-pink-700 dark:text-pink-300",
      borderColor: "border-pink-300 dark:border-pink-700",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      id: "early-childhood"
    },
    {
      title: "Middle Childhood",
      ageRange: "Ages 8-13",
      description: "Interactive tools to help school-age children build resilience and social-emotional skills",
      color: "bg-purple-100 dark:bg-purple-900/20",
      textColor: "text-purple-700 dark:text-purple-300",
      borderColor: "border-purple-300 dark:border-purple-700",
      image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      id: "middle-childhood"
    },
    {
      title: "Adolescence",
      ageRange: "Ages 14+",
      description: "Resources to support teenagers with identity, independence, and emotional well-being",
      color: "bg-blue-100 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300",
      borderColor: "border-blue-300 dark:border-blue-700",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      id: "adolescence"
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
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="absolute top-4 right-4">
          <HomeButton />
        </div>
        
        <div className="text-center mb-12 mt-6">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
            The Adolescent Experience
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Select the age group that best fits your child's developmental stage to access tailored resources and support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ageGroups.map((group) => (
            <div 
              key={group.id}
              className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 border ${group.borderColor}`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={group.image} 
                  alt={group.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                  }}
                />
              </div>
              
              <div className={`p-6 ${group.color}`}>
                <h3 className={`text-2xl font-semibold mb-1 ${group.textColor}`}>
                  {group.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-4">
                  {group.ageRange}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {group.description}
                </p>
                <Button 
                  onClick={() => handleAgeGroupSelect(group.id)}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
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
