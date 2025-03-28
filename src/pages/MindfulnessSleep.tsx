
import React from "react";
import { Moon, Sun, Clock, Heart, Stars, Cloud, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Page from "@/components/Page";

const MindfulnessSleep = () => {
  return (
    <Page title="Mindfulness & Sleep">
      <div className="container px-4 py-6 max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative mr-3">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-70 blur-sm"></div>
              <div className="relative bg-white/10 rounded-full p-2">
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h1 className="text-4xl font-light bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Mindfulness & Sleep
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover practices that can help you develop greater awareness, manage stress, and improve sleep quality.
          </p>
        </div>
        
        <Tabs defaultValue="mindfulness" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5 p-1 rounded-xl backdrop-blur-sm">
            <TabsTrigger 
              value="mindfulness" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg py-3"
            >
              <Sun className="h-4 w-4 mr-2 text-orange-400" />
              Mindfulness
            </TabsTrigger>
            <TabsTrigger 
              value="sleep" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg py-3"
            >
              <Moon className="h-4 w-4 mr-2 text-blue-400" />
              Sleep
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mindfulness" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <CardHeader className="relative">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                    <Sun className="w-full h-full" />
                  </div>
                  <CardTitle className="flex items-center gap-2 text-white group-hover:text-orange-300 transition-colors duration-300">
                    <div className="p-2 bg-orange-500/20 rounded-full">
                      <Sun className="h-5 w-5 text-orange-400" />
                    </div>
                    <span>Morning Meditation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">Start your day with clarity and intention through a guided morning meditation.</p>
                  <Button className="w-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white border-0">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Begin Practice
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <CardHeader className="relative">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                    <Heart className="w-full h-full" />
                  </div>
                  <CardTitle className="flex items-center gap-2 text-white group-hover:text-red-300 transition-colors duration-300">
                    <div className="p-2 bg-red-500/20 rounded-full">
                      <Heart className="h-5 w-5 text-red-400" />
                    </div>
                    <span>Loving-Kindness</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">Cultivate compassion for yourself and others with this heart-centered practice.</p>
                  <Button className="w-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white border-0">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Begin Practice
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <CardHeader className="relative">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                    <Clock className="w-full h-full" />
                  </div>
                  <CardTitle className="flex items-center gap-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                    <div className="p-2 bg-blue-500/20 rounded-full">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>Mindful Moments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">Short practices you can integrate throughout your day for moments of presence.</p>
                  <Button className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white border-0">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Begin Practice
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sleep" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <CardHeader className="relative">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                    <Moon className="w-full h-full" />
                  </div>
                  <CardTitle className="flex items-center gap-2 text-white group-hover:text-purple-300 transition-colors duration-300">
                    <div className="p-2 bg-purple-500/20 rounded-full">
                      <Moon className="h-5 w-5 text-purple-400" />
                    </div>
                    <span>Sleep Meditation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">Gentle guidance to help you relax and prepare for restful sleep.</p>
                  <Button className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white border-0">
                    <Stars className="h-4 w-4 mr-2" />
                    Begin Practice
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <CardHeader className="relative">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                    <Clock className="w-full h-full" />
                  </div>
                  <CardTitle className="flex items-center gap-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                    <div className="p-2 bg-blue-500/20 rounded-full">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>Sleep Hygiene</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">Build healthy sleep habits with these evidence-based recommendations.</p>
                  <Button className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white border-0">
                    <Stars className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <CardHeader className="relative">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                    <Cloud className="w-full h-full" />
                  </div>
                  <CardTitle className="flex items-center gap-2 text-white group-hover:text-indigo-300 transition-colors duration-300">
                    <div className="p-2 bg-indigo-500/20 rounded-full">
                      <Cloud className="h-5 w-5 text-indigo-400" />
                    </div>
                    <span>Sleep Sounds</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">Soothing ambient sounds to help you fall asleep and stay asleep.</p>
                  <Button className="w-full bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-indigo-500 hover:to-blue-600 text-white border-0">
                    <Stars className="h-4 w-4 mr-2" />
                    Browse Sounds
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default MindfulnessSleep;
