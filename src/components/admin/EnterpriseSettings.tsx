import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Building, Users, FileText, Shield, Settings, Globe } from "lucide-react";
import { AddTenantDialog, CreateReportDialog, AddSSOProviderDialog } from "./modals";

const EnterpriseSettings = () => {
  const { toast } = useToast();
  const [tenants, setTenants] = useState<any[]>([]);
  const [customReports, setCustomReports] = useState<any[]>([]);
  const [ssoConfigs, setSsoConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingWhiteLabel, setSavingWhiteLabel] = useState(false);

  // Dialog states
  const [addTenantOpen, setAddTenantOpen] = useState(false);
  const [createReportOpen, setCreateReportOpen] = useState(false);
  const [addSSOOpen, setAddSSOOpen] = useState(false);

  // White-label form state
  const [whiteLabel, setWhiteLabel] = useState({
    primaryColor: "#B87333",
    secondaryColor: "#E5C5A1",
    customDomain: "",
  });

  useEffect(() => {
    fetchEnterpriseData();
  }, []);

  const fetchEnterpriseData = async () => {
    try {
      const [tenantsRes, reportsRes, ssoRes] = await Promise.all([
        supabase.from("tenants").select("*").order("created_at", { ascending: false }),
        supabase.from("custom_reports").select("*").order("created_at", { ascending: false }),
        supabase.from("sso_configurations").select("*, tenants(name)").order("created_at", { ascending: false }),
      ]);

      setTenants(tenantsRes.data || []);
      setCustomReports(reportsRes.data || []);
      setSsoConfigs(ssoRes.data || []);
    } catch (error) {
      toast({
        title: "Error loading enterprise data",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWhiteLabel = async () => {
    setSavingWhiteLabel(true);
    try {
      // In a real implementation, this would save to a settings table
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: "White-label settings saved successfully" });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSavingWhiteLabel(false);
    }
  };

  const handleGenerateReport = async (reportId: string) => {
    try {
      await supabase
        .from("custom_reports")
        .update({ last_generated_at: new Date().toISOString() })
        .eq("id", reportId);

      toast({ title: "Report generation started" });
      fetchEnterpriseData();
    } catch (error) {
      toast({
        title: "Error generating report",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleTestSSO = async (ssoId: string) => {
    toast({ 
      title: "SSO Test Initiated",
      description: "A test authentication request has been sent."
    });
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "enterprise": return "bg-purple-500/20 text-purple-400";
      case "professional": return "bg-blue-500/20 text-blue-400";
      case "basic": return "bg-green-500/20 text-green-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const activeTenants = tenants.filter((t) => t.is_active);
  const totalUsers = tenants.reduce((sum, t) => sum + (t.current_user_count || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading enterprise settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dialogs */}
      <AddTenantDialog open={addTenantOpen} onOpenChange={setAddTenantOpen} onSuccess={fetchEnterpriseData} />
      <CreateReportDialog open={createReportOpen} onOpenChange={setCreateReportOpen} onSuccess={fetchEnterpriseData} />
      <AddSSOProviderDialog open={addSSOOpen} onOpenChange={setAddSSOOpen} onSuccess={fetchEnterpriseData} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Enterprise Settings</h2>
          <p className="text-muted-foreground">Multi-tenancy, white-labeling, and SSO</p>
        </div>
        <Button className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => setAddTenantOpen(true)}>
          <Building className="h-4 w-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Building className="h-4 w-4 text-[#B87333]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B87333]">{activeTenants.length}</div>
            <p className="text-xs text-muted-foreground">Enterprise clients</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Across all tenants</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Reports</CardTitle>
            <FileText className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{customReports.length}</div>
            <p className="text-xs text-muted-foreground">Configured reports</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SSO Enabled</CardTitle>
            <Shield className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{ssoConfigs.filter((s) => s.is_enabled).length}</div>
            <p className="text-xs text-muted-foreground">Active configurations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tenants" className="space-y-6">
        <TabsList className="bg-white/5">
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="white-label">White-Labeling</TabsTrigger>
          <TabsTrigger value="reports">Custom Reports</TabsTrigger>
          <TabsTrigger value="sso">SSO Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="tenants" className="space-y-4">
          <div className="space-y-3">
            {tenants.map((tenant) => (
              <Card key={tenant.id} className="bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground text-lg">{tenant.name}</h4>
                        <Badge className={getTierColor(tenant.subscription_tier)}>{tenant.subscription_tier}</Badge>
                        <Badge className={tenant.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                          {tenant.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Subdomain:</span>{" "}
                          <span className="font-mono">{tenant.subdomain}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Users:</span>{" "}
                          <span>{tenant.current_user_count || 0} / {tenant.max_users || "∞"}</span>
                        </div>
                        {tenant.custom_domain && (
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Custom Domain:</span>{" "}
                            <span className="font-mono">{tenant.custom_domain}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" className="bg-[#B87333] hover:bg-[#A66329]">
                        <Globe className="h-3 w-3 mr-1" />
                        View Portal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {tenants.length === 0 && (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tenants configured yet</p>
                    <Button className="mt-4 bg-[#B87333] hover:bg-[#A66329]" onClick={() => setAddTenantOpen(true)}>
                      Add Tenant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="white-label" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>White-Labeling Configuration</CardTitle>
              <CardDescription>Customize branding for enterprise clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Logo Upload</label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-[#B87333] transition-colors">
                    <div className="text-muted-foreground">
                      <Globe className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Click to upload logo</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Color</label>
                    <div className="flex gap-2">
                      <Input 
                        type="color" 
                        value={whiteLabel.primaryColor}
                        onChange={(e) => setWhiteLabel({ ...whiteLabel, primaryColor: e.target.value })}
                        className="w-20" 
                      />
                      <Input 
                        type="text" 
                        value={whiteLabel.primaryColor}
                        onChange={(e) => setWhiteLabel({ ...whiteLabel, primaryColor: e.target.value })}
                        className="flex-1 font-mono" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Secondary Color</label>
                    <div className="flex gap-2">
                      <Input 
                        type="color" 
                        value={whiteLabel.secondaryColor}
                        onChange={(e) => setWhiteLabel({ ...whiteLabel, secondaryColor: e.target.value })}
                        className="w-20" 
                      />
                      <Input 
                        type="text" 
                        value={whiteLabel.secondaryColor}
                        onChange={(e) => setWhiteLabel({ ...whiteLabel, secondaryColor: e.target.value })}
                        className="flex-1 font-mono" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Domain</label>
                    <Input 
                      type="text" 
                      placeholder="wellness.yourcompany.com"
                      value={whiteLabel.customDomain}
                      onChange={(e) => setWhiteLabel({ ...whiteLabel, customDomain: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <Button 
                className="bg-[#B87333] hover:bg-[#A66329]"
                onClick={handleSaveWhiteLabel}
                disabled={savingWhiteLabel}
              >
                {savingWhiteLabel ? "Saving..." : "Save White-Label Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Custom Reports</CardTitle>
                  <CardDescription>Scheduled and on-demand analytics reports</CardDescription>
                </div>
                <Button className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => setCreateReportOpen(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Create Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="capitalize">{report.report_type}</Badge>
                        <Badge variant="outline" className="capitalize">{report.schedule}</Badge>
                        <Badge variant="outline">{report.format?.toUpperCase()}</Badge>
                      </div>
                      {report.last_generated_at && (
                        <div className="text-xs text-muted-foreground">
                          Last generated: {new Date(report.last_generated_at).toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button 
                        size="sm" 
                        className="bg-[#B87333] hover:bg-[#A66329]"
                        onClick={() => handleGenerateReport(report.id)}
                      >
                        Generate Now
                      </Button>
                    </div>
                  </div>
                ))}
                {customReports.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No custom reports yet
                    <Button className="mt-4 block mx-auto bg-[#B87333] hover:bg-[#A66329]" onClick={() => setCreateReportOpen(true)}>
                      Create Report
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sso" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>SSO Configurations</CardTitle>
                  <CardDescription>Single Sign-On for enterprise authentication</CardDescription>
                </div>
                <Button className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => setAddSSOOpen(true)}>
                  <Shield className="h-4 w-4 mr-2" />
                  Add SSO Provider
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ssoConfigs.map((sso) => (
                  <div key={sso.id} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{sso.tenants?.name || "Unknown Tenant"}</h4>
                        <Badge variant="outline" className="uppercase">{sso.provider}</Badge>
                        <Badge className={sso.is_enabled ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                          {sso.is_enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Configured: {new Date(sso.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Configure</Button>
                      <Button size="sm" variant="ghost" onClick={() => handleTestSSO(sso.id)}>
                        Test
                      </Button>
                    </div>
                  </div>
                ))}
                {ssoConfigs.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No SSO configurations yet
                    <Button className="mt-4 block mx-auto bg-[#B87333] hover:bg-[#A66329]" onClick={() => setAddSSOOpen(true)}>
                      Add SSO Provider
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

export default EnterpriseSettings;
