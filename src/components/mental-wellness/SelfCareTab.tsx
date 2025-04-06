
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Brain, Heart, Sparkles, ArrowRight, Smile, Moon, Headphones } from "lucide-react";

const SelfCareTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Wellness Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <div className="p-2 rounded-full bg-green-100 w-fit">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <CardTitle className="mt-2">Guided Breathing</CardTitle>
            <CardDescription>Reduce stress and anxiety through breathwork</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-gray-600 mb-2">
              Interactive breathing exercises designed to activate your parasympathetic nervous system and reduce stress levels.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">5-minute practice</Badge>
              <Badge variant="outline">Beginner-friendly</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 group">
              Start Exercise <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <div className="p-2 rounded-full bg-purple-100 w-fit">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="mt-2">Thought Reframing</CardTitle>
            <CardDescription>Transform negative thought patterns</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-gray-600 mb-2">
              Learn to identify cognitive distortions and reframe negative thoughts into more balanced perspectives.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">10-minute practice</Badge>
              <Badge variant="outline">CBT-based</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 group">
              Start Exercise <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <div className="p-2 rounded-full bg-blue-100 w-fit">
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="mt-2">Guided Meditation</CardTitle>
            <CardDescription>Mindfulness for mental clarity</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-gray-600 mb-2">
              Develop present-moment awareness to reduce rumination and increase emotional regulation.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">3-15 minutes</Badge>
              <Badge variant="outline">Multiple styles</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 group">
              Start Meditation <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* More Wellness Tools */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">More Self-Care Tools</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="p-2 rounded-full bg-yellow-100 w-fit">
                <Smile className="h-5 w-5 text-yellow-600" />
              </div>
              <CardTitle className="text-base mt-2">Mood Boost Activities</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-gray-600">
              Quick science-backed exercises to improve your mood in minutes.
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">Explore</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="p-2 rounded-full bg-indigo-100 w-fit">
                <Moon className="h-5 w-5 text-indigo-600" />
              </div>
              <CardTitle className="text-base mt-2">Sleep Improvement</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-gray-600">
              Tools and techniques for better sleep quality and habits.
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">Explore</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="p-2 rounded-full bg-red-100 w-fit">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle className="text-base mt-2">Gratitude Practice</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-gray-600">
              Develop a gratitude habit with guided reflection exercises.
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">Explore</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="p-2 rounded-full bg-teal-100 w-fit">
                <Headphones className="h-5 w-5 text-teal-600" />
              </div>
              <CardTitle className="text-base mt-2">Relaxation Audio</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-gray-600">
              Calming sounds, music, and guided relaxation sessions.
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">Explore</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="bg-[#9b87f5]/10 p-6 rounded-lg border border-[#9b87f5]/30 mt-8">
          <h3 className="font-semibold text-lg mb-3">Create Your Self-Care Plan</h3>
          <p className="text-gray-700 mb-4">
            Build a personalized routine combining these tools based on your needs and preferences.
            Track your progress and adjust your plan as needed.
          </p>
          <Button className="bg-[#9b87f5] hover:bg-[#8b77e5]">
            Build Custom Self-Care Routine
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelfCareTab;
