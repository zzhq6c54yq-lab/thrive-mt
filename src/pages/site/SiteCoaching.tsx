import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Heart, Briefcase, Users, Sparkles } from "lucide-react";
import { coachingPricing } from "@/data/servicePricing";

const SiteCoaching = () => {
  return (
    <div className="bg-[#0F1319] py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            What Coaching Helps With
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Coaching focuses on goals, motivation, mindset, and everyday improvement. Perfect for when you want support reaching your potential.
          </p>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Coaching Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {coachingPricing.slice(0, 3).map((item, idx) => (
              <Card key={idx} className="bg-[#141921] border-bronze-500/20 p-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-bronze-400 mb-2">{item.duration}</div>
                  <div className="text-4xl font-bold text-foreground mb-4">${item.price}</div>
                  <p className="text-sm text-foreground/60">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center text-foreground/60 mt-6">Self-pay only • No insurance accepted for coaching</p>
        </div>

        {/* Types of Coaches */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Types of Coaches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Life & Mindset", desc: "Goal setting, motivation, personal growth" },
              { icon: TrendingUp, title: "Accountability Coach", desc: "Stay on track with your commitments" },
              { icon: Briefcase, title: "Career & Academic", desc: "Professional development and success" },
              { icon: Heart, title: "Wellness & Lifestyle", desc: "Healthy habits and self-care routines" },
              { icon: Users, title: "Relationship Support", desc: "Communication and connection skills" },
              { icon: Sparkles, title: "Trauma-Informed Peer", desc: "Supportive guidance with lived experience" },
            ].map((coach, idx) => (
              <Card key={idx} className="bg-[#141921] border-bronze-500/20 p-6">
                <coach.icon className="w-10 h-10 text-bronze-400 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{coach.title}</h3>
                <p className="text-foreground/60">{coach.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Coaching vs Therapy */}
        <div className="mb-16 bg-[#141921] rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Coaching vs Therapy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-bronze-400 mb-4">Coaching is for:</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Setting and achieving goals</li>
                <li>• Building motivation and accountability</li>
                <li>• Career and life transitions</li>
                <li>• Personal development</li>
                <li>• Creating healthy habits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-bronze-400 mb-4">Therapy is for:</h3>
              <ul className="space-y-2 text-foreground/80">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold">
                Book a Coach
              </Button>
            </Link>
            <Link to="/site/pricing">
              <Button size="lg" variant="outline" className="border-bronze-500 text-bronze-400 hover:bg-bronze-500/10">
                View All Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCoaching;
