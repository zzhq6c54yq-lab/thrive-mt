import { useUser } from "@/contexts/UserContext";
import { useSupportCircle } from "@/hooks/useSupportCircle";
import CreateCircle from "@/components/circle/CreateCircle";
import InviteMember from "@/components/circle/InviteMember";
import CircleMemberCard from "@/components/circle/CircleMemberCard";
import { Card } from "@/components/ui/card";
import { Shield, Users, Bell, Lock } from "lucide-react";

const SupportCircle = () => {
  const { user } = useUser();
  const { members, isLoading } = useSupportCircle(user?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading support circle...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold gradient-heading">
            Support Circle
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Invite family and caregivers to be part of your journey. Share what you choose, protect your privacy.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 glass-card text-center space-y-3">
            <Users className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Family Support</h3>
            <p className="text-sm text-muted-foreground">
              Keep loved ones informed and connected
            </p>
          </Card>

          <Card className="p-6 glass-card text-center space-y-3">
            <Lock className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Privacy Control</h3>
            <p className="text-sm text-muted-foreground">
              Choose exactly what each person can see
            </p>
          </Card>

          <Card className="p-6 glass-card text-center space-y-3">
            <Bell className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Emergency Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Notify circle members during crisis moments
            </p>
          </Card>

          <Card className="p-6 glass-card text-center space-y-3">
            <Shield className="w-12 h-12 mx-auto text-primary" />
            <h3 className="font-semibold">Care Coordination</h3>
            <p className="text-sm text-muted-foreground">
              Help supporters stay aligned with your needs
            </p>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Support Circle Info */}
          <Card className="p-6 glass-card">
            <h2 className="text-2xl font-bold gradient-heading mb-4">My Support Circle</h2>
            <p className="text-muted-foreground">
              {members?.length || 0} member{members?.length !== 1 ? 's' : ''}
            </p>
          </Card>

          {/* Invite New Member */}
          <InviteMember userId={user?.id} />

          {/* Members List */}
          {members && members.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">Circle Members</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {members.map((member: any) => (
                  <CircleMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportCircle;
