import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, Mail, Send, TrendingUp, Users, Gift, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CreateCampaignDialog, CreateSegmentDialog, ViewCampaignDialog } from "./modals";

const MarketingHub = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [segments, setSegments] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);
  const [createSegmentOpen, setCreateSegmentOpen] = useState(false);
  const [viewCampaignOpen, setViewCampaignOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  useEffect(() => {
    fetchMarketingData();
  }, []);

  const fetchMarketingData = async () => {
    try {
      const [campaignsRes, segmentsRes, referralsRes, analyticsRes] = await Promise.all([
        supabase.from("marketing_campaigns").select("*").order("created_at", { ascending: false }),
        supabase.from("user_segments").select("*").order("created_at", { ascending: false }),
        supabase.from("referral_tracking").select("*").order("created_at", { ascending: false }),
        supabase.from("campaign_analytics").select("*").order("recorded_at", { ascending: false }),
      ]);

      setCampaigns(campaignsRes.data || []);
      setSegments(segmentsRes.data || []);
      setReferrals(referralsRes.data || []);
      setAnalytics(analyticsRes.data || []);
    } catch (error) {
      toast({
        title: "Error loading marketing data",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalSent = analytics.reduce((sum, a) => sum + (a.sent_count || 0), 0);
  const totalOpened = analytics.reduce((sum, a) => sum + (a.opened_count || 0), 0);
  const totalClicked = analytics.reduce((sum, a) => sum + (a.clicked_count || 0), 0);
  const totalRevenue = analytics.reduce((sum, a) => sum + parseFloat(a.revenue_generated || 0), 0);

  const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
  const clickRate = totalSent > 0 ? (totalClicked / totalSent) * 100 : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-green-500/20 text-green-400";
      case "sending": return "bg-blue-500/20 text-blue-400";
      case "scheduled": return "bg-yellow-500/20 text-yellow-400";
      case "draft": return "bg-gray-500/20 text-gray-400";
      case "cancelled": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "push": return <Send className="h-4 w-4" />;
      default: return <Megaphone className="h-4 w-4" />;
    }
  };

  const handleViewCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setViewCampaignOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading marketing data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dialogs */}
      <CreateCampaignDialog open={createCampaignOpen} onOpenChange={setCreateCampaignOpen} onSuccess={fetchMarketingData} />
      <CreateSegmentDialog open={createSegmentOpen} onOpenChange={setCreateSegmentOpen} onSuccess={fetchMarketingData} />
      <ViewCampaignDialog open={viewCampaignOpen} onOpenChange={setViewCampaignOpen} campaign={selectedCampaign} onSuccess={fetchMarketingData} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Marketing Hub</h2>
          <p className="text-muted-foreground">Manage campaigns, segments, and engagement</p>
        </div>
        <Button className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => setCreateCampaignOpen(true)}>
          <Send className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns Sent</CardTitle>
            <Mail className="h-4 w-4 text-[#B87333]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B87333]">{totalSent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{openRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Campaign engagement</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <Target className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{clickRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Call-to-action clicks</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <Gift className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Campaign attribution</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="bg-white/5">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="segments">User Segments</TabsTrigger>
          <TabsTrigger value="referrals">Referral Program</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(campaign.type)}
                        <Badge variant="outline" className="capitalize">{campaign.type}</Badge>
                        <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Target: {campaign.target_user_count || 0} users</span>
                        {campaign.scheduled_for && (
                          <span>Scheduled: {new Date(campaign.scheduled_for).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleViewCampaign(campaign)}>
                        View
                      </Button>
                      <Button size="sm" className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => handleViewCampaign(campaign)}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {campaigns.length === 0 && (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No campaigns yet</p>
                    <p className="text-sm mt-2">Create your first marketing campaign</p>
                    <Button className="mt-4 bg-[#B87333] hover:bg-[#A66329]" onClick={() => setCreateCampaignOpen(true)}>
                      Create Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Segments</CardTitle>
                  <CardDescription>Target groups for personalized campaigns</CardDescription>
                </div>
                <Button className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => setCreateSegmentOpen(true)}>
                  <Users className="h-4 w-4 mr-2" />
                  Create Segment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {segments.map((segment) => (
                  <div key={segment.id} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">{segment.name}</h4>
                      <p className="text-sm text-muted-foreground">{segment.description}</p>
                      <div className="text-xs text-muted-foreground">
                        Last calculated: {segment.last_calculated_at ? new Date(segment.last_calculated_at).toLocaleDateString() : "Never"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#B87333]">{segment.user_count || 0}</div>
                      <p className="text-xs text-muted-foreground">users</p>
                    </div>
                  </div>
                ))}
                {segments.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No segments created yet
                    <Button className="mt-4 block mx-auto bg-[#B87333] hover:bg-[#A66329]" onClick={() => setCreateSegmentOpen(true)}>
                      Create Segment
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#B87333]">{referrals.length}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400">
                  {referrals.filter((r) => r.status === "completed").length}
                </div>
                <p className="text-xs text-muted-foreground">Successful conversions</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Rewards Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-400">
                  ${referrals.reduce((sum, r) => sum + parseFloat(r.reward_amount || 0), 0).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">Total rewards</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
              <CardDescription>Latest referral activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {referrals.slice(0, 10).map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="space-y-1">
                      <div className="text-sm font-mono">{referral.referral_code}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={getStatusColor(referral.status)}>{referral.status}</Badge>
                      {referral.reward_given && (
                        <div className="text-xs text-muted-foreground">${parseFloat(referral.reward_amount).toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                ))}
                {referrals.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">No referrals yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {analytics.length > 0 && (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Campaign Performance Trends</CardTitle>
                <CardDescription>Open and click rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.slice(0, 10).reverse()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey={(d) => new Date(d.recorded_at).toLocaleDateString()} stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    />
                    <Line type="monotone" dataKey="opened_count" stroke="#10B981" name="Opens" />
                    <Line type="monotone" dataKey="clicked_count" stroke="#4A90E2" name="Clicks" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {analytics.length === 0 && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No analytics data yet</p>
                  <p className="text-sm mt-2">Send campaigns to see performance metrics</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingHub;
