import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, BookOpen, Download, FileText, 
  ExternalLink, Bookmark, Search, Filter, 
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import HomeButton from "@/components/HomeButton";

// Sample resources data
const resources = [
  {
    id: 1,
    title: "PTSD Coping Strategies",
    description: "A comprehensive guide to understanding and managing PTSD symptoms for military personnel.",
    category: "Mental Health",
    type: "PDF",
    size: "2.4 MB",
    date: "June 15, 2023",
    url: "#",
    featured: true
  },
  {
    id: 2,
    title: "Transition Assistance Program Guide",
    description: "Resources and information to help service members transition to civilian life successfully.",
    category: "Career",
    type: "PDF",
    size: "3.1 MB",
    date: "May 22, 2023",
    url: "#",
    featured: true
  },
  {
    id: 3,
    title: "Military Family Support Networks",
    description: "Directory of support groups and resources for military families across the country.",
    category: "Family",
    type: "PDF",
    size: "1.8 MB",
    date: "April 10, 2023",
    url: "#",
    featured: true
  },
  {
    id: 4,
    title: "Combat Stress Management",
    description: "Techniques and strategies for managing stress related to combat experiences.",
    category: "Mental Health",
    type: "PDF",
    size: "2.2 MB",
    date: "March 5, 2023",
    url: "#",
    featured: false
  },
  {
    id: 5,
    title: "VA Benefits Overview",
    description: "Comprehensive guide to understanding and accessing your VA benefits.",
    category: "Benefits",
    type: "PDF",
    size: "4.5 MB",
    date: "February 18, 2023",
    url: "#",
    featured: false
  },
  {
    id: 6,
    title: "Military to Civilian Resume Guide",
    description: "How to translate your military experience into civilian job qualifications.",
    category: "Career",
    type: "PDF",
    size: "1.5 MB",
    date: "January 30, 2023",
    url: "#",
    featured: false
  },
  {
    id: 7,
    title: "Deployment Readiness for Families",
    description: "Preparing your family for the challenges of deployment.",
    category: "Family",
    type: "PDF",
    size: "2.0 MB",
    date: "January 15, 2023",
    url: "#",
    featured: false
  },
  {
    id: 8,
    title: "Military Sexual Trauma Support",
    description: "Resources and support options for those affected by military sexual trauma.",
    category: "Mental Health",
    type: "PDF",
    size: "1.7 MB",
    date: "December 10, 2022",
    url: "#",
    featured: false
  }
];

// External resources data
const externalResources = [
  {
    id: 1,
    title: "Veterans Crisis Line",
    description: "24/7 confidential crisis support for Veterans and their loved ones.",
    url: "https://www.veteranscrisisline.net/",
    category: "Crisis Support"
  },
  {
    id: 2,
    title: "Military OneSource",
    description: "Support for military personnel and their families for a wide range of concerns.",
    url: "https://www.militaryonesource.mil/",
    category: "General Support"
  },
  {
    id: 3,
    title: "National Center for PTSD",
    description: "Information and resources for PTSD treatment and research.",
    url: "https://www.ptsd.va.gov/",
    category: "Mental Health"
  },
  {
    id: 4,
    title: "Wounded Warrior Project",
    description: "Programs and services for veterans and service members who incurred physical or mental injuries.",
    url: "https://www.woundedwarriorproject.org/",
    category: "Support Services"
  }
];

const ResourceCard: React.FC<{
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  date: string;
  url: string;
}> = ({ title, description, category, type, size, date, url }) => {
  return (
    <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border border-white/10 text-white transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium py-1 px-2 rounded-full w-fit mb-2">
            {category}
          </div>
          <div className="flex items-center text-white/60 text-xs">
            <FileText className="h-3 w-3 mr-1" />
            {type} • {size}
          </div>
        </div>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-gray-300 mb-4">
          {description}
        </CardDescription>
        
        <div className="text-gray-400 text-xs">
          Added: {date}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="w-full flex items-center justify-between">
          <Button variant="gold" size="sm" className="text-sm">
            <Download className="h-3 w-3 mr-2" />
            Download
          </Button>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#B87333]">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const ExternalResourceCard: React.FC<{
  title: string;
  description: string;
  category: string;
  url: string;
}> = ({ title, description, category, url }) => {
  return (
    <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border border-white/10 text-white transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
      <CardHeader className="pb-2">
        <div className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium py-1 px-2 rounded-full w-fit mb-2">
          {category}
        </div>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="text-gray-300 mb-4">
          {description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="text-sm border-[#B87333]/30 text-[#B87333] hover:bg-[#B87333]/10">
          <ExternalLink className="h-3 w-3 mr-2" />
          Visit Website
        </Button>
      </CardFooter>
    </Card>
  );
};

const MilitaryResources: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1929] to-[#1A365D] py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/military-support" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Military Support
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Military Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Access specialized resources for service members, veterans, and military families.
          </p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search resources..." 
                className="pl-10 bg-white/10 border-white/10 text-white"
              />
            </div>
            <Button variant="outline" className="border-white/20 text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="gold">
              <Wrench className="h-4 w-4 mr-2" />
              Resource Finder
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 gap-2 bg-black/30 mb-8 p-1 rounded-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#B87333]/90">All Resources</TabsTrigger>
            <TabsTrigger value="mental-health" className="data-[state=active]:bg-[#B87333]/90">Mental Health</TabsTrigger>
            <TabsTrigger value="career" className="data-[state=active]:bg-[#B87333]/90">Career</TabsTrigger>
            <TabsTrigger value="family" className="data-[state=active]:bg-[#B87333]/90">Family</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="animate-fade-in">
            <h2 className="text-2xl font-bold text-[#B87333] mb-6">
              Featured Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {resources.filter(resource => resource.featured).map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  category={resource.category}
                  type={resource.type}
                  size={resource.size}
                  date={resource.date}
                  url={resource.url}
                />
              ))}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
              All Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {resources.map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  category={resource.category}
                  type={resource.type}
                  size={resource.size}
                  date={resource.date}
                  url={resource.url}
                />
              ))}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
              External Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {externalResources.map(resource => (
                <ExternalResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  category={resource.category}
                  url={resource.url}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="mental-health" className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
              Mental Health Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.filter(resource => resource.category === "Mental Health").map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  category={resource.category}
                  type={resource.type}
                  size={resource.size}
                  date={resource.date}
                  url={resource.url}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="career" className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
              Career Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.filter(resource => resource.category === "Career").map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  category={resource.category}
                  type={resource.type}
                  size={resource.size}
                  date={resource.date}
                  url={resource.url}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="family" className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
              Family Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.filter(resource => resource.category === "Family").map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  category={resource.category}
                  type={resource.type}
                  size={resource.size}
                  date={resource.date}
                  url={resource.url}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Resource Request */}
        <div className="mt-16 bg-gradient-to-r from-[#B87333]/20 to-transparent p-8 rounded-lg border border-[#B87333]/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Need a Specific Resource?</h3>
              <p className="text-gray-300">
                Can't find what you're looking for? Let us know and we'll help you locate the right resources.
              </p>
            </div>
            
            <Button variant="gold" size="lg">
              Request Resource
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#0F2942] border-t border-white/10 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            These resources are regularly updated to provide the most current information available.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              to="/military-support" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Military Support Home
            </Link>
            <Link 
              to="/contact" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MilitaryResources;
