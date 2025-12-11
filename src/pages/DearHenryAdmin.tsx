import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '@/components/Page';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Loader2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface PendingQuestion {
  id: string;
  question_text: string;
  category: string;
  created_at: string;
  status: string;
}

const DearHenryAdmin: React.FC = () => {
  const [pendingQuestions, setPendingQuestions] = useState<PendingQuestion[]>([]);
  const [approvedQuestions, setApprovedQuestions] = useState<PendingQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingAnswer, setGeneratingAnswer] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    setAuthChecking(true);
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      toast({ 
        title: "Authentication Required", 
        description: "Please log in to access the admin dashboard.",
        variant: "destructive" 
      });
      navigate('/auth');
      return;
    }

    // Check if user has admin role
    const { data: roleCheck, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError) {
      console.error('Error checking admin role:', roleError);
    }

    if (!roleCheck) {
      toast({ 
        title: "Unauthorized Access", 
        description: "You do not have permission to access the admin dashboard.",
        variant: "destructive" 
      });
      navigate('/app/dashboard');
      return;
    }

    setIsAdmin(true);
    setAuthChecking(false);
    fetchQuestions();
  };

  const fetchQuestions = async () => {
    setLoading(true);
    const { data: pending } = await supabase
      .from('henry_questions')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    const { data: approved } = await supabase
      .from('henry_questions')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    setPendingQuestions(pending || []);
    setApprovedQuestions(approved || []);
    setLoading(false);
  };

  const handleApprove = async (questionId: string) => {
    const { error } = await supabase
      .from('henry_questions')
      .update({ status: 'approved' })
      .eq('id', questionId);

    if (!error) {
      toast({ title: "Question Approved", description: "Ready for Henry to answer." });
      fetchQuestions();
    }
  };

  const handleReject = async (questionId: string) => {
    const { error } = await supabase
      .from('henry_questions')
      .update({ status: 'rejected' })
      .eq('id', questionId);

    if (!error) {
      toast({ title: "Question Rejected" });
      fetchQuestions();
    }
  };

  const handleGenerateAnswer = async (question: PendingQuestion) => {
    setGeneratingAnswer(question.id);

    try {
      const { data, error } = await supabase.functions.invoke('generate-henry-answer', {
        body: {
          questionId: question.id,
          questionText: question.question_text,
          category: question.category,
        }
      });

      if (error) throw error;

      toast({
        title: "Answer Generated!",
        description: "Henry's response has been published.",
      });

      fetchQuestions();
    } catch (error) {
      console.error('Error generating answer:', error);
      toast({
        title: "Generation Failed",
        description: "Could not generate answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingAnswer(null);
    }
  };

  if (authChecking || loading) {
    return (
      <Page title="Dear Henry Admin" showBackButton={true}>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Shield className="w-12 h-12 text-amber-500 animate-pulse" />
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          <p className="text-gray-400">
            {authChecking ? 'Verifying admin credentials...' : 'Loading dashboard...'}
          </p>
        </div>
      </Page>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Page title="Dear Henry Admin" showBackButton={true}>
      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingQuestions.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedQuestions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingQuestions.map((question) => (
              <Card key={question.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge>{question.category}</Badge>
                    <span className="text-xs text-gray-500">
                      {format(new Date(question.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>

                  <p className="text-gray-900 dark:text-white font-medium">
                    {question.question_text}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApprove(question.id)}
                      className="text-green-600 border-green-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(question.id)}
                      className="text-red-600 border-red-600"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedQuestions.map((question) => (
              <Card key={question.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge>{question.category}</Badge>
                    <span className="text-xs text-gray-500">
                      {format(new Date(question.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>

                  <p className="text-gray-900 dark:text-white font-medium">
                    {question.question_text}
                  </p>

                  <Button
                    onClick={() => handleGenerateAnswer(question)}
                    disabled={generatingAnswer === question.id}
                    className="bg-gradient-to-r from-amber-500 to-orange-600"
                  >
                    {generatingAnswer === question.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Henry\'s Answer'
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default DearHenryAdmin;
