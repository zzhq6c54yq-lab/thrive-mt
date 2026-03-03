
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Calendar, MapPin, ArrowRight, Clock, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TransportCommunity: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState<number | null>(null);

  const handleCommunityAction = (path: string, title: string) => {
    toast({
      title: "Navigating",
      description: `Opening ${title}...`,
      duration: 1500,
    });
    navigate(path, {
      state: {
        stayInPortal: true,
        preventTutorial: true,
        portalPath: "/transport-portal",
        fromPortal: true
      }
    });
  };

  // Sample community support groups
  const supportGroups = [
    {
      title: "Long-Haul Drivers Support",
      members: 248,
      description: "A community for long-distance drivers to share experiences and support",
      meetingTime: "Thursdays @ 8:00 PM EST",
      path: "/transport-community/long-haul"
    },
    {
      title: "Transportation Mental Health",
      members: 176,
      description: "Discussions about mental wellness in transportation roles",
      meetingTime: "Mondays @ 7:30 PM EST",
      path: "/transport-community/mental-health"
    },
    {
      title: "Family Connection on the Road",
      members: 132,
      description: "Strategies for maintaining family relationships while traveling",
      meetingTime: "Sundays @ 3:00 PM EST",
      path: "/transport-community/family"
    },
    {
      title: "Stress Management for Drivers",
      members: 204,
      description: "Techniques for managing stress in high-pressure transportation roles",
      meetingTime: "Tuesdays @ 9:00 PM EST",
      path: "/transport-community/stress"
    }
  ];

  // Sample in-person meetups
  const inPersonMeetups = [
    {
      title: "Northeast Driver Wellness Meetup",
      location: "Truck Stop #42, Plainfield, NJ",
      date: "May 20, 2025",
      time: "6:00 PM - 8:00 PM EST",
      attendees: 18,
      path: "/transport-community/meetup-northeast"
    },
    {
      title: "Midwest Mental Health Check-In",
      location: "Flying J Travel Center, Morris, IL",
      date: "May 22, 2025",
      time: "5:30 PM - 7:30 PM CST",
      attendees: 12,
      path: "/transport-community/meetup-midwest"
    },
    {
      title: "West Coast Drivers Support Circle",
      location: "Love's Travel Stop, Sacramento, CA",
      date: "May 25, 2025",
      time: "4:00 PM - 6:00 PM PST",
      attendees: 15,
      path: "/transport-community/meetup-west"
    }
  ];

  // Sample forum discussions
  const forumDiscussions = [
    {
      id: 1,
      title: "How do you deal with sleep schedule disruptions?",
      author: "RoadRunner45",
      authorAvatar: "RR",
      replies: 28,
      lastActive: "2 hours ago",
      path: "/transport-community/forum/sleep"
    },
    {
      id: 2,
      title: "Tips for staying connected with kids while on the road",
      author: "FamilyMan",
      authorAvatar: "FM",
      replies: 42,
      lastActive: "5 hours ago",
      path: "/transport-community/forum/family"
    },
    {
      id: 3,
      title: "Best apps for finding healthy food options?",
      author: "HealthyHauler",
      authorAvatar: "HH",
      replies: 36,
      lastActive: "1 day ago",
      path: "/transport-community/forum/food"
    },
    {
      id: 4,
      title: "How to deal with difficult dispatchers?",
      author: "PatientOne",
      authorAvatar: "PO",
      replies: 53,
      lastActive: "3 hours ago", 
      path: "/transport-community/forum/work"
    },
    {
      id: 5,
      title: "Exercises you can do in your cab during breaks",
      author: "FitTrucker",
      authorAvatar: "FT",
      replies: 31,
      lastActive: "12 hours ago",
      path: "/transport-community/forum/exercise"
    }
  ];

  // Sample chat messages for conversations
  const chatConversations = [
    {
      id: 1,
      name: "Driver Support",
      members: 12,
      avatar: "DS",
      messages: [
        { sender: "Moderator", message: "Welcome to today's support session! How's everyone doing on the road?", time: "10:23 AM" },
        { sender: "RoadRunner45", message: "Just finished a long haul. Feeling pretty tired but good.", time: "10:25 AM" },
        { sender: "NightDriver", message: "Having trouble with my sleep schedule this week. Any tips?", time: "10:26 AM" },
        { sender: "Moderator", message: "Great question about sleep. Anyone want to share what works for them?", time: "10:28 AM" }
      ]
    },
    {
      id: 2,
      name: "Wellness Chat",
      members: 8,
      avatar: "WC",
      messages: [
        { sender: "HealthCoach", message: "Today's topic: Healthy eating at truck stops. What are your go-to options?", time: "9:05 AM" },
        { sender: "HealthyHauler", message: "I always look for places with salad bars or fresh fruit options.", time: "9:08 AM" },
        { sender: "NewDriver", message: "I'm struggling to find good options at night. Any suggestions?", time: "9:10 AM" },
        { sender: "HealthCoach", message: "Great question! Let's discuss night options for healthy eating.", time: "9:12 AM" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Transport Industry Community</h2>
        <p className="text-white/70">
          Connect with fellow transportation workers who understand your unique challenges
        </p>
      </div>
      
      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Support Groups</span>
          </TabsTrigger>
          <TabsTrigger value="meetups" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>In-Person Meetups</span>
          </TabsTrigger>
          <TabsTrigger value="forum" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Forum Discussions</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Live Chat</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Support Groups */}
        <TabsContent value="groups">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportGroups.map((group, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      {group.title}
                    </CardTitle>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      {group.members} members
                    </span>
                  </div>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Weekly meetings: {group.meetingTime}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => handleCommunityAction(group.path, group.title)}
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleCommunityAction(`${group.path}/join`, "Join Group")}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Join Group
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* In-Person Meetups */}
        <TabsContent value="meetups">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inPersonMeetups.map((meetup, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    {meetup.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{meetup.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{meetup.date}, {meetup.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{meetup.attendees} attending</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => handleCommunityAction(meetup.path, meetup.title)}
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleCommunityAction(`${meetup.path}/rsvp`, "RSVP")}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    RSVP
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Forum Discussions */}
        <TabsContent value="forum">
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {forumDiscussions.map((discussion) => (
                <div 
                  key={discussion.id} 
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleCommunityAction(discussion.path, discussion.title)}
                >
                  <div className="flex items-start">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src="" alt={discussion.author} />
                      <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {discussion.authorAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-white hover:text-blue-600 dark:hover:text-blue-400">
                        {discussion.title}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-white/60">
                        <div className="flex items-center">
                          <User className="h-3.5 w-3.5 mr-1" />
                          <span>{discussion.author}</span>
                        </div>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <MessageCircle className="h-3.5 w-3.5 mr-1" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <span className="mx-2">•</span>
                        <span>Active {discussion.lastActive}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleCommunityAction("/transport-community/forum", "Forum")}
              >
                View All Discussions
              </Button>
              <Button
                onClick={() => handleCommunityAction("/transport-community/forum/new", "New Discussion")}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Start New Discussion
              </Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Live Chat */}
        <TabsContent value="chat">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
            <div className="col-span-1 border rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b">
                <h3 className="font-medium">Active Conversations</h3>
              </div>
              <div className="overflow-y-auto h-[calc(500px-56px)]">
                {chatConversations.map((convo) => (
                  <div 
                    key={convo.id}
                    className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors flex items-center ${
                      activeConversation === convo.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                    onClick={() => setActiveConversation(convo.id)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="" alt={convo.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {convo.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{convo.name}</h4>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{convo.members} online</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 border rounded-lg overflow-hidden flex flex-col">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b">
                <h3 className="font-medium">
                  {activeConversation ? 
                    chatConversations.find(c => c.id === activeConversation)?.name : 
                    "Select a conversation"
                  }
                </h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-900">
                {activeConversation ? (
                  <div className="space-y-4">
                    {chatConversations
                      .find(c => c.id === activeConversation)
                      ?.messages.map((msg, i) => (
                        <div key={i} className="flex flex-col">
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-sm">{msg.sender}</span>
                            <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 inline-block max-w-[80%]">
                            {msg.message}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <p>Select a conversation to start chatting</p>
                  </div>
                )}
              </div>
              <div className="p-3 border-t">
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 rounded-l-md border border-r-0 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    disabled={!activeConversation}
                  />
                  <Button 
                    className="rounded-l-none bg-blue-500 hover:bg-blue-600"
                    disabled={!activeConversation}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">Community Guidelines</h3>
        <p className="text-white/70 text-sm mb-4">
          Our community is a safe space for transportation workers to share experiences and support each other. 
          We ask all members to be respectful, maintain privacy, and focus on constructive conversations.
        </p>
        <Button 
          variant="outline"
          onClick={() => handleCommunityAction("/transport-community/guidelines", "Community Guidelines")}
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          View Full Guidelines
        </Button>
      </div>
    </div>
  );
};

export default TransportCommunity;
