
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Search, Filter, Download, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  date: string;
}

const STORAGE_KEY = "thrivemt_leads";

const LeadBank = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", source: "Website" });

  // Load leads from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setLeads(JSON.parse(saved));
    }
  }, []);

  // Save leads to localStorage
  const saveLeads = (updated: Lead[]) => {
    setLeads(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleAddLead = () => {
    if (!newLead.name || !newLead.email) {
      toast({ title: "Missing fields", description: "Name and email are required.", variant: "destructive" });
      return;
    }
    const lead: Lead = {
      id: Date.now(),
      ...newLead,
      status: "New",
      date: new Date().toISOString().split("T")[0],
    };
    saveLeads([lead, ...leads]);
    setNewLead({ name: "", email: "", phone: "", source: "Website" });
    setShowAddDialog(false);
    toast({ title: "Lead Added", description: `${lead.name} has been added.` });
  };

  const handleDeleteLead = (id: number) => {
    saveLeads(leads.filter(l => l.id !== id));
    toast({ title: "Lead Removed" });
  };

  const handleStatusChange = (id: number, status: string) => {
    saveLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = !searchQuery || 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const sourceStats = useMemo(() => {
    if (leads.length === 0) return [];
    const counts: Record<string, number> = {};
    leads.forEach(l => { counts[l.source] = (counts[l.source] || 0) + 1; });
    return Object.entries(counts)
      .map(([source, count]) => ({ source, pct: Math.round((count / leads.length) * 100) }))
      .sort((a, b) => b.pct - a.pct);
  }, [leads]);

  const conversionRate = useMemo(() => {
    if (leads.length === 0) return 0;
    const qualified = leads.filter(l => l.status === "Qualified").length;
    return Math.round((qualified / leads.length) * 100);
  }, [leads]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800";
      case "Contacted": return "bg-yellow-100 text-yellow-800";
      case "Qualified": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">Lead Bank</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Manage and organize potential client leads.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Lead Management</span>
              </div>
              <Button onClick={() => setShowAddDialog(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Lead
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search leads..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">
                  {leads.length === 0 ? "No leads yet" : "No leads match your filters"}
                </p>
                <p className="text-sm mt-1">
                  {leads.length === 0 ? "Click \"Add New Lead\" to get started." : "Try adjusting your search or filter."}
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div>{lead.email}</div>
                          {lead.phone && <div className="text-sm text-gray-500">{lead.phone}</div>}
                        </TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell>
                          <Select value={lead.status} onValueChange={(v) => handleStatusChange(lead.id, v)}>
                            <SelectTrigger className="w-[130px] h-8">
                              <Badge variant="outline" className={getStatusColor(lead.status)}>
                                {lead.status}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="Contacted">Contacted</SelectItem>
                              <SelectItem value="Qualified">Qualified</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteLead(lead.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Lead Sources</CardTitle></CardHeader>
            <CardContent>
              {sourceStats.length === 0 ? (
                <p className="text-sm text-muted-foreground">Add leads to see source breakdown.</p>
              ) : (
                <div className="space-y-2">
                  {sourceStats.map(({ source, pct }) => (
                    <div key={source}>
                      <div className="flex justify-between">
                        <span>{source}</span>
                        <span className="font-medium">{pct}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle className="text-lg">Conversion Rates</CardTitle></CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-6 mb-4 bg-blue-50 rounded-full">
                  <div className="text-5xl font-bold text-blue-600">{conversionRate}%</div>
                </div>
                <p className="text-gray-700">Lead to qualified conversion rate</p>
                <p className="text-sm text-muted-foreground mt-1">{leads.length} total leads</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" onClick={() => setShowAddDialog(true)}>Add New Lead</Button>
                <Button className="w-full" variant="outline" onClick={() => {
                  if (leads.length === 0) return;
                  const csv = ["Name,Email,Phone,Source,Status,Date", ...leads.map(l => `${l.name},${l.email},${l.phone},${l.source},${l.status},${l.date}`)].join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url; a.download = "leads.csv"; a.click();
                  URL.revokeObjectURL(url);
                }}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Lead Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="lead-name">Name *</Label>
              <Input id="lead-name" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} placeholder="Full name" />
            </div>
            <div>
              <Label htmlFor="lead-email">Email *</Label>
              <Input id="lead-email" type="email" value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} placeholder="Email address" />
            </div>
            <div>
              <Label htmlFor="lead-phone">Phone</Label>
              <Input id="lead-phone" value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} placeholder="Phone number" />
            </div>
            <div>
              <Label htmlFor="lead-source">Source</Label>
              <Select value={newLead.source} onValueChange={v => setNewLead({...newLead, source: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddLead}>Add Lead</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadBank;
