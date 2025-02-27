
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Brain, Calendar, Shield } from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    title: "Real-Time Therapy",
    description: "Connect with licensed therapists instantly through secure video sessions.",
    icon: MessageCircle,
  },
  {
    title: "Mental Wellness Tools", 
    description: "Access evidence-based resources and exercises for your mental health journey.",
    icon: Brain,
  },
  {
    title: "Flexible Scheduling",
    description: "Book therapy sessions that fit your schedule, with 24/7 availability.",
    icon: Calendar,
  },
  {
    title: "Private & Secure",
    description: "Your mental health journey, protected with end-to-end encryption.",
    icon: Shield,
  },
];

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f]">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
              alt="Copper Outline Logo" 
              className="w-40 md:w-48 mx-auto intro-logo-icon"
              style={{ 
                filter: 'drop-shadow(0 0 8px rgba(245, 194, 66, 0.6))',
                backgroundColor: 'transparent',
                mixBlendMode: 'normal'
              }}
            />
          </div>
          <h1 className="intro-logo-text text-6xl md:text-8xl mb-8">
            <span className="text-white">Thrive</span>
            <span className="text-[#B87333] gold-element"> MT</span>
          </h1>
          <p className="intro-tagline text-xl md:text-2xl text-gray-300">
            because life should be more than just surviving
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white app-content">
      {/* Hero Section */}
      <section className="container px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <span className="px-3 py-1 text-sm font-medium tracking-wider rounded-full bg-primary/10 text-primary inline-block mb-4 uppercase">
            Welcome to Thrive MT
          </span>
          <h1 className="text-4xl sm:text-5xl tracking-tight mb-6 bg-clip-text">
            Your Mental Health Journey Starts Here
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Access professional therapy and mental wellness tools from anywhere in Montana. 
            Get the support you need, when you need it.
          </p>
          <Button className="group">
            Start Your Journey
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 backdrop-blur-sm bg-background/50 border border-border/50 hover:border-primary/50 transition-colors duration-300"
              >
                <feature.icon className="h-8 w-8 mb-4 text-primary/80" />
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-6">Ready to Take the First Step?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of Montanans who have found their path to better mental health. 
            Our licensed therapists are here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" className="group">
              Connect with a Therapist
              <MessageCircle className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="group">
              Explore Resources
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
