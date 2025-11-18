import React, { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900">
      <div className="text-center space-y-8 max-w-md">
        <img 
          src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
          alt="ThriveMT Logo"
          className="h-32 w-32 mx-auto object-contain filter drop-shadow-[0_0_12px_rgba(184,115,51,0.6)]"
        />
        
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-white">
            Thrive<span className="text-[#B87333]">MT</span>
          </h1>
          <p className="text-white/60 text-lg">
            You've been logged out successfully
          </p>
        </div>

        <Button 
          className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:opacity-90 text-white px-6 py-3"
          onClick={() => navigate("/")}
        >
          Return to Login
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Auth;
