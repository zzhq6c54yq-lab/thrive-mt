import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Target, Users, DollarSign, Zap, Shield } from "lucide-react";

const SiteInvestors = () => {
  return (
    <div className="bg-[#0F1319] py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            Why ThriveMT Will Win
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Mental health + AI + human support is the fastest growing consumer health category.
          </p>
        </div>

        {/* Market Snapshot */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Market Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-[#141921] border-bronze-500/20 p-6 text-center">
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
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-[#141921] border-bronze-500/20 p-6">
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
        <div className="mb-16 bg-[#141921] rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Business Model</h2>
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

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Interested in Learning More?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold">
              Request Investor Deck
            </Button>
            <Link to="/site/contact">
              <Button size="lg" variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10">
                Book a Founder Meeting
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteInvestors;
