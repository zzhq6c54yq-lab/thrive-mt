
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, CheckCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Scheduling = () => {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const therapists = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Anxiety & Depression", available: true },
    { id: 2, name: "Dr. Michael Chen", specialty: "Trauma Recovery", available: true },
    { id: 3, name: "Dr. Amara Patel", specialty: "Family Therapy", available: false },
    { id: 4, name: "Dr. Robert Williams", specialty: "Cognitive Behavioral Therapy", available: true },
  ];
  
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer transition-colors
            ${isToday ? 'border border-[#B87333]' : ''}
            ${isSelected ? 'bg-[#B87333] text-white' : 'hover:bg-[#B87333]/10'}
          `}
          onClick={() => setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Incomplete Selection",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment has been scheduled for ${selectedDate.toDateString()} at ${selectedTime}.`,
    });
    
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-[#1a1a1f] text-white py-12 relative overflow-hidden">
        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Flexible Scheduling</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Book therapy sessions at times that work for you, with reminders and easy rescheduling options.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="therapists">Find Therapists</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-[#B87333]/30">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-light flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#B87333]" />
                      Select a Date
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={handlePrevMonth}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={handleNextMonth}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-[#B87333]/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-light flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#B87333]" />
                    Select a Time
                  </CardTitle>
                  <CardDescription className="text-base">
                    {selectedDate ? selectedDate.toDateString() : "Please select a date first"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {timeSlots.map(time => (
                        <div 
                          key={time}
                          className={`p-3 border rounded-md text-center cursor-pointer transition-colors
                            ${selectedTime === time ? 'bg-[#B87333] text-white border-[#B87333]' : 'hover:bg-[#B87333]/10 border-gray-200'}
                          `}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Please select a date to view available time slots
                    </div>
                  )}
                  
                  {selectedDate && selectedTime && (
                    <Button 
                      className="w-full mt-6 bg-[#B87333] hover:bg-[#A56625]"
                      onClick={handleSchedule}
                    >
                      Schedule Appointment
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="therapists" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {therapists.map(therapist => (
                <Card key={therapist.id} className={`border-[#B87333]/30 ${!therapist.available ? 'opacity-70' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{therapist.name}</CardTitle>
                        <CardDescription className="text-base">{therapist.specialty}</CardDescription>
                      </div>
                      {therapist.available ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Available
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center">
                          <X className="h-3 w-3 mr-1" />
                          Booked
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Dr. {therapist.name.split(' ')[1]} specializes in {therapist.specialty.toLowerCase()} and has over 10 years of experience helping patients overcome mental health challenges.
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                      >
                        View Profile
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-[#B87333] hover:bg-[#A56625]"
                        disabled={!therapist.available}
                      >
                        Book Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="animate-fade-in">
            <Card className="border-[#B87333]/30 mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-light flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#B87333]" />
                  Your Upcoming Sessions
                </CardTitle>
                <CardDescription>
                  Manage your scheduled therapy appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-[#B87333]/20 rounded-lg bg-[#B87333]/5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Session with Dr. Sarah Johnson</h3>
                        <p className="text-sm text-gray-600">Anxiety & Depression</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Upcoming
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Tomorrow</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>10:00 AM</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Reschedule
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[#B87333] border-[#B87333] hover:bg-[#B87333]/10"
                      >
                        Join Early
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Session with Dr. Robert Williams</h3>
                        <p className="text-sm text-gray-600">Cognitive Behavioral Therapy</p>
                      </div>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Next Week
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Tuesday, Jun 22</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>2:00 PM</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-gray-600 border-gray-200"
                      >
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center mt-8">
              <Button 
                className="bg-[#B87333] hover:bg-[#A56625]"
                onClick={() => toast({
                  title: "Scheduling Assistant",
                  description: "Our scheduling assistant is here to help you find the perfect time for your therapy sessions."
                })}
              >
                Schedule a New Session
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Scheduling;
