
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import ProgressReports from "@/pages/ProgressReports";
import MentalWellnessTools from "@/pages/MentalWellnessTools";
import GamesAndQuizzes from "@/pages/GamesAndQuizzes";
import GamePage from "@/pages/GamePage";
import SmallBusinessExperience from "@/pages/SmallBusinessExperience";
import EmployeeWelcome from "@/pages/EmployeeWelcome";
import EmployeeReadiness from "@/pages/EmployeeReadiness";
import FamilyResources from "@/pages/FamilyResources";
import RealTimeTherapy from "@/pages/RealTimeTherapy";
import HolisticWellness from "@/pages/HolisticWellness";
import AlternativeTherapies from "@/pages/AlternativeTherapies";
import CommunitySupport from "@/pages/CommunitySupport";
import BinauralBeats from "@/pages/BinauralBeats";
import Journaling from "@/pages/Journaling";
import MindfulnessSleep from "@/pages/MindfulnessSleep";
import VideoDiary from "@/pages/VideoDiary";
import ResourceLibrary from "@/pages/ResourceLibrary";
import WellnessChallenges from "@/pages/WellnessChallenges";
import MySponsor from "@/pages/MySponsor";
import Workshops from "@/pages/Workshops";
import WorkshopDetail from "@/pages/WorkshopDetail";
import HelpNavButton from "@/components/help/HelpNavButton";
import CrisisSupport from "@/pages/CrisisSupport";
import LearnMoreAboutThrive from "@/pages/LearnMoreAboutThrive";
import CoPay from "@/pages/CoPay";
import DoDPortal from "@/pages/DoDPortal";
import CollegePortal from "@/pages/CollegePortal";
import MentalHealthGames from "@/pages/MentalHealthGames";
import CosmicGames from "@/pages/CosmicGames";
import DoDWelcome from "@/pages/DoDWelcome";
import CollegeWelcome from "@/pages/CollegeWelcome";
import SmallBusinessWelcome from "@/pages/SmallBusinessWelcome";
import SmallBusinessPortal from "@/pages/SmallBusinessPortal";
import EmployeeDashboard from "@/pages/EmployeeDashboard";
import MilitarySupport from "@/pages/MilitarySupport";
import MilitaryResources from "@/pages/MilitaryResources";
import VirtualMeetings from "@/pages/VirtualMeetings";
import CoPayCredits from "@/pages/CoPayCredits";
import BarterSystem from "@/pages/BarterSystem";
import SubscriptionPlansPage from "@/pages/SubscriptionPlansPage";
import FinancialAssistance from "@/pages/FinancialAssistance";
import ContactSupport from "@/pages/ContactSupport";
import GuidedPractice from "@/pages/GuidedPractice";
import VideoRecordPage from "@/pages/VideoRecordPage";
import VideoLibraryPage from "@/pages/VideoLibraryPage";
import SmallBusinessSelection from "@/pages/SmallBusinessSelection";
import AdolescentWelcome from "@/pages/AdolescentWelcome";
import AdolescentPortal from "@/pages/AdolescentPortal";
import AdolescentSelection from "@/pages/AdolescentSelection";
import GoldenYearsWelcome from "@/pages/GoldenYearsWelcome";
import GoldenYearsPortal from "@/pages/GoldenYearsPortal";
import GoldenYearsJournal from "@/pages/GoldenYearsJournal";
import GoldenSpecializedFeature from "@/pages/GoldenSpecializedFeature";
import GoldenEndOfLifePlanning from "@/pages/GoldenEndOfLifePlanning";
import GoldenMemoryCognitive from "@/pages/GoldenMemoryCognitive";
import UserLead from "@/pages/UserLead";

function App() {
  return (
    <>
      <HelpNavButton />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/progress-reports" element={<ProgressReports />} />
        <Route path="/mental-wellness" element={<MentalWellnessTools />} />
        <Route path="/mental-wellness-tools" element={<MentalWellnessTools />} />
        <Route path="/mental-wellness/assessments" element={<MentalWellnessTools />} />
        <Route path="/mental-wellness/assessments/:quizId" element={<MentalWellnessTools />} />
        <Route path="/family-resources" element={<FamilyResources />} />
        <Route path="/games-and-quizzes" element={<GamesAndQuizzes />} />
        <Route path="/mental-health-games" element={<MentalHealthGames />} />
        <Route path="/cosmic-games" element={<CosmicGames />} />
        <Route path="/game-play/:gameId" element={<GamePage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
        <Route path="/small-business-portal" element={<SmallBusinessPortal />} />
        <Route path="/small-business-welcome" element={<SmallBusinessWelcome />} />
        <Route path="/small-business-selection" element={<SmallBusinessSelection />} />
        <Route path="/employee-welcome" element={<EmployeeWelcome />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee-readiness" element={<EmployeeReadiness />} />
        <Route path="/crisis-support" element={<CrisisSupport />} />
        <Route path="/learn-more" element={<LearnMoreAboutThrive />} />
        <Route path="/co-pay" element={<CoPay />} />
        <Route path="/virtual-meetings" element={<VirtualMeetings />} />
        
        <Route path="/copay-credits" element={<CoPayCredits />} />
        <Route path="/barter-system" element={<BarterSystem />} />
        <Route path="/subscription-plans" element={<SubscriptionPlansPage />} />
        <Route path="/financial-assistance" element={<FinancialAssistance />} />
        <Route path="/contact" element={<ContactSupport />} />
        
        <Route path="/alternative-therapies" element={<AlternativeTherapies />} />
        <Route path="/guided-practice/:therapyId" element={<GuidedPractice />} />
        
        <Route path="/department-of-defense" element={<DoDWelcome />} />
        <Route path="/dod-welcome" element={<DoDWelcome />} />
        <Route path="/dod-portal" element={<DoDPortal />} />
        <Route path="/college-welcome" element={<CollegeWelcome />} />
        <Route path="/college-portal" element={<CollegePortal />} />
        
        <Route path="/adolescent-welcome" element={<AdolescentWelcome />} />
        <Route path="/adolescent-portal" element={<AdolescentPortal />} />
        <Route path="/adolescent-selection" element={<AdolescentSelection />} />
        
        {/* Golden Years Routes */}
        <Route path="/golden-years-welcome" element={<GoldenYearsWelcome />} />
        <Route path="/golden-years-portal" element={<GoldenYearsPortal />} />
        <Route path="/golden-years-journal" element={<GoldenYearsJournal />} />
        <Route path="/golden-years-planning" element={<GoldenEndOfLifePlanning />} />
        <Route path="/golden-years-memory" element={<GoldenMemoryCognitive />} />
        
        {/* Generic handler for other Golden Years features */}
        <Route path="/golden-years-guide" element={<GoldenSpecializedFeature />} />
        <Route path="/golden-years-transitions" element={<GoldenSpecializedFeature />} />
        <Route path="/golden-years-community" element={<GoldenSpecializedFeature />} />
        <Route path="/golden-years-family" element={<GoldenSpecializedFeature />} />
        <Route path="/golden-years-wellness" element={<GoldenSpecializedFeature />} />
        <Route path="/golden-years-calendar" element={<GoldenSpecializedFeature />} />
        
        <Route path="/military-support" element={<MilitarySupport />} />
        <Route path="/military-resources" element={<MilitaryResources />} />
        <Route path="/military-resources/combat-stress" element={<MilitaryResources />} />
        <Route path="/military-resources/transition" element={<MilitaryResources />} />
        <Route path="/military-resources/family" element={<MilitaryResources />} />
        
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshop/:workshopId" element={<WorkshopDetail />} />
        
        <Route path="/real-time-therapy" element={<RealTimeTherapy />} />
        <Route path="/holistic-wellness" element={<HolisticWellness />} />
        <Route path="/community-support" element={<CommunitySupport />} />
        <Route path="/binaural-beats" element={<BinauralBeats />} />
        <Route path="/journaling" element={<Journaling />} />
        <Route path="/mindfulness-sleep" element={<MindfulnessSleep />} />
        <Route path="/video-diary" element={<VideoDiary />} />
        <Route path="/video-diary/record" element={<VideoRecordPage />} />
        <Route path="/video-diary/library" element={<VideoLibraryPage />} />
        <Route path="/video-diary/view/:videoId" element={<VideoLibraryPage />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/wellness-challenges" element={<WellnessChallenges />} />
        <Route path="/my-sponsor" element={<MySponsor />} />
        
        {/* User Lead Route */}
        <Route path="/user-lead" element={<UserLead />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
