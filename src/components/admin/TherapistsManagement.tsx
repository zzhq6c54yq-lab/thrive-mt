import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Stethoscope, DollarSign, Star, Eye } from 'lucide-react';
import { useAdminAudit } from '@/hooks/useAdminAudit';
import { AUDIT_ACTIONS } from '@/constants/auditActions';
import { AddTherapistDialog } from './modals';
import { useToast } from '@/hooks/use-toast';

interface Therapist {
  id: string;
  name: string;
  title: string;
  hourly_rate: number;
  experience_years: number | null;
  is_active: boolean;
  rating: number | null;
  total_reviews: number | null;
  specialties: string[];
  created_at: string;
}

const TherapistsManagement: React.FC = () => {
  const { toast } = useToast();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    totalBookings: 0,
    avgRating: 0
  });
  const { logAction } = useAdminAudit();

  // Dialog state
  const [addTherapistOpen, setAddTherapistOpen] = useState(false);

  useEffect(() => {
    fetchTherapists();
    fetchStats();
  }, []);

  const fetchTherapists = async () => {
    try {
      const { data, error } = await supabase
        .from('therapists')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTherapists(data || []);
    } catch (error) {
      console.error('Error fetching therapists:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { count: total } = await supabase
        .from('therapists')
        .select('*', { count: 'exact', head: true });

      const { count: active } = await supabase
        .from('therapists')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      const { count: bookings } = await supabase
        .from('therapy_bookings')
        .select('*', { count: 'exact', head: true });

      const { data: ratingData } = await supabase
        .from('therapists')
        .select('rating');

      const avgRating = ratingData && ratingData.length > 0
        ? ratingData.reduce((sum, t) => sum + (t.rating || 0), 0) / ratingData.length
        : 0;

      setStats({
        total: total || 0,
        active: active || 0,
        totalBookings: bookings || 0,
        avgRating: Math.round(avgRating * 10) / 10
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleViewTherapist = (therapist: Therapist) => {
    logAction(AUDIT_ACTIONS.PROFILE_VIEWED, therapist.id, { name: therapist.name });
    toast({
      title: "Therapist Details",
      description: `Viewing ${therapist.name}`,
    });
  };

  const filteredTherapists = therapists.filter(therapist =>
    therapist.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    therapist.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    therapist.specialties?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="text-white text-center py-8">Loading therapists...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dialog */}
      <AddTherapistDialog open={addTherapistOpen} onOpenChange={setAddTherapistOpen} onSuccess={fetchTherapists} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Total Therapists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{stats.active}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{stats.totalBookings}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400 flex items-center gap-2">
              <Star className="w-6 h-6 fill-yellow-400" />
              {stats.avgRating}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Therapists Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Therapist Directory</CardTitle>
              <CardDescription className="text-slate-400">
                Manage therapist profiles and availability
              </CardDescription>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setAddTherapistOpen(true)}>
              <Stethoscope className="w-4 h-4 mr-2" />
              Add Therapist
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search therapists by name, title, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="rounded-md border border-slate-700">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">Therapist</TableHead>
                  <TableHead className="text-slate-300">Specialties</TableHead>
                  <TableHead className="text-slate-300">Rate</TableHead>
                  <TableHead className="text-slate-300">Rating</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTherapists.map((therapist) => (
                  <TableRow key={therapist.id} className="border-slate-700 hover:bg-slate-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                          {therapist.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-white">{therapist.name}</div>
                          <div className="text-sm text-slate-400">{therapist.title}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {therapist.specialties?.slice(0, 2).map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs text-slate-300 border-slate-600">
                            {specialty}
                          </Badge>
                        ))}
                        {therapist.specialties?.length > 2 && (
                          <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                            +{therapist.specialties.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {therapist.hourly_rate}/hr
                      </div>
                    </TableCell>
                    <TableCell>
                      {therapist.rating && (
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-yellow-400" />
                          <span className="text-white">{therapist.rating.toFixed(1)}</span>
                          <span className="text-slate-400 text-sm">({therapist.total_reviews})</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {therapist.is_active ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-400 border-slate-600">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-slate-400 hover:text-white"
                        onClick={() => handleViewTherapist(therapist)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TherapistsManagement;
