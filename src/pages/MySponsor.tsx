import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Heart, Phone, MessageSquare, Video, Calendar, Clock, 
  Info, ArrowLeft, PenSquare, FileText, CheckSquare, ChevronDown,
  Upload, Download, AlertTriangle, Share2, Sparkles,
  Headphones, ArrowRight, Book, User, MapPin, Mail, Eye, EyeOff, Lock,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

interface SponsorshipStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  tips: string[];
}

interface JournalEntry {
  id: number;
  date: string;
  content: string;
  mood: "great" | "good" | "okay" | "challenging" | "difficult";
  isShared: boolean;
}

interface Meeting {
  id: number;
  title: string;
  type: "in-person" | "virtual" | "phone";
  date: string;
  time: string;
  address?: string;
  link?: string;
  notes?: string;
}

interface Resource {
  id: number;
  title: string;
  type: "pdf" | "video" | "audio" | "link";
  description: string;
  url: string;
  icon: React.ReactNode;
}

const MySponsor: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [newJournalEntry, setNewJournalEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [sponsorInfo, setSponsorInfo] = useState({
    name: "Michael R.",
    yearsOfSobriety: 12,
    phone: "555-123-4567",
    email: "michael.r@example.com",
    preferredContactMethod: "text",
    availableHours: "8:00 AM - 7:00 PM",
    sponseeCount: 3,
    nextMeeting: "Tomorrow at 6:00 PM"
  });
  
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      date: "July 12, 2023",
      content: "Had a really difficult day at work today. Was tempted to use but called my sponsor instead. Feeling proud of making the right choice.",
      mood: "challenging",
      isShared: true
    },
    {
      id: 2,
      date: "July 10, 2023",
      content: "Attended my first NA meeting in the new location. Everyone was welcoming and I feel like I've found a good group.",
      mood: "good",
      isShared: true
    },
    {
      id: 3,
      date: "July 7, 2023",
      content: "Made it to 30 days clean! This is a huge milestone for me. Grateful for my sponsor's support through this journey.",
      mood: "great",
      isShared: false
    }
  ]);
  
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([
    {
      id: 1,
      title: "Weekly Check-in",
      type: "virtual",
      date: "July 15, 2023",
      time: "6:00 PM - 7:00 PM",
      link: "https://zoom.us/j/123456789",
      notes: "Discuss progress on Step 4 and review journal entries from the week."
    },
    {
      id: 2,
      title: "Group NA Meeting",
      type: "in-person",
      date: "July 16, 2023",
      time: "7:30 PM - 9:00 PM",
      address: "Community Center, 123 Recovery St",
      notes: "Weekly group meeting. Michael will also be attending."
    },
    {
      id: 3,
      title: "Phone Check-in",
      type: "phone",
      date: "July 18, 2023",
      time: "12:30 PM - 1:00 PM",
      notes: "Quick midweek check-in call."
    }
  ]);
  
  const [sponsorshipSteps, setSponsorshipSteps] = useState<SponsorshipStep[]>([
    {
      id: 1,
      title: "Step 1: Powerlessness & Unmanageability",
      description: "We admitted we were powerless over our addiction—that our lives had become unmanageable.",
      status: "completed",
      tips: [
        "Reflect on the ways addiction has affected your life",
        "Identify patterns of unmanageable behavior",
        "Share honest reflections with your sponsor",
        "Accept support from the recovery community"
      ]
    },
    {
      id: 2,
      title: "Step 2: Hope & Belief",
      description: "We came to believe that a Power greater than ourselves could restore us to sanity.",
      status: "completed",
      tips: [
        "Define what a 'higher power' might mean to you personally",
        "Be open to spiritual concepts without requiring religious beliefs",
        "Look for examples of positive change in recovery communities",
        "Consider what 'restoration to sanity' would look like in your life"
      ]
    },
    {
      id: 3,
      title: "Step 3: Surrender & Decision",
      description: "We made a decision to turn our will and our lives over to the care of God as we understood Him.",
      status: "in-progress",
      tips: [
        "Practice daily surrender through meditation or reflection",
        "Start each day with an intention to follow your recovery path",
        "Discuss your concept of surrender with your sponsor",
        "Identify areas where you struggle to let go of control"
      ]
    },
    {
      id: 4,
      title: "Step 4: Moral Inventory",
      description: "We made a searching and fearless moral inventory of ourselves.",
      status: "upcoming",
      tips: [
        "Set aside regular time for self-reflection and writing",
        "Be honest about both positive and negative aspects of your character",
        "Focus on patterns rather than isolated incidents",
        "Use the worksheets provided by your sponsor"
      ]
    }
  ]);
  
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "The NA Basic Text (PDF)",
      type: "pdf",
      description: "The primary text for Narcotics Anonymous fellowship.",
      url: "#",
      icon: <FileText className="h-5 w-5 text-blue-500" />
    },
    {
      id: 2,
      title: "Step 3 Worksheet",
      type: "pdf",
      description: "Guided questions and exercises for working through Step 3.",
      url: "#",
      icon: <CheckSquare className="h-5 w-5 text-green-500" />
    },
    {
      id: 3,
      title: "Recovery Meditation Series",
      type: "audio",
      description: "Guided meditations focused on recovery principles.",
      url: "#",
      icon: <Download className="h-5 w-5 text-purple-500" />
    },
    {
      id: 4,
      title: "Understanding Triggers Video",
      type: "video",
      description: "Educational video about identifying and managing triggers.",
      url: "#",
      icon: <Video className="h-5 w-5 text-red-500" />
    }
  ]);
  
  const [showCallOptions, setShowCallOptions] = useState(false);
  
  const [lastContactTime, setLastContactTime] = useState("2 days ago");
  
  const handleSubmitJournal = () => {
    if (!newJournalEntry.trim() || !selectedMood) {
      toast({
        title: "Cannot Submit Entry",
        description: "Please write an entry and select a mood.",
        variant: "destructive"
      });
      return;
    }
    
    const newEntry: JournalEntry = {
      id: journalEntries.length + 1,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      content: newJournalEntry,
      mood: selectedMood as any,
      isShared: isSharing
    };
    
    setJournalEntries([newEntry, ...journalEntries]);
    setNewJournalEntry("");
    setSelectedMood(null);
    setIsSharing(false);
    
    toast({
      title: "Journal Entry Added",
      description: isSharing ? "Your sponsor will be able to view this entry." : "This entry is private and only visible to you.",
    });
  };
  
  const handleContactSponsor = (method: string) => {
    let message = "";
    switch(method) {
      case "call":
        message = "Initiating call to your sponsor...";
        break;
      case "text":
        message = "Opening text message to your sponsor...";
        break;
      case "email":
        message = "Opening email to your sponsor...";
        break;
      case "video":
        message = "Setting up video call with your sponsor...";
        break;
    }
    
    toast({
      title: "Contacting Sponsor",
      description: message
    });
    
    setShowCallOptions(false);
  };
  
  const toggleExpandStep = (stepId: number) => {
    if (expandedStep === stepId) {
      setExpandedStep(null);
    } else {
      setExpandedStep(stepId);
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch(mood) {
      case "great": return "😃";
      case "good": return "🙂";
      case "okay": return "😐";
      case "challenging": return "😕";
      case "difficult": return "😞";
      default: return "";
    }
  };
  
  const getMoodColor = (mood: string) => {
    switch(mood) {
      case "great": return "bg-green-100 text-green-800 border-green-200";
      case "good": return "bg-blue-100 text-blue-800 border-blue-200";
      case "okay": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "challenging": return "bg-orange-100 text-orange-800 border-orange-200";
      case "difficult": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "upcoming": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getMeetingTypeIcon = (type: string) => {
    switch(type) {
      case "virtual": return <Video className="h-5 w-5 text-purple-500" />;
      case "in-person": return <Users className="h-5 w-5 text-blue-500" />;
      case "phone": return <Phone className="h-5 w-5 text-green-500" />;
      default: return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#edf2f7]">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#9b87f5]/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#D946EF]/5 to-transparent blur-3xl"></div>
      </div>
      
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-8 px-4 relative overflow-hidden">
        <motion.div 
          className="absolute top-[-20%] right-[-10%] w-[40%] h-[70%] rounded-full bg-gradient-to-br from-[#9b87f5]/20 to-transparent blur-3xl"
          animate={{ 
            rotate: [0, 180],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        />
      
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="link" 
              className="text-white hover:text-[#9b87f5] p-0 flex items-center"
              onClick={() => navigate("/home")}
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
            className="md:flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Heart className="h-7 w-7 text-[#9b87f5]" />
                <h1 className="text-3xl font-bold">My N.A./A.A. Sponsor</h1>
              </div>
              <p className="text-gray-300 max-w-xl mb-4">
                Your direct connection to personalized support, guidance, and accountability in your recovery journey.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white flex items-center gap-2"
                  onClick={() => setShowCallOptions(!showCallOptions)}
                >
                  <Phone className="h-4 w-4" />
                  Contact My Sponsor
                  <ChevronDown className={`h-4 w-4 transition-transform ${showCallOptions ? "rotate-180" : ""}`} />
                </Button>
                
                <AnimatePresence>
                  {showCallOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => handleContactSponsor("call")}
                        >
                          <Phone className="h-4 w-4" /> Call Now
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => handleContactSponsor("text")}
                        >
                          <MessageSquare className="h-4 w-4" /> Send Text
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => handleContactSponsor("email")}
                        >
                          <Mail className="h-4 w-4" /> Send Email
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => handleContactSponsor("video")}
                        >
                          <Video className="h-4 w-4" /> Video Call
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 grid grid-cols-4 bg-white/80">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="journal" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              Recovery Journal
            </TabsTrigger>
            <TabsTrigger value="twelve-steps" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              12 Steps Progress
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              Resources & Tools
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="md:col-span-1"
                >
                  <Card className="bg-white h-full border-[#9b87f5]/30">
                    <CardHeader className="pb-2 bg-gradient-to-r from-[#9b87f5]/10 to-transparent">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <User className="h-5 w-5 text-[#9b87f5]" />
                        My Sponsor
                      </CardTitle>
                      <CardDescription>Your recovery support partner</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-4">
                        <div className="text-center mb-4">
                          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {sponsorInfo.name.split(' ')[0][0]}{sponsorInfo.name.split(' ')[1][0]}
                          </div>
                          <h3 className="text-xl font-semibold mt-2">{sponsorInfo.name}</h3>
                          <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-200">
                            {sponsorInfo.yearsOfSobriety} Years Sober
                          </Badge>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{sponsorInfo.phone}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{sponsorInfo.email}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Preferred Contact:</span>
                            <Badge variant="outline">Text Message</Badge>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Available Hours:</span>
                            <span className="font-medium">{sponsorInfo.availableHours}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600">Last Contact:</span>
                            <Badge variant="secondary">{lastContactTime}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <p className="text-sm text-purple-700 mb-2 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Next Meeting: {sponsorInfo.nextMeeting}
                      </p>
                      <Button variant="outline" className="w-full text-[#9b87f5] border-[#9b87f5]/30 hover:bg-[#9b87f5]/5">
                        Schedule Meeting
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="md:col-span-2"
                >
                  <Card className="bg-white h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#9b87f5]" />
                        Upcoming Meetings
                      </CardTitle>
                      <CardDescription>Scheduled sessions with your sponsor</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {upcomingMeetings.map((meeting) => (
                          <motion.div
                            key={meeting.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -2, transition: { duration: 0.2 } }}
                            className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-all"
                          >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-[#9b87f5]/10 rounded-full">
                                  {getMeetingTypeIcon(meeting.type)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold">{meeting.title}</h4>
                                    <Badge variant="outline" className="capitalize">
                                      {meeting.type}
                                    </Badge>
                                  </div>
                                  <div className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {meeting.date} • {meeting.time}
                                  </div>
                                  {meeting.address && (
                                    <div className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                                      <MapPin className="h-3.5 w-3.5" />
                                      {meeting.address}
                                    </div>
                                  )}
                                  {meeting.notes && (
                                    <div className="text-gray-600 text-sm mt-2">
                                      {meeting.notes}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 md:flex-col">
                                {meeting.type === "virtual" && meeting.link && (
                                  <Button size="sm" className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white">
                                    Join Meeting
                                  </Button>
                                )}
                                <Button size="sm" variant="outline">
                                  Reschedule
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8b77e5] hover:to-[#6E59A5]">
                        Schedule New Meeting
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="md:col-span-3"
                >
                  <Card className="bg-white border-[#9b87f5]/30">
                    <CardHeader className="pb-2 bg-gradient-to-r from-[#9b87f5]/10 to-transparent">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <CheckSquare className="h-5 w-5 text-[#9b87f5]" />
                        Current Step Work
                      </CardTitle>
                      <CardDescription>Your progress in the 12-step journey</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg text-blue-800">Step 3: Surrender & Decision</h3>
                            <p className="text-blue-600 max-w-2xl">
                              "We made a decision to turn our will and our lives over to the care of God as we understood Him."
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                            In Progress
                          </Badge>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">This Week's Focus:</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckSquare className="h-4 w-4 mt-0.5 text-green-600" />
                              Complete the Step 3 worksheet by Thursday
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckSquare className="h-4 w-4 mt-0.5 text-blue-600" />
                              Journal about your concept of surrender daily
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckSquare className="h-4 w-4 mt-0.5 text-blue-600" />
                              Practice the Step 3 prayer each morning and evening
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Next step review meeting: July 15, 2023</span>
                        </div>
                        <Button variant="link" className="text-[#9b87f5]" onClick={() => setActiveTab("twelve-steps")}>
                          View All Steps
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="journal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenSquare className="h-5 w-5 text-[#9b87f5]" />
                    Write New Journal Entry
                  </CardTitle>
                  <CardDescription>
                    Document your recovery journey, thoughts, and experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={newJournalEntry}
                    onChange={(e) => setNewJournalEntry(e.target.value)}
                    placeholder="How are you feeling today? What challenges or victories did you experience?"
                    className="min-h-[120px] focus-visible:ring-[#9b87f5]"
                  />
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">How are you feeling today?</h4>
                    <div className="flex flex-wrap gap-2">
                      {["great", "good", "okay", "challenging", "difficult"].map((mood) => (
                        <button
                          key={mood}
                          type="button"
                          onClick={() => setSelectedMood(mood)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${
                            selectedMood === mood
                              ? getMoodColor(mood)
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {getMoodEmoji(mood)} {mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <input
                      type="checkbox"
                      id="shareWithSponsor"
                      checked={isSharing}
                      onChange={() => setIsSharing(!isSharing)}
                      className="mr-2"
                    />
                    <label htmlFor="shareWithSponsor" className="text-sm text-gray-700">
                      Share this entry with my sponsor
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={handleSubmitJournal}
                    className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8b77e5] hover:to-[#6E59A5]"
                    disabled={!newJournalEntry.trim() || !selectedMood}
                  >
                    Save Journal Entry
                  </Button>
                </CardFooter>
              </Card>
              
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#9b87f5]" />
                  Your Journal Entries
                </h2>
                
                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <Card className="bg-white hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{entry.date}</CardTitle>
                            <Badge className={`${getMoodColor
