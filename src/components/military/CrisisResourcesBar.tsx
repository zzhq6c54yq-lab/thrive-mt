
import React from "react";
import { Phone, MessageSquare, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

const CrisisResourcesBar = () => {
  return (
    <div className="bg-gradient-to-r from-[#0A1929]/80 to-[#0A1929]/40 border-b border-[#B87333]/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center">
            <LifeBuoy className="mr-3 h-5 w-5 text-[#B87333]" />
            <div>
              <h2 className="text-lg font-medium text-white">
                Crisis Resources <span className="text-sm text-[#B87333]">Available 24/7</span>
              </h2>
              <p className="text-sm text-gray-300">
                If you're experiencing a mental health crisis, help is available right now.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="gold" size="sm" className="shadow-lg">
              <Phone className="mr-1 h-4 w-4" />
              Call 988 (Press 1)
            </Button>
            
            <Button variant="navy" size="sm" className="shadow-md">
              <MessageSquare className="mr-1 h-4 w-4" />
              Text 838255
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisResourcesBar;
