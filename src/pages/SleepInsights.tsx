import React, { useState } from 'react';
import Page from '@/components/Page';
import { useHealthMetrics } from '@/hooks/useHealthMetrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Moon, Smartphone, RefreshCw, Unplug, Activity,
  Clock, Brain, Zap, Eye, TrendingUp, BarChart3, Heart
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend,
  AreaChart, Area,
} from 'recharts';

const STAGE_COLORS = {
  rem: 'hsl(262, 60%, 55%)',
  deep: 'hsl(220, 70%, 45%)',
  light: 'hsl(200, 60%, 60%)',
  awake: 'hsl(40, 80%, 55%)',
};

const SleepInsights: React.FC = () => {
  const {
    metrics, isLoading, isSyncing, isConnected, healthAvailable,
    platform, providerName,
    connectHealth, disconnectHealth, syncHealthData,
    getAverageSleep, getAggregatedSleepStages,
  } = useHealthMetrics();

  const [period, setPeriod] = useState<7 | 14 | 30>(7);

  const avgSleep = getAverageSleep(period);
  const stages = getAggregatedSleepStages(period);
  const sleepMetrics = metrics.slice(0, period).filter(m => m.sleep_duration_hours != null);

  // Chart data
  const durationChartData = [...sleepMetrics].reverse().map(m => ({
    date: new Date(m.metric_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    hours: m.sleep_duration_hours ?? 0,
  }));

  const stagesPieData = [
    { name: 'REM', value: stages.rem, fill: STAGE_COLORS.rem },
    { name: 'Deep', value: stages.deep, fill: STAGE_COLORS.deep },
    { name: 'Light', value: stages.light, fill: STAGE_COLORS.light },
    { name: 'Awake', value: stages.awake, fill: STAGE_COLORS.awake },
  ].filter(d => d.value > 0);

  const stagesBarData = [...sleepMetrics].reverse().map(m => ({
    date: new Date(m.metric_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    rem: m.sleep_stages?.rem ?? 0,
    deep: m.sleep_stages?.deep ?? 0,
    light: m.sleep_stages?.light ?? 0,
    awake: m.sleep_stages?.awake ?? 0,
  }));

  const sleepScore = Math.min(100, Math.round((avgSleep / 8) * 70 + (stages.deep / 90) * 30));

  if (isLoading) {
    return (
      <Page title="Sleep Insights" showBackButton>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-muted-foreground">Loading sleep data...</div>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Sleep Insights" showBackButton>
      <div className="space-y-6 pb-8">
        {/* Connection Status */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{providerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {isConnected ? 'Connected & syncing' : 'Not connected'}
                  </p>
                </div>
                <Badge variant={isConnected ? 'default' : 'secondary'}>
                  {isConnected ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="flex gap-2">
                {isConnected ? (
                  <>
                    <Button size="sm" variant="outline" onClick={() => syncHealthData(period)} isLoading={isSyncing} loadingText="Syncing...">
                      <RefreshCw className="h-4 w-4 mr-1" /> Sync
                    </Button>
                    <Button size="sm" variant="ghost" onClick={disconnectHealth}>
                      <Unplug className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="gold" onClick={connectHealth} disabled={!healthAvailable}>
                    Connect {platform === 'ios' ? 'Apple Health' : platform === 'android' ? 'Health Connect' : 'Demo'}
                  </Button>
                )}
              </div>
            </div>
            {!isConnected && (
              <p className="text-xs text-muted-foreground mt-2">
                🔒 Your health data is encrypted and never shared without your explicit consent.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Period Selector */}
        <Tabs defaultValue="7" onValueChange={(v) => setPeriod(Number(v) as 7 | 14 | 30)}>
          <TabsList className="w-full">
            <TabsTrigger value="7" className="flex-1">7 Days</TabsTrigger>
            <TabsTrigger value="14" className="flex-1">14 Days</TabsTrigger>
            <TabsTrigger value="30" className="flex-1">30 Days</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Score + Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <Moon className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-3xl font-bold text-foreground">{avgSleep.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">Avg Hours/Night</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-3xl font-bold text-foreground">{sleepScore}</p>
              <p className="text-xs text-muted-foreground">Sleep Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Sleep Stage Summary */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'REM', value: stages.rem, icon: Brain, color: STAGE_COLORS.rem },
            { label: 'Deep', value: stages.deep, icon: Zap, color: STAGE_COLORS.deep },
            { label: 'Light', value: stages.light, icon: Eye, color: STAGE_COLORS.light },
            { label: 'Awake', value: stages.awake, icon: Activity, color: STAGE_COLORS.awake },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="bg-card border-border">
              <CardContent className="p-3 text-center">
                <Icon className="h-4 w-4 mx-auto mb-1" style={{ color }} />
                <p className="text-lg font-semibold text-foreground">{value}m</p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Duration Trend Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-foreground">
              <BarChart3 className="h-4 w-4" /> Sleep Duration Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {durationChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={durationChartData}>
                  <defs>
                    <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis domain={[0, 12]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Area type="monotone" dataKey="hours" stroke="hsl(var(--primary))" fill="url(#sleepGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No sleep data yet. Sync to get started.</p>
            )}
          </CardContent>
        </Card>

        {/* Sleep Stages Pie */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-foreground">
              <Brain className="h-4 w-4" /> Average Sleep Stages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stagesPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={stagesPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}m`}
                  >
                    {stagesPieData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No stage data available.</p>
            )}
          </CardContent>
        </Card>

        {/* Stacked Bar: Nightly Stages */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-foreground">
              <Clock className="h-4 w-4" /> Nightly Stage Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stagesBarData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={stagesBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Legend />
                  <Bar dataKey="deep" stackId="a" fill={STAGE_COLORS.deep} name="Deep" />
                  <Bar dataKey="rem" stackId="a" fill={STAGE_COLORS.rem} name="REM" />
                  <Bar dataKey="light" stackId="a" fill={STAGE_COLORS.light} name="Light" />
                  <Bar dataKey="awake" stackId="a" fill={STAGE_COLORS.awake} name="Awake" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">Sync data to see nightly breakdown.</p>
            )}
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">🔒 Privacy & Consent:</strong> ThriveMT only reads health data after your explicit permission.
              Data is encrypted in transit and at rest. You can disconnect and delete all synced data at any time.
              {platform === 'ios' && ' Apple HealthKit data stays on your device unless you choose to sync.'}
              {platform === 'android' && ' Health Connect permissions can be managed in Android Settings.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
};

export default SleepInsights;
