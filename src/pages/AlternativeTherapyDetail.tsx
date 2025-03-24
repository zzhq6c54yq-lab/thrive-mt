
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const AlternativeTherapyDetail = () => {
  const { therapyId } = useParams();
  const { toast } = useToast();
  
  // In a real implementation, this would fetch therapy details based on the ID
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/alternative-therapies" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Therapies
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Therapy Details</h1>
          <p className="text-xl text-gray-300">Loading therapy details for: {therapyId}</p>
        </div>
      </div>
      
      <div className="container px-4 py-12 max-w-6xl mx-auto text-center">
        <p className="text-gray-700 mb-8">
          This is a placeholder for a detailed therapy page. In a full implementation, 
          this would display comprehensive information about the selected therapy.
        </p>
        
        <Button 
          onClick={() => {
            toast({
              title: "Navigation",
              description: "Returning to the therapies overview",
              duration: 2000
            });
            
            // Navigate back to the main therapies page
            window.history.back();
          }}
        >
          Return to Therapies
        </Button>
      </div>
    </div>
  );
};

export default AlternativeTherapyDetail;
