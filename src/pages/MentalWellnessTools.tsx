
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowLeft, BarChart4, Brain, MessageCircle, AlertTriangle, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

const toolCategories = [
  {
    title: "Mood Tracking",
    description: "Log and track your daily moods, emotions, and triggers to identify patterns.",
    icon: BarChart4,
    features: [
      "Daily mood check-ins",
      "Emotion pattern analysis",
      "Trigger identification",
      "Progress visualization",
      "Customizable mood scales"
    ],
    cta: "Start Tracking"
  },
  {
    title: "Meditation and Mindfulness",
    description: "Guided sessions and exercises to help reduce stress and improve focus.",
    icon: Brain,
    features: [
      "Guided meditation sessions",
      "Breathing exercises",
      "Sleep stories",
      "Body scan practices",
      "Mindful movement guides"
    ],
    cta: "Begin Practice"
  },
  {
    title: "Therapy and Counseling",
    description: "Connect with licensed professionals for virtual sessions tailored to your needs.",
    icon: MessageCircle,
    features: [
      "Licensed therapist matching",
      "Secure video sessions",
      "Text therapy options",
      "Specialized treatment approaches",
      "Progress tracking with your therapist"
    ],
    cta: "Find a Therapist"
  },
  {
    title: "Crisis Support",
    description: "Immediate resources and hotlines for when you need help right away.",
    icon: AlertTriangle,
    features: [
      "24/7 crisis hotlines",
      "Emergency contact management",
      "Crisis text services",
      "Safety planning tools",
      "Local emergency resources"
    ],
    cta: "Access Support"
  },
  {
    title: "Self-Help Tools",
    description: "Practical exercises, articles, and resources for personal growth and development.",
    icon: BookOpen,
    features: [
      "CBT and DBT worksheets",
      "Journal prompts",
      "Goal setting templates",
      "Audio courses and podcasts",
      "Recommended reading lists"
    ],
    cta: "Explore Tools"
  },
  {
    title: "Community Support",
    description: "Forums and groups where you can share experiences and support others on similar journeys.",
    icon: Users,
    features: [
      "Moderated discussion forums",
      "Peer support groups",
      "Topic-based communities",
      "Live group sessions",
      "Success story sharing"
    ],
    cta: "Join Community"
  }
];

const MentalWellnessTools = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1a1a1f] text-white py-12">
        <div className="container px-4 max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-light mb-4">Mental Wellness Tools</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Evidence-based resources and exercises to support your mental health journey.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolCategories.map((category, index) => (
            <Card key={index} className="overflow-hidden border-border/50 hover:border-[#B87333]/50 transition-all hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="rounded-full bg-[#B87333]/10 w-12 h-12 flex items-center justify-center mb-4">
                  <category.icon className="h-6 w-6 text-[#B87333]" />
                </div>
                <CardTitle className="text-2xl">{category.title}</CardTitle>
                <CardDescription className="text-base">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-[#B87333] mr-2">•</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
                >
                  {category.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-[#F1F0FB] rounded-xl p-8 text-center">
          <h2 className="text-3xl font-light mb-4">Your Personalized Wellness Journey</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Based on your vision board selections, we recommend starting with tools that focus on 
            <span className="text-[#B87333] font-medium"> mindfulness, stress management, and emotional regulation</span>.
          </p>
          <Button 
            className="bg-[#B87333] hover:bg-[#B87333]/90 px-8"
          >
            Get Personalized Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentalWellnessTools;
