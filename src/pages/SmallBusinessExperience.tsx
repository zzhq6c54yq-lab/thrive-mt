import React, { useState } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Briefcase, Building, BarChart, Calendar, ChartLine, Clipboard, Compass, Clock,
  CopyCheck, DollarSign, HandHeart, Handshake, Heart, Lightbulb, MapPin,
  LifeBuoy, MessageSquare, Shield, UserCircle, Users, Lock
} from "lucide-react";

const SmallBusinessExperience: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResourceClick = (name: string, path: string) => {
    toast({
      title: `Accessing ${name}`,
      description: "Loading your resource...",
      duration: 2000
    });
    // In a real app, navigate to the specific resource
    console.log(`Navigating to: ${path}`);
    // We'll simulate navigation by showing a toast
    toast({
      title: "Resource content loaded",
      description: `Now viewing: ${name}`,
      duration: 3000
    });
  };

  const handleWorkshopJoin = (title: string) => {
    toast({
      title: "Workshop Registration",
      description: `You've successfully registered for: ${title}`,
      duration: 3000
    });
  };

  const handleServiceContact = (service: string, contact: string) => {
    toast({
      title: "Contact Information",
      description: `Connecting you to ${service}: ${contact}`,
      duration: 3000
    });
  };

  const handleQuickAccess = (feature: string) => {
    toast({
      title: `Quick Access: ${feature}`,
      description: "Loading your selected feature...",
      duration: 2000
    });
  };

  const businessResources = [
    {
      title: "Work-Life Balance Strategies",
      description: "Techniques for balancing business demands and personal wellbeing",
      icon: Clipboard,
      path: "/work-life-balance",
      category: "wellness"
    },
    {
      title: "Managing Workplace Stress",
      description: "Tools to identify and manage stress in your business environment",
      icon: Lightbulb,
      path: "/workplace-stress",
      category: "wellness"
    },
    {
      title: "Employee Mental Health Program",
      description: "Framework for supporting mental health in your team",
      icon: Users,
      path: "/employee-program",
      category: "leadership"
    },
    {
      title: "Financial Stress Management",
      description: "Coping strategies for business financial pressures",
      icon: DollarSign,
      path: "/financial-stress",
      category: "financial"
    },
    {
      title: "Leadership Mindfulness",
      description: "Mindfulness practices for better business decision-making",
      icon: UserCircle,
      path: "/mindful-leadership",
      category: "leadership"
    },
    {
      title: "Burnout Prevention",
      description: "Identify and prevent burnout in yourself and your team",
      icon: Shield,
      path: "/burnout-prevention",
      category: "wellness"
    },
    {
      title: "Team Building for Wellbeing",
      description: "Activities to strengthen team connections and mental health",
      icon: HandHeart,
      path: "/team-building",
      category: "teamwork"
    },
    {
      title: "Healthy Workplace Design",
      description: "Creating physical spaces that support mental wellbeing",
      icon: Building,
      path: "/workplace-design",
      category: "environment"
    },
    {
      title: "Crisis Communication Planning",
      description: "Preparing for and managing business crises with mental health in mind",
      icon: MessageSquare,
      path: "/crisis-communication",
      category: "leadership"
    },
    {
      title: "Performance Without Pressure",
      description: "Achieving business goals while maintaining psychological safety",
      icon: ChartLine,
      path: "/pressure-performance",
      category: "performance"
    },
    {
      title: "Business Transition Support",
      description: "Managing mental health during significant business changes",
      icon: BarChart,
      path: "/business-transitions",
      category: "change"
    },
    {
      title: "Customer Interaction Wellness",
      description: "Maintaining wellbeing during challenging customer situations",
      icon: Heart,
      path: "/customer-wellness",
      category: "service"
    }
  ];

  const upcomingWorkshops = [
    {
      title: "Entrepreneur Mental Health Summit",
      date: "Nov 12, 2023",
      time: "10:00 AM - 3:30 PM",
      location: "Virtual Conference",
      spots: "Unlimited",
      description: "A day of workshops, panels, and networking focused on the unique mental health challenges of small business owners."
    },
    {
      title: "Stress-Free Management Techniques",
      date: "Nov 18, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Business Innovation Center",
      spots: 25,
      description: "Learn practical techniques to manage your team effectively while preserving your mental wellbeing."
    },
    {
      title: "Financial Wellness for Small Business",
      date: "Nov 25, 2023",
      time: "11:00 AM - 12:30 PM",
      location: "Virtual (Zoom)",
      spots: 50,
      description: "Address the mental health impact of financial stress and develop healthy approaches to business finances."
    }
  ];

  const businessServices = [
    {
      title: "Business Owner Support Group",
      description: "Weekly peer-led sessions for small business owners to discuss challenges",
      schedule: "Thursdays: 7PM-8:30PM",
      contact: "owners@thrivemh.com",
      location: "Virtual & In-Person Options"
    },
    {
      title: "Entrepreneur Mental Health Hotline",
      description: "Confidential support line specifically for business owners in crisis",
      schedule: "24/7",
      contact: "1-800-BIZ-HELP",
      location: "Phone Service"
    },
    {
      title: "Workplace Wellness Consultation",
      description: "Expert consultation to develop mental health initiatives for your team",
      schedule: "By appointment",
      contact: "workplace@thrivemh.com",
      location: "On-site or Virtual"
    }
  ];

  // Filter resources based on search term
  const filteredResources = businessResources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Page title="Small Business Mental Health Resources">
      <div className="space-y-8">
        {/* Header section with intro and search */}
        <div className="bg-gradient-to-r from-[#F97316]/10 to-[#FB923C]/10 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-medium mb-2 text-[#F97316]">
                Your Business Wellness Journey Starts Here
              </h2>
              <p className="text-white font-medium mb-4">
                Running or working at a small business brings unique mental health challenges. We've gathered resources 
                specifically designed for entrepreneurs and employees balancing work demands, team dynamics, 
                financial pressures, and personal wellbeing.
              </p>
            </div>
            <div className="md:w-1/3 flex-shrink-0">
              <div className="p-4 rounded-full bg-[#F97316]/20 inline-flex items-center justify-center">
                <Briefcase className="h-16 w-16 text-[#F97316]" />
              </div>
            </div>
          </div>
          <div className="mt-4 relative">
            <Input
              type="search"
              placeholder="Search for resources, topics, or business concerns..."
              className="w-full bg-white/20 border-white/20 text-white placeholder:text-white/80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className="mt-2 text-sm text-white font-medium">
              Try searching for: stress, leadership, financial, team, burnout, balance
            </p>
          </div>
        </div>

        {/* Main content with tabs */}
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="resources" className="text-white bg-white/10 data-[state=active]:bg-[#F97316] data-[state=active]:text-white">Resources</TabsTrigger>
            <TabsTrigger value="workshops" className="text-white bg-white/10 data-[state=active]:bg-[#F97316] data-[state=active]:text-white">Workshops</TabsTrigger>
            <TabsTrigger value="services" className="text-white bg-white/10 data-[state=active]:bg-[#F97316] data-[state=active]:text-white">Support Services</TabsTrigger>
            <TabsTrigger value="crisis" className="text-white bg-white/10 data-[state=active]:bg-[#F97316] data-[state=active]:text-white">Crisis Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource, index) => (
                <Card 
                  key={index}
                  className="border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer hover:border-[#F97316]/30"
                  onClick={() => handleResourceClick(resource.title, resource.path)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 rounded-lg bg-[#F97316]/10">
                        <resource.icon className="h-5 w-5 text-[#F97316]" />
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white font-medium">
                        {resource.category}
                      </span>
                    </div>
                    <CardTitle className="mt-3 text-lg font-medium text-white">{resource.title}</CardTitle>
                    <CardDescription className="text-white/90 font-medium">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full hover:bg-[#F97316]/20 border-[#F97316]/30 hover:text-white text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResourceClick(resource.title, resource.path);
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-8">
                <p className="text-white/80">No resources found matching "{searchTerm}". Try a different search term.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="workshops" className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5 text-[#FB923C]" />
                <span>Upcoming Business Wellness Workshops</span>
              </h3>
              <p className="text-white/90 font-medium mb-4">
                All workshops are available with your subscription. Some events have limited capacity, so register early.
              </p>
              
              <div className="space-y-4">
                {upcomingWorkshops.map((workshop, index) => (
                  <div 
                    key={index} 
                    className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div>
                        <h4 className="font-medium text-[#F97316]">{workshop.title}</h4>
                        <p className="text-white/90 font-medium text-sm">{workshop.description}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <span className="text-xs flex items-center gap-1 text-white/90 font-medium">
                            <Calendar className="h-3 w-3" /> {workshop.date}
                          </span>
                          <span className="text-xs flex items-center gap-1 text-white/90 font-medium">
                            <Clock className="h-3 w-3" /> {workshop.time}
                          </span>
                          <span className="text-xs flex items-center gap-1 text-white/90 font-medium">
                            <MapPin className="h-3 w-3" /> {workshop.location}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button 
                          variant="outline" 
                          className="hover:bg-[#FB923C]/20 border-[#FB923C]/30 text-white"
                          onClick={() => handleWorkshopJoin(workshop.title)}
                        >
                          Join Workshop
                        </Button>
                        <div className="text-xs text-white/80 mt-1 text-center font-medium">
                          {typeof workshop.spots === 'number' ? `${workshop.spots} spots left` : workshop.spots}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="mt-4 w-full border-[#FB923C]/30 hover:bg-[#FB923C]/10 text-white"
                onClick={() => handleQuickAccess("All Workshops")}
              >
                View All Workshops
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2 text-white">
                <HandHeart className="h-5 w-5 text-[#F97316]" />
                <span>Business Mental Health Services</span>
              </h3>
              <p className="text-white/90 font-medium mb-4">
                Services available to all subscribers, with additional options for teams.
              </p>
              
              <div className="space-y-4">
                {businessServices.map((service, index) => (
                  <div 
                    key={index} 
                    className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors"
                  >
                    <h4 className="font-medium text-[#F97316]">{service.title}</h4>
                    <p className="text-white/90 font-medium text-sm mt-1">{service.description}</p>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-white/80 font-medium">
                        <Calendar className="h-3 w-3" /> 
                        <span>{service.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/80 font-medium">
                        <MessageSquare className="h-3 w-3" /> 
                        <span>{service.contact}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/80 font-medium">
                        <MapPin className="h-3 w-3" /> 
                        <span>{service.location}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button 
                        variant="outline" 
                        className="hover:bg-[#F97316]/20 border-[#F97316]/30 text-white"
                        onClick={() => handleServiceContact(service.title, service.contact)}
                      >
                        Contact Service
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="crisis" className="space-y-4">
            <div className="bg-[#F87171]/10 border border-[#F87171]/30 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2 text-white">Entrepreneur Crisis Support</h3>
              <p className="mb-4 text-white/90 font-medium">
                If you're experiencing a mental health emergency, please use one of these resources for immediate help:
              </p>
              
              <div className="space-y-4">
                <div className="bg-[#F87171]/20 rounded-lg p-4">
                  <h4 className="font-medium text-white">Business Owner Crisis Line (24/7)</h4>
                  <p className="text-2xl font-bold text-white mt-2">1-800-BIZ-HELP (249-4357)</p>
                  <Button 
                    variant="outline"
                    className="mt-2 border-white/30 bg-white/10 hover:bg-white/20 text-white"
                    onClick={() => handleQuickAccess("Business Owner Crisis Line")}
                  >
                    Call Now
                  </Button>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-white">National Crisis Text Line</h4>
                  <p className="text-white/90 font-medium mt-1">Text HOME to 741741 to connect with a Crisis Counselor</p>
                  <Button 
                    variant="outline"
                    className="mt-2 border-white/30 bg-white/10 hover:bg-white/20 text-white"
                    onClick={() => handleQuickAccess("National Crisis Text Line")}
                  >
                    Text Now
                  </Button>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-white">National Suicide Prevention Lifeline</h4>
                  <p className="text-white/90 font-medium mt-1">1-800-273-8255 (Available 24/7)</p>
                  <Button 
                    variant="outline"
                    className="mt-2 border-white/30 bg-white/10 hover:bg-white/20 text-white"
                    onClick={() => handleQuickAccess("National Suicide Prevention Lifeline")}
                  >
                    Call Now
                  </Button>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-white">Emergency Services</h4>
                  <p className="text-white/90 font-medium mt-1">Call 911 or go to your nearest emergency room</p>
                  <Button 
                    variant="outline"
                    className="mt-2 border-white/30 bg-white/10 hover:bg-white/20 text-white"
                    onClick={() => handleQuickAccess("Emergency Services")}
                  >
                    Get Emergency Help
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 border-t border-white/10 pt-4 text-white/90 font-medium">
                <p>
                  For non-emergency support, please schedule a consultation with one of our 
                  business-specialized therapists through your dashboard.
                </p>
                <Button 
                  variant="outline"
                  className="mt-3 border-white/30 bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => navigate("/scheduling")}
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick access links */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
            <Compass className="h-5 w-5 text-[#FB923C]" />
            <span>Quick Access</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="border-[#F97316]/20 hover:bg-[#F97316]/10 h-auto py-4 flex flex-col gap-2 text-white"
              onClick={() => handleQuickAccess("Workplace Wellness")}
            >
              <Building className="h-5 w-5" />
              <span>Workplace Wellness</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#FB923C]/20 hover:bg-[#FB923C]/10 h-auto py-4 flex flex-col gap-2 text-white"
              onClick={() => handleQuickAccess("Leadership Support")}
            >
              <HandHeart className="h-5 w-5" />
              <span>Leadership Support</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#F97316]/20 hover:bg-[#F97316]/10 h-auto py-4 flex flex-col gap-2 text-white"
              onClick={() => handleQuickAccess("Team Resources")}
            >
              <Users className="h-5 w-5" />
              <span>Team Resources</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#FB923C]/20 hover:bg-[#FB923C]/10 h-auto py-4 flex flex-col gap-2 text-white"
              onClick={() => handleQuickAccess("Self-Care Guide")}
            >
              <LifeBuoy className="h-5 w-5" />
              <span>Self-Care Guide</span>
            </Button>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mt-8 bg-gradient-to-r from-[#F97316]/5 to-[#FB923C]/5 p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-[#F97316]" />
            <span>Entrepreneur Stories</span>
          </h3>
          
          <div className="italic text-white font-medium border-l-2 border-[#F97316]/30 pl-4">
            "The entrepreneur support group helped me realize I wasn't alone in facing these challenges. 
            Having a space to talk with others who understand the unique pressures of running a business 
            has been invaluable for my mental health."
            <div className="mt-2 text-sm text-white/80">— Owner, Local Retail Business</div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SmallBusinessExperience;
