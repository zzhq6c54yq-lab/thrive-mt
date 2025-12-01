import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import RouteLoadingWrapper from "./components/RouteLoadingWrapper";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CancerSupportPortal from "./pages/CancerSupportPortal";
import CareerCoaching from "./pages/CareerCoaching";
import MeditationStudio from "./pages/MeditationStudio";
import AASponsor from "./pages/AASponsor";
import SubstanceAbuseSponsor from "./pages/SubstanceAbuseSponsor";
import Auth from "./pages/Auth";
import ConfirmEmail from "./pages/ConfirmEmail";
import ResendConfirmationPage from "./pages/ResendConfirmationPage";
import DearHenry from "./pages/DearHenry";
import DearHenryAdmin from "./pages/DearHenryAdmin";
import Dashboard from "./pages/Dashboard";
import OnboardingPage from "./pages/OnboardingPage";
import JournalPage from "./pages/JournalPage";
import CommunitySupport from "./pages/CommunitySupport";
import Debug from "./pages/Debug";
import PersonalizedContent from "./pages/PersonalizedContent";
import SleepTracker from "./pages/SleepTracker";
import MusicTherapy from "./pages/MusicTherapy";
import ArtTherapy from "./pages/ArtTherapy";
import Home from "./pages/Home";
import ProgressReports from "./pages/ProgressReports";
import ProgressAnalytics from "./pages/ProgressAnalytics";
import WeeklyGoals from "./pages/WeeklyGoals";
import MonthlyGoals from "./pages/MonthlyGoals";
import MentalWellnessTools from "./pages/MentalWellnessTools";
import MentalWellnessAssessments from "./pages/MentalWellnessAssessments";
import GamesAndQuizzes from "./pages/GamesAndQuizzes";
import GamePage from "./pages/GamePage";
import SmallBusinessExperience from "./pages/SmallBusinessExperience";
import EmployeeWelcome from "./pages/EmployeeWelcome";
import EmployeeReadiness from "./pages/EmployeeReadiness";
import FamilyResources from "./pages/FamilyResources";
import RealTimeTherapy from "./pages/RealTimeTherapy";
import TherapistAdmin from "./pages/TherapistAdmin";
import TherapistDashboard from "./pages/TherapistDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import TherapistVideoSession from "./pages/TherapistVideoSession";
import ClientVideoSession from "./components/client/ClientVideoSession";
import SignatureMoments from "./pages/SignatureMoments";
import TherapistProfile from "./pages/TherapistProfile";
import TherapistReset from "./pages/TherapistReset";
import CoachIntro from "./pages/CoachIntro";
import CoachQuestionnaire from "./pages/CoachQuestionnaire";
import CoachMatches from "./pages/CoachMatches";
import CoachProfile from "./pages/CoachProfile";
import AdminPortal from "./pages/AdminPortal";
import HolisticWellness from "./pages/HolisticWellness";
import AlternativeTherapies from "./pages/AlternativeTherapies";
import AlternativeTherapyDetail from "./pages/AlternativeTherapyDetail";
import BinauralBeats from "./pages/BinauralBeats";
import Journaling from "./pages/Journaling";
import MindfulnessSleep from "./pages/MindfulnessSleep";
import VideoDiary from "./pages/VideoDiary";
import ResourceLibrary from "./pages/ResourceLibrary";
import WellnessChallenges from "./pages/WellnessChallenges";
import MySponsor from "./pages/MySponsor";
import Workshops from "./pages/Workshops";
import WorkshopDetail from "./pages/WorkshopDetail";
import ProgressDashboardPage from "./pages/ProgressDashboard";
import EnhancedMirrorAIPage from "./pages/EnhancedMirrorAI";
import PersonalizedRecommendationsPage from "./pages/PersonalizedRecommendations";
import EnhancedAudioTherapyPage from "./pages/EnhancedAudioTherapy";
import ArtTherapyStudio from "./components/ArtTherapyStudio";
import CrisisSupport from "./pages/CrisisSupport";
import CrisisResources from "./pages/CrisisResources";
import Rewards from "./pages/Rewards";
import LearnMoreAboutThrive from "./pages/LearnMoreAboutThrive";
import CoPay from "./pages/CoPay";
import DoDPortal from "./pages/DoDPortal";
import CollegePortal from "./pages/CollegePortal";
import MentalHealthGames from "./pages/MentalHealthGames";
import CosmicGames from "./pages/CosmicGames";
import DoDWelcome from "./pages/DoDWelcome";
import CollegeWelcome from "./pages/CollegeWelcome";
import SmallBusinessWelcome from "./pages/SmallBusinessWelcome";
import SmallBusinessPortal from "./pages/SmallBusinessPortal";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import MilitarySupport from "./pages/MilitarySupport";
import MilitaryResources from "./pages/MilitaryResources";
import VirtualMeetings from "./pages/VirtualMeetings";
import CoPayCredits from "./pages/CoPayCredits";
import BarterSystem from "./pages/BarterSystem";
import SubscriptionPlansPage from "./pages/SubscriptionPlansPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import FinancialAssistance from "./pages/FinancialAssistance";
import ContactSupport from "./pages/ContactSupport";
import GuidedPractice from "./pages/GuidedPractice";
import VideoRecordPage from "./pages/VideoRecordPage";
import VideoLibraryPage from "./pages/VideoLibraryPage";
import SmallBusinessSelection from "./pages/SmallBusinessSelection";
import AdolescentWelcome from "./pages/AdolescentWelcome";
import AdolescentPortal from "./pages/AdolescentPortal";
import AdolescentSelection from "./pages/AdolescentSelection";
import GoldenYearsWelcome from "./pages/GoldenYearsWelcome";
import GoldenYearsPortal from "./pages/GoldenYearsPortal";
import GoldenYearsJournal from "./pages/GoldenYearsJournal";
import GoldenSpecializedFeature from "./pages/GoldenSpecializedFeature";
import GoldenEndOfLifePlanning from "./pages/GoldenEndOfLifePlanning";
import GoldenMemoryCognitive from "./pages/GoldenMemoryCognitive";
import WellnessResourcesModule from "./pages/golden-years-modules/WellnessResourcesModule";
import CommunityConnectionsModule from "./pages/golden-years-modules/CommunityConnectionsModule";
import MemoryCognitiveHealthModule from "./pages/golden-years-modules/MemoryCognitiveHealthModule";
import LifeTransitionsModule from "./pages/golden-years-modules/LifeTransitionsModule";
import FamilyConnectionToolsModule from "./pages/golden-years-modules/FamilyConnectionToolsModule";
import UserLead from "./pages/UserLead";
import FirstRespondersWelcome from "./pages/FirstRespondersWelcome";
import FirstRespondersPortal from "./pages/FirstRespondersPortal";
import FirstRespondersResources from "./pages/FirstRespondersResources";
import FirstRespondersPeerSupport from "./pages/FirstRespondersPeerSupport";
import FirstRespondersCriticalSupport from "./pages/FirstRespondersCriticalSupport";
import FirstRespondersStressManagement from "./pages/FirstRespondersStressManagement";
import LawEnforcementWelcome from "./pages/LawEnforcementWelcome";
import LawEnforcementPortal from "./pages/LawEnforcementPortal";
import EducatorsWelcome from "./pages/EducatorsWelcome";
import EducatorsPortal from "./pages/EducatorsPortal";
import EducatorsBurnoutAssessment from "./pages/EducatorsBurnoutAssessment";
import EducatorsClassroomStressAssessment from "./pages/EducatorsClassroomStressAssessment";
import EducatorsWorkLifeBalanceAssessment from "./pages/EducatorsWorkLifeBalanceAssessment";
import GenerativeVideo from "./pages/GenerativeVideo";
import AIWorkshopStudio from "./pages/AIWorkshopStudio";
import HospitalityWelcome from "./pages/HospitalityWelcome";
import HospitalityPortal from "./pages/HospitalityPortal";
import HospitalityStressAssessment from "./pages/HospitalityStressAssessment";
import HospitalityBurnoutAssessment from "./pages/HospitalityBurnoutAssessment";
import HospitalityWorkLifeBalanceAssessment from "./pages/HospitalityWorkLifeBalanceAssessment";
import TransportWelcome from "./pages/TransportWelcome";
import TransportPortal from "./pages/TransportPortal";
import TransportStressAssessment from "./pages/TransportStressAssessment";
import SingleParentsWelcome from "./pages/SingleParentsWelcome";
import SingleParentsPortal from "./pages/SingleParentsPortal";
import MiniSession from "./pages/MiniSession";
import MiniSessionHistory from "./pages/MiniSessionHistory";
import TransportBurnoutAssessment from "./pages/TransportBurnoutAssessment";
import TransportWorkLifeBalanceAssessment from "./pages/TransportWorkLifeBalanceAssessment";
import ChronicIllnessWelcome from "./pages/ChronicIllnessWelcome";
import ChronicIllnessPortal from "./pages/ChronicIllnessPortal";
import CancerSupportWelcome from "./pages/CancerSupportWelcome";
import AllWorkshopsPage from "./pages/AllWorkshops";
import JournalApp from "./pages/JournalApp";
import MemorialGarden from "./pages/MemorialGarden";
import GriefResources from "./pages/GriefResources";
import LegacyBuilder from "./pages/LegacyBuilder";
import MirrorAI from "./pages/MirrorAI";
import BreathingExercise from "./pages/BreathingExercise";
import ThoughtReframing from "./pages/ThoughtReframing";
import GuidedMeditationPage from "./pages/GuidedMeditationPage";
import MoodBoost from "./pages/MoodBoost";
import SleepImprovement from "./pages/SleepImprovement";
import GoalSetting from "./pages/GoalSetting";
import MentalWellnessExercise from "./pages/MentalWellnessExercise";
import TherapySupport from "./pages/TherapySupport";
import Unburdened from "./pages/Unburdened";
import AllFeatures from "./pages/AllFeatures";
import Messages from "./pages/Messages";
import Gratitude from "./pages/Gratitude";
import CareerDevelopmentModule from "./pages/career-modules/CareerDevelopmentModule";
import LeadershipSkillsModule from "./pages/career-modules/LeadershipSkillsModule";
import ResumeBuildingModule from "./pages/career-modules/ResumeBuildingModule";
import GoalSettingModule from "./pages/career-modules/GoalSettingModule";
import LeadershipFundamentals from "./pages/career-courses/LeadershipFundamentals";
import StrategicCommunication from "./pages/career-courses/StrategicCommunication";
import RemoteTeamManagement from "./pages/career-courses/RemoteTeamManagement";
import CareerAssessment from "./pages/career-resources/CareerAssessment";
import TemplateLibrary from "./pages/career-resources/TemplateLibrary";
import InterviewSimulator from "./pages/career-resources/InterviewSimulator";
import GoalPlanner from "./pages/career-resources/GoalPlanner";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/UserContext";
import FloatingHenryAssistant from "@/components/henry/FloatingHenryAssistant";
import SiteLayout from "@/components/site/SiteLayout";
import SiteEntry from "@/pages/site/SiteEntry";
import SiteLanding from "@/pages/site/SiteLanding";
import SiteTherapy from "@/pages/site/SiteTherapy";
import SiteCoaching from "@/pages/site/SiteCoaching";
import SiteMeetHenry from "@/pages/site/SiteMeetHenry";
import SitePricing from "@/pages/site/SitePricing";
import SiteDemo from "@/pages/site/SiteDemo";
import SiteCareers from "@/pages/site/SiteCareers";
import SiteInvestors from "@/pages/site/SiteInvestors";
import SiteAbout from "@/pages/site/SiteAbout";
import SiteContact from "@/pages/site/SiteContact";
import SiteApp from "@/pages/site/SiteApp";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <RouteLoadingWrapper>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            {/* Global Floating Henry Assistant */}
            <FloatingHenryAssistant />
            
            <Routes>
          {/* Marketing Website Routes - Root Level */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<SiteEntry />} />
            <Route path="/home" element={<SiteLanding />} />
            <Route path="/therapy" element={<SiteTherapy />} />
            <Route path="/coaching" element={<SiteCoaching />} />
            <Route path="/henry" element={<SiteMeetHenry />} />
            <Route path="/pricing" element={<SitePricing />} />
            <Route path="/demo" element={<SiteDemo />} />
            <Route path="/careers" element={<SiteCareers />} />
            <Route path="/investors" element={<SiteInvestors />} />
            <Route path="/about" element={<SiteAbout />} />
            <Route path="/contact" element={<SiteContact />} />
            <Route path="/the-app" element={<SiteApp />} />
          </Route>

          {/* App Routes - All Under /app Prefix */}
          <Route path="/app" element={<Index />} />
          <Route path="/app/auth" element={<Auth />} />
          <Route path="/app/auth/confirm" element={<ConfirmEmail />} />
          <Route path="/app/auth/resend" element={<ResendConfirmationPage />} />
          <Route path="/app/journal" element={<JournalApp />} />
          <Route path="/app/onboarding" element={<OnboardingPage />} />
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/messages" element={<Messages />} />
          <Route path="/app/support-wall" element={<CommunitySupport />} />
          <Route path="/app/gratitude" element={<Gratitude />} />
          <Route path="/app/community-support" element={<CommunitySupport />} />
          <Route path="/app/debug" element={<Debug />} />
          <Route path="/app/personalized-content" element={<PersonalizedContent />} />
          <Route path="/app/home" element={<Home />} />
          <Route path="/app/progress-reports" element={<ProgressReports />} />
          <Route path="/app/progress-analytics" element={<ProgressAnalytics />} />
          <Route path="/app/weekly-goals" element={<WeeklyGoals />} />
          <Route path="/app/monthly-goals" element={<MonthlyGoals />} />
          <Route path="/app/mental-wellness" element={<MentalWellnessTools />} />
          <Route path="/app/mental-wellness-tools" element={<MentalWellnessTools />} />
          <Route path="/app/mental-wellness-tools/breathing" element={<BreathingExercise />} />
          <Route path="/app/mental-wellness-tools/reframing" element={<ThoughtReframing />} />
          <Route path="/app/mental-wellness-tools/meditation" element={<GuidedMeditationPage />} />
          <Route path="/app/mental-wellness-tools/mood-boost" element={<MoodBoost />} />
          <Route path="/app/mental-wellness-tools/sleep" element={<SleepImprovement />} />
          <Route path="/app/mental-wellness-tools/goals" element={<GoalSetting />} />
          <Route path="/app/mental-wellness-tools/exercise" element={<MentalWellnessExercise />} />
          <Route path="/app/mental-wellness-tools/therapy-support" element={<TherapySupport />} />
          <Route path="/app/mental-wellness-assessments" element={<MentalWellnessAssessments />} />
          <Route path="/app/mental-wellness/assessments" element={<MentalWellnessTools />} />
          <Route path="/app/mental-wellness/assessments/:quizId" element={<MentalWellnessTools />} />
          <Route path="/app/mental-wellness/assessment/:assessmentId" element={<MentalWellnessTools />} />
          <Route path="/app/family-resources" element={<FamilyResources />} />
          <Route path="/app/games-and-quizzes" element={<GamesAndQuizzes />} />
          <Route path="/app/mental-health-games" element={<MentalHealthGames />} />
          <Route path="/app/cosmic-games" element={<CosmicGames />} />
          <Route path="/app/game-play/:gameId" element={<GamePage />} />
          <Route path="/app/games/:gameId" element={<GamePage />} />
          
          <Route path="/app/small-business-portal" element={<SmallBusinessPortal />} />
          <Route path="/app/small-business-welcome" element={<SmallBusinessWelcome />} />
          <Route path="/app/small-business-selection" element={<SmallBusinessSelection />} />
          <Route path="/app/employee-welcome" element={<EmployeeWelcome />} />
          <Route path="/app/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/app/employee-readiness" element={<EmployeeReadiness />} />
          <Route path="/app/unburdened" element={<Unburdened />} />
          <Route path="/app/all-features" element={<AllFeatures />} />
          <Route path="/app/crisis-support" element={<CrisisSupport />} />
          <Route path="/app/crisis-resources" element={<CrisisResources />} />
          <Route path="/app/rewards" element={<Rewards />} />
          <Route path="/app/learn-more" element={<LearnMoreAboutThrive />} />
          <Route path="/app/co-pay" element={<CoPay />} />
          <Route path="/app/virtual-meetings" element={<VirtualMeetings />} />
          
          <Route path="/app/copay-credits" element={<CoPayCredits />} />
          <Route path="/app/barter-system" element={<BarterSystem />} />
          <Route path="/app/subscription-plans" element={<SubscriptionPlansPage />} />
          <Route path="/app/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/app/financial-assistance" element={<FinancialAssistance />} />
          <Route path="/app/contact" element={<ContactSupport />} />
          
          <Route path="/app/alternative-therapies" element={<AlternativeTherapies />} />
          <Route path="/app/alternative-therapies/detail/:therapyId" element={<AlternativeTherapyDetail />} />
          <Route path="/app/guided-practice/:therapyId" element={<GuidedPractice />} />
          
          <Route path="/app/department-of-defense" element={<DoDWelcome />} />
          <Route path="/app/dod-welcome" element={<DoDWelcome />} />
          <Route path="/app/dod-portal" element={<DoDPortal />} />
          <Route path="/app/college-welcome" element={<CollegeWelcome />} />
          <Route path="/app/college-portal" element={<CollegePortal />} />
          
          <Route path="/app/adolescent-welcome" element={<AdolescentWelcome />} />
          <Route path="/app/adolescent-portal" element={<AdolescentPortal />} />
          <Route path="/app/adolescent-selection" element={<AdolescentSelection />} />
          
          <Route path="/app/golden-years-welcome" element={<GoldenYearsWelcome />} />
          <Route path="/app/golden-years-portal" element={<GoldenYearsPortal />} />
          <Route path="/app/golden-years-journal" element={<GoldenYearsJournal />} />
          <Route path="/app/golden-years-planning" element={<GoldenEndOfLifePlanning />} />
          <Route path="/app/golden-years-memory" element={<GoldenMemoryCognitive />} />
          <Route path="/app/golden-years-guide" element={<GoldenSpecializedFeature />} />
          <Route path="/app/golden-years-transitions" element={<LifeTransitionsModule />} />
          <Route path="/app/golden-years-community" element={<CommunityConnectionsModule />} />
          <Route path="/app/golden-years-family" element={<FamilyConnectionToolsModule />} />
          <Route path="/app/golden-years-wellness" element={<WellnessResourcesModule />} />
          <Route path="/app/golden-years-calendar" element={<GoldenSpecializedFeature />} />
          
          <Route path="/app/military-support" element={<MilitarySupport />} />
          <Route path="/app/military-resources" element={<MilitaryResources />} />
          <Route path="/app/military-resources/combat-stress" element={<MilitaryResources />} />
          <Route path="/app/military-resources/transition" element={<MilitaryResources />} />
          <Route path="/app/military-resources/family" element={<MilitaryResources />} />
          
          <Route path="/app/first-responders-welcome" element={<FirstRespondersWelcome />} />
          <Route path="/app/first-responders-portal" element={<FirstRespondersPortal />} />
          <Route path="/app/first-responders-resources" element={<FirstRespondersResources />} />
          <Route path="/app/first-responders/peer-support" element={<FirstRespondersPeerSupport />} />
          <Route path="/app/first-responders/critical-support" element={<FirstRespondersCriticalSupport />} />
          <Route path="/app/first-responders/stress-management" element={<FirstRespondersStressManagement />} />
          <Route path="/app/first-responders-practice/:practiceId" element={<GuidedPractice />} />
          <Route path="/app/first-responders-workshops/:workshopId" element={<WorkshopDetail />} />
          <Route path="/app/first-responders-assessments/:assessmentId" element={<MentalWellnessTools />} />
          
          <Route path="/app/stress-management" element={<FirstRespondersStressManagement />} />
          
          <Route path="/app/law-enforcement-welcome" element={<LawEnforcementWelcome />} />
          <Route path="/app/law-enforcement-portal" element={<LawEnforcementPortal />} />
          <Route path="/app/law-enforcement/stress-management" element={<FirstRespondersStressManagement />} />
          <Route path="/app/law-enforcement/critical-incident" element={<FirstRespondersCriticalSupport />} />
          <Route path="/app/law-enforcement/peer-support" element={<FirstRespondersPeerSupport />} />
          <Route path="/app/law-enforcement-practice/:practiceId" element={<GuidedPractice />} />
          <Route path="/app/law-enforcement-workshops/:workshopId" element={<WorkshopDetail />} />
          <Route path="/app/law-enforcement-assessments/:assessmentId" element={<MentalWellnessTools />} />
          
          <Route path="/app/educators-welcome" element={<EducatorsWelcome />} />
          <Route path="/app/educators-portal" element={<EducatorsPortal />} />
          <Route path="/app/educators-workshops/:workshopId" element={<WorkshopDetail />} />
          <Route path="/app/educators-assessments/educator-burnout" element={<EducatorsBurnoutAssessment />} />
          <Route path="/app/educators-assessments/classroom-stress" element={<EducatorsClassroomStressAssessment />} />
          <Route path="/app/educators-assessments/work-life-balance" element={<EducatorsWorkLifeBalanceAssessment />} />
          <Route path="/app/educators-assessments/:assessmentId" element={<MentalWellnessTools />} />
          <Route path="/app/educators-practice/:practiceId" element={<GuidedPractice />} />
          <Route path="/app/educators-events" element={<VirtualMeetings />} />
          <Route path="/app/educators-community" element={<CommunitySupport />} />
          
          <Route path="/app/hospitality-welcome" element={<HospitalityWelcome />} />
          <Route path="/app/hospitality-portal" element={<HospitalityPortal />} />
          <Route path="/app/hospitality-assessments/stress" element={<HospitalityStressAssessment />} />
          <Route path="/app/hospitality-assessments/burnout" element={<HospitalityBurnoutAssessment />} />
          <Route path="/app/hospitality-assessments/work-life-balance" element={<HospitalityWorkLifeBalanceAssessment />} />
          <Route path="/app/hospitality-workshops/:workshopId" element={<WorkshopDetail />} />
          <Route path="/app/hospitality-practice/:practiceId" element={<GuidedPractice />} />
          <Route path="/app/hospitality-community" element={<CommunitySupport />} />
          
          <Route path="/app/transport-welcome" element={<TransportWelcome />} />
          <Route path="/app/transport-portal" element={<TransportPortal />} />
          <Route path="/app/transport-assessments/stress" element={<TransportStressAssessment />} />
          <Route path="/app/transport-assessments/burnout" element={<TransportBurnoutAssessment />} />
          <Route path="/app/transport-assessments/work-life-balance" element={<TransportWorkLifeBalanceAssessment />} />
          <Route path="/app/transport-workshops/:workshopId" element={<WorkshopDetail />} />
          <Route path="/app/transport-practice/:practiceId" element={<GuidedPractice />} />
          <Route path="/app/transport-community/:communityId" element={<CommunitySupport />} />
          <Route path="/app/transport-resources/:resourceId" element={<ResourceLibrary />} />
          
          <Route path="/app/single-parents-welcome" element={<SingleParentsWelcome />} />
          <Route path="/app/single-parents-portal" element={<SingleParentsPortal />} />
          <Route path="/app/mini-session" element={<MiniSession />} />
          <Route path="/app/mini-session/history" element={<MiniSessionHistory />} />
          
          <Route path="/app/workshops" element={<Workshops />} />
          <Route path="/app/workshop/:workshopId" element={<WorkshopDetail />} />
          
          <Route path="/app/real-time-therapy" element={<RealTimeTherapy />} />
          <Route path="/app/therapist/:id" element={<TherapistProfile />} />
          <Route path="/app/therapist-admin" element={<TherapistAdmin />} />
          <Route path="/app/therapist-dashboard" element={<TherapistDashboard />} />
          <Route path="/app/therapist-video-session/:sessionId?" element={<TherapistVideoSession />} />
          <Route path="/app/client-video-session/:sessionId" element={<ClientVideoSession />} />
          <Route path="/app/signature-moments" element={<SignatureMoments />} />
          <Route path="/app/therapist-reset" element={<TherapistReset />} />
          
          {/* Coach Routes */}
          <Route path="/app/coach-intro" element={<CoachIntro />} />
          <Route path="/app/coach-questionnaire" element={<CoachQuestionnaire />} />
          <Route path="/app/coach-matches" element={<CoachMatches />} />
          <Route path="/app/coach/:id" element={<CoachProfile />} />
          <Route path="/app/coach-dashboard" element={<CoachDashboard />} />
          
          <Route path="/app/admin-portal" element={<AdminPortal />} />
          <Route path="/app/holistic-wellness" element={<HolisticWellness />} />
          <Route path="/app/binaural-beats" element={<BinauralBeats />} />
          <Route path="/app/journaling" element={<Journaling />} />
          <Route path="/app/mindfulness-sleep" element={<MindfulnessSleep />} />
          <Route path="/app/video-diary" element={<VideoDiary />} />
          <Route path="/app/video-diary/record" element={<VideoRecordPage />} />
          <Route path="/app/video-diary/library" element={<VideoLibraryPage />} />
          <Route path="/app/video-diary/view/:videoId" element={<VideoLibraryPage />} />
          <Route path="/app/resource-library" element={<ResourceLibrary />} />
          <Route path="/app/wellness-challenges" element={<WellnessChallenges />} />
          <Route path="/app/wellness-challenges/:id" element={<WellnessChallenges />} />
          <Route path="/app/my-sponsor" element={<MySponsor />} />
          <Route path="/app/aa-sponsor" element={<AASponsor />} />
          <Route path="/app/substance-abuse-sponsor" element={<SubstanceAbuseSponsor />} />
          <Route path="/app/mirror-ai" element={<MirrorAI />} />
          
          <Route path="/app/user-lead" element={<UserLead />} />
          
          <Route path="/app/generative-video" element={<GenerativeVideo />} />
          
          <Route path="/app/chronic-illness-welcome" element={<ChronicIllnessWelcome />} />
          <Route path="/app/chronic-illness-portal" element={<ChronicIllnessPortal />} />
          <Route path="/app/chronic-illness/education" element={<WorkshopDetail />} />
          <Route path="/app/chronic-illness/stories" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/mood" element={<MentalWellnessTools />} />
          <Route path="/app/chronic-illness/coping" element={<GuidedPractice />} />
          <Route path="/app/chronic-illness/symptoms" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/medications" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/community" element={<CommunitySupport />} />
          <Route path="/app/chronic-illness/groups" element={<VirtualMeetings />} />
          <Route path="/app/chronic-illness/teletherapy" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/resources" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/meditations" element={<GuidedPractice />} />
          <Route path="/app/chronic-illness/movement" element={<GuidedPractice />} />
          <Route path="/app/chronic-illness/goals" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/progress" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/caregivers" element={<WorkshopDetail />} />
          <Route path="/app/chronic-illness/communication" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/connect" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/health-data" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/feedback" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/assess-needs" element={<MentalWellnessTools />} />
          <Route path="/app/chronic-illness/pain-management" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/specialists" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/nutrition" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/respite" element={<ResourceLibrary />} />
          <Route path="/app/chronic-illness/live-workshops" element={<VirtualMeetings />} />
          <Route path="/app/chronic-illness/assess-a1" element={<MentalWellnessTools />} />
          <Route path="/app/chronic-illness/assess-a2" element={<MentalWellnessTools />} />
          <Route path="/app/chronic-illness/assess-a3" element={<MentalWellnessTools />} />
          
          <Route path="/app/cancer-support" element={<CancerSupportWelcome />} />
          <Route path="/app/cancer-support-welcome" element={<CancerSupportWelcome />} />
          <Route path="/app/cancer-support-portal" element={<CancerSupportPortal />} />
          
          <Route path="/app/memorial-garden" element={<MemorialGarden />} />
          <Route path="/app/grief-counseling" element={<GriefResources />} />
          <Route path="/app/grief-resources" element={<GriefResources />} />
          <Route path="/app/legacy-builder" element={<LegacyBuilder />} />
          <Route path="/app/bereavement-support-groups" element={<CommunitySupport />} />
          <Route path="/app/memorial-tribute-wall" element={<PersonalizedContent />} />
          <Route path="/app/professional-grief-support" element={<CommunitySupport />} />
          <Route path="/app/memorial-fundraising" element={<PersonalizedContent />} />
          
          <Route path="/app/cancer-support/newly-diagnosed" element={<Workshops />} />
          <Route path="/app/cancer-support/treatment" element={<Workshops />} />
          <Route path="/app/cancer-support/stages" element={<Workshops />} />
          <Route path="/app/cancer-support/survivorship" element={<Workshops />} />
          <Route path="/app/cancer-support/peer-connect" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/events" element={<VirtualMeetings />} />
          <Route path="/app/cancer-support/types/:cancerType" element={<Workshops />} />
          <Route path="/app/cancer-support/immediate-support" element={<RealTimeTherapy />} />
          
          <Route path="/app/cancer-support/caregiver-basics" element={<Workshops />} />
          <Route path="/app/cancer-support/caregiver-selfcare" element={<GuidedPractice />} />
          <Route path="/app/cancer-support/caregiver-communication" element={<Workshops />} />
          <Route path="/app/cancer-support/financial-navigation" element={<FinancialAssistance />} />
          <Route path="/app/cancer-support/caregiver-workshops" element={<Workshops />} />
          <Route path="/app/cancer-support/caregiver-stories" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/caregiver-forum" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/caregiver-groups" element={<VirtualMeetings />} />
          
          <Route path="/app/cancer-support/talking-to-children" element={<Workshops />} />
          <Route path="/app/cancer-support/children-emotions" element={<Workshops />} />
          <Route path="/app/cancer-support/parenting-through-treatment" element={<Workshops />} />
          <Route path="/app/cancer-support/family-activities" element={<GamesAndQuizzes />} />
          <Route path="/app/cancer-support/pediatric-cancer" element={<Workshops />} />
          <Route path="/app/cancer-support/family-support" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/hospital-school" element={<Workshops />} />
          <Route path="/app/cancer-support/parent-connect" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/kids-connect" element={<GamesAndQuizzes />} />
          <Route path="/app/cancer-support/teen-programs" element={<GamesAndQuizzes />} />
          
          <Route path="/app/cancer-support/cancer-types" element={<Workshops />} />
          <Route path="/app/cancer-support/treatment-options" element={<Workshops />} />
          <Route path="/app/cancer-support/side-effects" element={<Workshops />} />
          <Route path="/app/cancer-support/nutrition" element={<Workshops />} />
          <Route path="/app/cancer-support/clinical-trials" element={<Workshops />} />
          <Route path="/app/cancer-support/research-updates" element={<Workshops />} />
          <Route path="/app/cancer-support/financial-resources" element={<FinancialAssistance />} />
          <Route path="/app/cancer-support/healthcare-navigation" element={<Workshops />} />
          <Route path="/app/cancer-support/legal-resources" element={<Workshops />} />
          <Route path="/app/cancer-support/survivor-stories" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/daily-inspiration" element={<PersonalizedContent />} />
          
          <Route path="/app/cancer-support/general-community" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/cancer-type-communities" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/virtual-meetings" element={<VirtualMeetings />} />
          <Route path="/app/cancer-support/one-on-one" element={<RealTimeTherapy />} />
          <Route path="/app/cancer-support/young-adults" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/metastatic" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/caregivers-circle" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/survivorship-community" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/create-group" element={<CommunitySupport />} />
          
          <Route path="/app/cancer-support/memorial-garden" element={<PersonalizedContent />} />
          <Route path="/app/cancer-support/grief-resources" element={<Workshops />} />
          <Route path="/app/cancer-support/legacy-projects" element={<PersonalizedContent />} />
          <Route path="/app/cancer-support/bereavement-community" element={<CommunitySupport />} />
          <Route path="/app/cancer-support/memorial-wall" element={<PersonalizedContent />} />
          <Route path="/app/cancer-support/grief-groups" element={<VirtualMeetings />} />
          <Route path="/app/cancer-support/honoring-action" element={<PersonalizedContent />} />
          
          <Route path="/app/career-coaching" element={<CareerCoaching />} />
          <Route path="/app/career-coaching/module/career-development" element={<CareerDevelopmentModule />} />
          <Route path="/app/career-coaching/module/leadership-skills" element={<LeadershipSkillsModule />} />
          <Route path="/app/career-coaching/module/resume-building" element={<ResumeBuildingModule />} />
          <Route path="/app/career-coaching/module/goal-setting" element={<GoalSettingModule />} />
          <Route path="/app/career-coaching/course/leadership-fundamentals" element={<LeadershipFundamentals />} />
          <Route path="/app/career-coaching/course/strategic-communication" element={<StrategicCommunication />} />
          <Route path="/app/career-coaching/course/remote-team-management" element={<RemoteTeamManagement />} />
          <Route path="/app/career-coaching/resource/career-assessment" element={<CareerAssessment />} />
          <Route path="/app/career-coaching/resource/template-library" element={<TemplateLibrary />} />
          <Route path="/app/career-coaching/resource/interview-simulator" element={<InterviewSimulator />} />
          <Route path="/app/career-coaching/resource/goal-planner" element={<GoalPlanner />} />
          <Route path="/app/meditation-studio" element={<MeditationStudio />} />
          <Route path="/app/sleep-tracker" element={<SleepTracker />} />
        <Route path="/app/sleep-analysis" element={<SleepTracker />} />
        <Route path="/app/music-therapy" element={<MusicTherapy />} />
          <Route path="/app/progress" element={<ProgressDashboardPage />} />
          <Route path="/app/enhanced-mirror-ai" element={<EnhancedMirrorAIPage />} />
          <Route path="/app/recommendations" element={<PersonalizedRecommendationsPage />} />
          <Route path="/app/enhanced-audio-therapy" element={<EnhancedAudioTherapyPage />} />
          <Route path="/app/art-therapy" element={<ArtTherapyStudio />} />
          <Route path="/app/dear-henry" element={<DearHenry />} />
          <Route path="/app/dear-henry-admin" element={<DearHenryAdmin />} />
          <Route path="/app/unburdened" element={<Unburdened />} />
          
          <Route path="/app/all-workshops" element={<AllWorkshopsPage />} />
          <Route path="/app/ai-workshop-studio" element={<AIWorkshopStudio />} />
          <Route path="/app/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </RouteLoadingWrapper>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
