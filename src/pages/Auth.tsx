import React, { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/");
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // Defer async operations to prevent deadlock
        setTimeout(() => {
          supabase
            .from("profiles")
            .select("is_therapist")
            .eq("id", session.user.id)
            .single()
            .then(({ data: profile }) => {
              if (profile?.is_therapist) {
                navigate("/therapist-dashboard");
              } else {
                navigate("/");
              }
            });
        }, 0);
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730]">
      <div className="text-center space-y-8 max-w-md">
        <img 
          src="/lovable-uploads/2a6e2d10-7c9e-4bdb-ab72-18a61d0fc6a9.png"
          alt="Thrive Logo"
          className="h-20 w-20 mx-auto rounded-2xl shadow-lg"
        />
        
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-white">Therapist Portal</h1>
          <p className="text-white/60 text-lg">
            Welcome back to your practice
          </p>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-8">
            <p className="text-center text-white/70 leading-relaxed">
              This portal is for licensed therapists only. Please use the staff access on the main page to sign in.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
