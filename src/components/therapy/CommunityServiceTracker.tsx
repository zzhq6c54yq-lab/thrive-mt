import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";

const serviceHoursSchema = z.object({
  user_id: z.string().uuid(),
  hours_logged: z.number().min(0.5).max(24),
  service_description: z.string().min(1).max(1000).trim(),
  service_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  verified: z.boolean(),
  credit_value: z.number().min(0)
});

export function CommunityServiceTracker() {
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const { data: serviceHours, isLoading } = useQuery({
    queryKey: ["community-service-hours", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("community_service_hours")
        .select("*")
        .eq("user_id", user.id)
        .order("service_date", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const logHoursMutation = useMutation({
    mutationFn: async (data: { hours: number; description: string; date: string }) => {
      if (!user) throw new Error("Not authenticated");

      const insertData = {
        user_id: user.id,
        hours_logged: data.hours,
        service_description: data.description.trim(),
        service_date: data.date,
        verified: false,
        credit_value: data.hours * 15, // Calculate at state minimum wage (~$15/hr)
      };

      const validationResult = serviceHoursSchema.safeParse(insertData);
      if (!validationResult.success) {
        throw new Error(`Validation failed: ${validationResult.error.message}`);
      }

      const { error } = await supabase.from("community_service_hours").insert([insertData]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-service-hours"] });
      toast({ title: "Hours logged successfully!" });
      setHours("");
      setDescription("");
      setDate("");
    },
    onError: () => {
      toast({
        title: "Failed to log hours",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hours || !description || !date) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    logHoursMutation.mutate({
      hours: parseFloat(hours),
      description,
      date,
    });
  };

  const totalVerified = serviceHours
    ?.filter((h) => h.verified)
    .reduce((sum, h) => sum + (h.credit_value || 0), 0) || 0;

  const totalPending = serviceHours
    ?.filter((h) => !h.verified)
    .reduce((sum, h) => sum + (h.credit_value || 0), 0) || 0;

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Credits</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${totalVerified.toFixed(2)}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  ${totalPending.toFixed(2)}
                </p>
              </div>
              <Clock className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Log Hours Form */}
      <Card>
        <CardHeader>
          <CardTitle>Log Community Service Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hours">Hours Completed</Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="e.g. 4.5"
                />
              </div>

              <div>
                <Label htmlFor="date">Service Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Service Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the community service you performed..."
                rows={3}
              />
            </div>

            <Button type="submit" disabled={logHoursMutation.isPending}>
              {logHoursMutation.isPending ? "Logging..." : "Log Hours"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Hours History */}
      <Card>
        <CardHeader>
          <CardTitle>Service History</CardTitle>
        </CardHeader>
        <CardContent>
          {!serviceHours || serviceHours.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No hours logged yet</p>
          ) : (
            <div className="space-y-3">
              {serviceHours.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {new Date(record.service_date).toLocaleDateString()}
                      </span>
                      <Badge variant={record.verified ? "default" : "outline"} className="text-xs">
                        {record.verified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{record.service_description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {record.hours_logged} hours
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#D4AF37]">
                      ${(record.credit_value || 0).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}