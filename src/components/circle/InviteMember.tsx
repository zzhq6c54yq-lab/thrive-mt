import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSupportCircle } from "@/hooks/useSupportCircle";

const InviteMember = ({ userId }: { userId?: string }) => {
  const { inviteMember } = useSupportCircle(userId);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("family");

  const handleInvite = () => {
    inviteMember.mutate({ 
      member_email: email, 
      member_name: name, 
      relationship 
    }, {
      onSuccess: () => { setEmail(""); setName(""); }
    });
  };

  return (
    <Card className="p-6 glass-card">
      <h3 className="text-lg font-bold gradient-heading mb-4">Invite Member</h3>
      <div className="space-y-4">
        <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div><Label>Relationship</Label>
          <select value={relationship} onChange={(e) => setRelationship(e.target.value)} className="w-full px-3 py-2 rounded-md border border-input bg-background">
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="caregiver">Caregiver</option>
          </select>
        </div>
        <Button onClick={handleInvite} className="w-full" disabled={!email || !name || inviteMember.isPending}>
          {inviteMember.isPending ? "Sending..." : "Send Invitation"}
        </Button>
      </div>
    </Card>
  );
};

export default InviteMember;
