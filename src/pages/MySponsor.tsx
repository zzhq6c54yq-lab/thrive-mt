
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Page from "@/components/Page";
import SponsorChatbot from "@/components/SponsorChatbot";
import StepWorksheets from "@/components/sponsor/StepWorksheets";
import StepProgressTracker from "@/components/sponsor/StepProgressTracker";
import RecoveryJournal from "@/components/sponsor/RecoveryJournal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, Calendar, MessageSquare, ExternalLink, Users, 
  Map, Search, Phone, Globe, Clock, User, ThumbsUp, Heart, FileText, BookOpen
} from "lucide-react";

const MySponsor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [zipCode, setZipCode] = useState("");
  const [searchMade, setSearchMade] = useState(false);
  const [currentStep, setCurrentStep] = useState(3);
  const [completedSteps, setCompletedSteps] = useState([1, 2]);

  const handleBackClick = () => {
    navigate("/app/dashboard");
  };

  const handleMeetingSearch = () => {
    if (!zipCode || zipCode.length !== 5 || isNaN(Number(zipCode))) {
      toast({
        title: "Invalid Zip Code",
        description: "Please enter a valid 5-digit zip code",
        variant: "destructive"
      });
      return;
    }
    
    setSearchMade(true);
    toast({
      title: "Meetings Found",
      description: "We found meetings in your area"
    });
  };

  const handleOpenNAWebsite = () => {
    window.open("https://www.na.org/meetingsearch/", "_blank");
  };
  
  const handleOpenAAWebsite = () => {
    window.open("https://www.aa.org/find-aa", "_blank");
  };
  
  const handleJoinVirtualMeeting = () => {
    navigate("/virtual-meetings");
  };

  const handleNextStep = () => {
    if (currentStep < 12) {
      setCurrentStep(currentStep + 1);
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };
  
  const mockMeetings = [
    {
      name: "Serenity Group",
      type: "AA",
      time: "Today, 7:00 PM",
      address: "123 Hope St, Springfield",
      distance: "1.2 miles"
    },
    {
      name: "New Beginnings",
      type: "NA",
      time: "Tomorrow, 6:30 PM",
      address: "456 Recovery Ave, Springfield",
      distance: "2.5 miles"
    },
    {
      name: "One Day at a Time",
      type: "AA",
      time: "Today, 8:00 PM",
      address: "789 Wellness Blvd, Springfield",
      distance: "3.7 miles"
    }
  ];
  
  const testimonials = [
    {
      text: "Having a digital sponsor available 24/7 has been life-changing for me. The encouragement and guidance I receive here keeps me accountable.",
      author: "Michael S."
    },
    {
      text: "The meetings finder helped me connect with local support in my new city. I don't know what I would have done without it.",
      author: "Sarah T."
    },
    {
      text: "The virtual meetings are just as powerful as in-person ones. I feel connected to a community even from home.",
      author: "David R."
    }
  ];

  return (
    <Page title="My N.A./A.A. Sponsor" showBackButton={true} onBackClick={handleBackClick}>
      {/* Redesigned header with clearer visual separation */}
      <div className="space-y-6">
        <Card className="border-2 border-purple-700 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-900 to-indigo-800 p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Recovery Journey Partner</h1>
                <p className="text-purple-100 mb-4">
                  24/7 support, guidance, and resources designed to help you maintain sobriety and find strength in community.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="secondary" 
                    className="bg-white text-purple-900 hover:bg-purple-100"
                    onClick={() => document.getElementById('sponsor-chat-tab')?.click()}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Talk to Sponsor
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-purple-800/40 text-white border-white/30 hover:bg-white/10"
                    onClick={handleJoinVirtualMeeting}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Join Meeting
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="rounded-full bg-white/10 p-6 backdrop-blur-sm w-fit">
                  <Users className="h-24 w-24 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Redesigned tabs with better spacing and visual separation */}
        <Tabs defaultValue="find-meetings" className="w-full">
          <TabsList className="w-full bg-slate-800/50 p-1 rounded-xl mb-6">
            <TabsTrigger value="find-meetings" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">Find Meetings</TabsTrigger>
            <TabsTrigger value="virtual-meetings" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">Virtual Meetings</TabsTrigger>
            <TabsTrigger value="sponsor-chat" id="sponsor-chat-tab" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">Sponsor Chat</TabsTrigger>
            <TabsTrigger value="twelve-steps" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">12 Steps</TabsTrigger>
            <TabsTrigger value="worksheets" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">Worksheets</TabsTrigger>
            <TabsTrigger value="journal" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">Recovery Journal</TabsTrigger>
          </TabsList>
          
          {/* Find Meetings tab content with improved visual separation */}
          <TabsContent value="find-meetings" className="space-y-6">
            <Card className="border border-slate-700 bg-slate-800/30 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-b border-slate-700">
                <CardTitle className="flex items-center text-white">
                  <MapPin className="mr-2 h-5 w-5 text-purple-400" />
                  Find Local NA/AA Meetings
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Search for meetings in your area or use official NA/AA websites for comprehensive results
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                      <h3 className="text-sm font-medium mb-2 text-white">Quick Local Search</h3>
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Enter ZIP Code" 
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          maxLength={5}
                          className="flex-grow bg-slate-900 border-slate-700 text-white"
                        />
                        <Button onClick={handleMeetingSearch} className="bg-purple-700 hover:bg-purple-600">
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 space-y-2">
                      <h3 className="text-sm font-medium mb-2 text-white">Official Websites</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={handleOpenNAWebsite} className="flex-grow border-purple-600 text-purple-400 hover:bg-purple-900/30">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          NA.org Meetings
                        </Button>
                        <Button variant="outline" onClick={handleOpenAAWebsite} className="flex-grow border-purple-600 text-purple-400 hover:bg-purple-900/30">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          AA.org Meetings
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {searchMade && (
                    <div className="mt-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                      <h3 className="text-md font-medium mb-3 text-white">Meetings Near {zipCode}</h3>
                      <div className="space-y-3">
                        {mockMeetings.map((meeting, index) => (
                          <div key={index} className="bg-slate-900/80 p-4 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium flex items-center text-white">
                                  {meeting.name}
                                  <span className="ml-2 text-xs px-2 py-0.5 bg-blue-900/50 text-blue-300 rounded-full">
                                    {meeting.type}
                                  </span>
                                </h4>
                                <div className="text-sm text-slate-400 flex items-center mt-1">
                                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                  {meeting.time}
                                </div>
                                <div className="text-sm text-slate-400 flex items-center mt-1">
                                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                                  {meeting.address}
                                </div>
                              </div>
                              <div className="text-xs text-slate-500">{meeting.distance}</div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-slate-700 text-right">
                              <Button variant="link" className="text-xs h-auto p-0 text-purple-400 hover:text-purple-300">
                                Get Directions
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-700 bg-slate-800/30 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-b border-slate-700">
                <CardTitle className="flex items-center text-white">
                  <Map className="mr-2 h-5 w-5 text-purple-400" />
                  Additional Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="border border-slate-700 bg-slate-900/50 rounded-lg p-4 hover:bg-slate-800 transition-colors">
                    <Phone className="h-5 w-5 text-purple-400 mb-2" />
                    <h3 className="text-sm font-medium text-white">24/7 Helplines</h3>
                    <p className="text-xs text-slate-400 mt-1">Access to national and local support lines for immediate assistance</p>
                  </div>
                  
                  <div className="border border-slate-700 bg-slate-900/50 rounded-lg p-4 hover:bg-slate-800 transition-colors">
                    <Globe className="h-5 w-5 text-purple-400 mb-2" />
                    <h3 className="text-sm font-medium text-white">Online Communities</h3>
                    <p className="text-xs text-slate-400 mt-1">Forums and groups for peer support during recovery</p>
                  </div>
                  
                  <div className="border border-slate-700 bg-slate-900/50 rounded-lg p-4 hover:bg-slate-800 transition-colors">
                    <Heart className="h-5 w-5 text-purple-400 mb-2" />
                    <h3 className="text-sm font-medium text-white">Family Support</h3>
                    <p className="text-xs text-slate-400 mt-1">Resources for loved ones affected by addiction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Virtual Meetings tab with improved styling */}
          <TabsContent value="virtual-meetings" className="space-y-6">
            <Card className="border border-slate-700 bg-slate-800/30 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-b border-slate-700">
                <CardTitle className="flex items-center text-white">
                  <Users className="mr-2 h-5 w-5 text-purple-400" />
                  Virtual Support Meetings
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Join live virtual meetings from anywhere for support and community
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-purple-800/30 rounded-lg p-5 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-lg text-white">Join Virtual Meetings</h3>
                          <p className="text-sm text-slate-300">
                            Attend live meetings led by licensed counselors or join peer-to-peer sessions
                          </p>
                        </div>
                        <Users className="h-6 w-6 text-purple-400" />
                      </div>
                      <ul className="space-y-3 mb-4">
                        <li className="flex items-center text-sm text-slate-300">
                          <ThumbsUp className="h-4 w-4 text-green-400 mr-2" />
                          Anonymous participation options
                        </li>
                        <li className="flex items-center text-sm text-slate-300">
                          <ThumbsUp className="h-4 w-4 text-green-400 mr-2" />
                          Available 24/7, multiple time slots
                        </li>
                        <li className="flex items-center text-sm text-slate-300">
                          <ThumbsUp className="h-4 w-4 text-green-400 mr-2" />
                          Professional facilitation available
                        </li>
                      </ul>
                      <Button onClick={handleJoinVirtualMeeting} className="w-full bg-purple-700 hover:bg-purple-600">
                        View All Virtual Meetings
                      </Button>
                    </div>
                    
                    <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-5">
                      <h3 className="font-medium mb-3 flex items-center text-white">
                        <Clock className="h-4 w-4 mr-2 text-purple-400" />
                        Upcoming Featured Sessions
                      </h3>
                      <div className="space-y-3">
                        <div className="border-l-4 border-purple-500 pl-3 py-1">
                          <p className="font-medium text-white">New Beginnings (NA)</p>
                          <p className="text-sm text-slate-300">Today, 7:00 PM EDT</p>
                          <p className="text-xs text-slate-400">43 participants registered</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-3 py-1">
                          <p className="font-medium text-white">Daily Reflection (AA)</p>
                          <p className="text-sm text-slate-300">Today, 8:30 PM EDT</p>
                          <p className="text-xs text-slate-400">28 participants registered</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-3 py-1">
                          <p className="font-medium text-white">Mindful Recovery</p>
                          <p className="text-sm text-slate-300">Tomorrow, 6:00 PM EDT</p>
                          <p className="text-xs text-slate-400">36 participants registered</p>
                        </div>
                      </div>
                      <div className="mt-4 text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleJoinVirtualMeeting}
                          className="border-purple-500 text-purple-300 hover:bg-purple-900/30"
                        >
                          See All Sessions
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="border border-dashed border-slate-600 bg-slate-800/50">
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-3 text-white">Host a Meeting</h3>
                      <p className="text-sm text-slate-300 mb-4">
                        Trained to facilitate a meeting? You can host a peer support group with Henry as moderator.
                      </p>
                      <Button 
                        variant="outline"
                        className="border-purple-500 text-purple-300 hover:bg-purple-900/30"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Apply to Become a Host
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-700 bg-slate-800/30 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-b border-slate-700">
                <CardTitle className="text-white">Member Testimonials</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-slate-900/80 p-4 rounded-lg italic border border-slate-700">
                      <p className="text-slate-300">"{testimonial.text}"</p>
                      <p className="text-sm text-slate-400 mt-2">— {testimonial.author}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Sponsor Chat Tab - Containment improved */}
          <TabsContent value="sponsor-chat">
            <Card className="border border-slate-700 bg-slate-800/30 shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[600px]">
                  <SponsorChatbot />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Twelve Steps Tab with better visuals */}
          <TabsContent value="twelve-steps" className="space-y-6">
            <Card className="border-2 border-purple-700/50 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-900 to-indigo-800 border-b border-purple-700">
                <CardTitle className="flex items-center text-white">
                  <BookOpen className="mr-2 h-5 w-5" />
                  12 Steps Journey
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Track your progress through the 12 steps of recovery
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 bg-slate-800/30">
                <StepProgressTracker 
                  currentStep={currentStep}
                  completedSteps={completedSteps}
                  onNextStep={handleNextStep}
                />
              </CardContent>
            </Card>
            
            <Card className="border border-slate-700 bg-slate-800/30 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-b border-slate-700">
                <CardTitle className="text-white">The 12 Traditions</CardTitle>
                <CardDescription className="text-slate-300">
                  The guiding principles that help groups and members maintain sobriety and carry the message
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-600 pl-4 py-2 bg-slate-800/50 rounded-r-md">
                    <p className="font-medium text-white">1. Unity</p>
                    <p className="text-sm text-slate-300">Our common welfare should come first; personal recovery depends upon unity.</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-600 pl-4 py-2 bg-slate-800/50 rounded-r-md">
                    <p className="font-medium text-white">2. Group Conscience</p>
                    <p className="text-sm text-slate-300">For our group purpose there is but one ultimate authority—a loving Higher Power as expressed in our group conscience.</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-600 pl-4 py-2 bg-slate-800/50 rounded-r-md">
                    <p className="font-medium text-white">3. Membership</p>
                    <p className="text-sm text-slate-300">The only requirement for membership is a desire to stop using.</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-500 text-purple-300 hover:bg-purple-900/30"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View All 12 Traditions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Worksheets Tab */}
          <TabsContent value="worksheets">
            <Card className="border border-slate-700 bg-slate-800/30 shadow-md">
              <CardContent className="p-0">
                <StepWorksheets />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Journal Tab */}
          <TabsContent value="journal">
            <Card className="border border-slate-700 bg-slate-800/30 shadow-md">
              <CardContent className="p-0">
                <RecoveryJournal />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default MySponsor;
