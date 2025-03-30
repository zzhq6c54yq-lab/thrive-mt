
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import BarterSystem from "@/pages/BarterSystem";
import LifestyleIntegration from "@/pages/LifestyleIntegration";
import GamesAndQuizzes from "@/pages/GamesAndQuizzes";
import Scheduling from "@/pages/Scheduling";
import PrivacySecurity from "@/pages/PrivacySecurity";
import FamilySupport from "@/pages/FamilySupport";
import AlternativeTherapies from "@/pages/AlternativeTherapies";
import AlternativeTherapyDetail from "@/pages/AlternativeTherapyDetail";
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
import DoDPortal from "@/pages/DoDPortal";
import CollegePortal from "@/pages/CollegePortal";
import CollegeExperience from "@/pages/CollegeExperience";
import SmallBusinessPortal from "@/pages/SmallBusinessPortal";
import SmallBusinessExperience from "@/pages/SmallBusinessExperience";
import EmployeeWelcome from "@/pages/EmployeeWelcome";
import EmployeeReadiness from "@/pages/EmployeeReadiness";
import SubscriptionPlansPage from "@/pages/SubscriptionPlansPage";
import BinauralBeats from "@/pages/BinauralBeats";
import HelpNavButton from "@/components/help/HelpNavButton";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
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
        <Route path="/games-quizzes" element={<GamesAndQuizzes />} />
        <Route path="/games-and-quizzes" element={<GamesAndQuizzes />} />
        <Route path="/personalized-content" element={<PersonalizedContent />} />
        <Route path="/community-support" element={<CommunitySupport />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/progress-reports" element={<ProgressReports />} />
        <Route path="/holistic-wellness" element={<HolisticWellness />} />
        <Route path="/family-support" element={<FamilySupport />} />
        <Route path="/alternative-therapies" element={<AlternativeTherapies />} />
        <Route path="/alternative-therapies/:therapyId" element={<AlternativeTherapyDetail />} />
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
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/subscription-plans" element={<SubscriptionPlansPage />} />
        <Route path="/binaural-beats" element={<BinauralBeats />} />
        
        <Route path="/military-support" element={<MilitarySupport />} />
        <Route path="/military-workshops" element={<MilitaryWorkshops />} />
        <Route path="/military-resources" element={<MilitaryResources />} />
        <Route path="/military-affirmations" element={<MilitaryAffirmations />} />
        <Route path="/military-blog" element={<MilitaryBlog />} />
        
        <Route path="/dod-portal" element={<DoDPortal />} />
        
        <Route path="/department-of-defense" element={<Navigate to="/dod-portal" replace />} />
        
        <Route path="/college-portal" element={<CollegePortal />} />
        <Route path="/college-experience" element={<CollegeExperience />} />
        
        <Route path="/small-business-portal" element={<SmallBusinessPortal />} />
        <Route path="/small-business-experience" element={<SmallBusinessExperience />} />
        <Route path="/employee-welcome" element={<EmployeeWelcome />} />
        <Route path="/employee-readiness" element={<EmployeeReadiness />} />
        
        <Route path="/small-business" element={<Navigate to="/small-business-portal" replace />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Keep only this Henry button instance - it will appear across the app */}
      <HelpNavButton />
      <Toaster />
    </Router>
  );
}

export default App;
