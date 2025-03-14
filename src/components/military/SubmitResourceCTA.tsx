
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, BookPlus } from "lucide-react";

const SubmitResourceCTA = () => {
  const { toast } = useToast();
  
  const handleSubmitResource = () => {
    toast({
      title: "Resource Submission",
      description: "Thank you for your interest. The submission form will be available soon.",
    });
  };
  
  return (
    <div className="mt-12 mb-6 bg-gradient-to-r from-[#0A1929]/80 via-[#0A1929]/60 to-transparent p-8 rounded-xl border border-[#B87333]/30 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#B87333]/20 rounded-full hidden md:flex">
            <BookPlus className="h-6 w-6 text-[#B87333]" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Have a Resource to Share?</h3>
            <p className="text-gray-300 max-w-xl">
              Help fellow service members by recommending resources that have supported your mental health journey. Your suggestions are valuable to our community.
            </p>
          </div>
        </div>
        
        <Button variant="gold" size="lg" className="px-6" onClick={handleSubmitResource}>
          <Send className="mr-2 h-4 w-4" />
          Submit Resource
        </Button>
      </div>
    </div>
  );
};

export default SubmitResourceCTA;
