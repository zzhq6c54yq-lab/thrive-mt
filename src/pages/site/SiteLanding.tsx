import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Brain, Users, TrendingUp, Shield, Clock, Heart } from "lucide-react";
import { bundles } from "@/data/servicePricing";
import SiteHeroSection from "@/components/site/SiteHeroSection";

const SiteLanding = () => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <SiteHeroSection
        title="Modern Mental Health for Real Life"
        subtitle="Accessible therapy, premium coaching, and AI-powered wellness tools — designed to help you feel better and grow stronger."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/app">
            <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold text-lg px-8">
              Get Started
            </Button>
          </Link>
          <Link to="/demo">
            <Button size="lg" variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10 text-lg px-8">
              Try Live Demo
            </Button>
          </Link>
        </div>
      </SiteHeroSection>

      {/* Why Choose ThriveMT */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            Why People Choose ThriveMT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Clock, text: "Fast access to therapists & coaches" },
              { icon: Heart, text: "Premium quality care with affordable options" },
              { icon: Shield, text: "Insurance accepted for therapy" },
              { icon: Users, text: "30, 45, and 60-minute session options" },
              { icon: Brain, text: "AI-powered support 24/7" },
              { icon: TrendingUp, text: "Progress tracking & habit tools" },
            ].map((item, idx) => (
              <Card key={idx} className="bg-black border-[#D4AF37]/20 p-6">
                <item.icon className="w-8 h-8 text-bronze-400 mb-4" />
                <p className="text-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            Our Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/therapy">
              <Card className="bg-black border-[#D4AF37]/20 p-8 hover:border-[#D4AF37]/40 transition-all cursor-pointer">
                <h3 className="text-2xl font-bold text-bronze-400 mb-4">Therapy</h3>
                <p className="text-foreground/80">Licensed clinicians, insurance & self-pay options</p>
              </Card>
            </Link>
            <Link to="/coaching">
              <Card className="bg-[#141921] border-bronze-500/20 p-8 hover:border-bronze-500/40 transition-all cursor-pointer">
                <h3 className="text-2xl font-bold text-bronze-400 mb-4">Wellness Coaching</h3>
                <p className="text-foreground/80">Goal-focused support for growth and motivation</p>
              </Card>
            </Link>
            <Link to="/demo">
              <Card className="bg-[#141921] border-bronze-500/20 p-8 hover:border-bronze-500/40 transition-all cursor-pointer">
                <h3 className="text-2xl font-bold text-bronze-400 mb-4">AI Companion</h3>
                <p className="text-foreground/80">24/7 AI-powered support and wellness tools</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Bundles */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            Featured Bundles
          </h2>
          <p className="text-center text-foreground/60 mb-12">Save money with our combined service packages</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundles.hybrid.slice(0, 3).map((bundle, idx) => (
              <Card key={idx} className={`bg-black border-[#D4AF37]/20 p-8 ${bundle.popular ? 'ring-2 ring-[#D4AF37]' : ''}`}>
                {bundle.popular && (
                  <div className="bg-bronze-500 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2">{bundle.name}</h3>
                <p className="text-foreground/60 mb-4">{bundle.description}</p>
                <div className="text-3xl font-bold text-bronze-400 mb-4">
                  ${bundle.price}{(bundle as any).period || ''}
                </div>
                <Link to="/pricing">
                  <Button className="w-full bg-bronze-500 hover:bg-bronze-600 text-black font-semibold">
                    Learn More
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
          <p className="text-xl text-foreground/80 mb-8">
            Join thousands who are already thriving with modern mental health support
          </p>
          <Link to="/app">
            <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold text-lg px-12">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SiteLanding;
