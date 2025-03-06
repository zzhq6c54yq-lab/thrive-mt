import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Brain, MessageCircle, Calendar, Shield, HeartHandshake, Video } from "lucide-react";
import { VirtualClass } from "@/data/toolCategories";

// Import our new components
import IntroScreen from "@/components/home/IntroScreen";
import MoodSelector from "@/components/home/MoodSelector";
import MoodResponse from "@/components/home/MoodResponse";
import VisionBoard from "@/components/home/VisionBoard";
import Dashboard from "@/components/home/Dashboard";

// App data
const features = [
  {
    title: "Mental Wellness Tools", 
    description: "Access evidence-based resources and exercises for your mental health journey.",
    icon: Brain,
    path: "/mental-wellness-tools"
  },
  {
    title: "Real-Time Therapy",
    description: "Connect with licensed therapists instantly through secure video sessions.",
    icon: MessageCircle,
    path: "/real-time-therapy"
  },
  {
    title: "My Sponsor",
    description: "Access NA program resources and connect with a digital sponsor anytime.",
    icon: HeartHandshake,
    path: "/my-sponsor"
  },
  {
    title: "Flexible Scheduling",
    description: "Book therapy sessions that fit your schedule, with 24/7 availability.",
    icon: Calendar,
    path: "/scheduling"
  },
  {
    title: "Private & Secure",
    description: "Your mental health journey, protected with end-to-end encryption.",
    icon: Shield,
    path: "/privacy-security"
  },
  {
    title: "Virtual Classes",
    description: "Join live sessions and meetings facilitated by mental health experts.",
    icon: Video,
    path: "/virtual-classes"
  }
];

const positiveAffirmations = [
  "You are capable of amazing things.",
  "Every day is a new opportunity.",
  "You are strong, resilient, and worthy of happiness.",
  "Your potential is limitless.",
  "Small steps lead to big changes.",
];

const encouragementMessages = [
  "It's okay to have off days. Tomorrow is a new beginning.",
  "Remember to be kind to yourself today.",
  "You don't have to have everything figured out right now.",
  "Progress isn't always linear, and that's okay.",
  "You're doing better than you think you are.",
];

const emergencyResources = [
  { name: "National Suicide Prevention Lifeline", contact: "988", description: "Available 24/7" },
  { name: "Crisis Text Line", contact: "Text HOME to 741741", description: "Available 24/7" },
  { name: "Emergency Services", contact: "911", description: "For immediate emergencies" },
  { name: "Crisis Line", contact: "1-800-273-8255", description: "Local support" },
];

const visionBoardQualities = [
  { id: "peaceful", label: "Peaceful" },
  { id: "confident", label: "Confident" },
  { id: "focused", label: "Focused" },
  { id: "joyful", label: "Joyful" },
  { id: "resilient", label: "Resilient" },
  { id: "balanced", label: "Balanced" },
  { id: "energetic", label: "Energetic" },
  { id: "mindful", label: "Mindful" },
  { id: "creative", label: "Creative" },
  { id: "grateful", label: "Grateful" },
  { id: "empathetic", label: "Empathetic" },
  { id: "present", label: "Present" },
];

const visionBoardGoals = [
  { id: "reducing-anxiety", label: "Reducing anxiety" },
  { id: "managing-stress", label: "Managing stress" },
  { id: "improving-sleep", label: "Improving sleep" },
  { id: "better-relationships", label: "Better relationships" },
  { id: "career-growth", label: "Career growth" },
  { id: "health-wellness", label: "Health & wellness" },
  { id: "emotional-regulation", label: "Emotional regulation" },
  { id: "setting-boundaries", label: "Setting boundaries" },
  { id: "overcoming-trauma", label: "Overcoming trauma" },
  { id: "finding-purpose", label: "Finding purpose" },
  { id: "building-confidence", label: "Building confidence" },
  { id: "work-life-balance", label: "Work-life balance" },
];

const subscriptionPlans = [
  {
    title: "Free",
    price: "$0",
    coPayCredit: "0%",
    features: [
      { text: "Basic mental wellness tools" },
      { text: "Limited AI sponsor assistance" },
      { text: "Access to community support forums" },
      { text: "Daily mood tracking" }
    ],
    buttonVariant: "outline",
    buttonText: "Current Plan"
  },
  {
    title: "Gold",
    price: "$5",
    coPayCredit: "5%",
    features: [
      { text: "All Free features" },
      { text: "Advanced mental wellness tools" },
      { text: "Enhanced AI sponsor capabilities" },
      { text: "Guided meditation library" },
      { text: "Priority community support" }
    ],
    recommended: true,
    buttonVariant: "bronze"
  },
  {
    title: "Platinum",
    price: "$10",
    coPayCredit: "10%",
    features: [
      { text: "All Gold features" },
      { text: "Premium mental wellness tools" },
      { text: "Advanced emotional intelligence training" },
      { text: "Personalized wellness plan" },
      { text: "1-on-1 coaching sessions" },
      { text: "24/7 crisis support" }
    ],
    buttonVariant: "animated_bronze"
  }
];

const selfPacedClasses: VirtualClass[] = [
  {
    id: "class-1",
    title: "Mindfulness Meditation",
    description: "Learn techniques to stay present and reduce anxiety in your daily life",
    startTime: new Date(), // Placeholder date (not shown in UI)
    duration: 0, // Self-paced
    facilitator: "Dr. Sarah Chen",
    type: "meditation",
    capacity: 0, // Unlimited
    attendees: 0 // Not tracked
  },
  {
    id: "class-2",
    title: "Anxiety Management",
    description: "Practical strategies to manage anxiety through self-guided exercises",
    startTime: new Date(), // Placeholder date (not shown in UI)
    duration: 0, // Self-paced
    facilitator: "Michael Rodriguez, LMFT",
    type: "mental_health",
    capacity: 0, // Unlimited
    attendees: 0 // Not tracked
  },
  {
    id: "class-3",
    title: "Building Resilience",
    description: "Develop skills to bounce back from challenges at your own pace",
    startTime: new Date(), // Placeholder date (not shown in UI)
    duration: 0, // Self-paced
    facilitator: "Lisa Thompson, PhD",
    type: "workshop",
    capacity: 0, // Unlimited
    attendees: 0 // Not tracked
  }
];

const moodAffirmations = {
  "Content": "Your positive energy creates a beautiful ripple effect of joy all around you! Embrace this wonderful feeling and let it fuel your day. Remember, you deserve every moment of happiness, and your smile can inspire others to find their own joy. These moments of contentment are building blocks for lasting well-being and resilience. Notice how this feeling affects your body—perhaps your shoulders feel lighter or your breathing comes more easily.",
  "Moderate": "Finding balance is a remarkable strength that not everyone possesses. You're navigating life's challenges with grace and stability. Each step forward is a significant victory worth celebrating, and your steady progress is building a foundation for lasting well-being. Your ability to maintain perspective during life's ups and downs is a powerful asset that will serve you well through any situation.",
  "Neutral": "Being centered gives you a unique clarity that many seek but few achieve. This balanced state allows you to make mindful choices and fully appreciate the present moment. Notice how this emotional equilibrium provides you space to choose your next steps with intention. From this neutral ground, you can observe your thoughts and feelings without being overwhelmed by them—a truly valuable skill in today's fast-paced world.",
  "Uneasy": "It's perfectly okay to feel uncertain sometimes. Remember your inner strength and resilience - you've successfully navigated challenging waters before and grown stronger from each experience. This feeling is temporary, and brighter moments await just around the corner. Consider what your uneasiness might be trying to tell you—sometimes these feelings are signposts guiding us toward important insights or necessary changes.",
  "Distressed": "Every feeling is valid and temporary. Be especially gentle with yourself today - take the smallest steps toward comfort, and acknowledge each one. Brighter moments are always on the horizon, and this discomfort is teaching you something valuable about your needs. Remember that you've moved through difficult feelings before, and each time you've emerged with new wisdom and strength. Your awareness of these feelings shows your emotional intelligence.",
  "Anxious": "Take a deep, nurturing breath and remember you are infinitely stronger than you realize in this moment. This feeling will pass, and you already possess all the tools and wisdom to navigate through it. Your awareness itself is the first step toward relief. Consider what small action might bring you comfort right now—perhaps a brief walk, a glass of water, or a few minutes of mindful breathing. You're not alone in feeling this way, and reaching out for support is a sign of courage.",
  "Overwhelmed": "You don't have to carry everything at once - it's okay to set some burdens down. Break challenges into the smallest possible steps, celebrate each tiny victory, and remember how incredibly resilient you truly are. Each time you've felt this way before, you've found your way through. Take a moment to acknowledge your courage in facing these intense feelings. Your capacity to handle difficult situations has grown with every challenge you've faced."
};

const emergencySupport = {
  "Distressed": [
    { name: "Crisis Text Line", contact: "Text HOME to 741741", description: "24/7 compassionate support" },
    { name: "Warmline", contact: "1-855-642-6222", description: "Peer emotional support" }
  ],
  "Overwhelmed": [
    { name: "National Suicide Prevention Lifeline", contact: "988", description: "24/7 caring support" },
    { name: "Crisis Text Line", contact: "Text HOME to 741741", description: "24/7 compassionate support" },
    { name: "Emergency Services", contact: "911", description: "For immediate assistance" },
    { name: "Crisis Line", contact: "1-800-273-8255", description: "Supportive local resources" }
  ]
};

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showMoodScreen, setShowMoodScreen] = useState(false);
  const [showVisionBoard, setShowVisionBoard] = useState(false);
  const [selfPacedWorkshops, setSelfPacedWorkshops] = useState<VirtualClass[]>([]);
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [randomAffirmation, setRandomAffirmation] = useState("");
  const [randomEncouragement, setRandomEncouragement] = useState("");
  const [moodFeedback, setMoodFeedback] = useState("");
  const [showEmergencyResources, setShowEmergencyResources] = useState(false);
  const [emergencyResourcesForMood, setEmergencyResourcesForMood] = useState<any[]>([]);
  const [showMoodResponse, setShowMoodResponse] = useState(false);
  const [currentMoodResponse, setCurrentMoodResponse] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  useEffect(() => {
    setSelfPacedWorkshops(selfPacedClasses);
    
    const randomAffIndex = Math.floor(Math.random() * positiveAffirmations.length);
    setRandomAffirmation(positiveAffirmations[randomAffIndex]);
    
    const randomEncIndex = Math.floor(Math.random() * encouragementMessages.length);
    setRandomEncouragement(encouragementMessages[randomEncIndex]);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowMoodScreen(true);
  };

  const handleMoodSelection = (mood: string) => {
    setCurrentMood(mood);
    setMoodFeedback(moodAffirmations[mood as keyof typeof moodAffirmations] || "Thank you for sharing how you feel. Remember that all emotions are valid, and recognizing them is an important step in your well-being journey.");
    
    if (mood === "Distressed" || mood === "Overwhelmed") {
      setEmergencyResourcesForMood(emergencySupport[mood as keyof typeof emergencySupport] || []);
      setShowEmergencyResources(true);
    } else {
      setShowEmergencyResources(false);
    }
    
    setCurrentMoodResponse(mood);
    setShowMoodResponse(true);
    
    toast({
      title: `You're feeling ${mood}`,
      description: "Thank you for sharing how you feel.",
      duration: 3000,
    });
  };

  const proceedToMainContent = () => {
    setShowMoodScreen(false);
    setShowVisionBoard(false);
    setShowMoodResponse(false);
  };

  const goToVisionBoard = () => {
    setShowMoodScreen(false);
    setShowVisionBoard(true);
  };

  const goBackToMainContent = () => {
    setShowVisionBoard(false);
  };

  const saveVisionBoard = () => {
    toast({
      title: "Vision Board Updated",
      description: "Your personal vision board has been saved.",
    });
    setShowVisionBoard(false);
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  if (showMoodScreen) {
    if (showMoodResponse) {
      return (
        <MoodResponse 
          mood={currentMoodResponse}
          feedback={moodFeedback}
          showEmergencyResources={showEmergencyResources}
          emergencyResourcesForMood={emergencyResourcesForMood}
          onBack={() => setShowMoodResponse(false)}
          onContinue={proceedToMainContent}
        />
      );
    }
    
    return (
      <MoodSelector 
        onMoodSelect={handleMoodSelection}
        onBack={() => setShowIntro(true)}
        onContinue={goToVisionBoard}
      />
    );
  }

  if (showVisionBoard) {
    return (
      <VisionBoard 
        qualities={visionBoardQualities}
        goals={visionBoardGoals}
        onBack={goBackToMainContent}
        onSave={saveVisionBoard}
        initialSelectedQualities={selectedQualities}
        initialSelectedGoals={selectedGoals}
      />
    );
  }

  return (
    <Dashboard 
      workshops={selfPacedWorkshops}
      features={features}
      randomAffirmation={randomAffirmation}
      randomEncouragement={randomEncouragement}
      emergencyResources={emergencyResources}
      subscriptionPlans={subscriptionPlans}
      currentMood={currentMood}
      onMoodSelect={handleMoodSelection}
      onVisionBoardClick={goToVisionBoard}
    />
  );
};

export default Index;
