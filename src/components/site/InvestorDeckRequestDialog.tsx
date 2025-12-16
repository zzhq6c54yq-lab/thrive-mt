import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InvestorDeckRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const investmentRanges = [
  "Under $50K",
  "$50K - $100K",
  "$100K - $250K",
  "$250K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M+",
  "Exploring Options",
];

export function InvestorDeckRequestDialog({ open, onOpenChange }: InvestorDeckRequestDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    investmentRange: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('investor_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          investment_range: formData.investmentRange || null,
          request_type: 'deck_request',
        });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-investor-request', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          investmentRange: formData.investmentRange,
          requestType: 'deck_request',
        },
      });

      if (emailError) {
        console.error('Email notification failed:', emailError);
      }

      toast({
        title: "Request Submitted!",
        description: "We'll send the investor deck to your email shortly.",
      });

      setFormData({ name: "", email: "", company: "", investmentRange: "" });
      onOpenChange(false);
    } catch (error) {
      console.error('Request submission error:', error);
      toast({
        title: "Request failed",
        description: "We couldn't process your request. Please email investor@thrive-mental.com directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-black border-bronze-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-bronze-300 via-bronze-400 to-bronze-500 bg-clip-text text-transparent flex items-center gap-2">
            <FileText className="w-6 h-6 text-bronze-400" />
            Request Investor Deck
          </DialogTitle>
          <DialogDescription className="text-foreground/70">
            Get our comprehensive investor deck with market analysis, financials, and growth projections.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-foreground">Company / Fund</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your firm or company"
              className="bg-black/50 border-bronze-500/30 focus:border-bronze-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="investmentRange" className="text-foreground">Investment Interest Range</Label>
            <Select value={formData.investmentRange} onValueChange={(value) => setFormData({ ...formData, investmentRange: value })}>
              <SelectTrigger className="bg-black/50 border-bronze-500/30">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {investmentRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Request Investor Deck"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
