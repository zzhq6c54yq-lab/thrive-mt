import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import JournalForm from "@/components/JournalForm";
import JournalHistory from "@/components/JournalHistory";
import FeedbackForm from "@/components/FeedbackForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const JournalApp: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/auth");
      } else {
        setUserId(data.session.user.id);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUserId(null);
        navigate("/auth");
      } else {
        setUserId(session.user.id);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  if (!userId) return null;

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => navigate('/dashboard')}
        className="mb-6 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Back to Dashboard
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">My Journal</h1>
      <JournalForm userId={userId} />
      <JournalHistory userId={userId} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Send Us Feedback</h2>
        <FeedbackForm userId={userId} />
      </div>
      <Button className="mt-6" variant="outline" onClick={async () => { await supabase.auth.signOut(); }}>
        Log Out
      </Button>
    </div>
  );
};

export default JournalApp;
