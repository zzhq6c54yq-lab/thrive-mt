
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Calendar, Shield, AlertCircle, Heart } from "lucide-react";
import useFeatureActions from "@/hooks/useFeatureActions";

const LawEnforcementCommunity = () => {
  const { handleActionClick } = useFeatureActions();
  const [activeTab, setActiveTab] = useState<string>("discussions");
  
  const forumCategories = [
    {
      id: "stress-management",
      title: "Stress Management",
      description: "Discuss techniques and strategies for managing stress in law enforcement",
      icon: Shield,
      posts: 124,
      lastActivity: "2 hours ago"
    },
    {
      id: "critical-incidents",
      title: "Critical Incidents",
      description: "Support and discussion for managing critical incident stress",
      icon: AlertCircle,
      posts: 87,
      lastActivity: "1 day ago"
    },
    {
      id: "family-support",
      title: "Family Support",
      description: "Connect with other law enforcement families for support",
      icon: Heart,
      posts: 156,
      lastActivity: "5 hours ago"
    }
  ];
  
  const upcomingEvents = [
    {
      id: "peer-support-group",
      title: "Peer Support Group Meeting",
      date: "May 5, 2025",
      time: "7:00 PM EST",
      participants: 12,
      type: "Virtual"
    },
    {
      id: "stress-workshop",
      title: "Stress Management Workshop",
      date: "May 12, 2025",
      time: "2:00 PM EST",
      participants: 25,
      type: "Virtual"
    },
    {
      id: "family-connect",
      title: "Family Connection Event",
      date: "May 20, 2025",
      time: "6:30 PM EST",
      participants: 18,
      type: "Virtual"
    }
  ];
  
  const chatRooms = [
    {
      id: "general",
      title: "General Discussion",
      participants: 23,
      active: true,
      description: "Open discussion for law enforcement professionals"
    },
    {
      id: "peer-support",
      title: "Peer Support",
      participants: 15,
      active: true,
      description: "A safe space for officers to support each other"
    },
    {
      id: "new-officers",
      title: "New Officers Forum",
      participants: 8,
      active: true,
      description: "Support and advice for those new to law enforcement"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Law Enforcement Community</h2>
        <p className="text-blue-200/80 mb-6 max-w-3xl">
          Connect with fellow law enforcement professionals in a secure and confidential environment designed to provide peer support and resources.
        </p>
      </div>
      
      <Card className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-700/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-blue-900/30 mt-1">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Private & Confidential Community</h3>
              <p className="text-blue-200/70">
                This is a secure space exclusively for verified law enforcement professionals. 
                All discussions are confidential and protected. Your identity is verified but can 
                remain anonymous within the community if you choose.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="discussions" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[#141921] border-blue-900/30 p-1 w-full justify-start overflow-x-auto">
          <TabsTrigger value="discussions" className="data-[state=active]:bg-blue-900/50">
            <MessageSquare className="mr-2 h-4 w-4" />
            Discussion Forums
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-blue-900/50">
            <Calendar className="mr-2 h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-blue-900/50">
            <Users className="mr-2 h-4 w-4" />
            Live Chat Rooms
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {forumCategories.map((forum) => (
              <Card key={forum.id} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-blue-900/30">
                      <forum.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">{forum.title}</CardTitle>
                  </div>
                  <CardDescription className="text-blue-200/70">{forum.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between border-t border-blue-900/20 pt-4">
                  <div className="text-sm">
                    <span className="text-white">{forum.posts} posts</span>
                    <span className="text-blue-200/50 mx-2">•</span>
                    <span className="text-blue-200/70">Last activity {forum.lastActivity}</span>
                  </div>
                  <Button 
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                    onClick={() => handleActionClick({
                      type: 'discussion',
                      id: forum.id,
                      title: forum.title
                    })}
                  >
                    Join Discussion
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">{event.title}</CardTitle>
                  <CardDescription className="flex flex-col">
                    <span className="text-blue-400">{event.date} at {event.time}</span>
                    <span className="text-blue-200/70">{event.type} event • {event.participants} registered</span>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end border-t border-blue-900/20 pt-4">
                  <Button 
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                    onClick={() => handleActionClick({
                      type: 'join',
                      id: event.id,
                      title: event.title
                    })}
                  >
                    Register
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {chatRooms.map((room) => (
              <Card key={room.id} className="bg-[#141921] border-blue-900/30 hover:border-blue-700/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white">{room.title}</CardTitle>
                    <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                      {room.participants} online
                    </div>
                  </div>
                  <CardDescription className="text-blue-200/70">{room.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end border-t border-blue-900/20 pt-4">
                  <Button 
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                    onClick={() => handleActionClick({
                      type: 'other',
                      path: `/law-enforcement-chat/${room.id}`,
                      title: room.title
                    })}
                  >
                    Join Chat Room
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LawEnforcementCommunity;
