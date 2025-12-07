import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Assignment {
  id: string;
  patient_id: string;
  provider_id: string;
  provider_type: 'therapist' | 'coach';
  organization_id: string | null;
  status: 'active' | 'paused' | 'ended';
  assigned_at: string;
  ended_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  patient?: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
  provider?: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
}

export function useAssignments(role: 'patient' | 'provider' = 'patient') {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAssignments();
  }, [role]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const column = role === 'patient' ? 'patient_id' : 'provider_id';
      const joinColumn = role === 'patient' ? 'provider_id' : 'patient_id';

      const { data, error } = await supabase
        .from('assignments')
        .select(`
          *,
          patient:profiles!assignments_patient_id_fkey(id, display_name, avatar_url),
          provider:profiles!assignments_provider_id_fkey(id, display_name, avatar_url)
        `)
        .eq(column, user.id)
        .eq('status', 'active')
        .order('assigned_at', { ascending: false });

      if (error) throw error;
      setAssignments((data as unknown as Assignment[]) || []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load assignments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createAssignment = async (
    patientId: string,
    providerType: 'therapist' | 'coach',
    notes?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('assignments')
        .insert({
          patient_id: patientId,
          provider_id: user.id,
          provider_type: providerType,
          notes,
        } as any)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Assignment created successfully',
      });

      await fetchAssignments();
      return data;
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast({
        title: 'Error',
        description: 'Failed to create assignment',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateAssignment = async (
    assignmentId: string,
    updates: Partial<Pick<Assignment, 'status' | 'notes' | 'ended_at'>>
  ) => {
    try {
      const { error } = await supabase
        .from('assignments')
        .update(updates)
        .eq('id', assignmentId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Assignment updated successfully',
      });

      await fetchAssignments();
    } catch (error) {
      console.error('Error updating assignment:', error);
      toast({
        title: 'Error',
        description: 'Failed to update assignment',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const endAssignment = async (assignmentId: string) => {
    return updateAssignment(assignmentId, {
      status: 'ended',
      ended_at: new Date().toISOString(),
    });
  };

  return {
    assignments,
    loading,
    fetchAssignments,
    createAssignment,
    updateAssignment,
    endAssignment,
  };
}
