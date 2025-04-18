
import React from "react";
import { Button } from "@/components/ui/button";
import { BookText, PenSquare, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResourceCard = ({ icon: Icon, title, description, buttonText }: {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
}) => (
  <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
    <div className="flex items-center mb-2">
      <Icon className="h-5 w-5 mr-2 text-[#D4AF37]" />
      <h4 className="text-lg font-medium text-[#F5DEB3]">{title}</h4>
    </div>
    <p className="text-gray-200 text-sm mb-3">{description}</p>
    <Button 
      size="sm" 
      className="bg-[#D4AF37] hover:bg-[#B8860B] text-white w-full"
    >
      {buttonText}
    </Button>
  </div>
);

const ResourcesTabContent = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <h3 className="text-xl font-medium mb-4 text-[#F5DEB3]">Helpful Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResourceCard
          icon={BookText}
          title="Estate Planning Guide"
          description="Comprehensive guide to organizing your estate and ensuring your wishes are honored."
          buttonText="Read Guide"
        />
        <ResourceCard
          icon={PenSquare}
          title="Legacy Letter Template"
          description="Express your values, life lessons, and messages to loved ones."
          buttonText="View Template"
        />
      </div>
      <div className="mt-6">
        <Button 
          className="w-full bg-[#4A3F36] hover:bg-[#5D4C3B] text-white border border-[#D4AF37]/20"
          onClick={() => navigate('/golden-years-journal', { 
            state: { 
              stayInPortal: true,
              preventTutorial: true,
              portalPath: '/golden-years-portal'
            }
          })}
        >
          Start Your Legacy Journal
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default ResourcesTabContent;
