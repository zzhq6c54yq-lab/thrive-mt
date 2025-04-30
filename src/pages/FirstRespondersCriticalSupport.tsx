
import React from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, HeartPulse, Brain, Shield, Activity, Download } from "lucide-react";
import PortalBackButton from "@/components/navigation/PortalBackButton";
import ActionButton from "@/components/navigation/ActionButton";
import { useToast } from "@/hooks/use-toast";
import { saveAs } from "file-saver";

const FirstRespondersCriticalSupport = () => {
  const { toast } = useToast();
  
  // Handle team debriefing request
  const handleDebriefingRequest = () => {
    toast({
      title: "Request Submitted",
      description: "Your request for a Critical Incident Stress Debriefing has been submitted. A coordinator will contact you shortly.",
      duration: 3000,
    });
  };
  
  // Handle resource download
  const handleResourceDownload = (title) => {
    try {
      // Create a blob with text content to simulate PDF download
      const blob = new Blob(
        [
          `# ${title}\n\n` +
          `This is a simulated download of the ${title} resource.\n\n` +
          `For First Responders use only.\n\n` +
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
    <Page title="Critical Incident Support" showBackButton={false}>
      <div className="mb-4">
        <PortalBackButton returnPath="/first-responders-portal" />
      </div>

      <div className="bg-gradient-to-r from-red-950 to-red-900 p-4 rounded-lg mb-6 border border-red-800">
        <h2 className="text-xl font-bold text-white mb-2">Critical Incident Support</h2>
        <p className="text-red-200">
          Specialized resources and support for first responders dealing with the aftermath of critical incidents.
        </p>
      </div>

      <div className="bg-black/20 p-4 rounded-lg mb-6 border border-red-900/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-red-900/30 p-2 rounded-full">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-white">Immediate Support Available</h3>
        </div>
        <p className="text-white/80 mb-4">
          If you're experiencing distress following a critical incident, help is available right now. Don't wait to reach out.
        </p>
        <div className="flex flex-wrap gap-3">
          <ActionButton
            type="other"
            path="/crisis-support"
            title="Get Immediate Help"
            variant="default"
            className="bg-red-700 hover:bg-red-800 text-white"
          />
          <Button 
            variant="outline" 
            className="border-red-500 text-red-300 hover:bg-red-900/50"
            onClick={() => {
              toast({
                title: "Support Line",
                description: "Connecting you to the First Responder Crisis Line: 1-888-555-HELP",
                duration: 5000,
              });
            }}
          >
            Call Support Line
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#141921] border-red-900/30">
          <CardHeader>
            <div className="flex items-center gap-2 text-red-400">
              <Brain className="h-5 w-5" />
              <CardTitle>Psychological First Aid</CardTitle>
            </div>
            <CardDescription>For post-incident mental health support</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">
              Learn evidence-based approaches to supporting yourself and colleagues following traumatic incidents.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 w-full">
            <ActionButton
              type="workshop"
              id="psych-first-aid"
              title="Start Workshop"
              path="/first-responders-workshops/psych-first-aid"
              variant="default"
              className="w-full bg-red-700 hover:bg-red-800 text-white"
            />
            <Button 
              variant="outline" 
              className="w-full border-red-500 text-red-300 hover:bg-red-900/50"
              onClick={() => handleResourceDownload("Psychological First Aid Guide")}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Guide
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-[#141921] border-red-900/30">
          <CardHeader>
            <div className="flex items-center gap-2 text-red-400">
              <HeartPulse className="h-5 w-5" />
              <CardTitle>Trauma Response</CardTitle>
            </div>
            <CardDescription>Understanding normal reactions to abnormal events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">
              Recognize common trauma responses and learn healthy coping strategies for processing difficult experiences.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 w-full">
            <ActionButton
              type="assessment"
              id="trauma-response"
              path="/first-responders-assessments/trauma-response"
              title="Take Assessment"
              variant="default"
              className="w-full bg-red-700 hover:bg-red-800 text-white"
            />
            <Button 
              variant="outline" 
              className="w-full border-red-500 text-red-300 hover:bg-red-900/50"
              onClick={() => handleResourceDownload("Trauma Response Toolkit")}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Toolkit
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-[#141921] border-red-900/30">
          <CardHeader>
            <div className="flex items-center gap-2 text-red-400">
              <Shield className="h-5 w-5" />
              <CardTitle>Resilience Building</CardTitle>
            </div>
            <CardDescription>Tools for strengthening mental fortitude</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">
              Develop practical skills to build resilience and protect your mental wellbeing during and after critical incidents.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 w-full">
            <ActionButton
              type="practice"
              id="resilience"
              path="/first-responders-practice/resilience"
              title="Start Practice"
              variant="default"
              className="w-full bg-red-700 hover:bg-red-800 text-white"
            />
            <Button 
              variant="outline" 
              className="w-full border-red-500 text-red-300 hover:bg-red-900/50"
              onClick={() => handleResourceDownload("Resilience Building Workbook")}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Workbook
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-[#141921] border border-red-900/30 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-red-500" />
          Critical Incident Stress Debriefing Request
        </h3>
        
        <p className="text-white/80 mb-4">
          Need support for your team following a critical incident? Request a professional Critical Incident Stress Debriefing session for your department or unit.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-black/30 p-3 rounded flex items-start gap-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Confidential Process</h4>
              <p className="text-sm text-white/70">All sessions are completely confidential and separated from administrative structures</p>
            </div>
          </div>
          
          <div className="bg-black/30 p-3 rounded flex items-start gap-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-white">Professional Facilitators</h4>
              <p className="text-sm text-white/70">Led by mental health professionals with first responder experience</p>
            </div>
          </div>
        </div>
        
        <Button 
          className="bg-red-700 hover:bg-red-800 text-white"
          onClick={handleDebriefingRequest}
        >
          Request Team Debriefing
        </Button>
      </div>
    </Page>
  );
};

export default FirstRespondersCriticalSupport;
