import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TheGarden } from "@/components/signature-moments/TheGarden";
import { ConstellationView } from "@/components/signature-moments/ConstellationView";
import { VoiceNotesToFuture } from "@/components/signature-moments/VoiceNotesToFuture";
import { WarmthMeter } from "@/components/signature-moments/WarmthMeter";
import { JourneyTimeline } from "@/components/signature-moments/JourneyTimeline";
import BackButton from "@/components/navigation/BackButton";

const SignatureMoments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900 py-8">
      <div className="container mx-auto px-4">
        <BackButton />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Journey</h1>
          <p className="text-gray-400">Signature moments that make ThriveMT uniquely yours</p>
        </div>

        <Tabs defaultValue="garden" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full bg-gray-800/40 border-bronze-400/30">
            <TabsTrigger value="garden">Garden</TabsTrigger>
            <TabsTrigger value="constellation">Constellation</TabsTrigger>
            <TabsTrigger value="voice">Voice Notes</TabsTrigger>
            <TabsTrigger value="warmth">Warmth</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="garden">
            <TheGarden />
          </TabsContent>

          <TabsContent value="constellation">
            <ConstellationView />
          </TabsContent>

          <TabsContent value="voice">
            <VoiceNotesToFuture />
          </TabsContent>

          <TabsContent value="warmth">
            <WarmthMeter />
          </TabsContent>

          <TabsContent value="timeline">
            <JourneyTimeline />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SignatureMoments;
