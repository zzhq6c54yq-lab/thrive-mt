import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useDataExport() {
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const exportUserData = async () => {
    try {
      setExporting(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('export-user-data', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Create and download the file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `thrivemt-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Export Complete',
        description: 'Your data has been exported successfully',
      });

      return data;
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: 'Export Failed',
        description: 'Failed to export your data. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setExporting(false);
    }
  };

  const requestDataDeletion = async () => {
    try {
      setDeleting(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('purge-user-data', {
        body: { confirmation: 'DELETE_ALL_MY_DATA' },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      toast({
        title: 'Deletion Requested',
        description: 'Your data has been scheduled for deletion.',
      });

      // Sign out the user after deletion
      await supabase.auth.signOut();

      return data;
    } catch (error) {
      console.error('Error deleting data:', error);
      toast({
        title: 'Deletion Failed',
        description: 'Failed to delete your data. Please contact support.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setDeleting(false);
    }
  };

  return {
    exportUserData,
    requestDataDeletion,
    exporting,
    deleting,
  };
}
