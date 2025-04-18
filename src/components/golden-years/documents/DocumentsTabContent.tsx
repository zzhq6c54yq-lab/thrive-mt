
import React from "react";
import { Button } from "@/components/ui/button";
import { FileCheck, Download } from "lucide-react";
import FinancialDocumentsSection from "./FinancialDocumentsSection";

const DocumentsTabContent = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium mb-4 text-[#F5DEB3]">Essential Legal Documents</h3>
      
      <FinancialDocumentsSection />
      
      <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
        <div className="flex items-center mb-2">
          <FileCheck className="h-5 w-5 mr-2 text-[#D4AF37]" />
          <h4 className="text-lg font-medium text-[#F5DEB3]">Last Will and Testament</h4>
        </div>
        <p className="text-gray-200 text-sm mb-3">
          Ensure your assets are distributed according to your wishes and provide for your loved ones.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
        >
          Will Template <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
        <div className="flex items-center mb-2">
          <FileCheck className="h-5 w-5 mr-2 text-[#D4AF37]" />
          <h4 className="text-lg font-medium text-[#F5DEB3]">Advance Healthcare Directive</h4>
        </div>
        <p className="text-gray-200 text-sm mb-3">
          Document your preferences for medical care if you become unable to make decisions.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
        >
          Healthcare Directive Guide <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
        <div className="flex items-center mb-2">
          <FileCheck className="h-5 w-5 mr-2 text-[#D4AF37]" />
          <h4 className="text-lg font-medium text-[#F5DEB3]">Power of Attorney</h4>
        </div>
        <p className="text-gray-200 text-sm mb-3">
          Appoint someone you trust to make financial and legal decisions on your behalf if needed.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
        >
          Power of Attorney Forms <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentsTabContent;
