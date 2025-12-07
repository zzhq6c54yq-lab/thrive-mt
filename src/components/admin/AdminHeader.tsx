import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdminAudit } from '@/hooks/useAdminAudit';
import { AUDIT_ACTIONS } from '@/constants/auditActions';

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const { logAction } = useAdminAudit();

  const handleLogout = async () => {
    await logAction(AUDIT_ACTIONS.ADMIN_LOGOUT);
    sessionStorage.removeItem('admin_session_token');
    sessionStorage.removeItem('admin_session_expires');
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/app/auth');
  };

  return (
    <header className="border-b border-[#B87333]/30 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Portal</h1>
              <p className="text-sm text-gray-400">Thrive Mental Health Platform</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-300 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
