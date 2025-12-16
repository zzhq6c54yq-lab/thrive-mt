import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DollarSign, Clock, Heart, TrendingUp, Shield, Users } from "lucide-react";
import SiteHeroSection from "@/components/site/SiteHeroSection";
import { CareerApplicationDialog } from "@/components/site/CareerApplicationDialog";
import { SEOHead } from "@/components/seo";

const SiteCareers = () => {
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);

  return (
    <main className="bg-black">
      <SEOHead 
        title="Careers at ThriveMT"
        description="Join ThriveMT and help build the future of mental health care. Competitive salaries, remote work, and meaningful impact. View open positions."
        keywords="mental health jobs, therapist careers, wellness company jobs, remote mental health work, counselor positions, tech startup careers"
        canonicalUrl="https://thrive-mental.com/careers"
      />
      <SiteHeroSection
        title="Join the Movement"
        subtitle="Help us build the future of mental health care."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold"
            onClick={() => setApplicationDialogOpen(true)}
          >
            Apply Now
          </Button>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10">
              Talk to Our Clinical Lead
            </Button>
          </Link>
        </div>
      </SiteHeroSection>

      <div className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">

        {/* Benefits */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Why Therapists Love Working With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: DollarSign, title: "Highest Pay", desc: "Best compensation on telehealth platforms" },
              { icon: TrendingUp, title: "Keep More", desc: "We take less, you keep more per session" },
              { icon: Clock, title: "Flexible Scheduling", desc: "Work when you want, how you want" },
              { icon: Users, title: "No Forced Caseload", desc: "Control your client volume" },
              { icon: Heart, title: "Modern Tools", desc: "AI-assisted workflows make your job easier" },
              { icon: Shield, title: "Trauma-Informed", desc: "Leadership that understands the work" },
            ].map((benefit, idx) => (
              <Card key={idx} className="bg-black border-[#D4AF37]/20 p-4 md:p-6">
                <benefit.icon className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-foreground/60 text-sm md:text-base">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Compensation */}
        <div className="mb-10 md:mb-16 bg-black border border-[#D4AF37]/20 rounded-lg p-5 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Compensation</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-bronze-400 mb-3 md:mb-4">What You'll Earn</h3>
              <ul className="space-y-2 text-foreground/80 text-sm md:text-base">
                <li>• Highest average pay per session</li>
                <li>• Instant payouts after every session</li>
                <li>• Insurance billing handled for you</li>
                <li>• Bonus pay for crisis training</li>
                <li>• Military certification bonuses</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-bronze-400 mb-3 md:mb-4">Support & Benefits</h3>
              <ul className="space-y-2 text-foreground/80 text-sm md:text-base">
                <li>• Clinical supervision available</li>
                <li>• Continuing education credits</li>
                <li>• Malpractice insurance support</li>
                <li>• Mental health resources for you</li>
                <li>• Community of peer clinicians</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Requirements</h2>
          <Card className="bg-black border-[#D4AF37]/20 p-5 md:p-8 max-w-2xl mx-auto">
            <ul className="space-y-2 md:space-y-3 text-foreground/80 text-sm md:text-base">
              <li>• Active clinical license (LCSW, LPC, LMFT, PhD, PsyD)</li>
              <li>• Liability insurance</li>
              <li>• Experience with telehealth preferred</li>
              <li>• Comfortable with technology</li>
              <li>• Commitment to evidence-based care</li>
            </ul>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Ready to Join?</h2>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold text-sm md:text-base"
              onClick={() => setApplicationDialogOpen(true)}
            >
              Apply Now
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10 text-sm md:text-base w-full sm:w-auto">
                Talk to Our Clinical Lead
              </Button>
            </Link>
          </div>
        </div>
        </div>
      </div>

      <CareerApplicationDialog 
        open={applicationDialogOpen} 
        onOpenChange={setApplicationDialogOpen} 
      />
    </main>
  );
};

export default SiteCareers;
