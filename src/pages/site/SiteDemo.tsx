import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlayCircle, Check } from "lucide-react";
import SiteHeroSection from "@/components/site/SiteHeroSection";
import WaitlistSignup from "@/components/site/WaitlistSignup";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

        {/* Waitlist Signup */}
        <div className="mb-16 max-w-md mx-auto">
          <WaitlistSignup />
        </div>

        {/* App Preview Placeholder */}
        <div className="mb-16">
          <Card className="bg-black border-[#D4AF37]/20 p-8">
            <div className="aspect-video bg-gradient-to-br from-bronze-500/10 to-bronze-600/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PlayCircle className="w-20 h-20 text-bronze-400 mx-auto mb-4" />
                <p className="text-foreground/60">App preview coming soon</p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app?demo=true">
              <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold">
                Try Demo Now
              </Button>
            </Link>
            <Link to="/app/auth">
              <Button size="lg" variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDemo;
