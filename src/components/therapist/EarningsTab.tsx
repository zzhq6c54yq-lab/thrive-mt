import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Payment {
  id: string;
  date: string;
  client_name: string;
  session_type: string;
  amount: number;
  status: string;
}

interface EarningsTabProps {
  payments: Payment[];
  monthlyData: { month: string; earnings: number }[];
}

export default function EarningsTab({ payments, monthlyData }: EarningsTabProps) {
  const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);
  const thisMonthEarnings = payments
    .filter(p => new Date(p.date).getMonth() === new Date().getMonth())
    .reduce((sum, p) => sum + p.amount, 0);
  const avgSessionValue = totalEarnings / payments.length || 0;
  const pendingEarnings = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${thisMonthEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgSessionValue.toFixed(0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Earnings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: any) => [`$${value}`, "Earnings"]}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.slice(0, 20).map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold">{payment.client_name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{format(new Date(payment.date), "MMM d, yyyy")}</span>
                    <span>•</span>
                    <span className="capitalize">{payment.session_type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                  <div className="text-right">
                    <p className="text-lg font-bold">${payment.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
