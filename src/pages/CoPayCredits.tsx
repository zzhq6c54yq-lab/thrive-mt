
import React, { useState } from "react";
import { ArrowLeft, DollarSign, Star, ShoppingBag, Gift, Users, FileText, ChevronRight, Smile, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import Page from "@/components/Page";
import HomeButton from "@/components/HomeButton";
import { Progress } from "@/components/ui/progress";
import CoPayCreditPopup from "@/components/CoPayCreditPopup";

const CoPayCredits = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [showIntroModal, setShowIntroModal] = useState(false);

  // Credits state
  const [credits, setCredits] = useState(7.50);
  const [points, setPoints] = useState(780);
  const [pointsProgress, setPointsProgress] = useState(78); // percentage

  const handleBackClick = () => {
    navigate(-1); // Navigate to previous page instead of going to home
  };

  const handleEarnCredit = (activity: string, amount: number) => {
    toast({
      title: "Activity Started",
      description: `You're now working on: ${activity}`,
    });
    
    // Simulate earning credits after a short delay
    setTimeout(() => {
      setCredits(prev => prev + amount);
      toast({
        title: "Credits Earned!",
        description: `You earned $${amount.toFixed(2)} in co-pay credits for ${activity}`,
      });
    }, 1500);
  };

  const handleRedeemCredit = (method: string, amount: number) => {
    if (credits < amount) {
      toast({
        title: "Insufficient Credits",
        description: `You need at least $${amount.toFixed(2)} credits to redeem for ${method}`,
        variant: "destructive"
      });
      return;
    }
    
    setCredits(prev => prev - amount);
    toast({
      title: "Credits Redeemed",
      description: `You used $${amount.toFixed(2)} credits for ${method}`,
    });
  };

  const handlePointsToCredits = () => {
    if (points < 500) {
      toast({
        title: "Not Enough Points",
        description: "You need at least 500 points to convert to credit",
        variant: "destructive"
      });
      return;
    }
    
    // Convert points to credits (500 points = $0.50)
    const pointsToUse = 500;
    const creditAmount = 0.50;
    
    setPoints(prev => prev - pointsToUse);
    setPointsProgress(prev => Math.max(0, prev - 50)); // Reduce progress accordingly
    setCredits(prev => prev + creditAmount);
    
    toast({
      title: "Points Converted",
      description: `Converted ${pointsToUse} points to $${creditAmount.toFixed(2)} credit`,
    });
  };

  return (
    <Page title="Co-Pay Credits" onBackClick={handleBackClick}>
      <div className="min-h-screen bg-gradient-to-b from-[#f4f9ff] to-[#edf7ff]">
        <div className="bg-gradient-to-r from-[#122f4d] to-[#1a3a5f] text-white py-12">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <Button 
                onClick={handleBackClick}
                variant="ghost" 
                className="text-blue-300 hover:text-blue-200 hover:bg-transparent p-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <HomeButton />
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-light mb-4">Co-Pay Credits</h1>
                <p className="text-xl text-gray-300 max-w-xl">
                  Earn and redeem credits to reduce your therapy costs
                </p>
              </div>
              <div className="bg-gradient-to-r from-[#0c233e]/80 to-[#143156]/80 p-5 rounded-lg text-center">
                <h2 className="text-gray-300 mb-1">Your Balance</h2>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-cyan-300 text-transparent bg-clip-text">
                  ${credits.toFixed(2)}
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-400/30 text-blue-400 hover:text-blue-300"
                  onClick={() => setShowIntroModal(true)}
                >
                  <Gift className="h-3 w-3 mr-1" />
                  How Credits Work
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container px-4 py-10 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-5 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800">Convert Your Challenge Points</h3>
                <p className="text-gray-600">1,000 points = $1.00 co-pay credit</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mt-4">
              <div className="w-full md:w-3/5">
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-gray-600 text-sm">{points} points</span>
                  <span className="text-gray-600 text-sm">1,000 points</span>
                </div>
                <Progress value={pointsProgress} className="h-3">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                </Progress>
                <p className="text-sm text-gray-500 mt-1">
                  {1000 - (points % 1000)} more points needed for your next $1 credit
                </p>
              </div>
              
              <Button 
                onClick={handlePointsToCredits}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
              >
                <Award className="h-4 w-4 mr-2" />
                Convert 500 Points to $0.50
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="earn">Earn Credits</TabsTrigger>
              <TabsTrigger value="redeem">Redeem Credits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-800">Co-Pay Credits System</CardTitle>
                  <CardDescription>
                    Earn credits through activities and redeem them to offset therapy costs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">How It Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-5 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Star className="h-5 w-5 text-blue-600" />
                          </div>
                          <h4 className="font-medium text-gray-800">1. Earn Credits</h4>
                        </div>
                        <p className="text-gray-600">
                          Complete activities, participate in research, and refer friends to earn co-pay credits.
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 p-5 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <DollarSign className="h-5 w-5 text-blue-600" />
                          </div>
                          <h4 className="font-medium text-gray-800">2. Accumulate Balance</h4>
                        </div>
                        <p className="text-gray-600">
                          Your earned credits are added to your account balance and never expire.
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 p-5 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Gift className="h-5 w-5 text-blue-600" />
                          </div>
                          <h4 className="font-medium text-gray-800">3. Redeem Credits</h4>
                        </div>
                        <p className="text-gray-600">
                          Apply your credits to therapy co-pays, plan upgrades, or Thrive apparel.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Credit Usage</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg">
                      <p className="text-gray-700">
                        Co-pay credits can be applied directly to your therapy sessions, reducing your out-of-pocket costs. 
                        Credits can also be used to upgrade your subscription plan or purchase Thrive apparel.
                      </p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                          <h5 className="font-medium text-gray-800 mb-2">Therapy Co-Pays</h5>
                          <p className="text-gray-600 text-sm">
                            Apply credits directly to your next therapy session.
                            Minimum redemption: $5.00
                          </p>
                        </div>
                        <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                          <h5 className="font-medium text-gray-800 mb-2">Subscription Upgrades</h5>
                          <p className="text-gray-600 text-sm">
                            Use credits toward upgrading your subscription plan.
                            Requirements vary by plan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="earn" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-800">Earn Co-Pay Credits</CardTitle>
                  <CardDescription>
                    Complete activities to earn credits that can reduce your therapy costs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-100 p-3 rounded-full">
                          <Award className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Daily Wellness Challenge</h3>
                          <p className="text-gray-700 mb-3">
                            Complete daily wellness challenges to earn points and credits.
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Reward:</span>
                              <span className="font-medium text-blue-600">$2.50 per challenge</span>
                            </div>
                          </div>
                          
                          <Button className="w-full" onClick={() => handleEarnCredit("Daily Wellness Challenge", 2.5)}>
                            Start Challenge
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Refer Friends & Family</h3>
                          <p className="text-gray-700 mb-3">
                            Earn credits when you refer someone who joins a Gold or Platinum level plan.
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Reward:</span>
                              <span className="font-medium text-blue-600">$2.50 per referral</span>
                            </div>
                          </div>
                          
                          <Button className="w-full" onClick={() => handleEarnCredit("Friend Referral", 2.5)}>
                            Refer Now
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                          <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Participate in Research</h3>
                          <p className="text-gray-700 mb-3">
                            Contribute to mental health research studies to earn credits.
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Reward:</span>
                              <span className="font-medium text-blue-600">$1.00 per study</span>
                            </div>
                          </div>
                          
                          <Button className="w-full" onClick={() => handleEarnCredit("Research Participation", 1.0)}>
                            View Studies
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Quarterly Survey</h3>
                          <p className="text-gray-700 mb-3">
                            Complete our quarterly feedback survey to improve our service.
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Reward:</span>
                              <span className="font-medium text-blue-600">$1.00 per survey</span>
                            </div>
                          </div>
                          
                          <Button className="w-full" onClick={() => handleEarnCredit("Quarterly Survey", 1.0)}>
                            Take Survey
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-800">Your Earnings History</CardTitle>
                  <CardDescription>
                    Track your past credit earnings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border-b">
                      <div>
                        <h4 className="font-medium">Daily Wellness Challenge</h4>
                        <p className="text-sm text-gray-500">Completed: Apr 2, 2025</p>
                      </div>
                      <span className="text-blue-600 font-medium">+$2.50</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border-b">
                      <div>
                        <h4 className="font-medium">Quarterly Survey</h4>
                        <p className="text-sm text-gray-500">Completed: Mar 25, 2025</p>
                      </div>
                      <span className="text-blue-600 font-medium">+$1.00</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border-b">
                      <div>
                        <h4 className="font-medium">Friend Referral - John Smith</h4>
                        <p className="text-sm text-gray-500">Signed up: Mar 15, 2025</p>
                      </div>
                      <span className="text-blue-600 font-medium">+$2.50</span>
                    </div>
                    <div className="flex justify-between items-center p-4">
                      <div>
                        <h4 className="font-medium">Research Participation</h4>
                        <p className="text-sm text-gray-500">Completed: Mar 10, 2025</p>
                      </div>
                      <span className="text-blue-600 font-medium">+$1.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="redeem" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-800">Redeem Your Credits</CardTitle>
                  <CardDescription>
                    Apply your earned credits to reduce your therapy costs or for other benefits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Apply to Co-Pay</h3>
                          <p className="text-gray-700 mb-3">
                            Use your credits to reduce your next therapy session co-pay.
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Minimum:</span>
                              <span className="font-medium text-blue-600">$5.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Your balance:</span>
                              <span className="font-medium text-blue-600">${credits.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            onClick={() => handleRedeemCredit("Co-Pay Reduction", 5.0)}
                            disabled={credits < 5.0}
                          >
                            Apply $5.00 to Co-Pay
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-100 p-3 rounded-full">
                          <Star className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Upgrade: Basic to Gold</h3>
                          <p className="text-gray-700 mb-3">
                            Use credits to upgrade your subscription plan from Basic to Gold.
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Required:</span>
                              <span className="font-medium text-blue-600">$5.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Your balance:</span>
                              <span className="font-medium text-blue-600">${credits.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            onClick={() => handleRedeemCredit("Basic to Gold Upgrade", 5.0)}
                            disabled={credits < 5.0}
                          >
                            Upgrade to Gold
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                          <Star className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Upgrade: Gold to Platinum</h3>
                          <p className="text-gray-700 mb-3">
                            Use credits to upgrade your subscription plan from Gold to Platinum.
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Required:</span>
                              <span className="font-medium text-blue-600">$5.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Your balance:</span>
                              <span className="font-medium text-blue-600">${credits.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            onClick={() => handleRedeemCredit("Gold to Platinum Upgrade", 5.0)}
                            disabled={credits < 5.0}
                          >
                            Upgrade to Platinum
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Star className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Upgrade: Basic to Platinum</h3>
                          <p className="text-gray-700 mb-3">
                            Use credits to upgrade your subscription plan from Basic to Platinum.
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Required:</span>
                              <span className="font-medium text-blue-600">$10.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Your balance:</span>
                              <span className="font-medium text-blue-600">${credits.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            onClick={() => handleRedeemCredit("Basic to Platinum Upgrade", 10.0)}
                            disabled={credits < 10.0}
                          >
                            Upgrade to Platinum
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-teal-100 p-3 rounded-full">
                          <ShoppingBag className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Thrive Apparel</h3>
                          <p className="text-gray-700 mb-3">
                            Use your credits at the Thrive apparel store. 1:1 conversion.
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Minimum:</span>
                              <span className="font-medium text-blue-600">$5.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Your balance:</span>
                              <span className="font-medium text-blue-600">${credits.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            onClick={() => handleRedeemCredit("Thrive Apparel", 5.0)}
                            disabled={credits < 5.0}
                          >
                            Shop Apparel
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-rose-100 p-3 rounded-full">
                          <DollarSign className="h-6 w-6 text-rose-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">Therapy Session</h3>
                          <p className="text-gray-700 mb-3">
                            Apply credits directly to your next therapy session payment.
                          </p>
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Minimum:</span>
                              <span className="font-medium text-blue-600">$5.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Your balance:</span>
                              <span className="font-medium text-blue-600">${credits.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full" 
                            onClick={() => handleRedeemCredit("Therapy Session", 5.0)}
                            disabled={credits < 5.0}
                          >
                            Apply to Therapy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-800">Redemption History</CardTitle>
                  <CardDescription>
                    Track your past credit redemptions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border-b">
                      <div>
                        <h4 className="font-medium">Co-Pay Reduction</h4>
                        <p className="text-sm text-gray-500">Applied: Mar 28, 2025</p>
                      </div>
                      <span className="text-red-600 font-medium">-$5.00</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border-b">
                      <div>
                        <h4 className="font-medium">Basic to Gold Upgrade</h4>
                        <p className="text-sm text-gray-500">Applied: Mar 15, 2025</p>
                      </div>
                      <span className="text-red-600 font-medium">-$5.00</span>
                    </div>
                    <div className="flex justify-between items-center p-4">
                      <div>
                        <h4 className="font-medium">Thrive Apparel Purchase</h4>
                        <p className="text-sm text-gray-500">Applied: Mar 5, 2025</p>
                      </div>
                      <span className="text-red-600 font-medium">-$10.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <CoPayCreditPopup open={showIntroModal} onOpenChange={setShowIntroModal} />
    </Page>
  );
};

export default CoPayCredits;
