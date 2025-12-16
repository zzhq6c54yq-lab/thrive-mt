import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Heart, 
  Brain, 
  Shield, 
  Sparkles,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import thriveOutlineLogo from "@/assets/thrivemt-outline-logo.png";

const SiteMeetHenry = () => {
  const features = [
    {
      icon: Heart,
      title: "Mood Check-Ins",
      description: "Daily emotional wellness tracking with personalized insights"
    },
    {
      icon: MessageCircle,
      title: "24/7 Support",
      description: "Always available to listen, guide, and provide encouragement"
    },
    {
      icon: Brain,
      title: "Daily Prompts",
      description: "Thoughtful questions to promote self-reflection and growth"
    },
    {
      icon: Sparkles,
      title: "Coping Tools",
      description: "Instant access to breathing exercises, grounding techniques, and more"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Visualize your journey with comprehensive mood and wellness analytics"
    },
    {
      icon: Users,
      title: "Journaling Support",
      description: "Guided prompts and reflection tools for deeper self-discovery"
    },
    {
      icon: Shield,
      title: "Crisis Handoff",
      description: "Immediate connection to human therapists when you need extra support"
    },
    {
      icon: Zap,
      title: "Personalized Insights",
      description: "AI-powered recommendations based on your unique patterns and goals"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top center, rgba(212,175,55,0.15) 0%, transparent 60%)'
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Henry Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img 
              src={thriveOutlineLogo} 
              alt="Henry AI" 
              className="w-32 h-32 mx-auto mb-6"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#B87333] to-[#8B5A2B] bg-clip-text text-transparent"
          >
            Meet Henry
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
          >
            Your AI companion for mental wellness. Available 24/7 to support your journey toward better mental health.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/demo">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#B87333] to-[#8B5A2B] hover:from-[#CD8B4E] hover:to-[#A06628] text-black font-bold text-lg px-12 py-6"
              >
                Chat with Henry (Live Demo)
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#B87333] to-[#8B5A2B] bg-clip-text text-transparent">
            What Henry Can Do
          </h2>
          <p className="text-xl text-white/70 text-center mb-16 max-w-2xl mx-auto">
            Henry combines advanced AI with evidence-based mental health practices to provide personalized support
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#141921] border border-[#B87333]/20 rounded-lg p-6 hover:border-[#B87333]/40 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-[#B87333] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#0F1319]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[#B87333] to-[#8B5A2B] bg-clip-text text-transparent">
            Always Here for You
          </h2>
          
          <div className="space-y-8 text-left">
            <div className="bg-black/50 border border-[#B87333]/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Safe & Confidential</h3>
              <p className="text-white/70">
                Your conversations with Henry are private and secure. Henry uses advanced AI to provide support while maintaining complete confidentiality.
              </p>
            </div>

            <div className="bg-black/50 border border-[#B87333]/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Personalized to You</h3>
              <p className="text-white/70">
                Henry learns from your patterns and preferences to provide increasingly personalized recommendations and support over time.
              </p>
            </div>

            <div className="bg-black/50 border border-[#B87333]/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Human Connection When Needed</h3>
              <p className="text-white/70">
                If Henry detects you need additional support, he'll connect you with our licensed therapists for immediate human care.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link to="/demo">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#B87333] to-[#8B5A2B] hover:from-[#CD8B4E] hover:to-[#A06628] text-black font-bold text-lg px-12 py-6"
              >
                Try Henry Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SiteMeetHenry;
