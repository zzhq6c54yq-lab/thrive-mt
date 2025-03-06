
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Brain, Calendar, Shield, Smile, Meh, Frown, User, Mail, Lock, ArrowLeft, Annoyed, HeartCrack, Angry, HeartHandshake, Bot, Video, Clock, Users, Bell, BellRing, Crown, Star, BookOpen, Lightbulb, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import SponsorChatbot from "@/components/SponsorChatbot";
import { VirtualClass } from "@/data/toolCategories";
import { Badge } from "@/components/ui/badge";
import SubscriptionCard from "@/components/SubscriptionCard";

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
  "Happy": "Your happiness radiates to those around you. Keep shining and sharing your joy!",
  "Just ok": "It's perfectly fine to be okay. Small steps lead to big progress, and you're doing great.",
  "Neutral": "Finding balance is a strength. Take this moment of calm to appreciate how far you've come.",
  "Not great": "Every feeling is temporary. Tomorrow brings new opportunities and possibilities.",
  "Sad": "It's okay to feel down sometimes. Be gentle with yourself - brighter days are ahead.",
  "Anxious": "Take a deep breath. Focus on what you can control right now. You've overcome challenges before.",
  "Overwhelmed": "One step at a time. Break things down into smaller tasks. You don't have to carry everything at once."
};

const emergencySupport = {
  "Sad": [
    { name: "Crisis Text Line", contact: "Text HOME to 741741", description: "24/7 support" },
    { name: "Warmline", contact: "1-855-642-6222", description: "Peer emotional support" }
  ],
  "Overwhelmed": [
    { name: "National Suicide Prevention Lifeline", contact: "988", description: "24/7 support" },
    { name: "Crisis Text Line", contact: "Text HOME to 741741", description: "24/7 support" },
    { name: "Emergency Services", contact: "911", description: "For immediate emergencies" },
    { name: "Crisis Line", contact: "1-800-273-8255", description: "Local support" }
  ]
};

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showMoodScreen, setShowMoodScreen] = useState(false);
  const [selfPacedWorkshops, setSelfPacedWorkshops] = useState<VirtualClass[]>([]);
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [randomAffirmation, setRandomAffirmation] = useState("");
  const [randomEncouragement, setRandomEncouragement] = useState("");
  const [moodFeedback, setMoodFeedback] = useState("");
  const [showEmergencyResources, setShowEmergencyResources] = useState(false);
  const [emergencyResourcesForMood, setEmergencyResourcesForMood] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [showMoodDialog, setShowMoodDialog] = useState(false);

  useEffect(() => {
    setSelfPacedWorkshops(selfPacedClasses);
    
    const randomAffIndex = Math.floor(Math.random() * positiveAffirmations.length);
    setRandomAffirmation(positiveAffirmations[randomAffIndex]);
    
    const randomEncIndex = Math.floor(Math.random() * encouragementMessages.length);
    setRandomEncouragement(encouragementMessages[randomEncIndex]);
    
    const timer = setTimeout(() => {
      setShowIntro(false);
      setShowMoodScreen(true);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleMoodSelection = (mood: string) => {
    setCurrentMood(mood);
    setMoodFeedback(moodAffirmations[mood as keyof typeof moodAffirmations] || "Thank you for sharing how you feel.");
    
    if (mood === "Sad" || mood === "Overwhelmed") {
      setEmergencyResourcesForMood(emergencySupport[mood as keyof typeof emergencySupport] || []);
      setShowEmergencyResources(true);
    } else {
      setShowEmergencyResources(false);
    }
    
    setShowMoodDialog(true);
    
    toast({
      title: `You're feeling ${mood}`,
      description: moodAffirmations[mood as keyof typeof moodAffirmations] || "Thank you for sharing how you feel.",
      duration: 5000,
    });
  };

  const proceedToMainContent = () => {
    setShowMoodScreen(false);
    setShowMoodDialog(false);
  };

  const handleToolClick = (path: string) => {
    navigate(path);
  };

  const toggleQuality = (qualityId: string) => {
    setSelectedQualities(prev => 
      prev.includes(qualityId) 
        ? prev.filter(id => id !== qualityId) 
        : [...prev, qualityId]
    );
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId) 
        : [...prev, goalId]
    );
  };

  const saveVisionBoard = () => {
    toast({
      title: "Vision Board Updated",
      description: "Your personal vision board has been saved.",
    });
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-[#1a1a20] flex flex-col items-center justify-center text-white">
        <div className="text-center">
          <div className="intro-logo-icon mb-4">
            <img 
              src="/lovable-uploads/7d06dcc4-22d6-4a52-8d1a-ad5febe60afb.png" 
              alt="Thrive MT Logo" 
              className="h-24 w-auto mx-auto" 
              style={{ filter: "brightness(0) saturate(100%) invert(100%) sepia(43%) saturate(1352%) hue-rotate(337deg) brightness(89%) contrast(91%)" }}
            />
          </div>
          <h1 className="intro-logo-text text-5xl md:text-7xl font-bold mb-2">
            <span className="copper-text">Thrive MT</span>
          </h1>
          <h2 className="intro-logo-text text-2xl md:text-3xl font-semibold mb-4">
            <span className="text-white">New Beginnings</span>
          </h2>
          <p className="intro-tagline text-xl md:text-2xl text-[#B87333] mb-4">
            because life should be more then just surviving
          </p>
        </div>
      </div>
    );
  }

  if (showMoodScreen) {
    return (
      <div className="min-h-screen bg-[#1a1a20] flex flex-col items-center justify-center text-white px-4">
        <div className="w-full max-w-4xl bg-[#2a2a30] rounded-lg p-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-12 text-center copper-text">How are you feeling today?</h1>
          
          <div className="flex flex-wrap justify-center gap-10 mb-12">
            {[
              { emoji: <Smile className="h-12 w-12 stroke-[2.25]" />, label: "Content" },
              { emoji: <Meh className="h-12 w-12 stroke-[2.25]" />, label: "Moderate" },
              { emoji: <Meh className="h-12 w-12 stroke-[2.25]" />, label: "Neutral" },
              { emoji: <Frown className="h-12 w-12 stroke-[2.25] rotate-180" />, label: "Uneasy" },
              { emoji: <Frown className="h-12 w-12 stroke-[2.25]" />, label: "Distressed" },
              { emoji: <Annoyed className="h-12 w-12 stroke-[2.25]" />, label: "Anxious" },
              { emoji: <HeartCrack className="h-12 w-12 stroke-[2.25]" />, label: "Overwhelmed" },
            ].map((mood) => (
              <Button
                key={mood.label}
                variant="ghost"
                className="flex flex-col items-center justify-center py-6 px-4 rounded-xl hover:scale-110 transition-all"
                onClick={() => handleMoodSelection(mood.label)}
              >
                <div className="mb-3 text-[#B87333]">
                  {mood.emoji}
                </div>
                <span className="text-lg font-medium">{mood.label}</span>
              </Button>
            ))}
          </div>

          <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
            <DialogContent className="bg-[#2a2a30] border-[#3a3a40] text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {currentMood ? `You're feeling ${currentMood}` : "How are you feeling today?"}
                </DialogTitle>
                <DialogDescription>
                  {moodFeedback}
                </DialogDescription>
              </DialogHeader>
              
              {showEmergencyResources && (
                <div className="mt-4 space-y-4">
                  <h3 className="text-xl font-semibold text-[#B87333]">Resources that might help:</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {emergencyResourcesForMood.map((resource, index) => (
                      <div key={index} className="border border-[#3a3a40] rounded-lg p-4 bg-[#1a1a20]">
                        <h4 className="font-semibold">{resource.name}</h4>
                        <p className="text-[#B87333] font-bold">{resource.contact}</p>
                        <p className="text-sm text-gray-400">{resource.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setShowMoodDialog(false)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button variant="bronze" onClick={proceedToMainContent}>
                  Continue
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowIntro(true)}
              className="text-[#B87333] p-2"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button 
              onClick={proceedToMainContent} 
              variant="bronze" 
              size="lg"
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a20] text-white">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Your Mental Health Journey Starts Here</h1>
          <p className="text-xl md:text-2xl text-[#B87333] mb-8">Evidence-based tools, therapy, and support - all in one place</p>
          
          <Dialog open={isSubDialogOpen} onOpenChange={setIsSubDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="animated_bronze" size="lg" className="px-8 mb-8">
                View Subscription Plans <Crown className="ml-2" size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-3xl" size="default">
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl text-white mb-2">
                  Choose Your Mental Wellness Plan
                </DialogTitle>
                <DialogDescription>
                  Select the plan that best fits your needs and recovery journey
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {subscriptionPlans.map((plan) => (
                  <SubscriptionCard
                    key={plan.title}
                    title={plan.title}
                    price={plan.price}
                    features={plan.features}
                    coPayCredit={plan.coPayCredit}
                    recommended={plan.recommended}
                    buttonVariant={plan.buttonVariant as any}
                    buttonText={plan.buttonText}
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
          
          <div className="bg-[#2a2a30] p-4 rounded-lg shadow-lg max-w-xl mx-auto mb-8">
            <p className="text-lg font-light italic text-gray-300">{randomAffirmation}</p>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Self-Paced Workshops</h2>
            <Link to="/virtual-classes" className="text-[#B87333] flex items-center hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selfPacedWorkshops.map((workshop, index) => (
              <Card key={index} className="bg-[#2a2a30] border-[#3a3a40] overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-white">{workshop.title}</h3>
                    <Badge variant="outline" className="text-[#B87333] border-[#B87333]">
                      {workshop.type.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{workshop.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="h-4 w-4 mr-1" /> 
                      <span>{workshop.facilitator}</span>
                    </div>
                    <Button variant="outline_copper" size="sm" className="ml-auto" onClick={() => navigate("/virtual-classes")}>
                      Start Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tools & Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-[#2a2a30] border-[#3a3a40] hover:border-[#B87333] transition-colors cursor-pointer"
                onClick={() => handleToolClick(feature.path)}
              >
                <div className="p-6">
                  <div className="mb-4 bg-[#3a3a40] h-12 w-12 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-[#B87333]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <div className="flex items-center text-[#B87333]">
                    <span className="mr-2">Explore</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12 bg-[#2a2a30] rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">How are you feeling today?</h2>
          <p className="text-gray-400 mb-6">{randomEncouragement}</p>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { emoji: <Smile className="h-6 w-6" />, label: "Happy", color: "bg-[#2a2a30]" },
              { emoji: <Meh className="h-6 w-6" />, label: "Just ok", color: "bg-[#2a2a30]" },
              { emoji: <Meh className="h-6 w-6" />, label: "Neutral", color: "bg-[#2a2a30]" },
              { emoji: <Frown className="h-6 w-6 rotate-180" />, label: "Not great", color: "bg-[#2a2a30]" },
              { emoji: <Frown className="h-6 w-6" />, label: "Sad", color: "bg-[#2a2a30]" },
              { emoji: <Annoyed className="h-6 w-6" />, label: "Anxious", color: "bg-[#2a2a30]" },
              { emoji: <Angry className="h-6 w-6" />, label: "Angry", color: "bg-[#2a2a30]" },
              { emoji: <HeartCrack className="h-6 w-6" />, label: "Overwhelmed", color: "bg-[#2a2a30]" },
            ].map((mood) => (
              <Button
                key={mood.label}
                variant="ghost"
                className={`flex flex-col items-center p-4 rounded-lg border ${
                  currentMood === mood.label
                    ? `border-[#B87333] bg-[#B87333]/10`
                    : "border-gray-700 hover:border-[#B87333]/50"
                }`}
                onClick={() => handleMoodSelection(mood.label)}
              >
                <div className={`${mood.color} p-3 rounded-full mb-2 flex items-center justify-center text-[#B87333]`}>
                  {mood.emoji}
                </div>
                <span>{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-12 bg-[#2a2a30] rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-[#B87333]" />
            My Vision Board
          </h2>
          <p className="text-gray-400 mb-6">
            Select the qualities you want to embody and goals you're working toward.
          </p>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">I want to be:</h3>
            <div className="flex flex-wrap gap-2">
              {visionBoardQualities.map((quality) => (
                <Button
                  key={quality.id}
                  variant={selectedQualities.includes(quality.id) ? "copper" : "outline_copper"}
                  size="sm"
                  onClick={() => toggleQuality(quality.id)}
                  className="mb-2"
                >
                  {quality.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">I'm working on:</h3>
            <div className="flex flex-wrap gap-2">
              {visionBoardGoals.map((goal) => (
                <Button
                  key={goal.id}
                  variant={selectedGoals.includes(goal.id) ? "copper" : "outline_copper"}
                  size="sm"
                  onClick={() => toggleGoal(goal.id)}
                  className="mb-2"
                >
                  {goal.label}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={saveVisionBoard} variant="bronze" className="w-full">
            Save My Vision Board
          </Button>
        </div>

        <div className="bg-[#2a2a30] rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Bell className="mr-2 h-6 w-6 text-[#B87333]" />
            Emergency Resources
          </h2>
          <p className="text-gray-400 mb-6">If you're experiencing a crisis, please reach out for immediate help:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyResources.map((resource, index) => (
              <div key={index} className="border border-[#3a3a40] rounded-lg p-4 bg-[#1a1a20]">
                <h3 className="font-semibold mb-1">{resource.name}</h3>
                <p className="text-[#B87333] font-bold">{resource.contact}</p>
                <p className="text-sm text-gray-400">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
