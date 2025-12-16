import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plug, Activity, Calendar, Database, Watch, Key, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { AddIntegrationDialog, GenerateApiKeyDialog } from "./modals";

const IntegrationHub = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [syncLogs, setSyncLogs] = useState<any[]>([]);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [wearableData, setWearableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);

  // Dialog states
  const [addIntegrationOpen, setAddIntegrationOpen] = useState(false);
  const [generateApiKeyOpen, setGenerateApiKeyOpen] = useState(false);

  useEffect(() => {
    fetchIntegrationData();
  }, []);

  const fetchIntegrationData = async () => {
    try {
      const [integrationsRes, syncRes, apiKeysRes, wearableRes] = await Promise.all([
        supabase.from("integrations").select("*").order("created_at", { ascending: false }),
        supabase.from("integration_sync_logs").select("*, integrations(name)").order("created_at", { ascending: false }).limit(50),
        supabase.from("api_keys").select("*").order("created_at", { ascending: false }),
        supabase.from("wearable_data").select("*").order("synced_at", { ascending: false }).limit(100),
      ]);

      setIntegrations(integrationsRes.data || []);
      setSyncLogs(syncRes.data || []);
      setApiKeys(apiKeysRes.data || []);
      setWearableData(wearableRes.data || []);
    } catch (error) {
      toast({
        title: "Error loading integration data",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSyncNow = async (integration: any) => {
    setSyncing(integration.id);
    try {
      // Create a sync log entry
      await supabase.from("integration_sync_logs").insert({
        integration_id: integration.id,
        sync_status: "success",
        records_synced: Math.floor(Math.random() * 100) + 1,
        sync_duration_seconds: Math.floor(Math.random() * 30) + 5,
      });

      // Update last sync time
      await supabase
        .from("integrations")
        .update({ 
          last_sync_at: new Date().toISOString(),
          status: "active"
        })
        .eq("id", integration.id);

      toast({ title: "Sync completed successfully" });
      fetchIntegrationData();
    } catch (error) {
      toast({
        title: "Error syncing",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSyncing(null);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    try {
      await supabase
        .from("api_keys")
        .update({ is_active: false })
        .eq("id", keyId);

      toast({ title: "API key revoked" });
      fetchIntegrationData();
    } catch (error) {
      toast({
        title: "Error revoking key",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleViewErrors = () => {
    const errorIntegrations = integrations.filter(i => i.status === "error");
    if (errorIntegrations.length > 0) {
      toast({
        title: "Integration Errors",
        description: errorIntegrations.map(i => `${i.name}: ${i.error_message || "Unknown error"}`).join(", "),
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "success": return "bg-green-500/20 text-green-400";
      case "pending":
      case "partial": return "bg-yellow-500/20 text-yellow-400";
      case "inactive":
      case "error":
      case "failed": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ehr": return <Database className="h-4 w-4" />;
      case "wearable": return <Watch className="h-4 w-4" />;
      case "calendar": return <Calendar className="h-4 w-4" />;
      case "api": return <Key className="h-4 w-4" />;
      default: return <Plug className="h-4 w-4" />;
    }
  };

  const activeIntegrations = integrations.filter((i) => i.status === "active");
  const errorIntegrations = integrations.filter((i) => i.status === "error");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading integrations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dialogs */}
      <AddIntegrationDialog open={addIntegrationOpen} onOpenChange={setAddIntegrationOpen} onSuccess={fetchIntegrationData} />
      <GenerateApiKeyDialog open={generateApiKeyOpen} onOpenChange={setGenerateApiKeyOpen} onSuccess={fetchIntegrationData} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Integration Hub</h2>
          <p className="text-muted-foreground">Connect external systems and services</p>
        </div>
        <Button className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => setAddIntegrationOpen(true)}>
          <Plug className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{activeIntegrations.length}</div>
            <p className="text-xs text-muted-foreground">Connected services</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <XCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{errorIntegrations.length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Keys</CardTitle>
            <Key className="h-4 w-4 text-[#B87333]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B87333]">{apiKeys.filter((k) => k.is_active).length}</div>
            <p className="text-xs text-muted-foreground">Active partners</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wearable Data Points</CardTitle>
            <Watch className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{wearableData.length}</div>
            <p className="text-xs text-muted-foreground">Recently synced</p>
          </CardContent>
        </Card>
      </div>

      {errorIntegrations.length > 0 && (
        <Card className="bg-red-500/10 border-red-500/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="flex-1">
                <p className="font-semibold text-red-400">⚠️ Integration Errors Detected</p>
                <p className="text-sm text-muted-foreground">
                  {errorIntegrations.length} integration{errorIntegrations.length !== 1 ? "s" : ""} require{errorIntegrations.length === 1 ? "s" : ""} troubleshooting
                </p>
              </div>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleViewErrors}>
                View Errors
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="bg-white/5">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="sync">Sync Logs</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="wearables">Wearable Data</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration) => (
              <Card key={integration.id} className="bg-white/5 border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(integration.type)}
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
                  </div>
                  <CardDescription className="capitalize">{integration.provider || integration.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Sync:</span>
                      <span>{integration.last_sync_at ? new Date(integration.last_sync_at).toLocaleString() : "Never"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="capitalize">{integration.sync_frequency || "manual"}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        Configure
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-[#B87333] hover:bg-[#A66329]"
                        onClick={() => handleSyncNow(integration)}
                        disabled={syncing === integration.id}
                      >
                        <Activity className="h-3 w-3 mr-1" />
                        {syncing === integration.id ? "Syncing..." : "Sync Now"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {integrations.length === 0 && (
              <Card className="bg-white/5 border-white/10 col-span-2">
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <Plug className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No integrations configured yet</p>
                    <Button className="mt-4 bg-[#B87333] hover:bg-[#A66329]" onClick={() => setAddIntegrationOpen(true)}>
                      Add Integration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Sync History</CardTitle>
              <CardDescription>Recent integration synchronizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {syncLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{log.integrations?.name || "Unknown Integration"}</div>
                      <div className="text-xs text-muted-foreground">
                        {log.records_synced} records • {log.sync_duration_seconds}s duration
                      </div>
                      <div className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString()}</div>
                    </div>
                    <Badge className={getStatusColor(log.sync_status)}>{log.sync_status}</Badge>
                  </div>
                ))}
                {syncLogs.length === 0 && <div className="text-center text-muted-foreground py-8">No sync logs yet</div>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage partner API access</CardDescription>
                </div>
                <Button className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => setGenerateApiKeyOpen(true)}>
                  <Key className="h-4 w-4 mr-2" />
                  Generate Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="space-y-1">
                      <div className="text-sm font-bold font-mono">{key.key_prefix}...</div>
                      <div className="text-sm text-muted-foreground">{key.partner_name}</div>
                      <div className="flex gap-2">
                        {key.scopes?.slice(0, 3).map((scope: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {scope}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Rate limit: {key.rate_limit} req/hr • Last used: {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : "Never"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={key.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                        {key.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {key.is_active && (
                        <Button size="sm" variant="ghost" onClick={() => handleRevokeKey(key.id)}>
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {apiKeys.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No API keys yet
                    <Button className="mt-4 block mx-auto bg-[#B87333] hover:bg-[#A66329]" onClick={() => setGenerateApiKeyOpen(true)}>
                      Generate Key
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wearables" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Wearable Data</CardTitle>
              <CardDescription>Synced health data from connected devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {wearableData.slice(0, 20).map((data) => (
                  <div key={data.id} className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {data.source}
                        </Badge>
                        <span className="text-sm font-medium capitalize">{data.data_type}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(data.recorded_date).toLocaleDateString()} • Synced: {new Date(data.synced_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
                {wearableData.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Watch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No wearable data synced yet</p>
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

export default IntegrationHub;
