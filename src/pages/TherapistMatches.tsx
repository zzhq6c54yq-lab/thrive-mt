
import React from "react";
import { ArrowLeft, Calendar, MessageCircle, Star } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HomeButton from "@/components/HomeButton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  approach: string;
  bio: string;
  image: string;
}

const TherapistMatches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { matches } = location.state as { 
    answers: Record<string, string | string[]>,
    matches: Therapist[] 
  } || { matches: [] };

  if (!matches || matches.length === 0) {
    navigate("/therapist-questionnaire");
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1a1a1f] text-white py-12">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/therapist-questionnaire" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questionnaire
            </Link>
            <HomeButton />
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">Your Therapist Matches</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Based on your responses, we've found therapists who may be a good fit for your needs.
          </p>
        </div>
      </div>

      {/* Matches */}
      <div className="container px-4 py-12 max-w-5xl mx-auto">
        <div className="bg-[#B87333]/10 rounded-lg p-6 mb-10">
          <h2 className="text-xl font-medium flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-[#B87333]" /> 
            Your Personalized Matches
          </h2>
          <p>
            These therapists were selected based on your unique preferences and needs. 
            We recommend scheduling initial consultations with at least two therapists to find your best match.
          </p>
        </div>

        <div className="space-y-8">
          {matches.map((therapist) => (
            <Card key={therapist.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={therapist.image} 
                    alt={therapist.name}
                    className="w-full md:w-40 h-40 object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-medium mb-2">{therapist.name}</h3>
                  
                  <div className="mb-3 flex flex-wrap gap-2">
                    {therapist.specialty.split(", ").map((spec, i) => (
                      <Badge key={i} variant="secondary" className="bg-gray-100">{spec}</Badge>
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    <strong>Approach:</strong> {therapist.approach}
                  </p>
                  
                  <p className="mb-6">{therapist.bio}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-[#B87333] hover:bg-[#B87333]/90">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Consultation
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-muted-foreground">Available for: </span>
                  <span>Video sessions, Phone calls, In-person</span>
                </div>
                <Link to="#" className="text-[#B87333] hover:underline">View Full Profile</Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="mb-6">Don't see a therapist that feels right for you?</p>
          <Button 
            variant="outline" 
            onClick={() => navigate("/therapist-questionnaire")}
            className="mr-4"
          >
            Retake Questionnaire
          </Button>
          <Button onClick={() => navigate("/real-time-therapy")}>
            Explore More Options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistMatches;
