import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Brain, Users, TrendingUp, Shield, Clock, Heart } from "lucide-react";
import { bundles } from "@/data/servicePricing";
import SiteHeroSection from "@/components/site/SiteHeroSection";
import BetaSignup from "@/components/site/BetaSignup";
import { SEOHead } from "@/components/seo";

const SiteLanding = () => {
  return (
    <main className="bg-black">
      <SEOHead 
        title="Modern Mental Health for Real Life"
        description="Accessible therapy, premium coaching, and AI-powered wellness tools. Licensed therapists, certified coaches, 24/7 AI companion. Start your wellness journey today."
        keywords="online therapy, mental health app, wellness coaching, anxiety treatment, depression help, AI mental health, licensed therapists, telehealth therapy"
        canonicalUrl="https://thrive-mental.com/home"
      />
      {/* Hero Section */}
      <SiteHeroSection
        title="Modern Mental Health for Real Life"
        subtitle="Accessible therapy, premium coaching, and AI powered wellness tools. Designed to help you feel better and grow stronger."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/demo">
            <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold text-lg px-8">
              Try the Demo
            </Button>
          </Link>
        </div>
      </SiteHeroSection>

      {/* Beta Signup Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-black to-[#050505]">
        <div className="container mx-auto max-w-md">
          <BetaSignup />
        </div>
      </section>

      {/* SEO Content Section - Our Personalized Approach */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            Our Personalized Approach to Mental Wellness
          </h2>
          
          <div className="prose prose-lg prose-invert mx-auto text-foreground/80 space-y-6">
            <p>
              At ThriveMT, we believe that <strong>mental health care should be as unique as you are</strong>. Our comprehensive platform combines the expertise of licensed mental health professionals with innovative AI-powered tools to create a truly personalized wellness experience. Whether you're seeking online therapy for anxiety, stress management coaching, or daily wellness support, our integrated approach ensures you receive the care that fits your life, schedule, and goals.
            </p>

            <h3 className="text-2xl font-semibold text-bronze-400 mt-8">Evidence-Based Therapy Modalities</h3>
            <p>
              Our network of licensed clinical psychologists, therapists, and counselors are trained in the most effective, evidence-based treatment approaches. <strong>Cognitive Behavioral Therapy (CBT)</strong> helps you identify and change negative thought patterns that contribute to anxiety and depression. <strong>Dialectical Behavior Therapy (DBT)</strong> provides powerful skills for emotional regulation, distress tolerance, and interpersonal effectiveness. For those dealing with trauma, our therapists offer <strong>EMDR (Eye Movement Desensitization and Reprocessing)</strong> and trauma-focused cognitive therapy to help process difficult experiences safely.
            </p>
            <p>
              Beyond traditional talk therapy, we integrate <strong>mindfulness-based approaches</strong> including Mindfulness-Based Stress Reduction (MBSR) and Acceptance and Commitment Therapy (ACT). These practices help you develop present-moment awareness, reduce rumination, and build psychological flexibility—skills that serve you long after therapy ends.
            </p>

            <h3 className="text-2xl font-semibold text-bronze-400 mt-8">Meet Your Mental Health Team</h3>
            <p>
              Every member of the ThriveMT clinical team is carefully vetted and credentialed. Our therapists hold advanced degrees (PsyD, PhD, LCSW, LMFT, LPC) from accredited institutions and maintain active licenses in their practicing states. Many specialize in specific areas including <strong>anxiety disorders, depression, relationship issues, life transitions, grief and loss, PTSD, addiction recovery, and occupational stress</strong>. We also offer specialized portals for specific populations: first responders, military veterans, educators, healthcare workers, college students, new parents, and those managing chronic illness.
            </p>
            <p>
              What sets our team apart is their commitment to ongoing education and cultural competency. We understand that effective therapy requires understanding your unique background, values, and life circumstances. Our therapists participate in regular training on diversity, equity, and inclusion to ensure every client feels seen, heard, and respected.
            </p>

            <h3 className="text-2xl font-semibold text-bronze-400 mt-8">AI-Powered Support Between Sessions</h3>
            <p>
              Mental health doesn't follow a schedule—that's why we created <strong>Henry, your 24/7 AI wellness companion</strong>. Henry bridges the gap between therapy sessions, offering evidence-informed support for daily mood check-ins, guided breathing exercises, journaling prompts, and coping skill practice. Using advanced natural language processing, Henry can recognize when you're struggling and provide appropriate resources—including immediate connection to crisis support when needed.
            </p>
            <p>
              Unlike generic chatbots, Henry learns your patterns and preferences over time. He remembers your goals, celebrates your progress, and gently nudges you toward healthy habits. Whether you need a quick grounding exercise during a stressful workday or want to process your thoughts before bed, Henry is always available—no appointment needed.
            </p>

            <h3 className="text-2xl font-semibold text-bronze-400 mt-8">Flexible, Accessible Care</h3>
            <p>
              We've eliminated the barriers that traditionally keep people from getting help. <strong>Telehealth therapy sessions</strong> can be conducted from anywhere with an internet connection—your home, your car during lunch break, or a private room at work. We accept most major insurance plans for therapy services, and for those paying out-of-pocket, we offer transparent pricing, sliding scale options, and our unique <strong>barter system</strong> that allows community service to offset costs.
            </p>
            <p>
              Our <strong>wellness coaching programs</strong> provide an affordable entry point for those who aren't ready for therapy or want goal-focused support. Certified coaches help with stress management, work-life balance, habit formation, and personal development. Many clients find that coaching gives them the tools to prevent problems before they escalate.
            </p>

            <h3 className="text-2xl font-semibold text-bronze-400 mt-8">Your Journey Starts Here</h3>
            <p>
              Taking the first step toward better mental health can feel overwhelming. That's why we've made our onboarding process simple and supportive. Start with a free assessment that helps us understand your needs, then get matched with the right therapist or coach for your situation. Within days—not weeks—you can begin your personalized path to wellness.
            </p>
            <p>
              Join the thousands of people who have already discovered that feeling better is possible. With ThriveMT's combination of professional expertise, innovative technology, and genuine care, you're never alone on your mental wellness journey. <strong>Your story matters. Your healing is possible. Let's thrive together.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose ThriveMT */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            Why People Choose ThriveMT
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Clock, text: "Fast access to therapists & coaches" },
              { icon: Heart, text: "Premium quality care with affordable options" },
              { icon: Shield, text: "Insurance accepted for therapy" },
              { icon: Users, text: "Support circles & accountability partners" },
              { icon: Brain, text: "AI-powered support 24/7" },
              { icon: TrendingUp, text: "Achievement badges & progress tracking" },
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
          <h2 className="text-4xl font-bold mb-6 text-foreground">Ready to Explore?</h2>
          <p className="text-xl text-foreground/80 mb-8">
            Try our interactive demo or sign up for early access to be first in line
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo">
              <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold text-lg px-12">
                Try the Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SiteLanding;
