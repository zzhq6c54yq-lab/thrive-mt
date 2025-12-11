import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, Search, ArrowLeft, Filter, FileText, 
  Video, Users, ChevronRight, Bookmark, 
  Clock, Star, Heart, Download, Play, CheckCircle2,
  PlusCircle, ArrowUpDown, SlidersHorizontal, Sparkles
} from "lucide-react";
import HomeButton from "@/components/HomeButton";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "guide" | "toolkit" | "worksheet";
  category: string[];
  timeToRead: string;
  author: string;
  authorTitle?: string;
  datePublished: string;
  readCount: number;
  isFeatured: boolean;
  isBookmarked: boolean;
  image: string;
  tags: string[];
}

const ResourceLibrary: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data from API
    setTimeout(() => {
      setResources(sampleResources);
      setFilteredResources(sampleResources);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Filter resources when tab, search, or category changes
  useEffect(() => {
    let results = [...resources];
    
    // Apply tab filter
    if (activeTab !== "all") {
      results = results.filter(resource => resource.type === activeTab);
    }
    
    // Apply search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      results = results.filter(
        resource => 
          resource.title.toLowerCase().includes(lowerCaseQuery) ||
          resource.description.toLowerCase().includes(lowerCaseQuery) ||
          resource.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(
        resource => resource.category.includes(selectedCategory)
      );
    }
    
    setFilteredResources(results);
  }, [activeTab, searchQuery, selectedCategory, resources]);
  
  const handleBookmark = (resourceId: string) => {
    setResources(prevResources => 
      prevResources.map(resource => 
        resource.id === resourceId 
          ? { ...resource, isBookmarked: !resource.isBookmarked }
          : resource
      )
    );
    
    const resource = resources.find(r => r.id === resourceId);
    if (resource) {
      toast({
        title: resource.isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
        description: resource.isBookmarked 
          ? `${resource.title} has been removed from your saved resources.`
          : `${resource.title} has been saved to your bookmarks.`,
        duration: 3000,
      });
    }
  };
  
  const handleResourceClick = (resource: Resource) => {
    // Here you would navigate to the resource detail page
    toast({
      title: `Opening ${resource.title}`,
      description: `Loading ${resource.type}...`,
      duration: 2000,
    });
  };
  
  const categories = [
    "Stress Management", 
    "Anxiety", 
    "Depression",
    "Sleep",
    "Mindfulness",
    "Relationships",
    "Workplace",
    "Therapy Resources",
    "Wellness Habits"
  ];
  
  // Sample resources data
  const sampleResources: Resource[] = [
    {
      id: "1",
      title: "Understanding Anxiety",
      description: "Learn about the causes, symptoms, and treatments for anxiety disorders.",
      type: "article",
      category: ["Anxiety", "Mental Health"],
      timeToRead: "7 min",
      author: "Dr. Emily Carter",
      authorTitle: "Psychologist",
      datePublished: "2024-01-15",
      readCount: 1245,
      isFeatured: true,
      isBookmarked: false,
      image: "https://source.unsplash.com/400x300/?mentalhealth",
      tags: ["anxiety", "mental health", "stress"]
    },
    {
      id: "2",
      title: "Guided Meditation for Beginners",
      description: "A simple guided meditation to help you relax and reduce stress.",
      type: "video",
      category: ["Mindfulness", "Meditation"],
      timeToRead: "15 min",
      author: "Sarah Johnson",
      authorTitle: "Mindfulness Coach",
      datePublished: "2024-02-01",
      readCount: 890,
      isFeatured: true,
      isBookmarked: true,
      image: "https://source.unsplash.com/400x300/?meditation",
      tags: ["meditation", "mindfulness", "relaxation"]
    },
    {
      id: "3",
      title: "Stress Management Toolkit",
      description: "A collection of tools and techniques to help you manage stress in your daily life.",
      type: "toolkit",
      category: ["Stress Management", "Self-Care"],
      timeToRead: "30 min",
      author: "Michael Davis",
      authorTitle: "Wellness Expert",
      datePublished: "2023-12-20",
      readCount: 678,
      isFeatured: false,
      isBookmarked: false,
      image: "https://source.unsplash.com/400x300/?stress",
      tags: ["stress management", "self-care", "wellness"]
    },
    {
      id: "4",
      title: "Overcoming Depression",
      description: "Strategies and resources for overcoming depression and improving your mood.",
      type: "article",
      category: ["Depression", "Mental Health"],
      timeToRead: "10 min",
      author: "Dr. Jessica Lee",
      authorTitle: "Psychiatrist",
      datePublished: "2024-03-01",
      readCount: 987,
      isFeatured: false,
      isBookmarked: true,
      image: "https://source.unsplash.com/400x300/?depression",
      tags: ["depression", "mental health", "mood"]
    },
    {
      id: "5",
      title: "Improving Sleep Quality",
      description: "Tips and techniques for improving your sleep quality and getting a good night's rest.",
      type: "guide",
      category: ["Sleep", "Wellness Habits"],
      timeToRead: "20 min",
      author: "David Wilson",
      authorTitle: "Sleep Specialist",
      datePublished: "2024-02-15",
      readCount: 567,
      isFeatured: false,
      isBookmarked: false,
      image: "https://source.unsplash.com/400x300/?sleep",
      tags: ["sleep", "wellness", "insomnia"]
    },
    {
      id: "6",
      title: "Building Healthy Relationships",
      description: "Advice and strategies for building and maintaining healthy relationships.",
      type: "article",
      category: ["Relationships", "Social Skills"],
      timeToRead: "8 min",
      author: "Laura Green",
      authorTitle: "Relationship Counselor",
      datePublished: "2024-01-25",
      readCount: 789,
      isFeatured: false,
      isBookmarked: true,
      image: "https://source.unsplash.com/400x300/?relationships",
      tags: ["relationships", "social skills", "communication"]
    },
    {
      id: "7",
      title: "Mindfulness Exercises for the Workplace",
      description: "Quick and easy mindfulness exercises to help you stay focused and productive at work.",
      type: "video",
      category: ["Workplace", "Mindfulness"],
      timeToRead: "12 min",
      author: "Emily White",
      authorTitle: "Corporate Wellness Coach",
      datePublished: "2023-11-10",
      readCount: 456,
      isFeatured: false,
      isBookmarked: false,
      image: "https://source.unsplash.com/400x300/?workplace",
      tags: ["workplace", "mindfulness", "productivity"]
    },
    {
      id: "8",
      title: "Self-Care Worksheet",
      description: "A worksheet to help you identify and prioritize your self-care needs.",
      type: "worksheet",
      category: ["Self-Care", "Wellness Habits"],
      timeToRead: "25 min",
      author: "Jessica Brown",
      authorTitle: "Wellness Coach",
      datePublished: "2023-10-01",
      readCount: 345,
      isFeatured: false,
      isBookmarked: true,
      image: "https://source.unsplash.com/400x300/?selfcare",
      tags: ["self-care", "wellness", "stress management"]
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcfdfe] to-[#f5f5fa]">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100/30 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-100/30 to-transparent blur-3xl"></div>
        <motion.div 
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-tr from-amber-100/20 to-transparent blur-3xl"
          animate={{ 
            y: [0, -30, 0], 
            opacity: [0.5, 0.7, 0.5] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </div>
      
      {/* Header section */}
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-12 px-4 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj48Y2lyY2xlIGN4PSIzIiBjeT0iMyIgcj0iMSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-30"></div>
          <motion.div 
            className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#6366f1]/20 to-transparent blur-3xl"
            animate={{ 
              rotate: [0, 180],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div 
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#8b5cf6]/20 to-transparent blur-3xl"
            animate={{ 
              rotate: [0, -180],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          />
        </motion.div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="link" 
              className="text-white hover:text-[#6366f1] transition-colors p-0 flex items-center"
              onClick={() => navigate("/app/home")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <HomeButton />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-[#6366f1]" />
                Resource Library
              </h1>
              <p className="text-gray-300 max-w-xl">
                Discover curated articles, videos, and tools to support your mental health journey.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Search and filter */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10 bg-gray-50 border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                  <Badge className="ml-1 bg-[#6366f1]">{selectedCategory ? "1" : "0"}</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Sort
                </Button>
              </div>
            </div>
            
            {/* Filter dropdown */}
            <AnimatePresence>
              {showFilterMenu && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant="outline"
                          size="sm"
                          className={`text-xs ${
                            selectedCategory === category 
                              ? "bg-[#6366f1] text-white hover:bg-[#6366f1]/90" 
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            setSelectedCategory(
                              selectedCategory === category ? null : category
                            );
                          }}
                        >
                          {category}
                          {selectedCategory === category && (
                            <CheckCircle2 className="h-3 w-3 ml-1" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 bg-white border border-gray-100 shadow-sm">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white"
              >
                All Resources
              </TabsTrigger>
              <TabsTrigger 
                value="article" 
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white"
              >
                Articles
              </TabsTrigger>
              <TabsTrigger 
                value="video" 
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger 
                value="guide" 
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white"
              >
                Guides
              </TabsTrigger>
              <TabsTrigger 
                value="toolkit" 
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white"
              >
                Toolkits
              </TabsTrigger>
              <TabsTrigger 
                value="worksheet" 
                className="data-[state=active]:bg-[#6366f1] data-[state=active]:text-white"
              >
                Worksheets
              </TabsTrigger>
            </TabsList>
            
            {/* Loading state */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-t-[#6366f1] border-r-[#6366f1]/30 border-b-[#6366f1]/60 border-l-[#6366f1]/10 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-500">Loading resources...</p>
                </div>
              </div>
            ) : (
              <TabsContent value="all" className="mt-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Featured content at top */}
                  <div className="mb-10">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                      Featured Resources
                    </h2>
                    
                    {/* Featured resources grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {filteredResources
                        .filter(resource => resource.isFeatured)
                        .slice(0, 3)
                        .map(resource => (
                          <Card key={resource.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <CardHeader className="p-0 overflow-hidden">
                              <img 
                                src={resource.image} 
                                alt={resource.title} 
                                className="w-full h-48 object-cover rounded-t-xl transform transition-transform duration-300 hover:scale-105" 
                              />
                            </CardHeader>
                            <CardContent className="p-4">
                              <CardTitle className="text-lg font-semibold mb-2">{resource.title}</CardTitle>
                              <CardDescription className="text-sm text-gray-500">{resource.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between p-4 border-t border-gray-200">
                              <div className="flex items-center gap-2 text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>{resource.timeToRead}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="rounded-full hover:bg-gray-100 transition-colors duration-200"
                                onClick={() => handleBookmark(resource.id)}
                              >
                                {resource.isBookmarked ? (
                                  <>
                                    <Bookmark className="h-4 w-4 mr-2 text-amber-500" />
                                    Bookmarked
                                  </>
                                ) : (
                                  <>
                                    <Bookmark className="h-4 w-4 mr-2" />
                                    Bookmark
                                  </>
                                )}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </div>
                  
                  {/* Regular resources */}
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Articles
                  </h2>
                </motion.div>
              </TabsContent>
            )}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
