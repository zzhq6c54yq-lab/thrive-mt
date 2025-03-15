
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
import Scheduling from "@/pages/Scheduling";
import PrivacySecurity from "@/pages/PrivacySecurity";
import FamilySupport from "@/pages/FamilySupport";
import AlternativeTherapies from "@/pages/AlternativeTherapies";
import MindfulnessSleep from "@/pages/MindfulnessSleep";
import SelfHelpResources from "@/pages/SelfHelpResources";
import Journaling from "@/pages/Journaling";
import CrisisSupport from "@/pages/CrisisSupport";
import ProgressAnalytics from "@/pages/ProgressAnalytics";
import LeadBank from "@/pages/LeadBank";
import CoPayCredits from "@/pages/CoPayCredits";
import FinancialAssistance from "@/pages/FinancialAssistance";
import ContactSupport from "@/pages/ContactSupport";
import UserSettings from "@/pages/UserSettings";
import UserProfile from "@/pages/UserProfile";
import MilitarySupport from "@/pages/MilitarySupport";
import MilitaryWorkshops from "@/pages/MilitaryWorkshops";
import MilitaryResources from "@/pages/MilitaryResources";
import MilitaryAffirmations from "@/pages/MilitaryAffirmations";
import MilitaryBlog from "@/pages/MilitaryBlog";
import DepartmentOfDefense from "@/pages/DepartmentOfDefense";
import WorkplaceMentalHealth from "@/pages/WorkplaceMentalHealth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/mental-wellness-tools" element={<MentalWellnessTools />} />
        <Route path="/mental-wellness-tools/:toolId" element={<ToolDetail />} />
        <Route path="/real-time-therapy" element={<RealTimeTherapy />} />
        <Route path="/therapy" element={<RealTimeTherapy />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/privacy-security" element={<PrivacySecurity />} />
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
        <Route path="/family-support" element={<FamilySupport />} />
        <Route path="/alternative-therapies" element={<AlternativeTherapies />} />
        <Route path="/mindfulness" element={<MindfulnessSleep />} />
        <Route path="/self-help-resources" element={<SelfHelpResources />} />
        <Route path="/journaling" element={<Journaling />} />
        <Route path="/crisis-support" element={<CrisisSupport />} />
        <Route path="/progress-analytics" element={<ProgressAnalytics />} />
        <Route path="/barter-system" element={<BarterSystem />} />
        <Route path="/lead-bank" element={<LeadBank />} />
        <Route path="/copay-credits" element={<CoPayCredits />} />
        <Route path="/financial-assistance" element={<FinancialAssistance />} />
        <Route path="/contact" element={<ContactSupport />} />
        <Route path="/lifestyle-integration" element={<LifestyleIntegration />} />
        <Route path="/games-and-quizzes" element={<GamesAndQuizzes />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/profile" element={<UserProfile />} />
        
        {/* Military Support Section */}
        <Route path="/military-support" element={<MilitarySupport />} />
        <Route path="/military-workshops" element={<MilitaryWorkshops />} />
        <Route path="/military-resources" element={<MilitaryResources />} />
        <Route path="/military-affirmations" element={<MilitaryAffirmations />} />
        <Route path="/military-blog" element={<MilitaryBlog />} />
        <Route path="/department-of-defense" element={<DepartmentOfDefense />} />
        
        {/* Workplace Mental Health Section */}
        <Route path="/workplace-mental-health" element={<WorkplaceMentalHealth />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <HelpNavButton />
      <Toaster />
    </Router>
  );
}

export default App;
