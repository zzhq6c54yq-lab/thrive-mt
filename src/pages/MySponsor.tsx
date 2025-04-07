
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const { toast } = useToast();
  const [zipCode, setZipCode] = useState("");
  const [searchMade, setSearchMade] = useState(false);
  const [currentStep, setCurrentStep] = useState(3);
  const [completedSteps, setCompletedSteps] = useState([1, 2]);

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
    <Page title="My Sponsor" showBackButton={true} onBackClick={() => navigate("/")}>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 rounded-xl p-6 text-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Recovery Journey Partner</h1>
              <p className="text-purple-100">
                24/7 support, guidance, and resources designed to help you maintain sobriety and find strength in community.
              </p>
              <div className="mt-6 flex space-x-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-purple-900 hover:bg-purple-100"
                  onClick={() => navigate("#sponsor-chat")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Talk to Sponsor
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-transparent text-white border-white hover:bg-white/10"
                  onClick={handleJoinVirtualMeeting}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Join Meeting
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-full bg-white/10 p-6 backdrop-blur-sm w-fit mx-auto">
                <Users className="h-24 w-24 text-white/80" />
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="find-meetings" className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="find-meetings">Find Meetings</TabsTrigger>
            <TabsTrigger value="virtual-meetings">Virtual Meetings</TabsTrigger>
            <TabsTrigger value="sponsor-chat">Sponsor Chat</TabsTrigger>
            <TabsTrigger value="twelve-steps">12 Steps</TabsTrigger>
            <TabsTrigger value="worksheets">Worksheets</TabsTrigger>
            <TabsTrigger value="journal">Recovery Journal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="find-meetings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-purple-600" />
                  Find Local NA/AA Meetings
                </CardTitle>
                <CardDescription>
                  Search for meetings in your area or use official NA/AA websites for comprehensive results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Quick Local Search</h3>
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Enter ZIP Code" 
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          maxLength={5}
                          className="flex-grow"
                        />
                        <Button onClick={handleMeetingSearch}>
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium mb-2">Official Websites</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={handleOpenNAWebsite} className="flex-grow">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          NA.org Meetings
                        </Button>
                        <Button variant="outline" onClick={handleOpenAAWebsite} className="flex-grow">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          AA.org Meetings
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {searchMade && (
                    <div className="mt-6">
                      <h3 className="text-md font-medium mb-3">Meetings Near {zipCode}</h3>
                      <div className="space-y-3">
                        {mockMeetings.map((meeting, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium flex items-center">
                                  {meeting.name}
                                  <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                    {meeting.type}
                                  </span>
                                </h4>
                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                  {meeting.time}
                                </div>
                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                                  {meeting.address}
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">{meeting.distance}</div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-100 text-right">
                              <Button variant="link" className="text-xs h-auto p-0">
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
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="mr-2 h-5 w-5 text-purple-600" />
                  Additional Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <Phone className="h-5 w-5 text-purple-600 mb-2" />
                    <h3 className="text-sm font-medium">24/7 Helplines</h3>
                    <p className="text-xs text-gray-600 mt-1">Access to national and local support lines for immediate assistance</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <Globe className="h-5 w-5 text-purple-600 mb-2" />
                    <h3 className="text-sm font-medium">Online Communities</h3>
                    <p className="text-xs text-gray-600 mt-1">Forums and groups for peer support during recovery</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <Heart className="h-5 w-5 text-purple-600 mb-2" />
                    <h3 className="text-sm font-medium">Family Support</h3>
                    <p className="text-xs text-gray-600 mt-1">Resources for loved ones affected by addiction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="virtual-meetings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-purple-600" />
                  Virtual Support Meetings
                </CardTitle>
                <CardDescription>
                  Join live virtual meetings from anywhere for support and community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-5 bg-gradient-to-br from-purple-50 to-blue-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-lg">Join Virtual Meetings</h3>
                          <p className="text-sm text-gray-600">
                            Attend live meetings led by licensed counselors or join peer-to-peer sessions
                          </p>
                        </div>
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <ul className="space-y-3 mb-4">
                        <li className="flex items-center text-sm">
                          <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                          Anonymous participation options
                        </li>
                        <li className="flex items-center text-sm">
                          <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                          Available 24/7, multiple time slots
                        </li>
                        <li className="flex items-center text-sm">
                          <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                          Professional facilitation available
                        </li>
                      </ul>
                      <Button onClick={handleJoinVirtualMeeting} className="w-full">
                        View All Virtual Meetings
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-5">
                      <h3 className="font-medium mb-3 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-purple-600" />
                        Upcoming Featured Sessions
                      </h3>
                      <div className="space-y-3">
                        <div className="border-l-4 border-purple-400 pl-3 py-1">
                          <p className="font-medium">New Beginnings (NA)</p>
                          <p className="text-sm text-gray-600">Today, 7:00 PM EDT</p>
                          <p className="text-xs text-gray-500">43 participants registered</p>
                        </div>
                        <div className="border-l-4 border-blue-400 pl-3 py-1">
                          <p className="font-medium">Daily Reflection (AA)</p>
                          <p className="text-sm text-gray-600">Today, 8:30 PM EDT</p>
                          <p className="text-xs text-gray-500">28 participants registered</p>
                        </div>
                        <div className="border-l-4 border-green-400 pl-3 py-1">
                          <p className="font-medium">Mindful Recovery</p>
                          <p className="text-sm text-gray-600">Tomorrow, 6:00 PM EDT</p>
                          <p className="text-xs text-gray-500">36 participants registered</p>
                        </div>
                      </div>
                      <div className="mt-4 text-right">
                        <Button variant="outline" size="sm" onClick={handleJoinVirtualMeeting}>
                          See All Sessions
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="border-dashed bg-gray-50">
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-3">Host a Meeting</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Trained to facilitate a meeting? You can host a peer support group with Henry as moderator.
                      </p>
                      <Button variant="outline">
                        <User className="mr-2 h-4 w-4" />
                        Apply to Become a Host
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Member Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg italic">
                      <p className="text-gray-700">"{testimonial.text}"</p>
                      <p className="text-sm text-gray-500 mt-2">— {testimonial.author}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sponsor-chat">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="h-[600px]">
                  <SponsorChatbot />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="twelve-steps" className="space-y-6">
            <Card className="border-2 border-purple-100">
              <CardHeader className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white">
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  12 Steps Journey
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Track your progress through the 12 steps of recovery
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <StepProgressTracker 
                  currentStep={currentStep}
                  completedSteps={completedSteps}
                  onNextStep={handleNextStep}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>The 12 Traditions</CardTitle>
                <CardDescription>
                  The guiding principles that help groups and members maintain sobriety and carry the message
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-300 pl-4 py-2">
                    <p className="font-medium">1. Unity</p>
                    <p className="text-sm text-gray-600">Our common welfare should come first; personal recovery depends upon unity.</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-300 pl-4 py-2">
                    <p className="font-medium">2. Group Conscience</p>
                    <p className="text-sm text-gray-600">For our group purpose there is but one ultimate authority—a loving Higher Power as expressed in our group conscience.</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-300 pl-4 py-2">
                    <p className="font-medium">3. Membership</p>
                    <p className="text-sm text-gray-600">The only requirement for membership is a desire to stop using.</p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    View All 12 Traditions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="worksheets">
            <StepWorksheets />
          </TabsContent>
          
          <TabsContent value="journal">
            <RecoveryJournal />
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default MySponsor;
