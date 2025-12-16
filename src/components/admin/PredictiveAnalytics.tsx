import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LineChart, TrendingUp, Users, AlertTriangle, Target, DollarSign, Send } from "lucide-react";
import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PredictiveAnalytics = () => {
  const { toast } = useToast();
  const [churnPredictions, setChurnPredictions] = useState<any[]>([]);
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [sessionAnalytics, setSessionAnalytics] = useState<any[]>([]);
  const [revenueForecasts, setRevenueForecasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingCampaign, setSendingCampaign] = useState(false);
  const [sendingIntervention, setSendingIntervention] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [churnRes, cohortsRes, sessionRes, forecastRes] = await Promise.all([
        supabase.from("churn_predictions").select("*").order("created_at", { ascending: false }),
        supabase.from("user_cohorts").select("*").order("created_at", { ascending: false }),
        supabase.from("session_analytics").select("*").order("date", { ascending: false }).limit(30),
        supabase.from("revenue_forecasts").select("*").order("forecast_date", { ascending: true }).limit(90),
      ]);

      setChurnPredictions(churnRes.data || []);
      setCohorts(cohortsRes.data || []);
      setSessionAnalytics(sessionRes.data || []);
      setRevenueForecasts(forecastRes.data || []);
    } catch (error) {
      toast({
        title: "Error loading analytics",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendReengagementCampaign = async () => {
    setSendingCampaign(true);
    try {
      const highRiskUsers = churnPredictions.filter((p) => p.risk_level === "high");
      
      // Create a marketing campaign for re-engagement
      await supabase.from("marketing_campaigns").insert({
        name: `Re-engagement Campaign - ${new Date().toLocaleDateString()}`,
        subject: "We miss you! Come back and continue your wellness journey",
        content: "We noticed you haven't been active lately. Your wellness journey is important to us...",
        type: "email",
        status: "sending",
        target_user_count: highRiskUsers.length,
      });

      // Mark all as having received intervention
      for (const prediction of highRiskUsers) {
        await supabase
          .from("churn_predictions")
          .update({ intervention_sent: true })
          .eq("id", prediction.id);
      }

      toast({ 
        title: "Campaign sent",
        description: `Re-engagement campaign sent to ${highRiskUsers.length} high-risk users.`
      });
      fetchAnalyticsData();
    } catch (error) {
      toast({
        title: "Error sending campaign",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSendingCampaign(false);
    }
  };

  const handleSendIntervention = async (predictionId: string) => {
    setSendingIntervention(predictionId);
    try {
      await supabase
        .from("churn_predictions")
        .update({ intervention_sent: true })
        .eq("id", predictionId);

      toast({ title: "Intervention sent successfully" });
      fetchAnalyticsData();
    } catch (error) {
      toast({
        title: "Error sending intervention",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSendingIntervention(null);
    }
  };

  const highRiskUsers = churnPredictions.filter((p) => p.risk_level === "high");
  const mediumRiskUsers = churnPredictions.filter((p) => p.risk_level === "medium");

  const avgChurnProbability =
    churnPredictions.reduce((sum, p) => sum + parseFloat(p.churn_probability || 0), 0) / churnPredictions.length || 0;

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-500/20 text-red-400";
      case "medium": return "bg-yellow-500/20 text-yellow-400";
      case "low": return "bg-green-500/20 text-green-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading predictive analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Predictive Analytics</h2>
        <p className="text-muted-foreground">AI-powered insights and forecasting</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Users</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{highRiskUsers.length}</div>
            <p className="text-xs text-muted-foreground">Likely to churn soon</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{mediumRiskUsers.length}</div>
            <p className="text-xs text-muted-foreground">Needs re-engagement</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Churn Probability</CardTitle>
            <Target className="h-4 w-4 text-[#B87333]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B87333]">{avgChurnProbability.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Platform average</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cohorts</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{cohorts.length}</div>
            <p className="text-xs text-muted-foreground">User groups tracked</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="churn" className="space-y-6">
        <TabsList className="bg-white/5">
          <TabsTrigger value="churn">Churn Prediction</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="sessions">Session Analytics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Forecasts</TabsTrigger>
        </TabsList>

        <TabsContent value="churn" className="space-y-4">
          {highRiskUsers.length > 0 && (
            <Card className="bg-red-500/10 border-red-500/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-400">⚠️ High Churn Risk Detected</p>
                    <p className="text-sm text-muted-foreground">
                      {highRiskUsers.length} user{highRiskUsers.length !== 1 ? "s are" : " is"} at high risk of churning
                    </p>
                  </div>
                  <Button 
                    variant="destructive" 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleSendReengagementCampaign}
                    disabled={sendingCampaign}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {sendingCampaign ? "Sending..." : "Send Re-engagement Campaign"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>At-Risk Users</CardTitle>
              <CardDescription>Users predicted to churn in next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {churnPredictions.slice(0, 15).map((prediction) => (
                  <div key={prediction.id} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className={getRiskColor(prediction.risk_level)}>{prediction.risk_level} risk</Badge>
                        <span className="text-sm font-medium">{prediction.churn_probability?.toFixed(1)}% probability</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Risk factors: {prediction.risk_factors ? Object.keys(prediction.risk_factors).slice(0, 3).join(", ") : "N/A"}
                      </div>
                      {prediction.intervention_suggested && (
                        <div className="text-xs text-blue-400">💡 {prediction.intervention_suggested}</div>
                      )}
                    </div>
                    <div>
                      {!prediction.intervention_sent ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSendIntervention(prediction.id)}
                          disabled={sendingIntervention === prediction.id}
                        >
                          {sendingIntervention === prediction.id ? "Sending..." : "Send Intervention"}
                        </Button>
                      ) : (
                        <Badge className="bg-blue-500/20 text-blue-400">Sent</Badge>
                      )}
                    </div>
                  </div>
                ))}
                {churnPredictions.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">No churn predictions yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>User Cohorts</CardTitle>
              <CardDescription>Retention and LTV analysis by signup period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cohorts.map((cohort) => (
                  <Card key={cohort.id} className="bg-white/10 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-lg">{cohort.cohort_name}</CardTitle>
                      <CardDescription>{cohort.user_count} users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <div className="text-xs text-muted-foreground">30-day retention</div>
                          <div className="text-xl font-bold text-green-400">
                            {cohort.retention_rate_30d?.toFixed(1) || 0}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">60-day retention</div>
                          <div className="text-xl font-bold text-blue-400">
                            {cohort.retention_rate_60d?.toFixed(1) || 0}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">90-day retention</div>
                          <div className="text-xl font-bold text-yellow-400">
                            {cohort.retention_rate_90d?.toFixed(1) || 0}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Avg LTV</div>
                          <div className="text-xl font-bold text-[#B87333]">
                            ${cohort.avg_ltv?.toFixed(0) || 0}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {cohorts.length === 0 && (
                  <div className="text-center text-muted-foreground py-12">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No cohort data yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          {sessionAnalytics.length > 0 && (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Session Trends</CardTitle>
                <CardDescription>Daily active users and session duration</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLine data={sessionAnalytics.slice(0, 30).reverse()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey={(d) => new Date(d.date).toLocaleDateString()} stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    />
                    <Line type="monotone" dataKey="total_active_users" stroke="#B87333" name="Active Users" />
                    <Line type="monotone" dataKey="total_sessions" stroke="#4A90E2" name="Sessions" />
                  </RechartsLine>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {sessionAnalytics.length === 0 && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No session analytics yet</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          {revenueForecasts.length > 0 && (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
                <CardDescription>Predicted revenue for next 90 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLine data={revenueForecasts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey={(d) => new Date(d.forecast_date).toLocaleDateString()} stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    />
                    <Line type="monotone" dataKey="predicted_revenue" stroke="#10B981" name="Forecast" strokeWidth={2} />
                    <Line type="monotone" dataKey="confidence_interval_high" stroke="#4A90E2" strokeDasharray="3 3" name="High" />
                    <Line type="monotone" dataKey="confidence_interval_low" stroke="#F59E0B" strokeDasharray="3 3" name="Low" />
                  </RechartsLine>
                </ResponsiveContainer>
                <div className="mt-4 text-sm text-muted-foreground">
                  Forecast method: {revenueForecasts[0]?.forecast_method || "N/A"}
                </div>
              </CardContent>
            </Card>
          )}

          {revenueForecasts.length === 0 && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No revenue forecasts yet</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveAnalytics;
