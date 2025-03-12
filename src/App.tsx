
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
import PersonalizedContent from "@/pages/PersonalizedContent";
import CommunitySupport from "@/pages/CommunitySupport";
import ResourceLibrary from "@/pages/ResourceLibrary";
import ProgressReports from "@/pages/ProgressReports";
import HelpButton from "@/components/HelpButton";

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
        <Route path="/personalized-content" element={<PersonalizedContent />} />
        <Route path="/community-support" element={<CommunitySupport />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/progress-reports" element={<ProgressReports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* HelpButton will handle its own visibility based on route */}
      <HelpButton />
      <Toaster />
    </Router>
  );
}

export default App;
