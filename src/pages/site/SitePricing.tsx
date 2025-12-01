import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { therapyPricing, coachingPricing, addOns, groupSessions, bundles } from "@/data/servicePricing";
import SiteHeroSection from "@/components/site/SiteHeroSection";

const SitePricing = () => {
  return (
    <div className="bg-black">
      <SiteHeroSection
        title="Invest in Your Wellbeing"
        subtitle="Premium care, transparent pricing, real results."
      >
        <Link to="/app">
          <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold mt-6">
            Get Started Today
          </Button>
        </Link>
      </SiteHeroSection>

      <div className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Therapy Pricing */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Therapy Pricing</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-bronze-400 mb-4">Self-Pay</h3>
                <div className="space-y-4">
                  {therapyPricing.selfPay.map((item, idx) => (
                    <Card key={idx} className="bg-black border-[#D4AF37]/20 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-foreground">{item.service}</div>
                          <div className="text-sm text-foreground/60">{item.duration}</div>
                        </div>
                        <div className="text-2xl font-bold text-bronze-400">${item.price}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-bronze-400 mb-4">Insurance</h3>
                <div className="space-y-4">
                  {therapyPricing.insurance.slice(0, 3).map((item, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-foreground">{item.service}</div>
                          <div className="text-sm text-foreground/60">{item.duration}</div>
                        </div>
                        <div className="text-2xl font-bold text-bronze-400">${item.price}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Coaching Pricing */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Coaching Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coachingPricing.slice(0, 3).map((item, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-6 text-center">
                  <div className="text-xl font-bold text-bronze-400 mb-2">{item.duration}</div>
                  <div className="text-3xl font-bold text-foreground mb-2">${item.price}</div>
                  <p className="text-sm text-foreground/60">{item.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Bundles */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Popular Bundles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bundles.hybrid.map((bundle, idx) => (
                <Card key={idx} className={`bg-black border-[#D4AF37]/20 p-6 ${bundle.popular ? 'ring-2 ring-[#D4AF37]' : ''}`}>
                  {bundle.popular && (
                    <div className="bg-bronze-500 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-2 break-words">{bundle.name}</h3>
                  <p className="text-foreground/60 mb-4 text-sm">{bundle.description}</p>
                  <div className="text-2xl font-bold text-bronze-400 mb-6">
                    ${bundle.price}{(bundle as any).period || ''}
                  </div>
                <Link to="/app">
                  <Button className="w-full bg-bronze-500 hover:bg-bronze-600 text-black font-semibold whitespace-nowrap px-4">
                    Get Started
                  </Button>
                </Link>
                </Card>
              ))}
            </div>
          </section>

          {/* Add-Ons */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Add-Ons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addOns.map((addon, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-foreground">{addon.service}</h3>
                    <div className="text-xl font-bold text-bronze-400">${addon.price}{addon.period}</div>
                  </div>
                  <p className="text-sm text-foreground/60">{addon.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Group Sessions */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-foreground">Group Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groupSessions.map((session, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-foreground">{session.service}</h3>
                      <div className="text-sm text-foreground/60">{session.duration}</div>
                    </div>
                    <div className="text-xl font-bold text-bronze-400">${session.price}</div>
                  </div>
                  <p className="text-sm text-foreground/60">{session.description}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SitePricing;
