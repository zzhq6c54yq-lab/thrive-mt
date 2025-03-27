
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, Calendar, Users, Award, HeartHandshake } from "lucide-react";
import HomeButton from "@/components/HomeButton";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const CorporateWellness = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useScrollToTop();

  // Check if we have a specific resource or workshop to show from navigation state
  const resource = location.state?.resource;
  const workshop = location.state?.workshop;
  const showWorkshopContent = location.state?.showWorkshopContent;

  const handleBackToPortal = () => {
    navigate("/corporate-employee-portal");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2 p-0 h-auto" 
              onClick={handleBackToPortal}
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Corporate Wellness</h1>
              <p className="text-gray-600">Mental health support in the workplace</p>
            </div>
          </div>
          <HomeButton />
        </div>

        {resource ? (
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{resource}</h2>
            <p className="text-gray-600 mb-6">
              This specific resource is currently under development. Check back soon for the full content.
            </p>
            <Button onClick={handleBackToPortal}>
              Back to Portal
            </Button>
          </div>
        ) : workshop && showWorkshopContent ? (
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{workshop}</h2>
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="mr-4">Next session: Tuesdays, 2:00PM</span>
              <Users className="h-4 w-4 mr-2" />
              <span>Facilitator: Dr. Jamie Martinez</span>
            </div>
            <p className="text-gray-600 mb-6">
              This workshop is scheduled to begin soon. You'll receive a calendar invitation and reminder 
              24 hours before the session begins.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-800 mb-2">Preparation Materials</h3>
              <p className="text-blue-700 text-sm">
                Please take a few minutes to review the preparation materials before the workshop begins.
                You'll find them in your email inbox.
              </p>
            </div>
            <Button onClick={handleBackToPortal}>
              Back to Portal
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Corporate Wellness Program</CardTitle>
                    <CardDescription>
                      Transforming workplace mental health through evidence-based solutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    <p className="mb-4">
                      Our Corporate Wellness Program offers a comprehensive approach to mental health in the 
                      workplace, designed to support employees at all levels while providing measurable outcomes 
                      for organizational success.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Organization-Wide Support</h3>
                          <p className="text-sm text-gray-600">Scalable solutions for companies of all sizes</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Leadership Training</h3>
                          <p className="text-sm text-gray-600">Equipping managers to support team mental health</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Award className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">ROI Measurement</h3>
                          <p className="text-sm text-gray-600">Tracking program impact on productivity and retention</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <HeartHandshake className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Personalized Support</h3>
                          <p className="text-sm text-gray-600">Individual resources tailored to employee needs</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => navigate("/corporate-employee-portal")}
                    >
                      Employee Portal
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>For HR Leaders</CardTitle>
                  <CardDescription>Implementation resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Program Overview</div>
                      <div className="text-sm text-gray-600 mb-2">Complete explanation of services and benefits</div>
                      <Button variant="outline" size="sm" className="w-full">Download PDF</Button>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">ROI Calculator</div>
                      <div className="text-sm text-gray-600 mb-2">Estimate your organization's potential benefits</div>
                      <Button variant="outline" size="sm" className="w-full">Access Tool</Button>
                    </li>
                    <li className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-1">Implementation Guide</div>
                      <div className="text-sm text-gray-600 mb-2">Step-by-step program rollout instructions</div>
                      <Button variant="outline" size="sm" className="w-full">View Guide</Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Corporate Wellness Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-green-600 font-bold text-lg">1</span>
                    </div>
                    <CardTitle>Assessment & Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We begin with a comprehensive assessment of your organization's current mental health climate, 
                      identifying specific challenges, strengths, and opportunities for improvement.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-blue-600 font-bold text-lg">2</span>
                    </div>
                    <CardTitle>Customized Implementation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Based on assessment results, we develop a tailored program that addresses your specific needs, 
                      including workshops, resources, and support systems.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-purple-600 font-bold text-lg">3</span>
                    </div>
                    <CardTitle>Ongoing Support & Evaluation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our partnership continues with regular evaluation of program effectiveness, adjustments based 
                      on feedback, and continued support for sustained improvement.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Transform Your Workplace?</h2>
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Schedule a Consultation</h3>
                      <p className="text-gray-600 mb-6">
                        Speak with our corporate wellness specialists to learn how our program can be customized 
                        for your organization's specific needs and goals.
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700">Request Information</Button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium mb-4">What you'll receive:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-600 text-sm">Personalized program proposal</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-600 text-sm">ROI analysis for your organization</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-600 text-sm">Implementation timeline</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-600 text-sm">Pricing and package options</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CorporateWellness;
