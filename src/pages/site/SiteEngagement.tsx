import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Trophy, 
  Heart, 
  Users, 
  HeartHandshake, 
  MessageCircle,
  Bell,
  Target,
  Shield,
  TrendingUp,
  Calendar,
  Lock
} from "lucide-react";
import SiteHeroSection from "@/components/site/SiteHeroSection";

const SiteEngagement = () => {
  const features = [
    {
      icon: Trophy,
      title: "Achievement Badges",
      description: "Earn badges for milestones, streaks, and completing activities. Celebrate every step of your journey.",
      benefits: ["40+ unique badges", "Point rewards", "Progress tracking", "Unlock special features"]
    },
    {
      icon: Heart,
      title: "Life Transition Guides",
      description: "Structured support for major life events like divorce, job loss, moving, grief, and more.",
      benefits: ["Week-by-week content", "Expert resources", "Progress tracking", "8+ life events covered"]
    },
    {
      icon: Users,
      title: "Support Circle",
      description: "Invite family and caregivers to support your journey with granular privacy controls.",
      benefits: ["Share what you choose", "Emergency notifications", "Care coordination", "Privacy-first design"]
    },
    {
      icon: HeartHandshake,
      title: "Accountability Partners",
      description: "Match with someone who shares your goals for mutual support and motivation.",
      benefits: ["Goal-based matching", "Secure messaging", "Progress sharing", "Mutual encouragement"]
    },
    {
      icon: MessageCircle,
      title: "Community Groups",
      description: "Join groups of people who understand what you're going through.",
      benefits: ["12+ active communities", "Safe spaces", "Peer support", "Moderated discussions"]
    },
    {
      icon: Bell,
      title: "SMS Wellness Check-ins",
      description: "Daily or weekly text message prompts to track your mood and stay connected.",
      benefits: ["Low-friction check-ins", "Automatic tracking", "Customizable frequency", "Always-on support"]
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <SiteHeroSection
        title="Stay Engaged, Stay Motivated"
        subtitle="Powerful features designed to keep you connected, accountable, and progressing toward your mental health goals."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/app">
            <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold text-lg px-8">
              Get Started Free
            </Button>
          </Link>
          <Link to="/demo">
            <Button size="lg" variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10 text-lg px-8">
              Try Demo
            </Button>
          </Link>
        </div>
      </SiteHeroSection>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="bg-black border-bronze-500/20 p-8 hover:border-bronze-500/40 transition-all">
                <feature.icon className="w-12 h-12 text-bronze-400 mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/80 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4 text-bronze-400 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Engagement Matters */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-bronze-900/10">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            Why Engagement Features Matter
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-black border-bronze-500/20 p-6">
              <Shield className="w-10 h-10 text-bronze-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Stay Accountable</h3>
              <p className="text-sm text-muted-foreground">
                Regular check-ins and support from others keep you on track
              </p>
            </Card>
            <Card className="bg-black border-bronze-500/20 p-6">
              <TrendingUp className="w-10 h-10 text-bronze-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                See your growth through badges, milestones, and insights
              </p>
            </Card>
            <Card className="bg-black border-bronze-500/20 p-6">
              <Users className="w-10 h-10 text-bronze-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Feel Supported</h3>
              <p className="text-sm text-muted-foreground">
                Connect with family, friends, and community who understand
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Ready to Stay Engaged?</h2>
          <p className="text-xl text-foreground/80 mb-8">
            Join thousands using these features to stay motivated and connected on their mental health journey.
          </p>
          <Link to="/app">
            <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold text-lg px-12">
              Start Your Journey Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SiteEngagement;
