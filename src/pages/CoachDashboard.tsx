import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoachWelcomeBanner from "@/components/coach/CoachWelcomeBanner";
import CoachTodayTab from "@/components/coach/CoachTodayTab";
import CoachMembersTab from "@/components/coach/CoachMembersTab";
import CoachScheduleTab from "@/components/coach/CoachScheduleTab";
import CoachEarningsTab from "@/components/coach/CoachEarningsTab";
import CoachServicesPricing from "@/components/coach/CoachServicesPricing";
import { Button } from "@/components/ui/button";
import { LogOut, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const CoachDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("today");
  const coachName = sessionStorage.getItem('coachName') || 'Coach';

  useEffect(() => {
    // Check if coach has access
    const coachAccess = sessionStorage.getItem('coachAccess');
    if (coachAccess !== 'true') {
      navigate('/app/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('coachAccess');
      toast({
        title: "Logged out successfully",
        description: "Have a great day!",
      });
    navigate('/app/auth');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/40 via-teal-900/20 to-background" />

      {/* Header with glass morphism */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative border-b border-border/40 backdrop-blur-xl bg-background/40"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.div 
                animate={{ 
                  boxShadow: ['0 0 20px rgba(59, 130, 246, 0.4)', '0 0 40px rgba(20, 184, 166, 0.6)', '0 0 20px rgba(59, 130, 246, 0.4)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 via-teal-500 to-slate-400 flex items-center justify-center text-white font-bold text-xl"
              >
                {coachName.charAt(0).toUpperCase()}
              </motion.div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-background"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Welcome back, {coachName}
              </h1>
              <p className="text-sm text-muted-foreground">Mental Wellness Coach</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground transition-all hover:scale-105"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8">
        <CoachWelcomeBanner coachName={coachName} />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-background/60 backdrop-blur-sm border border-border/40 h-14">
              <TabsTrigger 
                value="today" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-blue-400 relative overflow-hidden group text-base"
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === 'today' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                Today
              </TabsTrigger>
              <TabsTrigger 
                value="members" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-blue-400 relative overflow-hidden group text-base"
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === 'members' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                Clients
              </TabsTrigger>
              <TabsTrigger 
                value="schedule" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-blue-400 relative overflow-hidden group text-base"
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === 'schedule' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                Schedule
              </TabsTrigger>
              <TabsTrigger 
                value="earnings" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-blue-400 relative overflow-hidden group text-base"
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === 'earnings' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                Earnings
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-blue-400 relative overflow-hidden group text-base"
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === 'services' ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                Services
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="mt-6">
              <CoachTodayTab />
            </TabsContent>

            <TabsContent value="members" className="mt-6">
              <CoachMembersTab />
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <CoachScheduleTab />
            </TabsContent>

            <TabsContent value="earnings" className="mt-6">
              <CoachEarningsTab />
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <CoachServicesPricing />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default CoachDashboard;
