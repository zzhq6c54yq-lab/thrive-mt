
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Book, FileText, Video, Link, Download, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoDResources = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Resource categories with their content
  const resourceCategories = [
    {
      id: "ptsd",
      name: "PTSD & Trauma",
      description: "Resources for managing post-traumatic stress and combat-related trauma",
      resources: [
        {
          title: "Combat PTSD Workbook",
          type: "document",
          description: "Step-by-step guide for managing combat-related PTSD symptoms",
          icon: FileText
        },
        {
          title: "Trauma Processing Techniques",
          type: "video",
          description: "Expert-led video series on trauma processing techniques",
          icon: Video
        },
        {
          title: "Deployment Stress Management",
          type: "guide",
          description: "Comprehensive guide to managing stress during and after deployment",
          icon: Book
        }
      ]
    },
    {
      id: "support",
      name: "Support Groups",
      description: "Peer support networks and group therapy options",
      resources: [
        {
          title: "Veteran Peer Support Network",
          type: "link",
          description: "Connect with other veterans who understand your experience",
          icon: Link
        },
        {
          title: "Military Family Support Circles",
          type: "group",
          description: "Support groups specifically for military families and spouses",
          icon: Link
        },
        {
          title: "Combat Veterans Group Therapy Guide",
          type: "document",
          description: "Information on structured group therapy for combat veterans",
          icon: FileText
        }
      ]
    },
    {
      id: "self-help",
      name: "Self-Help Tools",
      description: "Tools and exercises for independently managing mental health",
      resources: [
        {
          title: "Military Mindfulness App",
          type: "app",
          description: "Mindfulness and meditation specifically designed for military personnel",
          icon: Download
        },
        {
          title: "Deployment Readiness Toolkit",
          type: "toolkit",
          description: "Mental preparation resources for pre-deployment readiness",
          icon: Download
        },
        {
          title: "Reintegration Workbook",
          type: "document",
          description: "Exercises and strategies for returning to civilian life",
          icon: FileText
        }
      ]
    },
    {
      id: "benefits",
      name: "Benefits & Services",
      description: "Information about VA benefits and other available services",
      resources: [
        {
          title: "VA Mental Health Benefits Guide",
          type: "document",
          description: "Complete overview of mental health services available through VA",
          icon: FileText
        },
        {
          title: "Navigating Your Benefits",
          type: "video",
          description: "Step-by-step video guide to accessing your mental health benefits",
          icon: Video
        },
        {
          title: "State-by-State Resources Directory",
          type: "directory",
          description: "Comprehensive list of resources available by state",
          icon: Link
        }
      ]
    }
  ];

  const getResourceTypeLabel = (type) => {
    switch(type) {
      case 'document': return 'PDF Document';
      case 'video': return 'Video Resource';
      case 'guide': return 'Guide';
      case 'link': return 'External Resource';
      case 'group': return 'Support Group';
      case 'app': return 'Mobile App';
      case 'toolkit': return 'Tool Kit';
      case 'directory': return 'Resource Directory';
      default: return 'Resource';
    }
  };
  
  const getResourceIcon = (Icon) => {
    return <Icon className="h-5 w-5 text-blue-400" />;
  };

  // Handle resource access button click
  const handleResourceAccess = (resource) => {
    let actionText = "";
    
    switch(resource.type) {
      case 'document':
      case 'guide':
        actionText = "Downloading";
        break;
      case 'video':
        actionText = "Playing";
        break;
      case 'link':
      case 'group':
      case 'directory':
        actionText = "Opening";
        break;
      case 'app':
      case 'toolkit':
        actionText = "Installing";
        break;
      default:
        actionText = "Accessing";
    }
    
    toast({
      title: `${actionText} ${resource.title}`,
      description: `Your resource is being prepared. ${resource.type === 'document' ? 'The download will start shortly.' : ''}`,
      duration: 2000,
    });

    // For demo purposes, show a follow-up toast
    setTimeout(() => {
      if (resource.type === 'document' || resource.type === 'guide' || resource.type === 'toolkit') {
        toast({
          title: "Download Complete",
          description: `${resource.title} has been downloaded successfully.`,
          duration: 2000,
        });
      }
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Military Mental Health Resources</h2>
        <p className="text-blue-200/80 mb-6">
          Access specialized resources designed for service members, veterans, and military families.
        </p>
        
        {/* Search bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400/50 h-5 w-5" />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full py-2.5 pl-10 pr-4 bg-[#0c1016] border border-blue-900/30 rounded-md text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Resource Categories */}
      <Tabs defaultValue="ptsd">
        <TabsList className="flex overflow-x-auto bg-[#141921] border border-blue-900/30 mb-6">
          {resourceCategories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400 data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.5)] whitespace-nowrap"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {resourceCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              <p className="text-blue-200/70">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.resources.map((resource, index) => (
                <Card key={index} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getResourceIcon(resource.icon)}
                        <CardTitle className="text-white text-lg">{resource.title}</CardTitle>
                      </div>
                      <span className="text-xs bg-blue-900/30 py-1 px-2 rounded-md text-blue-400">
                        {getResourceTypeLabel(resource.type)}
                      </span>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                      onClick={() => handleResourceAccess(resource)}
                    >
                      {resource.type === 'document' || resource.type === 'guide' ? (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download Resource
                        </>
                      ) : resource.type === 'video' ? (
                        <>
                          <Video className="h-4 w-4 mr-2" />
                          Watch Video
                        </>
                      ) : resource.type === 'link' || resource.type === 'group' || resource.type === 'directory' ? (
                        <>
                          <Link className="h-4 w-4 mr-2" />
                          Open Resource
                        </>
                      ) : resource.type === 'app' || resource.type === 'toolkit' ? (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Install {resource.type === 'app' ? 'App' : 'Toolkit'}
                        </>
                      ) : (
                        'Access Resource'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                variant="outline" 
                className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                onClick={() => {
                  toast({
                    title: `More ${category.name} Resources`,
                    description: "Loading additional resources in this category",
                    duration: 2000
                  });
                }}
              >
                View More {category.name} Resources
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Featured Resource */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-700/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold text-white mb-2">Veterans Crisis Resources</h3>
              <p className="text-blue-200/80 mb-4">
                Immediate support for veterans in crisis, including the Veterans Crisis Line, which offers confidential support 24/7.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="bg-red-700 hover:bg-red-800 text-white"
                  onClick={() => {
                    navigate("/crisis-support", {
                      state: {
                        fromSpecializedProgram: true,
                        preventTutorial: true,
                        returnToPortal: "/dod-portal"
                      }
                    });
                  }}
                >
                  Crisis Resources
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                  onClick={() => {
                    toast({
                      title: "Local Support Finder",
                      description: "Opening the service locator map for veteran support services",
                      duration: 2000
                    });
                  }}
                >
                  Find Local Support
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                <p className="text-xl font-bold text-white mb-1">Veterans Crisis Line</p>
                <p className="text-blue-400 text-2xl font-bold">988 (Press 1)</p>
                <p className="text-white/60 text-sm">Available 24/7</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoDResources;
