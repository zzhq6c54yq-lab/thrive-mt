
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Calendar, ExternalLink, MessagesSquare, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

const HospitalityCommunity: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  
  const handleJoinGroup = () => {
    if (!user?.id) {
      toast({
        title: "Please Log In",
        description: "You need to be logged in to join groups.",
        variant: "destructive",
      });
      return;
    }
    navigate("/app/community");
  };
  
  const handleJoinEvent = () => {
    if (!user?.id) {
      toast({
        title: "Please Log In",
        description: "You need to be logged in to register for events.",
        variant: "destructive",
      });
      return;
    }
    navigate("/app/community");
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Hospitality Community</h2>
        <p className="text-white/70">
          Connect with peers who understand the unique challenges of restaurant and hospitality work
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Discussion Groups */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-purple-500" />
            Discussion Groups
          </h3>
          
          {[
            { name: "Restaurant Staff Support Circle", members: 247, activity: "Very active", desc: "A supportive community for servers, hosts, and other front-of-house staff to discuss mental health challenges in customer-facing roles." },
            { name: "Kitchen Crew Conversations", members: 189, activity: "Active", desc: "A space for chefs, line cooks, and kitchen staff to share strategies for managing the high-pressure environments of professional kitchens." },
            { name: "Management & Leadership", members: 104, activity: "Moderately active", desc: "For those in leadership roles to discuss creating mentally healthy work environments and supporting staff wellbeing while managing their own stress." },
          ].map((group) => (
            <Card key={group.name} className="bg-white/10">
              <CardHeader>
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <CardDescription>
                  {group.desc.substring(0, 60)}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-white/70 mb-3">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{group.members} members</span>
                  <span className="mx-2">•</span>
                  <MessagesSquare className="h-4 w-4 mr-2" />
                  <span>{group.activity}</span>
                </div>
                <p className="text-sm text-white/70">{group.desc}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleJoinGroup}
                >
                  <UserRoundPlus className="mr-2 h-4 w-4" /> Join Group
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Community Events */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Community Events
          </h3>
          
          {[
            { name: "Virtual Coffee Hour", desc: "Casual conversation with industry peers", time: "Tomorrow, 10 AM", color: "purple", detail: "Join us for a casual virtual coffee hour to connect with others in the hospitality industry. Share experiences, challenges, and wellness tips." },
            { name: "Industry Mental Health Panel", desc: "Expert discussion on hospitality wellness", time: "Next Tuesday, 7 PM", color: "blue", detail: "A panel of mental health experts and industry veterans discuss the unique challenges of hospitality work and strategies for maintaining wellbeing." },
            { name: "Peer Support Training", desc: "Learn to support colleagues in crisis", time: "Next Friday, 3 PM", color: "green", detail: "This workshop will teach you how to recognize signs of mental health struggles in colleagues and provide appropriate support in the workplace." },
          ].map((event) => (
            <Card key={event.name} className="bg-white/10">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <CardDescription>{event.desc}</CardDescription>
                  </div>
                  <div className={`bg-${event.color}-100 text-${event.color}-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-${event.color}-900 dark:text-${event.color}-300`}>
                    {event.time}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">{event.detail}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleJoinEvent}
                >
                  RSVP
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* External Resources */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-4 text-white">Industry Support Organizations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="justify-start bg-white/10"
            onClick={() => window.open("https://www.restaurantworkershealth.org", "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Restaurant Workers' Health Group
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start bg-white/10"
            onClick={() => window.open("https://www.hospitalityaction.org.uk", "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Hospitality Action
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start bg-white/10"
            onClick={() => window.open("https://www.changingtones.org", "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Chefs With Issues
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalityCommunity;
