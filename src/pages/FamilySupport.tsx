import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Heart, Users, BookOpen, Calendar, MessageSquare, 
  PhoneCall, Video, HandHeart, Share2, ChevronRight, Star,
  GraduationCap, FileText, Clock, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const resourceCategories = [
  {
    id: "partners",
    name: "Partners & Spouses",
    description: "Resources for those supporting a partner or spouse with mental health challenges",
    color: "from-pink-500 to-rose-600"
  },
  {
    id: "parents",
    name: "Parents & Caregivers",
    description: "Support for parents of children experiencing mental health issues",
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "children",
    name: "Children of Parents",
    description: "Help for those with a parent or guardian facing mental health challenges",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "siblings",
    name: "Siblings & Relatives",
    description: "Resources for siblings and extended family members",
    color: "from-purple-500 to-violet-600"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Family Support Group",
    date: "Apr 10, 2025",
    time: "7:00 PM - 8:30 PM",
    location: "Virtual (Zoom)",
    description: "A supportive space for family members to share experiences and learn coping strategies",
    type: "group"
  },
  {
    id: 2,
    title: "Parenting Workshop",
    date: "Apr 15, 2025",
    time: "12:00 PM - 1:30 PM",
    location: "Community Center",
    description: "Learn effective communication techniques for supporting children with anxiety",
    type: "workshop"
  },
  {
    id: 3,
    title: "Partner Support Webinar",
    date: "Apr 22, 2025",
    time: "6:00 PM - 7:00 PM",
    location: "Virtual (Zoom)",
    description: "Understanding depression and how to support your partner through their journey",
    type: "webinar"
  }
];

const featuredResources = [
  {
    id: 1,
    title: "Supporting a Loved One with Anxiety",
    type: "guide",
    format: "PDF",
    icon: <FileText className="h-6 w-6 text-blue-400" />,
    popular: true
  },
  {
    id: 2,
    title: "Communication Strategies for Families",
    type: "video",
    format: "Video",
    icon: <Video className="h-6 w-6 text-red-400" />,
    popular: true
  },
  {
    id: 3,
    title: "Self-Care for Caregivers",
    type: "article",
    format: "Article",
    icon: <Heart className="h-6 w-6 text-pink-400" />,
    popular: false
  },
  {
    id: 4,
    title: "Family Therapy: What to Expect",
    type: "video",
    format: "Video",
    icon: <Video className="h-6 w-6 text-red-400" />,
    popular: false
  },
  {
    id: 5,
    title: "Setting Boundaries While Supporting Others",
    type: "guide",
    format: "PDF",
    icon: <FileText className="h-6 w-6 text-blue-400" />,
    popular: true
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    relationship: "Spouse",
    content: "The resources here have been invaluable for understanding how to support my husband through his depression while taking care of myself too.",
    avatar: "S"
  },
  {
    id: 2,
    name: "David L.",
    relationship: "Parent",
    content: "The parent support group changed everything for us. Finally connecting with others who understand what we're going through with our teenager.",
    avatar: "D"
  },
  {
    id: 3,
    name: "Michelle K.",
    relationship: "Adult Child",
    content: "Growing up with a mother with bipolar disorder was challenging. These resources helped me understand her condition and improve our relationship.",
    avatar: "M"
  }
];

const FamilySupport: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("resources");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleGoBack = () => {
    if (location.state?.fromMainMenu) {
      navigate('/app/dashboard', { state: { preventTutorial: true } });
    } else if (location.state?.returnToPortal) {
      navigate(location.state.returnToPortal, { 
        state: { 
          preventTutorial: true 
        } 
      });
    } else {
      navigate('/app/dashboard', { state: { preventTutorial: true } });
    }
  };

  const handleResourceClick = (resourceId: number) => {
    toast({
      title: "Opening Resource",
      description: "Loading your selected resource...",
      duration: 1500,
    });
    navigate('/app/resource-library', { 
      state: { 
        highlightResource: resourceId,
        preventTutorial: true,
        fromFamilySupport: true
      } 
    });
  };

  const handleRegisterEvent = (eventId: number) => {
    toast({
      title: "Registration Successful",
      description: "You've been registered for this event. A confirmation has been sent to your email.",
      duration: 2500,
    });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    toast({
      title: "Category Updated",
      description: `Showing resources for: ${category}`,
      duration: 1500,
    });
  };

  const handleConnectWithProfessional = () => {
    navigate('/app/real-time-therapy', { 
      state: { 
        fromFamilySupport: true,
        preventTutorial: true
      } 
    });
  };

  const handleViewAllEvents = () => {
    navigate('/app/workshops', { 
      state: { 
        eventCategory: 'family',
        preventTutorial: true
      } 
    });
  };

  const handleSubmitStory = () => {
    toast({
      title: "Story Submission",
      description: "Thank you for your interest. You'll be redirected to our story submission form shortly.",
      duration: 2000,
    });
    setTimeout(() => {
      navigate('/app/community-support', { 
        state: { 
          openSubmission: true,
          preventTutorial: true
        } 
      });
    }, 2000);
  };

  const handleJoinCommunity = (platform: string) => {
    toast({
      title: `Joining ${platform} Community`,
      description: "You'll be redirected to our community platform shortly.",
      duration: 2000,
    });
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white pb-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-gradient-to-r from-[#1a1a1f] to-[#272730] py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoBack}
              className="rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <HandHeart className="inline mr-2 h-6 w-6 text-pink-400" /> 
                Family Resources
              </h1>
              <p className="text-gray-300 text-sm md:text-base">
                Support for families and loved ones on the mental health journey
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-white/5 backdrop-blur-sm">
            <TabsTrigger value="resources" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Resources
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Support Groups
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Events
            </TabsTrigger>
            <TabsTrigger value="connect" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Connect
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="focus:outline-none">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-4">Browse by Family Role</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {resourceCategories.map((category) => (
                    <Card 
                      key={category.id}
                      className={`bg-white/10 backdrop-blur-sm border-0 shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${activeCategory === category.id ? 'ring-2 ring-pink-500' : ''}`}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      <div 
                        className={`h-2 bg-gradient-to-r ${category.color}`}
                      ></div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-1">{category.name}</h3>
                        <p className="text-xs text-gray-300">{category.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Featured Resources</h2>
                  <Button 
                    variant="link" 
                    className="text-pink-400"
                    onClick={() => navigate('/app/resource-library', { 
                      state: { 
                        category: 'family',
                        preventTutorial: true 
                      } 
                    })}
                  >
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {featuredResources.map((resource) => (
                    <Card 
                      key={resource.id}
                      className="bg-white/10 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:bg-white/15 transition-colors"
                      onClick={() => handleResourceClick(resource.id)}
                    >
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="p-3 rounded-lg bg-white/10">
                          {resource.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {resource.popular && (
                              <Badge className="bg-amber-600/70 text-white text-xs">Popular</Badge>
                            )}
                            <Badge variant="outline" className="text-white/70 text-xs border-white/20">
                              {resource.format}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-white">{resource.title}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Star className="h-5 w-5 text-amber-400 mr-2" />
                  Family Success Stories
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {testimonials.map((testimonial) => (
                    <Card 
                      key={testimonial.id}
                      className="bg-white/10 backdrop-blur-sm border-0 shadow-lg"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar>
                            <AvatarFallback className="bg-pink-500/20 text-pink-200">
                              {testimonial.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-white">{testimonial.name}</h4>
                            <p className="text-xs text-gray-400">{testimonial.relationship}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 italic">"{testimonial.content}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="support" className="focus:outline-none">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Users className="h-5 w-5 text-pink-400 mr-2" />
                    Support Groups
                  </h2>
                  
                  <p className="text-gray-300 mb-6">
                    Connect with others who understand what you're going through. Our support groups
                    provide a safe space to share experiences and learn from others on similar journeys.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-1">Partner & Spouse Group</h3>
                      <p className="text-sm text-gray-400 mb-3">Weekly meetings for partners of individuals with mental health challenges</p>
                      <div className="flex justify-between items-center text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-pink-400" />
                          <span>Wednesdays, 7PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="h-4 w-4 text-blue-400" />
                          <span>Virtual</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-1">Parents Support Circle</h3>
                      <p className="text-sm text-gray-400 mb-3">For parents of children with mental health issues</p>
                      <div className="flex justify-between items-center text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-pink-400" />
                          <span>Mondays, 6:30PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-green-400" />
                          <span>In-person & Virtual</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-1">Adult Children Group</h3>
                      <p className="text-sm text-gray-400 mb-3">For adult children of parents with mental health conditions</p>
                      <div className="flex justify-between items-center text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-pink-400" />
                          <span>Thursdays, 7:30PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-green-400" />
                          <span>In-person & Virtual</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-1">Siblings & Family Support</h3>
                      <p className="text-sm text-gray-400 mb-3">For siblings and extended family members</p>
                      <div className="flex justify-between items-center text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-pink-400" />
                          <span>Tuesdays, 6PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="h-4 w-4 text-blue-400" />
                          <span>Virtual</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button 
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                      onClick={() => navigate('/community-support', { 
                        state: { 
                          joinGroup: 'family',
                          preventTutorial: true 
                        } 
                      })}
                    >
                      Register for a Group
                    </Button>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <MessageSquare className="h-5 w-5 text-pink-400 mr-2" />
                    Online Communities
                  </h2>
                  
                  <p className="text-gray-300 mb-6">
                    Join our moderated online communities for 24/7 peer support. Connect with others who understand,
                    share resources, and find encouragement any time you need it.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      className="bg-[#4267B2] hover:bg-[#365899] flex items-center justify-center gap-2 h-12"
                      onClick={() => handleJoinCommunity('Facebook')}
                    >
                      <Users className="h-5 w-5" />
                      Join Facebook Group
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-2 h-12"
                      onClick={() => handleJoinCommunity('Discord')}
                    >
                      <MessageSquare className="h-5 w-5" />
                      Join Discord Community
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="events" className="focus:outline-none">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-pink-400" />
                      Upcoming Events
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Workshops, webinars, and groups for family members
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <Card 
                          key={event.id}
                          className="bg-white/5 border-white/10 relative overflow-hidden"
                        >
                          <div 
                            className="absolute top-0 left-0 w-1 h-full" 
                            style={{ 
                              background: event.type === 'workshop' 
                                ? 'linear-gradient(to bottom, #ec4899, #db2777)' 
                                : event.type === 'webinar' 
                                  ? 'linear-gradient(to bottom, #8b5cf6, #6d28d9)'
                                  : 'linear-gradient(to bottom, #10b981, #047857)'
                            }} 
                          />
                          
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-white mb-1">{event.title}</h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{event.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>{event.time}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                                <p className="text-gray-300 text-sm mt-2">{event.description}</p>
                              </div>
                              
                              <div className="flex gap-2">
                                <Badge 
                                  className={`uppercase text-white ${
                                    event.type === 'workshop' 
                                      ? 'bg-pink-600/70' 
                                      : event.type === 'webinar' 
                                        ? 'bg-purple-600/70'
                                        : 'bg-green-600/70'
                                  }`}
                                >
                                  {event.type}
                                </Badge>
                                
                                <Button 
                                  size="sm" 
                                  className="bg-pink-500 hover:bg-pink-600 text-white whitespace-nowrap"
                                  onClick={() => handleRegisterEvent(event.id)}
                                >
                                  Register
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-white/20 text-white hover:bg-white/10"
                      onClick={handleViewAllEvents}
                    >
                      View All Events
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 text-pink-400 mr-2" />
                    Educational Programs
                  </h2>
                  
                  <p className="text-gray-300 mb-6">
                    Our structured educational programs provide in-depth knowledge and practical skills for supporting
                    loved ones with mental health conditions.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-1">Family-to-Family</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        An 8-week course for family members of adults living with mental health conditions.
                      </p>
                      <Badge className="bg-amber-600/70 text-white">Starting April 20</Badge>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-1">Supporting Youth</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        A 6-week program for parents and caregivers of children and teenagers.
                      </p>
                      <Badge className="bg-amber-600/70 text-white">Starting May 5</Badge>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="font-medium text-white mb-1">Partner Support Intensive</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Weekend intensive workshop for partners and spouses.
                      </p>
                      <Badge className="bg-amber-600/70 text-white">June 10-12</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="connect" className="focus:outline-none">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <PhoneCall className="h-5 w-5 text-pink-400 mr-2" />
                    Talk to Someone
                  </h2>
                  
                  <p className="text-gray-300 mb-6">
                    Our trained family support specialists are here to help you navigate the challenges
                    of supporting a loved one with mental health conditions.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-4 text-center">
                        <PhoneCall className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                        <h3 className="font-medium text-white mb-1">Phone Support</h3>
                        <p className="text-sm text-gray-400 mb-3">Talk one-on-one with a specialist</p>
                        <Button 
                          className="bg-pink-500 hover:bg-pink-600 w-full"
                          onClick={() => navigate('/virtual-meetings', { 
                            state: { 
                              supportType: 'phone',
                              preventTutorial: true 
                            } 
                          })}
                        >
                          Request Call
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-4 text-center">
                        <Video className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                        <h3 className="font-medium text-white mb-1">Video Chat</h3>
                        <p className="text-sm text-gray-400 mb-3">Face-to-face virtual support</p>
                        <Button 
                          className="bg-pink-500 hover:bg-pink-600 w-full"
                          onClick={() => navigate('/virtual-meetings', { 
                            state: { 
                              supportType: 'video',
                              preventTutorial: true 
                            } 
                          })}
                        >
                          Schedule Session
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-4 text-center">
                        <MessageSquare className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                        <h3 className="font-medium text-white mb-1">Text Chat</h3>
                        <p className="text-sm text-gray-400 mb-3">Message with a support specialist</p>
                        <Button 
                          className="bg-pink-500 hover:bg-pink-600 w-full"
                          onClick={() => navigate('/virtual-meetings', { 
                            state: { 
                              supportType: 'chat',
                              preventTutorial: true 
                            } 
                          })}
                        >
                          Start Chat
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="bg-gradient-to-br from-pink-500/30 to-purple-500/30 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="md:w-2/3">
                      <h2 className="text-xl font-bold text-white mb-2">
                        Need Professional Support?
                      </h2>
                      <p className="text-gray-300 mb-4">
                        Connect with licensed therapists who specialize in family therapy and supporting
                        loved ones of those with mental health conditions.
                      </p>
                      <Button 
                        className="bg-white text-pink-600 hover:bg-gray-100" 
                        onClick={handleConnectWithProfessional}
                      >
                        Find a Therapist
                      </Button>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                      <Heart className="h-24 w-24 text-pink-300/50" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Share2 className="h-5 w-5 text-pink-400 mr-2" />
                    Share Your Story
                  </h2>
                  
                  <p className="text-gray-300 mb-4">
                    Your experience could help others on their journey. Consider sharing your story
                    to inspire and support other family members.
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={handleSubmitStory}
                  >
                    Submit Your Story
                  </Button>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FamilySupport;
