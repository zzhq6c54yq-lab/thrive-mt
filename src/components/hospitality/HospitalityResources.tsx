
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink, BookOpen, Coffee, UserRoundCheck, Clock, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HospitalityResources: React.FC = () => {
  const { toast } = useToast();
  
  const handleDownload = (title: string) => {
    toast({
      title: "Downloading Resource",
      description: `${title} is being prepared for download`,
      duration: 2000,
    });
    
    // Simulate download completion
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${title} has been downloaded successfully`,
        duration: 2000,
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Hospitality Wellness Resources</h2>
        <p className="text-white/70">
          Specialized resources to support your mental wellbeing in the restaurant and hospitality industry
        </p>
      </div>
      
      {/* Featured Guides */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-500" />
          Featured Guides
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 border-purple-200 dark:border-purple-900">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Managing Difficult Customer Interactions</span>
                <UserRoundCheck className="h-5 w-5 text-purple-500" />
              </CardTitle>
              <CardDescription>Strategies for staying calm under pressure</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/60">
                Learn effective techniques to handle challenging customer situations while maintaining your emotional wellbeing.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleDownload("Managing Difficult Customer Interactions Guide")}
              >
                <Download className="h-4 w-4" /> Download Guide
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10 border-purple-200 dark:border-purple-900">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Body Mechanics for Service Work</span>
                <Utensils className="h-5 w-5 text-purple-500" />
              </CardTitle>
              <CardDescription>Preventing physical strain and injury</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/60">
                Practical techniques to reduce physical strain during long shifts, including proper posture and movement patterns.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleDownload("Body Mechanics for Service Work Guide")}
              >
                <Download className="h-4 w-4" /> Download Guide
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10 border-purple-200 dark:border-purple-900">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Navigating Irregular Schedules</span>
                <Clock className="h-5 w-5 text-purple-500" />
              </CardTitle>
              <CardDescription>Maintaining sleep quality and personal time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/60">
                Strategies for maintaining work-life balance and healthy sleep patterns despite irregular or late-night shifts.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleDownload("Navigating Irregular Schedules Guide")}
              >
                <Download className="h-4 w-4" /> Download Guide
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Wellness Articles */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-500" />
          Industry Wellness Articles
        </h3>
        
        <div className="space-y-4">
          <Card className="bg-white/10">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">Managing Tip-Based Income Stress</h4>
                  <p className="text-sm text-white/60 mt-1">
                    Financial wellbeing strategies for service industry professionals
                  </p>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 dark:text-purple-400"
                  onClick={() => handleDownload("Managing Tip-Based Income Stress Article")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">The Emotional Labor of Service Work</h4>
                  <p className="text-sm text-white/60 mt-1">
                    Understanding and managing the hidden emotional demands of hospitality roles
                  </p>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 dark:text-purple-400"
                  onClick={() => handleDownload("The Emotional Labor of Service Work Article")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">Building Supportive Kitchen Culture</h4>
                  <p className="text-sm text-white/60 mt-1">
                    Creating mentally healthy work environments in high-pressure kitchens
                  </p>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 dark:text-purple-400"
                  onClick={() => handleDownload("Building Supportive Kitchen Culture Article")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">Substance Use in the Hospitality Industry</h4>
                  <p className="text-sm text-white/60 mt-1">
                    Recognizing warning signs and finding healthier coping mechanisms
                  </p>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 dark:text-purple-400"
                  onClick={() => handleDownload("Substance Use in the Hospitality Industry Article")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Quick Practices */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
          <Coffee className="h-5 w-5 text-purple-500" />
          Quick Break Practices
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-purple-200 dark:border-purple-900">
            <CardContent className="p-6">
              <h4 className="font-medium text-white mb-2">2-Minute Reset</h4>
              <p className="text-sm text-white/70 mb-4">
                A quick mindfulness practice you can do during short breaks
              </p>
              <Button 
                className="w-full bg-white hover:bg-gray-100 text-purple-600"
                onClick={() => handleDownload("2-Minute Reset Audio Guide")}
              >
                Start Practice
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-900">
            <CardContent className="p-6">
              <h4 className="font-medium text-white mb-2">Staff Room Stretch</h4>
              <p className="text-sm text-white/70 mb-4">
                Quick stretches to relieve physical tension during shifts
              </p>
              <Button 
                className="w-full bg-white hover:bg-gray-100 text-blue-600"
                onClick={() => handleDownload("Staff Room Stretch Guide")}
              >
                View Stretches
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-200 dark:border-orange-900">
            <CardContent className="p-6">
              <h4 className="font-medium text-white mb-2">Emotional Regulation</h4>
              <p className="text-sm text-white/70 mb-4">
                Techniques to calm your nervous system after difficult interactions
              </p>
              <Button 
                className="w-full bg-white hover:bg-gray-100 text-orange-600"
                onClick={() => handleDownload("Emotional Regulation Techniques")}
              >
                Learn Techniques
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HospitalityResources;
