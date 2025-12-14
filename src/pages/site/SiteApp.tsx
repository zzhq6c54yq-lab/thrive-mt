import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SiteHeroSection from "@/components/site/SiteHeroSection";
import { getFeatures } from "@/components/dashboard/key-features/featuresData";
import { addOns } from "@/components/home/subscription-addons/data";
import { Link } from "react-router-dom";
import { Package, Trophy, Gem, Check, Video, MessageCircle, Sparkles } from "lucide-react";

const SiteApp = () => {
  const features = getFeatures(false); // Get English features
  
  // 3-Tier Pricing Model
  const pricingTiers = [
    {
      name: "Basic",
      price: "Free",
      icon: Package,
      color: "from-gray-600 to-gray-700",
      features: [
        "Access to essential mental wellness tools",
        "Join virtual meetings and classes",
        "Digital sponsor access",
        "Limited workshop access",
        "Add-ons at $3/month each"
      ]
    },
    {
      name: "Gold",
      price: "$5/month",
      icon: Trophy,
      color: "from-[#B87333] to-[#D4A574]",
      features: [
        "5% bonus on all co-pay credits",
        "Access to all mental wellness tools",
        "Extended workshop library",
        "Priority access to virtual meetings",
        "Personalized wellness plan",
        "Add-ons at $2/month each"
      ]
    },
    {
      name: "Platinum",
      price: "$10/month",
      icon: Gem,
      color: "from-[#7E69AB] to-[#9B7DB8]",
      features: [
        "10% bonus on all co-pay credits",
        "Unlimited access to all platform features",
        "Premium workshop content",
        "Early access to new features",
        "Advanced analytics and insights",
        "Personalized wellness roadmap",
        "Add-ons at $1/month each"
      ],
      recommended: true
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      <SiteHeroSection
        title="Discover ThriveMT"
        subtitle="The most comprehensive mental health platform designed to meet you where you are"
      >
        <Link to="/demo">
          <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold text-lg px-12 mt-6">
            Try Live Demo
          </Button>
        </Link>
      </SiteHeroSection>

      <div className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          
          {/* What the App Does */}
          <div className="mb-20 text-center">
            <h2 
              className="text-4xl font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              What ThriveMT Does
            </h2>
            <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              ThriveMT is an all-in-one mental wellness platform that combines professional therapy, 
              life coaching, AI-powered support, and comprehensive self-care tools. Whether you're 
              managing stress, working through trauma, or simply investing in your mental health, 
              ThriveMT provides personalized resources, expert guidance, and a supportive community 
              to help you thrive.
            </p>
          </div>

          {/* Key Features Toolkit (24 Features) */}
          <div className="mb-20">
            <h2 
              className="text-4xl font-bold mb-4 text-center"
              style={{
                background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Comprehensive Toolkit
            </h2>
            <p className="text-center text-foreground/70 mb-12 text-lg">24 powerful features to support your mental wellness journey</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card 
                  key={feature.id} 
                  className="bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:border-bronze-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-bronze-500/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-bronze-500/10 text-bronze-400">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                      <p className="text-sm text-foreground/70">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Specialized Add-on Programs */}
          <div className="mb-20">
            <h2 
              className="text-4xl font-bold mb-4 text-center"
              style={{
                background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Specialized Programs
            </h2>
            <p className="text-center text-foreground/70 mb-12 text-lg">Targeted support for specific communities and life experiences</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addOns.map((addon) => {
                const IconComponent = addon.icon;
                return (
                  <Card 
                    key={addon.id} 
                    className="bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:border-bronze-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-bronze-500/20"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-bronze-500/10 text-bronze-400">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1 text-foreground">{addon.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70 mb-3">{addon.description}</p>
                    <p className="text-xs text-foreground/50 italic">For: {addon.targetAudience}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* What Else We Offer */}
          <div className="mb-20">
            <h2 
              className="text-4xl font-bold mb-12 text-center"
              style={{
                background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              What Else We Offer
            </h2>
            
            <div className="flex flex-col gap-4">
              <Card className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-purple-500/20 p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="p-3 rounded-full bg-purple-500/20 flex-shrink-0">
                  <Video className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-2">Professional Therapy</h3>
                  <p className="text-sm text-foreground/70">Connect with licensed therapists for one-on-one video sessions. Self-pay and insurance options available.</p>
                </div>
                <Link to="/therapy">
                  <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 whitespace-nowrap">
                    Learn More
                  </Button>
                </Link>
              </Card>

              <Card className="bg-gradient-to-r from-teal-500/10 to-teal-500/5 border-teal-500/20 p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="p-3 rounded-full bg-teal-500/20 flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-teal-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-2">Mental Wellness Coaching</h3>
                  <p className="text-sm text-foreground/70">Work with certified coaches on personal development, stress management, and life transitions.</p>
                </div>
                <Link to="/coaching">
                  <Button variant="outline" className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10 whitespace-nowrap">
                    Learn More
                  </Button>
                </Link>
              </Card>

              <Card className="bg-gradient-to-r from-bronze-500/10 to-bronze-500/5 border-bronze-500/20 p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="p-3 rounded-full bg-bronze-500/20 flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-bronze-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-2">AI Companion "Henry"</h3>
                  <p className="text-sm text-foreground/70">24/7 support from Henry, your trauma-informed AI companion for daily check-ins, coping tools, and encouragement.</p>
                </div>
                <Link to="/henry">
                  <Button variant="outline" className="border-bronze-500/50 text-bronze-400 hover:bg-bronze-500/10 whitespace-nowrap">
                    Meet Henry
                  </Button>
                </Link>
              </Card>
            </div>
          </div>

          {/* 3-Tier Pricing Model */}
          <div className="mb-20">
            <h2 
              className="text-4xl font-bold mb-4 text-center"
              style={{
                background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Choose Your Plan
            </h2>
            <p className="text-center text-foreground/70 mb-12 text-lg">Flexible pricing that grows with your needs</p>
            
            <div className="flex flex-col gap-4 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => {
                const IconComponent = tier.icon;
                return (
                  <Card 
                    key={tier.name}
                    className={`bg-card/50 backdrop-blur-sm border-border/50 p-6 flex flex-col md:flex-row items-center gap-6 relative ${tier.recommended ? 'ring-2 ring-bronze-500' : ''}`}
                  >
                    {tier.recommended && (
                      <div className="absolute -top-3 left-6">
                        <span className="bg-gradient-to-r from-bronze-500 to-bronze-600 text-black text-xs font-bold px-3 py-1 rounded-full">
                          RECOMMENDED
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 min-w-[200px]">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${tier.color} flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                        <p className="text-2xl font-bold text-bronze-400">{tier.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-wrap gap-2">
                      {tier.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-bronze-500/10 text-foreground/80 px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <Link to="/demo">
                      <Button className={`bg-gradient-to-r ${tier.color} text-white hover:opacity-90 whitespace-nowrap`}>
                        Get Started
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6 text-foreground">Ready to start your journey?</h3>
            <Link to="/demo">
              <Button size="lg" className="bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold">
                Try Live Demo
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SiteApp;
