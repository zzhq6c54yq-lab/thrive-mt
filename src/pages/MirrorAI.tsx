import { MirrorAiChat } from "@/components/mirror-ai/MirrorAiChat";
import BackButton from "@/components/navigation/BackButton";
import ThriveButton from "@/components/navigation/ThriveButton";
import { Badge } from "@/components/ui/badge";

const MirrorAI = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-8">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-5 right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container relative z-10 mx-auto mb-6">
          <div className="flex justify-between items-center">
            <BackButton />
            <div className="text-center flex-1">
              <Badge className="mb-2 bg-purple-500/20 text-purple-400 border-purple-500/40">
                AI Companion
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">MirrorAI</h1>
            </div>
            <ThriveButton size="sm" />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto">
        <MirrorAiChat />
      </div>
    </div>
  );
};

export default MirrorAI;