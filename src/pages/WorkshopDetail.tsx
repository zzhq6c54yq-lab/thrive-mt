
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  BookOpen,
  Video,
  FileText,
  Download,
  CheckCircle,
  Play,
  Pause,
  Volume,
  Volume2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import HomeButton from "@/components/HomeButton";

const WorkshopDetail = () => {
  const { workshopId } = useParams<{ workshopId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  
  // Get workshop title from location state, or use the ID
  const workshopTitle = location.state?.workshopTitle || workshopId;
  
  // Mock data for workshop details - in a real app, this would come from an API
  const workshopDetails = {
    id: workshopId,
    title: workshopTitle || "Workshop Title",
    description: getWorkshopDescription(workshopId),
    instructor: getWorkshopInstructor(workshopId),
    date: "Tuesdays & Thursdays, 10:00 AM - 11:30 AM ET",
    category: getWorkshopCategory(workshopId),
    sections: getWorkshopSections(workshopId)
  };
  
  // Helper functions to get workshop data based on ID
  function getWorkshopDescription(id: string | undefined): string {
    switch(id) {
      case "mindful-communication":
        return "Learn effective communication techniques rooted in mindfulness principles to improve personal and professional relationships.";
      case "emotional-regulation":
        return "Develop skills to manage difficult emotions and respond rather than react to challenging situations.";
      case "stress-management":
        return "Evidence-based strategies to reduce stress and build resilience in high-pressure environments.";
      default:
        return "A comprehensive workshop to enhance your mental wellbeing and develop practical skills.";
    }
  }
  
  function getWorkshopInstructor(id: string | undefined): string {
    switch(id) {
      case "mindful-communication":
        return "Dr. Sarah Johnson";
      case "emotional-regulation":
        return "Dr. Michael Chen";
      case "stress-management":
        return "Dr. Robert Taylor";
      default:
        return "Dr. Emma Wilson";
    }
  }
  
  function getWorkshopCategory(id: string | undefined): string {
    switch(id) {
      case "mindful-communication":
        return "Communication";
      case "emotional-regulation":
        return "Emotional Intelligence";
      case "stress-management":
        return "Stress Management";
      default:
        return "Mental Wellness";
    }
  }
  
  function getWorkshopSections(id: string | undefined): any[] {
    switch(id) {
      case "mindful-communication":
        return [
          {
            id: "mc-1",
            title: "Foundations of Mindful Communication",
            description: "Understanding the principles of mindfulness in the context of communication.",
            content: "Mindful communication involves bringing full awareness to our interactions. This section explores the core principles of mindfulness—present moment awareness, non-judgment, and intentionality—as they apply to communication. We'll examine how mindless communication habits contribute to misunderstandings, conflict, and relationship strain, while mindful approaches create space for deeper connection and mutual understanding.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Present Moment Conversation",
            exerciseDescription: "Practice fully present listening and speaking with a partner."
          },
          {
            id: "mc-2",
            title: "Mindful Listening",
            description: "Developing deep listening skills to truly understand others.",
            content: "Most people listen to respond rather than to understand. This section focuses on developing the skill of mindful listening—being fully present with another person without planning your response, judging their words, or becoming distracted. We'll practice techniques for maintaining focus during conversations, noticing internal distractions, and creating the psychological safety that allows others to express themselves honestly.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Three-Minute Focused Listening",
            exerciseDescription: "Practice full attention listening without interruption or response preparation."
          },
          {
            id: "mc-3",
            title: "Mindful Speaking",
            description: "Communicating with clarity, intention, and compassion.",
            content: "Our words have tremendous power to connect or divide, heal or harm. This section addresses mindful speaking—choosing words intentionally, speaking from authenticity rather than reactivity, and considering the impact of our communication. We'll explore techniques for pausing before speaking, considering our intentions, using "I" statements, and expressing difficult truths with both honesty and compassion.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Intentional Communication Practice",
            exerciseDescription: "Apply mindful speaking principles to expressing a challenging message."
          },
          {
            id: "mc-4",
            title: "Navigating Difficult Conversations",
            description: "Using mindfulness to transform conflict into connection.",
            content: "Difficult conversations are inevitable in relationships, but mindfulness can transform how we approach them. This section provides a framework for mindful conflict navigation—staying present during emotional intensity, noticing physical sensations and emotions without being overwhelmed by them, and maintaining connection even during disagreement. We'll practice techniques specifically designed for high-stakes conversations and emotional triggers.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Difficult Conversation Simulation",
            exerciseDescription: "Practice mindful approaches to a challenging interaction scenario."
          }
        ];
      case "emotional-regulation":
        return [
          {
            id: "er-1",
            title: "Understanding Emotional Responses",
            description: "Recognizing emotion triggers and patterns in your life.",
            content: "Emotions serve as vital signals about our needs, values, and boundaries, but they can feel overwhelming when we don't understand them. This section explores the neuroscience of emotional responses, distinguishing between primary emotions and secondary reactions, and identifying personal patterns and triggers. You'll learn to recognize emotional activation in its early stages through body awareness, thought patterns, and behavioral cues.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Emotion Mapping",
            exerciseDescription: "Create a personalized map of your emotional triggers and patterns."
          },
          {
            id: "er-2",
            title: "Self-Regulation Techniques",
            description: "Practical skills for managing emotional intensity.",
            content: "When emotions intensify, effective self-regulation skills become essential. This section introduces evidence-based techniques for managing emotional activation, including grounding exercises, breathing patterns that regulate the nervous system, cognitive reframing approaches, and body-based interventions. The focus is on building a personalized toolkit of strategies that can be applied in different contexts and emotional states.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Regulation Toolkit Development",
            exerciseDescription: "Create a personalized set of techniques for different emotional intensities."
          },
          {
            id: "er-3",
            title: "Mindfulness and Emotion",
            description: "Using mindfulness to create space between trigger and response.",
            content: "Mindfulness offers a powerful approach to working with difficult emotions by creating space between stimulus and response. This section focuses on applying mindfulness specifically to emotional experiences—developing the capacity to observe emotions without identification, allowing feelings to be present without being overwhelmed by them, and using awareness to make conscious choices rather than reacting automatically.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Mindful Emotion Practice",
            exerciseDescription: "Learn to observe emotions with curiosity rather than reactivity."
          },
          {
            id: "er-4",
            title: "From Regulation to Resilience",
            description: "Building long-term emotional resilience and flexibility.",
            content: "Beyond immediate emotion regulation, the ultimate goal is developing emotional resilience—the ability to navigate life's ups and downs with flexibility and balance. This section addresses practices for building lasting emotional strength, including self-compassion routines, values clarification, meaning-making approaches, and the development of a growth mindset about emotional challenges.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Resilience Practice Plan",
            exerciseDescription: "Develop a structured plan for building emotional resilience over time."
          }
        ];
      case "stress-management":
        return [
          {
            id: "sm-1",
            title: "Understanding Your Stress Response",
            description: "The science of stress and how it affects your mind and body.",
            content: "Stress is a biological response designed to help us respond to threats, but chronic activation can be harmful. This section explores the physiology of the stress response, the difference between helpful and harmful forms of stress, and how to recognize your personal stress signals. We'll examine how stress manifests uniquely for each person through physical sensations, thought patterns, emotional experiences, and behavioral changes.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Personal Stress Inventory",
            exerciseDescription: "Identify your unique stress signals, triggers, and patterns."
          },
          {
            id: "sm-2",
            title: "Immediate Stress Relief Techniques",
            description: "Quick strategies to calm your nervous system in the moment.",
            content: "When stress levels are high, having immediate relief strategies is essential. This section provides evidence-based techniques for quickly reducing stress activation, including specific breathing patterns, physical interventions, cognitive approaches, and sensory grounding exercises. We'll practice methods that work in different contexts—from private moments to public meetings—and can be applied in just a few minutes.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Rapid Reset Practice",
            exerciseDescription: "Learn and practice quick techniques for immediate stress reduction."
          },
          {
            id: "sm-3",
            title: "Building Daily Resilience",
            description: "Lifestyle factors and daily practices that reduce overall stress.",
            content: "Effective stress management involves not just responding to stress but preventing unnecessary stress accumulation. This section focuses on lifestyle factors that build stress resistance—sleep hygiene, physical activity, nutrition, time in nature, and social connection. We'll develop personalized plans for incorporating these elements into daily life in sustainable ways rather than adding more pressure through unrealistic expectations.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Resilience Routine Development",
            exerciseDescription: "Create a personalized daily and weekly plan for stress resilience."
          },
          {
            id: "sm-4",
            title: "Mindset and Meaning",
            description: "Psychological approaches to transform your relationship with stress.",
            content: "Our perception of stress significantly impacts its effect on us. This section explores psychological approaches that transform our relationship with stress—including challenge vs. threat mindsets, benefit-finding, meaning-making, and value alignment. We'll examine how these perspectives can convert stressful experiences from purely negative to opportunities for growth, without minimizing genuine difficulties.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Stress Reappraisal Practice",
            exerciseDescription: "Apply cognitive techniques to shift your perspective on a current stressor."
          }
        ];
      default:
        return [
          {
            id: "default-1",
            title: "Workshop Introduction",
            description: "Overview of the workshop content and objectives.",
            content: "This workshop is designed to provide you with practical tools and knowledge to enhance your mental wellbeing. Throughout the sessions, you'll learn evidence-based techniques, engage in interactive exercises, and develop a personalized plan for ongoing practice.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Setting Personal Goals",
            exerciseDescription: "Define your specific goals and intentions for this workshop."
          },
          {
            id: "default-2",
            title: "Core Concepts",
            description: "Essential principles and foundational knowledge.",
            content: "This section introduces the fundamental concepts that underpin the workshop. You'll gain an understanding of the scientific background, theoretical framework, and evidence supporting the approaches we'll be exploring throughout the program.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Concept Application",
            exerciseDescription: "Explore how these core concepts relate to your personal experience."
          },
          {
            id: "default-3",
            title: "Practical Techniques",
            description: "Hands-on skills and methods you can apply immediately.",
            content: "In this section, we focus on practical techniques that you can begin using right away. These evidence-based approaches have been selected for their effectiveness and accessibility, allowing you to experience benefits even with minimal practice.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Technique Practice",
            exerciseDescription: "Guided practice of key techniques with feedback and refinement."
          },
          {
            id: "default-4",
            title: "Integration and Ongoing Practice",
            description: "Strategies for incorporating learning into daily life.",
            content: "The true value of any workshop comes from how well you integrate the learning into your everyday life. This section provides frameworks for ongoing practice, strategies for overcoming common obstacles, and approaches for maintaining motivation over time.",
            videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            exercise: "Personal Practice Plan",
            exerciseDescription: "Develop a structured plan for continuing practice after the workshop."
          }
        ];
    }
  }
  
  // Load progress from localStorage if available
  useEffect(() => {
    const savedProgress = localStorage.getItem(`workshop-${workshopId}`);
    if (savedProgress) {
      const data = JSON.parse(savedProgress);
      setProgress(data.progress);
      setCompletedSections(data.completedSections);
    }
  }, [workshopId]);
  
  // Handle marking a section as complete
  const handleSectionComplete = (sectionId: string) => {
    let newCompletedSections = [...completedSections];
    
    if (!completedSections.includes(sectionId)) {
      newCompletedSections.push(sectionId);
      setCompletedSections(newCompletedSections);
    }
    
    // Calculate new progress percentage
    const totalSections = workshopDetails.sections.length;
    const newProgress = Math.floor((newCompletedSections.length / totalSections) * 100);
    setProgress(newProgress);
    
    // Save progress to localStorage
    localStorage.setItem(
      `workshop-${workshopId}`,
      JSON.stringify({
        progress: newProgress,
        completedSections: newCompletedSections
      })
    );
    
    toast({
      title: "Section Completed",
      description: "Your progress has been saved.",
    });
  };
  
  // Handle downloading resources
  const handleDownload = (resourceName: string) => {
    toast({
      title: "Downloading Resource",
      description: `Your ${resourceName} is being downloaded.`,
      duration: 2000
    });
  };
  
  // Toggle video playback
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Toggle video sound
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4f8] via-[#e6eef5] to-[#dde8f3]">
      <Header />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{workshopDetails.title}</h1>
              <p className="text-gray-600">{workshopDetails.description}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Badge className="mr-2 bg-indigo-100 text-indigo-800">{workshopDetails.category}</Badge>
            <div className="flex flex-col items-end">
              <div className="flex items-center mb-1">
                <span className="text-sm text-gray-600 mr-2">{progress}% Complete</span>
                <Progress value={progress} className="w-24 h-2" />
              </div>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start bg-white border overflow-x-auto">
            <TabsTrigger value="overview" className="text-base">Overview</TabsTrigger>
            <TabsTrigger value="content" className="text-base">Workshop Content</TabsTrigger>
            <TabsTrigger value="resources" className="text-base">Resources</TabsTrigger>
            <TabsTrigger value="exercises" className="text-base">Exercises</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Workshop</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      {workshopDetails.description} This workshop combines evidence-based techniques with practical applications, giving you tools you can immediately incorporate into your daily life. Through interactive exercises, discussion, and personalized planning, you'll develop skills that support long-term mental wellbeing.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <User className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Instructor</h3>
                          <p className="text-sm text-gray-600">{workshopDetails.instructor}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <Calendar className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Schedule</h3>
                          <p className="text-sm text-gray-600">{workshopDetails.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <Clock className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Duration</h3>
                          <p className="text-sm text-gray-600">4 Weeks, 90 Minutes/Session</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workshopDetails.sections.map((section, index) => (
                        <div 
                          key={section.id} 
                          className={`p-4 border rounded-lg ${
                            completedSections.includes(section.id) 
                              ? 'border-indigo-200 bg-indigo-50' 
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="bg-indigo-100 text-indigo-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <h3 className="font-medium text-lg">{section.title}</h3>
                            {completedSections.includes(section.id) && (
                              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                            )}
                          </div>
                          <p className="text-gray-600 mt-2 ml-11">{section.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Workshop Materials</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-indigo-600 mr-3" />
                        <div>
                          <div className="font-medium">Workshop Handbook</div>
                          <div className="text-sm text-gray-500">PDF, 3.2MB</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-600"
                        onClick={() => handleDownload("Workshop Handbook")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-indigo-600 mr-3" />
                        <div>
                          <div className="font-medium">Practice Worksheets</div>
                          <div className="text-sm text-gray-500">PDF, 1.8MB</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-600"
                        onClick={() => handleDownload("Practice Worksheets")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>About Your Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                        {workshopDetails.instructor.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-bold">{workshopDetails.instructor}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {workshopDetails.instructor} is a certified mental health professional with over 15 years of experience in clinical and educational settings. They specialize in evidence-based approaches to mental wellness and have helped thousands of individuals develop practical skills for improved wellbeing.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => setActiveTab("content")}
                >
                  Start Workshop
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Content Tab */}
          <TabsContent value="content" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
                  <video 
                    className="w-full h-full object-cover"
                    poster={`https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80`}
                    muted={isMuted}
                    autoPlay={isPlaying}
                    loop
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/20"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/20"
                      onClick={toggleMute}
                    >
                      {isMuted ? <Volume className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </Button>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Workshop Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {workshopDetails.sections.map((section, index) => (
                        <div key={section.id}>
                          <div className="flex items-center mb-3">
                            <div className="bg-indigo-100 text-indigo-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <h3 className="font-medium text-xl">{section.title}</h3>
                            {completedSections.includes(section.id) && (
                              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                            )}
                          </div>
                          
                          <div className="ml-11 space-y-4">
                            <p className="text-gray-600">{section.content}</p>
                            
                            {section.videoUrl && (
                              <div className="relative aspect-video bg-black rounded-lg overflow-hidden my-4">
                                <video 
                                  className="w-full h-full object-cover"
                                  controls
                                  poster={`https://picsum.photos/seed/${section.id}/640/360`}
                                >
                                  <source src={section.videoUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            )}
                            
                            <Button
                              variant={completedSections.includes(section.id) ? "outline" : "default"}
                              className={completedSections.includes(section.id) ? "text-indigo-600 border-indigo-600" : "bg-indigo-600 hover:bg-indigo-700"}
                              onClick={() => handleSectionComplete(section.id)}
                            >
                              {completedSections.includes(section.id) ? "Completed" : "Mark as Complete"}
                            </Button>
                          </div>
                          
                          {index < workshopDetails.sections.length - 1 && (
                            <div className="border-b border-gray-200 my-8"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Workshop Completion</span>
                        <span className="text-indigo-600">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-3">
                      {workshopDetails.sections.map((section, index) => (
                        <div 
                          key={section.id} 
                          className="flex items-center"
                        >
                          <div className={`h-5 w-5 rounded-full mr-3 flex items-center justify-center ${
                            completedSections.includes(section.id) 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {completedSections.includes(section.id) ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <span className={`text-sm ${
                            completedSections.includes(section.id) 
                              ? 'text-green-600' 
                              : 'text-gray-600'
                          }`}>
                            {section.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Related Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Recommended Reading</div>
                      <div className="text-sm text-gray-500 mb-2">Books and articles that complement this workshop</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-600 w-full"
                        onClick={() => handleDownload("Reading List")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download List
                      </Button>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Practice Audio Tracks</div>
                      <div className="text-sm text-gray-500 mb-2">Guided exercises for home practice</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-600 w-full"
                        onClick={() => handleDownload("Audio Tracks")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Tracks
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-indigo-50 to-white">
                  <CardHeader>
                    <CardTitle>Need Support?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Our mental health specialists are available to answer questions about workshop content.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full text-indigo-600 border-indigo-600"
                      onClick={() => {
                        toast({
                          title: "Support Request Sent",
                          description: "A specialist will contact you shortly.",
                        });
                      }}
                    >
                      Request Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-indigo-600" />
                    Reading Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Workshop Handbook</div>
                      <div className="text-sm text-gray-500 mb-2">Complete guide with all workshop content</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-600 w-full"
                        onClick={() => handleDownload("Workshop Handbook")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Research Summary</div>
                      <div className="text-sm text-gray-500 mb-2">Scientific evidence supporting workshop techniques</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-600 w-full"
                        onClick={() => handleDownload("Research Summary")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="mr-2 h-5 w-5 text-indigo-600" />
                    Video Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Guided Practice Videos</div>
                      <div className="text-sm text-gray-500 mb-2">Step-by-step visual guides for key techniques</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-600 w-full"
                        onClick={() => {
                          toast({
                            title: "Video Loading",
                            description: "Opening guided practice video series",
                          });
                        }}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Watch Videos
                      </Button>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Expert Interviews</div>
                      <div className="text-sm text-gray-500 mb-2">Conversations with field specialists</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-600 w-full"
                        onClick={() => {
                          toast({
                            title: "Video Loading",
                            description: "Opening expert interview series",
                          });
                        }}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Watch Videos
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-indigo-600" />
                    Worksheets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Practice Worksheets</div>
                      <div className="text-sm text-gray-500 mb-2">Structured exercises for skill development</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-600 w-full"
                        onClick={() => handleDownload("Practice Worksheets")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Worksheets
                      </Button>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Self-Assessment Tools</div>
                      <div className="text-sm text-gray-500 mb-2">Evaluate your progress and identify areas for growth</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-indigo-600 border-indigo-600 w-full"
                        onClick={() => handleDownload("Self-Assessment Tools")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Tools
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Exercises Tab */}
          <TabsContent value="exercises" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshopDetails.sections.map((section, index) => (
                <Card key={section.id}>
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 text-indigo-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <CardTitle>{section.title} Exercise</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Exercise: {section.exercise}</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {section.exerciseDescription}
                      </p>
                      <Button 
                        variant="outline" 
                        className="text-indigo-600 border-indigo-600 w-full"
                        onClick={() => handleDownload(`${section.exercise} Worksheet`)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Exercise
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Reflection Questions</h4>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
                        <li>How does this exercise relate to challenges in your life?</li>
                        <li>What insights did you gain from practicing this technique?</li>
                        <li>How might you adapt this practice to fit your specific needs?</li>
                      </ul>
                    </div>
                    
                    <Button
                      variant={completedSections.includes(section.id) ? "outline" : "default"}
                      className={completedSections.includes(section.id) ? "text-indigo-600 border-indigo-600 w-full" : "bg-indigo-600 hover:bg-indigo-700 w-full"}
                      onClick={() => handleSectionComplete(section.id)}
                    >
                      {completedSections.includes(section.id) ? "Exercise Completed" : "Mark Exercise as Complete"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkshopDetail;
