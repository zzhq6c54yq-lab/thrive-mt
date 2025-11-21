import { Routes, Route } from "react-router-dom";
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
import TherapistProfile from "./pages/TherapistProfile";
import TherapistReset from "./pages/TherapistReset";
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
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <RouteLoadingWrapper>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
            <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/confirm" element={<ConfirmEmail />} />
          <Route path="/auth/resend" element={<ResendConfirmationPage />} />
          <Route path="/journal" element={<JournalApp />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/community-support" element={<CommunitySupport />} />
          <Route path="/debug" element={<Debug />} />
          <Route path="/personalized-content" element={<PersonalizedContent />} />
          <Route path="/home" element={<Home />} />
          <Route path="/progress-reports" element={<ProgressReports />} />
          <Route path="/progress-analytics" element={<ProgressAnalytics />} />
          <Route path="/mental-wellness" element={<MentalWellnessTools />} />
          <Route path="/mental-wellness-tools" element={<MentalWellnessTools />} />
          <Route path="/mental-wellness-tools/breathing" element={<BreathingExercise />} />
          <Route path="/mental-wellness-tools/reframing" element={<ThoughtReframing />} />
          <Route path="/mental-wellness-tools/meditation" element={<GuidedMeditationPage />} />
          <Route path="/mental-wellness-tools/mood-boost" element={<MoodBoost />} />
          <Route path="/mental-wellness-tools/sleep" element={<SleepImprovement />} />
          <Route path="/mental-wellness-tools/goals" element={<GoalSetting />} />
          <Route path="/mental-wellness-tools/exercise" element={<MentalWellnessExercise />} />
          <Route path="/mental-wellness-tools/therapy-support" element={<TherapySupport />} />
          <Route path="/mental-wellness-assessments" element={<MentalWellnessAssessments />} />
          <Route path="/mental-wellness/assessments" element={<MentalWellnessTools />} />
          <Route path="/mental-wellness/assessments/:quizId" element={<MentalWellnessTools />} />
          <Route path="/mental-wellness/assessment/:assessmentId" element={<MentalWellnessTools />} />
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
          <Route path="/unburdened" element={<Unburdened />} />
          <Route path="/all-features" element={<AllFeatures />} />
          <Route path="/crisis-support" element={<CrisisSupport />} />
          <Route path="/learn-more" element={<LearnMoreAboutThrive />} />
          <Route path="/co-pay" element={<CoPay />} />
          <Route path="/virtual-meetings" element={<VirtualMeetings />} />
          
          <Route path="/copay-credits" element={<CoPayCredits />} />
          <Route path="/barter-system" element={<BarterSystem />} />
          <Route path="/subscription-plans" element={<SubscriptionPlansPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
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
          
          <Route path="/golden-years-welcome" element={<GoldenYearsWelcome />} />
          <Route path="/golden-years-portal" element={<GoldenYearsPortal />} />
          <Route path="/golden-years-journal" element={<GoldenYearsJournal />} />
          <Route path="/golden-years-planning" element={<GoldenEndOfLifePlanning />} />
          <Route path="/golden-years-memory" element={<GoldenMemoryCognitive />} />
          <Route path="/golden-years-guide" element={<GoldenSpecializedFeature />} />
          <Route path="/golden-years-transitions" element={<LifeTransitionsModule />} />
          <Route path="/golden-years-community" element={<CommunityConnectionsModule />} />
          <Route path="/golden-years-family" element={<FamilyConnectionToolsModule />} />
          <Route path="/golden-years-wellness" element={<WellnessResourcesModule />} />
          <Route path="/golden-years-memory" element={<MemoryCognitiveHealthModule />} />
          <Route path="/golden-years-calendar" element={<GoldenSpecializedFeature />} />
          
          <Route path="/military-support" element={<MilitarySupport />} />
          <Route path="/military-resources" element={<MilitaryResources />} />
          <Route path="/military-resources/combat-stress" element={<MilitaryResources />} />
          <Route path="/military-resources/transition" element={<MilitaryResources />} />
          <Route path="/military-resources/family" element={<MilitaryResources />} />
          
          <Route path="/first-responders-welcome" element={<FirstRespondersWelcome />} />
          <Route path="/first-responders-portal" element={<FirstRespondersPortal />} />
          <Route path="/first-responders-resources" element={<FirstRespondersResources />} />
          <Route path="/first-responders/peer-support" element={<FirstRespondersPeerSupport />} />
          <Route path="/first-responders/critical-support" element={<FirstRespondersCriticalSupport />} />
          <Route path="/first-responders/stress-management" element={<FirstRespondersStressManagement />} />
          <Route path="/first-responders-practice/:practiceId" element={<GuidedPractice />} />
          <Route path="/first-responders-workshops/:workshopId" element={<WorkshopDetail />} />
          <Route path="/first-responders-assessments/:assessmentId" element={<MentalWellnessTools />} />
          
          <Route path="/stress-management" element={<FirstRespondersStressManagement />} />
          
          <Route path="/law-enforcement-welcome" element={<LawEnforcementWelcome />} />
          <Route path="/law-enforcement-portal" element={<LawEnforcementPortal />} />
          <Route path="/law-enforcement/stress-management" element={<FirstRespondersStressManagement />} />
          <Route path="/law-enforcement/critical-incident" element={<FirstRespondersCriticalSupport />} />
          <Route path="/law-enforcement/peer-support" element={<FirstRespondersPeerSupport />} />
          <Route path="/law-enforcement-practice/:practiceId" element={<GuidedPractice />} />
          <Route path="/law-enforcement-workshops/:workshopId" element={<WorkshopDetail />} />
          <Route path="/law-enforcement-assessments/:assessmentId" element={<MentalWellnessTools />} />
          
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
          
          <Route path="/hospitality-welcome" element={<HospitalityWelcome />} />
          <Route path="/hospitality-portal" element={<HospitalityPortal />} />
          <Route path="/hospitality-assessments/stress" element={<HospitalityStressAssessment />} />
          <Route path="/hospitality-assessments/burnout" element={<HospitalityBurnoutAssessment />} />
          <Route path="/hospitality-assessments/work-life-balance" element={<HospitalityWorkLifeBalanceAssessment />} />
          <Route path="/hospitality-workshops/:workshopId" element={<WorkshopDetail />} />
          <Route path="/hospitality-practice/:practiceId" element={<GuidedPractice />} />
          <Route path="/hospitality-community" element={<CommunitySupport />} />
          
          <Route path="/transport-welcome" element={<TransportWelcome />} />
          <Route path="/transport-portal" element={<TransportPortal />} />
          <Route path="/transport-assessments/stress" element={<TransportStressAssessment />} />
          <Route path="/transport-assessments/burnout" element={<TransportBurnoutAssessment />} />
          <Route path="/transport-assessments/work-life-balance" element={<TransportWorkLifeBalanceAssessment />} />
          <Route path="/transport-workshops/:workshopId" element={<WorkshopDetail />} />
          <Route path="/transport-practice/:practiceId" element={<GuidedPractice />} />
          <Route path="/transport-community/:communityId" element={<CommunitySupport />} />
          <Route path="/transport-resources/:resourceId" element={<ResourceLibrary />} />
          
          <Route path="/single-parents-welcome" element={<SingleParentsWelcome />} />
          <Route path="/single-parents-portal" element={<SingleParentsPortal />} />
          <Route path="/mini-session" element={<MiniSession />} />
          <Route path="/mini-session/history" element={<MiniSessionHistory />} />
          
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshop/:workshopId" element={<WorkshopDetail />} />
          
          <Route path="/real-time-therapy" element={<RealTimeTherapy />} />
          <Route path="/therapist/:id" element={<TherapistProfile />} />
          <Route path="/therapist-admin" element={<TherapistAdmin />} />
          <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
          <Route path="/therapist-reset" element={<TherapistReset />} />
          <Route path="/admin-portal" element={<AdminPortal />} />
          <Route path="/holistic-wellness" element={<HolisticWellness />} />
          <Route path="/binaural-beats" element={<BinauralBeats />} />
          <Route path="/journaling" element={<Journaling />} />
          <Route path="/mindfulness-sleep" element={<MindfulnessSleep />} />
          <Route path="/video-diary" element={<VideoDiary />} />
          <Route path="/video-diary/record" element={<VideoRecordPage />} />
          <Route path="/video-diary/library" element={<VideoLibraryPage />} />
          <Route path="/video-diary/view/:videoId" element={<VideoLibraryPage />} />
          <Route path="/resource-library" element={<ResourceLibrary />} />
          <Route path="/wellness-challenges" element={<WellnessChallenges />} />
          <Route path="/wellness-challenges/:id" element={<WellnessChallenges />} />
          <Route path="/my-sponsor" element={<MySponsor />} />
          <Route path="/aa-sponsor" element={<AASponsor />} />
          <Route path="/substance-abuse-sponsor" element={<SubstanceAbuseSponsor />} />
          <Route path="/mirror-ai" element={<MirrorAI />} />
          
          <Route path="/user-lead" element={<UserLead />} />
          
          <Route path="/generative-video" element={<GenerativeVideo />} />
          
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
          
          <Route path="/cancer-support" element={<CancerSupportWelcome />} />
          <Route path="/cancer-support-welcome" element={<CancerSupportWelcome />} />
          <Route path="/cancer-support-portal" element={<CancerSupportPortal />} />
          
          <Route path="/memorial-garden" element={<MemorialGarden />} />
          <Route path="/grief-counseling" element={<GriefResources />} />
          <Route path="/grief-resources" element={<GriefResources />} />
          <Route path="/legacy-builder" element={<LegacyBuilder />} />
          <Route path="/bereavement-support-groups" element={<CommunitySupport />} />
          <Route path="/memorial-tribute-wall" element={<PersonalizedContent />} />
          <Route path="/professional-grief-support" element={<CommunitySupport />} />
          <Route path="/memorial-fundraising" element={<PersonalizedContent />} />
          
          <Route path="/cancer-support/newly-diagnosed" element={<Workshops />} />
          <Route path="/cancer-support/treatment" element={<Workshops />} />
          <Route path="/cancer-support/stages" element={<Workshops />} />
          <Route path="/cancer-support/survivorship" element={<Workshops />} />
          <Route path="/cancer-support/peer-connect" element={<CommunitySupport />} />
          <Route path="/cancer-support/events" element={<VirtualMeetings />} />
          <Route path="/cancer-support/types/:cancerType" element={<Workshops />} />
          <Route path="/cancer-support/immediate-support" element={<RealTimeTherapy />} />
          
          <Route path="/cancer-support/caregiver-basics" element={<Workshops />} />
          <Route path="/cancer-support/caregiver-selfcare" element={<GuidedPractice />} />
          <Route path="/cancer-support/caregiver-communication" element={<Workshops />} />
          <Route path="/cancer-support/financial-navigation" element={<FinancialAssistance />} />
          <Route path="/cancer-support/caregiver-workshops" element={<Workshops />} />
          <Route path="/cancer-support/caregiver-stories" element={<CommunitySupport />} />
          <Route path="/cancer-support/caregiver-forum" element={<CommunitySupport />} />
          <Route path="/cancer-support/caregiver-groups" element={<VirtualMeetings />} />
          
          <Route path="/cancer-support/talking-to-children" element={<Workshops />} />
          <Route path="/cancer-support/children-emotions" element={<Workshops />} />
          <Route path="/cancer-support/parenting-through-treatment" element={<Workshops />} />
          <Route path="/cancer-support/family-activities" element={<GamesAndQuizzes />} />
          <Route path="/cancer-support/pediatric-cancer" element={<Workshops />} />
          <Route path="/cancer-support/family-support" element={<CommunitySupport />} />
          <Route path="/cancer-support/hospital-school" element={<Workshops />} />
          <Route path="/cancer-support/parent-connect" element={<CommunitySupport />} />
          <Route path="/cancer-support/kids-connect" element={<GamesAndQuizzes />} />
          <Route path="/cancer-support/teen-programs" element={<GamesAndQuizzes />} />
          
          <Route path="/cancer-support/cancer-types" element={<Workshops />} />
          <Route path="/cancer-support/treatment-options" element={<Workshops />} />
          <Route path="/cancer-support/side-effects" element={<Workshops />} />
          <Route path="/cancer-support/nutrition" element={<Workshops />} />
          <Route path="/cancer-support/clinical-trials" element={<Workshops />} />
          <Route path="/cancer-support/research-updates" element={<Workshops />} />
          <Route path="/cancer-support/financial-resources" element={<FinancialAssistance />} />
          <Route path="/cancer-support/healthcare-navigation" element={<Workshops />} />
          <Route path="/cancer-support/legal-resources" element={<Workshops />} />
          <Route path="/cancer-support/survivor-stories" element={<CommunitySupport />} />
          <Route path="/cancer-support/daily-inspiration" element={<PersonalizedContent />} />
          
          <Route path="/cancer-support/general-community" element={<CommunitySupport />} />
          <Route path="/cancer-support/cancer-type-communities" element={<CommunitySupport />} />
          <Route path="/cancer-support/virtual-meetings" element={<VirtualMeetings />} />
          <Route path="/cancer-support/one-on-one" element={<RealTimeTherapy />} />
          <Route path="/cancer-support/young-adults" element={<CommunitySupport />} />
          <Route path="/cancer-support/metastatic" element={<CommunitySupport />} />
          <Route path="/cancer-support/caregivers-circle" element={<CommunitySupport />} />
          <Route path="/cancer-support/survivorship-community" element={<CommunitySupport />} />
          <Route path="/cancer-support/create-group" element={<CommunitySupport />} />
          
          <Route path="/cancer-support/memorial-garden" element={<PersonalizedContent />} />
          <Route path="/cancer-support/grief-resources" element={<Workshops />} />
          <Route path="/cancer-support/legacy-projects" element={<PersonalizedContent />} />
          <Route path="/cancer-support/bereavement-community" element={<CommunitySupport />} />
          <Route path="/cancer-support/memorial-wall" element={<PersonalizedContent />} />
          <Route path="/cancer-support/grief-groups" element={<VirtualMeetings />} />
          <Route path="/cancer-support/honoring-action" element={<PersonalizedContent />} />
          
          <Route path="/career-coaching" element={<CareerCoaching />} />
          <Route path="/career-coaching/module/career-development" element={<CareerDevelopmentModule />} />
          <Route path="/career-coaching/module/leadership-skills" element={<LeadershipSkillsModule />} />
          <Route path="/career-coaching/module/resume-building" element={<ResumeBuildingModule />} />
          <Route path="/career-coaching/module/goal-setting" element={<GoalSettingModule />} />
          <Route path="/career-coaching/course/leadership-fundamentals" element={<LeadershipFundamentals />} />
          <Route path="/career-coaching/course/strategic-communication" element={<StrategicCommunication />} />
          <Route path="/career-coaching/course/remote-team-management" element={<RemoteTeamManagement />} />
          <Route path="/career-coaching/resource/career-assessment" element={<CareerAssessment />} />
          <Route path="/career-coaching/resource/template-library" element={<TemplateLibrary />} />
          <Route path="/career-coaching/resource/interview-simulator" element={<InterviewSimulator />} />
          <Route path="/career-coaching/resource/goal-planner" element={<GoalPlanner />} />
          <Route path="/meditation-studio" element={<MeditationStudio />} />
          <Route path="/sleep-tracker" element={<SleepTracker />} />
        <Route path="/sleep-analysis" element={<SleepTracker />} />
        <Route path="/music-therapy" element={<MusicTherapy />} />
          <Route path="/progress" element={<ProgressDashboardPage />} />
          <Route path="/enhanced-mirror-ai" element={<EnhancedMirrorAIPage />} />
          <Route path="/recommendations" element={<PersonalizedRecommendationsPage />} />
          <Route path="/enhanced-audio-therapy" element={<EnhancedAudioTherapyPage />} />
          <Route path="/art-therapy" element={<ArtTherapyStudio />} />
          <Route path="/dear-henry" element={<DearHenry />} />
          <Route path="/dear-henry-admin" element={<DearHenryAdmin />} />
          <Route path="/unburdened" element={<Unburdened />} />
          
          <Route path="/all-workshops" element={<AllWorkshopsPage />} />
          <Route path="/not-found" element={<NotFound />} />
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
