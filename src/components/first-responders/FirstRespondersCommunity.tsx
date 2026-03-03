
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FirstRespondersCommunity: React.FC = () => {
  const { toast } = useToast();

  const groups = [
    {
      name: "Firefighter Peer Support",
      members: 342,
      description: "Connect with fellow firefighters to share experiences and support each other.",
      meeting: "Weekly"
    },
    {
      name: "EMS Professionals Network",
      members: 567,
      description: "Support group for paramedics and EMTs dealing with the unique challenges of emergency medical services.",
      meeting: "Bi-weekly"
    },
    {
      name: "Critical Incident Support Group",
      members: 189,
      description: "Confidential group for first responders processing traumatic incidents and critical calls.",
      meeting: "On-demand"
    }
  ];

  const events = [
    { title: "Peer Support Training", date: "May 15, 2025", time: "7:00 PM ET", type: "online" },
    { title: "Wellness Check-In Circle", date: "May 18, 2025", time: "6:30 PM ET", type: "online" },
    { title: "First Responder Family Day", date: "May 22, 2025", time: "2:00 PM Local", type: "in-person" }
  ];

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Group Joined",
      description: `You've successfully joined ${groupName}`,
      duration: 2000
    });
  };

  const handleRegisterEvent = (eventTitle: string) => {
    toast({
      title: "Registration Complete",
      description: `You've registered for ${eventTitle}`,
      duration: 2000
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">First Responder Community</h2>
        <p className="text-white/70">
          Connect with fellow first responders who understand the unique challenges of emergency service work.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Support Groups</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((group, index) => (
            <Card key={index} className="bg-[#141921] border-red-900/30 hover:border-red-700/50 transition-colors">
              <CardContent className="p-6">
                <div className="p-4 bg-red-900/20 rounded-lg mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
                <p className="text-white/70 mb-4 text-sm">{group.description}</p>
                <div className="flex justify-between items-center text-sm text-red-300/70 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{group.meeting}</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-red-700 hover:bg-red-800 text-white"
                  onClick={() => handleJoinGroup(group.name)}
                >
                  Join Group
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.map((event, index) => (
            <Card key={index} className="bg-[#141921] border-red-900/30">
              <CardContent className="p-4 flex items-center">
                <div className="bg-red-900/20 text-red-400 p-3 rounded-lg mr-4 text-center min-w-[60px]">
                  <span className="block text-sm">{event.date.split(' ')[0]}</span>
                  <span className="block text-xl font-bold">{event.date.split(' ')[1].replace(',', '')}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-white">{event.title}</h3>
                  <div className="flex items-center text-sm text-white/70 mb-1">
                    <Video className="h-3 w-3 mr-1 text-red-400" />
                    <span>{event.type === 'online' ? 'Online' : 'In-Person'} | {event.time}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-500 text-red-300 hover:bg-red-900/50"
                  onClick={() => handleRegisterEvent(event.title)}
                >
                  Register
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstRespondersCommunity;
