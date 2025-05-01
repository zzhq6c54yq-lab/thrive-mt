
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Clock, BookOpen, FileText, Download, Calendar, CheckSquare, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const EducatorsResources: React.FC = () => {
  const { toast } = useToast();
  
  const handleDownload = (resourceName: string) => {
    toast({
      title: "Resource Downloaded",
      description: `${resourceName} has been downloaded successfully`,
      duration: 3000
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-6 rounded-lg border border-purple-500/30">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-purple-700/50">
            <Heart className="h-6 w-6 text-purple-200" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Educator Work-Life Balance Resources</h2>
            <p className="text-gray-200 mb-4">
              Specially curated tools and guidance to help education professionals maintain their wellbeing while managing the unique demands of teaching.
            </p>
          </div>
        </div>
      </div>
      
      {/* Featured Resource */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              Teacher Time Management Blueprint
            </CardTitle>
            <Badge variant="secondary" className="bg-purple-700/80 text-white">Featured</Badge>
          </div>
          <CardDescription className="text-purple-200">
            A comprehensive guide to managing your time efficiently as an educator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-200 mb-4">
            This research-based blueprint helps educators reclaim 5-10 hours per week through proven time management strategies specifically designed for the classroom and administrative tasks.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-500/30">
              <h4 className="font-medium text-white mb-1">Includes:</h4>
              <ul className="text-sm text-purple-200">
                <li>• Priority mapping template</li>
                <li>• Grading efficiency strategies</li>
                <li>• Meeting optimization guide</li>
              </ul>
            </div>
            <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-500/30">
              <h4 className="font-medium text-white mb-1">Benefits:</h4>
              <ul className="text-sm text-purple-200">
                <li>• Reduced after-hours work</li>
                <li>• More focused classroom time</li>
                <li>• Lower stress levels</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-purple-500/30 pt-4">
          <Button className="bg-purple-700 hover:bg-purple-800 text-white w-full" onClick={() => handleDownload("Teacher Time Management Blueprint")}>
            <Download className="mr-2 h-4 w-4" />
            Download Blueprint
          </Button>
        </CardFooter>
      </Card>
      
      {/* Work-Life Balance Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              Boundary-Setting Scripts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-300 mb-3">
              Ready-to-use language for setting healthy boundaries with students, parents, colleagues, and administration.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/20" onClick={() => handleDownload("Boundary-Setting Scripts")}>
              <Download className="mr-2 h-4 w-4" />
              Get Scripts
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-purple-400" />
              Grading Efficiency Toolkit
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-300 mb-3">
              Templates and strategies to reduce grading time by 40% while providing meaningful student feedback.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/20" onClick={() => handleDownload("Grading Efficiency Toolkit")}>
              <Download className="mr-2 h-4 w-4" />
              Get Toolkit
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-purple-400" />
              Parent Communication Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-300 mb-3">
              Time-saving templates for common parent communications that maintain professionalism and clarity.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/20" onClick={() => handleDownload("Parent Communication Templates")}>
              <Download className="mr-2 h-4 w-4" />
              Get Templates
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Quick Practices Section */}
      <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-lg border border-purple-500/30 p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-purple-400" />
          Quick Classroom Recharge Practices
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">5-Minute Mindfulness Exercises</h4>
            <p className="text-sm text-purple-200 mb-3">
              Brief mindfulness practices you can do between classes or during planning periods.
            </p>
            <Button size="sm" variant="secondary" className="w-full bg-purple-700/60 hover:bg-purple-700/80 text-white" onClick={() => handleDownload("5-Minute Mindfulness Exercises")}>
              Access Exercises
            </Button>
          </div>
          
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">Desk Stretching Routine</h4>
            <p className="text-sm text-purple-200 mb-3">
              Simple stretches to reduce physical tension during long hours of teaching or grading.
            </p>
            <Button size="sm" variant="secondary" className="w-full bg-purple-700/60 hover:bg-purple-700/80 text-white" onClick={() => handleDownload("Desk Stretching Routine")}>
              Start Routine
            </Button>
          </div>
          
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">Emotional Reset Techniques</h4>
            <p className="text-sm text-purple-200 mb-3">
              Quick practices to reset after difficult classroom interactions or stressful meetings.
            </p>
            <Button size="sm" variant="secondary" className="w-full bg-purple-700/60 hover:bg-purple-700/80 text-white" onClick={() => handleDownload("Emotional Reset Techniques")}>
              Learn Techniques
            </Button>
          </div>
          
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
            <h4 className="font-medium text-white mb-2">3-Minute Guided Audio Breaks</h4>
            <p className="text-sm text-purple-200 mb-3">
              Brief audio guides for quick mental resets throughout your teaching day.
            </p>
            <Button size="sm" variant="secondary" className="w-full bg-purple-700/60 hover:bg-purple-700/80 text-white" onClick={() => handleDownload("3-Minute Guided Audio Breaks")}>
              Play Audio
            </Button>
          </div>
        </div>
      </div>
      
      {/* Books and Further Reading */}
      <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-400" />
            Recommended Reading for Educators
          </CardTitle>
          <CardDescription className="text-purple-200">
            Books and articles specifically selected for education professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <FileText className="h-10 w-10 text-purple-400 mt-1" />
              <div>
                <h4 className="font-medium text-white">The Well-Balanced Teacher</h4>
                <p className="text-sm text-purple-200 mb-2">A practical guide to maintaining your passion for teaching while preserving your personal life.</p>
                <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-900/30" onClick={() => handleDownload("The Well-Balanced Teacher Summary")}>
                  Get Book Summary
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <FileText className="h-10 w-10 text-purple-400 mt-1" />
              <div>
                <h4 className="font-medium text-white">Boundaries for Brilliant Teaching</h4>
                <p className="text-sm text-purple-200 mb-2">Strategies for creating and maintaining healthy work-life boundaries in educational settings.</p>
                <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-900/30" onClick={() => handleDownload("Boundaries for Brilliant Teaching Summary")}>
                  Get Book Summary
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-purple-500/20 pt-4">
          <Button variant="default" className="w-full bg-purple-700 hover:bg-purple-800 text-white" onClick={() => handleDownload("Complete Educator Reading List")}>
            View Complete Reading List
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EducatorsResources;
