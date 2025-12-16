import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DollarSign, Clock, Heart, TrendingUp, Shield, Users } from "lucide-react";
import SiteHeroSection from "@/components/site/SiteHeroSection";
import { CareerApplicationDialog } from "@/components/site/CareerApplicationDialog";

const SiteCareers = () => {
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);

  return (
    <div className="bg-black">
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

      <div className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Why Therapists Love Working With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: DollarSign, title: "Highest Pay", desc: "Best compensation on telehealth platforms" },
              { icon: TrendingUp, title: "Keep More", desc: "We take less, you keep more per session" },
              { icon: Clock, title: "Flexible Scheduling", desc: "Work when you want, how you want" },
              { icon: Users, title: "No Forced Caseload", desc: "Control your client volume" },
              { icon: Heart, title: "Modern Tools", desc: "AI-assisted workflows make your job easier" },
              { icon: Shield, title: "Trauma-Informed", desc: "Leadership that understands the work" },
            ].map((benefit, idx) => (
              <Card key={idx} className="bg-black border-[#D4AF37]/20 p-6">
                <benefit.icon className="w-10 h-10 text-bronze-400 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-foreground/60">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Compensation */}
        <div className="mb-16 bg-black border border-[#D4AF37]/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Compensation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-bronze-400 mb-4">What You'll Earn</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Highest average pay per session</li>
                <li>• Instant payouts after every session</li>
                <li>• Insurance billing handled for you</li>
                <li>• Bonus pay for crisis training</li>
                <li>• Military certification bonuses</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-bronze-400 mb-4">Support & Benefits</h3>
              <ul className="space-y-2 text-foreground/80">
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
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Requirements</h2>
          <Card className="bg-black border-[#D4AF37]/20 p-8 max-w-2xl mx-auto">
            <ul className="space-y-3 text-foreground/80">
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
          <h2 className="text-3xl font-bold mb-6" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Ready to Join?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
        </div>
      </div>

      <CareerApplicationDialog 
        open={applicationDialogOpen} 
        onOpenChange={setApplicationDialogOpen} 
      />
    </div>
  );
};

export default SiteCareers;
