
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import HomeButton from "@/components/HomeButton";

const MilitaryWorkshop = () => {
  const { workshopId } = useParams<{ workshopId: string }>();
  
  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link to="/military-support" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Military Support
          </Link>
          <HomeButton />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#1A365D] to-[#0A1929] p-8 rounded-lg border border-[#B87333]/30">
            <h1 className="text-3xl font-bold mb-4">Military Workshop: {workshopId}</h1>
            <p className="text-gray-300 mb-6">
              This page is currently under development. The full workshop content for ID: {workshopId} will be available soon.
            </p>
            
            <Button variant="gold" className="mt-4">
              View Available Workshops
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilitaryWorkshop;
