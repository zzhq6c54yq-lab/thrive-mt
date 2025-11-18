import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import type { AuditAction } from '@/constants/auditActions';

interface AuditLogDetails {
  [key: string]: any;
}

export const useAdminAudit = () => {
  const { user } = useUser();

  const logAction = async (
    action: AuditAction,
    userAffectedId?: string,
    details?: AuditLogDetails
  ) => {
    if (!user) {
      console.error('Cannot log audit action: No user found');
      return;
    }

    try {
      const { error } = await supabase.from('auth_user_audit').insert({
        user_id: userAffectedId || user.id,
        action,
        operator: user.email || user.id,
        details: {
          ...details,
          timestamp: new Date().toISOString(),
          operator_id: user.id,
        },
      });

      if (error) {
        console.error('Failed to log audit action:', error);
      }
    } catch (error) {
      console.error('Error logging audit action:', error);
    }
  };

  return { logAction };
};
