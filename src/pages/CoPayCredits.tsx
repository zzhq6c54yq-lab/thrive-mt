
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, GiftIcon, CreditCard, Coins, Gift, Upload, ClipboardCheck, Download, Heart, User, Users, PiggyBank, Shield, BadgePercent, CreditCardIcon, Wallet, PercentIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const CoPayCredits = () => {
  const { toast } = useToast();
  const [credits, setCredits] = useState(75);
  const [activeTab, setActiveTab] = useState("how-it-works");

  const handleEarnCredits = (amount: number, source: string) => {
    setCredits(prev => prev + amount);
    toast({
      title: `Earned ${amount} Credits!`,
      description: `You've earned ${amount} copay credits from ${source}.`,
    });
  };

  return (
    <Page title="Co-Pay Credits Program" fullWidth={true}>
      <div className="space-y-8 w-full">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 p-6 sm:p-8 rounded-xl w-full">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-light mb-4 text-white">Welcome to our Co-Pay Credits Program</h2>
              <p className="text-white/90 mb-6">
                Designed to reward our community for prioritizing their mental health and well-being. 
                This innovative rewards system enables you to earn credits every time you invest in your 
                health through therapy sessions, subscriptions, and purchases made at thrive-apparel.com.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={() => setActiveTab("earn")}
                >
                  Start Earning Credits
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => setActiveTab("how-it-works")}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-pulse blur-xl"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                  <div className="text-center text-white">
                    <Wallet className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
                    <span className="text-4xl font-bold block">{credits}</span>
                    <span className="text-sm font-medium opacity-80">Credits Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-8 bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <BadgePercent className="h-5 w-5 text-amber-500" />
                Your Co-Pay Credits
              </CardTitle>
              <CardDescription>Use these credits to reduce your therapy session costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-4xl font-bold text-amber-500">{credits}</span>
                  <span className="text-gray-400 ml-2">credits available</span>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600">Use Credits</Button>
              </div>
              <div className="mb-3">
                <Progress value={credits} max={100} className="h-3 bg-white/10">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                </Progress>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                {credits >= 100 ? "You have enough credits for a free session!" : `${100 - credits} more credits needed for a free session`}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-amber-500/20">
                      <PercentIcon className="h-5 w-5 text-amber-500" />
                    </div>
                    <h4 className="font-medium">Basic Membership</h4>
                  </div>
                  <p className="text-sm text-gray-400 pl-10">Earn 5% back on every dollar spent on therapy costs and monthly subscriptions.</p>
                </div>
                
                <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 p-4 rounded-lg border border-amber-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-amber-500/30">
                      <Shield className="h-5 w-5 text-amber-400" />
                    </div>
                    <h4 className="font-medium">Platinum Membership</h4>
                  </div>
                  <p className="text-sm text-gray-400 pl-10">Enjoy greater rewards with 10% back on every dollar spent, designed for those who want to maximize benefits.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-4 bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5 text-amber-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[300px] overflow-y-auto">
              <div className="space-y-3">
                {[
                  { date: "Apr 15, 2024", action: "Used for session", amount: -25 },
                  { date: "Apr 10, 2024", action: "Wellness challenge", amount: 15 },
                  { date: "Apr 5, 2024", action: "Referral bonus", amount: 30 },
                  { date: "Mar 28, 2024", action: "Used for session", amount: -25 },
                  { date: "Mar 20, 2024", action: "Monthly subscription", amount: 10 }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-white/10 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-white/80">{item.action}</div>
                      <div className="text-xs text-gray-500">{item.date}</div>
                    </div>
                    <div className={`font-medium ${item.amount > 0 ? 'text-green-400' : 'text-amber-400'}`}>
                      {item.amount > 0 ? `+${item.amount}` : item.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full text-amber-400 border-white/10 hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-white/5 p-1">
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="earn">Earn Credits</TabsTrigger>
            <TabsTrigger value="redeem">Redeem Credits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="how-it-works" className="mt-6">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">About Co-Pay Credits</CardTitle>
                <CardDescription>Understanding our rewards program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <h3 className="text-lg font-medium mb-4 text-amber-400">How It Works</h3>
                  <p className="text-gray-300 mb-4">
                    As a member of our program, you can earn back a percentage of your spending:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-amber-500/20 mt-1">
                        <Star className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <span className="font-medium text-white">Basic Membership:</span>
                        <p className="text-gray-400">Earn 5% back on every dollar spent. This applies to all therapy costs and monthly subscriptions.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-amber-500/20 mt-1">
                        <Star className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <span className="font-medium text-white">Platinum Membership:</span>
                        <p className="text-gray-400">Enjoy even greater rewards with 10% back on every dollar spent. The platinum tier is designed for those who want to maximize their benefits.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <h3 className="text-lg font-medium mb-4 text-amber-400">Why Join?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="p-2 rounded-full bg-amber-500/20 w-12 h-12 flex items-center justify-center mb-4">
                        <Heart className="h-6 w-6 text-amber-400" />
                      </div>
                      <h4 className="font-medium mb-2 text-white">Encourage Self-Care</h4>
                      <p className="text-sm text-gray-400">Our program incentivizes you to invest in your mental well-being, making it easier to prioritize self-care.</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="p-2 rounded-full bg-amber-500/20 w-12 h-12 flex items-center justify-center mb-4">
                        <Gift className="h-6 w-6 text-amber-400" />
                      </div>
                      <h4 className="font-medium mb-2 text-white">Flexible Rewards</h4>
                      <p className="text-sm text-gray-400">Use your co-pay credits on a variety of services, ensuring that you have the support you need when you need it.</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="p-2 rounded-full bg-amber-500/20 w-12 h-12 flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-amber-400" />
                      </div>
                      <h4 className="font-medium mb-2 text-white">Community Support</h4>
                      <p className="text-sm text-gray-400">Join a community that values mental health, where your investments not only benefit you but also support our mission to promote wellness.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30">
                  <h3 className="text-lg font-medium mb-3 text-white">Getting Started</h3>
                  <p className="text-gray-300 mb-4">
                    Sign up today to start earning co-pay credits and take the first step towards a healthier, happier you. 
                    These co-pay credits are not just a cash-back offer; they can be used to offset future expenses within our services.
                  </p>
                  <Button className="bg-amber-500 hover:bg-amber-600">
                    Upgrade to Platinum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="earn" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-amber-500" />
                    Complete Wellness Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Earn credits by completing daily wellness challenges, practicing mindfulness, or tracking your mood.
                  </p>
                  <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white/90">Daily Wellness Challenge</span>
                      <span className="text-amber-400 font-bold">+5 credits</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={() => handleEarnCredits(5, "Daily Wellness Challenge")}
                  >
                    Complete Challenge
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-500" />
                    Refer Friends & Family
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Invite others to Thrive MT and earn credits when they sign up or attend their first session.
                  </p>
                  <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white/90">New Member Referral</span>
                      <span className="text-amber-400 font-bold">+30 credits</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={() => handleEarnCredits(30, "Friend Referral")}
                  >
                    Invite Friends
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-amber-500" />
                    Participate in Research
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Contribute to mental health research by participating in surveys and studies.
                  </p>
                  <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white/90">Quarterly Survey</span>
                      <span className="text-amber-400 font-bold">+20 credits</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={() => handleEarnCredits(20, "Research Participation")}
                  >
                    Take Survey
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="redeem" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all">
                <CardHeader className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 rounded-t-lg">
                  <CardTitle>Standard Session Credit</CardTitle>
                  <CardDescription>Reduce your copay for individual therapy</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-amber-500">25</span>
                    <span className="text-gray-400 ml-2">credits</span>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-6">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      Reduce standard session copay by $25
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      Valid for any individual therapy session
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      No limit on usage (with available credits)
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">
                    Redeem 25 Credits
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all">
                <CardHeader className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 rounded-t-lg">
                  <CardTitle>Full Session Coverage</CardTitle>
                  <CardDescription>Completely eliminate your copay</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-amber-500">100</span>
                    <span className="text-gray-400 ml-2">credits</span>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-6">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      Cover your entire session copay
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      Premium therapist sessions included
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      Best value for your credits
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">
                    Redeem 100 Credits
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default CoPayCredits;
