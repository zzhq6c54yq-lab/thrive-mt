
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, Calendar, Heart } from "lucide-react";

const DashboardTabContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-[#B87333]" />
            Service Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white">Military service information will appear here.</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#B87333]" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white">Your scheduled sessions will appear here.</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-[#B87333]" />
            Well-being Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white">Your well-being metrics will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTabContent;
