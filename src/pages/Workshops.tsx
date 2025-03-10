
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { workshopData } from "@/data/workshopData";
import Page from "@/components/Page";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const Workshops = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Page title="Thrive MT Mental Health Workshops" showBackButton={true} onBackClick={handleBack}>
      <div className="space-y-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-gray-800">Current Workshops Available</CardTitle>
                <CardDescription>
                  Guided 45-minute sessions with Henry to improve your mental wellbeing
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-500">
                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
          </CardHeader>
          
          {isExpanded && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {workshopData.map((workshop) => (
                  <Card key={workshop.id} className={`border ${workshop.color.split(' ')[0]} shadow-sm`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${workshop.color}`}>
                          <workshop.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{workshop.title}</CardTitle>
                          <CardDescription className="text-sm">{workshop.duration}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{workshop.description}</p>
                      <Link to={`/workshop/${workshop.id}`}>
                        <Button className="w-full">Start Workshop</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </Page>
  );
};

export default Workshops;
