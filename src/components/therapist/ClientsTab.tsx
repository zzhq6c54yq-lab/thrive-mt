import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";

interface Client {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string;
  status: string;
  last_session?: string;
  next_appointment?: string;
  total_sessions: number;
  concerns: string[];
  risk_level?: string;
}

interface ClientsTabProps {
  clients: Client[];
}

export default function ClientsTab({ clients }: ClientsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "on-hold":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            onClick={() => setFilterStatus("active")}
          >
            Active
          </Button>
          <Button
            variant={filterStatus === "inactive" ? "default" : "outline"}
            onClick={() => setFilterStatus("inactive")}
          >
            Inactive
          </Button>
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    {client.avatar_url ? (
                      <img src={client.avatar_url} alt={client.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-lg font-semibold text-primary">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{client.name}</h3>
                    <Badge variant="outline" className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                {client.last_session && (
                  <p className="text-muted-foreground">
                    Last session: {format(new Date(client.last_session), "MMM d, yyyy")}
                  </p>
                )}
                {client.next_appointment && (
                  <p className="text-muted-foreground">
                    Next: {format(new Date(client.next_appointment), "MMM d, h:mm a")}
                  </p>
                )}
                <p className="text-muted-foreground">
                  Total sessions: {client.total_sessions}
                </p>
              </div>

              {client.concerns && client.concerns.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {client.concerns.slice(0, 3).map((concern) => (
                    <Badge key={concern} variant="secondary" className="text-xs">
                      {concern}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No clients found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
