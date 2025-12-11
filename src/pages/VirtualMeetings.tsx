
import React, { useState } from "react";
import Page from "@/components/Page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Meeting } from "@/components/ScheduleCard";
import ScheduleCard from "@/components/ScheduleCard";
import { format, addDays, startOfDay, addHours, addMinutes } from "date-fns";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const generateMeetings = (): Meeting[] => {
  const meetings: Meeting[] = [];
  const today = startOfDay(new Date());
  
  const classNames = [
    "Mindfulness Meditation", 
    "Stress Management", 
    "Anxiety Reduction", 
    "Depression Coping Skills", 
    "Self-Compassion Workshop",
    "Emotional Intelligence",
    "Healthy Boundaries",
    "Grief Support",
    "Trauma Recovery",
    "Sleep Improvement"
  ];
  
  const aaMeetings = [
    "New Beginnings AA", 
    "Serenity Group", 
    "First Step AA", 
    "Recovery Path", 
    "One Day at a Time",
    "Freedom Group",
    "Hope & Recovery",
    "Living Sober",
    "Courage to Change",
    "Spiritual Awakening"
  ];
  
  const classDescriptions = [
    "Learn practical mindfulness techniques for everyday life.",
    "Develop strategies to manage stress in healthy ways.",
    "Techniques to reduce anxiety and panic symptoms.",
    "Evidence-based approaches to managing depression.",
    "Build self-compassion skills for better mental health.",
    "Strengthen your emotional intelligence through guided exercises.",
    "Learn to set and maintain healthy boundaries in relationships.",
    "A supportive environment to process grief and loss.",
    "Tools and techniques for trauma recovery and healing.",
    "Improve your sleep quality with proven methods."
  ];
  
  const aaDescriptions = [
    "Open discussion meeting focusing on the first step of recovery.",
    "Share experiences, strength and hope in a supportive environment.",
    "For newcomers and those returning to the program.",
    "Discussion centered around daily living in sobriety.",
    "Focus on maintaining sobriety one day at a time.",
    "Celebrating freedom from addiction through the 12 steps.",
    "Building hope through shared experiences in recovery.",
    "Practical discussions about living a sober life.",
    "Finding courage through fellowship and the 12 steps.",
    "Exploring the spiritual aspects of recovery."
  ];
  
  for (let day = 0; day < 7; day++) {
    const currentDay = addDays(today, day);
    
    for (let hour = 8; hour <= 18; hour += 2) {
      if (Math.random() > 0.3) {
        const startTime = addHours(currentDay, hour);
        const randomClassIndex = Math.floor(Math.random() * classNames.length);
        const availableSpots = Math.floor(Math.random() * 15) + 1;
        const totalSpots = 15;
        
        meetings.push({
          id: `class-${day}-${hour}`,
          title: classNames[randomClassIndex],
          type: "class",
          startTime,
          duration: 30,
          availableSpots,
          totalSpots,
          description: classDescriptions[randomClassIndex]
        });
      }
    }
    
    for (let hour = 9; hour <= 21; hour += 3) {
      if (Math.random() > 0.4) {
        const startTime = addHours(currentDay, hour);
        const randomAAIndex = Math.floor(Math.random() * aaMeetings.length);
        const availableSpots = Math.floor(Math.random() * 20) + 1;
        const totalSpots = 20;
        
        meetings.push({
          id: `aa-${day}-${hour}`,
          title: aaMeetings[randomAAIndex],
          type: "aa",
          startTime,
          duration: 60,
          availableSpots,
          totalSpots,
          description: aaDescriptions[randomAAIndex]
        });
      }
    }
    
    if (Math.random() > 0.5) {
      const startTime = addHours(currentDay, 19);
      const randomAAIndex = Math.floor(Math.random() * aaMeetings.length);
      const availableSpots = Math.floor(Math.random() * 20) + 1;
      const totalSpots = 20;
      
      meetings.push({
        id: `na-${day}-19`,
        title: `${aaMeetings[randomAAIndex]} (NA)`,
        type: "na",
        startTime,
        duration: 60,
        availableSpots,
        totalSpots,
        description: aaDescriptions[randomAAIndex].replace("addiction", "substance use")
      });
    }
  }
  
  return meetings.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
};

const VirtualMeetings = () => {
  const allMeetings = generateMeetings();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [meetingType, setMeetingType] = useState<string>("all");
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredMeetings = allMeetings.filter(meeting => {
    const isSameDate = date ? 
      meeting.startTime.getDate() === date.getDate() && 
      meeting.startTime.getMonth() === date.getMonth() && 
      meeting.startTime.getFullYear() === date.getFullYear() : true;
    
    const matchesType = meetingType === "all" || meeting.type === meetingType;
    
    return isSameDate && matchesType;
  });
  
  const groupedMeetings: Record<string, Meeting[]> = {};
  
  filteredMeetings.forEach(meeting => {
    const timeKey = format(meeting.startTime, "h:mm a");
    if (!groupedMeetings[timeKey]) {
      groupedMeetings[timeKey] = [];
    }
    groupedMeetings[timeKey].push(meeting);
  });
  
  const timeSlots = Object.keys(groupedMeetings).sort((a, b) => {
    const timeA = new Date(`01/01/2022 ${a}`);
    const timeB = new Date(`01/01/2022 ${b}`);
    return timeA.getTime() - timeB.getTime();
  });
  
  const handleJoinMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowMeetingDialog(true);
  };
  
  const handleBack = () => {
    navigate("/app/dashboard");
  };
  
  const handleConfirmJoin = () => {
    if (selectedMeeting) {
      toast({
        title: "Meeting Joined!",
        description: `You've successfully joined ${selectedMeeting.title}. A confirmation email has been sent with meeting details.`,
      });
      setShowMeetingDialog(false);
    }
  };
  
  return (
    <Page title="Thrive MT Virtual Classes & Meetings" showBackButton={true} onBackClick={handleBack}>
      <div className="mb-8">
        <p className="text-gray-600 mb-6">
          Join live virtual classes and support group meetings from the comfort of your home. 
          All sessions are led by certified facilitators and mental health professionals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Select Date</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Meeting Type</h3>
                  <Select value={meetingType} onValueChange={setMeetingType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="class">Mental Health Classes</SelectItem>
                      <SelectItem value="aa">AA Meetings</SelectItem>
                      <SelectItem value="na">NA Meetings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <h3 className="text-sm font-medium mb-2">About Our Virtual Meetings</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <p className="text-sm">Classes are 30 minutes, support groups are 60 minutes</p>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <p className="text-sm">Limited spots available to ensure quality interactions</p>
                </div>
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <p className="text-sm">New sessions added daily in 30-minute increments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {timeSlots.length > 0 ? (
          <div className="space-y-10">
            {timeSlots.map(timeSlot => (
              <div key={timeSlot}>
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  {timeSlot}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedMeetings[timeSlot].map(meeting => (
                    <ScheduleCard 
                      key={meeting.id} 
                      meeting={meeting} 
                      onJoin={() => handleJoinMeeting(meeting)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium mb-2">No meetings available</h3>
            <p className="text-gray-500">
              Try selecting a different date or meeting type.
            </p>
          </div>
        )}
      </div>
      
      <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMeeting?.title}</DialogTitle>
            <DialogDescription>
              {selectedMeeting?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Meeting Details</h3>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Time:</span> {selectedMeeting && format(selectedMeeting.startTime, "PPP")} at {selectedMeeting && format(selectedMeeting.startTime, "h:mm a")}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Duration:</span> {selectedMeeting?.duration} minutes
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Available Spots:</span> {selectedMeeting?.availableSpots} out of {selectedMeeting?.totalSpots}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">What to Expect</h3>
              <p className="text-sm text-gray-500">
                This session includes discussions, sharing opportunities, and resources designed to support your recovery journey. You'll be able to interact with the facilitator and other participants in a confidential, supportive environment.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMeetingDialog(false)}>
              Cancel
            </Button>
            <Button variant="gold" onClick={handleConfirmJoin}>
              Confirm & Join
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Page>
  );
};

export default VirtualMeetings;
