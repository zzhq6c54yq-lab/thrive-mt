import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Brain, Target, MessageSquare, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const AISystemsOverview = () => {
  const { toast } = useToast();
  const [matchLogs, setMatchLogs] = useState<any[]>([]);
  const [chatbotStats, setChatbotStats] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [modelPerformance, setModelPerformance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAIData();
  }, []);

  const fetchAIData = async () => {
    try {
      const [matchRes, chatRes, recoRes, modelRes] = await Promise.all([
        supabase.from("ai_match_logs").select("*").order("created_at", { ascending: false }).limit(50),
        supabase.from("chatbot_conversations").select("*").order("created_at", { ascending: false }).limit(50),
        supabase.from("ai_recommendations").select("*").order("created_at", { ascending: false }).limit(50),
        supabase.from("model_performance").select("*").order("recorded_at", { ascending: false }),
      ]);

      setMatchLogs(matchRes.data || []);
      setChatbotStats(chatRes.data || []);
      setRecommendations(recoRes.data || []);
      setModelPerformance(modelRes.data || []);
    } catch (error) {
      toast({
        title: "Error loading AI data",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const matchSuccessRate =
    (matchLogs.filter((m) => m.user_satisfaction_rating && m.user_satisfaction_rating >= 4).length / matchLogs.length) * 100 || 0;

  const overrideRate = (matchLogs.filter((m) => m.was_overridden).length / matchLogs.length) * 100 || 0;

  const chatbotResolutionRate =
    (chatbotStats.filter((c) => c.resolved_without_human).length / chatbotStats.length) * 100 || 0;

  const recommendationCTR = (recommendations.filter((r) => r.was_clicked).length / recommendations.length) * 100 || 0;

  const COLORS = ["#B87333", "#4A90E2", "#10B981", "#F59E0B"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading AI systems data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">AI Systems Overview</h2>
        <p className="text-muted-foreground">Monitor AI matching, chatbots, and recommendations</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Match Success Rate</CardTitle>
            <Target className="h-4 w-4 text-[#B87333]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B87333]">{matchSuccessRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">User satisfaction 4+/5</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chatbot Resolution</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{chatbotResolutionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Handled without human</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Override Rate</CardTitle>
            <XCircle className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">{overrideRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Manual interventions</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recommendation CTR</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{recommendationCTR.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Click-through rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="matching" className="space-y-6">
        <TabsList className="bg-white/5">
          <TabsTrigger value="matching">AI Matching</TabsTrigger>
          <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="models">Model Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="matching" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Match Confidence Distribution</CardTitle>
                <CardDescription>AI confidence scores for therapist matches</CardDescription>
              </CardHeader>
              <CardContent>
                {matchLogs.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={matchLogs.slice(0, 20).map(m => ({ score: m.match_score?.toFixed(0) || 0 }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="score" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      />
                      <Bar dataKey="score" fill="#B87333" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-muted-foreground">No match data</div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Recent Matches</CardTitle>
                <CardDescription>Latest AI-generated therapist matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {matchLogs.slice(0, 5).map((match) => (
                    <div key={match.id} className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Match Score: {match.match_score?.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(match.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        {match.was_overridden ? (
                          <Badge className="bg-orange-500/20 text-orange-400">Overridden</Badge>
                        ) : (
                          <Badge className="bg-green-500/20 text-green-400">Accepted</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  {matchLogs.length === 0 && (
                    <div className="text-center text-muted-foreground py-4">No matches yet</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chatbot" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#B87333]">{chatbotStats.length}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Avg Message Count</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-400">
                  {(chatbotStats.reduce((sum, c) => sum + (c.message_count || 0), 0) / chatbotStats.length || 0).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">Per conversation</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Escalated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-400">
                  {chatbotStats.filter((c) => c.escalated_to_human).length}
                </div>
                <p className="text-xs text-muted-foreground">Required human help</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>Latest chatbot interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {chatbotStats.slice(0, 10).map((chat) => (
                  <div key={chat.id} className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="space-y-1">
                      <div className="text-sm">
                        {chat.message_count} messages • {chat.conversation_duration_seconds}s duration
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(chat.created_at).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {chat.resolved_without_human && (
                        <Badge className="bg-green-500/20 text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolved
                        </Badge>
                      )}
                      {chat.escalated_to_human && (
                        <Badge className="bg-yellow-500/20 text-yellow-400">Escalated</Badge>
                      )}
                    </div>
                  </div>
                ))}
                {chatbotStats.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">No conversations yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Recommendation Performance</CardTitle>
              <CardDescription>AI-powered content and activity suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-2">Click-Through Rate</div>
                    <div className="text-3xl font-bold text-[#B87333]">{recommendationCTR.toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Completion Rate</div>
                    <div className="text-3xl font-bold text-green-400">
                      {((recommendations.filter((r) => r.was_completed).length / recommendations.length) * 100 || 0).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <div className="text-sm font-medium">Recent Recommendations</div>
                  {recommendations.slice(0, 8).map((reco) => (
                    <div key={reco.id} className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="space-y-1">
                        <Badge variant="outline" className="capitalize">
                          {reco.recommendation_type}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          Confidence: {reco.confidence_score?.toFixed(1)}%
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {reco.was_clicked && <Badge className="bg-blue-500/20 text-blue-400">Clicked</Badge>}
                        {reco.was_completed && <Badge className="bg-green-500/20 text-green-400">Completed</Badge>}
                      </div>
                    </div>
                  ))}
                  {recommendations.length === 0 && (
                    <div className="text-center text-muted-foreground py-4">No recommendations yet</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Model Performance Metrics</CardTitle>
              <CardDescription>Training and accuracy metrics for AI models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelPerformance.length > 0 ? (
                  <div className="space-y-3">
                    {[...new Set(modelPerformance.map((m) => m.model_name))].map((modelName) => {
                      const modelData = modelPerformance.filter((m) => m.model_name === modelName);
                      const latestMetrics = modelData.slice(0, 3);
                      return (
                        <Card key={modelName} className="bg-white/10 border-white/20">
                          <CardHeader>
                            <CardTitle className="text-lg">{modelName}</CardTitle>
                            <CardDescription>
                              {latestMetrics[0]?.is_production && (
                                <Badge className="bg-green-500/20 text-green-400">Production</Badge>
                              )}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-2 md:grid-cols-3">
                              {latestMetrics.map((metric) => (
                                <div key={metric.id}>
                                  <div className="text-xs text-muted-foreground capitalize">{metric.metric_name}</div>
                                  <div className="text-lg font-bold">{(metric.metric_value * 100).toFixed(2)}%</div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No model performance data yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AISystemsOverview;
