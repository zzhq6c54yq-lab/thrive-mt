
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import Index from "./pages/Index";
import Home from "./pages/Home";
import EmployeeReadiness from "./pages/EmployeeReadiness";
import EmployeeWelcome from "./pages/EmployeeWelcome";
import MilitarySupport from "./pages/MilitarySupport";
import MilitaryBlog from "./pages/MilitaryBlog";
import MilitaryWorkshops from "./pages/MilitaryWorkshops";
import CoPay from "./pages/CoPay";
import CosmicGames from "./pages/CosmicGames";
import GamesAndQuizzes from "./pages/GamesAndQuizzes";
import MentalWellnessTools from "./pages/MentalWellnessTools";
import LearnMoreAboutThrive from "./pages/LearnMoreAboutThrive";
import Mindfulness from "./pages/Mindfulness";
import PersonalizedContent from "./pages/PersonalizedContent";
import PersonalizedContact from "./pages/PersonalizedContact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProgressReports from "./pages/ProgressReports";
import RealTimeTherapy from "./pages/RealTimeTherapy";
import ResourceLibrary from "./pages/ResourceLibrary";
import SmallBusinessPortal from "./pages/SmallBusinessPortal";
import VideoDiary from "./pages/VideoDiary";
import WellnessChallenges from "./pages/WellnessChallenges";
import Workshops from "./pages/Workshops";
import CommunitySupport from "./pages/CommunitySupport";
import MySponsor from "./pages/MySponsor";
import BinauralBeats from "./pages/BinauralBeats";
import FamilySupport from "./pages/FamilySupport";
import TherapistQuestionnaire from "./pages/TherapistQuestionnaire";
import Journaling from "./pages/Journaling";
import GamePage from "./pages/GamePage";
import MentalHealthGames from "./pages/MentalHealthGames";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employee-readiness" element={<EmployeeReadiness />} />
        <Route path="/employee-welcome" element={<EmployeeWelcome />} />
        <Route path="/military-support" element={<MilitarySupport />} />
        <Route path="/military-blog" element={<MilitaryBlog />} />
        <Route path="/military-workshops" element={<MilitaryWorkshops />} />
        <Route path="/copay-credits" element={<CoPay />} />
        <Route path="/cosmic-games" element={<CosmicGames />} />
        <Route path="/games-and-quizzes" element={<GamesAndQuizzes />} />
        <Route path="/games/:gameId" element={<GamePage />} />
        <Route path="/mental-health-games" element={<MentalHealthGames />} />
        <Route path="/mental-wellness-tools" element={<MentalWellnessTools />} />
        <Route path="/learn-more-about-thrive" element={<LearnMoreAboutThrive />} />
        <Route path="/mindfulness" element={<Mindfulness />} />
        <Route path="/personalized-content" element={<PersonalizedContent />} />
        <Route path="/personalized-contact" element={<PersonalizedContact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/progress-reports" element={<ProgressReports />} />
        <Route path="/real-time-therapy" element={<RealTimeTherapy />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/small-business-portal" element={<SmallBusinessPortal />} />
        <Route path="/video-diary" element={<VideoDiary />} />
        <Route path="/wellness-challenges" element={<WellnessChallenges />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/community-support" element={<CommunitySupport />} />
        <Route path="/my-sponsor" element={<MySponsor />} />
        <Route path="/binaural-beats" element={<BinauralBeats />} />
        <Route path="/family-support" element={<FamilySupport />} />
        <Route path="/therapist-questionnaire" element={<TherapistQuestionnaire />} />
        <Route path="/journaling" element={<Journaling />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
