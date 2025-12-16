import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Stethoscope, Activity, Settings, Shield, FileText, LayoutDashboard, BookOpen, CreditCard, Headphones, Brain, Megaphone, LineChart, Plug, Building, Navigation, Monitor, BarChart3 } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardOverview from '@/components/admin/DashboardOverview';
import UsersManagement from '@/components/admin/UsersManagement';
import TherapistsManagement from '@/components/admin/TherapistsManagement';
import OperationsAnalytics from '@/components/admin/OperationsAnalytics';
import ComplianceDashboard from '@/components/admin/ComplianceDashboard';
import SystemSettings from '@/components/admin/SystemSettings';
import AuditLogsViewer from '@/components/admin/AuditLogsViewer';
import ContentManagement from '@/components/admin/ContentManagement';
import BillingManagement from '@/components/admin/BillingManagement';
import SupportTicketing from '@/components/admin/SupportTicketing';
import AISystemsOverview from '@/components/admin/AISystemsOverview';
import MarketingHub from '@/components/admin/MarketingHub';
import PredictiveAnalytics from '@/components/admin/PredictiveAnalytics';
import IntegrationHub from '@/components/admin/IntegrationHub';
import EnterpriseSettings from '@/components/admin/EnterpriseSettings';
import NavigationHealthChecker from '@/components/admin/NavigationHealthChecker';
import ProductionControlPanel from '@/components/admin/ProductionControlPanel';
import AdminEngagementMetrics from '@/components/admin/AdminEngagementMetrics';
import { useAdminAudit } from '@/hooks/useAdminAudit';
import { AUDIT_ACTIONS } from '@/constants/auditActions';
import { toast } from 'sonner';

const AdminPortal: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const { logAction } = useAdminAudit();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    checkAdminAccess();
  }, [user, loading]);

  const checkAdminAccess = async () => {
    if (loading) return;
    
    if (!user) {
      navigate('/app/auth');
      return;
    }

    try {
      const { data, error } = await supabase.rpc('is_admin');

      if (error) throw error;

      if (!data) {
        await logAction(AUDIT_ACTIONS.ADMIN_ACCESS_UNAUTHORIZED);
        navigate('/app/dashboard');
        return;
      }

      setIsAdmin(true);
      await logAction(AUDIT_ACTIONS.PORTAL_ACCESSED);
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/app/dashboard');
    } finally {
      setCheckingAccess(false);
    }
  };

  if (loading || checkingAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Verifying admin access...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs 
          defaultValue="overview" 
          className="w-full"
          onValueChange={(value) => logAction(AUDIT_ACTIONS.TAB_CHANGED, undefined, { tab: value })}
        >
          <TabsList className="flex flex-wrap gap-1 w-full lg:w-auto bg-gray-800/50 border border-[#B87333]/30 p-2 h-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="therapists" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Stethoscope className="w-4 h-4" />
              <span className="hidden sm:inline">Therapists</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Headphones className="w-4 h-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">AI Systems</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Megaphone className="w-4 h-4" />
              <span className="hidden sm:inline">Marketing</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <LineChart className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Plug className="w-4 h-4" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="enterprise" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Enterprise</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Operations</span>
            </TabsTrigger>
            <TabsTrigger value="navigation" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Navigation className="w-4 h-4" />
              <span className="hidden sm:inline">Navigation</span>
            </TabsTrigger>
            <TabsTrigger value="production" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Production</span>
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Engagement</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Audit</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-[#B87333]/20 data-[state=active]:text-[#E5C5A1] data-[state=active]:border-[#B87333]/50 px-3 py-1.5">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="space-y-4">
              <DashboardOverview />
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <UsersManagement />
            </TabsContent>

            <TabsContent value="therapists" className="space-y-4">
              <TherapistsManagement />
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <ContentManagement />
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <BillingManagement />
            </TabsContent>

            <TabsContent value="support" className="space-y-4">
              <SupportTicketing />
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <AISystemsOverview />
            </TabsContent>

            <TabsContent value="marketing" className="space-y-4">
              <MarketingHub />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <PredictiveAnalytics />
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4">
              <IntegrationHub />
            </TabsContent>

            <TabsContent value="enterprise" className="space-y-4">
              <EnterpriseSettings />
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <ComplianceDashboard />
            </TabsContent>

            <TabsContent value="operations" className="space-y-4">
              <OperationsAnalytics />
            </TabsContent>

            <TabsContent value="navigation" className="space-y-4">
              <NavigationHealthChecker />
            </TabsContent>

            <TabsContent value="production" className="space-y-4">
              <ProductionControlPanel />
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4">
              <AdminEngagementMetrics />
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
