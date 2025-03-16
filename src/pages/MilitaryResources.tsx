
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, BookOpen, ExternalLink, Search, 
  Download, Shield, Heart, Users, Phone, FileText,
  Bookmark, Filter, ChevronDown, Check, MessageSquare,
  Wrench, CheckSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import HomeButton from "@/components/HomeButton";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Resource categories
const resourceCategories = [
  "PTSD & Trauma",
  "Depression & Anxiety",
  "Substance Recovery",
  "Family Support",
  "Career Transition",
  "Benefits & Healthcare"
];

// Sample resources data
const resources = [
  {
    id: 1,
    title: "PTSD Coach Mobile App",
    description: "Learn about and manage symptoms that often occur after trauma. Features self-assessment, education, and coping tools.",
    type: "Tool",
    category: "PTSD & Trauma",
    url: "#",
    featured: true
  },
  {
    id: 2,
    title: "Veterans Crisis Line Information",
    description: "24/7 confidential crisis support for Veterans and their loved ones. Call, text, or chat online with caring responders.",
    type: "Crisis Support",
    category: "Depression & Anxiety",
    url: "#",
    featured: true
  },
  {
    id: 3,
    title: "Substance Use Disorder Treatment Guide",
    description: "Comprehensive guide to understanding and finding treatment for substance use disorders among veterans.",
    type: "Guide",
    category: "Substance Recovery",
    url: "#",
    featured: true
  },
  {
    id: 4,
    title: "Military OneSource",
    description: "Confidential services to help with mental health, financial, legal, and other aspects of military life.",
    type: "Service",
    category: "Family Support",
    url: "#",
    featured: false
  },
  {
    id: 5,
    title: "VA Benefits Explained",
    description: "Clear explanation of mental health benefits available to veterans through the VA healthcare system.",
    type: "Guide",
    category: "Benefits & Healthcare",
    url: "#",
    featured: false
  },
  {
    id: 6,
    title: "Military-to-Civilian Resume Guide",
    description: "Step-by-step guide to translating military experience into civilian resume language.",
    type: "Guide",
    category: "Career Transition",
    url: "#",
    featured: false
  },
  {
    id: 7,
    title: "Mindfulness Meditation for Veterans",
    description: "Audio recordings of guided meditations specifically designed for veterans dealing with stress and trauma.",
    type: "Tool",
    category: "PTSD & Trauma",
    url: "#",
    featured: false
  },
  {
    id: 8,
    title: "Military Family Communication Workbook",
    description: "Printable workbook with exercises to improve communication within military families.",
    type: "Workbook",
    category: "Family Support",
    url: "#",
    featured: false
  },
  {
    id: 9,
    title: "Understanding Military Trauma",
    description: "Educational resource explaining the unique aspects of trauma related to military service.",
    type: "Article",
    category: "PTSD & Trauma",
    url: "#",
    featured: false
  },
  {
    id: 10,
    title: "Veteran Peer Support Directory",
    description: "Find peer support groups led by veterans, searchable by location and focus area.",
    type: "Directory",
    category: "Depression & Anxiety",
    url: "#",
    featured: false
  },
  {
    id: 11,
    title: "Military Transition Readiness Assessment",
    description: "Self-assessment tool to evaluate readiness for transition to civilian life with personalized recommendations.",
    type: "Assessment",
    category: "Career Transition",
    url: "#",
    featured: false
  },
  {
    id: 12,
    title: "Veterans Benefits Navigation Toolkit",
    description: "Interactive guide to help veterans navigate and access their full range of benefits.",
    type: "Toolkit",
    category: "Benefits & Healthcare",
    url: "#",
    featured: false
  }
];

const MilitaryResources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const filteredResources = resources.filter(resource => {
    // Filter by search term
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected categories (if any are selected)
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(resource.category);
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

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
          
          <h1 className="text-4xl font-bold mb-4">Mental Health Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Access a curated collection of resources specifically designed for military personnel, veterans, and their families.
          </p>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-[#0F2942] border-y border-white/10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-10 bg-[#1c2e4a] border-white/10 text-white w-full md:w-80"
                placeholder="Search resources..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 items-center w-full md:w-auto justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-[#1c2e4a] border-white/10 text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter by Category
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#1c2e4a] border-white/10 text-white">
                  <DropdownMenuLabel>Resource Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {resourceCategories.map(category => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {selectedCategories.length > 0 && (
                <Button 
                  variant="ghost" 
                  className="text-[#B87333] hover:text-[#B87333]/80 hover:bg-white/5"
                  onClick={() => setSelectedCategories([])}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Crisis Resources - Always at the top */}
      <div className="bg-[#B87333]/10 border-b border-[#B87333]/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#B87333] mb-2 flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Crisis Resources - Available 24/7
              </h2>
              <p className="text-gray-300">
                If you're experiencing a mental health crisis, help is available right now.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="gold">
                <Phone className="mr-2 h-4 w-4" />
                Call 988 (Press 1)
              </Button>
              
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <MessageSquare className="mr-2 h-4 w-4" />
                Text 838255
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Resources */}
        <h2 className="text-2xl font-bold text-[#B87333] mb-6 flex items-center">
          <Bookmark className="mr-2 h-5 w-5" />
          Featured Resources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filteredResources.filter(r => r.featured).map(resource => (
            <ResourceCard 
              key={resource.id}
              title={resource.title}
              description={resource.description}
              type={resource.type}
              category={resource.category}
              url={resource.url}
              featured={resource.featured}
            />
          ))}
        </div>
        
        {/* Tabbed Resources */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-[#1c2e4a] mb-8 w-full justify-start overflow-x-auto flex-nowrap">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-[#B87333]">All Resources</TabsTrigger>
            <TabsTrigger value="ptsd" className="text-white data-[state=active]:bg-[#B87333]">PTSD & Trauma</TabsTrigger>
            <TabsTrigger value="depression" className="text-white data-[state=active]:bg-[#B87333]">Depression & Anxiety</TabsTrigger>
            <TabsTrigger value="substance" className="text-white data-[state=active]:bg-[#B87333]">Substance Recovery</TabsTrigger>
            <TabsTrigger value="family" className="text-white data-[state=active]:bg-[#B87333]">Family Support</TabsTrigger>
            <TabsTrigger value="career" className="text-white data-[state=active]:bg-[#B87333]">Career Transition</TabsTrigger>
            <TabsTrigger value="benefits" className="text-white data-[state=active]:bg-[#B87333]">Benefits & Healthcare</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.length > 0 ? (
                filteredResources.map(resource => (
                  <ResourceCard 
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    type={resource.type}
                    category={resource.category}
                    url={resource.url}
                    featured={resource.featured}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12 bg-[#1c2e4a]/50 rounded-lg border border-white/10">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
                  <p className="text-gray-400">
                    Try adjusting your search or filters to find resources.
                  </p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 text-[#B87333]"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategories([]);
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="ptsd">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(r => r.category === "PTSD & Trauma").map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  category={resource.category}
                  url={resource.url}
                  featured={resource.featured}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="depression">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(r => r.category === "Depression & Anxiety").map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  category={resource.category}
                  url={resource.url}
                  featured={resource.featured}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="substance">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(r => r.category === "Substance Recovery").map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  category={resource.category}
                  url={resource.url}
                  featured={resource.featured}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="family">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(r => r.category === "Family Support").map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  category={resource.category}
                  url={resource.url}
                  featured={resource.featured}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="career">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(r => r.category === "Career Transition").map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  category={resource.category}
                  url={resource.url}
                  featured={resource.featured}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="benefits">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(r => r.category === "Benefits & Healthcare").map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  category={resource.category}
                  url={resource.url}
                  featured={resource.featured}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Submit Resource */}
        <div className="mt-16 bg-gradient-to-r from-[#B87333]/20 to-transparent p-8 rounded-lg border border-[#B87333]/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Have a Resource to Share?</h3>
              <p className="text-gray-300">
                If you know of helpful resources for military mental health, we welcome your suggestions.
              </p>
            </div>
            
            <Button variant="gold" size="lg">
              Submit Resource
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#0F2942] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            Resources are regularly updated to ensure accuracy and relevance for our military community.
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

// Resource Card Component
interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
  category: string;
  url: string;
  featured: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  description, 
  type, 
  category, 
  url,
  featured
}) => {
  // Determine icon based on resource type
  const getIcon = () => {
    switch (type) {
      case "Tool":
        return <Wrench className="h-4 w-4 text-[#B87333]" />;
      case "Guide":
      case "Workbook":
        return <FileText className="h-4 w-4 text-[#B87333]" />;
      case "Article":
        return <BookOpen className="h-4 w-4 text-[#B87333]" />;
      case "Directory":
        return <Users className="h-4 w-4 text-[#B87333]" />;
      case "Service":
        return <Shield className="h-4 w-4 text-[#B87333]" />;
      case "Crisis Support":
        return <Phone className="h-4 w-4 text-[#B87333]" />;
      case "Assessment":
      case "Toolkit":
        return <CheckSquare className="h-4 w-4 text-[#B87333]" />;
      default:
        return <Bookmark className="h-4 w-4 text-[#B87333]" />;
    }
  };

  return (
    <Card className={`
      bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] 
      border ${featured ? 'border-[#B87333]/30' : 'border-white/10'} 
      text-white transition-all duration-300 
      hover:shadow-lg hover:translate-y-[-5px]
      ${featured ? 'shadow-[0_0_10px_rgba(184,115,51,0.2)]' : ''}
    `}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium py-1 px-2 rounded-full">
            {category}
          </div>
          <div className="bg-[#1c2e4a] text-white text-xs py-1 px-2 rounded-full flex items-center">
            {getIcon()}
            <span className="ml-1">{type}</span>
          </div>
        </div>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-gray-300 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <Button 
          variant={featured ? "gold" : "bronze"} 
          className="w-full"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Access Resource
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MilitaryResources;
