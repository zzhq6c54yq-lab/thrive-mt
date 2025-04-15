
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, Megaphone, BookOpen, Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Create schema for form validation
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  type: z.string(),
  date: z.date(),
  time: z.string(),
  duration: z.string(),
  location: z.string(),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  maxParticipants: z.string().optional(),
  materials: z.string().optional(),
  contactEmail: z.string().email({ message: "Please enter a valid email" }),
});

const UserLead: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("create");
  const [submissions, setSubmissions] = useState<any[]>([]);

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "workshop",
      date: new Date(),
      time: "13:00",
      duration: "60",
      location: "",
      description: "",
      maxParticipants: "10",
      materials: "",
      contactEmail: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    
    // Add submission to list
    setSubmissions([
      {
        id: Date.now().toString(),
        status: "pending",
        ...values,
      },
      ...submissions,
    ]);
    
    // Show success toast
    toast({
      title: "Activity Submitted",
      description: "Your activity has been submitted for review.",
      duration: 3000,
    });
    
    // Reset form
    form.reset();
    
    // Switch to My Submissions tab
    setActiveTab("submissions");
  };

  return (
    <Page title="User Lead" showBackButton={true}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-600 mb-2">User Lead</h1>
          <p className="text-gray-600">
            Share your expertise by creating workshops, meetings, and activities for the community.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              <span>Create Activity</span>
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>My Submissions</span>
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Browse Activities</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="pt-2">
            <Card className="border-purple-100 shadow-md">
              <CardHeader>
                <CardTitle>Create a New Activity</CardTitle>
                <CardDescription>
                  Share your knowledge and skills with others by hosting an activity.
                  All submissions will be reviewed before being published.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Activity Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter a clear title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Activity Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="workshop">Workshop</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                                <SelectItem value="discussion">Discussion</SelectItem>
                                <SelectItem value="exercise">Exercise Session</SelectItem>
                                <SelectItem value="social">Social Gathering</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <FormControl>
                              <Input type="number" min="15" step="5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Virtual or physical location" {...field} />
                          </FormControl>
                          <FormDescription>
                            For virtual meetings, enter "Virtual" or the platform name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your activity in detail" 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Explain what participants will learn or experience.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="maxParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Participants</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="materials"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Materials Needed</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List any materials participants should bring" 
                              className="min-h-[80px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end pt-2">
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                        Submit Activity
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="submissions">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                {submissions.length === 0 ? (
                  <div className="py-12">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-medium text-gray-500">No submissions yet</h3>
                    <p className="text-gray-400 mt-2 mb-6">
                      Create your first activity to see it listed here.
                    </p>
                    <Button 
                      onClick={() => setActiveTab("create")} 
                      variant="outline"
                      className="text-purple-600 border-purple-600 hover:bg-purple-50"
                    >
                      Create an Activity
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 text-left mb-4">
                      Your Submissions
                    </h2>
                    
                    {submissions.map((submission) => (
                      <Card key={submission.id} className="border-purple-100 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">
                                {submission.title}
                              </h3>
                              <div className="flex items-center mt-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="mr-4">
                                  {format(submission.date, "MMMM d, yyyy")}
                                </span>
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{submission.time}</span>
                              </div>
                              <p className="mt-2 text-gray-600 line-clamp-2">{submission.description}</p>
                            </div>
                            
                            <span className={`px-3 py-1 rounded-full text-xs font-medium 
                              ${submission.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                submission.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {submission.status === 'approved' ? 'Approved' : 
                               submission.status === 'rejected' ? 'Declined' : 'Pending Review'}
                            </span>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="browse">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-500">Community Activities</h3>
              <p className="text-gray-400 mt-2 mb-6">
                Approved user-led activities will appear here. Check back soon!
              </p>
              <Button 
                onClick={() => setActiveTab("create")} 
                variant="outline"
                className="text-purple-600 border-purple-600 hover:bg-purple-50"
              >
                Create an Activity
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default UserLead;
