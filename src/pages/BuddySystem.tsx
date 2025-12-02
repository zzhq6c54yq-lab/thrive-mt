import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useBuddyMatch } from "@/hooks/useBuddyMatch";
import EnhancedBuddyMatchingFlow from "@/components/buddy/EnhancedBuddyMatchingFlow";
import PeerVolunteerSignup from "@/components/buddy/PeerVolunteerSignup";
import BuddyDashboard from "@/components/buddy/BuddyDashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, MessageCircle, TrendingUp, ArrowLeft, Heart, HandHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BuddySystem = () => {
  const { user } = useUser();
  const { currentMatch, isLoading } = useBuddyMatch(user?.id);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("find-buddy");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-white">Loading buddy system...</div>
      </div>
    );
  }

  if (currentMatch) {
    return <BuddyDashboard match={currentMatch} userId={user?.id} />;
  }

  return (
    <div className="min-h-screen bg-[#000000] p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/app/dashboard')}
          className="mb-4 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#E8D4C0] via-[#D4A574] to-[#B87333] bg-clip-text text-transparent">
            Accountability Buddy System
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect with someone who shares your goals. Support each other, celebrate wins, and stay accountable together.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 bg-gray-900/50 border-[#D4AF37]/30 text-center space-y-3">
            <Users className="w-12 h-12 mx-auto text-[#D4AF37]" />
            <h3 className="font-semibold text-white">Matched Support</h3>
            <p className="text-sm text-gray-400">
              AI-powered matching based on goals and preferences
            </p>
          </Card>

          <Card className="p-6 bg-gray-900/50 border-[#D4AF37]/30 text-center space-y-3">
            <Target className="w-12 h-12 mx-auto text-[#D4AF37]" />
            <h3 className="font-semibold text-white">Shared Goals</h3>
            <p className="text-sm text-gray-400">
              Track progress on joint challenges together
            </p>
          </Card>

          <Card className="p-6 bg-gray-900/50 border-[#D4AF37]/30 text-center space-y-3">
            <MessageCircle className="w-12 h-12 mx-auto text-[#D4AF37]" />
            <h3 className="font-semibold text-white">Secure Messaging</h3>
            <p className="text-sm text-gray-400">
              Private, real-time communication with your buddy
            </p>
          </Card>

          <Card className="p-6 bg-gray-900/50 border-[#D4AF37]/30 text-center space-y-3">
            <TrendingUp className="w-12 h-12 mx-auto text-[#D4AF37]" />
            <h3 className="font-semibold text-white">Mutual Growth</h3>
            <p className="text-sm text-gray-400">
              Celebrate milestones and keep each other motivated
            </p>
          </Card>
        </div>

        {/* Tabs for Find Buddy vs Become Volunteer */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-gray-800/50">
            <TabsTrigger 
              value="find-buddy" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B87333] data-[state=active]:to-[#D4AF37] data-[state=active]:text-black"
            >
              <Users className="w-4 h-4 mr-2" />
              Find a Buddy
            </TabsTrigger>
            <TabsTrigger 
              value="volunteer"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B87333] data-[state=active]:to-[#D4AF37] data-[state=active]:text-black"
            >
              <HandHeart className="w-4 h-4 mr-2" />
              Become a Volunteer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="find-buddy" className="mt-8">
            <EnhancedBuddyMatchingFlow userId={user?.id} />
          </TabsContent>
          
          <TabsContent value="volunteer" className="mt-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-6 h-6 text-[#D4AF37]" />
                <h2 className="text-2xl font-bold text-white">Help Others on Their Journey</h2>
              </div>
              <p className="text-gray-400 max-w-xl mx-auto">
                Your experiences can help others. Become a peer volunteer and make a meaningful difference in someone's mental health journey.
              </p>
            </div>
            <PeerVolunteerSignup userId={user?.id} onComplete={() => setActiveTab("find-buddy")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuddySystem;
