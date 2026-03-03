import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import RouteLoadingWrapper from "./components/RouteLoadingWrapper";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/UserContext";
import FloatingHenryAssistant from "@/components/henry/FloatingHenryAssistant";
import AppFooter from "@/components/AppFooter";
import { Skeleton } from "@/components/ui/skeleton";
import "./App.css";

// Lazy-loaded page components
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const ConfirmEmail = lazy(() => import("./pages/ConfirmEmail"));
const ResendConfirmationPage = lazy(() => import("./pages/ResendConfirmationPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const Home = lazy(() => import("./pages/Home"));
const Messages = lazy(() => import("./pages/Messages"));
const Debug = lazy(() => import("./pages/Debug"));

// Wellness Tools
const MentalWellnessTools = lazy(() => import("./pages/MentalWellnessTools"));
const MentalWellnessAssessments = lazy(() => import("./pages/MentalWellnessAssessments"));
const BreathingExercise = lazy(() => import("./pages/BreathingExercise"));
const ThoughtReframing = lazy(() => import("./pages/ThoughtReframing"));
const GuidedMeditationPage = lazy(() => import("./pages/GuidedMeditationPage"));
const MoodBoost = lazy(() => import("./pages/MoodBoost"));
const SleepImprovement = lazy(() => import("./pages/SleepImprovement"));
const GoalSetting = lazy(() => import("./pages/GoalSetting"));
const MentalWellnessExercise = lazy(() => import("./pages/MentalWellnessExercise"));
const TherapySupport = lazy(() => import("./pages/TherapySupport"));
const MeditationStudio = lazy(() => import("./pages/MeditationStudio"));
const BinauralBeats = lazy(() => import("./pages/BinauralBeats"));
const MusicTherapy = lazy(() => import("./pages/MusicTherapy"));
const ArtTherapyStudio = lazy(() => import("./components/ArtTherapyStudio"));
const SleepTracker = lazy(() => import("./pages/SleepTracker"));
const SleepInsights = lazy(() => import("./pages/SleepInsights"));
const MindfulnessSleep = lazy(() => import("./pages/MindfulnessSleep"));
const EnhancedAudioTherapyPage = lazy(() => import("./pages/EnhancedAudioTherapy"));

// Community & Social
const CommunityGroups = lazy(() => import("./pages/CommunityGroups"));
const GroupChatRoom = lazy(() => import("./pages/GroupChatRoom"));
const CommunitySupport = lazy(() => import("./pages/CommunitySupport"));
const BuddySystem = lazy(() => import("./pages/BuddySystem"));
const SupportCircle = lazy(() => import("./pages/SupportCircle"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const Gratitude = lazy(() => import("./pages/Gratitude"));
const Unburdened = lazy(() => import("./pages/Unburdened"));

// Journal & Diary
const JournalApp = lazy(() => import("./pages/JournalApp"));
const JournalPage = lazy(() => import("./pages/JournalPage"));
const Journaling = lazy(() => import("./pages/Journaling"));
const VideoDiary = lazy(() => import("./pages/VideoDiary"));
const VideoRecordPage = lazy(() => import("./pages/VideoRecordPage"));
const VideoLibraryPage = lazy(() => import("./pages/VideoLibraryPage"));

// Progress & Goals
const ProgressReports = lazy(() => import("./pages/ProgressReports"));
const ProgressAnalytics = lazy(() => import("./pages/ProgressAnalytics"));
const ProgressDashboardPage = lazy(() => import("./pages/ProgressDashboard"));
const WeeklyGoals = lazy(() => import("./pages/WeeklyGoals"));
const MonthlyGoals = lazy(() => import("./pages/MonthlyGoals"));
const Rewards = lazy(() => import("./pages/Rewards"));
const BadgesPage = lazy(() => import("./pages/Badges"));

// Games
const GamesAndQuizzes = lazy(() => import("./pages/GamesAndQuizzes"));
const GamePage = lazy(() => import("./pages/GamePage"));
const MentalHealthGames = lazy(() => import("./pages/MentalHealthGames"));
const CosmicGames = lazy(() => import("./pages/CosmicGames"));

// Therapy & Coaching
const RealTimeTherapy = lazy(() => import("./pages/RealTimeTherapy"));
const TherapistAdmin = lazy(() => import("./pages/TherapistAdmin"));
const TherapistDashboard = lazy(() => import("./pages/TherapistDashboard"));
const CoachDashboard = lazy(() => import("./pages/CoachDashboard"));
const TherapistVideoSession = lazy(() => import("./pages/TherapistVideoSession"));
const ClientVideoSession = lazy(() => import("./components/client/ClientVideoSession"));
const TherapistProfile = lazy(() => import("./pages/TherapistProfile"));
const TherapistReset = lazy(() => import("./pages/TherapistReset"));
const CoachIntro = lazy(() => import("./pages/CoachIntro"));
const CoachQuestionnaire = lazy(() => import("./pages/CoachQuestionnaire"));
const CoachMatches = lazy(() => import("./pages/CoachMatches"));
const CoachProfile = lazy(() => import("./pages/CoachProfile"));
const MiniSession = lazy(() => import("./pages/MiniSession"));
const MiniSessionHistory = lazy(() => import("./pages/MiniSessionHistory"));
const TherapistMatches = lazy(() => import("./pages/TherapistMatches"));
const TherapistQuestionnaire = lazy(() => import("./pages/TherapistQuestionnaire"));

// Henry / AI
const DearHenry = lazy(() => import("./pages/DearHenry"));
const DearHenryAdmin = lazy(() => import("./pages/DearHenryAdmin"));
const MirrorAI = lazy(() => import("./pages/MirrorAI"));
const EnhancedMirrorAIPage = lazy(() => import("./pages/EnhancedMirrorAI"));
const PersonalizedRecommendationsPage = lazy(() => import("./pages/PersonalizedRecommendations"));
const GenerativeVideo = lazy(() => import("./pages/GenerativeVideo"));
const AIWorkshopStudio = lazy(() => import("./pages/AIWorkshopStudio"));

// Admin
const AdminPortal = lazy(() => import("./pages/AdminPortal"));
const EngagementMetricsDashboard = lazy(() => import("./pages/EngagementMetricsDashboard"));

// Portals
const SmallBusinessPortal = lazy(() => import("./pages/SmallBusinessPortal"));
const SmallBusinessWelcome = lazy(() => import("./pages/SmallBusinessWelcome"));
const SmallBusinessSelection = lazy(() => import("./pages/SmallBusinessSelection"));
const SmallBusinessExperience = lazy(() => import("./pages/SmallBusinessExperience"));
const EmployeeWelcome = lazy(() => import("./pages/EmployeeWelcome"));
const EmployeeDashboard = lazy(() => import("./pages/EmployeeDashboard"));
const EmployeeReadiness = lazy(() => import("./pages/EmployeeReadiness"));
const DoDWelcome = lazy(() => import("./pages/DoDWelcome"));
const DoDPortal = lazy(() => import("./pages/DoDPortal"));
const CollegeWelcome = lazy(() => import("./pages/CollegeWelcome"));
const CollegePortal = lazy(() => import("./pages/CollegePortal"));
const AdolescentWelcome = lazy(() => import("./pages/AdolescentWelcome"));
const AdolescentPortal = lazy(() => import("./pages/AdolescentPortal"));
const AdolescentSelection = lazy(() => import("./pages/AdolescentSelection"));
const GoldenYearsWelcome = lazy(() => import("./pages/GoldenYearsWelcome"));
const GoldenYearsPortal = lazy(() => import("./pages/GoldenYearsPortal"));
const GoldenYearsJournal = lazy(() => import("./pages/GoldenYearsJournal"));
const GoldenEndOfLifePlanning = lazy(() => import("./pages/GoldenEndOfLifePlanning"));
const GoldenMemoryCognitive = lazy(() => import("./pages/GoldenMemoryCognitive"));
const GoldenSpecializedFeature = lazy(() => import("./pages/GoldenSpecializedFeature"));
const FirstRespondersWelcome = lazy(() => import("./pages/FirstRespondersWelcome"));
const FirstRespondersPortal = lazy(() => import("./pages/FirstRespondersPortal"));
const FirstRespondersResources = lazy(() => import("./pages/FirstRespondersResources"));
const FirstRespondersPeerSupport = lazy(() => import("./pages/FirstRespondersPeerSupport"));
const FirstRespondersCriticalSupport = lazy(() => import("./pages/FirstRespondersCriticalSupport"));
const FirstRespondersStressManagement = lazy(() => import("./pages/FirstRespondersStressManagement"));
const LawEnforcementWelcome = lazy(() => import("./pages/LawEnforcementWelcome"));
const LawEnforcementPortal = lazy(() => import("./pages/LawEnforcementPortal"));
const EducatorsWelcome = lazy(() => import("./pages/EducatorsWelcome"));
const EducatorsPortal = lazy(() => import("./pages/EducatorsPortal"));
const EducatorsBurnoutAssessment = lazy(() => import("./pages/EducatorsBurnoutAssessment"));
const EducatorsClassroomStressAssessment = lazy(() => import("./pages/EducatorsClassroomStressAssessment"));
const EducatorsWorkLifeBalanceAssessment = lazy(() => import("./pages/EducatorsWorkLifeBalanceAssessment"));
const HospitalityWelcome = lazy(() => import("./pages/HospitalityWelcome"));
const HospitalityPortal = lazy(() => import("./pages/HospitalityPortal"));
const HospitalityStressAssessment = lazy(() => import("./pages/HospitalityStressAssessment"));
const HospitalityBurnoutAssessment = lazy(() => import("./pages/HospitalityBurnoutAssessment"));
const HospitalityWorkLifeBalanceAssessment = lazy(() => import("./pages/HospitalityWorkLifeBalanceAssessment"));
const TransportWelcome = lazy(() => import("./pages/TransportWelcome"));
const TransportPortal = lazy(() => import("./pages/TransportPortal"));
const TransportStressAssessment = lazy(() => import("./pages/TransportStressAssessment"));
const TransportBurnoutAssessment = lazy(() => import("./pages/TransportBurnoutAssessment"));
const TransportWorkLifeBalanceAssessment = lazy(() => import("./pages/TransportWorkLifeBalanceAssessment"));
const SingleParentsWelcome = lazy(() => import("./pages/SingleParentsWelcome"));
const SingleParentsPortal = lazy(() => import("./pages/SingleParentsPortal"));
const ChronicIllnessWelcome = lazy(() => import("./pages/ChronicIllnessWelcome"));
const ChronicIllnessPortal = lazy(() => import("./pages/ChronicIllnessPortal"));
const CancerSupportWelcome = lazy(() => import("./pages/CancerSupportWelcome"));
const CancerSupportPortal = lazy(() => import("./pages/CancerSupportPortal"));

// Golden Years Modules
const WellnessResourcesModule = lazy(() => import("./pages/golden-years-modules/WellnessResourcesModule"));
const CommunityConnectionsModule = lazy(() => import("./pages/golden-years-modules/CommunityConnectionsModule"));
const MemoryCognitiveHealthModule = lazy(() => import("./pages/golden-years-modules/MemoryCognitiveHealthModule"));
const LifeTransitionsModule = lazy(() => import("./pages/golden-years-modules/LifeTransitionsModule"));
const FamilyConnectionToolsModule = lazy(() => import("./pages/golden-years-modules/FamilyConnectionToolsModule"));

// Career Coaching
const CareerCoaching = lazy(() => import("./pages/CareerCoaching"));
const CareerDevelopmentModule = lazy(() => import("./pages/career-modules/CareerDevelopmentModule"));
const LeadershipSkillsModule = lazy(() => import("./pages/career-modules/LeadershipSkillsModule"));
const ResumeBuildingModule = lazy(() => import("./pages/career-modules/ResumeBuildingModule"));
const GoalSettingModule = lazy(() => import("./pages/career-modules/GoalSettingModule"));
const LeadershipFundamentals = lazy(() => import("./pages/career-courses/LeadershipFundamentals"));
const StrategicCommunication = lazy(() => import("./pages/career-courses/StrategicCommunication"));
const RemoteTeamManagement = lazy(() => import("./pages/career-courses/RemoteTeamManagement"));
const CareerAssessment = lazy(() => import("./pages/career-resources/CareerAssessment"));
const TemplateLibrary = lazy(() => import("./pages/career-resources/TemplateLibrary"));
const InterviewSimulator = lazy(() => import("./pages/career-resources/InterviewSimulator"));
const GoalPlanner = lazy(() => import("./pages/career-resources/GoalPlanner"));

// Misc Features
const PersonalizedContent = lazy(() => import("./pages/PersonalizedContent"));
const ArtTherapy = lazy(() => import("./pages/ArtTherapy"));
const FamilyResources = lazy(() => import("./pages/FamilyResources"));
const FamilySupport = lazy(() => import("./pages/FamilySupport"));
const SignatureMoments = lazy(() => import("./pages/SignatureMoments"));
const HolisticWellness = lazy(() => import("./pages/HolisticWellness"));
const AlternativeTherapies = lazy(() => import("./pages/AlternativeTherapies"));
const AlternativeTherapyDetail = lazy(() => import("./pages/AlternativeTherapyDetail"));
const GuidedPractice = lazy(() => import("./pages/GuidedPractice"));
const BarterApplicationPage = lazy(() => import("./pages/BarterApplication"));
const LifeTransitions = lazy(() => import("./pages/LifeTransitions"));
const LifeTransitionProgram = lazy(() => import("./pages/LifeTransitionProgram"));
const ResourceLibrary = lazy(() => import("./pages/ResourceLibrary"));
const WellnessChallenges = lazy(() => import("./pages/WellnessChallenges"));
const MySponsor = lazy(() => import("./pages/MySponsor"));
const Workshops = lazy(() => import("./pages/Workshops"));
const WorkshopDetail = lazy(() => import("./pages/WorkshopDetail"));
const AllWorkshopsPage = lazy(() => import("./pages/AllWorkshops"));
const CrisisSupport = lazy(() => import("./pages/CrisisSupport"));
const CrisisResources = lazy(() => import("./pages/CrisisResources"));
const LearnMoreAboutThrive = lazy(() => import("./pages/LearnMoreAboutThrive"));
const CoPay = lazy(() => import("./pages/CoPay"));
const CoPayCredits = lazy(() => import("./pages/CoPayCredits"));
const BarterSystem = lazy(() => import("./pages/BarterSystem"));
const SubscriptionPlansPage = lazy(() => import("./pages/SubscriptionPlansPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const FinancialAssistance = lazy(() => import("./pages/FinancialAssistance"));
const ContactSupport = lazy(() => import("./pages/ContactSupport"));
const PrivacySecurity = lazy(() => import("./pages/PrivacySecurity"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const VirtualMeetings = lazy(() => import("./pages/VirtualMeetings"));
const MilitarySupport = lazy(() => import("./pages/MilitarySupport"));
const MilitaryResources = lazy(() => import("./pages/MilitaryResources"));
const UserLead = lazy(() => import("./pages/UserLead"));
const AllFeatures = lazy(() => import("./pages/AllFeatures"));
const AASponsor = lazy(() => import("./pages/AASponsor"));
const SubstanceAbuseSponsor = lazy(() => import("./pages/SubstanceAbuseSponsor"));
const MemorialGarden = lazy(() => import("./pages/MemorialGarden"));
const GriefResources = lazy(() => import("./pages/GriefResources"));
const LegacyBuilder = lazy(() => import("./pages/LegacyBuilder"));
const UserSettings = lazy(() => import("./pages/UserSettings"));

// Marketing / Public pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

const PageFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <Skeleton className="h-96 w-full max-w-4xl mx-4" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <RouteLoadingWrapper>
          <div className="min-h-screen flex flex-col bg-black">
            <FloatingHenryAssistant />
            
            <div className="flex-grow">
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  {/* Root redirects to app */}
                  <Route path="/" element={<Navigate to="/app" replace />} />

                  {/* App Routes */}
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
                  <Route path="/app/community" element={<CommunityGroups />} />
                  <Route path="/app/community-groups" element={<CommunityGroups />} />
                  <Route path="/app/community-groups/:groupId" element={<GroupChatRoom />} />
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
                  
                  {/* Portals */}
                  <Route path="/app/small-business-portal" element={<SmallBusinessPortal />} />
                  <Route path="/app/small-business-welcome" element={<SmallBusinessWelcome />} />
                  <Route path="/app/small-business-selection" element={<SmallBusinessSelection />} />
                  <Route path="/app/small-business-experience" element={<SmallBusinessExperience />} />
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
                  <Route path="/app/barter-application" element={<BarterApplicationPage />} />
                  <Route path="/app/contact" element={<ContactSupport />} />
                  <Route path="/app/privacy-security" element={<PrivacySecurity />} />
                  <Route path="/app/terms-of-service" element={<TermsOfService />} />
                  
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
                  
                  <Route path="/app/user-lead" element={<UserLead />} />
                  
                  <Route path="/app/first-responders-welcome" element={<FirstRespondersWelcome />} />
                  <Route path="/app/first-responders-portal" element={<FirstRespondersPortal />} />
                  <Route path="/app/first-responders-resources" element={<FirstRespondersResources />} />
                  <Route path="/app/first-responders-peer-support" element={<FirstRespondersPeerSupport />} />
                  <Route path="/app/first-responders-critical-support" element={<FirstRespondersCriticalSupport />} />
                  <Route path="/app/first-responders-stress-management" element={<FirstRespondersStressManagement />} />
                  
                  <Route path="/app/law-enforcement-welcome" element={<LawEnforcementWelcome />} />
                  <Route path="/app/law-enforcement-portal" element={<LawEnforcementPortal />} />
                  
                  <Route path="/app/educators-welcome" element={<EducatorsWelcome />} />
                  <Route path="/app/educators-portal" element={<EducatorsPortal />} />
                  <Route path="/app/educators-burnout-assessment" element={<EducatorsBurnoutAssessment />} />
                  <Route path="/app/educators-classroom-stress-assessment" element={<EducatorsClassroomStressAssessment />} />
                  <Route path="/app/educators-work-life-balance-assessment" element={<EducatorsWorkLifeBalanceAssessment />} />
                  
                  <Route path="/app/hospitality-welcome" element={<HospitalityWelcome />} />
                  <Route path="/app/hospitality-portal" element={<HospitalityPortal />} />
                  <Route path="/app/hospitality-stress-assessment" element={<HospitalityStressAssessment />} />
                  <Route path="/app/hospitality-burnout-assessment" element={<HospitalityBurnoutAssessment />} />
                  <Route path="/app/hospitality-work-life-balance-assessment" element={<HospitalityWorkLifeBalanceAssessment />} />
                  
                  <Route path="/app/transport-welcome" element={<TransportWelcome />} />
                  <Route path="/app/transport-portal" element={<TransportPortal />} />
                  <Route path="/app/transport-stress-assessment" element={<TransportStressAssessment />} />
                  <Route path="/app/transport-burnout-assessment" element={<TransportBurnoutAssessment />} />
                  <Route path="/app/transport-work-life-balance-assessment" element={<TransportWorkLifeBalanceAssessment />} />
                  
                  <Route path="/app/single-parents-welcome" element={<SingleParentsWelcome />} />
                  <Route path="/app/single-parents-portal" element={<SingleParentsPortal />} />
                  
                  <Route path="/app/chronic-illness-welcome" element={<ChronicIllnessWelcome />} />
                  <Route path="/app/chronic-illness-portal" element={<ChronicIllnessPortal />} />
                  
                  <Route path="/app/cancer-support-welcome" element={<CancerSupportWelcome />} />
                  <Route path="/app/cancer-support-portal" element={<CancerSupportPortal />} />
                  
                  {/* Therapy & Coaching */}
                  <Route path="/app/real-time-therapy" element={<RealTimeTherapy />} />
                  <Route path="/app/therapist-admin" element={<TherapistAdmin />} />
                  <Route path="/app/therapist-portal" element={<TherapistDashboard />} />
                  <Route path="/app/therapist-dashboard" element={<TherapistDashboard />} />
                  <Route path="/app/coach-dashboard" element={<CoachDashboard />} />
                  <Route path="/app/therapist-video-session" element={<TherapistVideoSession />} />
                  <Route path="/app/client-video-session" element={<ClientVideoSession />} />
                  <Route path="/app/signature-moments" element={<SignatureMoments />} />
                  <Route path="/app/therapist/:therapistId" element={<TherapistProfile />} />
                  <Route path="/app/therapist-reset" element={<TherapistReset />} />
                  
                  <Route path="/app/coach-intro" element={<CoachIntro />} />
                  <Route path="/app/coach-questionnaire" element={<CoachQuestionnaire />} />
                  <Route path="/app/coach-matches" element={<CoachMatches />} />
                  <Route path="/app/coach/:coachId" element={<CoachProfile />} />
                  <Route path="/app/therapist-questionnaire" element={<TherapistQuestionnaire />} />
                  <Route path="/app/therapist-matches" element={<TherapistMatches />} />
                  
                  {/* Admin */}
                  <Route path="/app/admin" element={<AdminPortal />} />
                  <Route path="/app/admin-portal" element={<AdminPortal />} />
                  <Route path="/app/engagement-metrics" element={<EngagementMetricsDashboard />} />
                  
                  <Route path="/app/holistic-wellness" element={<HolisticWellness />} />
                  <Route path="/app/badges" element={<BadgesPage />} />
                  <Route path="/app/success-stories" element={<SuccessStories />} />
                  <Route path="/app/family-support" element={<FamilySupport />} />
                  <Route path="/app/meditation-studio" element={<MeditationStudio />} />
                  
                  <Route path="/app/life-transitions" element={<LifeTransitions />} />
                  <Route path="/app/life-transitions/:slug" element={<LifeTransitionProgram />} />
                  <Route path="/app/support-circle" element={<SupportCircle />} />
                  <Route path="/app/buddy-system" element={<BuddySystem />} />
                  <Route path="/app/binaural-beats" element={<BinauralBeats />} />
                  <Route path="/app/journaling" element={<Journaling />} />
                  <Route path="/app/mindfulness-sleep" element={<MindfulnessSleep />} />
                  <Route path="/app/video-diary" element={<VideoDiary />} />
                  <Route path="/app/video-record" element={<VideoRecordPage />} />
                  <Route path="/app/video-library" element={<VideoLibraryPage />} />
                  <Route path="/app/resource-library" element={<ResourceLibrary />} />
                  <Route path="/app/wellness-challenges" element={<WellnessChallenges />} />
                  <Route path="/app/my-sponsor" element={<MySponsor />} />
                  <Route path="/app/workshops" element={<Workshops />} />
                  <Route path="/app/workshops/:workshopId" element={<WorkshopDetail />} />
                  
                  <Route path="/app/sleep-tracker" element={<SleepTracker />} />
                  <Route path="/app/sleep-insights" element={<SleepInsights />} />
                  <Route path="/app/music-therapy" element={<MusicTherapy />} />
                  <Route path="/app/meditation" element={<MeditationStudio />} />
                  <Route path="/app/aa-sponsor" element={<AASponsor />} />
                  <Route path="/app/substance-abuse-sponsor" element={<SubstanceAbuseSponsor />} />
                  
                  {/* Career Coaching */}
                  <Route path="/app/career-coaching" element={<CareerCoaching />} />
                  <Route path="/app/career-coaching/development" element={<CareerDevelopmentModule />} />
                  <Route path="/app/career-coaching/leadership" element={<LeadershipSkillsModule />} />
                  <Route path="/app/career-coaching/resume" element={<ResumeBuildingModule />} />
                  <Route path="/app/career-coaching/goals" element={<GoalSettingModule />} />
                  <Route path="/app/career-coaching/courses/leadership-fundamentals" element={<LeadershipFundamentals />} />
                  <Route path="/app/career-coaching/courses/strategic-communication" element={<StrategicCommunication />} />
                  <Route path="/app/career-coaching/courses/remote-team-management" element={<RemoteTeamManagement />} />
                  <Route path="/app/career-coaching/resources/career-assessment" element={<CareerAssessment />} />
                  <Route path="/app/career-coaching/resources/template-library" element={<TemplateLibrary />} />
                  <Route path="/app/career-coaching/resources/interview-simulator" element={<InterviewSimulator />} />
                  <Route path="/app/career-coaching/resources/goal-planner" element={<GoalPlanner />} />
                  
                  {/* Memorial & Legacy */}
                  <Route path="/app/memorial-garden" element={<MemorialGarden />} />
                  <Route path="/app/grief-resources" element={<GriefResources />} />
                  <Route path="/app/legacy-builder" element={<LegacyBuilder />} />
                  
                  {/* AI & Tools */}
                  <Route path="/app/mini-session" element={<MiniSession />} />
                  <Route path="/app/mini-session-history" element={<MiniSessionHistory />} />
                  <Route path="/app/generative-video" element={<GenerativeVideo />} />
                  <Route path="/app/mirror-ai" element={<MirrorAI />} />
                  <Route path="/app/progress-dashboard" element={<ProgressDashboardPage />} />
                  <Route path="/app/enhanced-mirror-ai" element={<EnhancedMirrorAIPage />} />
                  <Route path="/app/recommendations" element={<PersonalizedRecommendationsPage />} />
                  <Route path="/app/enhanced-audio-therapy" element={<EnhancedAudioTherapyPage />} />
                  <Route path="/app/art-therapy" element={<ArtTherapyStudio />} />
                  <Route path="/app/dear-henry" element={<DearHenry />} />
                  <Route path="/app/dear-henry-admin" element={<DearHenryAdmin />} />
                  <Route path="/app/all-workshops" element={<AllWorkshopsPage />} />
                  <Route path="/app/ai-workshop-studio" element={<AIWorkshopStudio />} />

                  {/* Settings & Help */}
                  <Route path="/app/settings" element={<UserSettings />} />
                  <Route path="/app/help" element={<Navigate to="/app/contact" replace />} />

                  {/* Not Found */}
                  <Route path="/app/not-found" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            <AppFooter />
            <Toaster />
          </div>
        </RouteLoadingWrapper>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
