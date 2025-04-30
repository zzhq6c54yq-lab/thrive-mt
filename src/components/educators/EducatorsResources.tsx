
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookUser, Brain, Heart, Download, ClipboardList, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveAs } from "file-saver";

const EducatorsResources: React.FC = () => {
  const { toast } = useToast();
  
  const handleResourceDownload = (title: string) => {
    try {
      // Create a blob with text content to simulate PDF download
      const blob = new Blob(
        [
          `# ${title}\n\n` +
          `This is a simulated download of the ${title} resource.\n\n` +
          `For Educators use only.\n\n` +
          `© ${new Date().getFullYear()} Thrive Mental Health Platform`
        ], 
        { type: "application/pdf" }
      );
      
      // Use file-saver to trigger download
      saveAs(blob, `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      
      // Show success toast
      toast({
        title: "Download Started",
        description: `${title} is being downloaded.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Download error:", error);
      
      // Show error toast
      toast({
        title: "Download Failed",
        description: "There was an error downloading the resource. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-6 rounded-lg border border-purple-500/30 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Educator Mental Health Resources</h2>
        <p className="text-gray-200">
          Access a variety of resources designed to support your mental well-being as an education professional.
        </p>
      </div>

      <Tabs defaultValue="guides">
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="guides">Resource Guides</TabsTrigger>
          <TabsTrigger value="practices">Daily Practices</TabsTrigger>
          <TabsTrigger value="tools">Classroom Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guides" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center gap-2 text-white">
                  <BookUser className="h-5 w-5 text-purple-400" />
                  <CardTitle>Setting Boundaries Guide</CardTitle>
                </div>
                <CardDescription className="text-gray-300">Practical strategies for educators</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  Learn how to establish and maintain healthy boundaries with students, parents, colleagues, and administrators.
                </p>
              </CardContent>
              <CardFooter className="border-t border-purple-500/20 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
                  onClick={() => handleResourceDownload("Setting Boundaries Guide for Educators")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Guide
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center gap-2 text-white">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <CardTitle>Stress Reduction Toolkit</CardTitle>
                </div>
                <CardDescription className="text-gray-300">For classroom and beyond</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  Evidence-based techniques for managing stress during the school day and recovering afterward.
                </p>
              </CardContent>
              <CardFooter className="border-t border-purple-500/20 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
                  onClick={() => handleResourceDownload("Educator Stress Reduction Toolkit")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Toolkit
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center gap-2 text-white">
                  <ClipboardList className="h-5 w-5 text-purple-400" />
                  <CardTitle>Work-Life Balance Handbook</CardTitle>
                </div>
                <CardDescription className="text-gray-300">Creating sustainable practices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  Strategies for maintaining a healthy balance between professional dedication and personal well-being.
                </p>
              </CardContent>
              <CardFooter className="border-t border-purple-500/20 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
                  onClick={() => handleResourceDownload("Educator Work-Life Balance Handbook")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Handbook
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="practices" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-2 text-white">
                  <Heart className="h-5 w-5 text-purple-300" />
                  <CardTitle>Educator Self-Care Practices</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start">
                    <div className="bg-purple-800/50 p-1 rounded flex-shrink-0 mt-1 mr-2"></div>
                    <span>Quick 5-minute mindfulness exercises between classes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-800/50 p-1 rounded flex-shrink-0 mt-1 mr-2"></div>
                    <span>Setting intentions at the start of each school day</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-800/50 p-1 rounded flex-shrink-0 mt-1 mr-2"></div>
                    <span>Boundary-setting language templates for communication</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-800/50 p-1 rounded flex-shrink-0 mt-1 mr-2"></div>
                    <span>End-of-day reflection practices for closure</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="border-t border-purple-500/30 pt-4">
                <Button 
                  variant="default" 
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                  onClick={() => handleResourceDownload("Daily Self-Care Practices for Educators")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Practice Guide
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5 text-purple-400" />
                  <CardTitle>Educator Support Circle Guide</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200 mb-4">
                  A framework for creating a peer support circle at your school to share challenges and strategies.
                </p>
                
                <div className="space-y-3 text-gray-200">
                  <div className="bg-purple-900/30 p-3 rounded">
                    <h4 className="font-medium text-white mb-1">What's included:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Meeting structure templates</li>
                      <li>Discussion prompts and ground rules</li>
                      <li>Confidentiality agreements</li>
                      <li>Crisis response protocols</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-purple-500/20 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
                  onClick={() => handleResourceDownload("Educator Support Circle Guide")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Guide
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tools" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Classroom Calm Corner Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  How to create a calm corner in your classroom that benefits both students and teachers during stressful moments.
                </p>
              </CardContent>
              <CardFooter className="border-t border-purple-500/20 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
                  onClick={() => handleResourceDownload("Classroom Calm Corner Guide")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Guide
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Difficult Conversation Scripts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  Templates for navigating challenging conversations with students, parents, and administrators.
                </p>
              </CardContent>
              <CardFooter className="border-t border-purple-500/20 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
                  onClick={() => handleResourceDownload("Educator Difficult Conversation Scripts")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Scripts
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#1e1e2f]/80 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Grading Management System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  Efficient grading workflows and systems to reduce stress and prevent weekends filled with paperwork.
                </p>
              </CardContent>
              <CardFooter className="border-t border-purple-500/20 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-900/30"
                  onClick={() => handleResourceDownload("Educator Grading Management System")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Templates
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducatorsResources;
