import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import { useCompassionateToast } from "@/hooks/useCompassionateToast";

/**
 * The standalone email/password Auth screen has been retired.
 * All sign-in / sign-up flows now live on the cinematic entry screen ("/")
 * which also surfaces the staff (Admin / Therapist / Coach) access options.
 *
 * This page remains mounted ONLY to handle the password-recovery deep link
 * (Supabase redirects to /app/auth?reset=true or with #type=recovery).
 * In every other case we redirect to the cinematic entry screen.
 */
const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useCompassionateToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const isRecovery =
    searchParams.get("reset") === "true" ||
    (typeof window !== "undefined" && window.location.hash.includes("type=recovery"));

  // If user lands here without a recovery token, send them to the cinematic entry.
  useEffect(() => {
    if (!isRecovery) return;
  }, [isRecovery]);

  if (!isRecovery) {
    return <Navigate to="/" replace />;
  }

  if (done) {
    return <Navigate to="/" replace />;
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({
        title: "Password updated",
        description: "You can sign in with your new password.",
      });
      await supabase.auth.signOut();
      setDone(true);
    } catch (err: any) {
      toast({
        title: "We couldn't update that",
        description: err?.message || "Please try the reset link again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <form onSubmit={handleReset} className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Thrive<span className="text-[#B87333]">MT</span>
          </h1>
          <p className="text-white/60">Set your new password</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white/80">New password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white py-3"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (<>Update password <ArrowRight className="ml-2 h-4 w-4" /></>)}
        </Button>
      </form>
    </div>
  );
};

export default Auth;
