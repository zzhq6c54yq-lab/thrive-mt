
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, MessageSquare, Video, ArrowUpRight, Users, ExternalLink } from "lucide-react";

const ResourcesTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Educational Resources */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#9b87f5]" />
          Educational Resources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-200">Article</Badge>
              <CardTitle className="mt-2">Understanding Anxiety: Causes and Management</CardTitle>
              <CardDescription>Comprehensive guide to anxiety disorders</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600 mb-3">
                Learn about different types of anxiety disorders, their symptoms, causes, and evidence-based management strategies.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileText className="h-4 w-4" />
                <span>10 minute read</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full flex items-center gap-1 group">
                Read Article <ExternalLink className="h-4 w-4 ml-1 group-hover:scale-110 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <Badge className="w-fit bg-red-100 text-red-700 hover:bg-red-200">Video Series</Badge>
              <CardTitle className="mt-2">Cognitive Behavioral Therapy Basics</CardTitle>
              <CardDescription>Introduction to CBT principles and techniques</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600 mb-3">
                A five-part video series explaining how thoughts affect emotions and behaviors, with practical CBT exercises.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Video className="h-4 w-4" />
                <span>5 videos (45 min total)</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full flex items-center gap-1 group">
                Watch Series <ExternalLink className="h-4 w-4 ml-1 group-hover:scale-110 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <Badge className="w-fit bg-green-100 text-green-700 hover:bg-green-200">Guide</Badge>
              <CardTitle className="mt-2">Building Resilience: Skills for Mental Toughness</CardTitle>
              <CardDescription>Practical exercises to develop psychological resilience</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600 mb-3">
                Resilience skills that can be practiced daily to improve your ability to handle stress and adversity.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileText className="h-4 w-4" />
                <span>15 minute read + exercises</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full flex items-center gap-1 group">
                Access Guide <ExternalLink className="h-4 w-4 ml-1 group-hover:scale-110 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <Badge className="w-fit bg-purple-100 text-purple-700 hover:bg-purple-200">Podcast</Badge>
              <CardTitle className="mt-2">Mindfulness in Daily Life</CardTitle>
              <CardDescription>Integrating mindfulness practices into your routine</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600 mb-3">
                A practical discussion on incorporating mindfulness into everyday activities for reduced stress and better focus.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Headphones className="h-4 w-4" />
                <span>6 episodes (20-30 min each)</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full flex items-center gap-1 group">
                Listen Now <ExternalLink className="h-4 w-4 ml-1 group-hover:scale-110 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Support Communities */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-[#9b87f5]" />
          Support Communities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="p-2 rounded-full bg-blue-100 w-fit">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="mt-2">Anxiety Support Forum</CardTitle>
              <CardDescription>Connect with others managing anxiety</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600">
                A moderated community where members share experiences and coping strategies for anxiety disorders.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Visit Forum</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="p-2 rounded-full bg-green-100 w-fit">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="mt-2">Virtual Support Groups</CardTitle>
              <CardDescription>Scheduled group sessions with facilitators</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600">
                Weekly video meetings focused on specific mental health topics, led by trained peer supporters.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Schedule</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-[#9b87f5]/30 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="p-2 rounded-full bg-purple-100 w-fit">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="mt-2">Peer Support Network</CardTitle>
              <CardDescription>One-on-one conversations with trained peers</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600">
                Get matched with a trained peer supporter for personalized encouragement and understanding.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Find Support</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Professional Help Resources */}
      <div className="bg-[#9b87f5]/10 p-6 rounded-lg border border-[#9b87f5]/30 mt-8">
        <h3 className="font-semibold text-lg mb-3">Finding Professional Help</h3>
        <p className="text-gray-700 mb-4">
          While self-help resources are valuable, sometimes professional support is needed. 
          Use these directories to find qualified mental health professionals in your area.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="outline" className="bg-white text-[#9b87f5] border-[#9b87f5]/30 hover:bg-[#9b87f5]/5">
            Therapist Directory
          </Button>
          <Button variant="outline" className="bg-white text-[#9b87f5] border-[#9b87f5]/30 hover:bg-[#9b87f5]/5">
            Teletherapy Options
          </Button>
          <Button variant="outline" className="bg-white text-[#9b87f5] border-[#9b87f5]/30 hover:bg-[#9b87f5]/5">
            Crisis Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesTab;
