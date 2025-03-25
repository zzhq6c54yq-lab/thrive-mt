
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, Brain, Bookmark, Calendar, Clock, Coffee, 
  Heart, Users, Briefcase, Compass, Shield, CheckCircle,
  ExternalLink, Download, PlayCircle, FileText
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeButton from "@/components/HomeButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const EmployeeReadiness: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("resources");
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);

  // Resources data
  const resources = [
    {
      id: "stress-management",
      title: "Workplace Stress Management",
      icon: <Brain className="h-5 w-5 text-green-500" />,
      description: "Techniques to manage stress in fast-paced work environments",
      tags: ["Essential", "Most Popular"],
      content: "Workplace stress management involves identifying stressors, developing coping strategies, and creating boundaries. Techniques include deep breathing exercises, mindfulness meditation, physical activity, time management, and setting realistic expectations. Regular breaks throughout the workday and effective communication with colleagues and supervisors are essential. Remember that seeking professional help when needed is a sign of strength, not weakness."
    },
    {
      id: "boundaries",
      title: "Setting Healthy Boundaries",
      icon: <Shield className="h-5 w-5 text-purple-500" />,
      description: "Learn to establish and maintain professional boundaries",
      tags: ["Essential"],
      content: "Setting healthy workplace boundaries involves clearly communicating your limits, learning to say no when necessary, and separating work from personal life. Effective boundaries include limiting after-hours communication, setting realistic deadlines, delegating appropriately, and avoiding taking on responsibilities outside your job description. Respecting others' boundaries is equally important for a healthy workplace culture."
    },
    {
      id: "time-management",
      title: "Time Management for Work-Life Balance",
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      description: "Practical strategies to balance work responsibilities and personal life",
      tags: ["Popular"],
      content: "Effective time management for work-life balance involves prioritizing tasks, utilizing the Eisenhower matrix, setting SMART goals, and batching similar tasks. The Pomodoro Technique (25 minutes of focused work followed by a 5-minute break) can boost productivity. Digital tools like calendar apps and time-tracking software can help visualize how you spend your time. Remember to schedule downtime and personal activities with the same commitment as work obligations."
    },
    {
      id: "toxic-workplace",
      title: "Navigating Toxic Work Environments",
      icon: <Compass className="h-5 w-5 text-orange-500" />,
      description: "Tools for maintaining wellbeing in challenging workplace cultures",
      tags: ["Trending"],
      content: "Navigating toxic workplaces requires emotional intelligence, boundary setting, and strategic documentation. Focus on what you can control, maintain a strong support network outside work, and practice self-care. Limit interaction with toxic individuals when possible, and consider whether the situation warrants addressing directly, escalating to HR, or seeking employment elsewhere. Remember that your mental health should be a priority."
    },
    {
      id: "burnout-prevention",
      title: "Burnout Prevention and Recovery",
      icon: <Coffee className="h-5 w-5 text-red-500" />,
      description: "Recognize the signs of burnout and implement recovery strategies",
      tags: ["Essential"],
      content: "Burnout prevention involves recognizing warning signs like chronic fatigue, cynicism, and reduced performance. Prevention strategies include regular breaks, setting boundaries, engaging in meaningful work, and practicing self-care. If experiencing burnout, recovery requires addressing root causes, possibly taking time off, seeking professional help, reconnecting with values, and gradually rebuilding engagement. Organizations can help by promoting reasonable workloads and supportive leadership."
    },
    {
      id: "workplace-relationships",
      title: "Building Healthy Workplace Relationships",
      icon: <Users className="h-5 w-5 text-pink-500" />,
      description: "Communication skills for positive workplace interactions",
      tags: ["Popular"],
      content: "Building healthy workplace relationships involves active listening, clear communication, empathy, and respecting boundaries. Effective strategies include showing appreciation, being reliable, resolving conflicts constructively, and fostering inclusivity. Regular social activities and collaborations can strengthen team bonds. Remember that professional relationships require maintenance and effort, just like personal ones."
    }
  ];

  // Workshops data - Enhanced with more details
  const workshops = [
    {
      id: "resilience-training",
      title: "Workplace Resilience Training",
      date: "Every Monday",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      description: "Build emotional resilience to workplace challenges and setbacks",
      duration: "60 minutes",
      instructor: "Dr. Maya Johnson, Psychologist",
      details: "This interactive workshop helps you develop resilience through cognitive reframing techniques, stress management skills, and adaptive coping strategies. Sessions include real-world scenarios and group discussions."
    },
    {
      id: "mindful-work",
      title: "Mindfulness at Work",
      date: "Every Wednesday",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      description: "Integrate mindfulness practices into your daily work routine",
      duration: "45 minutes",
      instructor: "Sam Richards, Certified Mindfulness Coach",
      details: "Learn practical mindfulness techniques that can be applied during your workday, including brief meditation practices, mindful communication strategies, and attentional focus exercises."
    },
    {
      id: "communication-skills",
      title: "Effective Workplace Communication",
      date: "Every Friday",
      icon: <Briefcase className="h-5 w-5 text-blue-500" />,
      description: "Enhance your communication skills for better team collaboration",
      duration: "90 minutes",
      instructor: "Alex Torres, Corporate Communications Specialist",
      details: "This workshop covers all aspects of workplace communication including active listening, giving and receiving feedback, conflict resolution, and digital communication etiquette."
    },
    {
      id: "career-development",
      title: "Career Growth & Wellbeing",
      date: "Every 2nd Tuesday",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      description: "Strategies for professional development while maintaining mental health",
      duration: "75 minutes",
      instructor: "Jordan Ellis, Career Coach",
      details: "Discover strategies for advancing your career while prioritizing wellbeing, including goal setting, navigating workplace politics, managing up, and preventing burnout during periods of career growth."
    }
  ];

  // Assessments data - Enhanced with more details
  const assessments = [
    {
      id: "workplace-stress",
      title: "Workplace Stress Assessment",
      icon: <Brain className="h-5 w-5 text-red-500" />,
      description: "Gauge your current workplace stress levels and receive personalized recommendations",
      time: "10 minutes",
      questions: 20,
      format: "Multiple choice questionnaire",
      outcomes: "Personalized stress profile with targeted recommendations"
    },
    {
      id: "burnout-risk",
      title: "Burnout Risk Evaluation",
      icon: <Coffee className="h-5 w-5 text-orange-500" />,
      description: "Assess your risk of professional burnout and get preventive strategies",
      time: "15 minutes",
      questions: 25,
      format: "Self-assessment scale",
      outcomes: "Risk level analysis and personalized prevention plan"
    },
    {
      id: "work-life-balance",
      title: "Work-Life Balance Check",
      icon: <Compass className="h-5 w-5 text-blue-500" />,
      description: "Evaluate how effectively you're balancing professional and personal life",
      time: "8 minutes",
      questions: 15,
      format: "Lifestyle questionnaire",
      outcomes: "Balance score with specific improvement areas"
    }
  ];

  const handleResourceClick = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    setSelectedResource(resource);
    setIsResourceDialogOpen(true);
    
    toast({
      title: `Resource Opened`,
      description: `Viewing "${resource?.title}"`,
      duration: 2000
    });
  };

  const handleWorkshopClick = (workshopId: string) => {
    const workshop = workshops.find(w => w.id === workshopId);
    
    toast({
      title: `Workshop Registration`,
      description: `Registering for "${workshop?.title}"`,
      duration: 2000
    });
    
    // Simulate registration completion
    setTimeout(() => {
      toast({
        title: "Registration Complete",
        description: `You're all set for ${workshop?.title}! We've sent details to your email.`,
        duration: 3000
      });
    }, 1500);
  };

  const handleAssessmentClick = (assessmentId: string) => {
    const assessment = assessments.find(a => a.id === assessmentId);
    
    toast({
      title: `Starting Assessment`,
      description: `Preparing "${assessment?.title}" for you...`,
      duration: 2000
    });
    
    // Simulate assessment loading
    setTimeout(() => {
      toast({
        title: "Assessment Ready",
        description: "Your assessment has been prepared and is ready to take.",
        duration: 3000
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#22c55e] to-[#4ade80] text-white py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/small-business-portal" className="inline-flex items-center text-white hover:text-white/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portal Options
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Employee Readiness</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Tools, resources, and support to help you maintain mental wellbeing 
            in the workplace and achieve a healthy work-life balance.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Tabs defaultValue="resources" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="resources" className="text-lg py-3">Resources</TabsTrigger>
            <TabsTrigger value="workshops" className="text-lg py-3">Workshops</TabsTrigger>
            <TabsTrigger value="assessments" className="text-lg py-3">Assessments</TabsTrigger>
          </TabsList>
          
          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map(resource => (
                <Card 
                  key={resource.id}
                  className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/15 transition-all cursor-pointer transform hover:scale-105 shadow-lg"
                  onClick={() => handleResourceClick(resource.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-full bg-black/30">
                        {resource.icon}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-xl mt-3">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{resource.description}</p>
                    <div className="flex mt-3 gap-2">
                      {resource.tags.map(tag => (
                        <span 
                          key={tag} 
                          className={`text-xs px-2 py-1 rounded-full ${
                            tag === 'Essential' ? 'bg-red-500/20 text-red-300' :
                            tag === 'Popular' ? 'bg-blue-500/20 text-blue-300' :
                            tag === 'Most Popular' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-green-500/20 text-green-300'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full border border-white/20 hover:bg-white/20 text-white group"
                    >
                      Access Resource
                      <FileText className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Workshops Tab */}
          <TabsContent value="workshops" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshops.map(workshop => (
                <Card 
                  key={workshop.id}
                  className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/15 transition-all cursor-pointer transform hover:scale-105 shadow-lg"
                  onClick={() => handleWorkshopClick(workshop.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-full bg-black/30">
                        {workshop.icon}
                      </div>
                      <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full">
                        <Clock className="h-3 w-3 text-white/70" />
                        <span className="text-xs text-white/70">{workshop.duration}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-3">{workshop.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{workshop.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Calendar className="h-4 w-4 text-white/60" />
                      <span className="text-sm text-white/60">{workshop.date}</span>
                    </div>
                    <div className="mt-2 text-sm text-white/80">
                      <p><span className="text-white/60">Instructor:</span> {workshop.instructor}</p>
                      <p className="mt-2">{workshop.details}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full border border-white/20 hover:bg-white/20 text-white group"
                    >
                      Register for Workshop
                      <PlayCircle className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {assessments.map(assessment => (
                <Card 
                  key={assessment.id}
                  className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/15 transition-all cursor-pointer transform hover:scale-105 shadow-lg"
                  onClick={() => handleAssessmentClick(assessment.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-full bg-black/30">
                        {assessment.icon}
                      </div>
                      <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full">
                        <Clock className="h-3 w-3 text-white/70" />
                        <span className="text-xs text-white/70">{assessment.time}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-3">{assessment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{assessment.description}</p>
                    <div className="mt-3 space-y-1 text-sm">
                      <p><span className="text-white/60">Questions:</span> {assessment.questions}</p>
                      <p><span className="text-white/60">Format:</span> {assessment.format}</p>
                      <p><span className="text-white/60">Results:</span> {assessment.outcomes}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full border border-white/20 hover:bg-white/20 text-white group"
                    >
                      Take Assessment
                      <Download className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Resource Dialog */}
      <Dialog open={isResourceDialogOpen} onOpenChange={setIsResourceDialogOpen}>
        <DialogContent className="max-w-3xl bg-gray-900 border-green-500/30">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {selectedResource?.icon}
              <DialogTitle className="text-2xl">{selectedResource?.title}</DialogTitle>
            </div>
            <DialogDescription className="text-white/70">
              Resource material for employee wellness
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedResource?.tags?.map((tag: string) => (
                <span 
                  key={tag} 
                  className={`text-xs px-2 py-1 rounded-full ${
                    tag === 'Essential' ? 'bg-red-500/20 text-red-300' :
                    tag === 'Popular' ? 'bg-blue-500/20 text-blue-300' :
                    tag === 'Most Popular' ? 'bg-purple-500/20 text-purple-300' :
                    'bg-green-500/20 text-green-300'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-white/90 leading-relaxed">
              {selectedResource?.content}
            </p>
            
            <div className="bg-black/30 p-4 rounded-lg mt-6">
              <h4 className="text-white font-medium mb-2">Related Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="text-green-400 p-0 h-auto">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Workplace Stress Management Guide
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-green-400 p-0 h-auto">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Mindfulness Techniques for the Office
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-green-400 p-0 h-auto">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Creating a Healthy Work Environment
                  </Button>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" className="border-white/20">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Bookmark className="mr-2 h-4 w-4" />
                Save to My Resources
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeReadiness;
