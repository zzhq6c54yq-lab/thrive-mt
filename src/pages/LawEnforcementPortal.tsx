
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, ClipboardList, BookOpen, FileText, Users, Brain, AlertCircle, Calendar, Star, ChevronRight, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ThriveButton from "@/components/navigation/ThriveButton";

const LawEnforcementPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleButtonClick = (path: string, title: string) => {
    toast({
      title: `Navigating to ${title}`,
      description: "Loading your requested resource...",
      duration: 1500,
    });

    navigate(path, {
      state: {
        preventTutorial: true,
        returnToMain: false,
        returnToPortal: "/law-enforcement-portal",
        stayInPortal: true,
        portalType: "law-enforcement"
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4">
        <ThriveButton className="shadow-lg" />
      </div>
      <div className="relative overflow-hidden rounded-lg border border-blue-900/30 bg-gradient-to-r from-blue-950 to-blue-900 p-6">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome, Law Enforcement Professional</h2>
          <p className="text-blue-200 mb-6 max-w-3xl">
            Access specialized mental health resources and support designed for law enforcement professionals.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white" 
              onClick={() => handleButtonClick("/law-enforcement-resources", "Law Enforcement Resources")}
            >
              Explore Resources
            </Button>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
              onClick={() => handleButtonClick("/crisis-support", "Crisis Support")}
            >
              Get Immediate Help
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Quick Access</h2>
          <Button
            variant="link"
            className="text-blue-400"
            onClick={() => handleButtonClick("/law-enforcement-resources", "Support Resources")}
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400">
                <ClipboardList className="h-5 w-5" />
                <CardTitle>Workshops</CardTitle>
              </div>
              <CardDescription>Live and on-demand professional workshops</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Join expert-led workshops to enhance skills and resilience for law enforcement.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleButtonClick("/law-enforcement-workshops", "Workshops")}
              >
                View Workshops
              </Button>
            </CardFooter>
          </Card>
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400">
                <BookOpen className="h-5 w-5" />
                <CardTitle>Resources</CardTitle>
              </div>
              <CardDescription>Curated resources for law enforcement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Find articles, videos, and support tools tailored for your well-being.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleButtonClick("/law-enforcement-resources", "Resources")}
              >
                Explore Resources
              </Button>
            </CardFooter>
          </Card>
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400">
                <Shield className="h-5 w-5" />
                <CardTitle>Assessments</CardTitle>
              </div>
              <CardDescription>Self-help and wellness assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Take quick mental wellness assessments and check your stress levels.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleButtonClick("/law-enforcement-assessments", "Assessments")}
              >
                Start Assessment
              </Button>
            </CardFooter>
          </Card>
          <Card className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-400">
                <FileText className="h-5 w-5" />
                <CardTitle>Worksheets</CardTitle>
              </div>
              <CardDescription>Downloadable and interactive worksheets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Access practical worksheets for coping, planning, and skill-building.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => handleButtonClick("/law-enforcement-worksheets", "Worksheets")}
              >
                View Worksheets
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LawEnforcementPortal;
