
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { workshopData } from "@/data/workshopData";
import { useToast } from "@/hooks/use-toast";
import { Award, BookOpen, CheckCircle, Clock, Download, FileText, Play, User, Video } from "lucide-react";
import { downloadWorksheet } from "@/utils/worksheetUtils";

const WorkshopDetail = () => {
  const { workshopId } = useParams<{ workshopId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "overview"
  );

  const workshop = workshopData.find(w => w.id === workshopId);
  
  useEffect(() => {
    if (location.state?.activeTab === "workshop") {
      setActiveTab("workshop");
      toast({
        title: "Workshop Ready",
        description: "Your workshop content is ready to begin",
        duration: 2000,
      });
    }
  }, [location.state?.activeTab, toast]);

  const handlePlayVideo = () => {
    setActiveTab("workshop");
    toast({
      title: "Starting Workshop",
      description: "Loading workshop video content",
      duration: 2000,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDownloadWorksheet = () => {
    if (workshopId) {
      downloadWorksheet(workshopId, { toast });
    }
  };

  if (!workshop) {
    return (
      <Page title="Workshop Not Found" showBackButton={true} onBackClick={handleBack}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Workshop Not Found</h2>
          <p className="mb-6">The workshop you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/app/workshops")}>
            Return to Workshops
          </Button>
        </div>
      </Page>
    );
  }

  const getVideoUrl = (workshopId: string) => {
    // Comprehensive mapping of workshop IDs to relevant video content
    const videoMap: {[key: string]: string} = {
      'mindful-communication': 'https://player.vimeo.com/video/305501304?autoplay=1&title=0&byline=0&portrait=0',
      'emotional-regulation': 'https://player.vimeo.com/video/139195467?autoplay=1&title=0&byline=0&portrait=0',
      'stress-management': 'https://player.vimeo.com/video/456646308?autoplay=1&title=0&byline=0&portrait=0',
      'better-sleep': 'https://player.vimeo.com/video/347119375?autoplay=1&title=0&byline=0&portrait=0',
      'cognitive-reframing': 'https://player.vimeo.com/video/528293631?autoplay=1&title=0&byline=0&portrait=0',
      'gratitude-practice': 'https://player.vimeo.com/video/437194835?autoplay=1&title=0&byline=0&portrait=0',
      'self-compassion': 'https://player.vimeo.com/video/420252733?autoplay=1&title=0&byline=0&portrait=0',
      'social-connection': 'https://player.vimeo.com/video/522948060?autoplay=1&title=0&byline=0&portrait=0',
      'anxiety-management': 'https://player.vimeo.com/video/248736159?autoplay=1&title=0&byline=0&portrait=0',
      'boundary-setting': 'https://player.vimeo.com/video/231354112?autoplay=1&title=0&byline=0&portrait=0',
      'values-alignment': 'https://player.vimeo.com/video/286898202?autoplay=1&title=0&byline=0&portrait=0',
      'habit-formation': 'https://player.vimeo.com/video/418701977?autoplay=1&title=0&byline=0&portrait=0',
      // Additional videos for comprehensive coverage
      'transition': 'https://player.vimeo.com/video/393832542?autoplay=1&title=0&byline=0&portrait=0',
      'entrepreneurial-resilience': 'https://player.vimeo.com/video/362419242?autoplay=1&title=0&byline=0&portrait=0',
      'wellness-focused-team': 'https://player.vimeo.com/video/255054693?autoplay=1&title=0&byline=0&portrait=0'
    };
    
    // Return the video URL if it exists, otherwise use a default inspirational video
    // that aligns with mental wellness themes
    return videoMap[workshopId] || 'https://player.vimeo.com/video/459715923?autoplay=1&title=0&byline=0&portrait=0';
  };

  const getWorkshopImage = (workshopId: string) => {
    const imageMap: {[key: string]: string} = {
      'mindful-communication': '1581091226825-a6a2a5aee158',
      'emotional-regulation': '1649972904349-6e44c42644a7',
      'stress-management': '1488590528505-98d2b5aba04b',
      'better-sleep': '1465146344425-f00d5f5c8f07',
      'cognitive-reframing': '1506744038136-46273834b3fb',
      'gratitude-practice': '1509316975850-ff9c5deb0cd9',
      'self-compassion': '1500673922987-e212871fec22',
      'social-connection': '1523712999610-f77fbcfc3843',
      'anxiety-management': '1501854140801-50d01698950b',
      'boundary-setting': '1615729947596-a598e5de0ab3',
      'values-alignment': '1543618903355-efbc3e8e9284',
      'habit-formation': '1517048676732-d65bc937f952',
      // Additional images for comprehensive coverage
      'transition': '1486312338219-ce68d2c6f44d',
      'entrepreneurial-resilience': '1517245386807-bb43f82c33c4',
      'wellness-focused-team': '1522071820081-009f0129c71c'
    };
    
    return `https://images.unsplash.com/photo-${imageMap[workshopId] || '1486312338219-ce68d2c6f44d'}`;
  };

  return (
    <Page 
      title={workshop.title} 
      showBackButton={true} 
      onBackClick={handleBack}
    >
      <div className="space-y-6 pb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3 space-y-4">
            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="workshop">Workshop</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="aspect-video relative overflow-hidden rounded-lg bg-black">
                    <img 
                      src={getWorkshopImage(workshopId || '')}
                      alt={workshop.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        onClick={handlePlayVideo} 
                        size="lg"
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full h-16 w-16 flex items-center justify-center"
                      >
                        <Play className="h-8 w-8 text-white" />
                      </Button>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-xl font-bold text-white">{workshop.title}</h3>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{workshop.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-3">{workshop.title}</h2>
                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                      {workshop.description}
                    </p>
                    
                    <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Evidence-based techniques for {workshop.title.toLowerCase()}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>How to incorporate these skills into your daily life</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Practical exercises to reinforce your learning</span>
                      </li>
                    </ul>
                    
                    <Button 
                      onClick={() => setActiveTab("workshop")} 
                      className="w-full md:w-auto flex items-center justify-center gap-2"
                    >
                      <Video className="h-4 w-4" />
                      Begin Workshop
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="workshop">
                  <div>
                    <div className="aspect-video md:mb-4 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                      <iframe
                        src={getVideoUrl(workshopId || '')}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={workshop.title}
                      ></iframe>
                    </div>
                    
                    <div className="mt-4 space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{workshop.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Follow along with this guided workshop. Feel free to pause the video 
                          whenever you need to practice the techniques.
                        </p>
                      </div>
                      
                      <div className="space-y-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold">Workshop Notes</h4>
                        <ul className="space-y-2">
                          <li>Find a quiet, comfortable space where you won't be disturbed</li>
                          <li>Have paper and pen nearby if you'd like to take notes</li>
                          <li>Remember there's no "right way" to experience this workshop</li>
                        </ul>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2"
                          onClick={handleDownloadWorksheet}
                        >
                          <Download className="h-4 w-4" />
                          Download Worksheet
                        </Button>
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <Button 
                          variant="ghost" 
                          className="flex items-center gap-2"
                          onClick={() => setActiveTab("resources")}
                        >
                          <FileText className="h-4 w-4" />
                          View Additional Resources
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-3">Additional Resources</h3>
                      <p className="mb-4 text-gray-700 dark:text-gray-300">
                        Explore these resources to deepen your understanding and practice.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <BookOpen className="h-5 w-5" />
                              <span>Recommended Reading</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              <li className="text-sm">
                                <span className="font-medium">Book Title:</span> The Mind-Body Connection
                              </li>
                              <li className="text-sm">
                                <span className="font-medium">Article:</span> Latest Research on {workshop.title}
                              </li>
                              <li className="text-sm">
                                <span className="font-medium">Guide:</span> Daily Practice Workbook
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Video className="h-5 w-5" />
                              <span>Related Workshops</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              <li className="text-sm hover:text-indigo-600 cursor-pointer">
                                Intro to Mindfulness
                              </li>
                              <li className="text-sm hover:text-indigo-600 cursor-pointer">
                                Stress Reduction Techniques
                              </li>
                              <li className="text-sm hover:text-indigo-600 cursor-pointer">
                                Building Emotional Resilience
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          <span>Complete Your Workshop</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-sm">
                          Ready to mark this workshop as completed and earn your certificate?
                        </p>
                        <Button 
                          className="w-full"
                          onClick={() => {
                            toast({
                              title: "Workshop Completed",
                              description: "Congratulations! Your progress has been saved.",
                              duration: 3000,
                            });
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Completed
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          <div className="w-full md:w-1/3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workshop Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-gray-500">{workshop.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Instructor</p>
                    <p className="text-sm text-gray-500">Dr. Henry Thompson</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-sm text-gray-500">Mental Wellness</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleDownloadWorksheet}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Materials
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  If you have any questions or need assistance with this workshop, our support team is here to help.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/contact")}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default WorkshopDetail;
