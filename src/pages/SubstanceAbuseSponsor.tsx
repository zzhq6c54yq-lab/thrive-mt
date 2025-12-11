import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Users, Calendar, Phone, MapPin, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import HomeButton from "@/components/HomeButton";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/substance-abuse-hero.jpg";

const SubstanceAbuseSponsor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sobrietyDate] = useState(new Date("2024-01-15"));
  
  // Calculate days sober
  const daysSober = Math.floor((new Date().getTime() - sobrietyDate.getTime()) / (1000 * 60 * 60 * 24));

  const handleEmergencyContact = () => {
    toast({
      title: "Emergency Contacts Ready",
      description: "Quick access to your support network and crisis hotlines.",
    });
  };

  const handleFindMeeting = () => {
    toast({
      title: "Finding Meetings",
      description: "Searching for meetings in your area...",
    });
  };

  const handleDailyCheckIn = () => {
    toast({
      title: "Check-In Recorded",
      description: "Great job staying committed to your recovery!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={heroImage}
          alt="Recovery Support"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-700/80"></div>
        
        <div className="absolute inset-0 flex flex-col justify-between p-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              className="text-white hover:text-emerald-200 hover:bg-white/10"
              onClick={() => navigate("/app/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <HomeButton />
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white">My Recovery Sponsor</h1>
            </div>
            <p className="text-xl text-emerald-100 max-w-2xl">
              Your personal recovery support system with sponsor connection, sobriety tracking, and community resources
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Sobriety Counter */}
        <Card className="mb-8 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold text-emerald-900 mb-2">
                  {daysSober} Days
                </h2>
                <p className="text-emerald-700 text-lg">Clean & Sober</p>
                <p className="text-sm text-emerald-600 mt-1">Since {sobrietyDate.toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Award className="h-16 w-16 text-emerald-600" />
                <Badge className="bg-emerald-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Strong
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="sponsor" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="sponsor">My Sponsor</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          {/* Sponsor Tab */}
          <TabsContent value="sponsor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  Connect with a Sponsor
                </CardTitle>
                <CardDescription>
                  Find an experienced sponsor to guide you through your recovery journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    A sponsor is someone who has experience with recovery and can provide guidance, 
                    support, and accountability. They've been through the steps and can help you navigate 
                    your own recovery journey.
                  </p>
                  
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <h3 className="font-semibold text-emerald-900 mb-2">What to look for in a sponsor:</h3>
                    <ul className="space-y-1 text-sm text-emerald-700">
                      <li>• Has at least one year of continuous sobriety</li>
                      <li>• Working the 12 steps themselves</li>
                      <li>• Same gender (traditional approach)</li>
                      <li>• Available and willing to commit time</li>
                      <li>• Someone you feel comfortable being honest with</li>
                    </ul>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleEmergencyContact}>
                    <Phone className="mr-2 h-4 w-4" />
                    Request Sponsor Match
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-red-600" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>Quick access to your support network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-lg h-14"
                    onClick={handleEmergencyContact}
                  >
                    <Phone className="mr-3 h-5 w-5 text-red-600" />
                    24/7 Crisis Hotline: 1-800-662-4357
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-lg h-14"
                    onClick={handleEmergencyContact}
                  >
                    <Phone className="mr-3 h-5 w-5 text-blue-600" />
                    SAMHSA National Helpline
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-lg h-14"
                    onClick={handleEmergencyContact}
                  >
                    <Phone className="mr-3 h-5 w-5 text-emerald-600" />
                    My Sponsor (Add Contact)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Meetings Tab */}
          <TabsContent value="meetings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  Find Meetings Near You
                </CardTitle>
                <CardDescription>
                  Connect with local AA/NA meetings in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-4" size="lg" onClick={handleFindMeeting}>
                  <MapPin className="mr-2 h-4 w-4" />
                  Use My Location
                </Button>
                
                <div className="space-y-3 mt-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">Daily Recovery Group</h3>
                        <p className="text-sm text-muted-foreground">Open Meeting</p>
                      </div>
                      <Badge>Today 7:00 PM</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">123 Main St, Community Center</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">Morning Meditation Group</h3>
                        <p className="text-sm text-muted-foreground">Closed Meeting</p>
                      </div>
                      <Badge variant="outline">Tomorrow 8:00 AM</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">456 Oak Ave, Church Hall</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Online Meetings
                </CardTitle>
                <CardDescription>Join virtual meetings anytime, anywhere</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Can't make it to an in-person meeting? Join one of our many online support groups.
                </p>
                <Button variant="outline" className="w-full">
                  View Online Meeting Schedule
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Check-In</CardTitle>
                <CardDescription>
                  Stay accountable with daily reflections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg" onClick={handleDailyCheckIn}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Complete Today's Check-In
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recovery Milestones</CardTitle>
                <CardDescription>Celebrate your achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-lg">
                    <Award className="h-8 w-8 text-emerald-600" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-emerald-900">30 Days</h3>
                      <p className="text-sm text-emerald-600">First Month Completed ✓</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-emerald-50 rounded-lg">
                    <Award className="h-8 w-8 text-emerald-600" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-emerald-900">90 Days</h3>
                      <p className="text-sm text-emerald-600">Three Months Strong ✓</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border-2 border-dashed">
                    <Award className="h-8 w-8 text-gray-400" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-600">6 Months</h3>
                      <p className="text-sm text-gray-500">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recovery Resources</CardTitle>
                <CardDescription>
                  Educational materials and support documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  📖 The 12 Steps
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📖 The 12 Traditions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📖 Daily Reflections
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📖 Big Book (Alcoholics Anonymous)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📖 Living Clean (Narcotics Anonymous)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crisis Resources</CardTitle>
                <CardDescription>Immediate help when you need it most</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">If you're in crisis:</h3>
                  <ul className="space-y-1 text-sm text-red-700">
                    <li>• National Suicide Prevention Lifeline: 988</li>
                    <li>• Crisis Text Line: Text HOME to 741741</li>
                    <li>• SAMHSA National Helpline: 1-800-662-4357</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SubstanceAbuseSponsor;
