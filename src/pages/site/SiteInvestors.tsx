import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Target, Users, DollarSign, Zap, Shield } from "lucide-react";
import SiteHeroSection from "@/components/site/SiteHeroSection";

const SiteInvestors = () => {
  return (
    <div className="bg-black">
      <SiteHeroSection
        title="Shape the Future of Wellness"
        subtitle="$68B market. 30% YoY growth. We're just getting started."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold">
            Request Investor Deck
          </Button>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10">
              Book a Founder Meeting
            </Button>
          </Link>
        </div>
      </SiteHeroSection>

      <div className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Market Snapshot */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Market Snapshot</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black border-[#D4AF37]/20 p-6 text-center">
                <TrendingUp className="w-10 h-10 text-bronze-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">$68B</div>
                <p className="text-foreground/60">Global mental health tech market</p>
              </Card>
              <Card className="bg-[#141921] border-bronze-500/20 p-6 text-center">
                <Target className="w-10 h-10 text-bronze-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">30%</div>
                <p className="text-foreground/60">Year-over-year growth</p>
              </Card>
              <Card className="bg-[#141921] border-bronze-500/20 p-6 text-center">
                <Users className="w-10 h-10 text-bronze-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">Rising</div>
                <p className="text-foreground/60">Demand for accessible care</p>
              </Card>
              <Card className="bg-[#141921] border-bronze-500/20 p-6 text-center">
                <Zap className="w-10 h-10 text-bronze-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">Standard</div>
                <p className="text-foreground/60">Telehealth is now mainstream</p>
              </Card>
            </div>
          </div>

          {/* Competitive Advantage */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Our Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-black border-[#D4AF37]/20 p-6">
                <h3 className="text-xl font-bold text-bronze-400 mb-4">Lower Cost, Higher Quality</h3>
                <p className="text-foreground/80">
                  Lower session costs for clients while paying therapists more than competitors. Our 40% margin model ensures profitability while prioritizing quality care.
                </p>
              </Card>
              <Card className="bg-[#141921] border-bronze-500/20 p-6">
                <h3 className="text-xl font-bold text-bronze-400 mb-4">Real-Time AI Companion</h3>
                <p className="text-foreground/80">
                  AI-powered support between sessions reduces churn and increases engagement. Users stay connected to their care 24/7.
                </p>
              </Card>
              <Card className="bg-[#141921] border-bronze-500/20 p-6">
                <h3 className="text-xl font-bold text-bronze-400 mb-4">Underserved Markets</h3>
                <p className="text-foreground/80">
                  Purpose-built programs for military, students, first responders, and other underserved populations. We go where competitors don't.
                </p>
              </Card>
              <Card className="bg-[#141921] border-bronze-500/20 p-6">
                <h3 className="text-xl font-bold text-bronze-400 mb-4">Hybrid Model</h3>
                <p className="text-foreground/80">
                  Therapy + coaching + AI creates a complete care ecosystem. Multiple revenue streams from single users increase lifetime value.
                </p>
              </Card>
            </div>
          </div>

          {/* Business Model */}
          <div className="mb-16 bg-black border border-[#D4AF37]/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Business Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <DollarSign className="w-12 h-12 text-bronze-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Strong Margins</h3>
                <p className="text-foreground/60">40% margin on all services</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-bronze-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Subscription Bundles</h3>
                <p className="text-foreground/60">Predictable recurring revenue</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-bronze-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Insurance + Self-Pay</h3>
                <p className="text-foreground/60">Multiple revenue channels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteInvestors;
