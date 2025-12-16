import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, DollarSign, TrendingUp, AlertCircle, Users, Calendar } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CreatePromoCodeDialog } from "./modals";

const BillingManagement = () => {
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPayouts, setProcessingPayouts] = useState(false);

  // Dialog states
  const [createPromoOpen, setCreatePromoOpen] = useState(false);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      const [subsRes, transRes, payoutsRes, promoRes] = await Promise.all([
        supabase.from("subscriptions").select("*").order("created_at", { ascending: false }),
        supabase.from("payment_transactions").select("*").order("created_at", { ascending: false }).limit(50),
        supabase.from("therapist_payouts").select("*, therapists(name)").order("created_at", { ascending: false }),
        supabase.from("promo_codes").select("*").order("created_at", { ascending: false }),
      ]);

      setSubscriptions(subsRes.data || []);
      setTransactions(transRes.data || []);
      setPayouts(payoutsRes.data || []);
      setPromoCodes(promoRes.data || []);
    } catch (error) {
      toast({
        title: "Error loading billing data",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayouts = async () => {
    setProcessingPayouts(true);
    try {
      // Update all pending payouts to "processing"
      const pendingPayouts = payouts.filter(p => p.status === "pending");
      
      for (const payout of pendingPayouts) {
        await supabase
          .from("therapist_payouts")
          .update({ status: "processing" })
          .eq("id", payout.id);
      }

      toast({ 
        title: "Payouts processing started",
        description: `${pendingPayouts.length} payouts are being processed.`
      });
      fetchBillingData();
    } catch (error) {
      toast({
        title: "Error processing payouts",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setProcessingPayouts(false);
    }
  };

  const calculateMRR = () => {
    return subscriptions
      .filter((s) => s.status === "active" && s.billing_cycle === "monthly")
      .reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
  };

  const calculateARR = () => {
    const monthly = calculateMRR();
    const annual = subscriptions
      .filter((s) => s.status === "active" && s.billing_cycle === "annual")
      .reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    return monthly * 12 + annual;
  };

  const planDistribution = subscriptions.reduce((acc: any, sub) => {
    if (!acc[sub.plan_tier]) acc[sub.plan_tier] = 0;
    acc[sub.plan_tier]++;
    return acc;
  }, {});

  const planData = Object.entries(planDistribution).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const COLORS = ["#B87333", "#4A90E2", "#10B981", "#F59E0B"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
      case "paid":
        return "bg-green-500/20 text-green-400";
      case "pending":
      case "processing":
        return "bg-yellow-500/20 text-yellow-400";
      case "cancelled":
      case "failed":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading billing data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dialogs */}
      <CreatePromoCodeDialog open={createPromoOpen} onOpenChange={setCreatePromoOpen} onSuccess={fetchBillingData} />

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Billing & Revenue</h2>
        <p className="text-muted-foreground">Manage subscriptions, transactions, and payouts</p>
      </div>

      {/* Revenue KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-[#B87333]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B87333]">${calculateMRR().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active monthly subscriptions</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Recurring Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">${calculateARR().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Projected yearly revenue</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {subscriptions.filter((s) => s.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Paying customers</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">
              {transactions.filter((t) => t.status === "failed").length}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList className="bg-white/5">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Therapist Payouts</TabsTrigger>
          <TabsTrigger value="promo">Promo Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
                <CardDescription>Active subscriptions by tier</CardDescription>
              </CardHeader>
              <CardContent>
                {planData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={planData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                        {planData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                    No subscription data
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Recent Subscriptions</CardTitle>
                <CardDescription>Latest 5 subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subscriptions.slice(0, 5).map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="space-y-1">
                        <div className="text-sm font-medium capitalize">{sub.plan_tier} Plan</div>
                        <div className="text-xs text-muted-foreground">{sub.billing_cycle}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm font-bold">${parseFloat(sub.amount || 0).toFixed(2)}</div>
                        <Badge className={getStatusColor(sub.status)}>{sub.status}</Badge>
                      </div>
                    </div>
                  ))}
                  {subscriptions.length === 0 && (
                    <div className="text-center text-muted-foreground py-4">No subscriptions yet</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>All payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {transactions.slice(0, 20).map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{txn.payment_method || "Unknown"}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(txn.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm font-bold">${parseFloat(txn.amount || 0).toFixed(2)}</div>
                      <Badge className={getStatusColor(txn.status)}>{txn.status}</Badge>
                    </div>
                  </div>
                ))}
                {transactions.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">No transactions yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Therapist Payouts</CardTitle>
                  <CardDescription>Manage therapist compensation</CardDescription>
                </div>
                <Button 
                  className="bg-[#B87333] hover:bg-[#A66329]" 
                  onClick={handleProcessPayouts}
                  disabled={processingPayouts || payouts.filter(p => p.status === "pending").length === 0}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {processingPayouts ? "Processing..." : "Process Payouts"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payouts.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{payout.therapists?.name || "Unknown Therapist"}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(payout.period_start).toLocaleDateString()} -{" "}
                        {new Date(payout.period_end).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {payout.session_count} sessions • {payout.total_hours}hrs
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm font-bold">${parseFloat(payout.net_payout || payout.amount || 0).toFixed(2)}</div>
                      <Badge className={getStatusColor(payout.status)}>{payout.status}</Badge>
                    </div>
                  </div>
                ))}
                {payouts.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">No payouts yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promo" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Promo Codes</CardTitle>
                  <CardDescription>Manage discount codes and promotions</CardDescription>
                </div>
                <Button className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => setCreatePromoOpen(true)}>
                  Create Promo Code
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {promoCodes.map((promo) => (
                  <div key={promo.id} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="space-y-1">
                      <div className="text-sm font-bold font-mono">{promo.code}</div>
                      <div className="text-xs text-muted-foreground">
                        {promo.discount_type === "percent" ? `${promo.discount_value}% off` : `$${promo.discount_value} off`}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Used: {promo.current_uses} / {promo.max_uses || "∞"}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={promo.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                        {promo.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {promo.expires_at && (
                        <div className="text-xs text-muted-foreground">
                          Expires: {new Date(promo.expires_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {promoCodes.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No promo codes yet
                    <Button className="mt-4 block mx-auto bg-[#B87333] hover:bg-[#A66329]" onClick={() => setCreatePromoOpen(true)}>
                      Create Promo Code
                    </Button>
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

export default BillingManagement;
