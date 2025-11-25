import { Phone, MapPin, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CrisisResourcesPanel() {
  const crisisResources = [
    {
      title: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 crisis support",
      icon: Phone,
      color: "text-red-500"
    },
    {
      title: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 text-based support",
      icon: Phone,
      color: "text-orange-500"
    },
    {
      title: "Veterans Crisis Line",
      phone: "988 (Press 1)",
      description: "Support for veterans and families",
      icon: Phone,
      color: "text-blue-500"
    },
    {
      title: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Substance abuse and mental health",
      icon: Phone,
      color: "text-green-500"
    }
  ];

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            Emergency Resources for Client
          </p>
        </div>

        {crisisResources.map((resource, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors space-y-2"
          >
            <div className="flex items-start gap-3">
              <resource.icon className={`w-5 h-5 ${resource.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground">{resource.title}</h4>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                <p className="text-lg font-bold text-[hsl(var(--primary))] mt-2">
                  {resource.phone}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[hsl(var(--primary))]" />
            <h4 className="font-semibold text-foreground">Find Nearest ER</h4>
          </div>
          <Button
            onClick={() => window.open('https://www.google.com/maps/search/emergency+room+near+me', '_blank')}
            className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90"
          >
            Search Emergency Rooms
          </Button>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
            <h4 className="font-semibold text-foreground">Safety Plan</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Access and review the client's personalized safety plan
          </p>
          <Button variant="outline" className="w-full">
            View Safety Plan
          </Button>
        </div>

        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-xs text-yellow-600 dark:text-yellow-400">
            <strong>Duty of Care Reminder:</strong> Document all crisis interventions and resource referrals in session notes for HIPAA compliance.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
}
