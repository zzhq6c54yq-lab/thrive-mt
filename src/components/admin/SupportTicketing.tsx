import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Headphones, AlertTriangle, Clock, CheckCircle, Search, MessageSquare, Shield } from "lucide-react";
import { CreateTemplateDialog, ViewTicketDialog } from "./modals";

interface Ticket {
  id: string;
  ticket_number: string;
  subject: string;
  status: string;
  priority: string;
  category: string;
  is_crisis: boolean;
  created_at: string;
  first_response_at: string | null;
  resolved_at: string | null;
}

const SupportTicketing = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Dialog states
  const [createTemplateOpen, setCreateTemplateOpen] = useState(false);
  const [viewTicketOpen, setViewTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    fetchTickets();
    fetchTemplates();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      toast({
        title: "Error loading tickets",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase.from("response_templates").select("*");
      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error("Error loading templates:", error);
    }
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setViewTicketOpen(true);
  };

  const handleViewCrisisTickets = () => {
    setFilterStatus("all");
    setFilterPriority("all");
    setSearchTerm("");
    // Filter to only show crisis tickets
    const crisisTickets = tickets.filter(t => t.is_crisis);
    if (crisisTickets.length > 0) {
      setSelectedTicket(crisisTickets[0]);
      setViewTicketOpen(true);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
      case "closed": return "bg-green-500/20 text-green-400";
      case "in_progress": return "bg-blue-500/20 text-blue-400";
      case "waiting_user": return "bg-yellow-500/20 text-yellow-400";
      case "open": return "bg-gray-500/20 text-gray-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "crisis": return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case "clinical": return <Shield className="h-4 w-4 text-blue-400" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const calculateSLA = (ticket: Ticket) => {
    if (ticket.first_response_at) {
      const responseTime = new Date(ticket.first_response_at).getTime() - new Date(ticket.created_at).getTime();
      const hours = Math.floor(responseTime / (1000 * 60 * 60));
      return `${hours}h`;
    }
    return "Pending";
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticket_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const crisisTickets = tickets.filter((t) => t.is_crisis);
  const openTickets = tickets.filter((t) => t.status === "open");
  const avgResponseTime = tickets
    .filter((t) => t.first_response_at)
    .reduce((sum, t) => {
      const diff = new Date(t.first_response_at!).getTime() - new Date(t.created_at).getTime();
      return sum + diff / (1000 * 60 * 60);
    }, 0) / tickets.filter((t) => t.first_response_at).length || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading support tickets...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dialogs */}
      <CreateTemplateDialog open={createTemplateOpen} onOpenChange={setCreateTemplateOpen} onSuccess={fetchTemplates} />
      <ViewTicketDialog open={viewTicketOpen} onOpenChange={setViewTicketOpen} ticket={selectedTicket} onSuccess={fetchTickets} />

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Support Ticketing</h2>
        <p className="text-muted-foreground">Manage user support requests and responses</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-[#B87333]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B87333]">{openTickets.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crisis Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{crisisTickets.length}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{avgResponseTime.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">First response</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {tickets.filter((t) => {
                if (!t.resolved_at) return false;
                const today = new Date().toDateString();
                return new Date(t.resolved_at).toDateString() === today;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">Completed tickets</p>
          </CardContent>
        </Card>
      </div>

      {/* Crisis Banner */}
      {crisisTickets.length > 0 && (
        <Card className="bg-red-500/10 border-red-500/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 animate-pulse" />
              <div className="flex-1">
                <p className="font-semibold text-red-400">⚠️ Crisis Alerts Active</p>
                <p className="text-sm text-muted-foreground">
                  {crisisTickets.length} ticket{crisisTickets.length !== 1 ? "s" : ""} require immediate clinical attention
                </p>
              </div>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleViewCrisisTickets}>
                View Crisis Tickets
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="bg-white/5">
          <TabsTrigger value="tickets">All Tickets</TabsTrigger>
          <TabsTrigger value="templates">Response Templates</TabsTrigger>
          <TabsTrigger value="sla">SLA Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          {/* Filters */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-foreground"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="waiting_user">Waiting User</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-foreground"
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Tickets List */}
          <div className="space-y-3">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(ticket.category)}
                        <span className="font-mono text-sm text-muted-foreground">{ticket.ticket_number}</span>
                        {ticket.is_crisis && (
                          <Badge className="bg-red-500/20 text-red-400 animate-pulse">🚨 CRISIS</Badge>
                        )}
                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        <Badge className={getStatusColor(ticket.status)}>{ticket.status.replace("_", " ")}</Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{ticket.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(ticket.created_at).toLocaleString()} • SLA: {calculateSLA(ticket)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleViewTicket(ticket)}>
                        View
                      </Button>
                      <Button size="sm" className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => handleViewTicket(ticket)}>
                        Respond
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredTickets.length === 0 && (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <Headphones className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tickets found matching your filters</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Response Templates</CardTitle>
                  <CardDescription>Pre-written responses for common inquiries</CardDescription>
                </div>
                <Button className="bg-[#B87333] hover:bg-[#A66329]" onClick={() => setCreateTemplateOpen(true)}>
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {templates.map((template) => (
                  <div key={template.id} className="border-b border-white/10 pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{template.title}</h4>
                        <Badge variant="outline" className="mt-1">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Used {template.usage_count} times</div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{template.body}</p>
                  </div>
                ))}
                {templates.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No templates yet
                    <Button className="mt-4 block mx-auto bg-[#B87333] hover:bg-[#A66329]" onClick={() => setCreateTemplateOpen(true)}>
                      Create Template
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sla" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>SLA Performance</CardTitle>
              <CardDescription>Service level agreement tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Urgent Priority Target</div>
                    <div className="text-2xl font-bold text-red-400">30 minutes</div>
                    <p className="text-xs text-muted-foreground">First response time</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">High Priority Target</div>
                    <div className="text-2xl font-bold text-orange-400">2 hours</div>
                    <p className="text-xs text-muted-foreground">First response time</p>
                  </div>
                </div>
                <div className="text-center text-muted-foreground py-8">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Detailed SLA metrics will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportTicketing;
