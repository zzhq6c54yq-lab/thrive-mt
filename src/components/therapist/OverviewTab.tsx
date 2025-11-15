import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Users, DollarSign, Clock, Star } from "lucide-react";
import { format } from "date-fns";

interface OverviewTabProps {
  stats: {
    activeClients: number;
    sessionsThisWeek: number;
    upcomingToday: number;
    earningsThisMonth: number;
    avgResponseTime: string;
    satisfaction: number;
  };
  upcomingAppointments: any[];
  recentMessages: any[];
}

export default function OverviewTab({ stats, upcomingAppointments, recentMessages }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClients}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sessionsThisWeek}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings (Month)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.earningsThisMonth.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.satisfaction}/5.0</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No appointments today</p>
            ) : (
              upcomingAppointments.slice(0, 4).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {appointment.client_name?.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{appointment.client_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(() => {
                          try {
                            const date = new Date(appointment.appointment_date);
                            if (isNaN(date.getTime())) return 'Invalid time';
                            return format(date, "h:mm a");
                          } catch {
                            return 'Invalid time';
                          }
                        })()} • {appointment.duration_minutes} min
                      </p>
                    </div>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Messages</span>
              {recentMessages.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground">
                  {recentMessages.filter(m => !m.is_read).length} unread
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No recent messages</p>
            ) : (
              recentMessages.slice(0, 4).map((message) => (
                <div key={message.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium truncate">{message.client_name}</p>
                      {!message.is_read && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.message_text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(() => {
                        try {
                          const date = new Date(message.created_at);
                          if (isNaN(date.getTime())) return 'Invalid time';
                          return format(date, "MMM d, h:mm a");
                        } catch {
                          return 'Invalid time';
                        }
                      })()}
                    </p>
                  </div>
                </div>
              ))
            )}
            <Button variant="outline" className="w-full">View All Messages</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
