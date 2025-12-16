import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { therapyPricing, coachingPricing, addOns, groupSessions, bundles } from "@/data/servicePricing";
import SiteHeroSection from "@/components/site/SiteHeroSection";
import PricingCalculator from "@/components/site/PricingCalculator";
import InsuranceChecker from "@/components/site/InsuranceChecker";

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

      <div className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Interactive Pricing Calculator */}
          <section className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#E8D4C0] via-[#D4A574] to-[#B87333] bg-clip-text text-transparent">
                Calculate Your Investment
              </h2>
              <p className="text-foreground/70 text-base md:text-lg">Get a personalized pricing estimate in seconds</p>
            </div>
            <PricingCalculator />
          </section>

          {/* Insurance Coverage Checker */}
          <section className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#E8D4C0] via-[#D4A574] to-[#B87333] bg-clip-text text-transparent">
                Check Your Insurance
              </h2>
              <p className="text-foreground/70 text-base md:text-lg">See if we accept your insurance in seconds</p>
            </div>
            <InsuranceChecker />
          </section>

          {/* Therapy Pricing */}
          <section className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-foreground">Therapy Pricing</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-bronze-400 mb-3 md:mb-4">Self-Pay</h3>
                <div className="space-y-3 md:space-y-4">
                  {therapyPricing.selfPay.map((item, idx) => (
                    <Card key={idx} className="bg-black border-[#D4AF37]/20 p-4 md:p-6">
                      <div className="flex justify-between items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-foreground text-sm md:text-base">{item.service}</div>
                          <div className="text-xs md:text-sm text-foreground/60">{item.duration}</div>
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-bronze-400 flex-shrink-0">${item.price}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-bronze-400 mb-3 md:mb-4">Insurance</h3>
                <div className="space-y-3 md:space-y-4">
                  {therapyPricing.insurance.slice(0, 3).map((item, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-4 md:p-6">
                      <div className="flex justify-between items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-foreground text-sm md:text-base">{item.service}</div>
                          <div className="text-xs md:text-sm text-foreground/60">{item.duration}</div>
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-bronze-400 flex-shrink-0">${item.price}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Coaching Pricing */}
          <section className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-foreground">Coaching Pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {coachingPricing.slice(0, 3).map((item, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-4 md:p-6 text-center">
                  <div className="text-lg md:text-xl font-bold text-bronze-400 mb-2">{item.duration}</div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">${item.price}</div>
                  <p className="text-xs md:text-sm text-foreground/60">{item.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Bundles */}
          <section className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-foreground">Popular Bundles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {bundles.hybrid.map((bundle, idx) => (
                <Card key={idx} className={`bg-black border-[#D4AF37]/20 p-4 md:p-6 ${bundle.popular ? 'ring-2 ring-[#D4AF37]' : ''}`}>
                  {bundle.popular && (
                    <div className="bg-bronze-500 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 md:mb-4">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 break-words">{bundle.name}</h3>
                  <p className="text-foreground/60 mb-3 md:mb-4 text-xs md:text-sm">{bundle.description}</p>
                  <div className="text-xl md:text-2xl font-bold text-bronze-400 mb-4 md:mb-6">
                    ${bundle.price}{(bundle as any).period || ''}
                  </div>
                <Link to="/app">
                  <Button className="w-full bg-bronze-500 hover:bg-bronze-600 text-black font-semibold whitespace-nowrap px-4 text-sm md:text-base">
                    Get Started
                  </Button>
                </Link>
                </Card>
              ))}
            </div>
          </section>

          {/* Add-Ons */}
          <section className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-foreground">Add-Ons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {addOns.map((addon, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-4 md:p-6">
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <h3 className="font-bold text-foreground text-sm md:text-base">{addon.service}</h3>
                    <div className="text-lg md:text-xl font-bold text-bronze-400 flex-shrink-0">${addon.price}{addon.period}</div>
                  </div>
                  <p className="text-xs md:text-sm text-foreground/60">{addon.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Group Sessions */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-foreground">Group Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {groupSessions.map((session, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-4 md:p-6">
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-foreground text-sm md:text-base">{session.service}</h3>
                      <div className="text-xs md:text-sm text-foreground/60">{session.duration}</div>
                    </div>
                    <div className="text-lg md:text-xl font-bold text-bronze-400 flex-shrink-0">${session.price}</div>
                  </div>
                  <p className="text-xs md:text-sm text-foreground/60">{session.description}</p>
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
