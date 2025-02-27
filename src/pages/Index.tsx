
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Intuitive Design",
    description: "Crafted with attention to detail and user experience in mind.",
  },
  {
    title: "Responsive",
    description: "Perfectly adapted to any screen size or device.",
  },
  {
    title: "Modern Stack",
    description: "Built with the latest technologies for optimal performance.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary inline-block mb-4">
            Welcome
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-clip-text">
            Create Something Amazing
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            A beautiful starting point for your next project, designed with precision and built for performance.
          </p>
          <Button className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 backdrop-blur-sm bg-background/50 border border-border/50 hover:border-primary/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="container px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin?</h2>
          <p className="text-muted-foreground mb-8">
            Start building your vision with our carefully crafted components and design system.
          </p>
          <Button variant="outline" className="group">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
