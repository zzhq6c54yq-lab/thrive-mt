import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FileCheck, AlertTriangle, CheckCircle, Search, RefreshCw, Users, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { CURRENT_TERMS_VERSION, TERMS_CHANGELOG } from '@/lib/termsVersion';

interface UserConsent {
  id: string;
  display_name: string | null;
  email: string | null;
  terms_version: string | null;
  consent_accepted_at: string | null;
  created_at: string;
}

export default function ConsentStatusTab() {
  const [users, setUsers] = useState<UserConsent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchConsentData();
  }, []);

  const fetchConsentData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, email, terms_version, consent_accepted_at, created_at')
        .order('created_at', { ascending: false })
        .limit(500);

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching consent data:', error);
      toast.error('Failed to load consent data');
    } finally {
      setLoading(false);
    }
  };

  const pendingReconsent = users.filter(u => 
    !u.terms_version || u.terms_version < CURRENT_TERMS_VERSION
  );
  
  const currentConsent = users.filter(u => 
    u.terms_version === CURRENT_TERMS_VERSION
  );

  const filteredUsers = users.filter(u =>
    (u.display_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-[#D4A574]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-[#D4A574]" />
            Terms & Consent Tracking
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Track user consent status and terms version compliance
          </p>
        </div>
        <Button
          variant="outline"
          onClick={fetchConsentData}
          className="border-[#B87333]/30"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Current Version Info */}
      <Card className="p-4 bg-gradient-to-r from-[#B87333]/20 to-[#D4A574]/10 border-[#B87333]/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">Current Terms Version</h3>
            <p className="text-sm text-muted-foreground">{TERMS_CHANGELOG[0]?.summary}</p>
          </div>
          <Badge className="bg-[#B87333] text-white text-lg px-4 py-1">
            v{CURRENT_TERMS_VERSION}
          </Badge>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-card/50 border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{users.length}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card/50 border-green-500/30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{currentConsent.length}</div>
              <div className="text-sm text-muted-foreground">Current Consent</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card/50 border-yellow-500/30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{pendingReconsent.length}</div>
              <div className="text-sm text-muted-foreground">Pending Re-consent</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card border-border/50"
        />
      </div>

      {/* Users Pending Re-consent */}
      {pendingReconsent.length > 0 && (
        <Card className="bg-card/50 border-yellow-500/30">
          <div className="p-4 border-b border-border/30">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Users Pending Re-consent ({pendingReconsent.length})
            </h3>
          </div>
          <div className="divide-y divide-border/30 max-h-60 overflow-y-auto">
            {pendingReconsent.slice(0, 20).map((user) => (
              <div key={user.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{user.display_name || 'Unnamed User'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                    v{user.terms_version || '0.0'}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last consent: {user.consent_accepted_at 
                      ? format(new Date(user.consent_accepted_at), 'MMM d, yyyy')
                      : 'Never'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* All Users Table */}
      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/30">
          <h3 className="font-medium text-foreground">All User Consent Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Terms Version
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Consent Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredUsers.slice(0, 50).map((user) => {
                const isCurrent = user.terms_version === CURRENT_TERMS_VERSION;
                return (
                  <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">{user.display_name || 'Unnamed'}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={isCurrent ? 'border-green-500/50' : 'border-yellow-500/50'}>
                        v{user.terms_version || 'N/A'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {isCurrent ? (
                        <span className="flex items-center gap-1 text-sm text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          Current
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-yellow-400">
                          <AlertTriangle className="w-4 h-4" />
                          Needs Update
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {user.consent_accepted_at 
                        ? format(new Date(user.consent_accepted_at), 'MMM d, yyyy HH:mm')
                        : 'Never'}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {format(new Date(user.created_at), 'MMM d, yyyy')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
