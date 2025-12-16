import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Megaphone, Plus, Send, Eye, Trash2, Loader2, AlertTriangle, Info, AlertCircle, Wrench } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useUser } from '@/contexts/UserContext';

interface Broadcast {
  id: string;
  title: string;
  message: string;
  broadcast_type: string;
  target_audience: string;
  is_active: boolean;
  show_as_popup: boolean;
  created_at: string;
  expires_at: string | null;
}

const BroadcastManager: React.FC = () => {
  const { user } = useUser();
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [newBroadcast, setNewBroadcast] = useState({
    title: '',
    message: '',
    broadcast_type: 'info' as const,
    target_audience: 'all' as const,
    show_as_popup: true,
    expires_at: '',
  });

  useEffect(() => {
    fetchBroadcasts();
  }, []);

  const fetchBroadcasts = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_broadcasts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBroadcasts(data || []);
    } catch (error) {
      console.error('Error fetching broadcasts:', error);
      toast.error('Failed to load broadcasts');
    } finally {
      setLoading(false);
    }
  };

  const handleSendBroadcast = async () => {
    if (!newBroadcast.title.trim() || !newBroadcast.message.trim()) {
      toast.error('Please fill in title and message');
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase.from('admin_broadcasts').insert({
        title: newBroadcast.title,
        message: newBroadcast.message,
        broadcast_type: newBroadcast.broadcast_type,
        target_audience: newBroadcast.target_audience,
        show_as_popup: newBroadcast.show_as_popup,
        expires_at: newBroadcast.expires_at || null,
        created_by: user?.id,
      });

      if (error) throw error;

      toast.success('Broadcast sent successfully! It will appear on all user screens.');
      setDialogOpen(false);
      setNewBroadcast({
        title: '',
        message: '',
        broadcast_type: 'info',
        target_audience: 'all',
        show_as_popup: true,
        expires_at: '',
      });
      fetchBroadcasts();
    } catch (error) {
      console.error('Error sending broadcast:', error);
      toast.error('Failed to send broadcast');
    } finally {
      setSending(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('admin_broadcasts')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(currentStatus ? 'Broadcast deactivated' : 'Broadcast activated');
      fetchBroadcasts();
    } catch (error) {
      console.error('Error toggling broadcast:', error);
      toast.error('Failed to update broadcast');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this broadcast?')) return;

    try {
      const { error } = await supabase
        .from('admin_broadcasts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Broadcast deleted');
      fetchBroadcasts();
    } catch (error) {
      console.error('Error deleting broadcast:', error);
      toast.error('Failed to delete broadcast');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'maintenance': return <Wrench className="w-4 h-4 text-orange-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'maintenance': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#B87333]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-[#B87333]/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#B87333]" />
              Broadcast Messages
            </CardTitle>
            <CardDescription className="text-slate-400">
              Send announcements, warnings, or updates to all users instantly
            </CardDescription>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#B87333] hover:bg-[#A66323]">
                <Plus className="w-4 h-4 mr-2" />
                New Broadcast
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-[#B87333]/30 max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-[#B87333]" />
                  Send Broadcast Message
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  This message will appear as a popup on all user screens
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Title</Label>
                  <Input
                    id="title"
                    value={newBroadcast.title}
                    onChange={(e) => setNewBroadcast(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Important Update"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea
                    id="message"
                    value={newBroadcast.message}
                    onChange={(e) => setNewBroadcast(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Enter your broadcast message..."
                    className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Type</Label>
                    <Select
                      value={newBroadcast.broadcast_type}
                      onValueChange={(value: any) => setNewBroadcast(prev => ({ ...prev, broadcast_type: value }))}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Target Audience</Label>
                    <Select
                      value={newBroadcast.target_audience}
                      onValueChange={(value: any) => setNewBroadcast(prev => ({ ...prev, target_audience: value }))}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="clients">Clients Only</SelectItem>
                        <SelectItem value="therapists">Therapists Only</SelectItem>
                        <SelectItem value="coaches">Coaches Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expires" className="text-white">Expires At (Optional)</Label>
                  <Input
                    id="expires"
                    type="datetime-local"
                    value={newBroadcast.expires_at}
                    onChange={(e) => setNewBroadcast(prev => ({ ...prev, expires_at: e.target.value }))}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Show as Popup</Label>
                    <p className="text-sm text-slate-400">Display as modal overlay</p>
                  </div>
                  <Switch
                    checked={newBroadcast.show_as_popup}
                    onCheckedChange={(checked) => setNewBroadcast(prev => ({ ...prev, show_as_popup: checked }))}
                  />
                </div>

                <Button
                  onClick={handleSendBroadcast}
                  disabled={sending}
                  className="w-full bg-[#B87333] hover:bg-[#A66323]"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Broadcast
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        
        <CardContent>
          {broadcasts.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No broadcasts yet. Create your first announcement!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {broadcasts.map((broadcast) => (
                <Card key={broadcast.id} className={`bg-slate-900/50 border ${broadcast.is_active ? 'border-[#B87333]/30' : 'border-slate-700 opacity-60'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(broadcast.broadcast_type)}
                          <h4 className="text-white font-medium">{broadcast.title}</h4>
                          <Badge variant="outline" className={getTypeBadgeColor(broadcast.broadcast_type)}>
                            {broadcast.broadcast_type}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600">
                            {broadcast.target_audience}
                          </Badge>
                          {!broadcast.is_active && (
                            <Badge variant="outline" className="bg-slate-700/50 text-slate-500 border-slate-600">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm">{broadcast.message}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>Created: {new Date(broadcast.created_at).toLocaleString()}</span>
                          {broadcast.expires_at && (
                            <span>Expires: {new Date(broadcast.expires_at).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleActive(broadcast.id, broadcast.is_active)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(broadcast.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BroadcastManager;
