import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Index from "./pages/Index";
import MilitaryWorkshops from "./pages/MilitaryWorkshops";
import CorporateWellness from "./pages/CorporateWellness";
import Workshops from "./pages/Workshops";
import MindfulnessSleep from "./pages/MindfulnessSleep";
import MySponsor from "./pages/MySponsor";
import BinauralBeats from "./pages/BinauralBeats";
import CrisisSupport from "./pages/CrisisSupport";
import MilitarySupport from "./pages/MilitarySupport";
import CollegePortal from "./pages/CollegePortal";
import CollegeExperience from "./pages/CollegeExperience";
import SmallBusinessPortal from "./pages/SmallBusinessPortal";
import SmallBusinessExperience from "./pages/SmallBusinessExperience";
import EmployeeWelcome from "./pages/EmployeeWelcome";
import EmployeeReadiness from "./pages/EmployeeReadiness";
import MentalWellnessTools from "./pages/MentalWellnessTools";
import ResourceLibrary from "./pages/ResourceLibrary";
import CommunitySupport from "./pages/CommunitySupport";
import LifestyleIntegration from "./pages/LifestyleIntegration";
import FamilySupport from "./pages/FamilySupport";
import ProgressReports from "./pages/ProgressReports";
import AlternativeTherapies from "./pages/AlternativeTherapies";
import TherapistMatches from "./pages/TherapistMatches";
import RealTimeTherapy from "./pages/RealTimeTherapy";
import GamesAndQuizzes from "./pages/GamesAndQuizzes";
import PersonalizedContent from "./pages/PersonalizedContent";
import Journaling from "./pages/Journaling";
import ProgressAnalytics from "./pages/ProgressAnalytics";
import HolisticWellness from "./pages/HolisticWellness";
import SelfHelpResources from "./pages/SelfHelpResources";
import MilitaryResources from "./pages/MilitaryResources";
import MilitaryAffirmations from "./pages/MilitaryAffirmations";
import VirtualMeetings from "./pages/VirtualMeetings";
import MilitaryBlog from "./pages/MilitaryBlog";
import BarterSystem from "./pages/BarterSystem";
import CoPayCredits from "./pages/CoPayCredits";
import SubscriptionPlansPage from "./pages/SubscriptionPlansPage";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/military-workshop/:workshopId" element={<MilitaryWorkshops />} />
          <Route path="/corporate-wellness" element={<CorporateWellness />} />
          <Route path="/workshop/:workshopId" element={<Workshops />} />
          <Route path="/workshop/mindful-communication" element={<Workshops />} />
          <Route path="/workshop/emotional-regulation" element={<Workshops />} />
          <Route path="/workshop/stress-management" element={<Workshops />} />
          <Route path="/mindfulness" element={<MindfulnessSleep />} />
          <Route path="/my-sponsor" element={<MySponsor />} />
          <Route path="/binaural-beats" element={<BinauralBeats />} />
          <Route path="/crisis-support" element={<CrisisSupport />} />
          
          <Route path="/department-of-defense" element={<MilitarySupport />} />
          <Route path="/military-support" element={<MilitarySupport />} />
          <Route path="/military-resources" element={<MilitaryResources />} />
          <Route path="/military-affirmations" element={<MilitaryAffirmations />} />
          <Route path="/military-blog" element={<MilitaryBlog />} />
          
          <Route path="/college-portal" element={<CollegePortal />} />
          <Route path="/college-experience" element={<CollegeExperience />} />
          
          <Route path="/small-business-portal" element={<SmallBusinessPortal />} />
          <Route path="/small-business-experience" element={<SmallBusinessExperience />} />
          <Route path="/employee-welcome" element={<EmployeeWelcome />} />
          <Route path="/employee-readiness" element={<EmployeeReadiness />} />
          
          <Route path="/mental-wellness-tools" element={<MentalWellnessTools />} />
          <Route path="/resource-library" element={<ResourceLibrary />} />
          <Route path="/community-support" element={<CommunitySupport />} />
          <Route path="/lifestyle-integration" element={<LifestyleIntegration />} />
          <Route path="/family-support" element={<FamilySupport />} />
          <Route path="/progress-reports" element={<ProgressReports />} />
          <Route path="/alternative-therapies" element={<AlternativeTherapies />} />
          
          <Route path="/therapist-matches" element={<TherapistMatches />} />
          <Route path="/real-time-therapy" element={<RealTimeTherapy />} />
          
          <Route path="/games-and-quizzes" element={<GamesAndQuizzes />} />
          <Route path="/personalized-content" element={<PersonalizedContent />} />
          <Route path="/journaling" element={<Journaling />} />
          <Route path="/progress-analytics" element={<ProgressAnalytics />} />
          <Route path="/holistic-wellness" element={<HolisticWellness />} />
          <Route path="/self-help-resources" element={<SelfHelpResources />} />
          <Route path="/virtual-meetings" element={<VirtualMeetings />} />
          
          <Route path="/barter-system" element={<BarterSystem />} />
          <Route path="/copay-credits" element={<CoPayCredits />} />
          <Route path="/subscription-plans" element={<SubscriptionPlansPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
