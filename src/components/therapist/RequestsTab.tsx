import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Phone, Video, Check, X, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface TherapistRequest {
  id: string;
  user_id: string;
  request_type: string;
  message: string;
  video_url?: string;
  status: string;
  priority: string;
  created_at: string;
  profiles?: {
    display_name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function RequestsTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState<TherapistRequest | null>(null);
  const [responseMessage, setResponseMessage] = useState('');

  // Get current therapist
  const { data: therapist } = useQuery({
    queryKey: ['therapist-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Get all pending requests
  const { data: requests, isLoading } = useQuery({
    queryKey: ['therapist-requests', therapist?.id],
    queryFn: async () => {
      if (!therapist?.id) return [];

      const { data: requestsData, error } = await supabase
        .from('therapist_requests')
        .select('*')
        .eq('therapist_id', therapist.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!requestsData) return [];

      // Fetch profiles separately
      const userIds = requestsData.map(r => r.user_id);
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, display_name, email, avatar_url')
        .in('id', userIds);

      const profileMap = new Map(profilesData?.map(p => [p.id, p]) || []);

      return requestsData.map(req => ({
        ...req,
        profiles: profileMap.get(req.user_id)
      })) as TherapistRequest[];
    },
    enabled: !!therapist?.id
  });

  // Accept request mutation
  const acceptMutation = useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await supabase
        .from('therapist_requests')
        .update({ 
          status: 'accepted',
          responded_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      // Send notification to user
      const request = requests?.find(r => r.id === requestId);
      if (request) {
        await supabase
          .from('cross_dashboard_notifications')
          .insert({
            recipient_id: request.user_id,
            sender_id: therapist?.user_id,
            sender_type: 'therapist',
            notification_type: 'request_accepted',
            title: 'Request Accepted',
            message: `Dr. ${therapist?.name} has accepted your request and will be in touch soon.`,
            link: '/dashboard'
          });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['therapist-requests'] });
      toast({
        title: 'Request accepted',
        description: 'The client has been notified.'
      });
      setSelectedRequest(null);
    }
  });

  // Decline request mutation
  const declineMutation = useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await supabase
        .from('therapist_requests')
        .update({ 
          status: 'declined',
          responded_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['therapist-requests'] });
      toast({
        title: 'Request declined',
        description: 'The request has been marked as declined.'
      });
      setSelectedRequest(null);
    }
  });

  // Start video call
  const handleStartCall = (request: TherapistRequest) => {
    const sessionId = `session_${request.user_id}_${Date.now()}`;
    navigate(`/app/therapist-video-session/${sessionId}`);
    
    // Mark request as completed
    supabase
      .from('therapist_requests')
      .update({ status: 'completed' })
      .eq('id', request.id);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">High Priority</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'video_message':
        return <Video className="w-5 h-5 text-[#D4AF37]" />;
      case 'callback_request':
        return <Phone className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <MessageSquare className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  const pendingRequests = requests?.filter(r => r.status === 'pending') || [];
  const otherRequests = requests?.filter(r => r.status !== 'pending') || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          Pending Requests
          {pendingRequests.length > 0 && (
            <Badge className="bg-[#D4AF37]">{pendingRequests.length}</Badge>
          )}
        </h2>

        {pendingRequests.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No pending requests</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow border-[#D4AF37]/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        {request.profiles?.avatar_url ? (
                          <img 
                            src={request.profiles.avatar_url} 
                            alt={request.profiles.display_name} 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-[#D4AF37]" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {request.profiles?.display_name || 'New Client'}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {request.profiles?.email}
                        </p>
                      </div>
                    </div>
                    {getPriorityBadge(request.priority)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {getRequestIcon(request.request_type)}
                    <span className="capitalize">{request.request_type.replace('_', ' ')}</span>
                    <span>•</span>
                    <span>{format(new Date(request.created_at), 'MMM d, h:mm a')}</span>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm">{request.message}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => acceptMutation.mutate(request.id)}
                      disabled={acceptMutation.isPending}
                      className="flex-1"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="gold"
                      onClick={() => handleStartCall(request)}
                      className="flex-1"
                    >
                      <Video className="w-4 h-4 mr-1" />
                      Call Now
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => declineMutation.mutate(request.id)}
                      disabled={declineMutation.isPending}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Previous Requests */}
      {otherRequests.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Previous Requests</h2>
          <div className="space-y-2">
            {otherRequests.map((request) => (
              <Card key={request.id} className="opacity-60">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getRequestIcon(request.request_type)}
                      <div>
                        <p className="font-medium">{request.profiles?.display_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(request.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <Badge variant={request.status === 'accepted' ? 'default' : 'secondary'}>
                      {request.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}