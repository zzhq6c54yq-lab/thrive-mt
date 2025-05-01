
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, CalendarDays, Send, Bell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ActionButton from "@/components/navigation/ActionButton";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EducatorsCommunity: React.FC = () => {
  const { toast } = useToast();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  
  const discussionGroups = [
    {
      id: "new-teachers",
      title: "New Teacher Support Circle",
      description: "A supportive community for teachers in their first five years of teaching to share challenges and strategies.",
      members: 124,
      activity: "Very Active",
      activeNow: 8,
    },
    {
      id: "work-life-balance",
      title: "Educator Work-Life Balance",
      description: "Discuss strategies for maintaining healthy boundaries between professional and personal life.",
      members: 213,
      activity: "Active",
      activeNow: 5,
    },
    {
      id: "admin-relations",
      title: "Navigating Administration Relations",
      description: "Support for educators dealing with challenging administrative situations while maintaining professionalism.",
      members: 87,
      activity: "Moderate",
      activeNow: 3,
    },
    {
      id: "self-care",
      title: "Educators' Self-Care Community",
      description: "Share and learn practical self-care routines that fit into a busy teaching schedule.",
      members: 176,
      activity: "Very Active",
      activeNow: 12,
    }
  ];
  
  const upcomingEvents = [
    {
      id: "stress-management",
      title: "Educator Stress Management Workshop",
      date: "May 15, 2025",
      time: "4:00 PM - 5:30 PM EST",
      type: "Virtual",
    },
    {
      id: "mindfulness",
      title: "Mindfulness for Classroom Management",
      date: "May 22, 2025",
      time: "5:00 PM - 6:00 PM EST",
      type: "Virtual",
    },
    {
      id: "support-group",
      title: "End-of-Year Teacher Support Group",
      date: "June 5, 2025",
      time: "7:00 PM - 8:30 PM EST",
      type: "Virtual",
    }
  ];
  
  // Sample chat messages for each discussion group
  const chatMessages = {
    "new-teachers": [
      { id: 1, sender: "Maria G.", message: "Has anyone found effective ways to handle classroom transitions? My students take forever to switch activities.", time: "2 hours ago", avatar: "MG" },
      { id: 2, sender: "David L.", message: "I use a timer and make it into a game. They love trying to beat their previous times!", time: "1 hour ago", avatar: "DL" },
      { id: 3, sender: "Sarah T.", message: "Visual schedules helped me a lot. I put pictures of each activity and we move a clothespin down the list as we go.", time: "45 minutes ago", avatar: "ST" },
      { id: 4, sender: "James K.", message: "I use different music for different transitions. The students know what to do when they hear each song.", time: "20 minutes ago", avatar: "JK" },
    ],
    "work-life-balance": [
      { id: 1, sender: "Rebecca M.", message: "How does everyone manage grading without taking it home every weekend?", time: "3 hours ago", avatar: "RM" },
      { id: 2, sender: "Thomas W.", message: "I've started using a timer - 60 minutes max per day, and whatever doesn't get done, doesn't get done. It forced me to prioritize.", time: "2 hours ago", avatar: "TW" },
      { id: 3, sender: "Lisa J.", message: "I've switched to more immediate verbal feedback during classwork and less written feedback on every assignment.", time: "1 hour ago", avatar: "LJ" },
      { id: 4, sender: "Michael P.", message: "I found that using rubrics with checkboxes instead of writing the same comments repeatedly saved me hours each week.", time: "30 minutes ago", avatar: "MP" },
    ],
    "admin-relations": [
      { id: 1, sender: "Natalie R.", message: "I have a meeting with my principal tomorrow about my concerns with the new schedule. Any advice on how to approach it constructively?", time: "5 hours ago", avatar: "NR" },
      { id: 2, sender: "Carlos D.", message: "Go in with specific examples and focused on solutions, not just problems. I brought a one-page summary last time and it worked well.", time: "4 hours ago", avatar: "CD" },
      { id: 3, sender: "Patrick S.", message: "Ask questions instead of making statements. 'How might we address X?' rather than 'X isn't working'", time: "2 hours ago", avatar: "PS" },
      { id: 4, sender: "Emily T.", message: "Remember to acknowledge the constraints they're working with too. It helps create a collaborative tone.", time: "1 hour ago", avatar: "ET" },
    ],
    "self-care": [
      { id: 1, sender: "Jessica H.", message: "What's one small self-care practice you've managed to incorporate into your school day?", time: "6 hours ago", avatar: "JH" },
      { id: 2, sender: "Robert K.", message: "I keep a gratitude journal at my desk and write down one positive moment from each class period.", time: "5 hours ago", avatar: "RK" },
      { id: 3, sender: "Angela M.", message: "I have a 'joy jar' where I put notes from students or colleagues that made me smile. On tough days, I read a few.", time: "3 hours ago", avatar: "AM" },
      { id: 4, sender: "Kevin L.", message: "I use my lunch break for a quick 10-minute meditation. It resets my mind for the afternoon classes.", time: "1 hour ago", avatar: "KL" },
    ]
  };
  
  // Handle joining a discussion group
  const handleJoinDiscussion = (groupId: string, groupName: string) => {
    setActiveChat(groupId);
    addNotification(`You've joined the ${groupName} discussion`);
    
    toast({
      title: "Joined Discussion Group",
      description: `You've been added to the ${groupName} group. The moderator will welcome you shortly.`,
      duration: 3000,
    });
  };
  
  // Handle registering for an event
  const handleRegisterEvent = (eventId: string, eventName: string) => {
    addNotification(`You've registered for "${eventName}"`);
    
    toast({
      title: "Event Registration Successful",
      description: `You're registered for ${eventName}. A calendar invitation has been sent to your email.`,
      duration: 3000,
    });
  };
  
  // Handle sending a message
  const handleSendMessage = (groupId: string) => {
    if (!messageInput.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been shared with the group",
      duration: 2000,
    });
    
    // In a real app, this would add the message to the chat
    setMessageInput("");
    
    // Simulate receiving a response after a delay
    setTimeout(() => {
      addNotification("New message in your discussion group");
      
      toast({
        title: "New Response",
        description: "Someone has responded to your message",
        duration: 3000,
      });
    }, 5000);
  };
  
  // Add a notification
  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev]);
  };
  
  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
    
    toast({
      title: "Notifications Cleared",
      description: "All community notifications have been cleared",
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-6 rounded-lg border border-purple-500/30 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Educator Community Support</h2>
        <p className="text-gray-200">
          Connect with fellow educators who understand the unique mental health challenges of working in education. Share experiences, strategies, and support in a safe, confidential environment.
        </p>
        
        {notifications.length > 0 && (
          <div className="mt-4 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-medium flex items-center">
                <Bell className="h-4 w-4 mr-2 text-purple-400" />
                Community Notifications
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-300 hover:text-purple-100 hover:bg-purple-800/50"
                onClick={clearNotifications}
              >
                Clear All
              </Button>
            </div>
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div key={index} className="text-sm bg-purple-800/30 p-2 rounded border border-purple-500/20 text-purple-100">
                  {notification}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-400" />
              Discussion Groups
            </h3>
            {activeChat && (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-purple-500/30 text-purple-200 hover:bg-purple-900/30"
                onClick={() => setActiveChat(null)}
              >
                Back to Groups
              </Button>
            )}
          </div>
          
          {!activeChat ? (
            <div className="space-y-4">
              {discussionGroups.map((group) => (
                <Card key={group.id} className="bg-[#1e1e2f]/80 border-purple-500/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white">{group.title}</CardTitle>
                      <Badge variant="outline" className="border-purple-500/40 text-purple-300">
                        {group.activity}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300">
                      {group.members} members • {group.activeNow} active now
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200">{group.description}</p>
                  </CardContent>
                  <CardFooter className="border-t border-purple-500/20 pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
                      onClick={() => handleJoinDiscussion(group.id, group.title)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Join Discussion
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
              <CardHeader className="pb-2 border-b border-purple-500/20">
                <CardTitle className="text-white">{discussionGroups.find(g => g.id === activeChat)?.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {discussionGroups.find(g => g.id === activeChat)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4 p-2">
                  {(chatMessages as any)[activeChat].map((msg: any) => (
                    <div key={msg.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-purple-700/60 text-white text-xs">{msg.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-purple-200">{msg.sender}</span>
                          <span className="text-xs text-purple-300/60">{msg.time}</span>
                        </div>
                        <div className="bg-purple-900/30 p-3 rounded-lg text-purple-100 text-sm">
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative mt-4">
                  <Textarea 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="min-h-[100px] bg-purple-900/20 border-purple-500/30 placeholder-purple-400/50 text-purple-100"
                  />
                  <Button 
                    size="sm" 
                    className="absolute bottom-3 right-3 bg-purple-700 hover:bg-purple-800 text-white"
                    onClick={() => handleSendMessage(activeChat)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="border-t border-purple-500/20 pt-4 flex justify-between">
                <Button 
                  variant="outline" 
                  className="border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
                  onClick={() => setActiveChat(null)}
                >
                  Back to Groups
                </Button>
                <Button 
                  variant="default" 
                  className="bg-purple-700 hover:bg-purple-800 text-white"
                  onClick={() => {
                    toast({
                      title: "Feature Activated",
                      description: "Real-time video chat is now available for this group",
                      duration: 3000,
                    });
                  }}
                >
                  Start Video Chat
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-white flex items-center">
            <CalendarDays className="mr-2 h-5 w-5 text-purple-400" />
            Upcoming Events
          </h3>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-[#1e1e2f]/80 border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base">{event.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {event.date} • {event.time}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <Badge variant="secondary" className="bg-indigo-900/80 text-indigo-200">
                    {event.type}
                  </Badge>
                </CardContent>
                <CardFooter className="border-t border-purple-500/20 pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
                    onClick={() => handleRegisterEvent(event.id, event.title)}
                  >
                    Register
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg">Mentor Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200 mb-4">
                  Connect with a experienced educator mentor who understands your specific challenges and can provide personalized guidance.
                </p>
                <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-500/20 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-purple-400" />
                    <h4 className="text-white font-medium">Benefits:</h4>
                  </div>
                  <ul className="text-sm text-purple-100 space-y-1 pl-6">
                    <li>• One-on-one support from experienced educators</li>
                    <li>• Confidential discussions about challenges</li>
                    <li>• Specialized guidance for your career stage</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-purple-700 hover:bg-purple-800 text-white w-full"
                  onClick={() => {
                    addNotification("You've been added to the mentor matching program");
                    
                    toast({
                      title: "Mentor Request Submitted",
                      description: "We'll match you with a suitable mentor within 48 hours",
                      duration: 3000,
                    });
                  }}
                >
                  Request a Mentor
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorsCommunity;
