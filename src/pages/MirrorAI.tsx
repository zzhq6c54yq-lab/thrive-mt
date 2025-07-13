import { MirrorAiChat } from "@/components/mirror-ai/MirrorAiChat";
import BackButton from "@/components/navigation/BackButton";
import ThriveButton from "@/components/navigation/ThriveButton";

const MirrorAI = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      {/* Navigation Header */}
      <div className="container mx-auto mb-6">
        <div className="flex justify-between items-center">
          <BackButton />
          <h1 className="text-2xl font-bold text-foreground">MirrorAI</h1>
          <ThriveButton size="sm" />
        </div>
      </div>
      
      <div className="container mx-auto">
        <MirrorAiChat />
      </div>
    </div>
  );
};

export default MirrorAI;