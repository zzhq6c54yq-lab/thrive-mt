
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SpecializedProgramsProps {
  navigateToFeature: (path: string) => void;
}

const SpecializedPrograms: React.FC<SpecializedProgramsProps> = ({ navigateToFeature }) => {
  const programs = [
    {
      id: "veterans",
      title: "Veterans Program",
      description: "Specialized mental health support for veterans",
      path: "/military-support"
    },
    {
      id: "college",
      title: "College Students",
      description: "Resources tailored for campus mental wellness",
      path: "/college-portal"
    },
    {
      id: "business",
      title: "Small Business",
      description: "Support for entrepreneurs and small teams",
      path: "/small-business-portal"
    }
  ];

  return (
    <Card className="overflow-hidden border-purple-500/20">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 px-6 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-purple-300" />
            <h3 className="font-semibold text-lg text-white">Specialized Programs</h3>
          </div>
          <p className="text-sm text-purple-200">
            Tailored mental wellness support for specific groups
          </p>
        </div>
        
        <div className="p-4 space-y-3">
          {programs.map(program => (
            <div key={program.id} className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-1">
                {program.title}
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-400 mb-2">
                {program.description}
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40"
                onClick={() => navigateToFeature(program.path)}
              >
                Explore
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecializedPrograms;
