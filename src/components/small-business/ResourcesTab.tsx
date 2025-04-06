
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Brain } from "lucide-react";

interface ResourcesTabProps {
  onFeatureClick: (path: string) => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ onFeatureClick }) => {
  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-900/30 rounded-full">
                  <FileText className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Small Business Resource Library</h3>
              </div>
              <p className="text-white/70 mb-4">
                Access articles, guides, and tools specifically created for small business mental wellness.
              </p>
              <Button 
                className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                onClick={() => onFeatureClick("resource-library")}
              >
                Browse Resources
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-900/30 rounded-full">
                  <Brain className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Mental Health Toolkit</h3>
              </div>
              <p className="text-white/70 mb-4">
                Essential tools and strategies to promote mental wellness in small business environments.
              </p>
              <Button 
                className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                onClick={() => onFeatureClick("mental-wellness-tools")}
              >
                Access Toolkit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesTab;
