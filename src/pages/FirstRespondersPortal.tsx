import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Users, Calendar, Book, Heart, Headphones, Activity, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const FirstRespondersPortal = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">First Responders Portal</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Access resources and support tailored for first responders.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mental Health & Wellness */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#B87333]" />
                Mental Health & Wellness
              </CardTitle>
              <CardDescription>Tools and resources for mental well-being.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="secondary" asChild>
                  <Link to="/first-responders/stress-management" className="w-full text-left">
                    Stress Management Techniques
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/journaling" className="w-full text-left">
                    Journaling Prompts
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/mindfulness-sleep" className="w-full text-left">
                    Mindfulness & Sleep Exercises
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/binaural-beats" className="w-full text-left">
                    Binaural Beats for Focus
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/mental-wellness/assessments" className="w-full text-left">
                    Mental Health Assessments
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Peer & Critical Support */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#B87333]" />
                Peer & Critical Support
              </CardTitle>
              <CardDescription>Connect with peers and access critical support services.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="secondary" asChild>
                  <Link to="/first-responders/peer-support" className="w-full text-left">
                    Peer Support Groups
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/community-support" className="w-full text-left">
                    Online Community Forum
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/virtual-meetings" className="w-full text-left">
                    Virtual Support Meetings
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/real-time-therapy" className="w-full text-left">
                    Real-Time Therapy Options
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/first-responders/critical-support" className="w-full text-left">
                    Critical Incident Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resources & Education */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-[#B87333]" />
                Resources & Education
              </CardTitle>
              <CardDescription>Access articles, guides, and educational content.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="secondary" asChild>
                  <Link to="/first-responders-resources" className="w-full text-left">
                    Informational Articles
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/workshops" className="w-full text-left">
                    Upcoming Workshops
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/resource-library" className="w-full text-left">
                    Resource Library
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/alternative-therapies" className="w-full text-left">
                    Alternative Therapies
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/wellness-challenges" className="w-full text-left">
                    Wellness Challenges
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Holistic Wellness */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#B87333]" />
                Holistic Wellness
              </CardTitle>
              <CardDescription>Explore holistic approaches to well-being.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="secondary" asChild>
                  <Link to="/holistic-wellness" className="w-full text-left">
                    Holistic Wellness Overview
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/alternative-therapies" className="w-full text-left">
                    Explore Alternative Therapies
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/guided-practice/mindfulness" className="w-full text-left">
                    Guided Mindfulness Practices
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calendar & Scheduling */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#B87333]" />
                Calendar & Scheduling
              </CardTitle>
              <CardDescription>Schedule appointments and manage your wellness activities.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="secondary" asChild>
                  <Link to="/virtual-meetings" className="w-full text-left">
                    Schedule Virtual Meetings
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/workshops" className="w-full text-left">
                    View Upcoming Workshops
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/real-time-therapy" className="w-full text-left">
                    Book Therapy Sessions
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-[#B87333]" />
                Additional Resources
              </CardTitle>
              <CardDescription>Explore more tools and resources for support.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="secondary" asChild>
                  <Link to="/video-diary" className="w-full text-left">
                    Video Diary
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/games-and-quizzes" className="w-full text-left">
                    Games and Quizzes
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/contact" className="w-full text-left">
                    Contact Support
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/crisis-support" className="w-full text-left">
                    Crisis Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FirstRespondersPortal;
