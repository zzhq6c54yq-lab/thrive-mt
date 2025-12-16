import { strategicComparisonData } from "@/data/investorOverviewContent";

export const StrategicComparisonChart = () => {
  return (
    <div className="overflow-x-auto -mx-4 md:mx-0">
      <table className="w-full min-w-[700px] text-sm">
        <thead>
          <tr className="border-b border-bronze-500/30">
            <th className="text-left p-3 text-foreground/60 font-medium">Category</th>
            <th className="text-left p-3 font-semibold bg-bronze-500/10 text-bronze-400">Thrive MT</th>
            <th className="text-left p-3 text-foreground/60 font-medium">Calm / Headspace</th>
            <th className="text-left p-3 text-foreground/60 font-medium">BetterHelp / Talkspace</th>
            <th className="text-left p-3 text-foreground/60 font-medium">Lyra / Spring Health</th>
          </tr>
        </thead>
        <tbody>
          {strategicComparisonData.map((row, index) => (
            <tr 
              key={row.category} 
              className={`border-b border-bronze-500/10 ${index % 2 === 0 ? 'bg-black' : 'bg-bronze-500/5'}`}
            >
              <td className="p-3 font-medium text-foreground/80">{row.category}</td>
              <td className="p-3 bg-bronze-500/10 text-bronze-300 font-medium">{row.thrive}</td>
              <td className="p-3 text-foreground/60">{row.calm}</td>
              <td className="p-3 text-foreground/60">{row.betterhelp}</td>
              <td className="p-3 text-foreground/60">{row.lyra}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
