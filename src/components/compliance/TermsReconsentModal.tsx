import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Shield, CheckCircle, AlertCircle, X } from 'lucide-react';
import { CURRENT_TERMS_VERSION, TERMS_UPDATED_DATE, getLatestChanges } from '@/lib/termsVersion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TermsReconsentModalProps {
  isOpen: boolean;
  userId: string;
  onAccept: () => void;
  onDecline: () => void;
}

export default function TermsReconsentModal({
  isOpen,
  userId,
  onAccept,
  onDecline
}: TermsReconsentModalProps) {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const latestChanges = getLatestChanges();

  const handleAccept = async () => {
    if (!accepted) {
      toast.error('Please accept the updated terms to continue');
      return;
    }

    setLoading(true);
    try {
      // Update profile with new terms version
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          terms_version: CURRENT_TERMS_VERSION,
          consent_accepted_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) throw profileError;

      // Log to auth_user_audit for compliance
      const { error: auditError } = await supabase
        .from('auth_user_audit')
        .insert({
          user_id: userId,
          action: 'terms_reconsent',
          details: {
            terms_version: CURRENT_TERMS_VERSION,
            accepted_at: new Date().toISOString(),
            ip_address: 'client-side'
          }
        });

      if (auditError) {
        console.error('Audit log error:', auditError);
      }

      toast.success('Thank you for accepting the updated terms');
      onAccept();
    } catch (error) {
      console.error('Error accepting terms:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="w-[95vw] max-w-lg sm:max-w-md md:max-w-lg bg-card border-border/50 p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header with close button */}
        <div className="relative bg-gradient-to-r from-[#B87333]/20 to-[#D4A574]/20 p-4 sm:p-6 border-b border-border/30">
          {/* X Close Button */}
          <button
            onClick={onDecline}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            aria-label="Close and logout"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/60 hover:text-foreground" />
          </button>

          <DialogHeader className="pr-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="p-1.5 sm:p-2 bg-[#B87333]/20 rounded-lg shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A574]" />
              </div>
              <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground">
                Updated Terms & Privacy Policy
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              We've updated our terms to better protect you. Please review the changes below.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Version Info */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Version {CURRENT_TERMS_VERSION}</span>
            <span className="text-muted-foreground">Updated {TERMS_UPDATED_DATE}</span>
          </div>

          {/* What's Changed */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-medium text-foreground flex items-center gap-2 text-sm sm:text-base">
              <AlertCircle className="w-4 h-4 text-[#D4A574]" />
              What's Changed
            </h3>
            <ScrollArea className="h-32 sm:h-40 rounded-lg border border-border/50 bg-muted/30 p-3 sm:p-4">
              <div className="space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm font-medium text-foreground">{latestChanges?.summary}</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {latestChanges?.details?.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollArea>
          </div>

          {/* HIPAA Notice */}
          <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-[#B87333]/10 rounded-lg border border-[#B87333]/30">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574] mt-0.5 shrink-0" />
            <div className="text-xs sm:text-sm">
              <p className="font-medium text-foreground">HIPAA Compliance</p>
              <p className="text-muted-foreground">
                Your health information remains protected under HIPAA. These updates enhance our security measures.
              </p>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-2 sm:gap-3">
            <Checkbox
              id="terms-accept"
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked === true)}
              className="mt-0.5 sm:mt-1"
            />
            <label htmlFor="terms-accept" className="text-xs sm:text-sm text-muted-foreground cursor-pointer">
              I have read and agree to the updated{' '}
              <a href="/app/terms" className="text-[#D4A574] hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/app/privacy" className="text-[#D4A574] hover:underline">Privacy Policy</a>.
            </label>
          </div>

          {/* Action Buttons - Stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onDecline}
              className="w-full sm:flex-1 border-border/50 text-sm py-5 sm:py-4"
            >
              Decline & Logout
            </Button>
            <Button
              onClick={handleAccept}
              disabled={!accepted || loading}
              className="w-full sm:flex-1 bg-gradient-to-r from-[#B87333] to-[#D4A574] text-white hover:opacity-90 text-sm py-5 sm:py-4"
            >
              {loading ? 'Processing...' : 'Accept & Continue'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
