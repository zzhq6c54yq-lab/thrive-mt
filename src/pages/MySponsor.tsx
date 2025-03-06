
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Book, Calendar, HeartHandshake, Users, MessageCircle, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import SponsorChatbot from "@/components/SponsorChatbot";
import HomeButton from "@/components/HomeButton";

const twelveSteps = [
  "We admitted we were powerless over our addiction, that our lives had become unmanageable.",
  "Came to believe that a Power greater than ourselves could restore us to sanity.",
  "Made a decision to turn our will and our lives over to the care of God as we understood Him.",
  "Made a searching and fearless moral inventory of ourselves.",
  "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.",
  "Were entirely ready to have God remove all these defects of character.",
  "Humbly asked Him to remove our shortcomings.",
  "Made a list of all persons we had harmed, and became willing to make amends to them all.",
  "Made direct amends to such people wherever possible, except when to do so would injure them or others.",
  "Continued to take personal inventory and when we were wrong promptly admitted it.",
  "Sought through prayer and meditation to improve our conscious contact with God as we understood Him, praying only for knowledge of His will for us and the power to carry that out.",
  "Having had a spiritual awakening as a result of these steps, we tried to carry this message to addicts, and to practice these principles in all our affairs."
];

const traditions = [
  "Our common welfare should come first; personal recovery depends on NA unity.",
  "For our group purpose there is but one ultimate authority—a loving God as He may express Himself in our group conscience. Our leaders are but trusted servants; they do not govern.",
  "The only requirement for membership is a desire to stop using.",
  "Each group should be autonomous except in matters affecting other groups or NA as a whole.",
  "Each group has but one primary purpose—to carry the message to the addict who still suffers.",
  "An NA group ought never endorse, finance, or lend the NA name to any related facility or outside enterprise, lest problems of money, property, or prestige divert us from our primary purpose.",
  "Every NA group ought to be fully self-supporting, declining outside contributions.",
  "Narcotics Anonymous should remain forever nonprofessional, but our service centers may employ special workers.",
  "NA, as such, ought never be organized, but we may create service boards or committees directly responsible to those they serve.",
  "Narcotics Anonymous has no opinion on outside issues; hence the NA name ought never be drawn into public controversy.",
  "Our public relations policy is based on attraction rather than promotion; we need always maintain personal anonymity at the level of press, radio, and films.",
  "Anonymity is the spiritual foundation of all our Traditions, ever reminding us to place principles before personalities."
];

const MySponsor = () => {
  const [traditionsOpen, setTraditionsOpen] = useState(false);
  const [meetingsOpen, setMeetingsOpen] = useState(false);
  const [thriveVirtualOpen, setThriveVirtualOpen] = useState(false);
  const [sponsorType, setSponsorType] = useState<'aa_sponsor' | 'na_sponsor'>('na_sponsor');

  const showTraditions = () => {
    setTraditionsOpen(true);
  };

  const showMeetings = () => {
    setMeetingsOpen(true);
  };

  const showThriveVirtual = () => {
    setThriveVirtualOpen(true);
  };

  const joinVirtualMeeting = (meetingType: string) => {
    toast({
      title: "Joining Virtual Meeting",
      description: `You're joining a Thrive-run ${meetingType} meeting. Henry will be your AI facilitator.`,
    });
    setTimeout(() => {
      setThriveVirtualOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1f] text-white p-6">
      <HomeButton />
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-4">
            My <span className="gradient-heading">Sponsor</span>
          </h1>
          <p className="text-gray-300">Your digital support system for recovery</p>
        </div>

        <div className="mb-6">
          <Card className="p-4 border border-[#B87333]/20 bg-white/5">
            <h3 className="text-lg font-medium mb-2">Choose Your Sponsor Type</h3>
            <p className="text-sm text-gray-300 mb-3">Henry can support you as either an AA or NA sponsor</p>
            <div className="flex gap-3">
              <Button 
                variant={sponsorType === 'aa_sponsor' ? 'bronze' : 'outline_copper'}
                onClick={() => setSponsorType('aa_sponsor')}
                className="flex-1"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                AA Sponsor
              </Button>
              <Button 
                variant={sponsorType === 'na_sponsor' ? 'bronze' : 'outline_copper'}
                onClick={() => setSponsorType('na_sponsor')}
                className="flex-1"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                NA Sponsor
              </Button>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="sponsor" className="space-y-6">
          <TabsList className="bg-white/5 border border-[#B87333]/20">
            <TabsTrigger value="sponsor" className="data-[state=active]:bg-[#B87333]">
              <MessageCircle className="h-4 w-4 mr-2" />
              Digital Sponsor
            </TabsTrigger>
            <TabsTrigger value="steps" className="data-[state=active]:bg-[#B87333]">
              <Book className="h-4 w-4 mr-2" />
              12 Steps
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sponsor" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SponsorChatbot contextType={sponsorType} />
              </div>
              <div className="space-y-4">
                <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h3 className="text-lg font-medium mb-2">Digital Sponsor Features</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <HeartHandshake className="h-4 w-4 mr-2 text-[#B87333]" />
                      24/7 Support and Guidance
                    </li>
                    <li className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2 text-[#B87333]" />
                      Recovery-focused Conversations
                    </li>
                    <li className="flex items-center">
                      <Book className="h-4 w-4 mr-2 text-[#B87333]" />
                      Step Work Support
                    </li>
                    <li className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-[#B87333]" />
                      Community Connection
                    </li>
                  </ul>
                </Card>
                
                <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h3 className="text-lg font-medium mb-2">12 Traditions</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Explore the guiding principles that keep our fellowship united.
                  </p>
                  <div className="flex">
                    <Button 
                      variant="outline" 
                      className="w-full border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hover:text-white"
                      onClick={showTraditions}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      View Traditions
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h3 className="text-lg font-medium mb-2">Find Meetings</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Connect with local, online, and Thrive-run meetings.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hover:text-white"
                      onClick={showMeetings}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {sponsorType === 'aa_sponsor' ? 'Find AA Meetings' : 'Find NA Meetings'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hover:text-white"
                      onClick={showThriveVirtual}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Thrive Virtual Meetings
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="steps">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {twelveSteps.map((step, index) => (
                <Card key={index} className="p-4 border border-[#B87333]/20 bg-white/5">
                  <h3 className="text-lg font-medium mb-2 text-[#B87333]">Step {index + 1}</h3>
                  <p className="text-sm text-gray-300">{step}</p>
                </Card>
              ))}
            </div>
            
            <div className="mt-6">
              <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                <h3 className="text-lg font-medium mb-2">12 Traditions</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Explore the guiding principles that keep our fellowship united.
                </p>
                <div className="flex">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hover:text-white"
                    onClick={showTraditions}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View Traditions
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="mt-4">
              <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                <h3 className="text-lg font-medium mb-2">Find Meetings</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Connect with local, online, and Thrive-run meetings.
                </p>
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hover:text-white"
                    onClick={showMeetings}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {sponsorType === 'aa_sponsor' ? 'Find AA Meetings' : 'Find NA Meetings'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333]/10 hover:text-white"
                    onClick={showThriveVirtual}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Thrive Virtual Meetings
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={traditionsOpen} onOpenChange={setTraditionsOpen}>
        <DialogContent className="bg-[#1a1a1f] border border-[#B87333]/20 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light">
              The <span className="text-[#B87333]">12 Traditions</span> of {sponsorType === 'aa_sponsor' ? 'AA' : 'NA'}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Guiding principles that help {sponsorType === 'aa_sponsor' ? 'AA' : 'NA'} groups function effectively
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {traditions.map((tradition, index) => (
              <Card key={index} className="p-4 border border-[#B87333]/20 bg-white/5">
                <h3 className="text-lg font-medium mb-2 text-[#B87333]">Tradition {index + 1}</h3>
                <p className="text-sm text-gray-300">{tradition}</p>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={meetingsOpen} onOpenChange={setMeetingsOpen}>
        <DialogContent className="bg-[#1a1a1f] border border-[#B87333]/20 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light">
              Find {sponsorType === 'aa_sponsor' ? 'AA' : 'NA'} <span className="text-[#B87333]">Meetings</span>
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Connect with your local {sponsorType === 'aa_sponsor' ? 'AA' : 'NA'} community or join virtual meetings worldwide
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card className="p-4 border border-[#B87333]/20 bg-white/5">
              <h4 className="text-lg font-medium mb-2">Local Meetings</h4>
              <p className="text-sm text-gray-300 mb-4">
                Find in-person meetings in your area.
              </p>
              <Button 
                className="w-full bg-[#B87333] hover:bg-[#B87333]/80"
                onClick={() => {
                  if (sponsorType === 'aa_sponsor') {
                    window.open("https://www.aa.org/find-aa", "_blank");
                    toast({
                      title: "Opening AA Meeting Search",
                      description: "Redirecting you to the official AA meeting search page",
                    });
                  } else {
                    window.open("https://www.na.org/meetingsearch/", "_blank");
                    toast({
                      title: "Opening NA Meeting Search",
                      description: "Redirecting you to the official NA meeting search page",
                    });
                  }
                }}
              >
                Search Local Meetings
              </Button>
            </Card>
            <Card className="p-4 border border-[#B87333]/20 bg-white/5">
              <h4 className="text-lg font-medium mb-2">Virtual Meetings</h4>
              <p className="text-sm text-gray-300 mb-4">
                Join online meetings from anywhere.
              </p>
              <Button 
                className="w-full bg-[#B87333] hover:bg-[#B87333]/80"
                onClick={() => {
                  if (sponsorType === 'aa_sponsor') {
                    window.open("https://aa-intergroup.org/meetings/", "_blank");
                    toast({
                      title: "Opening Virtual AA Meetings",
                      description: "Redirecting you to the virtual AA meetings page",
                    });
                  } else {
                    window.open("https://virtual-na.org/", "_blank");
                    toast({
                      title: "Opening Virtual NA Meetings",
                      description: "Redirecting you to the virtual NA meetings page",
                    });
                  }
                }}
              >
                Join Virtual Meetings
              </Button>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={thriveVirtualOpen} onOpenChange={setThriveVirtualOpen}>
        <DialogContent className="bg-[#1a1a1f] border border-[#B87333]/20 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light">
              Thrive <span className="text-[#B87333]">Virtual Meetings</span>
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Join peer-led recovery meetings facilitated by AI Henry
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            {sponsorType === 'na_sponsor' && (
              <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                <h4 className="text-lg font-medium mb-2">NA Meetings</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Narcotics Anonymous meetings led by peers and facilitated by Henry.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 p-2 border border-[#B87333]/20 rounded-md">
                    <p className="font-semibold text-white">Daily Meeting</p>
                    <p>7:00 PM - 8:00 PM</p>
                    <p>Open Discussion</p>
                  </div>
                  <div className="text-sm text-gray-300 p-2 border border-[#B87333]/20 rounded-md">
                    <p className="font-semibold text-white">Step Work Meeting</p>
                    <p>Saturdays, 10:00 AM - 11:30 AM</p>
                    <p>Focus: Working through the 12 Steps</p>
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#B87333] hover:bg-[#B87333]/80 mt-4"
                  onClick={() => joinVirtualMeeting("NA")}
                >
                  Join Meeting Now
                </Button>
              </Card>
            )}
            {sponsorType === 'aa_sponsor' && (
              <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                <h4 className="text-lg font-medium mb-2">AA Meetings</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Alcoholics Anonymous meetings led by peers and facilitated by Henry.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 p-2 border border-[#B87333]/20 rounded-md">
                    <p className="font-semibold text-white">Evening Meeting</p>
                    <p>8:30 PM - 9:30 PM</p>
                    <p>Speaker & Discussion</p>
                  </div>
                  <div className="text-sm text-gray-300 p-2 border border-[#B87333]/20 rounded-md">
                    <p className="font-semibold text-white">Morning Meditation</p>
                    <p>Weekdays, 7:30 AM - 8:30 AM</p>
                    <p>Focus: Meditation and Daily Reflections</p>
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#B87333] hover:bg-[#B87333]/80 mt-4"
                  onClick={() => joinVirtualMeeting("AA")}
                >
                  Join Meeting Now
                </Button>
              </Card>
            )}
            {sponsorType === 'aa_sponsor' && (
              <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                <h4 className="text-lg font-medium mb-2">Big Book Study</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Focused sessions on the AA Big Book with guidance from Henry.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 p-2 border border-[#B87333]/20 rounded-md">
                    <p className="font-semibold text-white">Big Book Basics</p>
                    <p>Tuesdays, 6:00 PM - 7:00 PM</p>
                    <p>Focus: First 164 pages</p>
                  </div>
                  <div className="text-sm text-gray-300 p-2 border border-[#B87333]/20 rounded-md">
                    <p className="font-semibold text-white">Personal Stories</p>
                    <p>Thursdays, 7:00 PM - 8:00 PM</p>
                    <p>Focus: Learning from shared experiences</p>
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#B87333] hover:bg-[#B87333]/80 mt-4"
                  onClick={() => joinVirtualMeeting("Big Book Study")}
                >
                  Join Study Now
                </Button>
              </Card>
            )}
            {sponsorType === 'na_sponsor' && (
              <Card className="p-4 border border-[#B87333]/20 bg-white/5">
                <h4 className="text-lg font-medium mb-2">Basic Text Study</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Focused sessions on the NA Basic Text with guidance from Henry.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 p-2 border border-[#B87333]/20 rounded-md">
                    <p className="font-semibold text-white">Recovery Principles</p>
                    <p>Wednesdays, 6:00 PM - 7:00 PM</p>
                    <p>Focus: Core chapters</p>
                  </div>
                  <div className="text-sm text-gray-300 p-2 border border-[#B87333]/20 rounded-md">
                    <p className="font-semibold text-white">Personal Stories</p>
                    <p>Fridays, 7:00 PM - 8:00 PM</p>
                    <p>Focus: Learning from shared experiences</p>
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#B87333] hover:bg-[#B87333]/80 mt-4"
                  onClick={() => joinVirtualMeeting("Basic Text Study")}
                >
                  Join Study Now
                </Button>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MySponsor;
