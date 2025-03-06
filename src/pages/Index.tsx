
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Brain, Calendar, Shield, Smile, Meh, Frown, User, Mail, Lock, ArrowLeft, Annoyed, HeartCrack, Angry, HeartHandshake, Bot, Video, Clock, Users, Bell, BellRing, Crown, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import SponsorChatbot from "@/components/SponsorChatbot";
import { generateTodayClasses, VirtualClass } from "@/data/toolCategories";
import { format } from "date-fns";
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

const Index = () => {
  const [todayClasses, setTodayClasses] = useState<VirtualClass[]>([]);
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [randomAffirmation, setRandomAffirmation] = useState("");
  const [randomEncouragement, setRandomEncouragement] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);

  useEffect(() => {
    // Generate today's classes
    setTodayClasses(generateTodayClasses());
    
    // Select random affirmation and encouragement
    const randomAffIndex = Math.floor(Math.random() * positiveAffirmations.length);
    setRandomAffirmation(positiveAffirmations[randomAffIndex]);
    
    const randomEncIndex = Math.floor(Math.random() * encouragementMessages.length);
    setRandomEncouragement(encouragementMessages[randomEncIndex]);
  }, []);

  const handleMoodSelection = (mood: string) => {
    setCurrentMood(mood);
    
    toast({
      title: "Mood Tracked",
      description: `Your mood has been recorded as ${mood}.`,
    });
  };

  const handleToolClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#1a1a20] text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Your Mental Health Journey Starts Here</h1>
          <p className="text-xl md:text-2xl text-[#B87333] mb-8">Evidence-based tools, therapy, and support - all in one place</p>
          
          {/* Subscription Plans Dialog */}
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
          
          {/* Daily quote */}
          <div className="bg-[#2a2a30] p-4 rounded-lg shadow-lg max-w-xl mx-auto mb-8">
            <p className="text-lg font-light italic text-gray-300">{randomAffirmation}</p>
          </div>
        </div>

        {/* Today's Virtual Classes */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Today's Virtual Classes</h2>
            <Link to="/virtual-classes" className="text-[#B87333] flex items-center hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {todayClasses.map((classItem, index) => (
              <Card key={index} className="bg-[#2a2a30] border-[#3a3a40] overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-white">{classItem.title}</h3>
                    <Badge variant="outline" className="text-[#B87333] border-[#B87333]">
                      {classItem.category}
                    </Badge>
                  </div>
                  <div className="text-gray-400 text-sm mb-3 flex items-center gap-1">
                    <Clock className="h-4 w-4" /> 
                    {format(classItem.startTime, "h:mm a")} - {format(classItem.endTime, "h:mm a")}
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{classItem.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="h-4 w-4 mr-1" /> 
                      <span>{classItem.participants} attending</span>
                    </div>
                    <Button variant="outline_copper" size="sm" className="ml-auto" onClick={() => navigate("/virtual-classes")}>
                      Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
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

        {/* Mood Tracker */}
        <div className="mb-12 bg-[#2a2a30] rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">How are you feeling today?</h2>
          <p className="text-gray-400 mb-6">{randomEncouragement}</p>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { emoji: <Smile className="h-6 w-6" />, label: "Happy", color: "bg-green-600" },
              { emoji: <Meh className="h-6 w-6" />, label: "Okay", color: "bg-blue-600" },
              { emoji: <Frown className="h-6 w-6" />, label: "Sad", color: "bg-indigo-600" },
              { emoji: <Annoyed className="h-6 w-6" />, label: "Anxious", color: "bg-yellow-600" },
              { emoji: <Angry className="h-6 w-6" />, label: "Angry", color: "bg-red-600" },
              { emoji: <HeartCrack className="h-6 w-6" />, label: "Stressed", color: "bg-purple-600" },
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
                <div className={`${mood.color} p-3 rounded-full mb-2`}>
                  {mood.emoji}
                </div>
                <span>{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Emergency Resources */}
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
