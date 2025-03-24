import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, BookOpen, Compass, Film, Dumbbell, PenTool, Music, CloudRain, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const AlternativeTherapies = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTherapyClick = (therapy: string) => {
    toast({
      title: `${therapy} Resources`,
      description: "Loading detailed information and resources...",
      duration: 2000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Alternative Therapies</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Explore complementary approaches to traditional therapy that can enhance your mental health journey.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-light mb-6">Creative Expression Therapies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-medium">Art Therapy</CardTitle>
                  <PenTool className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Visual expression of emotions and experiences</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-700 mb-4">Express emotions and process experiences through artistic creation, helping to externalize internal struggles.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50">Trauma Processing</Badge>
                  <Badge variant="outline" className="bg-blue-50">Emotional Release</Badge>
                  <Badge variant="outline" className="bg-blue-50">Self-Discovery</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleTherapyClick("Art Therapy")}
                >
                  Explore Art Therapy
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-medium">Music Therapy</CardTitle>
                  <Music className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Sonic exploration of emotional landscapes</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-700 mb-4">Use music to address emotional, cognitive, and social needs, creating pathways for expression and connection.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50">Mood Regulation</Badge>
                  <Badge variant="outline" className="bg-blue-50">Cognitive Function</Badge>
                  <Badge variant="outline" className="bg-blue-50">Social Connection</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleTherapyClick("Music Therapy")}
                >
                  Explore Music Therapy
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-medium">Drama Therapy</CardTitle>
                  <Film className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Theatrical approaches to personal growth</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-700 mb-4">Use theatrical techniques to facilitate personal growth and promote mental wellness through role-play and storytelling.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50">Role Exploration</Badge>
                  <Badge variant="outline" className="bg-blue-50">Narrative Therapy</Badge>
                  <Badge variant="outline" className="bg-blue-50">Emotional Catharsis</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleTherapyClick("Drama Therapy")}
                >
                  Explore Drama Therapy
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-light mb-6">Mind-Body Approaches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-medium">Yoga & Movement</CardTitle>
                  <Dumbbell className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Physical practices with mental benefits</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-700 mb-4">Connect mind and body through movement practices that reduce stress and promote mental clarity and emotional balance.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50">Stress Reduction</Badge>
                  <Badge variant="outline" className="bg-blue-50">Mind-Body Connection</Badge>
                  <Badge variant="outline" className="bg-blue-50">Physical Wellness</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleTherapyClick("Yoga & Movement")}
                >
                  Explore Yoga & Movement
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-medium">Mindfulness Meditation</CardTitle>
                  <CloudRain className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Present-moment awareness practices</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-700 mb-4">Develop awareness of the present moment through meditation techniques that help manage anxiety and improve focus.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50">Anxiety Reduction</Badge>
                  <Badge variant="outline" className="bg-blue-50">Attention Training</Badge>
                  <Badge variant="outline" className="bg-blue-50">Emotional Regulation</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleTherapyClick("Mindfulness Meditation")}
                >
                  Explore Mindfulness
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-medium">Breathwork</CardTitle>
                  <Moon className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Conscious breathing for mental health</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-700 mb-4">Use specialized breathing techniques to influence physiological states, reduce anxiety, and promote relaxation.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50">Stress Response</Badge>
                  <Badge variant="outline" className="bg-blue-50">Nervous System</Badge>
                  <Badge variant="outline" className="bg-blue-50">Energy Regulation</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleTherapyClick("Breathwork")}
                >
                  Explore Breathwork
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-light mb-6">Other Therapeutic Approaches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-medium">Nature Therapy</CardTitle>
                  <Compass className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Healing through connection with nature</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-700 mb-4">Engage with natural environments to reduce stress, improve mood, and enhance overall mental wellbeing.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50">Ecotherapy</Badge>
                  <Badge variant="outline" className="bg-blue-50">Forest Bathing</Badge>
                  <Badge variant="outline" className="bg-blue-50">Outdoor Therapy</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleTherapyClick("Nature Therapy")}
                >
                  Explore Nature Therapy
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-medium">Bibliotherapy</CardTitle>
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Therapeutic use of literature</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-700 mb-4">Use guided reading and literature to gain insight, promote healing, and develop coping mechanisms for mental health challenges.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50">Self-Help Books</Badge>
                  <Badge variant="outline" className="bg-blue-50">Narrative Therapy</Badge>
                  <Badge variant="outline" className="bg-blue-50">Reflective Reading</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleTherapyClick("Bibliotherapy")}
                >
                  Explore Bibliotherapy
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-medium">Animal-Assisted Therapy</CardTitle>
                  <Heart className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Healing connections with animals</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-700 mb-4">Work with animals to improve emotional, cognitive, and social functioning through structured therapeutic interactions.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50">Therapy Animals</Badge>
                  <Badge variant="outline" className="bg-blue-50">Emotional Support</Badge>
                  <Badge variant="outline" className="bg-blue-50">Companionship</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleTherapyClick("Animal-Assisted Therapy")}
                >
                  Explore Animal Therapy
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-light mb-6">Finding Your Path</h2>
          <p className="text-gray-700 mb-6">
            Alternative therapies can complement traditional approaches to mental health care. 
            Many people find that a combination of conventional and alternative methods provides 
            the most comprehensive support for their mental wellbeing. Explore different options 
            to find what resonates with your unique needs, preferences, and circumstances.
          </p>
          <p className="text-gray-700 mb-6">
            Remember that while these approaches can be powerful tools for wellbeing, they work 
            best when integrated into a comprehensive mental health plan that may include traditional 
            therapy, medication when appropriate, lifestyle factors, and social support.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => {
                toast({
                  title: "Consultation Request",
                  description: "Your request for a personalized consultation has been received. A specialist will contact you shortly.",
                  duration: 3000
                });
              }}
            >
              Schedule a Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Resource Guide",
                  description: "Your comprehensive guide to alternative therapies is being prepared for download.",
                  duration: 3000
                });
              }}
            >
              Download Resource Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeTherapies;
