import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import type { WeeklyAuditLog, RemediationItem } from '@/hooks/useHIPAACompliance';

interface TrendAnalysisSectionProps {
  trendData: Array<{
    week: string;
    hipaaPass: number;
    hipaaFail: number;
    soc2Pass: number;
    soc2Fail: number;
  }>;
  remediations: RemediationItem[];
  auditLogs: WeeklyAuditLog[];
}

const TrendAnalysisSection: React.FC<TrendAnalysisSectionProps> = ({ trendData, remediations, auditLogs }) => {
  // Calculate compliance percentages for line chart
  const complianceTrend = trendData.map(week => ({
    week: week.week.slice(5), // MM-DD format
    hipaaCompliance: week.hipaaPass + week.hipaaFail > 0 
      ? Math.round((week.hipaaPass / (week.hipaaPass + week.hipaaFail)) * 100) 
      : 100,
    soc2Compliance: week.soc2Pass + week.soc2Fail > 0 
      ? Math.round((week.soc2Pass / (week.soc2Pass + week.soc2Fail)) * 100) 
      : 100,
  }));

  // Open issues by risk level
  const openRemediations = remediations.filter(r => r.status !== 'Closed');
  const issuesByRisk = [
    { name: 'High', value: openRemediations.filter(r => r.risk_level === 'High').length, color: '#ef4444' },
    { name: 'Medium', value: openRemediations.filter(r => r.risk_level === 'Medium').length, color: '#eab308' },
    { name: 'Low', value: openRemediations.filter(r => r.risk_level === 'Low').length, color: '#22c55e' },
  ];

  // Issues by category
  const categoryMap: Record<string, { hipaa: number; soc2: number }> = {};
  openRemediations.forEach(r => {
    if (!categoryMap[r.category]) {
      categoryMap[r.category] = { hipaa: 0, soc2: 0 };
    }
    if (r.category.startsWith('HIPAA')) categoryMap[r.category].hipaa++;
    else if (r.category.startsWith('SOC2')) categoryMap[r.category].soc2++;
  });
  const issuesByCategory = Object.entries(categoryMap).map(([category, counts]) => ({
    category: category.replace('HIPAA-', '').replace('SOC2-', ''),
    hipaa: counts.hipaa,
    soc2: counts.soc2,
  })).slice(0, 8);

  // Pass/Fail by category over time (stacked area)
  const categoryTrend = trendData.map(week => ({
    week: week.week.slice(5),
    hipaaPassed: week.hipaaPass,
    hipaaFailed: week.hipaaFail,
    soc2Passed: week.soc2Pass,
    soc2Failed: week.soc2Fail,
  }));

  const COLORS = ['#ef4444', '#eab308', '#22c55e'];

  return (
    <div className="space-y-6">
      {/* Compliance Trend Line Chart */}
      <Card className="bg-gray-800/50 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Compliance Trend (Last 12 Weeks)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="hipaaCompliance" 
                  stroke="#B87333" 
                  strokeWidth={2}
                  name="HIPAA Compliance %"
                  dot={{ fill: '#B87333' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="soc2Compliance" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="SOC 2 Compliance %"
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Open Issues by Risk Level Pie Chart */}
        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">Open Issues by Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issuesByRisk}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {issuesByRisk.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Issues by Category Stacked Bar */}
        <Card className="bg-gray-800/50 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">Open Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issuesByCategory} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                  <YAxis dataKey="category" type="category" stroke="#9ca3af" fontSize={10} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="hipaa" stackId="a" fill="#B87333" name="HIPAA" />
                  <Bar dataKey="soc2" stackId="a" fill="#3b82f6" name="SOC 2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pass/Fail Stacked Area Chart */}
      <Card className="bg-gray-800/50 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Audit Results Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={categoryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="hipaaPassed" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} name="HIPAA Passed" />
                <Area type="monotone" dataKey="hipaaFailed" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="HIPAA Failed" />
                <Area type="monotone" dataKey="soc2Passed" stackId="3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="SOC 2 Passed" />
                <Area type="monotone" dataKey="soc2Failed" stackId="4" stroke="#f97316" fill="#f97316" fillOpacity={0.6} name="SOC 2 Failed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysisSection;
