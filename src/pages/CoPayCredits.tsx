
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, GiftIcon, CreditCard, Coins, Gift, Upload, ClipboardCheck, Download, Heart, User, Users, PiggyBank, Shield, BadgePercent, CreditCardIcon, Wallet, PercentIcon, ShoppingBag } from "lucide-react";
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
      title: `Earned $${amount} in Credits!`,
      description: `You've earned $${amount} in copay credits from ${source}.`,
    });
  };

  return (
    <Page title="Co-Pay Credits Program" fullWidth={true}>
      <div className="space-y-8 w-full">
        {/* Hero Section - Redesigned for better visual appeal */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-8 rounded-xl w-full shadow-md">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-800">Welcome to our Co-Pay Credits Program</h2>
              <p className="text-gray-700 mb-6 text-lg">
                Designed to reward our community for prioritizing their mental health and well-being. 
                This innovative rewards system enables you to earn dollar-value credits every time you invest in your 
                health through therapy sessions, subscriptions, and purchases.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-6 py-6 h-auto text-lg shadow-md transition-transform hover:scale-105"
                  onClick={() => setActiveTab("earn")}
                >
                  Start Earning Credits
                </Button>
                <Button 
                  variant="outline" 
                  className="border-amber-800 text-amber-800 hover:bg-amber-100 font-medium px-6 py-6 h-auto text-lg shadow-sm"
                  onClick={() => setActiveTab("how-it-works")}
                >
                  How It Works
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full bg-amber-300/30 animate-pulse blur-xl"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                  <div className="text-center text-white">
                    <Wallet className="w-16 h-16 mx-auto mb-4 drop-shadow-lg" />
                    <span className="text-4xl font-bold block">${credits}</span>
                    <span className="text-sm font-medium opacity-80">Credits Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Overview - Redesigned with more attractive cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-8 bg-white shadow-md border border-amber-200">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
              <CardTitle className="text-2xl flex items-center gap-2 text-amber-800">
                <BadgePercent className="h-6 w-6 text-amber-600" />
                Your Co-Pay Credits
              </CardTitle>
              <CardDescription className="text-gray-600">Use these dollar-value credits for therapy sessions or Thrive Apparel</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-4xl font-bold text-amber-600">${credits}</span>
                  <span className="text-gray-500 ml-2">credits available</span>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium shadow-md">Use Credits</Button>
              </div>
              <div className="mb-3">
                <Progress value={credits} max={100} className="h-3 bg-gray-100">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                </Progress>
              </div>
              <p className="text-sm text-gray-500 mb-8">
                {credits >= 100 ? "You have enough credits for a free session!" : `$${100 - credits} more credits needed for a free session`}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-amber-100">
                      <PercentIcon className="h-6 w-6 text-amber-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 text-lg">Gold Membership</h4>
                  </div>
                  <p className="text-gray-600 pl-12">Earn $5 back on every $100 spent on therapy costs and monthly subscriptions.</p>
                  <Button className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-sm">
                    Get Started
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-300 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-amber-200">
                      <Shield className="h-6 w-6 text-amber-700" />
                    </div>
                    <h4 className="font-semibold text-gray-800 text-lg">Platinum Membership</h4>
                  </div>
                  <p className="text-gray-600 pl-12">Enjoy greater rewards with $10 back on every $100 spent, designed for those who want to maximize benefits.</p>
                  <Button className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold shadow-sm">
                    Upgrade Now
                  </Button>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg border border-amber-300 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-amber-50 to-amber-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-amber-200">
                    <ShoppingBag className="h-6 w-6 text-amber-700" />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-lg">Thrive Apparel Shop</h4>
                </div>
                <p className="text-gray-600 mb-4">Redeem your credits for exclusive mental wellness merchandise and apparel. Each credit equals one dollar toward your purchase.</p>
                <div className="flex justify-end">
                  <a href="https://thrive-apparel.com" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-black font-semibold shadow-md">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Shop with Credits
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-4 bg-white shadow-md border border-amber-200">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
              <CardTitle className="text-xl flex items-center gap-2 text-amber-800">
                <CreditCardIcon className="h-5 w-5 text-amber-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[360px] overflow-y-auto pt-6">
              <div className="space-y-4">
                {[
                  { date: "Apr 15, 2024", action: "Used for session", amount: -25 },
                  { date: "Apr 12, 2024", action: "Thrive Apparel purchase", amount: -15 },
                  { date: "Apr 10, 2024", action: "Wellness challenge", amount: 15 },
                  { date: "Apr 5, 2024", action: "Referral bonus", amount: 30 },
                  { date: "Mar 28, 2024", action: "Used for session", amount: -25 },
                  { date: "Mar 20, 2024", action: "Monthly subscription", amount: 10 }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{item.action}</div>
                      <div className="text-xs text-gray-500">{item.date}</div>
                    </div>
                    <div className={`font-medium ${item.amount > 0 ? 'text-green-600' : 'text-amber-600'}`}>
                      {item.amount > 0 ? `+$${item.amount}` : `-$${Math.abs(item.amount)}`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2 bg-amber-50">
              <Button variant="outline" className="w-full text-amber-700 border-amber-300 hover:bg-amber-100">
                <Download className="h-4 w-4 mr-2" />
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main Content Tabs - Improved styling and clarity */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-amber-100 p-1 rounded-lg">
            <TabsTrigger 
              value="how-it-works" 
              className="data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:shadow-sm"
            >
              How It Works
            </TabsTrigger>
            <TabsTrigger 
              value="earn" 
              className="data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:shadow-sm"
            >
              Earn Credits
            </TabsTrigger>
            <TabsTrigger 
              value="redeem" 
              className="data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:shadow-sm"
            >
              Redeem Credits
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="how-it-works" className="mt-6">
            <Card className="bg-white border border-amber-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-amber-800">About Co-Pay Credits</CardTitle>
                <CardDescription>Understanding our rewards program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <h3 className="text-lg font-medium mb-4 text-amber-800">How It Works</h3>
                  <p className="text-gray-700 mb-4">
                    As a member of our program, you can earn back dollar-value credits from your spending:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-amber-200 mt-1">
                        <Star className="h-4 w-4 text-amber-700" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Gold Membership:</span>
                        <p className="text-gray-600">Earn $5 back on every $100 spent. This applies to all therapy costs and monthly subscriptions.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-amber-200 mt-1">
                        <Star className="h-4 w-4 text-amber-700" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Platinum Membership:</span>
                        <p className="text-gray-600">Enjoy even greater rewards with $10 back on every $100 spent. The platinum tier is designed for those who want to maximize their benefits.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-amber-200">
                  <h3 className="text-lg font-medium mb-4 text-amber-800">Why Join?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="p-2 rounded-full bg-amber-200 w-12 h-12 flex items-center justify-center mb-4">
                        <Heart className="h-6 w-6 text-amber-700" />
                      </div>
                      <h4 className="font-medium mb-2 text-gray-800">Encourage Self-Care</h4>
                      <p className="text-sm text-gray-600">Our program incentivizes you to invest in your mental well-being, making it easier to prioritize self-care.</p>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="p-2 rounded-full bg-amber-200 w-12 h-12 flex items-center justify-center mb-4">
                        <Gift className="h-6 w-6 text-amber-700" />
                      </div>
                      <h4 className="font-medium mb-2 text-gray-800">Flexible Rewards</h4>
                      <p className="text-sm text-gray-600">Use your co-pay credits on therapy sessions, subscription upgrades, or at thrive-apparel.com for exclusive merchandise.</p>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <div className="p-2 rounded-full bg-amber-200 w-12 h-12 flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-amber-700" />
                      </div>
                      <h4 className="font-medium mb-2 text-gray-800">Community Support</h4>
                      <p className="text-sm text-gray-600">Join a community that values mental health, where your investments not only benefit you but also support our mission to promote wellness.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300">
                  <h3 className="text-lg font-medium mb-3 text-amber-800">Getting Started</h3>
                  <p className="text-gray-700 mb-4">
                    Sign up today to start earning co-pay credits and take the first step towards a healthier, happier you. 
                    These co-pay credits have real dollar value and can be used to offset future expenses within our services or shop at thrive-apparel.com.
                  </p>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-black font-semibold">
                    Upgrade to Platinum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="earn" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border border-amber-200 shadow-md hover:border-amber-400 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Heart className="h-5 w-5 text-amber-600" />
                    Complete Wellness Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Earn dollar-value credits by completing daily wellness challenges, practicing mindfulness, or tracking your mood.
                  </p>
                  <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">Daily Wellness Challenge</span>
                      <span className="text-amber-700 font-bold">+$5</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium"
                    onClick={() => handleEarnCredits(5, "Daily Wellness Challenge")}
                  >
                    Complete Challenge
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white border border-amber-200 shadow-md hover:border-amber-400 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Users className="h-5 w-5 text-amber-600" />
                    Refer Friends & Family
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Invite others to Thrive MT and earn dollar-value credits when they sign up or attend their first session.
                  </p>
                  <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">New Member Referral</span>
                      <span className="text-amber-700 font-bold">+$30</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium"
                    onClick={() => handleEarnCredits(30, "Friend Referral")}
                  >
                    Invite Friends
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white border border-amber-200 shadow-md hover:border-amber-400 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <ClipboardCheck className="h-5 w-5 text-amber-600" />
                    Participate in Research
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Contribute to mental health research by participating in surveys and studies.
                  </p>
                  <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">Quarterly Survey</span>
                      <span className="text-amber-700 font-bold">+$20</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium"
                    onClick={() => handleEarnCredits(20, "Research Participation")}
                  >
                    Take Survey
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="redeem" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border border-amber-200 shadow-md hover:border-amber-400 transition-all">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-t-lg">
                  <CardTitle className="text-amber-800">Standard Session Credit</CardTitle>
                  <CardDescription>Reduce your copay for individual therapy</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-amber-600">$25</span>
                    <span className="text-gray-500 ml-2">credit value</span>
                  </div>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                      Reduce standard session copay by $25
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                      Valid for any individual therapy session
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                      No limit on usage (with available credits)
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium">
                    Redeem $25 Credits
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white border border-amber-200 shadow-md hover:border-amber-400 transition-all">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-t-lg">
                  <CardTitle className="text-amber-800">Full Session Coverage</CardTitle>
                  <CardDescription>Completely eliminate your copay</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-amber-600">$100</span>
                    <span className="text-gray-500 ml-2">credit value</span>
                  </div>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                      Cover your entire session copay
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                      Premium therapist sessions included
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                      Best value for your credits
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium">
                    Redeem $100 Credits
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white border border-amber-200 shadow-md hover:border-amber-400 transition-all">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-t-lg">
                  <CardTitle className="text-amber-800 flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Thrive Apparel
                  </CardTitle>
                  <CardDescription>Shop with your earned credits</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-amber-600">1:1</span>
                    <span className="text-gray-500 ml-2">conversion rate</span>
                  </div>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                      Each $1 in credits = $1 at thrive-apparel.com
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                      Shop exclusive mental wellness merchandise
                    </li>
                    <li className="flex items-center">
                      <Star className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                      Credits available immediately at checkout
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <a href="https://thrive-apparel.com" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium">
                      Shop with Credits
                    </Button>
                  </a>
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
