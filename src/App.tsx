
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import MentalWellnessTools from "@/pages/MentalWellnessTools";
import RealTimeTherapy from "@/pages/RealTimeTherapy";
import MySponsor from "@/pages/MySponsor";
import NotFound from "@/pages/NotFound";
import Page from "@/components/Page";
import TherapistQuestionnaire from "@/pages/TherapistQuestionnaire";
import TherapistMatches from "@/pages/TherapistMatches";
import WorkshopDetail from "@/pages/WorkshopDetail";
import Workshops from "@/pages/Workshops";
import VirtualMeetings from "@/pages/VirtualMeetings";
import ToolDetail from "@/pages/ToolDetail";
import MentalHealthGames from "@/pages/MentalHealthGames";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/mental-wellness-tools" element={<MentalWellnessTools />} />
        <Route path="/mental-wellness-tools/:toolId" element={<ToolDetail />} />
        <Route path="/real-time-therapy" element={<RealTimeTherapy />} />
        <Route path="/scheduling" element={<Page title="Flexible Scheduling" />} />
        <Route path="/privacy-security" element={<Page title="Private & Secure" />} />
        <Route path="/my-sponsor" element={<MySponsor />} />
        <Route path="/therapist-questionnaire" element={<TherapistQuestionnaire />} />
        <Route path="/therapist-matches" element={<TherapistMatches />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshop/:workshopId" element={<WorkshopDetail />} />
        <Route path="/virtual-meetings" element={<VirtualMeetings />} />
        <Route path="/mental-health-games" element={<MentalHealthGames />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
