import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSmartMatchRequests, useCPTCodes } from "@/hooks/useSmartMatch";
import { useTherapists } from "@/hooks/useTherapists";
import { DollarSign, Users, TrendingUp, FileCheck, MapPin, Shield, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { RevenueProjections } from "./RevenueProjections";

export function SmartMatchDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: requests, isLoading: loadingRequests } = useSmartMatchRequests();
  const { data: therapists, isLoading: loadingTherapists } = useTherapists();
  const { data: cptCodes, isLoading: loadingCPT } = useCPTCodes();

  const filteredRequests = requests?.filter(r => 
    statusFilter === "all" || r.status === statusFilter
  ) || [];

  // Calculate summary stats
  const totalRequests = requests?.length || 0;
  const pendingRequests = requests?.filter(r => r.status === 'pending').length || 0;
  const matchedRequests = requests?.filter(r => r.matched_therapist_id).length || 0;
  const totalProjectedRevenue = requests?.reduce((sum, r) => sum + (r.platform_revenue || 0), 0) || 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'matched':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Matched</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loadingRequests || loadingTherapists) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-3xl font-bold">{totalRequests}</p>
              </div>
              <Users className="w-10 h-10 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Matches</p>
                <p className="text-3xl font-bold text-amber-600">{pendingRequests}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-amber-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Matched</p>
                <p className="text-3xl font-bold text-green-600">{matchedRequests}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projected Revenue</p>
                <p className="text-3xl font-bold text-primary">${totalProjectedRevenue.toFixed(0)}</p>
              </div>
              <DollarSign className="w-10 h-10 text-primary/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests">
        <TabsList>
          <TabsTrigger value="requests">Patient Requests</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Projections</TabsTrigger>
          <TabsTrigger value="cpt">CPT Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="matched">Matched</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Smart Match Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Session Type</TableHead>
                    <TableHead>Matched Therapist</TableHead>
                    <TableHead>Session Rate</TableHead>
                    <TableHead>Platform Revenue</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          {format(new Date(request.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            {request.state}
                          </div>
                        </TableCell>
                        <TableCell>
                          {request.insurance_provider ? (
                            <div className="flex items-center gap-1">
                              <Shield className="w-3 h-3 text-green-600" />
                              {request.insurance_provider}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Self-Pay</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            {request.session_duration}min {request.session_type}
                          </div>
                        </TableCell>
                        <TableCell>
                          {request.therapists ? (
                            <span className="font-medium">{request.therapists.name}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {request.session_rate ? `$${request.session_rate}` : '-'}
                        </TableCell>
                        <TableCell className="font-medium text-primary">
                          {request.platform_revenue ? `$${request.platform_revenue.toFixed(2)}` : '-'}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(request.status)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueProjections requests={requests || []} therapists={therapists || []} />
        </TabsContent>

        <TabsContent value="cpt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CPT Session Codes</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingCPT ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CPT Code</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Session Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Max Insurance</TableHead>
                      <TableHead>Self-Pay Rate</TableHead>
                      <TableHead>Telehealth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cptCodes?.map((code) => (
                      <TableRow key={code.id}>
                        <TableCell className="font-mono font-medium">{code.cpt_code}</TableCell>
                        <TableCell>{code.session_duration} min</TableCell>
                        <TableCell>{code.session_type}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{code.description}</TableCell>
                        <TableCell className="text-green-600">${code.max_insurance_reimbursement}</TableCell>
                        <TableCell>${code.self_pay_rate_suggested}</TableCell>
                        <TableCell>
                          {code.telehealth_compatible ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
