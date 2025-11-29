import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoachWelcomeBanner from "@/components/coach/CoachWelcomeBanner";
import CoachTodayTab from "@/components/coach/CoachTodayTab";
import CoachMembersTab from "@/components/coach/CoachMembersTab";
import CoachScheduleTab from "@/components/coach/CoachScheduleTab";
import CoachEarningsTab from "@/components/coach/CoachEarningsTab";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CoachDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("today");

  useEffect(() => {
    // Check if coach has access
    const coachAccess = sessionStorage.getItem('coachAccess');
    if (coachAccess !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('coachAccess');
    toast({
      title: "See you soon! 👋",
      description: "Thanks for all you do. Take care!",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900/20 via-teal-800/10 to-background">
      {/* Header */}
      <div className="border-b border-border/40 backdrop-blur-sm bg-background/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Coach Portal</h1>
              <p className="text-sm text-muted-foreground">Maya Thompson</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <CoachWelcomeBanner />

        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-background/60 backdrop-blur-sm border border-border/40">
              <TabsTrigger value="today" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
                Today
              </TabsTrigger>
              <TabsTrigger value="members" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
                Members
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
                Schedule
              </TabsTrigger>
              <TabsTrigger value="earnings" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
                Earnings
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
