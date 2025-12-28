import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { 
  Heart, 
  Users, 
  BookOpen, 
  Calendar, 
  Brain, 
  Phone, 
  MessageCircle,
  Sparkles,
  Clock,
  FileText
} from "lucide-react";
import HomeButton from "@/components/HomeButton";

const SingleParentsPortal: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const displayName = user?.email?.split('@')[0] || 'Parent';

  const handleNavigate = (path: string) => {
    navigate(`/app/${path}`, { 
      state: { 
        fromSpecializedProgram: true, 
        preventTutorial: true 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23FFFFFF%22 fill-opacity=%220.03%22/></svg>')] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <HomeButton />
        </div>
        
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-rose-500/20 rounded-full backdrop-blur-sm">
              <Heart className="h-8 w-8 text-rose-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome, {displayName}
              </h1>
              <p className="text-white/70">
                Single Parents Wellness Portal
              </p>
            </div>
          </div>
          <p className="text-white/60 max-w-2xl">
            You're doing an incredible job. This portal is here to support you every step of the way with resources tailored for single parents.
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-rose-500/30 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/20 rounded-lg">
                  <Brain className="h-5 w-5 text-rose-400" />
                </div>
                <CardTitle className="text-white text-lg">Wellness Check-In</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Take a quick assessment to check in with yourself and get personalized recommendations.
              </p>
              <Button 
                onClick={() => handleNavigate("mental-wellness/assessments")}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white"
              >
                Start Check-In
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-rose-500/30 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-pink-400" />
                </div>
                <CardTitle className="text-white text-lg">Parent Network</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Connect with other single parents for shared support and community.
              </p>
              <Button 
                onClick={() => handleNavigate("community-support")}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              >
                Join Community
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-rose-500/30 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-white text-lg">Self-Care Tools</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Quick self-care resources designed for busy single parents.
              </p>
              <Button 
                onClick={() => handleNavigate("holistic-wellness")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Explore Tools
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-rose-500/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-400" />
                </div>
                <CardTitle className="text-white text-lg">Time Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm mb-4">
                Strategies for balancing work, family, and personal time effectively.
              </p>
              <Button 
                onClick={() => handleNavigate("resource-library")}
                variant="outline"
                className="w-full border-amber-500/50 text-amber-300 hover:bg-amber-500/20"
              >
                View Strategies
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-rose-500/30 backdrop-blur-sm">
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
                Join live workshops on parenting, stress management, and work-life balance.
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
            className="bg-slate-800/30 border-rose-500/20 backdrop-blur-sm cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => handleNavigate("resource-library")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-rose-400" />
              <span className="text-white/80">Parenting Resources</span>
            </CardContent>
          </Card>

          <Card 
            className="bg-slate-800/30 border-rose-500/20 backdrop-blur-sm cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => handleNavigate("financial-wellness")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <FileText className="h-5 w-5 text-rose-400" />
              <span className="text-white/80">Financial Wellness</span>
            </CardContent>
          </Card>

          <Card 
            className="bg-slate-800/30 border-rose-500/20 backdrop-blur-sm cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => handleNavigate("ai-companion")}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-rose-400" />
              <span className="text-white/80">Talk to Henry AI</span>
            </CardContent>
          </Card>
        </div>

        {/* Crisis Support Banner */}
        <Card className="bg-gradient-to-r from-rose-800/60 to-pink-800/60 border-rose-400/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Parents Helpline
                  </h3>
                  <p className="text-white/80">
                    Free support available 24/7 for parenting challenges
                  </p>
                </div>
              </div>
              <Button 
                className="bg-white text-rose-700 hover:bg-white/90 font-semibold"
                onClick={() => window.open('tel:1-855-427-2736', '_self')}
              >
                <Phone className="h-4 w-4 mr-2" />
                1-855-427-2736
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleParentsPortal;
