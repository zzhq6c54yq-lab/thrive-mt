import { Card } from "@/components/ui/card";
import { Heart, Eye, Target, Users } from "lucide-react";
import SiteHeroSection from "@/components/site/SiteHeroSection";
import { SEOHead } from "@/components/seo";

const SiteAbout = () => {
  return (
    <main className="bg-black">
      <SEOHead 
        title="About ThriveMT - Our Mission & Vision"
        description="ThriveMT makes mental health support simple, affordable, and accessible. Learn about our mission to provide modern mental wellness tools for everyone."
        keywords="about ThriveMT, mental health mission, wellness company, mental health startup, online therapy company, mental wellness platform"
        canonicalUrl="https://thrive-mental.com/about"
      />
      <SiteHeroSection
        title="Built by People Who Understand"
        subtitle="Because mental health deserves more than an app."
      />

      <div className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">

        {/* Mission */}
        <div className="mb-12 md:mb-16">
          <Card className="bg-black border-[#D4AF37]/20 p-6 md:p-12 text-center">
            <Target className="w-12 h-12 md:w-16 md:h-16 text-bronze-400 mx-auto mb-4 md:mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Our Mission</h2>
            <p className="text-base md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              To make mental health support simple, affordable, modern, and accessible to everyone who needs it.
            </p>
          </Card>
        </div>

        {/* Vision */}
        <div className="mb-12 md:mb-16">
          <Card className="bg-black border-[#D4AF37]/20 p-6 md:p-12 text-center">
            <Eye className="w-12 h-12 md:w-16 md:h-16 text-bronze-400 mx-auto mb-4 md:mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Our Vision</h2>
            <p className="text-base md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              A world where high-quality emotional support is available anytime, anywhere — where getting help is as easy as opening an app.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Our Values</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            <Card className="bg-black border-[#D4AF37]/20 p-5 md:p-8">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Compassion</h3>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">Every interaction is designed with empathy and care</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-5 md:p-8">
              <Target className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Evidence-Based</h3>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">All our methods are backed by clinical research</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-5 md:p-8">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Quality for Everyone</h3>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">Premium care should be accessible, not exclusive</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-5 md:p-8">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Clinician-First</h3>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">Happy therapists provide better care</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-5 md:p-8">
              <Target className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Innovation</h3>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">Using technology to enhance human connection</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-5 md:p-8">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Integrity</h3>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">Always doing what's right for our users</p>
            </Card>
          </div>
        </div>

        {/* Mental Health Starts Here */}
        <div className="bg-black border border-[#D4AF37]/20 rounded-lg p-6 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6" style={{
              background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Mental Health Starts Here</h2>
          <p className="text-base md:text-xl text-foreground/80 max-w-3xl mx-auto text-center mb-8 md:mb-12 leading-relaxed">
            Mental health doesn't start with an app. It starts with how we treat each other. Thrive MT was born because the way mental health is built today doesn't feel human enough. Most platforms lead with features or credentials. We lead with presence, kindness, and real connection before downloads.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <Card className="bg-[#141921] border-bronze-500/20 p-5 md:p-8">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Showing Up Where Others Don't</h3>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                We go where others won't. Unscripted, human spaces. Conversations with strangers. Open campfires. Questions answered by many voices, not one authority. In mental health, listening and lived experience matter just as much as expertise.
              </p>
            </Card>
            
            <Card className="bg-[#141921] border-bronze-500/20 p-5 md:p-8">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Healing Together</h3>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                Healing can be shared. Listening is powerful. Community belongs in mental health. By showing up as real humans, we build trust that cannot be copied. Technology can be replicated, features rebuilt, but trust and connection take time.
              </p>
            </Card>
            
            <Card className="bg-[#141921] border-bronze-500/20 p-5 md:p-8">
              <Target className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Accessible to Everyone</h3>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                Mental health should never be out of reach. Our sliding scale and community service programs make support available to all while encouraging giving back. Healing and helping go hand in hand. Caring for others strengthens care for yourself.
              </p>
            </Card>
            
            <Card className="bg-[#141921] border-bronze-500/20 p-5 md:p-8">
              <Eye className="w-8 h-8 md:w-10 md:h-10 text-bronze-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">A Standard, Not Just an App</h3>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                Thrive MT is not just an app. It is a standard. It is what mental health should feel like. It exists because human connection cannot wait and no one should have to wait to be heard, understood, or supported.
              </p>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
};

export default SiteAbout;
