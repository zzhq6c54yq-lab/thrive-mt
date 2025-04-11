import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartHandshake, BookOpen, Users, FileDown, Calendar, Play } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";
import ActionButton from "@/components/navigation/ActionButton";
import HomeButton from "@/components/HomeButton";

const FamilyResources: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white py-8 px-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">
                  Family Resources
                </span>
              </h1>
              <p className="text-white/70">Support for your family's mental health journey</p>
            </div>
          </div>
          <HomeButton />
        </div>
        
        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-white/5 mb-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid grid-cols-4 gap-2 bg-black/30 mb-8 p-1 rounded-lg">
              <TabsTrigger value="resources" className="data-[state=active]:bg-[#B87333]/90">Resources</TabsTrigger>
              <TabsTrigger value="workshops" className="data-[state=active]:bg-[#B87333]/90">Workshops</TabsTrigger>
              <TabsTrigger value="support" className="data-[state=active]:bg-[#B87333]/90">Support</TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-[#B87333]/90">Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#B87333]/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-3 rounded-lg shadow-inner">
                        <HeartHandshake className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white/90">Family Support Guide</CardTitle>
                        <CardDescription className="text-white/70">Comprehensive resources for families</CardDescription>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Learn how to support family members through mental health challenges with our evidence-based guide for families.</p>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-3">
                    <ActionButton
                      type="download"
                      title="Download Guide"
                      variant="gold-outline"
                    />
                  </CardFooter>
                </Card>
                
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#B87333]/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-3 rounded-lg shadow-inner">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white/90">Family Wellness Assessment</CardTitle>
                        <CardDescription className="text-white/70">Evaluate your family's mental health</CardDescription>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Take our assessment to identify areas where your family might benefit from additional support or resources.</p>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-3">
                    <ActionButton
                      type="assessment"
                      id="family-wellness"
                      title="Start Assessment"
                      variant="gold"
                    />
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="workshops" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#B87333]/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-3 rounded-lg shadow-inner">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white/90">Family Communication Workshop</CardTitle>
                        <CardDescription className="text-white/70">Build stronger family connections</CardDescription>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Learn effective communication techniques to improve understanding and emotional support between family members.</p>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-3">
                    <ActionButton
                      type="workshop"
                      id="family-communication"
                      title="Join Workshop"
                      variant="gold"
                    />
                  </CardFooter>
                </Card>
                
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#B87333]/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-3 rounded-lg shadow-inner">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white/90">Supporting a Loved One</CardTitle>
                        <CardDescription className="text-white/70">Guided session for caregivers</CardDescription>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Workshop for family members supporting someone with mental health challenges. Learn coping strategies and self-care techniques.</p>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-3">
                    <ActionButton
                      type="practice"
                      id="supporting-loved-ones"
                      title="Start Practice"
                      variant="gold"
                    />
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="support" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#B87333]/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-3 rounded-lg shadow-inner">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white/90">Family Support Group</CardTitle>
                        <CardDescription className="text-white/70">Connect with other families</CardDescription>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Join our virtual support group for families navigating mental health challenges together. Share experiences and find community.</p>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-3">
                    <ActionButton
                      type="join"
                      title="Join Group"
                      variant="gold"
                    />
                  </CardFooter>
                </Card>
                
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#B87333]/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-3 rounded-lg shadow-inner">
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white/90">Family Discussion Forum</CardTitle>
                        <CardDescription className="text-white/70">Share experiences and advice</CardDescription>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">A moderated forum where families can discuss challenges, share successes, and support each other through mental health journeys.</p>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-3">
                    <ActionButton
                      type="discussion"
                      title="View Discussions"
                      variant="gold"
                    />
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tools" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#B87333]/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-3 rounded-lg shadow-inner">
                        <FileDown className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white/90">Family Activity Worksheets</CardTitle>
                        <CardDescription className="text-white/70">Practical exercises for families</CardDescription>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Download our collection of worksheets designed to help families practice communication, mindfulness, and emotional regulation together.</p>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-3">
                    <ActionButton
                      type="download"
                      title="Download Worksheets"
                      variant="gold-outline"
                    />
                  </CardFooter>
                </Card>
                
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#B87333]/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-3 rounded-lg shadow-inner">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white/90">Family Wellness Calendar</CardTitle>
                        <CardDescription className="text-white/70">Plan mental health activities</CardDescription>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">An interactive calendar to help families incorporate mental wellness activities into their daily routine.</p>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-3">
                    <ActionButton
                      type="other"
                      title="View Calendar"
                      path="/family-calendar"
                      variant="gold"
                    />
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FamilyResources;
