
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Heart, Users, BookOpen, Calendar, MessageSquare, 
  PhoneCall, Video, HandHeart, Share2, ChevronRight, Star,
  GraduationCap, FileText, Clock, MapPin, Search, Filter, 
  ThumbsUp, Sparkles, RefreshCw, Link, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
}

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string[];
  format: "article" | "video" | "podcast" | "guide" | "contact";
  link: string;
  isFeatured: boolean;
}

interface SupportGroup {
  id: number;
  name: string;
  focus: string;
  meetingTimes: string;
  location: string;
  contactInfo: string;
  hasVirtual: boolean;
}

const FamilyResources: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("resources");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedResourceId, setExpandedResourceId] = useState<number | null>(null);

  // Sample data for resources
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "Supporting a Loved One in Recovery",
      description: "Comprehensive guide for family members on how to provide effective emotional support for someone in addiction recovery.",
      category: ["support", "recovery", "emotional-health"],
      format: "guide",
      link: "#",
      isFeatured: true
    },
    {
      id: 2,
      title: "Understanding Addiction as a Disease",
      description: "Educational video explaining the brain science behind addiction and why it's considered a chronic disease rather than a moral failing.",
      category: ["education", "addiction", "medical"],
      format: "video",
      link: "#",
      isFeatured: false
    },
    {
      id: 3,
      title: "Setting Healthy Boundaries",
      description: "Practical advice for establishing and maintaining boundaries with family members struggling with addiction.",
      category: ["boundaries", "self-care", "relationships"],
      format: "article",
      link: "#",
      isFeatured: true
    },
    {
      id: 4,
      title: "Family Recovery Podcast",
      description: "Weekly podcast featuring stories from families who have navigated addiction recovery together.",
      category: ["stories", "recovery", "inspiration"],
      format: "podcast",
      link: "#",
      isFeatured: false
    },
    {
      id: 5,
      title: "Family Therapy Services",
      description: "Directory of therapists specializing in addiction and family dynamics.",
      category: ["therapy", "professional-help", "counseling"],
      format: "contact",
      link: "#",
      isFeatured: false
    },
    {
      id: 6,
      title: "Children of Alcoholics Support Resources",
      description: "Specialized resources for adult and minor children affected by parental alcohol addiction.",
      category: ["children", "support", "trauma"],
      format: "guide",
      link: "#",
      isFeatured: true
    }
  ]);

  // Sample data for upcoming events
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Family Recovery Workshop",
      date: "July 15, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Community Center, 123 Main St",
      description: "Interactive workshop for families to learn coping strategies and communication techniques.",
      type: "workshop"
    },
    {
      id: 2,
      title: "Parents Supporting Parents",
      date: "July 18, 2023",
      time: "7:00 PM - 8:30 PM",
      location: "Virtual (Zoom)",
      description: "Support group specifically for parents of individuals in recovery.",
      type: "support-group"
    },
    {
      id: 3,
      title: "Understanding Addiction Seminar",
      date: "July 22, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Recovery Center, 456 Healing Way",
      description: "Educational seminar about the science of addiction and recovery.",
      type: "seminar"
    }
  ]);

  // Sample data for support groups
  const [supportGroups, setSupportGroups] = useState<SupportGroup[]>([
    {
      id: 1,
      name: "Families Anonymous",
      focus: "Support for families affected by addiction",
      meetingTimes: "Tuesdays, 7:00 PM",
      location: "Community Center, Room 3",
      contactInfo: "familes.anon@example.com | 555-123-4567",
      hasVirtual: true
    },
    {
      id: 2,
      name: "Parents of Addicted Loved Ones (PAL)",
      focus: "Education and support for parents",
      meetingTimes: "Mondays, 6:30 PM",
      location: "First Methodist Church, Basement",
      contactInfo: "pal.group@example.com | 555-234-5678",
      hasVirtual: true
    },
    {
      id: 3,
      name: "Siblings Support Circle",
      focus: "Support specifically for siblings of addicted individuals",
      meetingTimes: "Wednesdays, 5:00 PM",
      location: "Recovery Center, Conference Room",
      contactInfo: "siblings.support@example.com | 555-345-6789",
      hasVirtual: false
    },
    {
      id: 4,
      name: "Children Affected by Addiction",
      focus: "Age-appropriate support for children 8-12",
      meetingTimes: "Saturdays, 10:00 AM",
      location: "Children's Center, Activity Room",
      contactInfo: "child.support@example.com | 555-456-7890",
      hasVirtual: false
    }
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGoBack = () => {
    if (location.state && location.state.fromMainMenu) {
      navigate('/home');
    } else {
      navigate(-1);
    }
  };

  const handleResourceClick = (resourceId: number) => {
    if (expandedResourceId === resourceId) {
      setExpandedResourceId(null);
    } else {
      setExpandedResourceId(resourceId);
    }
  };

  const handleOpenResource = (resource: Resource) => {
    toast({
      title: `Opening ${resource.title}`,
      description: `Loading ${resource.format} resource...`,
      duration: 2000
    });
  };

  const handleJoinEvent = (event: Event) => {
    toast({
      title: "Event Registration",
      description: `You've been registered for ${event.title}`,
      duration: 2000
    });
  };

  const handleContactGroup = (group: SupportGroup) => {
    toast({
      title: "Contact Information",
      description: `Information for ${group.name} has been sent to your email`,
      duration: 2000
    });
  };

  // Filter resources based on search term and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = 
      categoryFilter === "all" || 
      resource.category.includes(categoryFilter);
      
    const matchesFormat = 
      formatFilter === "all" || 
      resource.format === formatFilter;
      
    return matchesSearch && matchesCategory && matchesFormat;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white flex items-center justify-center">
        <div className="text-center">
          <HandHeart className="h-12 w-12 text-[#9b87f5] animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">Loading family resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white pb-12">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#9b87f5]/20 to-transparent rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#D946EF]/20 to-transparent rounded-full blur-3xl"
        ></motion.div>
      </div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-[#1a1a1f] to-[#272730] py-6 px-4 shadow-md"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleGoBack}
                className="rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </Button>
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                  <Heart className="mr-2 h-6 w-6 text-[#9b87f5]" /> 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D946EF]">
                    Family Support Resources
                  </span>
                </h1>
                <p className="text-gray-300 text-sm md:text-base">
                  Resources and support for families affected by addiction
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => toast({
                title: "Refresh Content",
                description: "Latest resources and events loaded",
                duration: 2000
              })}
              className="bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-glow"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Featured Section */}
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#9b87f5]/30 to-[#D946EF]/30 p-6 rounded-xl border border-white/10"
            >
              <div className="md:flex items-center justify-between gap-8">
                <div className="mb-6 md:mb-0 md:w-2/3">
                  <Badge className="bg-[#9b87f5] mb-2">Featured Resource</Badge>
                  <h2 className="text-2xl font-bold mb-2">Family Support in Recovery Journey</h2>
                  <p className="text-gray-300 mb-4">
                    Family involvement and support can significantly improve recovery outcomes. Find resources to help you
                    understand addiction, set healthy boundaries, and provide effective support.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-white/20 text-white">
                      <Heart className="mr-1 h-3 w-3" /> Support
                    </Badge>
                    <Badge variant="outline" className="border-white/20 text-white">
                      <BookOpen className="mr-1 h-3 w-3" /> Education
                    </Badge>
                    <Badge variant="outline" className="border-white/20 text-white">
                      <Users className="mr-1 h-3 w-3" /> Community
                    </Badge>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white">
                      Start Here Guide
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Find Support Groups
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-video bg-black/30 rounded-lg overflow-hidden relative"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                      <span className="absolute bottom-4 left-4 text-sm font-medium">Watch Introduction</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 bg-white/5 backdrop-blur-sm rounded-xl">
              <TabsTrigger 
                value="resources" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9b87f5] data-[state=active]:to-[#8D65C5] data-[state=active]:text-white rounded-lg"
              >
                Resources
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9b87f5] data-[state=active]:to-[#8D65C5] data-[state=active]:text-white rounded-lg"
              >
                Events
              </TabsTrigger>
              <TabsTrigger 
                value="support" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9b87f5] data-[state=active]:to-[#8D65C5] data-[state=active]:text-white rounded-lg"
              >
                Support Groups
              </TabsTrigger>
            </TabsList>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="focus:outline-none">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Search and Filter */}
                <motion.div 
                  variants={itemVariants}
                  className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                >
                  <div className="relative flex-grow w-full lg:w-auto">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      type="text"
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-gray-400 w-full"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full sm:w-[180px] bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="recovery">Recovery</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="boundaries">Boundaries</SelectItem>
                        <SelectItem value="self-care">Self-Care</SelectItem>
                        <SelectItem value="children">Children</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={formatFilter} onValueChange={setFormatFilter}>
                      <SelectTrigger className="w-full sm:w-[180px] bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Formats</SelectItem>
                        <SelectItem value="article">Articles</SelectItem>
                        <SelectItem value="video">Videos</SelectItem>
                        <SelectItem value="podcast">Podcasts</SelectItem>
                        <SelectItem value="guide">Guides</SelectItem>
                        <SelectItem value="contact">Contacts</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
                      onClick={() => {
                        setSearchTerm("");
                        setCategoryFilter("all");
                        setFormatFilter("all");
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </motion.div>
                
                {/* Resources List */}
                {filteredResources.length > 0 ? (
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredResources.map((resource) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="group"
                      >
                        <Card 
                          className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-glow transition-all duration-300 h-full cursor-pointer"
                          onClick={() => handleResourceClick(resource.id)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                {resource.isFeatured && (
                                  <Badge className="bg-gradient-to-r from-[#9b87f5] to-[#D946EF] text-white mb-2">
                                    Featured
                                  </Badge>
                                )}
                                <CardTitle className="text-lg group-hover:text-[#9b87f5] transition-colors">
                                  {resource.title}
                                </CardTitle>
                              </div>
                              <div className="p-1 bg-white/5 rounded-full">
                                {resource.format === 'article' && <FileText className="h-5 w-5 text-blue-400" />}
                                {resource.format === 'video' && <Video className="h-5 w-5 text-red-400" />}
                                {resource.format === 'podcast' && <Headphones className="h-5 w-5 text-purple-400" />}
                                {resource.format === 'guide' && <BookOpen className="h-5 w-5 text-green-400" />}
                                {resource.format === 'contact' && <PhoneCall className="h-5 w-5 text-yellow-400" />}
                              </div>
                            </div>
                            <CardDescription className="text-gray-300">
                              {resource.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex flex-wrap gap-1 mt-2">
                              {resource.category.map((cat) => (
                                <Badge 
                                  key={cat} 
                                  variant="outline" 
                                  className="border-white/10 text-xs text-gray-300"
                                >
                                  {cat}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center">
                            <Button 
                              variant="ghost" 
                              className="text-[#9b87f5] p-0 hover:text-[#8a76e4] hover:bg-transparent"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResourceClick(resource.id);
                              }}
                            >
                              View Details
                              <ChevronRight className={`ml-1 h-4 w-4 transition-transform duration-300 ${expandedResourceId === resource.id ? 'rotate-90' : ''}`} />
                            </Button>
                            
                            <Button 
                              variant="link" 
                              className="text-[#D946EF] p-0 hover:text-[#C935DE]"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenResource(resource);
                              }}
                            >
                              <ExternalLink className="mr-1 h-4 w-4" />
                              Open
                            </Button>
                          </CardFooter>
                          
                          <AnimatePresence>
                            {expandedResourceId === resource.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="px-6 pb-4">
                                  <div className="border-t border-white/10 pt-4 mt-2">
                                    <h4 className="font-medium text-sm text-[#9b87f5] mb-2">Additional Information</h4>
                                    <p className="text-sm text-gray-300 mb-4">
                                      This {resource.format} provides in-depth information specifically designed for family members
                                      supporting loved ones through recovery. The content is reviewed by professional counselors
                                      specializing in addiction treatment.
                                    </p>
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-1 text-sm text-gray-400">
                                        <ThumbsUp className="h-3 w-3" />
                                        <span>94% found this helpful</span>
                                      </div>
                                      <Button 
                                        size="sm" 
                                        className="bg-[#9b87f5] hover:bg-[#8a76e4]"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenResource(resource);
                                        }}
                                      >
                                        Access Now
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    variants={itemVariants}
                    className="text-center py-10"
                  >
                    <div className="mx-auto bg-white/5 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">No resources found</h3>
                    <p className="text-gray-400 mt-1">Try adjusting your search or filters</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-white/20 text-white hover:bg-white/10"
                      onClick={() => {
                        setSearchTerm("");
                        setCategoryFilter("all");
                        setFormatFilter("all");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events" className="focus:outline-none">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-xl font-semibold flex items-center gap-2"
                >
                  <Calendar className="h-5 w-5 text-[#9b87f5]" />
                  Upcoming Events
                </motion.h2>
                
                <motion.div variants={itemVariants}>
                  <Card className="bg-white/10 backdrop-blur-sm border-white/10 mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-[#D946EF]" />
                        Find Events Near You
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        In-person and virtual events designed for family members and supporters
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Event Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="workshop">Workshops</SelectItem>
                          <SelectItem value="support">Support Groups</SelectItem>
                          <SelectItem value="seminar">Seminars</SelectItem>
                          <SelectItem value="social">Social Events</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="in-person">In-Person</SelectItem>
                          <SelectItem value="virtual">Virtual</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button className="bg-[#9b87f5] hover:bg-[#8a76e4] text-white">
                        <Search className="mr-2 h-4 w-4" />
                        Find Events
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <div className="space-y-4">
                  {events.map((event) => (
                    <motion.div
                      key={event.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="group"
                    >
                      <Card className="bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/15 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div className="flex gap-4">
                              <div className="p-3 rounded-lg bg-white/10 h-fit">
                                {event.type === "workshop" && <HandHeart className="h-6 w-6 text-[#9b87f5]" />}
                                {event.type === "support-group" && <Users className="h-6 w-6 text-[#D946EF]" />}
                                {event.type === "seminar" && <GraduationCap className="h-6 w-6 text-blue-400" />}
                              </div>
                              
                              <div>
                                <h3 className="font-semibold text-lg text-white group-hover:text-[#9b87f5] transition-colors">
                                  {event.title}
                                </h3>
                                <p className="text-gray-300 mt-1">{event.description}</p>
                                
                                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                                  <div className="flex items-center gap-1 text-gray-300">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    {event.date}
                                  </div>
                                  <div className="flex items-center gap-1 text-gray-300">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    {event.time}
                                  </div>
                                  <div className="flex items-center gap-1 text-gray-300">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    {event.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 items-start md:items-end">
                              <Badge variant="outline" className="border-white/20 capitalize">
                                {event.type.replace("-", " ")}
                              </Badge>
                              <Button 
                                className="mt-2 bg-[#9b87f5] hover:bg-[#8a76e4] text-white w-full md:w-auto"
                                onClick={() => handleJoinEvent(event)}
                              >
                                Register
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div variants={itemVariants} className="flex justify-center mt-6">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Calendar className="mr-2 h-4 w-4" />
                    View All Events
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            {/* Support Groups Tab */}
            <TabsContent value="support" className="focus:outline-none">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-xl font-semibold flex items-center gap-2"
                >
                  <Users className="h-5 w-5 text-[#9b87f5]" />
                  Family Support Groups
                </motion.h2>
                
                <motion.div variants={itemVariants}>
                  <Card className="bg-gradient-to-r from-[#9b87f5]/20 to-[#D946EF]/20 backdrop-blur-sm border-white/10 mb-6">
                    <CardHeader>
                      <CardTitle>Why Join a Support Group?</CardTitle>
                      <CardDescription className="text-gray-300">
                        Support groups offer understanding, perspective, and community for those affected by a loved one's addiction
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white/10 rounded-lg">
                        <HandHeart className="h-6 w-6 text-[#9b87f5] mb-2" />
                        <h3 className="font-medium text-white mb-1">Shared Understanding</h3>
                        <p className="text-sm text-gray-300">Connect with others who truly understand what you're experiencing</p>
                      </div>
                      
                      <div className="p-4 bg-white/10 rounded-lg">
                        <BookOpen className="h-6 w-6 text-[#D946EF] mb-2" />
                        <h3 className="font-medium text-white mb-1">Practical Advice</h3>
                        <p className="text-sm text-gray-300">Learn strategies and approaches from those who have been there</p>
                      </div>
                      
                      <div className="p-4 bg-white/10 rounded-lg">
                        <Heart className="h-6 w-6 text-pink-400 mb-2" />
                        <h3 className="font-medium text-white mb-1">Emotional Support</h3>
                        <p className="text-sm text-gray-300">Find a safe space to share feelings and receive compassionate support</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {supportGroups.map((group) => (
                    <motion.div
                      key={group.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="group"
                    >
                      <Card className="bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/15 transition-all duration-300 h-full">
                        <CardHeader>
                          <div className="flex justify-between">
                            <CardTitle className="group-hover:text-[#9b87f5] transition-colors">
                              {group.name}
                            </CardTitle>
                            {group.hasVirtual && (
                              <Badge className="bg-[#9b87f5]">Virtual Available</Badge>
                            )}
                          </div>
                          <CardDescription className="text-gray-300">{group.focus}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center gap-2 text-white">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{group.meetingTimes}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{group.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <MessageSquare className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{group.contactInfo}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full bg-[#9b87f5] hover:bg-[#8a76e4] text-white"
                            onClick={() => handleContactGroup(group)}
                          >
                            Contact Group
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-[#9b87f5]/20">
                      <Share2 className="h-5 w-5 text-[#9b87f5]" />
                    </div>
                    <h3 className="text-lg font-medium">Start Your Own Support Group</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    Don't see a group that fits your needs? We can help you start a new support group for families
                    in your community or create an online group focused on specific needs.
                  </p>
                  
                  <Button className="bg-white/20 hover:bg-white/30 text-white">
                    Learn About Starting a Group
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default FamilyResources;
