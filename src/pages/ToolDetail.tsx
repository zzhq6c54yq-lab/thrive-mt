
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Info, CheckCircle2, BookOpen, UserPlus, GraduationCap, Shield, Clock } from 'lucide-react';
import { toolCategories, ToolCategory } from '@/data/toolCategories';
import { Button } from '@/components/ui/button';
import HomeButton from '@/components/HomeButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tool, setTool] = useState<ToolCategory | null>(null);
  const [showExample, setShowExample] = useState(false);

  useEffect(() => {
    if (toolId) {
      const foundTool = toolCategories.find(tool => 
        tool.title.toLowerCase().replace(/\s+/g, '-') === toolId
      );
      
      setTool(foundTool || null);
      
      if (!foundTool) {
        toast({
          title: "Tool Not Found",
          description: "The requested resource could not be found.",
          variant: "destructive"
        });
      }
    }
  }, [toolId, toast]);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Tool Not Found</h2>
          <p className="text-gray-700 mb-4">
            The requested tool could not be found. Please check the URL or return to the tools directory.
          </p>
          <Button onClick={() => navigate("/app/mental-wellness-tools")}>
            Back to Mental Wellness Tools
          </Button>
        </div>
      </div>
    );
  }

  const handleToolInteraction = () => {
    setShowExample(true);
    toast({
      title: `${tool.title} Activated`,
      description: "Interactive example is now available.",
    });
  };

  // Educational content based on the tool type
  const getEducationalContent = () => {
    switch(tool.title) {
      case "Anxiety Management":
        return {
          whatIs: "Anxiety is a normal response to stress that can be helpful in some situations, keeping us alert and protecting us from danger. However, when anxiety becomes excessive and persistent, interfering with daily activities, it may be considered an anxiety disorder.",
          howWorks: "Anxiety management techniques target both the physical symptoms (like rapid heart rate or muscle tension) and psychological aspects (like racing thoughts or worry loops). These techniques help interrupt the cycle of anxiety by either calming the body's stress response or by changing thought patterns.",
          benefits: ["Reduced physical symptoms of anxiety", "Improved ability to function in stressful situations", "Better sleep quality", "Enhanced overall quality of life", "Prevention of anxiety from developing into panic attacks"],
          example: "Practice: 4-7-8 Breathing Technique\n1. Find a comfortable sitting position\n2. Breathe in quietly through your nose for 4 seconds\n3. Hold your breath for a count of 7 seconds\n4. Exhale completely through your mouth, making a whoosh sound for 8 seconds\n5. Repeat this cycle 3-4 times"
        };
      case "Meditation & Mindfulness":
        return {
          whatIs: "Mindfulness meditation is a mental training practice that teaches you to slow down racing thoughts, let go of negativity, and calm both your mind and body. It combines meditation with the practice of mindfulness, which is being aware of your thoughts, feelings, and environment in the present moment.",
          howWorks: "During mindfulness meditation, you focus on the present moment and become aware of your thoughts and sensations without judgment. This practice helps create space between your thoughts and reactions, giving you more control over your responses to situations.",
          benefits: ["Reduced stress and anxiety", "Improved focus and concentration", "Better emotional regulation", "Enhanced self-awareness", "Improved sleep quality"],
          example: "Practice: 5-Minute Mindfulness\n1. Sit comfortably with your back straight and close your eyes\n2. Focus your attention on your breath\n3. Notice the sensation of your breath as it enters and leaves your nostrils\n4. When your mind wanders, gently bring your attention back to your breath\n5. Continue for 5 minutes, gradually increasing the time as you become more comfortable"
        };
      case "CBT Techniques":
        return {
          whatIs: "Cognitive Behavioral Therapy (CBT) is a structured, goal-oriented form of therapy that focuses on the connections between thoughts, feelings, and behaviors. It aims to identify and change negative or distorted thinking patterns that lead to harmful behaviors or emotional distress.",
          howWorks: "CBT works by helping you identify and challenge negative thought patterns, replacing them with more balanced and realistic ones. By changing how you think about situations, you can change how you feel and behave in response to them.",
          benefits: ["Improved emotional regulation", "Better problem-solving skills", "Reduced symptoms of anxiety and depression", "Greater resilience to stress", "Long-lasting results after therapy ends"],
          example: "Practice: Thought Record\n1. Identify a situation that triggered negative emotions\n2. Write down your automatic thoughts about the situation\n3. Note the emotions and their intensity (0-100%)\n4. Identify the 'hot thought' that most contributed to your emotions\n5. List evidence that supports and contradicts this thought\n6. Develop a balanced alternative thought\n7. Rate how you feel now (0-100%)"
        };
      case "Mood Tracking":
        return {
          whatIs: "Mood tracking is the practice of regularly recording your emotional states, identifying patterns, triggers, and factors that influence how you feel. It's a tool for increasing emotional self-awareness and monitoring mental health over time.",
          howWorks: "By consistently documenting your moods alongside contextual information (like sleep, activities, or social interactions), you can identify patterns and connections. This helps you understand what affects your emotional wellbeing and take proactive steps to manage it.",
          benefits: ["Increased self-awareness", "Identification of mood triggers", "Better communication with healthcare providers", "Early detection of mental health changes", "Empowerment through active participation in your mental health"],
          example: "Practice: Daily Mood Log\n1. Rate your mood on a scale (1-10)\n2. Note the time of day and what you were doing\n3. Record any significant events or triggers\n4. Track basics like sleep, exercise, and medication\n5. Include any physical symptoms you're experiencing\n6. Review weekly to identify patterns"
        };
      default:
        return {
          whatIs: "This is a mental wellness tool designed to help you develop skills and strategies for managing your mental health and emotional wellbeing.",
          howWorks: "This approach combines evidence-based techniques from psychology and mindfulness practices to help you address specific mental health challenges and build resilience.",
          benefits: ["Improved emotional awareness", "Better stress management", "Enhanced coping skills", "Greater self-compassion", "Increased resilience"],
          example: "Start by setting aside 5-10 minutes each day to practice this technique. Begin in a quiet space where you won't be interrupted. Follow the guided instructions and notice how your body and mind respond."
        };
    }
  };

  const educationalContent = getEducationalContent();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1a1a1f] text-white py-12 relative overflow-hidden">
        <div className="floating-bg animate-pulse"></div>
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <Link to="/mental-wellness-tools" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4 gradient-heading">{tool.title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl">{tool.description}</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-8 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#B87333]" />
                  What is {tool.title}?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{educationalContent.whatIs}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-[#B87333]" />
                  How it works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{educationalContent.howWorks}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#B87333]" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {educationalContent.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700">{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="learn" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tool.features.map((feature, index) => (
                <Card key={index} className="border-[#B87333]/30 bg-white/80 hover:shadow-md transition-all h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#B87333] text-white text-sm">
                        {index + 1}
                      </span>
                      {feature}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {["This feature helps you track your progress and identify patterns.",
                        "A powerful technique to strengthen your mental resilience.",
                        "This approach is backed by research and clinical evidence.",
                        "Personalized guidance to address your specific needs.",
                        "Build new skills that last beyond the immediate moment."
                      ][index % 5]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="border-[#B87333] bg-gradient-to-r from-[#1a1a1f]/5 to-[#B87333]/5 mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#B87333]" />
                  When to Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  {tool.title} is particularly effective:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-gray-700">When you're experiencing heightened stress or emotional distress</li>
                  <li className="text-gray-700">As part of your daily mental wellness routine</li>
                  <li className="text-gray-700">When you notice early warning signs of mental health challenges</li>
                  <li className="text-gray-700">In combination with professional mental health treatment</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="practice" className="animate-fade-in">
            <Card className="border-[#B87333]/30 bg-white/80 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-light">Try it yourself</CardTitle>
                <CardDescription>
                  Experience the benefits of {tool.title} with this guided exercise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showExample ? (
                  <div className="text-center py-8">
                    <p className="text-lg mb-6">
                      Ready to experience how {tool.title.toLowerCase()} can help you?
                    </p>
                    <Button 
                      className="bg-[#B87333] hover:bg-[#B87333]/90 px-8 py-6 text-lg hero-button"
                      onClick={handleToolInteraction}
                    >
                      {tool.cta}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6 py-4 animate-fade-down">
                    <h3 className="text-xl font-medium">Guided Exercise</h3>
                    <div className="p-6 bg-[#F1F0FB] rounded-lg border border-[#B87333]/20">
                      <pre className="whitespace-pre-wrap font-sans text-gray-700">
                        {educationalContent.example}
                      </pre>
                    </div>
                    <div className="bg-[#1a1a1f]/5 p-6 rounded-lg border border-[#B87333]/20">
                      <h4 className="font-medium mb-2 text-[#B87333]">Reflection Questions:</h4>
                      <ul className="list-disc pl-5 space-y-3">
                        <li>How do you feel after completing this exercise?</li>
                        <li>What was challenging about this experience?</li>
                        <li>How might you incorporate this into your daily routine?</li>
                        <li>What benefits do you notice immediately after practice?</li>
                      </ul>
                    </div>
                    <Button 
                      className="bg-[#B87333] hover:bg-[#B87333]/90 w-full py-4 text-md hero-button"
                      onClick={() => {
                        toast({
                          title: "Progress Saved",
                          description: "Your activity has been tracked in your wellness journey",
                        });
                      }}
                    >
                      Complete & Continue
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-[#B87333]/30 hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#B87333]" />
                    Recommended Reading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="pb-2 border-b border-gray-100">
                      <p className="font-medium">The Anxiety and Phobia Workbook</p>
                      <p className="text-sm text-gray-600">by Edmund J. Bourne, PhD</p>
                    </li>
                    <li className="pb-2 border-b border-gray-100">
                      <p className="font-medium">Rewire Your Anxious Brain</p>
                      <p className="text-sm text-gray-600">by Catherine M. Pittman and Elizabeth M. Karle</p>
                    </li>
                    <li>
                      <p className="font-medium">Dare: The New Way to End Anxiety and Stop Panic Attacks</p>
                      <p className="text-sm text-gray-600">by Barry McDonagh</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-[#B87333]/30 hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#B87333]" />
                    When to Seek Professional Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">While self-help tools are valuable, professional help is recommended if you:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Feel overwhelmed despite using these techniques</li>
                    <li>Experience symptoms that interfere with daily functioning</li>
                    <li>Have thoughts of harming yourself or others</li>
                    <li>Find that your symptoms are worsening over time</li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
                    onClick={() => {
                      navigate("/therapist-matches");
                      toast({
                        title: "Therapist Matching",
                        description: "Finding mental health professionals who can help",
                      });
                    }}
                  >
                    Find a Therapist
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-[#B87333]/30 bg-white/80 hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-[#B87333]" />
                  Community Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Connecting with others who share similar experiences can provide validation, 
                  inspiration, and practical advice for your journey.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <Button 
                    variant="outline" 
                    className="border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
                    onClick={() => {
                      navigate("/virtual-meetings");
                      toast({
                        title: "Virtual Meetings",
                        description: "Connect with others on similar journeys",
                      });
                    }}
                  >
                    Join Support Groups
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
                    onClick={() => {
                      navigate("/app/workshops");
                      toast({
                        title: "Workshops",
                        description: "Learn with others in structured environments",
                      });
                    }}
                  >
                    Explore Workshops
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ToolDetail;
