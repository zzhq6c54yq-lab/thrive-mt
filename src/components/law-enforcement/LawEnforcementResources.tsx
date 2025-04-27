
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileText, BookOpen, Link } from "lucide-react";
import useFeatureActions from "@/hooks/useFeatureActions";

const LawEnforcementResources = () => {
  const { handleActionClick } = useFeatureActions();
  
  const resourceCategories = [
    {
      title: "Stress Management",
      description: "Resources designed to help law enforcement personnel manage job-related stress",
      icon: Shield,
      resources: [
        {
          title: "Tactical Breathing for Critical Incidents",
          format: "PDF Guide",
          id: "tactical-breathing",
          type: "download"
        },
        {
          title: "Shift Work and Sleep Management",
          format: "Online Course",
          id: "shift-work",
          type: "workshop"
        },
        {
          title: "Compartmentalizing Work and Home Life",
          format: "Video Series",
          id: "compartmentalizing",
          type: "view"
        }
      ]
    },
    {
      title: "Critical Incident Response",
      description: "Tools for managing stress after critical incidents",
      icon: FileText,
      resources: [
        {
          title: "Post-Critical Incident Self-Care",
          format: "PDF Guide",
          id: "post-critical-care",
          type: "download"
        },
        {
          title: "Critical Incident Stress Debriefing",
          format: "Workshop",
          id: "stress-debriefing",
          type: "workshop"
        },
        {
          title: "Recognizing PTSD in Law Enforcement",
          format: "Assessment",
          id: "ptsd-recognition",
          type: "assessment"
        }
      ]
    },
    {
      title: "Family Support",
      description: "Resources for families of law enforcement personnel",
      icon: BookOpen,
      resources: [
        {
          title: "Supporting Your Law Enforcement Officer",
          format: "eBook",
          id: "family-support",
          type: "download"
        },
        {
          title: "Navigating Law Enforcement Family Life",
          format: "Support Group",
          id: "family-life",
          type: "join"
        },
        {
          title: "When Work Comes Home: Family Coping Strategies",
          format: "Workshop",
          id: "family-coping",
          type: "workshop"
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Law Enforcement Resources</h2>
        <p className="text-blue-200/80 mb-6 max-w-3xl">
          Access specialized resources designed for law enforcement professionals to support your mental health and wellness needs.
        </p>
      </div>
      
      {/* Resource Categories */}
      {resourceCategories.map((category, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-900/20 rounded-full">
              <category.icon className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">{category.title}</h3>
          </div>
          <p className="text-blue-200/70 ml-9">{category.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {category.resources.map((resource, resIndex) => (
              <Card key={resIndex} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-1">{resource.title}</h4>
                      <div className="flex items-center text-xs text-blue-400">
                        <Link className="h-3 w-3 mr-1" />
                        <span>{resource.format}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleActionClick({
                        type: resource.type as any,
                        id: resource.id,
                        title: resource.title
                      })}
                    >
                      {resource.type === "download" ? "Download" : 
                       resource.type === "workshop" ? "Register" : 
                       resource.type === "assessment" ? "Start Assessment" :
                       resource.type === "join" ? "Join Group" : "View Resource"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
      
      {/* External Resources */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-white mb-4">External Resources</h3>
        <Card className="bg-[#141921] border-blue-900/30">
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-blue-200/80">
                The following professional organizations and resources provide additional support for law enforcement personnel.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Link className="h-4 w-4 flex-shrink-0 text-blue-400" />
                  <span className="text-white">National Alliance on Mental Illness (NAMI) - Law Enforcement Resources</span>
                </li>
                <li className="flex items-center gap-2">
                  <Link className="h-4 w-4 flex-shrink-0 text-blue-400" />
                  <span className="text-white">Cop2Cop - Law Enforcement Crisis Hotline</span>
                </li>
                <li className="flex items-center gap-2">
                  <Link className="h-4 w-4 flex-shrink-0 text-blue-400" />
                  <span className="text-white">Blue H.E.L.P. - Law Enforcement Mental Health Support</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LawEnforcementResources;
