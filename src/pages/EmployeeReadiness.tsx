
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, Brain, Bookmark, Calendar, Clock, Coffee, 
  Heart, Users, Briefcase, Compass, Shield, CheckCircle,
  ExternalLink, Download, PlayCircle, FileText, Star, Info
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeButton from "@/components/HomeButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Define types for resources
interface Resource {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  tags: string[];
  content: string;
  featured?: boolean;
}

interface Workshop {
  id: string;
  title: string;
  date: string;
  icon: React.ReactNode;
  description: string;
  duration: string;
  instructor: string;
  details: string;
  featured?: boolean;
}

interface Assessment {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  time: string;
  questions: number;
  format: string;
  outcomes: string;
}

const ResourceCard: React.FC<{ resource: Resource; onClick: () => void }> = ({ resource, onClick }) => (
  <Card 
    className={`relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 ${
      resource.featured 
        ? 'bg-gradient-to-br from-[#22C55E]/20 to-[#4ADE80]/10 border-green-500/20' 
        : 'bg-white/10'
    } backdrop-blur-sm border-none hover:bg-white/15 shadow-lg`}
    onClick={onClick}
  >
    {resource.featured && (
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">
        <Star className="h-3 w-3" />
        <span>Featured</span>
      </div>
    )}
    
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
      <div className="flex mt-3 gap-2 flex-wrap">
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
);

const WorkshopCard: React.FC<{ workshop: Workshop; onClick: () => void }> = ({ workshop, onClick }) => (
  <Card 
    className={`relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 ${
      workshop.featured 
        ? 'bg-gradient-to-br from-[#8B5CF6]/20 to-[#6366F1]/10 border-purple-500/20' 
        : 'bg-white/10'
    } backdrop-blur-sm border-none hover:bg-white/15 shadow-lg h-full`}
    onClick={onClick}
  >
    {workshop.featured && (
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
        <Star className="h-3 w-3" />
        <span>Featured</span>
      </div>
    )}
    
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
    <CardContent className="flex-grow">
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
);

const AssessmentCard: React.FC<{ assessment: Assessment; onClick: () => void }> = ({ assessment, onClick }) => (
  <Card 
    className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/15 transition-all cursor-pointer transform hover:scale-105 shadow-lg"
    onClick={onClick}
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
);

const EmployeeReadiness: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("resources");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [isWorkshopDialogOpen, setIsWorkshopDialogOpen] = useState(false);
  const [isAssessmentDialogOpen, setIsAssessmentDialogOpen] = useState(false);
  const [showHenryTip, setShowHenryTip] = useState(true);

  // Resources data
  const resources: Resource[] = [
    {
      id: "stress-management",
      title: "Workplace Stress Management",
      icon: <Brain className="h-5 w-5 text-green-500" />,
      description: "Techniques to manage stress in fast-paced work environments",
      tags: ["Essential", "Most Popular"],
      content: "Workplace stress management involves identifying stressors, developing coping strategies, and creating boundaries. Techniques include deep breathing exercises, mindfulness meditation, physical activity, time management, and setting realistic expectations. Regular breaks throughout the workday and effective communication with colleagues and supervisors are essential. Remember that seeking professional help when needed is a sign of strength, not weakness.",
      featured: true
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

  // Workshops data
  const workshops: Workshop[] = [
    {
      id: "resilience-training",
      title: "Workplace Resilience Training",
      date: "Every Monday",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      description: "Build emotional resilience to workplace challenges and setbacks",
      duration: "60 minutes",
      instructor: "Dr. Maya Johnson, Psychologist",
      details: "This interactive workshop helps you develop resilience through cognitive reframing techniques, stress management skills, and adaptive coping strategies. Sessions include real-world scenarios and group discussions.",
      featured: true
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

  // Assessments data
  const assessments: Assessment[] = [
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
    if (resource) {
      setSelectedResource(resource);
      setIsResourceDialogOpen(true);
      
      toast({
        title: `Resource Opened`,
        description: `Viewing "${resource.title}"`,
        duration: 2000
      });
    }
  };

  const handleWorkshopClick = (workshopId: string) => {
    const workshop = workshops.find(w => w.id === workshopId);
    if (workshop) {
      setSelectedWorkshop(workshop);
      setIsWorkshopDialogOpen(true);
      
      toast({
        title: `Workshop Information`,
        description: `Viewing "${workshop.title}"`,
        duration: 2000
      });
    }
  };

  const handleAssessmentClick = (assessmentId: string) => {
    const assessment = assessments.find(a => a.id === assessmentId);
    if (assessment) {
      setSelectedAssessment(assessment);
      setIsAssessmentDialogOpen(true);
      
      toast({
        title: `Assessment Information`,
        description: `Viewing "${assessment.title}"`,
        duration: 2000
      });
    }
  };

  const handleRegisterWorkshop = () => {
    if (!selectedWorkshop) return;
    
    toast({
      title: "Registration Complete",
      description: `You're all set for ${selectedWorkshop.title}! We've sent details to your email.`,
      duration: 3000
    });
    
    setIsWorkshopDialogOpen(false);
  };

  const handleStartAssessment = () => {
    if (!selectedAssessment) return;
    
    toast({
      title: "Assessment Started",
      description: `You're now taking the ${selectedAssessment.title}. Your results will be saved automatically.`,
      duration: 3000
    });
    
    setIsAssessmentDialogOpen(false);
  };

  const handleSaveResource = () => {
    if (!selectedResource) return;
    
    toast({
      title: "Resource Saved",
      description: `${selectedResource.title} has been saved to your personal collection.`,
      duration: 3000
    });
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
      
      {/* Henry Tip */}
      {showHenryTip && (
        <div className="container mx-auto max-w-6xl px-4 mt-4">
          <div className="bg-gradient-to-r from-[#B87333]/20 to-[#E5C5A1]/20 border border-[#B87333]/30 rounded-lg p-4 flex items-start gap-3">
            <Avatar className="h-10 w-10 border-2 border-[#B87333]/30">
              <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
              <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white font-semibold">H</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h3 className="text-white font-medium mb-1">Henry's Tip</h3>
              <p className="text-white/80 text-sm">Remember to check in with yourself regularly about your workplace wellbeing. The resources here are designed to help you thrive, not just survive, at work.</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowHenryTip(false)}
              className="text-white/60 hover:text-white/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
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
                <ResourceCard 
                  key={resource.id} 
                  resource={resource}
                  onClick={() => handleResourceClick(resource.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          {/* Workshops Tab */}
          <TabsContent value="workshops" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshops.map(workshop => (
                <WorkshopCard
                  key={workshop.id}
                  workshop={workshop}
                  onClick={() => handleWorkshopClick(workshop.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {assessments.map(assessment => (
                <AssessmentCard
                  key={assessment.id}
                  assessment={assessment}
                  onClick={() => handleAssessmentClick(assessment.id)}
                />
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
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSaveResource}>
                <Bookmark className="mr-2 h-4 w-4" />
                Save to My Resources
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Workshop Dialog */}
      <Dialog open={isWorkshopDialogOpen} onOpenChange={setIsWorkshopDialogOpen}>
        <DialogContent className="max-w-3xl bg-gray-900 border-purple-500/30">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {selectedWorkshop?.icon}
              <DialogTitle className="text-2xl">{selectedWorkshop?.title}</DialogTitle>
            </div>
            <DialogDescription className="text-white/70">
              Interactive workshop session
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  Schedule
                </h4>
                <p className="text-white/80">{selectedWorkshop?.date}</p>
                <p className="text-white/80">Duration: {selectedWorkshop?.duration}</p>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-400" />
                  Instructor
                </h4>
                <p className="text-white/80">{selectedWorkshop?.instructor}</p>
              </div>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Workshop Details</h4>
              <p className="text-white/90">{selectedWorkshop?.description}</p>
              <div className="mt-3 bg-black/20 p-3 rounded">
                <p className="text-white/80">{selectedWorkshop?.details}</p>
              </div>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-500/20 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-purple-400" />
                What to Expect
              </h4>
              <ul className="list-disc list-inside space-y-1 text-white/80">
                <li>Interactive exercises and group discussions</li>
                <li>Practical techniques you can apply immediately</li>
                <li>Downloadable resources and follow-up materials</li>
                <li>Opportunity to ask questions and receive personalized advice</li>
              </ul>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" className="border-white/20" onClick={() => setIsWorkshopDialogOpen(false)}>
                Maybe Later
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleRegisterWorkshop}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Register Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assessment Dialog */}
      <Dialog open={isAssessmentDialogOpen} onOpenChange={setIsAssessmentDialogOpen}>
        <DialogContent className="max-w-3xl bg-gray-900 border-blue-500/30">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {selectedAssessment?.icon}
              <DialogTitle className="text-2xl">{selectedAssessment?.title}</DialogTitle>
            </div>
            <DialogDescription className="text-white/70">
              Self-assessment tool
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/30 p-4 rounded-lg text-center">
                <h4 className="text-white font-medium mb-1 flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4 text-blue-400" />
                  Time Required
                </h4>
                <p className="text-white/80 text-lg">{selectedAssessment?.time}</p>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg text-center">
                <h4 className="text-white font-medium mb-1 flex items-center justify-center gap-1">
                  <FileText className="h-4 w-4 text-blue-400" />
                  Questions
                </h4>
                <p className="text-white/80 text-lg">{selectedAssessment?.questions} questions</p>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg text-center">
                <h4 className="text-white font-medium mb-1 flex items-center justify-center gap-1">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  Format
                </h4>
                <p className="text-white/80 text-lg">{selectedAssessment?.format}</p>
              </div>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">About This Assessment</h4>
              <p className="text-white/90">{selectedAssessment?.description}</p>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-400" />
                What You'll Get
              </h4>
              <p className="text-white/80 mb-2">{selectedAssessment?.outcomes}</p>
              <ul className="list-disc list-inside space-y-1 text-white/80">
                <li>Personalized insights based on your responses</li>
                <li>Actionable steps to improve your wellbeing</li>
                <li>Comparison to industry benchmarks (anonymous)</li>
                <li>Recommended resources based on your results</li>
              </ul>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" className="border-white/20" onClick={() => setIsAssessmentDialogOpen(false)}>
                Maybe Later
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleStartAssessment}>
                <Download className="mr-2 h-4 w-4" />
                Start Assessment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeReadiness;
