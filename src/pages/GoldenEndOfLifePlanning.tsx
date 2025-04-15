
import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, FileCheck, BookText, PenSquare, Download, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GoldenEndOfLifePlanning: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3A302A] via-[#4A3F36] to-[#5D4C3B] text-white">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1zm-16 4h2v2H1V5zm4 0h2v2H5V5zm4 0h2v2H9V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5zm-16 4h2v2H1V9zm4 0h2v2H5V9zm4 0h2v2H9V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zm-16 4h2v2H1v-2zm4 0h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z%22 fill=%22%23C8C8C9%22 fill-opacity=%220.05%22/></svg>')] opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5 z-0"></div>
      
      <NavigationBar 
        showBackButton={true} 
        showHomeButton={false}
        showThriveButton={true}
        title="End-of-Life Planning"
        portalMode={true}
        portalPath="/golden-years-portal"
      />
      
      <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-[#2A2420]/90 backdrop-blur-md border-2 border-[#D4AF37]/30 mb-8 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#3A302A] to-[#2A2420] border-b border-[#D4AF37]/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#D4AF37]/20">
                  <FileText className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-[#F5DEB3]">End-of-Life Planning Resources</CardTitle>
                  <p className="text-[#F5DEB3]/80 mt-1">Peace of mind for you and your loved ones</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-100 mb-6">
                Creating an end-of-life plan is one of the most thoughtful gifts you can give to your loved ones. 
                Our comprehensive resources will guide you through creating legal documents, making healthcare 
                decisions, and communicating your wishes clearly to provide comfort and direction for your family.
              </p>
              
              <Tabs defaultValue="documents" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6 bg-[#1A1811]/50">
                  <TabsTrigger value="documents" className="data-[state=active]:bg-[#D4AF37]/20">Essential Documents</TabsTrigger>
                  <TabsTrigger value="decisions" className="data-[state=active]:bg-[#D4AF37]/20">Important Decisions</TabsTrigger>
                  <TabsTrigger value="resources" className="data-[state=active]:bg-[#D4AF37]/20">Helpful Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="documents" className="border border-[#D4AF37]/20 rounded-lg p-6 bg-[#1A1811]/50">
                  <h3 className="text-xl font-medium mb-4 text-[#F5DEB3]">Essential Legal Documents</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
                      <div className="flex items-center mb-2">
                        <FileCheck className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        <h4 className="text-lg font-medium text-[#F5DEB3]">Last Will and Testament</h4>
                      </div>
                      <p className="text-gray-200 text-sm mb-3">
                        Ensure your assets are distributed according to your wishes and provide for your loved ones.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      >
                        Will Template <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
                      <div className="flex items-center mb-2">
                        <FileCheck className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        <h4 className="text-lg font-medium text-[#F5DEB3]">Advance Healthcare Directive</h4>
                      </div>
                      <p className="text-gray-200 text-sm mb-3">
                        Document your preferences for medical care if you become unable to make decisions.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      >
                        Healthcare Directive Guide <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
                      <div className="flex items-center mb-2">
                        <FileCheck className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        <h4 className="text-lg font-medium text-[#F5DEB3]">Power of Attorney</h4>
                      </div>
                      <p className="text-gray-200 text-sm mb-3">
                        Appoint someone you trust to make financial and legal decisions on your behalf if needed.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      >
                        Power of Attorney Forms <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="decisions" className="border border-[#D4AF37]/20 rounded-lg p-6 bg-[#1A1811]/50">
                  <h3 className="text-xl font-medium mb-4 text-[#F5DEB3]">Important Decisions to Consider</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
                      <div className="flex items-center mb-2">
                        <CheckSquare className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        <h4 className="text-lg font-medium text-[#F5DEB3]">Medical Preferences</h4>
                      </div>
                      <p className="text-gray-200 mb-1">
                        Consider and document your preferences regarding:
                      </p>
                      <ul className="list-disc list-inside text-gray-200 text-sm ml-4">
                        <li>Life-sustaining treatments</li>
                        <li>Palliative and hospice care</li>
                        <li>Organ donation wishes</li>
                        <li>Pain management approaches</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
                      <div className="flex items-center mb-2">
                        <CheckSquare className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        <h4 className="text-lg font-medium text-[#F5DEB3]">Final Arrangements</h4>
                      </div>
                      <p className="text-gray-200 mb-1">
                        Consider your preferences regarding:
                      </p>
                      <ul className="list-disc list-inside text-gray-200 text-sm ml-4">
                        <li>Burial or cremation</li>
                        <li>Memorial service details</li>
                        <li>Legacy donations or charitable gifts</li>
                        <li>Personal mementos for loved ones</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="border border-[#D4AF37]/20 rounded-lg p-6 bg-[#1A1811]/50">
                  <h3 className="text-xl font-medium mb-4 text-[#F5DEB3]">Helpful Resources</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
                      <div className="flex items-center mb-2">
                        <BookText className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        <h4 className="text-lg font-medium text-[#F5DEB3]">Estate Planning Guide</h4>
                      </div>
                      <p className="text-gray-200 text-sm mb-3">
                        Comprehensive guide to organizing your estate and ensuring your wishes are honored.
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-[#D4AF37] hover:bg-[#B8860B] text-white w-full"
                      >
                        Read Guide
                      </Button>
                    </div>
                    
                    <div className="bg-[#2A2420]/70 p-4 rounded-lg border border-[#D4AF37]/10">
                      <div className="flex items-center mb-2">
                        <PenSquare className="h-5 w-5 mr-2 text-[#D4AF37]" />
                        <h4 className="text-lg font-medium text-[#F5DEB3]">Legacy Letter Template</h4>
                      </div>
                      <p className="text-gray-200 text-sm mb-3">
                        Express your values, life lessons, and messages to loved ones.
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-[#D4AF37] hover:bg-[#B8860B] text-white w-full"
                      >
                        View Template
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      className="w-full bg-[#4A3F36] hover:bg-[#5D4C3B] text-white border border-[#D4AF37]/20"
                      onClick={() => navigate('/golden-years-journal', { 
                        state: { 
                          stayInPortal: true,
                          preventTutorial: true,
                          portalPath: '/golden-years-portal'
                        }
                      })}
                    >
                      Start Your Legacy Journal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="bg-[#1A1811]/70 backdrop-blur-sm border border-[#D4AF37]/30 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-medium mb-4 text-[#F5DEB3] flex items-center">
              <FileText className="h-5 w-5 mr-2 text-[#D4AF37]" /> Why Planning Matters
            </h3>
            <p className="text-gray-100 mb-4">
              Creating an end-of-life plan isn't just about making legal arrangements—it's about providing 
              clarity, comfort, and direction for your loved ones during a difficult time. Taking these steps now 
              ensures your wishes are respected and reduces the burden on your family when decisions need to be made.
            </p>
            <p className="text-gray-100">
              Our resources are designed to make this process thoughtful, comprehensive, and as simple as possible.
            </p>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate('/golden-years-portal', { 
                state: { 
                  stayInPortal: true,
                  preventTutorial: true
                }
              })}
              className="bg-[#3A302A] hover:bg-[#2A2418] text-white border border-[#D4AF37]/30"
            >
              Back to Golden Years Portal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldenEndOfLifePlanning;
