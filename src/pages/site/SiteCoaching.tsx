import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Heart, Briefcase, Users, Sparkles, Brain, MessageCircle, Phone, Video, Shield } from "lucide-react";
import { coachingPricing } from "@/data/servicePricing";
import SiteHeroSection from "@/components/site/SiteHeroSection";
import { SEOHead } from "@/components/seo";

const SiteCoaching = () => {
  return (
    <main className="bg-black">
      <SEOHead 
        title="Mental Wellness Coaching"
        description="Certified mental wellness coaches for stress management, personal development, and emotional well-being. Daily support, practical strategies, and accountability."
        keywords="wellness coaching, mental health coach, stress management, personal development, life coach, emotional wellness, accountability partner, mindset coaching"
        canonicalUrl="https://thrive-mental.com/coaching"
      />
      {/* Hero */}
      <SiteHeroSection
        title="Your Goals Deserve a Partner"
        subtitle="Goal-focused support to help you become who you're meant to be."
        accentColor="teal"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link to="/app">
            <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold">
              Book a Coach
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10">
              View All Pricing
            </Button>
          </Link>
        </div>
      </SiteHeroSection>

      <div className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl space-y-10 md:space-y-16">
          {/* What is a Mental Wellness Coach */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>What is a Mental Wellness Coach?</h2>
            <Card className="bg-black border-[#D4AF37]/20 p-5 md:p-8">
              <Brain className="w-10 h-10 md:w-12 md:h-12 text-bronze-400 mx-auto mb-3 md:mb-4" />
              <p className="text-xl md:text-2xl text-bronze-400 font-semibold text-center mb-3 md:mb-4">A personal trainer for your mind.</p>
              <p className="text-sm md:text-base text-foreground/80 mb-4 md:mb-6 text-center max-w-3xl mx-auto">
                A Mental Wellness Coach is a trained, non-clinical professional who helps you improve your emotional well-being, build healthier habits, strengthen coping skills, and create the life you want.
              </p>
              <div className="bg-[#141921] rounded-lg p-4 md:p-6">
                <p className="text-bronze-400 font-semibold mb-3 md:mb-4 text-center text-sm md:text-base">Your coach focuses on:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {['Daily support', 'Practical strategies', 'Emotional wellness', 'Accountability', 'Growth and mindset', 'Stress management'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="text-bronze-400">✓</span>
                      <span className="text-foreground/80 text-sm md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs md:text-sm text-foreground/60 italic text-center mt-3 md:mt-4">
                They help with the challenges of everyday life, without diagnosing or treating mental disorders.
              </p>
            </Card>
          </div>

          {/* What Your Coach Can Help You Do */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>What Your Coach Can Help You Do</h2>
            <Card className="bg-black border-[#D4AF37]/20 p-5 md:p-8">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-bronze-400 mx-auto mb-3 md:mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                {[
                  'Reduce stress & feel more grounded',
                  'Build healthy routines & habits',
                  'Improve motivation & productivity',
                  'Navigate breakups, transitions, and life stress',
                  'Strengthen communication and relationships',
                  'Manage overwhelm, burnout, and emotional blocks',
                  'Set clear goals & stay accountable',
                  'Create structure and balance in your life',
                  'Grow confidence, clarity, and emotional resilience'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-bronze-400 mt-0.5">✓</span>
                    <span className="text-foreground/80 text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-bronze-400 font-semibold text-center text-sm md:text-base">Everything is personalized to your goals and your pace.</p>
            </Card>
          </div>

          {/* What Coaches Do NOT Do */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>What Coaches Do NOT Do</h2>
            <Card className="bg-black border-[#D4AF37]/20 p-5 md:p-8">
              <Shield className="w-10 h-10 md:w-12 md:h-12 text-bronze-400 mx-auto mb-3 md:mb-4" />
              <p className="text-sm md:text-base text-foreground/80 mb-4 md:mb-6 text-center">To keep you safe and supported:</p>
              <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-4 md:p-6">
                <p className="text-red-200 font-semibold mb-3 md:mb-4 text-sm md:text-base">Your coach does NOT:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {[
                    'Diagnose mental health conditions',
                    'Provide clinical treatment',
                    'Process trauma',
                    'Handle crises or emergencies',
                    'Prescribe or manage medication'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="text-red-400">✗</span>
                      <span className="text-red-100/80 text-sm md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-foreground/60 italic text-center mt-3 md:mt-4 text-xs md:text-sm">
                If deeper support is needed, your coach will help you step up to therapy.
              </p>
            </Card>
          </div>

          {/* How Coaching Works */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>How Coaching Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <Card className="bg-black border-[#D4AF37]/20 p-4 md:p-6">
                <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-bronze-400 mb-2">Unlimited Messaging</h3>
                <p className="text-foreground/80 text-sm md:text-base">Message your coach anytime. Expect thoughtful responses daily within 24 hours.</p>
              </Card>
              <Card className="bg-[#141921] border-bronze-500/20 p-4 md:p-6">
                <Phone className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-bronze-400 mb-2">Audio Coaching Calls</h3>
                <p className="text-foreground/80 text-sm md:text-base">Quick, focused sessions for problem-solving, goal setting, or emotional reset.</p>
              </Card>
              <Card className="bg-[#141921] border-bronze-500/20 p-4 md:p-6">
                <Video className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-bronze-400 mb-2">Live Video Sessions</h3>
                <p className="text-foreground/80 text-sm md:text-base">Face-to-face time for deep guidance, clarity, and structured progress.</p>
              </Card>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Coaching Pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {coachingPricing.slice(0, 3).map((item, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-5 md:p-8">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-bronze-400 mb-2">{item.duration}</div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">${item.price}</div>
                    <p className="text-xs md:text-sm text-foreground/60">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-center text-foreground/60 mt-4 md:mt-6 text-sm md:text-base">Self-pay only • No insurance accepted for coaching</p>
          </div>

          {/* Popular Monthly Bundles */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Popular Monthly Bundles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              {/* Starter Bundle */}
              <Card className="bg-gradient-to-br from-bronze-500/20 to-bronze-600/10 border-2 border-bronze-300/30 p-5 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-bronze-400 mb-3 md:mb-4">⭐ Wellness Starter Bundle</h3>
                <p className="text-4xl md:text-5xl font-bold text-bronze-300 mb-4 md:mb-6">$99<span className="text-lg md:text-xl text-foreground/60">/month</span></p>
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  {[
                    'Unlimited text coaching',
                    '(2) 30-minute video sessions',
                    '(2) 15-minute audio sessions'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-foreground/80 text-sm md:text-base">
                      <span className="text-bronze-400">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs md:text-sm text-bronze-300 italic">A balanced, affordable wellness plan.</p>
              </Card>

              {/* Premium Bundle */}
              <Card className="bg-gradient-to-br from-bronze-500/30 to-bronze-600/20 border-2 border-bronze-300/50 p-5 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-bronze-300 text-black px-2 md:px-3 py-1 text-xs font-bold">
                  POPULAR
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-bronze-400 mb-3 md:mb-4">⭐ Premium Support Bundle</h3>
                <p className="text-4xl md:text-5xl font-bold text-bronze-300 mb-4 md:mb-6">$159<span className="text-lg md:text-xl text-foreground/60">/month</span></p>
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  {[
                    'Unlimited text coaching',
                    '(4) 30-minute video sessions',
                    '(2) 45-minute video sessions'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-foreground/80 text-sm md:text-base">
                      <span className="text-bronze-400">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs md:text-sm text-bronze-300 italic">For users wanting weekly high-touch support.</p>
              </Card>
            </div>
          </div>

          {/* Types of Coaches */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Types of Coaches</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: Target, title: "Life & Mindset", desc: "Goal setting, motivation, personal growth" },
                { icon: TrendingUp, title: "Accountability Coach", desc: "Stay on track with your commitments" },
                { icon: Briefcase, title: "Career & Academic", desc: "Professional development and success" },
                { icon: Heart, title: "Wellness & Lifestyle", desc: "Healthy habits and self-care routines" },
                { icon: Users, title: "Relationship Support", desc: "Communication and connection skills" },
                { icon: Sparkles, title: "Trauma-Informed Peer", desc: "Supportive guidance with lived experience" },
              ].map((coach, idx) => (
                <Card key={idx} className="bg-black border-[#D4AF37]/20 p-4 md:p-6">
                  <coach.icon className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{coach.title}</h3>
                  <p className="text-foreground/60 text-sm md:text-base">{coach.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Coaching vs Therapy */}
          <div className="bg-black border border-[#D4AF37]/20 rounded-lg p-5 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Coaching vs Therapy</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-bronze-400 mb-3 md:mb-4">Coaching is for:</h3>
                <ul className="space-y-2 text-foreground/80 text-sm md:text-base">
                  <li>• Setting and achieving goals</li>
                  <li>• Building motivation and accountability</li>
                  <li>• Career and life transitions</li>
                  <li>• Personal development</li>
                  <li>• Creating healthy habits</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-bronze-400 mb-3 md:mb-4">Therapy is for:</h3>
                <ul className="space-y-2 text-foreground/80 text-sm md:text-base">
                  <li>• Mental health diagnosis and treatment</li>
                  <li>• Trauma processing</li>
                  <li>• Clinical anxiety or depression</li>
                  <li>• Complex emotional issues</li>
                  <li>• Deep therapeutic work</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold text-sm md:text-base">
                Get Started with a Coach
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SiteCoaching;
