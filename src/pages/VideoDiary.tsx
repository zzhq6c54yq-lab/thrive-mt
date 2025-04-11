
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoIcon, Film, PlayCircle, Plus, Clock, Calendar, Library } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";
import ActionButton from "@/components/navigation/ActionButton";
import HomeButton from "@/components/HomeButton";

const VideoDiary: React.FC = () => {
  const [activeTab, setActiveTab] = useState("record");

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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] to-[#b3a5f8]">
                  Video Diary
                </span>
              </h1>
              <p className="text-white/70">Record and track your thoughts and feelings</p>
            </div>
          </div>
          <HomeButton />
        </div>
        
        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-white/5 mb-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#9b87f5]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
          
          <Tabs defaultValue="record" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 gap-2 bg-black/30 mb-8 p-1 rounded-lg">
              <TabsTrigger value="record" className="data-[state=active]:bg-[#9b87f5]/90">Record</TabsTrigger>
              <TabsTrigger value="library" className="data-[state=active]:bg-[#9b87f5]/90">My Library</TabsTrigger>
              <TabsTrigger value="prompts" className="data-[state=active]:bg-[#9b87f5]/90">Prompts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="record" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-[#9b87f5] to-[#b3a5f8] p-3 rounded-lg shadow-inner">
                        <VideoIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white/90">Daily Check-In</CardTitle>
                        <CardDescription className="text-white/70">Record how you're feeling today</CardDescription>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Take a moment to reflect on your day and record your thoughts. This daily practice can help track your emotional patterns over time.</p>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-3">
                    <ActionButton
                      type="record"
                      title="Start Recording"
                      variant="gold"
                    />
                  </CardFooter>
                </Card>
                
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-[#9b87f5] to-[#b3a5f8] p-3 rounded-lg shadow-inner">
                        <Film className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white/90">Guided Reflection</CardTitle>
                        <CardDescription className="text-white/70">Record with professional prompts</CardDescription>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">Record your responses to therapist-designed prompts that help you explore specific aspects of your mental health journey.</p>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-3">
                    <ActionButton
                      type="record"
                      title="Guided Recording"
                      variant="gold"
                    />
                  </CardFooter>
                </Card>
              </div>
              
              <Card className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/10 shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-[#9b87f5]/20 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-[#9b87f5]" />
                  </div>
                  <div>
                    <CardTitle className="text-white/90">Recent Recordings</CardTitle>
                    <CardDescription className="text-white/70">Your latest video entries</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-black/40 rounded-lg p-4 flex flex-col items-center text-center">
                      <Calendar className="h-10 w-10 text-[#9b87f5] mb-2" />
                      <p className="text-white/80 text-sm font-medium">Yesterday</p>
                      <p className="text-white/50 text-xs">2 min recording</p>
                      <ActionButton
                        type="other"
                        title="View"
                        path="/video-diary/view/yesterday"
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                      />
                    </div>
                    <div className="bg-black/40 rounded-lg p-4 flex flex-col items-center text-center">
                      <Calendar className="h-10 w-10 text-[#9b87f5] mb-2" />
                      <p className="text-white/80 text-sm font-medium">3 days ago</p>
                      <p className="text-white/50 text-xs">4 min recording</p>
                      <ActionButton
                        type="other"
                        title="View"
                        path="/video-diary/view/3-days-ago"
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                      />
                    </div>
                    <div className="bg-black/40 rounded-lg p-4 flex flex-col items-center text-center">
                      <Calendar className="h-10 w-10 text-[#9b87f5] mb-2" />
                      <p className="text-white/80 text-sm font-medium">Last week</p>
                      <p className="text-white/50 text-xs">5 min recording</p>
                      <ActionButton
                        type="other"
                        title="View"
                        path="/video-diary/view/last-week"
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="library" className="animate-fade-in">
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20 shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-gradient-to-br from-[#9b87f5] to-[#b3a5f8] p-3 rounded-lg shadow-inner">
                      <Library className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white/90">My Video Collection</CardTitle>
                      <CardDescription className="text-white/70">All your recorded entries</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {/* We'd map over actual entries here, using a placeholder for example */}
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-black/40 rounded-lg overflow-hidden group cursor-pointer">
                          <div className="aspect-video bg-gray-800 relative flex items-center justify-center">
                            <PlayCircle className="h-12 w-12 text-white/50 group-hover:text-white/90 transition-colors" />
                            <div className="absolute inset-0 group-hover:bg-black/20 transition-colors"></div>
                          </div>
                          <div className="p-3">
                            <p className="text-white/80 text-sm font-medium">{`Entry #${i}`}</p>
                            <p className="text-white/50 text-xs">{`${i + 2} days ago • ${i + 1} min`}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <ActionButton
                      type="other"
                      title="View All Videos"
                      path="/video-diary/library"
                      variant="gold-outline"
                    />
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="prompts" className="animate-fade-in">
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Card className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#9b87f5]/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white/90">Reflection Prompts</CardTitle>
                    <CardDescription className="text-white/70">Choose a prompt to guide your recording</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        "What's one challenge you faced today and how did you handle it?",
                        "Describe a moment that made you feel proud in the past week.",
                        "What are you grateful for today?",
                        "What's something you're looking forward to?",
                        "Describe your current emotional state using colors and why.",
                        "What self-care activity would benefit you most right now?"
                      ].map((prompt, i) => (
                        <div key={i} className="bg-black/40 rounded-lg p-4 hover:bg-black/60 transition-colors group">
                          <p className="text-white/80 text-sm group-hover:text-white transition-colors">{prompt}</p>
                          <div className="mt-3 flex justify-end">
                            <ActionButton
                              type="record"
                              title="Use This Prompt"
                              variant="ghost"
                              size="sm"
                              className="text-[#9b87f5]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <ActionButton
                      type="other"
                      title="Create Custom Prompt"
                      path="/video-diary/prompts/custom"
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

export default VideoDiary;
