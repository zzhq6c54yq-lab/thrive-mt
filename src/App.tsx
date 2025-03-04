
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RealTimeTherapy from "./pages/RealTimeTherapy";
import MentalWellnessTools from "./pages/MentalWellnessTools";
import ToolDetail from "./pages/ToolDetail";
import NotFound from "./pages/NotFound";
import TherapistQuestionnaire from "./pages/TherapistQuestionnaire";
import TherapistMatches from "./pages/TherapistMatches";
import HomeButton from "./components/HomeButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/real-time-therapy" element={<RealTimeTherapy />} />
          <Route path="/mental-wellness-tools" element={<MentalWellnessTools />} />
          <Route path="/mental-wellness-tools/:toolId" element={<ToolDetail />} />
          <Route path="/therapist-questionnaire" element={<TherapistQuestionnaire />} />
          <Route path="/therapist-matches" element={<TherapistMatches />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
