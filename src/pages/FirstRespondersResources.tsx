import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Book, Heart, Users, Download, ExternalLink, Video, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const FirstRespondersResources = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/first-responders-portal" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portal
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">First Responders Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Access a variety of resources tailored to support first responders.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Resource Card 1 */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Book className="h-5 w-5 text-[#B87333]" />
                Mental Health Guides
              </CardTitle>
              <CardDescription className="text-gray-500">Comprehensive guides on managing stress and mental health.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Stress Management Techniques <Download className="h-4 w-4" />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Understanding PTSD <Download className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Resource Card 2 */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#B87333]" />
                Wellness Programs
              </CardTitle>
              <CardDescription className="text-gray-500">Explore programs designed to enhance overall wellness.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Mindfulness and Meditation <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Physical Fitness Resources <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Resource Card 3 */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-[#B87333]" />
                Peer Support Networks
              </CardTitle>
              <CardDescription className="text-gray-500">Connect with other first responders for support and guidance.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Join a Support Group <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Find a Mentor <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Resource Card 4 */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Video className="h-5 w-5 text-[#B87333]" />
                Training Videos
              </CardTitle>
              <CardDescription className="text-gray-500">Access training videos on stress management and resilience.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Resilience Training <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Conflict Resolution <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Resource Card 5 */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#B87333]" />
                Articles and Research
              </CardTitle>
              <CardDescription className="text-gray-500">Read articles and research on first responder mental health.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Latest Research Findings <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Mental Health in Emergency Services <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Resource Card 6 */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#B87333]" />
                Confidential Support
              </CardTitle>
              <CardDescription className="text-gray-500">Access confidential support services for first responders.</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Confidential Counseling <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <a href="#" className="text-blue-500 hover:underline flex items-center gap-1">
                    Crisis Hotline <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FirstRespondersResources;
