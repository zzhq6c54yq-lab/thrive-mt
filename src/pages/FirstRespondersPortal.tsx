import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { 
  Flame, 
  Shield, 
  HeartPulse, 
  Users, 
  AlertCircle, 
  Calendar, 
  Phone,
  MessageCircle,
  BookOpen,
  Brain
} from "lucide-react";
import HomeButton from "@/components/HomeButton";

const FirstRespondersPortal: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const displayName = user?.email?.split('@')[0] || 'Responder';

  const handleNavigate = (path: string) => {
    navigate(`/app/${path}`, { 
      state: { 
        fromSpecializedProgram: true, 
        preventTutorial: true 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-amber-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.03%22/></svg>')] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <HomeButton />
        </div>
        
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-500/20 rounded-full backdrop-blur-sm">
              <Flame className="h-8 w-8 text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome, {displayName}
              </h1>
              <p className="text-white/70">
                First Responders Wellness Portal
              </p>
            </div>
          </div>
          <p className="text-white/60 max-w-2xl">
            Specialized mental wellness resources designed for firefighters, paramedics, EMTs, and emergency personnel who serve our communities.
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-red-500/30 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <HeartPulse className="h-5 w-5 text-red-400" />
                </div>
                <CardTitle className="text-white text-lg">Stress Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Access specialized tools for managing first responder-specific stress and trauma.
              </p>
              <Button 
                onClick={() => handleNavigate("mental-wellness")}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Access Resources
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-red-500/30 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-orange-400" />
                </div>
                <CardTitle className="text-white text-lg">Peer Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Connect with fellow first responders who understand the job's unique challenges.
              </p>
              <Button 
                onClick={() => handleNavigate("community-support")}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                Join Network
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-red-500/30 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-amber-400" />
                </div>
                <CardTitle className="text-white text-lg">Critical Incident Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Immediate support and resources for processing critical incidents.
              </p>
              <Button 
                onClick={() => handleNavigate("crisis-support")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                Get Support
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-red-500/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Brain className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-white text-lg">Wellness Assessments</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                PTSD screening, stress evaluations, and burnout assessments tailored for first responders.
              </p>
              <Button 
                onClick={() => handleNavigate("mental-wellness/assessments")}
                variant="outline"
                className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              >
                Take Assessment
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-red-500/30 backdrop-blur-sm">
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
                Join workshops on resilience, family support, and trauma processing.
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
            className="bg-slate-800/30 border-red-500/20 backdrop-blur-sm cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => handleNavigate("resource-library")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-red-400" />
              <span className="text-white/80">Resource Library</span>
            </CardContent>
          </Card>

          <Card 
            className="bg-slate-800/30 border-red-500/20 backdrop-blur-sm cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => handleNavigate("mindfulness-sleep")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <Shield className="h-5 w-5 text-red-400" />
              <span className="text-white/80">Sleep & Recovery</span>
            </CardContent>
          </Card>

          <Card 
            className="bg-slate-800/30 border-red-500/20 backdrop-blur-sm cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => handleNavigate("ai-companion")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-red-400" />
              <span className="text-white/80">Talk to Henry AI</span>
            </CardContent>
          </Card>
        </div>

        {/* Crisis Support Banner */}
        <Card className="bg-gradient-to-r from-red-800/60 to-orange-800/60 border-red-400/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    First Responder Support Line
                  </h3>
                  <p className="text-white/80">
                    Confidential support from those who understand the job
                  </p>
                </div>
              </div>
              <Button 
                className="bg-white text-red-700 hover:bg-white/90 font-semibold"
                onClick={() => window.open('tel:1-844-587-4357', '_self')}
              >
                <Phone className="h-4 w-4 mr-2" />
                1-844-587-4357
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FirstRespondersPortal;
