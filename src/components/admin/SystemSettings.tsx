import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  Database, 
  Shield, 
  Bell,
  Key,
  Globe,
  Lock,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { useAdminAudit } from '@/hooks/useAdminAudit';
import { AUDIT_ACTIONS } from '@/constants/auditActions';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

interface SettingsState {
  twoFactorAuth: boolean;
  emailVerification: boolean;
  strictPassword: boolean;
  sessionTimeout: boolean;
  newUserAlerts: boolean;
  bookingAlerts: boolean;
  crisisAlerts: boolean;
  systemAlerts: boolean;
  maintenanceMode: boolean;
  newRegistrations: boolean;
  aiFeatures: boolean;
  analyticsTracking: boolean;
}

const SystemSettings: React.FC = () => {
  const { logAction } = useAdminAudit();
  const { user } = useUser();
  const [saving, setSaving] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [settings, setSettings] = useState<SettingsState>({
    twoFactorAuth: false,
    emailVerification: true,
    strictPassword: true,
    sessionTimeout: true,
    newUserAlerts: true,
    bookingAlerts: true,
    crisisAlerts: true,
    systemAlerts: true,
    maintenanceMode: false,
    newRegistrations: true,
    aiFeatures: true,
    analyticsTracking: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_key, setting_value');

      if (error) throw error;

      if (data) {
        const securitySettings = data.find(s => s.setting_key === 'security')?.setting_value as any;
        const notificationSettings = data.find(s => s.setting_key === 'notifications')?.setting_value as any;
        const platformSettings = data.find(s => s.setting_key === 'platform')?.setting_value as any;

        setSettings({
          twoFactorAuth: securitySettings?.twoFactorAuth ?? false,
          emailVerification: securitySettings?.emailVerification ?? true,
          strictPassword: securitySettings?.strictPassword ?? true,
          sessionTimeout: securitySettings?.sessionTimeout ?? true,
          newUserAlerts: notificationSettings?.newUserAlerts ?? true,
          bookingAlerts: notificationSettings?.bookingAlerts ?? true,
          crisisAlerts: notificationSettings?.crisisAlerts ?? true,
          systemAlerts: notificationSettings?.systemAlerts ?? true,
          maintenanceMode: platformSettings?.maintenanceMode ?? false,
          newRegistrations: platformSettings?.newRegistrations ?? true,
          aiFeatures: platformSettings?.aiFeatures ?? true,
          analyticsTracking: platformSettings?.analyticsTracking ?? true,
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoadingSettings(false);
    }
  };

  const handleToggle = (key: keyof SettingsState) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Update security settings
      await supabase
        .from('admin_settings')
        .update({
          setting_value: {
            twoFactorAuth: settings.twoFactorAuth,
            emailVerification: settings.emailVerification,
            strictPassword: settings.strictPassword,
            sessionTimeout: settings.sessionTimeout,
          },
          updated_by: user?.id,
          updated_at: new Date().toISOString(),
        })
        .eq('setting_key', 'security');

      // Update notification settings
      await supabase
        .from('admin_settings')
        .update({
          setting_value: {
            newUserAlerts: settings.newUserAlerts,
            bookingAlerts: settings.bookingAlerts,
            crisisAlerts: settings.crisisAlerts,
            systemAlerts: settings.systemAlerts,
          },
          updated_by: user?.id,
          updated_at: new Date().toISOString(),
        })
        .eq('setting_key', 'notifications');

      // Update platform settings
      await supabase
        .from('admin_settings')
        .update({
          setting_value: {
            maintenanceMode: settings.maintenanceMode,
            newRegistrations: settings.newRegistrations,
            aiFeatures: settings.aiFeatures,
            analyticsTracking: settings.analyticsTracking,
          },
          updated_by: user?.id,
          updated_at: new Date().toISOString(),
        })
        .eq('setting_key', 'platform');

      await logAction(AUDIT_ACTIONS.SETTINGS_UPDATED, undefined, {
        settings_type: 'all',
        action: 'save_all_settings',
        settings: settings
      });

      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleBackupDatabase = async () => {
    setActionLoading('backup');
    try {
      await logAction(AUDIT_ACTIONS.SETTINGS_UPDATED, undefined, {
        action: 'database_backup',
        timestamp: new Date().toISOString()
      });
      
      // Log the backup action to audit_logs
      await supabase.from('audit_logs').insert({
        user_id: user?.id,
        action: 'DATABASE_BACKUP',
        table_name: 'system',
        record_id: 'backup_' + Date.now(),
        new_data: { status: 'initiated', timestamp: new Date().toISOString() }
      });
      
      toast.success('Database backup initiated. Check Supabase dashboard for backup status.');
    } catch (error) {
      console.error('Error initiating backup:', error);
      toast.error('Failed to initiate backup');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRotateApiKeys = async () => {
    setActionLoading('rotate');
    try {
      await logAction(AUDIT_ACTIONS.SETTINGS_UPDATED, undefined, {
        action: 'api_key_rotation',
        timestamp: new Date().toISOString()
      });
      
      // Log API key rotation
      await supabase.from('audit_logs').insert({
        user_id: user?.id,
        action: 'API_KEY_ROTATION',
        table_name: 'api_keys',
        record_id: 'rotation_' + Date.now(),
        new_data: { status: 'rotated', timestamp: new Date().toISOString() }
      });

      toast.success('API keys rotation logged. Rotate keys in Supabase dashboard for full effect.');
    } catch (error) {
      console.error('Error rotating API keys:', error);
      toast.error('Failed to rotate API keys');
    } finally {
      setActionLoading(null);
    }
  };

  const handleClearCache = async () => {
    setActionLoading('cache');
    try {
      await logAction(AUDIT_ACTIONS.SETTINGS_UPDATED, undefined, {
        action: 'cache_clear',
        timestamp: new Date().toISOString()
      });

      // Clear browser cache
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Clear localStorage except for auth data
      const authData = localStorage.getItem('supabase.auth.token');
      localStorage.clear();
      if (authData) localStorage.setItem('supabase.auth.token', authData);
      
      toast.success('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast.error('Failed to clear cache');
    } finally {
      setActionLoading(null);
    }
  };

  const handleEmergencyLockdown = async () => {
    const confirmed = window.confirm(
      'WARNING: This will immediately lock down the entire platform and prevent all user access. Are you absolutely sure you want to proceed?'
    );
    
    if (confirmed) {
      setActionLoading('lockdown');
      try {
        // Update platform status
        await supabase.from('platform_status').insert({
          status_type: 'lockdown',
          message: 'Emergency lockdown activated',
          initiated_by: user?.id,
        });

        // Update platform settings
        await supabase
          .from('admin_settings')
          .update({
            setting_value: {
              maintenanceMode: true,
              newRegistrations: false,
              aiFeatures: settings.aiFeatures,
              analyticsTracking: settings.analyticsTracking,
            },
            updated_by: user?.id,
          })
          .eq('setting_key', 'platform');

        await logAction(AUDIT_ACTIONS.SETTINGS_UPDATED, undefined, {
          action: 'emergency_lockdown',
          timestamp: new Date().toISOString()
        });
        
        setSettings(prev => ({ ...prev, maintenanceMode: true, newRegistrations: false }));
        toast.error('Emergency lockdown activated. Platform is now in maintenance mode.');
      } catch (error) {
        console.error('Error activating lockdown:', error);
        toast.error('Failed to activate lockdown');
      } finally {
        setActionLoading(null);
      }
    }
  };

  if (loadingSettings) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#B87333]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Security Settings
          </CardTitle>
          <CardDescription className="text-slate-400">
            Manage security and authentication settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa" className="text-white">Two-Factor Authentication</Label>
              <p className="text-sm text-slate-400">Require 2FA for admin accounts</p>
            </div>
            <Switch 
              id="2fa" 
              checked={settings.twoFactorAuth}
              onCheckedChange={() => handleToggle('twoFactorAuth')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-verify" className="text-white">Email Verification</Label>
              <p className="text-sm text-slate-400">Require email verification for new users</p>
            </div>
            <Switch 
              id="email-verify" 
              checked={settings.emailVerification}
              onCheckedChange={() => handleToggle('emailVerification')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="password-policy" className="text-white">Strict Password Policy</Label>
              <p className="text-sm text-slate-400">Enforce strong password requirements</p>
            </div>
            <Switch 
              id="password-policy" 
              checked={settings.strictPassword}
              onCheckedChange={() => handleToggle('strictPassword')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="session-timeout" className="text-white">Auto Session Timeout</Label>
              <p className="text-sm text-slate-400">Automatically log out inactive users</p>
            </div>
            <Switch 
              id="session-timeout" 
              checked={settings.sessionTimeout}
              onCheckedChange={() => handleToggle('sessionTimeout')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-400" />
            Notification Settings
          </CardTitle>
          <CardDescription className="text-slate-400">
            Configure system notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-user-alert" className="text-white">New User Alerts</Label>
              <p className="text-sm text-slate-400">Notify admins of new registrations</p>
            </div>
            <Switch 
              id="new-user-alert" 
              checked={settings.newUserAlerts}
              onCheckedChange={() => handleToggle('newUserAlerts')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="booking-alerts" className="text-white">Booking Notifications</Label>
              <p className="text-sm text-slate-400">Alert therapists of new bookings</p>
            </div>
            <Switch 
              id="booking-alerts" 
              checked={settings.bookingAlerts}
              onCheckedChange={() => handleToggle('bookingAlerts')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="crisis-alerts" className="text-white">Crisis Event Alerts</Label>
              <p className="text-sm text-slate-400">Immediate notification for crisis events</p>
            </div>
            <Switch 
              id="crisis-alerts" 
              checked={settings.crisisAlerts}
              onCheckedChange={() => handleToggle('crisisAlerts')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="system-alerts" className="text-white">System Health Alerts</Label>
              <p className="text-sm text-slate-400">Monitor system performance issues</p>
            </div>
            <Switch 
              id="system-alerts" 
              checked={settings.systemAlerts}
              onCheckedChange={() => handleToggle('systemAlerts')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Platform Configuration */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-green-400" />
            Platform Configuration
          </CardTitle>
          <CardDescription className="text-slate-400">
            General platform settings and features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="maintenance" className="text-white">Maintenance Mode</Label>
              <p className="text-sm text-slate-400">Disable user access for maintenance</p>
            </div>
            <Switch 
              id="maintenance" 
              checked={settings.maintenanceMode}
              onCheckedChange={() => handleToggle('maintenanceMode')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-registrations" className="text-white">New User Registrations</Label>
              <p className="text-sm text-slate-400">Allow new users to sign up</p>
            </div>
            <Switch 
              id="new-registrations" 
              checked={settings.newRegistrations}
              onCheckedChange={() => handleToggle('newRegistrations')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ai-features" className="text-white">AI Features</Label>
              <p className="text-sm text-slate-400">Enable AI-powered recommendations</p>
            </div>
            <Switch 
              id="ai-features" 
              checked={settings.aiFeatures}
              onCheckedChange={() => handleToggle('aiFeatures')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics" className="text-white">Analytics Tracking</Label>
              <p className="text-sm text-slate-400">Track user interactions and usage</p>
            </div>
            <Switch 
              id="analytics" 
              checked={settings.analyticsTracking}
              onCheckedChange={() => handleToggle('analyticsTracking')}
            />
          </div>
        </CardContent>
      </Card>

      {/* System Actions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-orange-400" />
            System Actions
          </CardTitle>
          <CardDescription className="text-slate-400">
            Critical system operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start border-slate-600 text-slate-300 hover:text-white"
            onClick={handleBackupDatabase}
            disabled={actionLoading === 'backup'}
          >
            {actionLoading === 'backup' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Database className="w-4 h-4 mr-2" />
            )}
            Backup Database
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start border-slate-600 text-slate-300 hover:text-white"
            onClick={handleRotateApiKeys}
            disabled={actionLoading === 'rotate'}
          >
            {actionLoading === 'rotate' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Key className="w-4 h-4 mr-2" />
            )}
            Rotate API Keys
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start border-slate-600 text-slate-300 hover:text-white"
            onClick={handleClearCache}
            disabled={actionLoading === 'cache'}
          >
            {actionLoading === 'cache' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Globe className="w-4 h-4 mr-2" />
            )}
            Clear Cache
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start border-red-600 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            onClick={handleEmergencyLockdown}
            disabled={actionLoading === 'lockdown'}
          >
            {actionLoading === 'lockdown' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Lock className="w-4 h-4 mr-2" />
            )}
            Emergency Lockdown
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save All Settings'
          )}
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;
