import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Heart, Users, Calendar, Book, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const FirstRespondersWelcome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const navigateToPortal = () => {
    navigate("/first-responders-portal");
  };

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
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Welcome, First Responders</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Your dedication and service are deeply appreciated. Access resources and support tailored to your unique needs.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#B87333]" />
                Dedicated Support Portal
              </CardTitle>
              <CardDescription>Access resources, tools, and support designed for first responders.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Explore specialized content on stress management, peer support, and critical incident resources.
              </p>
              <Button className="w-full bg-[#B87333] hover:bg-[#B87333]/90" onClick={navigateToPortal}>
                Go to Support Portal
              </Button>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#B87333]" />
                  Mental Health Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Access tools for stress reduction, resilience building, and mental wellness.</p>
                <Button variant="outline" className="w-full">
                  Explore Resources
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#B87333]" />
                  Peer Support Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Connect with fellow first responders for support and shared experiences.</p>
                <Button variant="outline" className="w-full">
                  Find Support
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#B87333]" />
                  Upcoming Workshops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Register for workshops on critical incident stress management and resilience.</p>
                <Button className="w-full bg-[#B87333] hover:bg-[#B87333]/90">
                  View Workshops
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-[#B87333]" />
                  Resource Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Access articles, guides, and tools for personal and professional well-being.</p>
                <Button variant="outline" className="w-full">
                  Browse Library
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-[#B87333]" />
                  Guided Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Explore mindfulness and meditation exercises tailored for first responders.</p>
                <Button variant="outline" className="w-full">
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstRespondersWelcome;
