
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, CheckCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";

const insuranceProviders = [
  "Blue Cross Blue Shield",
  "Aetna",
  "UnitedHealthcare",
  "Cigna",
  "Humana",
  "Kaiser Permanente",
  "Medicare",
  "Medicaid"
];

const therapistKeywords = [
  "Anxiety", "Depression", "Trauma", "PTSD", "Grief",
  "Relationships", "Family Issues", "Work Stress", 
  "Self-Esteem", "Identity", "LGBTQ+", "Addiction",
  "Eating Disorders", "Life Transitions", "Chronic Illness"
];

const importantFacts = [
  {
    title: "Therapy Takes Time",
    description: "Meaningful progress often takes multiple sessions. Be patient with yourself and the process."
  },
  {
    title: "It's Normal to Feel Uncomfortable",
    description: "Discussing difficult topics can bring up strong emotions. This is a normal part of healing."
  },
  {
    title: "Finding the Right Therapist Matters",
    description: "The therapeutic relationship is important. It's okay to try different therapists until you find the right fit."
  },
  {
    title: "Therapy is Confidential",
    description: "Your privacy is protected by law, with exceptions only in cases of imminent harm or abuse."
  }
];

const RealTimeTherapy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1a1a1f] text-white py-12">
        <div className="container px-4 max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-light mb-4">Real-Time Therapy</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Connect with licensed therapists through secure video sessions that fit your schedule and needs.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-12 max-w-6xl mx-auto">
        {/* Find a Therapist Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light mb-8">Find a Therapist That's Right for You</h2>
          
          <div className="mb-10">
            <h3 className="text-xl mb-4">What issues would you like to address?</h3>
            <div className="flex flex-wrap gap-2">
              {therapistKeywords.map((keyword, index) => (
                <Button 
                  key={index} 
                  variant="outline"
                  className="rounded-full hover:bg-[#B87333]/10 hover:text-[#B87333] hover:border-[#B87333]"
                >
                  {keyword}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
              alt="Woman in online therapy session"
              className="w-full rounded-lg object-cover h-[300px] md:h-full"
            />
            <div>
              <h3 className="text-xl mb-4">How Online Therapy Works</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                  <span>Complete a brief questionnaire about your needs and preferences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                  <span>Browse therapist profiles and select someone you connect with</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                  <span>Schedule your first session at a time that works for you</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                  <span>Connect via our secure video platform from anywhere</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#B87333] mr-2 mt-1 flex-shrink-0" />
                  <span>Continue regular sessions to build a therapeutic relationship</span>
                </li>
              </ul>
              <Button className="mt-6 bg-[#B87333] hover:bg-[#B87333]/90">Find Your Therapist</Button>
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light mb-8">Insurance Information</h2>
          <p className="mb-6 text-lg">
            We work with most major insurance providers to make therapy accessible and affordable. 
            Verify your coverage during the sign-up process.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {insuranceProviders.map((provider, index) => (
              <Card key={index} className="p-4 text-center hover:border-[#B87333]/50 transition-colors">
                {provider}
              </Card>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">
            Don't see your insurance? Contact us to discuss other payment options and sliding scale fees.
          </p>
        </section>

        {/* Before You Start Section */}
        <section>
          <h2 className="text-3xl font-light mb-8">Things to Know Before Starting</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {importantFacts.map((fact, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <Info className="h-6 w-6 text-[#B87333] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl mb-2">{fact.title}</h3>
                    <p className="text-muted-foreground">{fact.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Ready to take the first step on your mental health journey?
            </p>
            <Button className="bg-[#B87333] hover:bg-[#B87333]/90 px-8">
              Schedule Your First Session
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RealTimeTherapy;
