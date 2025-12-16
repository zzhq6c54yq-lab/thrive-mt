import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";
import { DollarSign, TrendingUp, Users, Percent } from "lucide-react";

interface RevenueProjectionsProps {
  requests: any[];
  therapists: any[];
}

export function RevenueProjections({ requests, therapists }: RevenueProjectionsProps) {
  // Calculate revenue by therapist
  const revenueByTherapist = therapists.map(therapist => {
    const therapistRequests = requests.filter(r => r.matched_therapist_id === therapist.id);
    const totalSessionRevenue = therapistRequests.reduce((sum, r) => sum + (r.session_rate || 0), 0);
    const therapistPayout = therapistRequests.reduce((sum, r) => sum + (r.therapist_payout || 0), 0);
    const platformRevenue = therapistRequests.reduce((sum, r) => sum + (r.platform_revenue || 0), 0);
    
    return {
      name: therapist.name?.split(' ')[1] || therapist.name || 'Unknown',
      fullName: therapist.name,
      sessions: therapistRequests.length,
      totalRevenue: totalSessionRevenue,
      therapistPayout,
      platformRevenue,
    };
  }).filter(t => t.sessions > 0).sort((a, b) => b.platformRevenue - a.platformRevenue);

  // Calculate insurance vs self-pay breakdown
  const insuranceRequests = requests.filter(r => r.insurance_provider && r.insurance_provider !== 'self-pay');
  const selfPayRequests = requests.filter(r => !r.insurance_provider || r.insurance_provider === 'self-pay');

  const paymentBreakdown = [
    { name: 'Insurance', value: insuranceRequests.length, revenue: insuranceRequests.reduce((sum, r) => sum + (r.platform_revenue || 0), 0) },
    { name: 'Self-Pay', value: selfPayRequests.length, revenue: selfPayRequests.reduce((sum, r) => sum + (r.platform_revenue || 0), 0) },
  ];

  // Calculate totals
  const totalSessionRevenue = requests.reduce((sum, r) => sum + (r.session_rate || 0), 0);
  const totalTherapistPayout = requests.reduce((sum, r) => sum + (r.therapist_payout || 0), 0);
  const totalPlatformRevenue = requests.reduce((sum, r) => sum + (r.platform_revenue || 0), 0);
  const averageSessionRate = requests.length > 0 ? totalSessionRevenue / requests.length : 0;

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted-foreground))'];

  // Monthly projection (simulated)
  const monthlyData = [
    { month: 'Jan', projected: totalPlatformRevenue * 0.8, actual: totalPlatformRevenue * 0.75 },
    { month: 'Feb', projected: totalPlatformRevenue * 0.9, actual: totalPlatformRevenue * 0.85 },
    { month: 'Mar', projected: totalPlatformRevenue * 1.0, actual: totalPlatformRevenue * 0.95 },
    { month: 'Apr', projected: totalPlatformRevenue * 1.1, actual: totalPlatformRevenue },
    { month: 'May', projected: totalPlatformRevenue * 1.2, actual: null },
    { month: 'Jun', projected: totalPlatformRevenue * 1.3, actual: null },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Session Revenue</p>
                <p className="text-2xl font-bold">${totalSessionRevenue.toFixed(0)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Therapist Payouts</p>
                <p className="text-2xl font-bold text-amber-600">${totalTherapistPayout.toFixed(0)}</p>
              </div>
              <Users className="w-8 h-8 text-amber-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Platform Revenue</p>
                <p className="text-2xl font-bold text-green-600">${totalPlatformRevenue.toFixed(0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Session Rate</p>
                <p className="text-2xl font-bold">${averageSessionRate.toFixed(0)}</p>
              </div>
              <Percent className="w-8 h-8 text-muted-foreground/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toFixed(0)}`, '']} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="projected" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.2}
                    name="Projected"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="hsl(142, 71%, 45%)" 
                    fill="hsl(142, 71%, 45%)" 
                    fillOpacity={0.3}
                    name="Actual"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [
                    `${value} sessions ($${props.payload.revenue.toFixed(0)} revenue)`,
                    name
                  ]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {paymentBreakdown.map((item, index) => (
                <div key={item.name} className="text-center">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">${item.revenue.toFixed(0)} revenue</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Therapist */}
      {revenueByTherapist.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Therapist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByTherapist.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`$${Number(value).toFixed(0)}`, name]}
                    labelFormatter={(label) => revenueByTherapist.find(t => t.name === label)?.fullName || label}
                  />
                  <Legend />
                  <Bar dataKey="therapistPayout" name="Therapist Payout" fill="hsl(var(--muted-foreground))" />
                  <Bar dataKey="platformRevenue" name="Platform Revenue" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
