
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, Briefcase } from "lucide-react";

const SubmitWorkplaceResource = () => {
  const { toast } = useToast();
  
  const handleSubmitResource = () => {
    toast({
      title: "Resource Submission",
      description: "Thank you for sharing a workplace wellness resource. Our team will review it shortly.",
    });
  };
  
  return (
    <div className="mt-12 mb-6 bg-gradient-to-r from-[#6E59A5]/80 via-[#6E59A5]/60 to-transparent p-8 rounded-xl border border-[#9b87f5]/30 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#9b87f5]/20 rounded-full hidden md:flex">
            <Briefcase className="h-6 w-6 text-[#9b87f5]" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Know a Helpful Workplace Resource?</h3>
            <p className="text-gray-300 max-w-xl">
              Help fellow employees by recommending resources that have supported your mental health at work. Your suggestions make our workplace better for everyone.
            </p>
          </div>
        </div>
        
        <Button 
          variant="gold" 
          size="lg" 
          className="px-6" 
          onClick={handleSubmitResource}
          style={{ backgroundColor: "#9b87f5", borderColor: "#9b87f5" }}
        >
          <Send className="mr-2 h-4 w-4" />
          Submit Resource
        </Button>
      </div>
    </div>
  );
};

export default SubmitWorkplaceResource;
