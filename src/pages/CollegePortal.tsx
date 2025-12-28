import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { 
  GraduationCap, 
  BookOpen, 
  Brain, 
  Users, 
  Coffee, 
  Calendar, 
  Clock, 
  Phone,
  MessageCircle,
  HeartPulse,
  FileText
} from "lucide-react";
import HomeButton from "@/components/HomeButton";

const CollegePortal: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const displayName = user?.email?.split('@')[0] || 'Student';

  const handleNavigate = (path: string) => {
    navigate(`/app/${path}`, { 
      state: { 
        fromSpecializedProgram: true, 
        preventTutorial: true 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.03%22/></svg>')] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <HomeButton />
        </div>
        
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-full backdrop-blur-sm">
              <GraduationCap className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome, {displayName}
              </h1>
              <p className="text-white/70">
                College Student Wellness Portal
              </p>
            </div>
          </div>
          <p className="text-white/60 max-w-2xl">
            Balance your academic success with mental wellness. Access resources designed specifically for the unique challenges of college life.
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Brain className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-white text-lg">Stress Check-In</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Quick assessment to evaluate your academic stress levels and get personalized tips.
              </p>
              <Button 
                onClick={() => handleNavigate("mental-wellness/assessments")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-violet-400" />
                </div>
                <CardTitle className="text-white text-lg">Peer Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Connect with other students facing similar challenges in a supportive environment.
              </p>
              <Button 
                onClick={() => handleNavigate("community-support")}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
              >
                Join Network
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Coffee className="h-5 w-5 text-indigo-400" />
                </div>
                <CardTitle className="text-white text-lg">Life Balance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Strategies for balancing studies, social life, work, and self-care.
              </p>
              <Button 
                onClick={() => handleNavigate("wellness-challenges")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Explore Tips
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-500/20 rounded-lg">
                  <HeartPulse className="h-5 w-5 text-pink-400" />
                </div>
                <CardTitle className="text-white text-lg">Mental Wellbeing</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Resources for anxiety, depression, and common mental health challenges students face.
              </p>
              <Button 
                onClick={() => handleNavigate("mental-wellness")}
                variant="outline"
                className="w-full border-pink-500/50 text-pink-300 hover:bg-pink-500/20"
              >
                Access Resources
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                </div>
                <CardTitle className="text-white text-lg">Workshops</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Join workshops on exam prep, mindfulness, and stress management for students.
              </p>
              <Button 
                onClick={() => handleNavigate("workshops")}
                variant="outline"
                className="w-full border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/20"
              >
                View Workshops
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card 
            className="bg-slate-800/30 border-purple-500/20 backdrop-blur-sm cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => handleNavigate("resource-library")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <span className="text-white/80">Study Resources</span>
            </CardContent>
          </Card>

          <Card 
            className="bg-slate-800/30 border-purple-500/20 backdrop-blur-sm cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => handleNavigate("mindfulness-sleep")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="h-5 w-5 text-purple-400" />
              <span className="text-white/80">Sleep & Mindfulness</span>
            </CardContent>
          </Card>

          <Card 
            className="bg-slate-800/30 border-purple-500/20 backdrop-blur-sm cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => handleNavigate("ai-companion")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-purple-400" />
              <span className="text-white/80">Talk to Henry AI</span>
            </CardContent>
          </Card>
        </div>

        {/* Crisis Support Banner */}
        <Card className="bg-gradient-to-r from-purple-800/60 to-violet-800/60 border-purple-400/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    988 Suicide & Crisis Lifeline
                  </h3>
                  <p className="text-white/80">
                    Free, confidential support available 24/7
                  </p>
                </div>
              </div>
              <Button 
                className="bg-white text-purple-700 hover:bg-white/90 font-semibold"
                onClick={() => window.open('tel:988', '_self')}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call 988
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollegePortal;
