
import React, { useState } from "react";
import { ArrowLeft, Calendar, MessageCircle, Star, Award, Clock, Check, Shield, Medal, ThumbsUp } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HomeButton from "@/components/HomeButton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("best-matches");
  
  // Get data from location state
  const { answers, personalAnswers, matches, fromMilitary } = location.state as { 
    answers: Record<string, string | string[]>,
    personalAnswers: Record<string, string | string[]>,
    matches: Therapist[],
    fromMilitary: boolean
  } || { 
    answers: {}, 
    personalAnswers: {},
    matches: [],
    fromMilitary: false
  };

  // Redirect if no matches
  if (!matches || matches.length === 0) {
    navigate("/therapist-questionnaire");
    return null;
  }

  const handleSchedule = (therapistId: number, therapistName: string) => {
    toast({
      title: "Consultation Scheduled",
      description: `Your initial consultation with ${therapistName} is being arranged.`,
      duration: 3000
    });
  };

  const handleSendMessage = (therapistId: number, therapistName: string) => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${therapistName}. They will respond within 24-48 hours.`,
      duration: 3000
    });
  };

  // Determine return path
  const returnPath = fromMilitary ? "/department-of-defense" : "/real-time-therapy";
  const returnLabel = fromMilitary ? "Back to Military Portal" : "Back to Real-Time Therapy";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1a1a1f] text-white py-12">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to={returnPath} className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {returnLabel}
            </Link>
            <HomeButton />
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">Your Therapist Matches</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Based on your responses, we've found therapists who may be a good fit for your needs.
          </p>
        </div>
      </div>

      {/* Preference Summary */}
      <div className="container px-4 py-8 max-w-5xl mx-auto">
        <Card className="bg-[#B87333]/10 p-6 mb-8">
          <h2 className="text-xl font-medium flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-[#B87333]" /> 
            What You're Looking For in a Therapist
          </h2>
          <div className="space-y-3">
            {Object.entries(personalAnswers).length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Your personal preferences:</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {personalAnswers['conversation-style'] && (
                    <Badge variant="outline" className="bg-[#B87333]/5 text-[#B87333]">
                      {personalAnswers['conversation-style'] === 'listener' && "Prefers a therapist who listens"}
                      {personalAnswers['conversation-style'] === 'interactive' && "Prefers interactive dialogue"}
                      {personalAnswers['conversation-style'] === 'directive' && "Prefers clear guidance"}
                      {personalAnswers['conversation-style'] === 'challenging' && "Welcomes being challenged"}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            {Array.isArray(answers['therapy-goals']) && answers['therapy-goals'].length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Your therapy goals:</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(answers['therapy-goals'] as string[]).map(goal => (
                    <Badge key={goal} variant="outline" className="bg-[#B87333]/5 text-[#B87333]">
                      {goal === 'anxiety' && "Managing anxiety"}
                      {goal === 'depression' && "Coping with depression"}
                      {goal === 'trauma' && "Processing trauma"}
                      {goal === 'relationships' && "Improving relationships"}
                      {goal === 'self-esteem' && "Building self-esteem"}
                      {goal === 'stress' && "Reducing stress"}
                      {goal === 'grief' && "Processing grief"}
                      {goal === 'life-changes' && "Navigating changes"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {answers['therapy-style'] && (
              <div>
                <p className="text-sm font-medium mb-2">Your preferred therapy style:</p>
                <Badge variant="outline" className="bg-[#B87333]/5 text-[#B87333]">
                  {answers['therapy-style'] === 'cbt' && "Cognitive Behavioral Therapy"}
                  {answers['therapy-style'] === 'psychodynamic' && "Psychodynamic Approach"}
                  {answers['therapy-style'] === 'humanistic' && "Humanistic Approach"}
                  {answers['therapy-style'] === 'mindfulness' && "Mindfulness-based"}
                  {answers['therapy-style'] === 'integrative' && "Integrative Approach"}
                  {answers['therapy-style'] === 'not-sure' && "Open to suggestions"}
                </Badge>
              </div>
            )}
          </div>
        </Card>
        
        <Tabs defaultValue="best-matches" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="best-matches">Best Matches</TabsTrigger>
            <TabsTrigger value="all-therapists">All Available Therapists</TabsTrigger>
          </TabsList>
          <TabsContent value="best-matches" className="pt-6">
            <div className="space-y-6">
              {matches.slice(0, 3).map((therapist) => (
                <TherapistCard 
                  key={therapist.id} 
                  therapist={therapist} 
                  onSchedule={handleSchedule}
                  onMessage={handleSendMessage}
                  isTopMatch={therapist.id === 1}
                  fromMilitary={fromMilitary}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="all-therapists" className="pt-6">
            <div className="space-y-6">
              {matches.map((therapist) => (
                <TherapistCard 
                  key={therapist.id} 
                  therapist={therapist} 
                  onSchedule={handleSchedule}
                  onMessage={handleSendMessage}
                  isTopMatch={false}
                  fromMilitary={fromMilitary}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

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

interface TherapistCardProps {
  therapist: Therapist;
  onSchedule: (id: number, name: string) => void;
  onMessage: (id: number, name: string) => void;
  isTopMatch: boolean;
  fromMilitary: boolean;
}

const TherapistCard: React.FC<TherapistCardProps> = ({ 
  therapist, onSchedule, onMessage, isTopMatch, fromMilitary 
}) => {
  return (
    <Card key={therapist.id} className={`p-6 hover:shadow-md transition-shadow relative ${isTopMatch ? 'border-[#B87333]' : ''}`}>
      {isTopMatch && (
        <div className="absolute -top-3 left-6 bg-[#B87333] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Award className="h-3 w-3" /> Top Match
        </div>
      )}
      {fromMilitary && therapist.id === 4 && (
        <div className="absolute -top-3 right-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Shield className="h-3 w-3" /> Military Experience
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img 
            src={therapist.image} 
            alt={therapist.name}
            className="w-full md:w-40 h-40 object-cover rounded-md"
          />
          <div className="mt-2 flex items-center gap-1 justify-center">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm text-gray-600 ml-1">(48)</span>
          </div>
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
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Check className="h-4 w-4 text-green-500" />
              <span>Available for new clients</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>Responds within 24hrs</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <ThumbsUp className="h-4 w-4 text-blue-500" />
              <span>98% recommendation rate</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-[#B87333] hover:bg-[#B87333]/90"
              onClick={() => onSchedule(therapist.id, therapist.name)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Consultation
            </Button>
            <Button 
              variant="outline"
              onClick={() => onMessage(therapist.id, therapist.name)}
            >
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
        <Link to={`/therapist/${therapist.id}`} className="text-[#B87333] hover:underline">View Full Profile</Link>
      </div>
    </Card>
  );
};

export default TherapistMatches;
