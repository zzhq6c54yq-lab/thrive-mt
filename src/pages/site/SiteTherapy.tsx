import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { therapyPricing } from "@/data/servicePricing";
import SiteHeroSection from "@/components/site/SiteHeroSection";

const SiteTherapy = () => {
  return (
    <div className="bg-black">
      {/* Hero */}
      <SiteHeroSection
        title="Healing Starts with Being Heard"
        subtitle="Licensed therapists who actually listen — because you deserve to be understood."
        accentColor="lavender"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link to="/app">
            <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold">
              Book Therapy
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10">
              View All Pricing
            </Button>
          </Link>
        </div>
      </SiteHeroSection>

      <div className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Session Lengths */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Session Lengths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black border-[#D4AF37]/20 p-6">
                <h3 className="text-xl font-bold text-bronze-400 mb-2">30 Minutes</h3>
                <p className="text-foreground/80">Short check-in sessions for quick support</p>
              </Card>
              <Card className="bg-[#141921] border-bronze-500/20 p-6">
                <h3 className="text-xl font-bold text-bronze-400 mb-2">45 Minutes</h3>
                <p className="text-foreground/80">Standard therapy session (most popular)</p>
              </Card>
              <Card className="bg-[#141921] border-bronze-500/20 p-6">
                <h3 className="text-xl font-bold text-bronze-400 mb-2">60 Minutes</h3>
                <p className="text-foreground/80">Deep work sessions for intensive support</p>
              </Card>
            </div>
          </div>

          {/* Self-Pay Pricing */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Self-Pay Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {therapyPricing.selfPay.slice(0, 3).map((item, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-bronze-400 mb-2">{item.duration}</div>
                    <div className="text-4xl font-bold text-foreground mb-4">${item.price}</div>
                    <p className="text-sm text-foreground/60">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div className="mb-16 bg-black border border-[#D4AF37]/20 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-4" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Insurance Accepted</h2>
            <p className="text-center text-foreground/80 mb-6 max-w-2xl mx-auto">
              We accept most major insurance plans. Your therapist is paid the same high rate, ensuring quality care.
            </p>
            <div className="text-center">
              <div className="text-2xl font-bold text-bronze-400 mb-2">Insurance Rate: $110-$220 per session</div>
              <p className="text-foreground/60">You pay only your copay or deductible</p>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Our Specialties</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {["Anxiety", "Depression", "Trauma", "Military/Veteran Care", "Family & Relationships", "BPD & DBT", "Holistic Therapy", "Mindfulness"].map((specialty, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-4 text-center min-h-[80px] flex flex-col items-center justify-center">
                  <Check className="w-6 h-6 text-bronze-400 mb-2" />
                  <p className="text-foreground text-sm break-words px-1">{specialty}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteTherapy;
