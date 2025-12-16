import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlayCircle, Check, Smartphone, Monitor, Shield } from "lucide-react";
import SiteHeroSection from "@/components/site/SiteHeroSection";
import BetaSignup from "@/components/site/BetaSignup";

const SiteDemo = () => {
  return (
    <div className="bg-black">
      <SiteHeroSection
        title="Experience It Yourself"
        subtitle="No signup. No pressure. Just explore."
      >
        <Link to="/app?demo=true">
          <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold text-lg px-12 mt-6">
            <PlayCircle className="w-6 h-6 mr-2" />
            Launch Interactive Demo
          </Button>
        </Link>
      </SiteHeroSection>

      <div className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">

        {/* Demo Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Demo Features Enabled</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Daily mood check-in",
              "Interactive mood slider",
              'AI assistant "Henry"',
              "Breathing exercises",
              "CBT & DBT tools",
              "Mindfulness practices",
              "Sample mental health quiz (GAD-7 / PHQ-9)",
              "Basic navigation & dashboard",
            ].map((feature, idx) => (
              <Card key={idx} className="bg-black border-[#D4AF37]/20 p-4 flex items-center gap-3">
                <Check className="w-6 h-6 text-bronze-400 flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Beta Signup */}
        <div className="mb-16 max-w-md mx-auto">
          <BetaSignup />
        </div>

        {/* App Preview - Live Screenshots */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">See ThriveMT in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black border-[#D4AF37]/20 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-bronze-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Personalized Dashboard</h3>
              <p className="text-foreground/60 text-sm">
                Your wellness command center with mood tracking, daily insights, and personalized recommendations.
              </p>
            </Card>
            
            <Card className="bg-black border-[#D4AF37]/20 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-bronze-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Mobile-First Design</h3>
              <p className="text-foreground/60 text-sm">
                Access your mental wellness tools anywhere, anytime. Designed for life on the go.
              </p>
            </Card>
            
            <Card className="bg-black border-[#D4AF37]/20 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-bronze-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Private & Secure</h3>
              <p className="text-foreground/60 text-sm">
                HIPAA-compliant security ensures your mental health journey stays completely confidential.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-foreground/60 mb-6">Ready to start your wellness journey?</p>
          <Link to="/app?demo=true">
            <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold">
              Try Demo Now
            </Button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDemo;
