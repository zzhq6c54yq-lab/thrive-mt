
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ActionButton from "@/components/navigation/ActionButton";
import { useToast } from "@/hooks/use-toast";

const EducatorsCommunity: React.FC = () => {
  const { toast } = useToast();
  
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
  
  const handleJoinDiscussion = (groupId: string, groupName: string) => {
    toast({
      title: "Joining Discussion Group",
      description: `You've been added to the ${groupName} group. The moderator will welcome you shortly.`,
      duration: 3000,
    });
  };
  
  const handleRegisterEvent = (eventId: string, eventName: string) => {
    toast({
      title: "Event Registration Successful",
      description: `You're registered for ${eventName}. A calendar invitation has been sent to your email.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-6 rounded-lg border border-purple-500/30 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Educator Community Support</h2>
        <p className="text-gray-200">
          Connect with fellow educators who understand the unique mental health challenges of working in education. Share experiences, strategies, and support in a safe, confidential environment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-medium text-white flex items-center">
            <Users className="mr-2 h-5 w-5 text-purple-400" />
            Discussion Groups
          </h3>
          
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
                <CardTitle className="text-white text-lg">Connect with Peers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  Join our virtual monthly meetups for educators to share experiences and support each other.
                </p>
              </CardContent>
              <CardFooter>
                <ActionButton
                  type="join"
                  path="/virtual-meetings"
                  title="Join Virtual Meetup"
                  variant="default"
                  className="bg-purple-700 hover:bg-purple-800 text-white w-full"
                  state={{ group: "educators" }}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorsCommunity;
