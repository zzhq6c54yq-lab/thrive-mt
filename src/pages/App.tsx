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
import AlternativeTherapyDetail from "@/pages/AlternativeTherapyDetail";
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
import FirstRespondersWelcome from "@/pages/FirstRespondersWelcome";
import FirstRespondersPortal from "@/pages/FirstRespondersPortal";
import FirstRespondersResources from "@/pages/FirstRespondersResources";
import FirstRespondersPeerSupport from "@/pages/FirstRespondersPeerSupport";
import FirstRespondersCriticalSupport from "@/pages/FirstRespondersCriticalSupport";
import FirstRespondersStressManagement from "@/pages/FirstRespondersStressManagement";
import LawEnforcementWelcome from "@/pages/LawEnforcementWelcome";
import LawEnforcementPortal from "@/pages/LawEnforcementPortal";
import EducatorsWelcome from "@/pages/EducatorsWelcome";
import EducatorsPortal from "@/pages/EducatorsPortal";
import EducatorsBurnoutAssessment from "@/pages/EducatorsBurnoutAssessment";
import EducatorsClassroomStressAssessment from "@/pages/EducatorsClassroomStressAssessment";
import EducatorsWorkLifeBalanceAssessment from "@/pages/EducatorsWorkLifeBalanceAssessment";
import NotFound from "@/pages/NotFound";
import GenerativeVideo from "@/pages/GenerativeVideo";
import HospitalityWelcome from "@/pages/HospitalityWelcome";
import HospitalityPortal from "@/pages/HospitalityPortal";
import HospitalityStressAssessment from "@/pages/HospitalityStressAssessment";
import HospitalityBurnoutAssessment from "@/pages/HospitalityBurnoutAssessment";
import HospitalityWorkLifeBalanceAssessment from "@/pages/HospitalityWorkLifeBalanceAssessment";
import TransportWelcome from "@/pages/TransportWelcome";
import TransportPortal from "@/pages/TransportPortal";
import TransportStressAssessment from "@/pages/TransportStressAssessment";
import TransportBurnoutAssessment from "@/pages/TransportBurnoutAssessment";
import TransportWorkLifeBalanceAssessment from "@/pages/TransportWorkLifeBalanceAssessment";
import ChronicIllnessWelcome from "@/pages/ChronicIllnessWelcome";
import ChronicIllnessPortal from "@/pages/ChronicIllnessPortal";
import CancerSupportWelcome from "@/pages/CancerSupportWelcome";
import CancerSupportPortal from "@/pages/CancerSupportPortal";

// Import additional routes for specific chronic illness pages if needed
// These can be added as the specific content pages are built

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
        <Route path="/alternative-therapies/detail/:therapyId" element={<AlternativeTherapyDetail />} />
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
        
        {/* First Responders Routes */}
        <Route path="/first-responders-welcome" element={<FirstRespondersWelcome />} />
        <Route path="/first-responders-portal" element={<FirstRespondersPortal />} />
        <Route path="/first-responders-resources" element={<FirstRespondersResources />} />
        <Route path="/first-responders/peer-support" element={<FirstRespondersPeerSupport />} />
        <Route path="/first-responders/critical-support" element={<FirstRespondersCriticalSupport />} />
        <Route path="/first-responders/stress-management" element={<FirstRespondersStressManagement />} />
        
        {/* Routes for First Responders practice paths */}
        <Route path="/first-responders-practice/:practiceId" element={<GuidedPractice />} />
        <Route path="/first-responders-workshops/:workshopId" element={<WorkshopDetail />} />
        <Route path="/first-responders-assessments/:assessmentId" element={<MentalWellnessTools />} />
        
        {/* Esteemed Educators Routes */}
        <Route path="/educators-welcome" element={<EducatorsWelcome />} />
        <Route path="/educators-portal" element={<EducatorsPortal />} />
        <Route path="/educators-workshops/:workshopId" element={<WorkshopDetail />} />
        <Route path="/educators-assessments/educator-burnout" element={<EducatorsBurnoutAssessment />} />
        <Route path="/educators-assessments/classroom-stress" element={<EducatorsClassroomStressAssessment />} />
        <Route path="/educators-assessments/work-life-balance" element={<EducatorsWorkLifeBalanceAssessment />} />
        <Route path="/educators-assessments/:assessmentId" element={<MentalWellnessTools />} />
        <Route path="/educators-practice/:practiceId" element={<GuidedPractice />} />
        <Route path="/educators-events" element={<VirtualMeetings />} />
        <Route path="/educators-community" element={<CommunitySupport />} />
        
        {/* Hospitality Industry Routes */}
        <Route path="/hospitality-welcome" element={<HospitalityWelcome />} />
        <Route path="/hospitality-portal" element={<HospitalityPortal />} />
        <Route path="/hospitality-assessments/stress" element={<HospitalityStressAssessment />} />
        <Route path="/hospitality-assessments/burnout" element={<HospitalityBurnoutAssessment />} />
        <Route path="/hospitality-assessments/work-life-balance" element={<HospitalityWorkLifeBalanceAssessment />} />
        <Route path="/hospitality-workshops/:workshopId" element={<WorkshopDetail />} />
        <Route path="/hospitality-practice/:practiceId" element={<GuidedPractice />} />
        <Route path="/hospitality-community" element={<CommunitySupport />} />
        
        {/* Transport Industry Routes */}
        <Route path="/transport-welcome" element={<TransportWelcome />} />
        <Route path="/transport-portal" element={<TransportPortal />} />
        <Route path="/transport-assessments/stress" element={<TransportStressAssessment />} />
        <Route path="/transport-assessments/burnout" element={<TransportBurnoutAssessment />} />
        <Route path="/transport-assessments/work-life-balance" element={<TransportWorkLifeBalanceAssessment />} />
        <Route path="/transport-workshops/:workshopId" element={<WorkshopDetail />} />
        <Route path="/transport-practice/:practiceId" element={<GuidedPractice />} />
        <Route path="/transport-community/:communityId" element={<CommunitySupport />} />
        <Route path="/transport-resources/:resourceId" element={<ResourceLibrary />} />
        
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
        
        {/* Law Enforcement Routes */}
        <Route path="/law-enforcement-welcome" element={<LawEnforcementWelcome />} />
        <Route path="/law-enforcement-portal" element={<LawEnforcementPortal />} />
        
        <Route path="/generative-video" element={<GenerativeVideo />} />
        
        {/* Chronic Illness Routes */}
        <Route path="/chronic-illness-welcome" element={<ChronicIllnessWelcome />} />
        <Route path="/chronic-illness-portal" element={<ChronicIllnessPortal />} />
        <Route path="/chronic-illness/education" element={<WorkshopDetail />} />
        <Route path="/chronic-illness/stories" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/mood" element={<MentalWellnessTools />} />
        <Route path="/chronic-illness/coping" element={<GuidedPractice />} />
        <Route path="/chronic-illness/symptoms" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/medications" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/community" element={<CommunitySupport />} />
        <Route path="/chronic-illness/groups" element={<VirtualMeetings />} />
        <Route path="/chronic-illness/teletherapy" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/resources" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/meditations" element={<GuidedPractice />} />
        <Route path="/chronic-illness/movement" element={<GuidedPractice />} />
        <Route path="/chronic-illness/goals" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/progress" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/caregivers" element={<WorkshopDetail />} />
        <Route path="/chronic-illness/communication" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/connect" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/health-data" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/feedback" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/assess-needs" element={<MentalWellnessTools />} />
        <Route path="/chronic-illness/pain-management" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/specialists" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/nutrition" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/respite" element={<ResourceLibrary />} />
        <Route path="/chronic-illness/live-workshops" element={<VirtualMeetings />} />
        <Route path="/chronic-illness/assess-a1" element={<MentalWellnessTools />} />
        <Route path="/chronic-illness/assess-a2" element={<MentalWellnessTools />} />
        <Route path="/chronic-illness/assess-a3" element={<MentalWellnessTools />} />
        
        {/* Cancer Support Routes */}
        <Route path="/cancer-support-welcome" element={<CancerSupportWelcome />} />
        <Route path="/cancer-support-portal" element={<CancerSupportPortal />} />
        <Route path="/cancer-support/newly-diagnosed" element={<ResourceLibrary />} />
        <Route path="/cancer-support/treatment" element={<ResourceLibrary />} />
        <Route path="/cancer-support/stages" element={<ResourceLibrary />} />
        <Route path="/cancer-support/survivorship" element={<ResourceLibrary />} />
        <Route path="/cancer-support/peer-connect" element={<CommunitySupport />} />
        <Route path="/cancer-support/events" element={<VirtualMeetings />} />
        <Route path="/cancer-support/types/:cancerType" element={<ResourceLibrary />} />
        <Route path="/cancer-support/immediate-support" element={<RealTimeTherapy />} />
        
        {/* Caregiver Routes */}
        <Route path="/cancer-support/caregiver-basics" element={<ResourceLibrary />} />
        <Route path="/cancer-support/caregiver-selfcare" element={<ResourceLibrary />} />
        <Route path="/cancer-support/caregiver-communication" element={<ResourceLibrary />} />
        <Route path="/cancer-support/financial-navigation" element={<ResourceLibrary />} />
        <Route path="/cancer-support/caregiver-workshops" element={<Workshops />} />
        <Route path="/cancer-support/caregiver-stories" element={<ResourceLibrary />} />
        <Route path="/cancer-support/caregiver-forum" element={<CommunitySupport />} />
        <Route path="/cancer-support/caregiver-groups" element={<CommunitySupport />} />
        
        {/* Children & Parents Routes */}
        <Route path="/cancer-support/talking-to-children" element={<ResourceLibrary />} />
        <Route path="/cancer-support/children-emotions" element={<ResourceLibrary />} />
        <Route path="/cancer-support/parenting-through-treatment" element={<ResourceLibrary />} />
        <Route path="/cancer-support/family-activities" element={<ResourceLibrary />} />
        <Route path="/cancer-support/pediatric-cancer" element={<ResourceLibrary />} />
        <Route path="/cancer-support/family-support" element={<CommunitySupport />} />
        <Route path="/cancer-support/hospital-school" element={<ResourceLibrary />} />
        <Route path="/cancer-support/parent-connect" element={<CommunitySupport />} />
        <Route path="/cancer-support/kids-connect" element={<ResourceLibrary />} />
        <Route path="/cancer-support/teen-programs" element={<ResourceLibrary />} />
        
        {/* Resources Routes */}
        <Route path="/cancer-support/cancer-types" element={<ResourceLibrary />} />
        <Route path="/cancer-support/treatment-options" element={<ResourceLibrary />} />
        <Route path="/cancer-support/side-effects" element={<ResourceLibrary />} />
        <Route path="/cancer-support/nutrition" element={<ResourceLibrary />} />
        <Route path="/cancer-support/clinical-trials" element={<ResourceLibrary />} />
        <Route path="/cancer-support/research-updates" element={<ResourceLibrary />} />
        <Route path="/cancer-support/financial-resources" element={<ResourceLibrary />} />
        <Route path="/cancer-support/healthcare-navigation" element={<ResourceLibrary />} />
        <Route path="/cancer-support/legal-resources" element={<ResourceLibrary />} />
        <Route path="/cancer-support/survivor-stories" element={<ResourceLibrary />} />
        <Route path="/cancer-support/daily-inspiration" element={<ResourceLibrary />} />
        
        {/* Communities Routes */}
        <Route path="/cancer-support/general-community" element={<CommunitySupport />} />
        <Route path="/cancer-support/cancer-type-communities" element={<CommunitySupport />} />
        <Route path="/cancer-support/virtual-meetings" element={<VirtualMeetings />} />
        <Route path="/cancer-support/one-on-one" element={<CommunitySupport />} />
        <Route path="/cancer-support/young-adults" element={<CommunitySupport />} />
        <Route path="/cancer-support/metastatic" element={<CommunitySupport />} />
        <Route path="/cancer-support/caregivers-circle" element={<CommunitySupport />} />
        <Route path="/cancer-support/survivorship-community" element={<CommunitySupport />} />
        <Route path="/cancer-support/create-group" element={<CommunitySupport />} />
        
        {/* Remembrance Routes */}
        <Route path="/cancer-support/memorial-garden" element={<ResourceLibrary />} />
        <Route path="/cancer-support/grief-resources" element={<ResourceLibrary />} />
        <Route path="/cancer-support/legacy-projects" element={<ResourceLibrary />} />
        <Route path="/cancer-support/bereavement-community" element={<CommunitySupport />} />
        <Route path="/cancer-support/memorial-wall" element={<ResourceLibrary />} />
        <Route path="/cancer-support/grief-groups" element={<CommunitySupport />} />
        <Route path="/cancer-support/honoring-action" element={<ResourceLibrary />} />
        
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </>
  );
}

export default App;
