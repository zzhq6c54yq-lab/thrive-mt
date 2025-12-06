import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PhoneCallButtonProps {
  phoneNumber: string;
  clientId?: string;
  clientName?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function PhoneCallButton({
  phoneNumber,
  clientId,
  clientName,
  variant = "outline",
  size = "sm",
  className = "",
}: PhoneCallButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCall = async () => {
    if (!phoneNumber) {
      toast({
        title: "No phone number",
        description: "Client phone number is not available.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setCallStatus("dialing");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error("Not authenticated");
      }

      const response = await supabase.functions.invoke("place-call", {
        body: {
          to: phoneNumber,
          clientId,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to place call");
      }

      setCallStatus("connected");
      toast({
        title: "Call initiated",
        description: `Calling ${clientName || phoneNumber}...`,
      });

      // Reset status after a delay
      setTimeout(() => setCallStatus(null), 5000);

    } catch (error: any) {
      console.error("Call error:", error);
      setCallStatus("failed");
      toast({
        title: "Call failed",
        description: error.message || "Unable to place the call. Please try again.",
        variant: "destructive",
      });
      setTimeout(() => setCallStatus(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Calling...
        </>
      );
    }

    if (callStatus === "connected") {
      return (
        <>
          <Phone className="h-3 w-3 mr-1 text-green-500" />
          Connected
        </>
      );
    }

    if (callStatus === "failed") {
      return (
        <>
          <PhoneOff className="h-3 w-3 mr-1 text-red-500" />
          Failed
        </>
      );
    }

    return (
      <>
        <Phone className="h-3 w-3 mr-1" />
        Call
      </>
    );
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCall}
      disabled={isLoading || !phoneNumber}
      className={`border-white/20 text-white/70 hover:text-white hover:bg-white/5 ${className}`}
    >
      {getButtonContent()}
    </Button>
  );
}
