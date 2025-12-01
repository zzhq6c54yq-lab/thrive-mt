import { Card } from "@/components/ui/card";
import { Heart, Eye, Target, Users } from "lucide-react";

const SiteAbout = () => {
  return (
    <div className="bg-[#0F1319] py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            About ThriveMT
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            We're on a mission to make mental health support simple, affordable, modern, and accessible to everyone.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <Card className="bg-[#141921] border-bronze-500/20 p-12 text-center">
            <Target className="w-16 h-16 text-bronze-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              To make mental health support simple, affordable, modern, and accessible to everyone who needs it.
            </p>
          </Card>
        </div>

        {/* Vision */}
        <div className="mb-16">
          <Card className="bg-[#141921] border-bronze-500/20 p-12 text-center">
            <Eye className="w-16 h-16 text-bronze-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              A world where high-quality emotional support is available anytime, anywhere — where getting help is as easy as opening an app.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Heart className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Compassion</h3>
              <p className="text-foreground/60">Every interaction is designed with empathy and care</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Target className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Evidence-Based</h3>
              <p className="text-foreground/60">All our methods are backed by clinical research</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Users className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Quality for Everyone</h3>
              <p className="text-foreground/60">Premium care should be accessible, not exclusive</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Heart className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Clinician-First</h3>
              <p className="text-foreground/60">Happy therapists provide better care</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Target className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Innovation</h3>
              <p className="text-foreground/60">Using technology to enhance human connection</p>
            </Card>
            <Card className="bg-[#141921] border-bronze-500/20 p-8">
              <Users className="w-10 h-10 text-bronze-400 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Integrity</h3>
              <p className="text-foreground/60">Always doing what's right for our users</p>
            </Card>
          </div>
        </div>

        {/* Story */}
        <div className="bg-[#141921] rounded-lg p-12">
          <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Our Story</h2>
          <div className="max-w-3xl mx-auto text-foreground/80 space-y-4">
            <p>
              ThriveMT was born from a simple observation: mental health care is too expensive, too hard to access, and often doesn't work with modern life.
            </p>
            <p>
              We knew there had to be a better way. A way that combined the best of human expertise with the power of technology. A way that treated both clients and clinicians with the respect they deserve.
            </p>
            <p>
              Today, we're building exactly that — a platform where quality mental health care is accessible, affordable, and actually works for real people living real lives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteAbout;
