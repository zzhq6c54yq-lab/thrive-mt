
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeButton from "@/components/HomeButton";
import { 
  BookOpen, FileText, Users, Heart, Calendar, Video, 
  Sparkles, BookMarked, MessageCircle, Lightbulb, Book, 
  HeartHandshake, PenTool, Clock
} from "lucide-react";
import ActionButton from "@/components/navigation/ActionButton";

const GoldenYearsPortal: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("resources");
  const location = useLocation();

  const handleNavigate = (path: string) => {
    toast({
      title: "Navigating",
      description: `Taking you to ${path}`,
      duration: 1500,
    });
    navigate(path);
  };

  const resources = [
    {
      title: "Aging Well Guide",
      description: "Comprehensive strategies for maintaining physical and mental health as you age.",
      icon: <BookOpen className="h-6 w-6 text-amber-500" />,
      tag: "Featured",
      color: "bg-amber-100 text-amber-800",
      action: {
        type: "download" as const,
        id: "aging-well-guide",
        title: "Download Guide",
        path: "/resource-library"
      }
    },
    {
      title: "Sleep & Seniors",
      description: "Understanding sleep changes and improving your rest quality.",
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      tag: "Health",
      color: "bg-blue-100 text-blue-800",
      action: {
        type: "view" as const,
        id: "sleep-guide",
        title: "Read Article",
        path: "/mindfulness-sleep"
      }
    },
    {
      title: "Memory Exercises",
      description: "Daily activities to keep your mind sharp and memory strong.",
      icon: <Lightbulb className="h-6 w-6 text-purple-500" />,
      tag: "Cognitive",
      color: "bg-purple-100 text-purple-800",
      action: {
        type: "practice" as const,
        id: "memory-exercises",
        title: "Start Exercises",
        path: "/mental-health-games"
      }
    },
    {
      title: "Legacy Journal",
      description: "Prompts to help you record your life stories for future generations.",
      icon: <Book className="h-6 w-6 text-green-500" />,
      tag: "Legacy",
      color: "bg-green-100 text-green-800",
      action: {
        type: "join" as const,
        id: "legacy-journal",
        title: "Open Journal",
        path: "/golden-years-journal"
      }
    }
  ];

  const workshops = [
    {
      title: "Technology Made Simple",
      description: "Learn to use digital tools to stay connected with loved ones.",
      date: "Every Tuesday at 11:00 AM",
      image: "https://images.unsplash.com/photo-1565549299390-64d8072dc996?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["Tech", "Beginner"],
      action: {
        type: "workshop" as const,
        id: "tech-workshop",
        title: "Join Workshop",
        path: "/workshop/tech-seniors"
      }
    },
    {
      title: "Mindfulness for Seniors",
      description: "Meditation techniques specially adapted for older adults.",
      date: "Every Thursday at 9:30 AM",
      image: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["Wellness", "Meditation"],
      action: {
        type: "workshop" as const,
        id: "mindfulness-workshop",
        title: "Join Workshop",
        path: "/workshop/senior-mindfulness"
      }
    },
    {
      title: "Life Story Writing",
      description: "Learn techniques to write and share your life experiences.",
      date: "Every Wednesday at 2:00 PM",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["Creative", "Writing"],
      action: {
        type: "workshop" as const,
        id: "writing-workshop",
        title: "Join Workshop",
        path: "/workshop/life-story-writing"
      }
    }
  ];

  const familyActivities = [
    {
      title: "Legacy Video Messages",
      description: "Record video messages to share wisdom and stories with younger generations.",
      icon: <Video className="h-6 w-6 text-rose-500" />,
      action: {
        type: "record" as const,
        id: "legacy-video",
        title: "Record Message",
        path: "/video-diary/record"
      }
    },
    {
      title: "Family History Project",
      description: "Collaborative space to build your family tree and share memories with loved ones.",
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      action: {
        type: "join" as const,
        id: "family-history",
        title: "Enter Project",
        path: "/family-resources"
      }
    },
    {
      title: "Guided Journal Prompts",
      description: "Daily prompts to write about your life experiences and share with family.",
      icon: <PenTool className="h-6 w-6 text-amber-500" />,
      action: {
        type: "join" as const,
        id: "journal-prompts",
        title: "Start Writing",
        path: "/journaling"
      }
    }
  ];

  const supportGroups = [
    {
      title: "Retirement Transitions",
      description: "Connect with others navigating the transition to retirement.",
      members: 124,
      nextMeeting: "Monday, 3:00 PM",
      action: {
        type: "discussion" as const,
        id: "retirement-group",
        title: "Join Group",
        path: "/community-support"
      }
    },
    {
      title: "Caregivers Corner",
      description: "Support for seniors who are also caregivers to spouses or others.",
      members: 87,
      nextMeeting: "Wednesday, 1:00 PM",
      action: {
        type: "discussion" as const,
        id: "caregivers-group",
        title: "Join Group",
        path: "/community-support"
      }
    },
    {
      title: "Living with Loss",
      description: "Grief support specific to the experiences of seniors.",
      members: 56,
      nextMeeting: "Friday, 11:00 AM",
      action: {
        type: "discussion" as const,
        id: "grief-group",
        title: "Join Group",
        path: "/community-support"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF3C7] via-[#FEF9E7] to-[#FFFBEB] text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 p-6 relative">
        <div className="absolute top-4 right-4 z-10">
          <HomeButton />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-light text-white">The Golden Years</h1>
                <p className="text-white/90">Embrace wisdom, share stories, thrive together</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => handleNavigate("/holistic-wellness")}
                variant="outline"
                className="border-white/40 text-white bg-white/10 hover:bg-white/20"
              >
                Wellness Tools <Heart className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={() => handleNavigate("/community-support")}
                variant="outline"
                className="border-white/40 text-white bg-white/10 hover:bg-white/20"
              >
                Community <Users className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md mb-8 border border-amber-200">
          <div className="flex items-center gap-4 mb-3">
            <Calendar className="h-12 w-12 text-amber-500" />
            <div>
              <h2 className="text-2xl font-medium text-amber-700">Welcome to Your Golden Years Journey</h2>
              <p className="text-gray-600">Today is a perfect day to embrace life's wisdom and connect with others.</p>
            </div>
          </div>
          <p className="text-gray-700 italic border-l-4 border-amber-300 pl-4 mt-2">
            "The longer I live, the more beautiful life becomes." — Frank Lloyd Wright
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="resources" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-white/50 border border-amber-200">
            <TabsTrigger value="resources" className="data-[state=active]:bg-amber-100">
              <BookMarked className="h-4 w-4 mr-2" /> Resources
            </TabsTrigger>
            <TabsTrigger value="workshops" className="data-[state=active]:bg-amber-100">
              <Calendar className="h-4 w-4 mr-2" /> Workshops
            </TabsTrigger>
            <TabsTrigger value="family" className="data-[state=active]:bg-amber-100">
              <HeartHandshake className="h-4 w-4 mr-2" /> Family Connection
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-amber-100">
              <MessageCircle className="h-4 w-4 mr-2" /> Support Groups
            </TabsTrigger>
          </TabsList>

          {/* Resources Tab */}
          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      {resource.icon}
                      <span className={`text-xs px-2 py-1 rounded-full ${resource.color}`}>{resource.tag}</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <ActionButton {...resource.action} variant="amber-outline" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Workshops Tab */}
          <TabsContent value="workshops" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workshops.map((workshop, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={workshop.image} 
                      alt={workshop.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{workshop.title}</h3>
                    <p className="text-amber-600 text-sm mb-2">{workshop.date}</p>
                    <p className="text-gray-600 text-sm mb-3">{workshop.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {workshop.tags.map((tag, i) => (
                          <span key={i} className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ActionButton {...workshop.action} variant="amber" size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Family Connection Tab */}
          <TabsContent value="family" className="mt-6">
            <div className="bg-amber-50 rounded-xl p-6 mb-6 border border-amber-200">
              <h2 className="text-xl text-amber-800 font-medium mb-2">Connect with Your Family</h2>
              <p className="text-gray-700 mb-4">
                Share your stories, wisdom, and experiences with loved ones. These activities help bridge generations and create lasting memories for your family.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {familyActivities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow p-5"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-amber-100">
                        {activity.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">{activity.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 text-center">{activity.description}</p>
                    <div className="flex justify-center">
                      <ActionButton {...activity.action} variant="amber" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <PenTool className="h-6 w-6 text-amber-500" />
                <h3 className="text-lg font-medium">Today's Journal Prompt</h3>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 mb-4 border border-amber-200">
                <p className="text-gray-800 italic">
                  "What is one piece of wisdom you wish you could share with your younger self? How has this insight shaped your life?"
                </p>
              </div>
              <Button 
                onClick={() => handleNavigate("/journaling")}
                className="bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white"
              >
                Open Journal <PenTool className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Support Groups Tab */}
          <TabsContent value="support" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {supportGroups.map((group, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-medium text-gray-800 mb-1">{group.title}</h3>
                      <p className="text-gray-600 mb-2">{group.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" /> <span>{group.members} members</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" /> <span>Next: {group.nextMeeting}</span>
                      </div>
                    </div>
                    <ActionButton {...group.action} variant="amber" className="min-w-[120px]" />
                  </div>
                </div>
              ))}

              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mt-4">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-6 w-6 text-amber-500" />
                  <h3 className="text-lg font-medium">Need immediate support?</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Our team is available to help you navigate challenges or simply provide a listening ear when you need it.
                </p>
                <Button 
                  onClick={() => handleNavigate("/crisis-support")}
                  variant="outline"
                  className="border-amber-400 text-amber-700 hover:bg-amber-100"
                >
                  Contact Support <MessageCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GoldenYearsPortal;
