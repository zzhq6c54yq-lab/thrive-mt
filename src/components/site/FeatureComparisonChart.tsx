import { Check, X } from "lucide-react";
import { featureComparisonData, FeatureStatus } from "@/data/investorOverviewContent";

const StatusCell = ({ status }: { status: FeatureStatus }) => {
  if (status === "yes") {
    return (
      <div className="flex items-center justify-center">
        <div className="p-1 rounded-full bg-emerald-500/20">
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
    );
  }
  
  if (status === "no") {
    return (
      <div className="flex items-center justify-center">
        <div className="p-1 rounded-full bg-red-500/20">
          <X className="w-4 h-4 text-red-400" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center">
      <span className="text-amber-400 text-xs font-medium">Limited</span>
    </div>
  );
};

export const FeatureComparisonChart = () => {
  return (
    <div className="overflow-x-auto -mx-4 md:mx-0">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-bronze-500/30">
            <th className="text-left p-3 text-foreground/60 font-medium">Capability</th>
            <th className="text-center p-3 font-semibold bg-bronze-500/10 text-bronze-400">Thrive</th>
            <th className="text-center p-3 text-foreground/60 font-medium">Calm</th>
            <th className="text-center p-3 text-foreground/60 font-medium">BetterHelp</th>
            <th className="text-center p-3 text-foreground/60 font-medium">Woebot</th>
            <th className="text-center p-3 text-foreground/60 font-medium">SimplePractice</th>
          </tr>
        </thead>
        <tbody>
          {featureComparisonData.map((row, index) => (
            <tr 
              key={row.capability} 
              className={`border-b border-bronze-500/10 ${index % 2 === 0 ? 'bg-black' : 'bg-bronze-500/5'}`}
            >
              <td className="p-3 font-medium text-foreground/80">{row.capability}</td>
              <td className="p-3 bg-bronze-500/10">
                <StatusCell status={row.thrive} />
              </td>
              <td className="p-3">
                <StatusCell status={row.calm} />
              </td>
              <td className="p-3">
                <StatusCell status={row.betterhelp} />
              </td>
              <td className="p-3">
                <StatusCell status={row.woebot} />
              </td>
              <td className="p-3">
                <StatusCell status={row.simplepractice} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
