
import React from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MessageSquare, Download, FileText } from "lucide-react";
import PortalBackButton from "@/components/navigation/PortalBackButton";
import ActionButton from "@/components/navigation/ActionButton";
import { useToast } from "@/components/ui/use-toast";
import { usePDFGenerator } from "@/hooks/usePDFGenerator";

const FirstRespondersPeerSupport = () => {
  const { toast } = useToast();
  const { downloadGuide } = usePDFGenerator();
  
  const supportGroups = [
    {
      title: "Fire Service Support Group",
      description: "Weekly online meetings for firefighters and fire service personnel",
      nextMeeting: "Apr 22, 2025 · 7:00 PM",
      participants: 12,
      type: "join"
    },
    {
      title: "EMT/Paramedic Circle",
      description: "Biweekly discussions about challenges faced by emergency medical technicians",
      nextMeeting: "Apr 25, 2025 · 8:00 PM",
      participants: 8,
      type: "join"
    },
    {
      title: "Police Officers Support Network",
      description: "Monthly peer support meetings for law enforcement personnel",
      nextMeeting: "Apr 29, 2025 · 7:30 PM",
      participants: 15,
      type: "join"
    },
    {
      title: "Dispatch & Communications Personnel",
      description: "Support group focusing on the unique stresses of emergency dispatchers",
      nextMeeting: "Apr 24, 2025 · 6:00 PM",
      participants: 10,
      type: "join"
    }
  ];

  // Handle new group request
  const handleNewGroupRequest = () => {
    toast({
      title: "Request Received",
      description: "Your request to start a new support group has been submitted. A coordinator will contact you to discuss details.",
      duration: 3000,
    });
  };

  // Handle resource download with real PDF generation
  const handleResourceDownload = (resourceType: 'guide' | 'guidelines') => {
    if (resourceType === 'guide') {
      downloadGuide({
        title: 'Peer Support Best Practices Guide',
        description: 'A comprehensive guide to peer support for first responders. This resource covers essential skills, communication techniques, and self-care practices for those providing peer support.',
        sections: [
          {
            title: 'Understanding Peer Support',
            content: 'Peer support is a relationship where people with similar experiences help each other. In first responder contexts, this means connecting with colleagues who understand the unique challenges of emergency services.',
            tips: [
              'Active listening without judgment',
              'Maintaining confidentiality',
              'Knowing when to refer to professional help',
              'Taking care of your own mental health'
            ]
          },
          {
            title: 'Communication Skills',
            content: 'Effective peer support relies on strong communication. Learning to listen actively and respond with empathy creates a safe space for colleagues to share.',
            tips: [
              'Use open-ended questions',
              'Reflect back what you hear',
              'Avoid giving unsolicited advice',
              'Normalize feelings and experiences',
              'Be comfortable with silence'
            ]
          },
          {
            title: 'Recognizing Warning Signs',
            content: 'As a peer supporter, knowing the signs of distress helps you identify when colleagues may need additional support.',
            tips: [
              'Changes in behavior or personality',
              'Withdrawal from colleagues or activities',
              'Increased irritability or anger',
              'Sleep problems or fatigue',
              'Increased substance use'
            ]
          },
          {
            title: 'Self-Care for Peer Supporters',
            content: 'Supporting others can be emotionally demanding. Taking care of yourself ensures you can continue helping colleagues effectively.',
            tips: [
              'Set boundaries on availability',
              'Debrief with supervisors regularly',
              'Practice your own stress management',
              'Connect with other peer supporters',
              'Know your limits and take breaks'
            ]
          }
        ],
        includeWritingSpaces: true
      });
    } else {
      downloadGuide({
        title: 'Peer Support Group Guidelines',
        description: 'Guidelines for establishing and running effective peer support groups for first responders. Use this resource to create a supportive, safe environment for your colleagues.',
        sections: [
          {
            title: 'Starting a Support Group',
            content: 'Creating a peer support group requires planning and commitment. These guidelines help ensure your group meets the needs of members effectively.',
            tips: [
              'Identify a consistent meeting schedule',
              'Choose a comfortable, private location',
              'Establish clear group norms and expectations',
              'Have at least two trained facilitators'
            ]
          },
          {
            title: 'Group Ground Rules',
            content: 'Clear ground rules create psychological safety and help members feel comfortable sharing.',
            tips: [
              'What is shared in the group stays in the group',
              'No interrupting when someone is speaking',
              'Respect different perspectives and experiences',
              'Attendance is voluntary - no pressure to share',
              'No recording of sessions'
            ]
          },
          {
            title: 'Facilitator Responsibilities',
            content: 'Facilitators guide discussions, maintain safety, and ensure everyone has opportunity to participate.',
            tips: [
              'Start and end on time',
              'Check in with members at start of each session',
              'Redirect conversations that become unproductive',
              'Have crisis resources readily available',
              'Follow up with members showing distress'
            ]
          },
          {
            title: 'Crisis Protocol',
            content: 'Know how to respond if a group member reveals they are in crisis or danger.',
            tips: [
              'Have emergency contact numbers accessible',
              'Know your department\'s EAP resources',
              'Never leave a person in crisis alone',
              'Document incidents appropriately',
              'Debrief after crisis situations'
            ]
          }
        ],
        includeWritingSpaces: false
      });
    }
  };

  return (
    <Page title="Peer Support Network" showBackButton={false}>
      <div className="mb-4">
        <PortalBackButton returnPath="/first-responders-portal" />
      </div>

      <div className="bg-gradient-to-r from-red-950 to-red-900 p-4 rounded-lg mb-6 border border-red-800">
        <h2 className="text-xl font-bold text-white mb-2">First Responders Peer Support</h2>
        <p className="text-red-200">
          Connect with fellow emergency service professionals who understand your unique challenges and experiences.
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <Button 
          variant="outline"
          className="border-red-500 text-red-300 hover:bg-red-900/50 flex items-center gap-2"
          onClick={() => handleResourceDownload('guide')}
        >
          <Download className="h-4 w-4" />
          Download Peer Support Guide
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportGroups.map((group, index) => (
          <Card key={index} className="bg-[#141921] border-red-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-500" />
                {group.title}
              </CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm mb-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-red-400 mr-2" />
                  <span className="text-white/80">{group.nextMeeting}</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 text-red-400 mr-2" />
                <span className="text-white/80">{group.participants} participants</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <ActionButton
                type="join"
                title="Join Meeting"
                path="/first-responders/virtual-meeting"
                variant="default" 
                className="bg-red-700 hover:bg-red-800 text-white"
              />
              <ActionButton
                type="discussion"
                title="Message Group"
                path="/first-responders/discussions"
                variant="outline" 
                className="border-red-500 text-red-300 hover:bg-red-900/50"
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-black/20 p-4 rounded-lg border border-red-900/20">
        <h3 className="text-lg font-medium mb-3 text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-red-500" />
          Start a New Support Group
        </h3>
        <p className="text-white/80 mb-4">
          If you're interested in starting a new peer support group for your specific service area or region, we can help you get started.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button 
            className="bg-red-700 hover:bg-red-800 text-white"
            onClick={handleNewGroupRequest}
          >
            Request New Group
          </Button>
          <Button 
            variant="outline"
            className="border-red-500 text-red-300 hover:bg-red-900/50 flex items-center gap-2"
            onClick={() => handleResourceDownload('guidelines')}
          >
            <FileText className="h-4 w-4" />
            Download Guidelines
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default FirstRespondersPeerSupport;
