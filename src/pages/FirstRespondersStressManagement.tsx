
import React from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, Clock, Calendar, Play, FileText, Download } from "lucide-react";
import PortalBackButton from "@/components/navigation/PortalBackButton";
import ActionButton from "@/components/navigation/ActionButton";

const FirstRespondersStressManagement = () => {
  const techniques = [
    {
      title: "Tactical Breathing",
      description: "Combat-proven breathing technique to manage acute stress response",
      duration: "5 minutes",
      type: "practice",
      id: "tactical-breathing"
    },
    {
      title: "Post-Shift Decompression",
      description: "Structured routine for transitioning from work to home",
      duration: "15 minutes",
      type: "practice",
      id: "decompression"
    },
    {
      title: "Sleep Optimization for Shift Workers",
      description: "Techniques for quality rest despite irregular schedules",
      duration: "10 minutes",
      type: "practice",
      id: "shift-sleep"
    }
  ];
  
  const resources = [
    {
      title: "Stress Management Field Guide",
      description: "Pocket guide with quick-reference stress management techniques",
      type: "download"
    },
    {
      title: "Stress Inoculation Training",
      description: "Self-paced workshop for building stress tolerance",
      type: "workshop",
      id: "stress-inoculation"
    }
  ];

  return (
    <Page title="Stress Management for First Responders" showBackButton={false}>
      <div className="mb-4">
        <PortalBackButton returnPath="/first-responders-portal" />
      </div>

      <div className="bg-gradient-to-r from-red-950 to-red-900 p-4 rounded-lg mb-6 border border-red-800">
        <h2 className="text-xl font-bold text-white mb-2">Stress Management Techniques</h2>
        <p className="text-red-200">
          Evidence-based tools to help first responders manage stress before, during, and after high-pressure situations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {techniques.map((technique, index) => (
          <Card key={index} className="bg-[#141921] border-red-900/30">
            <CardHeader>
              <div className="flex items-center gap-2 text-red-400">
                <Brain className="h-5 w-5" />
                <CardTitle>{technique.title}</CardTitle>
              </div>
              <CardDescription>{technique.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
                <Clock className="h-4 w-4" />
                <span>{technique.duration}</span>
              </div>
            </CardContent>
            <CardFooter>
              <ActionButton
                type={technique.type as any}
                id={technique.id}
                title="Start Practice"
                variant="default"
                className="w-full bg-red-700 hover:bg-red-800 text-white"
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-black/20 p-5 rounded-lg border border-red-900/30 mb-6">
        <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-red-500" />
          Upcoming Stress Management Workshops
        </h3>
        
        <div className="space-y-3 mb-4">
          <div className="bg-[#141921] p-3 rounded-lg border border-red-900/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-900/20 text-red-400 p-2 rounded-lg text-center min-w-[50px]">
                <span className="block text-sm">APR</span>
                <span className="block text-xl font-bold">25</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Stress in Emergency Response</h4>
                <p className="text-sm text-white/70">Live workshop | 7:00 PM ET</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-red-500 text-red-300 hover:bg-red-900/50"
            >
              Register
            </Button>
          </div>
          
          <div className="bg-[#141921] p-3 rounded-lg border border-red-900/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-900/20 text-red-400 p-2 rounded-lg text-center min-w-[50px]">
                <span className="block text-sm">MAY</span>
                <span className="block text-xl font-bold">03</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Building Resilience on Duty</h4>
                <p className="text-sm text-white/70">Live workshop | 1:00 PM ET</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-red-500 text-red-300 hover:bg-red-900/50"
            >
              Register
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="bg-[#141921] border-red-900/30">
            <CardHeader>
              <div className="flex items-center gap-2 text-red-400">
                {resource.type === "download" ? (
                  <FileText className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
                <CardTitle>{resource.title}</CardTitle>
              </div>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              {resource.type === "download" ? (
                <Button className="w-full bg-red-700 hover:bg-red-800 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resource
                </Button>
              ) : (
                <ActionButton
                  type={resource.type as any}
                  id={resource.id}
                  title="Start Workshop"
                  variant="default"
                  className="w-full bg-red-700 hover:bg-red-800 text-white"
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Page>
  );
};

export default FirstRespondersStressManagement;
