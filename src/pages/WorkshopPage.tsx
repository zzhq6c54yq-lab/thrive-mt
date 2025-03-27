
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import HomeButton from "@/components/HomeButton";
import { workshopData } from "@/data/workshopData";

const WorkshopPage = () => {
  const { workshopId } = useParams<{ workshopId: string }>();
  
  // Find the workshop data based on the ID
  const workshop = workshopData.find(w => w.id === workshopId);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <HomeButton />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h1 className="text-3xl font-bold mb-4">
              {workshop ? workshop.title : `Workshop: ${workshopId}`}
            </h1>
            <p className="text-gray-600 mb-6">
              {workshop 
                ? workshop.description 
                : "This workshop content is currently under development. Check back soon for the full content."}
            </p>
            
            <Button 
              className="mt-4"
              onClick={() => window.history.back()}
            >
              Return to Workshops
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopPage;
