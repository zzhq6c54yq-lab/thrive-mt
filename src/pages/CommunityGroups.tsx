import { useUser } from "@/contexts/UserContext";
import { useCommunityGroups } from "@/hooks/useCommunityGroups";
import GroupCard from "@/components/community/GroupCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunityGroups = () => {
  const { user } = useUser();
  const { groups, memberships, isLoading } = useCommunityGroups(user?.id);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredGroups = groups?.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const myGroupIds = memberships?.map(m => m.group_id) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading community groups...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/app/dashboard')}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#E8D4C0] via-[#D4A574] to-[#B87333] bg-clip-text text-transparent">
            Community Groups
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join supportive communities focused on shared challenges and growth.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search groups by name, category, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* My Groups */}
        {memberships && memberships.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">My Groups</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberships.map((membership) => (
                <GroupCard
                  key={membership.group_id}
                  group={membership.group}
                  isMember={true}
                  userId={user?.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Groups */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {memberships && memberships.length > 0 ? "Discover More Groups" : "All Groups"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups?.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                isMember={myGroupIds.includes(group.id)}
                userId={user?.id}
              />
            ))}
          </div>
        </div>

        {filteredGroups?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No groups found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityGroups;
