
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Calendar, Edit, Camera, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge as UIBadge } from "@/components/ui/badge";
import HomeButton from "@/components/HomeButton";
import { useUser } from "@/contexts/UserContext";

const UserProfile = () => {
  const { user, profile } = useUser();
  const displayName = profile?.display_name || user?.user_metadata?.name || 'User';
  const displayEmail = user?.email || profile?.email || '';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const memberSince = profile?.created_at 
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">My Profile</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Manage your personal information and achievements.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-5xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#B87333] hover:bg-[#B87333]/90">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h2 className="text-2xl font-semibold">{displayName}</h2>
                  <Button variant="outline" className="mt-2 md:mt-0">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {displayEmail && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{displayEmail}</span>
                    </div>
                  )}
                  {memberSince && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>Member since {memberSince}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Badge className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Premium Member</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <UIBadge className="bg-[#B87333] hover:bg-[#B87333]/90">60-Day Streak</UIBadge>
                  <UIBadge variant="outline">Mindfulness Expert</UIBadge>
                  <UIBadge variant="outline">Journal Master</UIBadge>
                  <UIBadge variant="outline">Workshop Enthusiast</UIBadge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="activity">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#B87333]/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-[#B87333]" />
                    </div>
                    <div>
                      <p className="font-medium">Attended Stress Management Workshop</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#B87333]/10 p-2 rounded-full">
                      <User className="h-5 w-5 text-[#B87333]" />
                    </div>
                    <div>
                      <p className="font-medium">Completed Mental Health Assessment</p>
                      <p className="text-sm text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#B87333]/10 p-2 rounded-full">
                      <Badge className="h-5 w-5 text-[#B87333]" />
                    </div>
                    <div>
                      <p className="font-medium">Earned "30-Day Streak" Badge</p>
                      <p className="text-sm text-muted-foreground">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-[#B87333]/20">
                    <CardContent className="p-4 text-center">
                      <div className="bg-[#B87333]/10 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                        <Badge className="h-6 w-6 text-[#B87333]" />
                      </div>
                      <h3 className="font-medium mb-2">60-Day Streak</h3>
                      <p className="text-sm text-muted-foreground">Consistently engaged with the platform for 60 days</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="bg-gray-100 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                        <Badge className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="font-medium mb-2">Meditation Master</h3>
                      <p className="text-sm text-muted-foreground">Complete 50 meditation sessions (32/50)</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="bg-gray-100 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                        <Badge className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="font-medium mb-2">Workshop Expert</h3>
                      <p className="text-sm text-muted-foreground">Attend 10 different workshops (7/10)</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Personalize what content you see based on your interests and needs.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">Anxiety Management</Button>
                  <Button variant="outline" className="justify-start">Stress Reduction</Button>
                  <Button variant="outline" className="justify-start">Sleep Improvement</Button>
                  <Button variant="outline" className="justify-start">Mindfulness</Button>
                  <Button variant="outline" className="justify-start">Depression Support</Button>
                  <Button variant="outline" className="justify-start">Work-Life Balance</Button>
                </div>
                
                <Button className="mt-6 bg-[#B87333] hover:bg-[#B87333]/90">
                  Update Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
