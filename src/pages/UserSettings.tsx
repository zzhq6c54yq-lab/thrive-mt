
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Bell, Lock, Eye, EyeOff, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const UserSettings = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Account Settings</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Customize your account preferences and security settings.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-500" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Manage your account information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="timezone" className="text-sm font-medium">Timezone</label>
                  <select id="timezone" className="w-full p-2 border rounded-md">
                    <option>Eastern Time (ET)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Pacific Time (PT)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Accessibility Mode</span>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleSaveSettings}
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-500" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how and when you'd like to be notified.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Appointment Reminders</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Therapy Session Summaries</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New Resources Available</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly Progress Reports</span>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">In-App Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Message Notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily Check-in Reminders</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Community Activity</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleSaveSettings}
                >
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-blue-500" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your password and security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                  <div className="relative">
                    <Input 
                      id="current-password" 
                      type={showPassword ? "text" : "password"} 
                      defaultValue="password123" 
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Two-Factor Authentication</span>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleSaveSettings}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Update Security Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserSettings;
