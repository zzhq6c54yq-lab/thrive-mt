
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Calendar, Award, BookOpen, ChevronRight, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef1f5]">
      <div className="bg-gradient-to-r from-[#1a1a1f] to-[#212124] text-white py-12 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">My Profile</h1>
          <p className="text-xl text-gray-300 max-w-3xl">View and manage your personal information and progress.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>Member since January 2024</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="mt-2">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Profile Completion</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Wellness Score</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Goal Progress</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between py-3 border-b">
                    <dt className="text-gray-500">Email</dt>
                    <dd className="font-medium">john.doe@example.com</dd>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <dt className="text-gray-500">Phone</dt>
                    <dd className="font-medium">+1 (555) 123-4567</dd>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <dt className="text-gray-500">Location</dt>
                    <dd className="font-medium">New York, USA</dd>
                  </div>
                  <div className="flex justify-between py-3">
                    <dt className="text-gray-500">Time Zone</dt>
                    <dd className="font-medium">Eastern Time (ET)</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "2024-03-14", activity: "Completed weekly check-in" },
                    { date: "2024-03-12", activity: "Attended therapy session" },
                    { date: "2024-03-10", activity: "Completed mindfulness exercise" },
                    { date: "2024-03-08", activity: "Updated wellness goals" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500">{item.date}</div>
                        <div>{item.activity}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Early Bird", description: "Completed 5 morning check-ins" },
                    { title: "Mindfulness Master", description: "30 days of meditation" },
                    { title: "Goal Getter", description: "Achieved first wellness goal" },
                    { title: "Consistent Care", description: "Attended 10 therapy sessions" }
                  ].map((achievement, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
