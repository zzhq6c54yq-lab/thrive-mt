import { Lock, ShieldCheck } from "lucide-react";

export default function HIPAANotice() {
  return (
    <div className="absolute bottom-20 left-6 p-4 rounded-lg bg-background/90 backdrop-blur-xl border border-border/50 max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))]/20 flex items-center justify-center">
            <Lock className="w-5 h-5 text-[hsl(var(--primary))]" />
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <p className="text-sm font-semibold text-foreground">HIPAA Compliant Session</p>
          </div>
          <p className="text-xs text-muted-foreground">
            This session is <strong>not recorded</strong>. All communications are encrypted end-to-end and comply with HIPAA privacy standards.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">No Recording</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
