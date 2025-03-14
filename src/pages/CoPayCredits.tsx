import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Wallet, History, Gift, PlusCircle, Clock, Heart, Users, ClipboardCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const CoPayCredits = () => {
  const { toast } = useToast();

  const transactions = [
    { id: 1, type: "Used", amount: 25, date: "2023-06-15", provider: "Dr. Smith, Therapy Session" },
    { id: 2, type: "Earned", amount: 50, date: "2023-06-10", provider: "Monthly Wellness Activities" },
    { id: 3, type: "Used", amount: 25, date: "2023-06-05", provider: "Dr. Jones, Therapy Session" },
    { id: 4, type: "Earned", amount: 100, date: "2023-06-01", provider: "Referral Bonus" },
    { id: 5, type: "Used", amount: 25, date: "2023-05-25", provider: "Dr. Smith, Therapy Session" },
    { id: 6, type: "Earned", amount: 30, date: "2023-05-20", provider: "Completed Health Assessment" },
  ];

  const earningOptions = [
    {
      title: "Complete Wellness Activities",
      description: "Earn 10 credits per activity",
      icon: Heart,
      action: "View Activities"
    },
    {
      title: "Refer a Friend",
      description: "Earn 100 credits per referral",
      icon: Users,
      action: "Refer Now"
    },
    {
      title: "Complete Assessments",
      description: "Earn 30 credits per assessment",
      icon: ClipboardCheck,
      action: "Take Assessment"
    },
    {
      title: "Attend Workshops",
      description: "Earn 25 credits per workshop",
      icon: Users,
      action: "Browse Workshops"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Co-Pay Credits</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Earn and use credits to reduce or eliminate therapy co-payments.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-500" />
                Your Credit Balance
              </CardTitle>
              <CardDescription>
                Use your credits to reduce or eliminate co-payments for therapy sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">255</div>
                  <p className="text-gray-500">Available Credits</p>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Next Milestone: 500 credits</span>
                    <span className="text-sm font-medium">255/500</span>
                  </div>
                  <Progress value={51} className="h-2" />
                  <p className="text-sm text-gray-500 mt-2">
                    Earn 245 more credits to unlock premium therapy services
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Credit Information",
                    description: "Each credit is worth $1 towards your co-pay for therapy sessions.",
                  });
                }}
              >
                How Credits Work
              </Button>
              <Button
                onClick={() => {
                  toast({
                    title: "Redeem Credits",
                    description: "Credits will be automatically applied to your next therapy session.",
                  });
                }}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Use Credits
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-purple-500" />
                Quick Earn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <PlusCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Complete Daily Check-in</span>
                  </div>
                  <p className="text-sm text-gray-500">Earn 5 credits</p>
                </div>
                
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <PlusCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Weekly Wellness Quiz</span>
                  </div>
                  <p className="text-sm text-gray-500">Earn 15 credits</p>
                </div>
                
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <PlusCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Refer a Friend</span>
                  </div>
                  <p className="text-sm text-gray-500">Earn 100 credits</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Earning Options",
                    description: "Explore all the ways you can earn co-pay credits.",
                  });
                }}
              >
                See All Earning Options
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="history">Transaction History</TabsTrigger>
            <TabsTrigger value="earn">Ways to Earn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-blue-500" />
                  Credit Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={transaction.type === "Earned" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                            >
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {transaction.type === "Earned" ? "+" : "-"}{transaction.amount} credits
                          </TableCell>
                          <TableCell>{transaction.provider}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Older Transactions
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="earn" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {earningOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-sm transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <option.icon />
                      {option.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{option.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      {option.action}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Credit Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Credits are valid for 12 months from the date they are earned</li>
                  <li>• One credit equals $1 towards co-payments for therapy services</li>
                  <li>• Credits cannot be transferred or exchanged for cash</li>
                  <li>• Maximum 500 credits can be applied per month</li>
                  <li>• Credits are automatically applied to your sessions</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CoPayCredits;
