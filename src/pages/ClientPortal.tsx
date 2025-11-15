import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientDocumentList } from "@/components/client/ClientDocumentList";
import { FileText, LogOut } from "lucide-react";

export default function ClientPortal() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUserId(session.user.id);

      // Fetch client profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", session.user.id)
        .single();

      if (profile?.display_name) {
        setClientName(profile.display_name);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Documents</h1>
            {clientName && (
              <p className="text-sm text-muted-foreground">Welcome, {clientName}</p>
            )}
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Shared Documents
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              View session notes, treatment plans, and resources shared by your therapist
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="session_note">Session Notes</TabsTrigger>
                <TabsTrigger value="treatment_plan">Treatment Plans</TabsTrigger>
                <TabsTrigger value="assessment">Assessments</TabsTrigger>
                <TabsTrigger value="resource">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <ClientDocumentList clientId={userId} documentType={null} />
              </TabsContent>
              <TabsContent value="session_note" className="mt-6">
                <ClientDocumentList clientId={userId} documentType="session_note" />
              </TabsContent>
              <TabsContent value="treatment_plan" className="mt-6">
                <ClientDocumentList clientId={userId} documentType="treatment_plan" />
              </TabsContent>
              <TabsContent value="assessment" className="mt-6">
                <ClientDocumentList clientId={userId} documentType="assessment" />
              </TabsContent>
              <TabsContent value="resource" className="mt-6">
                <ClientDocumentList clientId={userId} documentType="resource" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
