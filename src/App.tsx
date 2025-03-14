
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
import HolisticWellness from "@/pages/HolisticWellness";
import HelpNavButton from "@/components/help/HelpNavButton";
import BarterSystem from "@/pages/BarterSystem";
import LifestyleIntegration from "@/pages/LifestyleIntegration";
import GamesAndQuizzes from "@/pages/GamesAndQuizzes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/mental-wellness-tools" element={<MentalWellnessTools />} />
        <Route path="/mental-wellness-tools/:toolId" element={<ToolDetail />} />
        <Route path="/real-time-therapy" element={<RealTimeTherapy />} />
        <Route path="/therapy" element={<RealTimeTherapy />} />
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
        <Route path="/holistic-wellness" element={<HolisticWellness />} />
        <Route path="/family-support" element={<Page title="Family & Caregiver Support" />} />
        <Route path="/alternative-therapies" element={<Page title="Alternative Therapies" />} />
        <Route path="/mindfulness" element={<Page title="Mindfulness & Sleep" />} />
        <Route path="/self-help-resources" element={<Page title="Self-Help Resources" />} />
        <Route path="/journaling" element={<Page title="Journaling" />} />
        <Route path="/crisis-support" element={<Page title="Crisis Support" />} />
        <Route path="/progress-analytics" element={<Page title="Progress Analytics" />} />
        <Route path="/barter-system" element={<BarterSystem />} />
        <Route path="/lead-bank" element={<Page title="Lead Bank" />} />
        <Route path="/copay-credits" element={<Page title="Co-Pay Credits" />} />
        <Route path="/financial-assistance" element={<Page title="Financial Assistance Application" />} />
        <Route path="/contact" element={<Page title="Contact Support" />} />
        <Route path="/lifestyle-integration" element={<LifestyleIntegration />} />
        <Route path="/games-and-quizzes" element={<GamesAndQuizzes />} />
        <Route path="/settings" element={<Page title="User Settings" />} />
        <Route path="/profile" element={<Page title="User Profile" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <HelpNavButton />
      <Toaster />
    </Router>
  );
}

export default App;
