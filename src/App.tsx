
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

function App() {
  return (
    <>
      <HelpNavButton />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/progress-reports" element={<ProgressReports />} />
        <Route path="/mental-wellness" element={<MentalWellnessTools />} />
        <Route path="/family-resources" element={<FamilyResources />} />
        <Route path="/games-and-quizzes" element={<GamesAndQuizzes />} />
        <Route path="/game-play/:gameId" element={<GamePage />} />
        <Route path="/small-business-portal" element={<SmallBusinessExperience />} />
        <Route path="/employee-welcome" element={<EmployeeWelcome />} />
        <Route path="/employee-readiness" element={<EmployeeReadiness />} />
        <Route path="/crisis-support" element={<CrisisSupport />} />
        <Route path="/learn-more" element={<LearnMoreAboutThrive />} />
        <Route path="/co-pay" element={<CoPay />} />
        
        {/* Specialized Programs Routes */}
        <Route path="/department-of-defense" element={<DoDPortal />} />
        <Route path="/dod-portal" element={<DoDPortal />} />
        <Route path="/college-portal" element={<CollegePortal />} />
        
        {/* Workshop Routes */}
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshop/:workshopId" element={<WorkshopDetail />} />
        
        {/* Mental Wellness Routes */}
        <Route path="/real-time-therapy" element={<RealTimeTherapy />} />
        <Route path="/holistic-wellness" element={<HolisticWellness />} />
        <Route path="/alternative-therapies" element={<AlternativeTherapies />} />
        <Route path="/community-support" element={<CommunitySupport />} />
        <Route path="/binaural-beats" element={<BinauralBeats />} />
        <Route path="/journaling" element={<Journaling />} />
        <Route path="/mindfulness-sleep" element={<MindfulnessSleep />} />
        <Route path="/video-diary" element={<VideoDiary />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/wellness-challenges" element={<WellnessChallenges />} />
        <Route path="/my-sponsor" element={<MySponsor />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
