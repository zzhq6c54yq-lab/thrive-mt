import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Stethoscope, Activity, Settings, Shield, FileText } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import UsersManagement from '@/components/admin/UsersManagement';
import TherapistsManagement from '@/components/admin/TherapistsManagement';
import OperationsAnalytics from '@/components/admin/OperationsAnalytics';
import SystemSettings from '@/components/admin/SystemSettings';
import AuditLogsViewer from '@/components/admin/AuditLogsViewer';
import { useAdminAudit } from '@/hooks/useAdminAudit';
import { AUDIT_ACTIONS } from '@/constants/auditActions';
import { toast } from 'sonner';

const AdminPortal: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const { logAction } = useAdminAudit();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [sessionValid, setSessionValid] = useState(false);

  useEffect(() => {
    checkAdminAccess();

    // Check session validity every minute
    const interval = setInterval(checkSessionValidity, 60000);
    return () => clearInterval(interval);
  }, [user, loading]);

  const checkSessionValidity = () => {
    const sessionToken = localStorage.getItem('admin_session_token');
    const expiresAt = localStorage.getItem('admin_session_expires');

    if (!sessionToken || !expiresAt) {
      setSessionValid(false);
      return false;
    }

    const isExpired = new Date(expiresAt) <= new Date();
    if (isExpired) {
      handleSessionExpired();
      return false;
    }

    // Show warning at 5 minutes remaining
    const timeRemaining = new Date(expiresAt).getTime() - new Date().getTime();
    if (timeRemaining <= 5 * 60 * 1000 && timeRemaining > 4 * 60 * 1000) {
      toast.warning('Your admin session will expire in 5 minutes');
    }

    setSessionValid(true);
    return true;
  };

  const handleSessionExpired = async () => {
    await logAction(AUDIT_ACTIONS.SESSION_EXPIRED);
    localStorage.removeItem('admin_session_token');
    localStorage.removeItem('admin_session_expires');
    toast.error('Admin session expired. Please log in again.');
    navigate('/');
  };

  const checkAdminAccess = async () => {
    if (loading) return;
    
    if (!user) {
      navigate('/');
      return;
    }

    // Check session validity
    if (!checkSessionValidity()) {
      navigate('/');
      return;
    }

    try {
      const { data, error } = await supabase.rpc('is_admin');

      if (error) throw error;

      if (!data) {
        await logAction(AUDIT_ACTIONS.ADMIN_ACCESS_UNAUTHORIZED);
        navigate('/');
        return;
      }

      setIsAdmin(true);
      await logAction(AUDIT_ACTIONS.PORTAL_ACCESSED);
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/');
    } finally {
      setCheckingAccess(false);
    }
  };

  if (loading || checkingAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Verifying admin access...</div>
      </div>
    );
  }

  if (!isAdmin || !sessionValid) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs 
          defaultValue="users" 
          className="w-full"
          onValueChange={(value) => logAction(AUDIT_ACTIONS.TAB_CHANGED, undefined, { tab: value })}
        >
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="therapists" className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              <span className="hidden sm:inline">Therapists</span>
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Operations</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Audit Logs</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="users" className="space-y-4">
              <UsersManagement />
            </TabsContent>

            <TabsContent value="therapists" className="space-y-4">
              <TherapistsManagement />
            </TabsContent>

            <TabsContent value="operations" className="space-y-4">
              <OperationsAnalytics />
            </TabsContent>

            <TabsContent value="audit" className="space-y-4">
              <AuditLogsViewer />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <SystemSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPortal;
