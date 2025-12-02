import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle } from "lucide-react";
import { useCommunityGroups } from "@/hooks/useCommunityGroups";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface GroupCardProps {
  group: any;
  isMember: boolean;
  userId?: string;
}

const GroupCard = ({ group, isMember, userId }: GroupCardProps) => {
  const { joinGroup, leaveGroup } = useCommunityGroups(userId);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = () => {
    if (isMember) {
      leaveGroup.mutate(group.id);
    } else {
      if (!userId) {
        toast({
          title: "Please Log In",
          description: "You need to be logged in to join groups.",
          variant: "destructive",
        });
        return;
      }
      joinGroup.mutate(group.id);
    }
  };

  return (
    <Card className="p-6 glass-card hover:scale-[1.02] transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{group.name}</h3>
          <span className="text-xs text-muted-foreground px-2 py-1 bg-primary/10 rounded-full">
            {group.category}
          </span>
        </div>
        <div className="text-muted-foreground flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span className="text-sm">{group.member_count || 0}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {group.description}
      </p>

      <div className="flex gap-2">
        {isMember ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2"
              onClick={() => navigate(`/app/community-groups/${group.id}`)}
            >
              <MessageCircle className="w-4 h-4" />
              Open
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAction}
              disabled={leaveGroup.isPending}
            >
              Leave
            </Button>
          </>
        ) : (
          <Button
            className="w-full"
            size="sm"
            onClick={handleAction}
            disabled={joinGroup.isPending}
          >
            {joinGroup.isPending ? "Joining..." : "Join Group"}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default GroupCard;
