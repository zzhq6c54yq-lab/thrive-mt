import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  Database, 
  Shield, 
  Bell,
  Mail,
  Key,
  Globe,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

const SystemSettings: React.FC = () => {
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

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
            <Switch id="2fa" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-verify" className="text-white">Email Verification</Label>
              <p className="text-sm text-slate-400">Require email verification for new users</p>
            </div>
            <Switch id="email-verify" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="password-policy" className="text-white">Strict Password Policy</Label>
              <p className="text-sm text-slate-400">Enforce strong password requirements</p>
            </div>
            <Switch id="password-policy" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="session-timeout" className="text-white">Auto Session Timeout</Label>
              <p className="text-sm text-slate-400">Automatically log out inactive users</p>
            </div>
            <Switch id="session-timeout" defaultChecked />
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
            <Switch id="new-user-alert" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="booking-alerts" className="text-white">Booking Notifications</Label>
              <p className="text-sm text-slate-400">Alert therapists of new bookings</p>
            </div>
            <Switch id="booking-alerts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="crisis-alerts" className="text-white">Crisis Event Alerts</Label>
              <p className="text-sm text-slate-400">Immediate notification for crisis events</p>
            </div>
            <Switch id="crisis-alerts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="system-alerts" className="text-white">System Health Alerts</Label>
              <p className="text-sm text-slate-400">Monitor system performance issues</p>
            </div>
            <Switch id="system-alerts" defaultChecked />
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
            <Switch id="maintenance" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-registrations" className="text-white">New User Registrations</Label>
              <p className="text-sm text-slate-400">Allow new users to sign up</p>
            </div>
            <Switch id="new-registrations" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ai-features" className="text-white">AI Features</Label>
              <p className="text-sm text-slate-400">Enable AI-powered recommendations</p>
            </div>
            <Switch id="ai-features" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics" className="text-white">Analytics Tracking</Label>
              <p className="text-sm text-slate-400">Track user interactions and usage</p>
            </div>
            <Switch id="analytics" defaultChecked />
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
          >
            <Database className="w-4 h-4 mr-2" />
            Backup Database
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start border-slate-600 text-slate-300 hover:text-white"
          >
            <Key className="w-4 h-4 mr-2" />
            Rotate API Keys
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start border-slate-600 text-slate-300 hover:text-white"
          >
            <Globe className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start border-red-600 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Lock className="w-4 h-4 mr-2" />
            Emergency Lockdown
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;
