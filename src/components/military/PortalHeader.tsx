
import React from "react";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PortalHeader = () => {
  return (
    <div className="flex items-center">
      <div className="mr-4 p-2 bg-[#0A1929]/80 rounded-full border-2 border-[#B87333]">
        <Shield className="h-10 w-10 text-[#B87333]" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center">
          DoD Mental Health Portal
          <Badge variant="outline" className="ml-4 bg-[#0A1929] text-[#B87333] border-[#B87333]">
            Military Focus
          </Badge>
        </h1>
        <p className="text-gray-300 mt-1">
          Specialized resources and tools for service members and veterans
        </p>
      </div>
    </div>
  );
};

export default PortalHeader;
