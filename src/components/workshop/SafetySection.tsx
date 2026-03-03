import { AlertTriangle, Phone, Heart } from "lucide-react";

interface CrisisResource {
  name: string;
  contact: string;
  description: string;
}

interface SafetySectionProps {
  crisisResources: CrisisResource[];
  whenToSeekHelp: string;
  contraindications?: string[];
}

export const SafetySection = ({
  crisisResources,
  whenToSeekHelp,
  contraindications
}: SafetySectionProps) => {
  return (
    <div className="space-y-4 mt-8">
      {/* When to Seek Help */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
        <div className="flex gap-4">
          <div className="p-2 rounded-lg bg-amber-500/10 h-fit">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-medium text-amber-200 mb-2">
              When to Seek Professional Help
            </h3>
            <p className="text-sm text-amber-200/70 leading-relaxed">
              {whenToSeekHelp}
            </p>
          </div>
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-6">
        <div className="flex gap-4">
          <div className="p-2 rounded-lg bg-rose-500/10 h-fit">
            <Phone className="h-5 w-5 text-rose-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-rose-200 mb-3">
              Crisis Resources - Available 24/7
            </h3>
            <div className="space-y-3">
              {crisisResources.map((resource, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium text-rose-100">
                    {resource.name}
                  </div>
                  <div className="text-rose-300 font-mono text-xs mt-0.5">
                    {resource.contact}
                  </div>
                  <div className="text-rose-200/50 text-xs mt-0.5">
                    {resource.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contraindications */}
      {contraindications && contraindications.length > 0 && (
        <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.04] p-6">
          <div className="flex gap-4">
            <div className="p-2 rounded-lg bg-purple-500/10 h-fit">
              <Heart className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-purple-200 mb-2">
                Important Considerations
              </h3>
              <p className="text-sm text-purple-200/60 mb-3">
                This workshop may not be appropriate if you experience:
              </p>
              <ul className="space-y-1.5 text-sm text-purple-200/70">
                {contraindications.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-purple-200/40 mt-3">
                If any of these apply, please consult with a mental health professional before proceeding.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
