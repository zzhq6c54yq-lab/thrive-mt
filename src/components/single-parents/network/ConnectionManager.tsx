import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { ParentConnection } from "@/types/database-extensions";
import { Users, UserPlus, Check, X } from "lucide-react";

const ConnectionManager: React.FC = () => {
  const [connections, setConnections] = useState<ParentConnection[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await (supabase as any)
        .from('parent_connections')
        .select('*')
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`);

      if (error) {
        // Check if table doesn't exist yet
        if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
          console.log('Parent connections feature not yet configured');
          return;
        }
        throw error;
      }

      const accepted = ((data || []) as unknown as ParentConnection[]).filter(c => c.status === 'accepted');
      const pending = ((data || []) as unknown as ParentConnection[]).filter(c => c.status === 'pending');

      setConnections(accepted);
      setPendingRequests(pending);
    } catch (error) {
      console.error('Error loading connections:', error);
      toast({
        title: "Error",
        description: "Failed to load connections",
        variant: "destructive"
      });
    }
  };

  const sendRequest = async () => {
    if (!searchEmail) return;

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(searchEmail)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Find user by email in profiles table
      const { data: recipientProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', searchEmail.toLowerCase().trim())
        .maybeSingle();

      if (profileError) throw profileError;

      if (!recipientProfile) {
        toast({
          title: "User not found",
          description: "No user found with that email address",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Check if trying to connect with self
      if (recipientProfile.id === user.id) {
        toast({
          title: "Invalid request",
          description: "You cannot connect with yourself",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Check if connection already exists
      const { data: existingConnection } = await (supabase as any)
        .from('parent_connections')
        .select('id, status')
        .or(`and(requester_id.eq.${user.id},recipient_id.eq.${recipientProfile.id}),and(requester_id.eq.${recipientProfile.id},recipient_id.eq.${user.id})`)
        .maybeSingle();

      if (existingConnection) {
        if (existingConnection.status === 'pending') {
          toast({
            title: "Request pending",
            description: "A connection request is already pending",
            variant: "destructive"
          });
        } else if (existingConnection.status === 'accepted') {
          toast({
            title: "Already connected",
            description: "You are already connected with this user",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Connection exists",
            description: "A connection with this user already exists",
            variant: "destructive"
          });
        }
        setIsLoading(false);
        return;
      }

      // Create connection request
      const { error } = await (supabase as any).from('parent_connections').insert({
        requester_id: user.id,
        recipient_id: recipientProfile.id,
        connection_type: 'support-friend',
        status: 'pending'
      });

      if (error) throw error;

      toast({
        title: "Request sent",
        description: `Connection request sent to ${searchEmail}`
      });

      setSearchEmail("");
      loadConnections();
    } catch (error: any) {
      console.error('Error sending request:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send request",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const acceptRequest = async (connectionId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('parent_connections')
        .update({ status: 'accepted', accepted_at: new Date().toISOString() })
        .eq('id', connectionId);

      if (error) throw error;

      toast({
        title: "Connection accepted",
        description: "You are now connected"
      });

      loadConnections();
    } catch (error) {
      console.error('Error accepting request:', error);
      toast({
        title: "Error",
        description: "Failed to accept request",
        variant: "destructive"
      });
    }
  };

  const declineRequest = async (connectionId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('parent_connections')
        .update({ status: 'declined' })
        .eq('id', connectionId);

      if (error) throw error;

      loadConnections();
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Find Parents</h3>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email address"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="flex-1"
          />
          <Button onClick={sendRequest} disabled={isLoading || !searchEmail}>
            <UserPlus className="w-4 h-4 mr-2" />
            Connect
          </Button>
        </div>
      </div>

      {pendingRequests.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">Pending Requests</h3>
          <div className="space-y-2">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-foreground">Connection Request</p>
                  <p className="text-sm text-muted-foreground">{request.connection_type}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => acceptRequest(request.id)}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => declineRequest(request.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          My Connections ({connections.length})
        </h3>
        {connections.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No connections yet. Send a request to get started!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connections.map((connection) => (
              <Card key={connection.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{connection.nickname || 'Connection'}</p>
                    <p className="text-sm text-muted-foreground capitalize">{connection.connection_type.replace('-', ' ')}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionManager;
