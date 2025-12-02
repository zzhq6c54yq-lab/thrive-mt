import { useUser } from "@/contexts/UserContext";
import { useBuddyMatch } from "@/hooks/useBuddyMatch";
import BuddyMatchingFlow from "@/components/buddy/BuddyMatchingFlow";
import BuddyDashboard from "@/components/buddy/BuddyDashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, MessageCircle, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BuddySystem = () => {
  const { user } = useUser();
  const { currentMatch, isLoading } = useBuddyMatch(user?.id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading buddy system...</div>
      </div>
    );
  }

  if (currentMatch) {
    return <BuddyDashboard match={currentMatch} userId={user?.id} />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/app/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold gradient-heading">
            Accountability Buddy System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with someone who shares your goals. Support each other, celebrate wins, and stay accountable together.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 glass-card text-center space-y-3">
            <Users className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Matched Support</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered matching based on goals and preferences
            </p>
          </Card>

          <Card className="p-6 glass-card text-center space-y-3">
            <Target className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Shared Goals</h3>
            <p className="text-sm text-muted-foreground">
              Track progress on joint challenges together
            </p>
          </Card>

          <Card className="p-6 glass-card text-center space-y-3">
            <MessageCircle className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Secure Messaging</h3>
            <p className="text-sm text-muted-foreground">
              Private, real-time communication with your buddy
            </p>
          </Card>

          <Card className="p-6 glass-card text-center space-y-3">
            <TrendingUp className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Mutual Growth</h3>
            <p className="text-sm text-muted-foreground">
              Celebrate milestones and keep each other motivated
            </p>
          </Card>
        </div>

        {/* Matching Flow */}
        <BuddyMatchingFlow userId={user?.id} />
      </div>
    </div>
  );
};

export default BuddySystem;
