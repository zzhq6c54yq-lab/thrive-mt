
import React from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink, Phone, Brain, ShieldAlert } from "lucide-react";
import { useLocation } from "react-router-dom";
import PortalBackButton from "@/components/navigation/PortalBackButton";
import ActionButton from "@/components/navigation/ActionButton";

const FirstRespondersResources = () => {
  const location = useLocation();
  
  const resources = [
    {
      title: "Critical Incident Stress Management",
      description: "Guide for handling stress after critical incidents",
      icon: <Brain className="h-5 w-5 text-red-500" />,
      type: "pdf",
      action: "download",
      actionText: "Download PDF"
    },
    {
      title: "Trauma Response Protocol",
      description: "Step-by-step guide for managing trauma exposure",
      icon: <ShieldAlert className="h-5 w-5 text-red-500" />,
      type: "pdf",
      action: "download",
      actionText: "Download Guide"
    },
    {
      title: "First Responder Peer Support Manual",
      description: "Resources for establishing peer support programs",
      icon: <FileText className="h-5 w-5 text-red-500" />,
      type: "pdf",
      action: "download",
      actionText: "Download Manual"
    },
    {
      title: "Emergency Services Crisis Line",
      description: "24/7 confidential support for emergency personnel",
      icon: <Phone className="h-5 w-5 text-red-500" />,
      type: "external",
      action: "other",
      path: "/crisis-support",
      actionText: "Get Support"
    }
  ];

  return (
    <Page title="First Responders Resources" showBackButton={false}>
      <div className="mb-4">
        <PortalBackButton returnPath="/first-responders-portal" />
      </div>

      <div className="bg-gradient-to-r from-red-950 to-red-900 p-4 rounded-lg mb-6 border border-red-800">
        <h2 className="text-xl font-bold text-white mb-2">Resources for Emergency Personnel</h2>
        <p className="text-red-200">
          Access specialized tools and materials designed to support first responders' mental health and wellbeing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <Card key={index} className="bg-[#141921] border-red-900/30 hover:border-red-700/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2">
                {resource.icon}
                <CardTitle>{resource.title}</CardTitle>
              </div>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              {resource.action === "download" ? (
                <Button 
                  className="bg-red-700 hover:bg-red-800 text-white"
                  onClick={() => {
                    // This would download the resource in a real app
                    setTimeout(() => {
                      alert(`Downloading ${resource.title}`);
                    }, 500);
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {resource.actionText}
                </Button>
              ) : (
                <ActionButton
                  type={resource.action as any}
                  path={resource.path}
                  title={resource.actionText}
                  variant="default" 
                  className="bg-red-700 hover:bg-red-800 text-white"
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Page>
  );
};

export default FirstRespondersResources;
