
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageSquare, Hospital, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CrisisSupport = () => {
  const navigate = useNavigate();

  const handleCall988 = () => {
    window.location.href = 'tel:988';
  };

  const handleTextCrisisLine = () => {
    window.location.href = 'sms:741741?body=HOME';
  };

  const handleFindER = () => {
    window.open('https://www.google.com/maps/search/emergency+room+near+me', '_blank');
  };

  const handleFindCrisisCenters = () => {
    window.open('https://www.google.com/maps/search/mental+health+crisis+center+near+me', '_blank');
  };

  const handleFindMobileCrisis = () => {
    window.open('https://www.google.com/search?q=mobile+crisis+unit+near+me', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => navigate('/app/dashboard')}
              className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </button>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Crisis Support</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Immediate resources and support for mental health emergencies.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        {/* Henry Crisis Support Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 border-[#D4AF37]/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] rounded-full blur-md opacity-40" />
                  <Avatar className="w-16 h-16 border-2 border-[#D4AF37]/50 relative shadow-lg">
                    <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
                    <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black font-bold text-xl">
                      H
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">I'm here with you 💛</h3>
                  <p className="text-foreground/90 mb-4 leading-relaxed">
                    You're not alone in this moment. If you're in crisis, please reach out to the resources below immediately. 
                    I'm also here to talk and support you however I can. Your life matters, and there are people who want to help.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={() => navigate('/app/dashboard')}
                      className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Talk to Henry Now
                    </Button>
                    <Button 
                      onClick={() => navigate('/app/real-time-therapy')}
                      variant="outline" 
                      className="border-[#D4AF37]/40"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Connect to Therapist
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Emergency Notice</AlertTitle>
          <AlertDescription>
            If you or someone you know is in immediate danger, please call emergency services (911) or go to your nearest emergency room.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-500" />
                Crisis Hotlines
              </CardTitle>
              <CardDescription>24/7 phone support for mental health crises</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-1">National Suicide Prevention Lifeline</h3>
                  <p className="text-gray-700 mb-2">Free and confidential support for people in distress.</p>
                  <Button onClick={handleCall988} variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    988 or 1-800-273-8255
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-1">Crisis Text Line</h3>
                  <p className="text-gray-700 mb-2">Text-based crisis support available 24/7.</p>
                  <Button onClick={handleTextCrisisLine} variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Text HOME to 741741
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-1">Veterans Crisis Line</h3>
                  <p className="text-gray-700 mb-2">Support for veterans and their loved ones.</p>
                  <Button onClick={handleCall988} variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    988 then press 1
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Hospital className="h-5 w-5 text-blue-500" />
                Local Resources
              </CardTitle>
              <CardDescription>Find help in your community</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Emergency Rooms</h3>
                  <p className="text-gray-700 mb-3">
                    For immediate life-threatening situations, go to your nearest emergency room or call 911.
                  </p>
                  <Button onClick={handleFindER} className="w-full">Find Nearest ER</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Crisis Centers</h3>
                  <p className="text-gray-700 mb-3">
                    Walk-in crisis centers can provide immediate assessment and support.
                  </p>
                  <Button onClick={handleFindCrisisCenters} className="w-full">Find Crisis Centers</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Mobile Crisis Units</h3>
                  <p className="text-gray-700 mb-3">
                    Teams that can come to your location to provide emergency mental health services.
                  </p>
                  <Button onClick={handleFindMobileCrisis} className="w-full">Find Mobile Crisis Units</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              Crisis Safety Planning
            </CardTitle>
            <CardDescription>Be prepared before a crisis occurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Personal Safety Plan</h3>
                <p className="text-gray-700 mb-3">
                  Create a plan to help you navigate moments of crisis. Include warning signs, coping strategies, and emergency contacts.
                </p>
                <Button onClick={() => navigate('/app/journaling')} className="w-full">Create Safety Plan</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Crisis Support Network</h3>
                <p className="text-gray-700 mb-3">
                  Identify friends, family members, or professionals who can support you during difficult times.
                </p>
                <Button onClick={() => navigate('/app/support-circle')} className="w-full">Build Support Network</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-light mb-6 text-center">Speak with a Crisis Counselor</h2>
          <p className="text-gray-700 mb-6 text-center">
            Our trained crisis counselors are available to help you navigate difficult situations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleCall988} size="lg" className="bg-red-600 hover:bg-red-700">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button onClick={handleTextCrisisLine} size="lg" variant="outline">
              <MessageSquare className="mr-2 h-5 w-5" />
              Text Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;
