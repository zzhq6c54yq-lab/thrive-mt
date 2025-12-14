import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, Clock, Filter, Search, User, ArrowLeft, 
  ChevronDown, Check, Star, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HomeButton from "@/components/HomeButton";
import { useToast } from "@/hooks/use-toast";
import { downloadWorksheet } from "@/utils/worksheetUtils";

const workshopCategories = [
  "PTSD & Trauma",
  "Mindfulness",
  "Transition",
  "Family Support",
  "Substance Recovery",
  "Depression & Anxiety"
];

const workshops = [
  {
    id: 1,
    title: "Combat Stress Management",
    description: "Learn effective techniques to manage stress related to combat experiences and PTSD symptoms.",
    date: "June 15, 2025",
    time: "2:00 PM - 3:30 PM ET",
    instructor: "Col. James Wilson, Ret.",
    category: "PTSD & Trauma",
    featured: true,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-exercising-in-a-gym-23458-large.mp4"
  },
  {
    id: 2,
    title: "Mindfulness for Veterans",
    description: "A guided introduction to mindfulness practices specifically adapted for veterans and military personnel.",
    date: "June 18, 2025",
    time: "1:00 PM - 2:00 PM ET",
    instructor: "Dr. Sarah Miller",
    category: "Mindfulness",
    featured: true,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-meditating-in-nature-4793-large.mp4"
  },
  {
    id: 3,
    title: "Transitioning to Civilian Life",
    description: "Navigate the challenges of transitioning from military to civilian life with confidence and purpose.",
    date: "June 22, 2025",
    time: "3:00 PM - 4:30 PM ET",
    instructor: "Maj. Robert Johnson, Ret.",
    category: "Transition",
    featured: true,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-professional-man-working-from-home-on-a-laptop-54-large.mp4"
  },
  {
    id: 4,
    title: "Trauma-Informed Yoga",
    description: "A gentle yoga practice designed for individuals with trauma, focusing on grounding and self-regulation.",
    date: "June 25, 2025",
    time: "11:00 AM - 12:00 PM ET",
    instructor: "Capt. Lisa Thompson, Ret.",
    category: "PTSD & Trauma",
    featured: false,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-stretching-and-exercising-in-a-studio-4823-large.mp4"
  },
  {
    id: 5,
    title: "Military Families: Communication Skills",
    description: "Strengthen communication within military families, addressing the unique challenges they face.",
    date: "June 28, 2025",
    time: "4:00 PM - 5:30 PM ET",
    instructor: "Dr. Michael Chen",
    category: "Family Support",
    featured: false,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-happy-family-doing-a-video-call-at-christmas-dinner-39882-large.mp4"
  },
  {
    id: 6,
    title: "Veterans Recovery Support Group",
    description: "A supportive environment for veterans dealing with substance use issues related to service.",
    date: "July 2, 2025",
    time: "6:00 PM - 7:30 PM ET",
    instructor: "Sgt. Thomas Brown, Ret.",
    category: "Substance Recovery",
    featured: false,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-group-of-young-people-having-coffee-and-working-on-laptops-42906-large.mp4"
  },
  {
    id: 7,
    title: "Managing Depression After Service",
    description: "Strategies and support for veterans experiencing depression following their military service.",
    date: "July 5, 2025",
    time: "1:00 PM - 2:30 PM ET",
    instructor: "Dr. Amanda Rodriguez",
    category: "Depression & Anxiety",
    featured: false,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-meditating-under-a-tree-in-yellowstone-national-park-4877-large.mp4"
  },
  {
    id: 8,
    title: "Career Transition Workshop",
    description: "Practical guidance on translating military skills to civilian career opportunities.",
    date: "July 8, 2025",
    time: "10:00 AM - 12:00 PM ET",
    instructor: "Lt. Col. David Park, Ret.",
    category: "Transition",
    featured: false,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-meeting-in-an-office-with-four-people-4823-large.mp4"
  }
];

const WorkshopCard = ({ 
  workshop, 
  featured = false,
  onRegister,
  onWatchPreview
}) => {
  return (
    <Card className={`
      bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] 
      border ${workshop.featured ? 'border-[#B87333]/30' : 'border-white/10'} 
      text-white transition-all duration-300 
      hover:shadow-lg hover:translate-y-[-5px]
      ${workshop.featured ? 'shadow-[0_0_10px_rgba(184,115,51,0.2)]' : ''}
    `}>
      <CardHeader className="pb-2">
        <div className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium py-1 px-2 rounded-full w-fit mb-2">
          {workshop.category}
        </div>
        <CardTitle className="text-white">{workshop.title}</CardTitle>
        <CardDescription className="text-gray-300 mt-2">
          {workshop.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-gray-300 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-[#B87333]" />
            <span>{workshop.date}</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="h-4 w-4 mr-2 text-[#B87333]" />
            <span>{workshop.time}</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <User className="h-4 w-4 mr-2 text-[#B87333]" />
            <span>{workshop.instructor}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          variant={workshop.featured ? "gold" : "bronze"} 
          className="w-full"
          onClick={onRegister}
        >
          Register Now
        </Button>
        <Button
          variant="outline"
          className="w-full border-white/20 text-white/80 hover:bg-white/10"
          onClick={onWatchPreview}
        >
          Watch Preview
        </Button>
      </CardFooter>
    </Card>
  );
};

const MilitaryWorkshops = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<(typeof workshops)[0] | null>(null);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(workshop.category);
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleRegisterWorkshop = (workshop: (typeof workshops)[0]) => {
    setSelectedWorkshop(workshop);
    setShowRegistrationDialog(true);
  };

  const handleConfirmRegistration = () => {
    if (selectedWorkshop) {
      toast({
        title: "Registration Successful",
        description: `You've been registered for ${selectedWorkshop.title}. Check your email for details.`,
        duration: 3000
      });
      setShowRegistrationDialog(false);
      
      const workshopIdMap: Record<number, string> = {
        1: "stress-management",
        2: "mindful-communication",
        3: "transition",
        4: "self-compassion",
        5: "social-connection",
        6: "better-sleep",
        7: "self-compassion",
        8: "transition"
      };
      
      const workshopId = workshopIdMap[selectedWorkshop.id] || "default";
      downloadWorksheet(workshopId, toast);
    }
  };

  const handleRequestWorkshop = () => {
    toast({
      title: "Workshop Request Submitted",
      description: "Thank you for your request. Our team will contact you within 48 hours.",
      duration: 3000
    });
  };
  
  const handleWatchPreview = (workshop: (typeof workshops)[0]) => {
    setSelectedWorkshop(workshop);
    setShowVideoPreview(true);
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      <div className="bg-gradient-to-r from-[#0A1929] to-[#1A365D] py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/app/military-support" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Military Support
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Mental Health Workshops</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Join our specialized workshops designed for military personnel, veterans, and their families. All workshops are led by qualified professionals with military experience.
          </p>
        </div>
      </div>
      
      <div className="bg-[#0F2942] border-y border-white/10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-10 bg-[#1c2e4a] border-white/10 text-white w-full md:w-80"
                placeholder="Search workshops..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 items-center w-full md:w-auto justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-[#1c2e4a] border-white/10 text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter by Category
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#1c2e4a] border-white/10 text-white">
                  <DropdownMenuLabel>Workshop Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {workshopCategories.map(category => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {selectedCategories.length > 0 && (
                <Button 
                  variant="ghost" 
                  className="text-[#B87333] hover:text-[#B87333]/80 hover:bg-white/5"
                  onClick={() => setSelectedCategories([])}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#B87333] mb-6 flex items-center">
          <Star className="mr-2 h-5 w-5" />
          Featured Workshops
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredWorkshops.filter(w => w.featured).map(workshop => (
            <WorkshopCard 
              key={workshop.id}
              workshop={workshop}
              onRegister={() => handleRegisterWorkshop(workshop)}
              onWatchPreview={() => handleWatchPreview(workshop)}
            />
          ))}
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-6">All Upcoming Workshops</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.length > 0 ? (
            filteredWorkshops.map(workshop => (
              <WorkshopCard 
                key={workshop.id}
                workshop={workshop}
                onRegister={() => handleRegisterWorkshop(workshop)}
                onWatchPreview={() => handleWatchPreview(workshop)}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12 bg-[#1c2e4a]/50 rounded-lg border border-white/10">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No Workshops Found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filters to find workshops.
              </p>
              <Button 
                variant="ghost" 
                className="mt-4 text-[#B87333]"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategories([]);
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-[#B87333]/20 to-transparent p-8 rounded-lg border border-[#B87333]/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Don't See What You Need?</h3>
              <p className="text-gray-300">
                Request a specific workshop topic or theme that would support your mental health journey.
              </p>
            </div>
            
            <Button 
              variant="gold" 
              size="lg"
              onClick={handleRequestWorkshop}
            >
              Request a Workshop
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="bg-[#0F2942] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            All workshops are confidential and free for military personnel, veterans, and their families.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              to="/app/military-support" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Military Support Home
            </Link>
            <Link 
              to="/contact" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
      
      <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
        <DialogContent className="bg-[#1a1a2e] border-[#3a3a4c] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Register for Workshop</DialogTitle>
            <DialogDescription className="text-gray-300">
              Complete your registration for {selectedWorkshop?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 py-4">
            <div className="bg-[#2a2a3c]/50 p-4 rounded-md space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Calendar className="h-4 w-4 mr-2 text-[#B87333]" />
                <span>{selectedWorkshop?.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Clock className="h-4 w-4 mr-2 text-[#B87333]" />
                <span>{selectedWorkshop?.time}</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <User className="h-4 w-4 mr-2 text-[#B87333]" />
                <span>{selectedWorkshop?.instructor}</span>
              </div>
            </div>
            
            <p className="text-white/80">
              By registering, you'll receive:
            </p>
            
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Check className="h-4 w-4 mr-2 text-emerald-400" />
                <span>Access to live workshop session</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-4 w-4 mr-2 text-emerald-400" />
                <span>Workshop materials and resources</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-4 w-4 mr-2 text-emerald-400" />
                <span>Recording of the session (if permitted)</span>
              </li>
            </ul>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setShowRegistrationDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="gold"
              className="w-full sm:w-auto"
              onClick={handleConfirmRegistration}
            >
              Confirm Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showVideoPreview} onOpenChange={setShowVideoPreview}>
        <DialogContent className="bg-[#1a1a2e] border-[#3a3a4c] text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Workshop Preview: {selectedWorkshop?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="w-full aspect-video bg-black/50 rounded-md overflow-hidden">
            {selectedWorkshop?.videoUrl && (
              <video 
                src={selectedWorkshop.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setShowVideoPreview(false)}
            >
              Close Preview
            </Button>
            <Button 
              variant="gold"
              onClick={() => {
                setShowVideoPreview(false);
                if (selectedWorkshop) {
                  handleRegisterWorkshop(selectedWorkshop);
                }
              }}
            >
              Register Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MilitaryWorkshops;
