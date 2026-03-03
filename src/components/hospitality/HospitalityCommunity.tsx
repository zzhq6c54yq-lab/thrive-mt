
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Calendar, ExternalLink, MessagesSquare, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const HospitalityCommunity: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Joining Community Group",
      description: `You've been added to ${groupName}`,
      duration: 2000,
    });
  };
  
  const handleJoinEvent = (eventName: string) => {
    toast({
      title: "RSVP Confirmed",
      description: `You're registered for ${eventName}`,
      duration: 2000,
    });
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
          
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Restaurant Staff Support Circle</CardTitle>
              <CardDescription>
                Front-of-house staff sharing experiences and support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-white/70 mb-3">
                <Users className="h-4 w-4 mr-2" />
                <span>247 members</span>
                <span className="mx-2">•</span>
                <MessagesSquare className="h-4 w-4 mr-2" />
                <span>Very active</span>
              </div>
              <p className="text-sm text-white/70">
                A supportive community for servers, hosts, and other front-of-house staff to discuss mental health challenges in customer-facing roles.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleJoinGroup("Restaurant Staff Support Circle")}
              >
                <UserRoundPlus className="mr-2 h-4 w-4" /> Join Group
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Kitchen Crew Conversations</CardTitle>
              <CardDescription>
                Back-of-house staff discussing kitchen stress management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-white/70 mb-3">
                <Users className="h-4 w-4 mr-2" />
                <span>189 members</span>
                <span className="mx-2">•</span>
                <MessagesSquare className="h-4 w-4 mr-2" />
                <span>Active</span>
              </div>
              <p className="text-sm text-white/70">
                A space for chefs, line cooks, and kitchen staff to share strategies for managing the high-pressure environments of professional kitchens.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleJoinGroup("Kitchen Crew Conversations")}
              >
                <UserRoundPlus className="mr-2 h-4 w-4" /> Join Group
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Management & Leadership</CardTitle>
              <CardDescription>
                For restaurant managers and leaders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-white/70 mb-3">
                <Users className="h-4 w-4 mr-2" />
                <span>104 members</span>
                <span className="mx-2">•</span>
                <MessagesSquare className="h-4 w-4 mr-2" />
                <span>Moderately active</span>
              </div>
              <p className="text-sm text-white/70">
                For those in leadership roles to discuss creating mentally healthy work environments and supporting staff wellbeing while managing their own stress.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleJoinGroup("Management & Leadership Group")}
              >
                <UserRoundPlus className="mr-2 h-4 w-4" /> Join Group
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Community Events */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Community Events
          </h3>
          
          <Card className="bg-white/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Virtual Coffee Hour</CardTitle>
                  <CardDescription>
                    Casual conversation with industry peers
                  </CardDescription>
                </div>
                <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                  Tomorrow, 10 AM
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">
                Join us for a casual virtual coffee hour to connect with others in the hospitality industry. Share experiences, challenges, and wellness tips.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleJoinEvent("Virtual Coffee Hour")}
              >
                RSVP
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Industry Mental Health Panel</CardTitle>
                  <CardDescription>
                    Expert discussion on hospitality wellness
                  </CardDescription>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  Next Tuesday, 7 PM
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">
                A panel of mental health experts and industry veterans discuss the unique challenges of hospitality work and strategies for maintaining wellbeing.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleJoinEvent("Industry Mental Health Panel")}
              >
                RSVP
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Peer Support Training</CardTitle>
                  <CardDescription>
                    Learn to support colleagues in crisis
                  </CardDescription>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  Next Friday, 3 PM
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">
                This workshop will teach you how to recognize signs of mental health struggles in colleagues and provide appropriate support in the workplace.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleJoinEvent("Peer Support Training")}
              >
                RSVP
              </Button>
            </CardFooter>
          </Card>
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
