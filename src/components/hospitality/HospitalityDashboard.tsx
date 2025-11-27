
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, Utensils, Clock, Users, HeartHandshake, 
  BarChart, BookOpen, CalendarDays, ArrowRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useFeatureActions from "@/hooks/useFeatureActions";

const HospitalityDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleActionClick } = useFeatureActions();

  const quickActions = [
    {
      title: "Stress Assessment",
      description: "Evaluate your current stress levels in your service role",
      icon: <ClipboardList className="h-5 w-5 text-purple-500" />,
      action: () => {
        handleActionClick({
          type: "assessment",
          id: "stress",
          title: "Hospitality Stress Assessment",
          path: "/hospitality-assessments/stress"
        });
      }
    },
    {
      title: "Burnout Check",
      description: "Identify signs of burnout in high-pressure environments",
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      action: () => {
        handleActionClick({
          type: "assessment",
          id: "burnout",
          title: "Hospitality Burnout Assessment",
          path: "/hospitality-assessments/burnout"
        });
      }
    },
    {
      title: "Work-Life Balance",
      description: "Tools to manage irregular shifts and personal time",
      icon: <HeartHandshake className="h-5 w-5 text-pink-500" />,
      action: () => {
        handleActionClick({
          type: "assessment",
          id: "work-life-balance",
          title: "Work-Life Balance Assessment",
          path: "/hospitality-assessments/work-life-balance"
        });
      }
    },
    {
      title: "Peer Support Groups",
      description: "Connect with others in the hospitality industry",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      action: () => {
        navigate("/hospitality-community", {
          state: {
            stayInPortal: true,
            preventTutorial: true,
            portalPath: "/hospitality-portal",
            tab: "community"
          }
        });
      }
    }
  ];

  const insightsData = [
    { label: "Restaurant Workers", value: "72%", description: "report high levels of work stress" },
    { label: "Late Shifts", value: "63%", description: "impact sleep quality negatively" },
    { label: "Customer Interactions", value: "58%", description: "find difficult customer situations stressful" },
    { label: "Physical Health", value: "44%", description: "report chronic back or foot pain" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-none shadow-lg">
        <CardContent className="pt-6 pb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome to your Hospitality Wellness Hub</h2>
          <p className="opacity-90">
            Tools and resources specifically designed for the unique challenges of restaurant and hospitality work
          </p>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="hover:shadow-md transition-all cursor-pointer bg-white/10 hover:border-purple-300 dark:hover:border-purple-700"
              onClick={action.action}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  {action.icon}
                </div>
                <CardTitle className="text-lg mt-2 text-white">{action.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-white/70">{action.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Industry Insights */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">Industry Insights</h3>
        <Card className="bg-white/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart className="h-5 w-5 text-purple-500" />
              Hospitality Mental Health Statistics
            </CardTitle>
            <CardDescription>
              Data from recent industry surveys on mental health challenges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {insightsData.map((item, index) => (
                <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{item.value}</div>
                  <div className="text-sm text-white/60 mt-1">{item.label}</div>
                  <div className="text-xs mt-2 text-white/70">{item.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Featured Resources */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              Featured Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-white">Managing Difficult Customer Interactions</div>
                <div className="text-sm text-white/70">Strategies for staying calm under pressure</div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-600 dark:text-purple-400"
                onClick={() => navigate("/hospitality-resources", { 
                  state: { 
                    stayInPortal: true, 
                    preventTutorial: true,
                    portalPath: "/hospitality-portal",
                    tab: "resources" 
                  } 
                })}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-white">Body Mechanics for Service Work</div>
                <div className="text-sm text-white/70">Preventing physical strain during long shifts</div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-600 dark:text-purple-400"
                onClick={() => navigate("/hospitality-resources", { 
                  state: { 
                    stayInPortal: true, 
                    preventTutorial: true,
                    portalPath: "/hospitality-portal",
                    tab: "resources" 
                  } 
                })}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-purple-500" />
              Upcoming Workshops
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-white">Building Resilience in High-Pressure Environments</div>
                <div className="text-sm text-white/70">Tomorrow, 2:00 PM</div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-600 dark:text-purple-400"
                onClick={() => navigate("/hospitality-workshops", { 
                  state: { 
                    stayInPortal: true, 
                    preventTutorial: true,
                    portalPath: "/hospitality-portal",
                    tab: "workshops" 
                  } 
                })}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-white">Mindfulness for Service Industry Professionals</div>
                <div className="text-sm text-white/70">Friday, 7:00 PM</div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-600 dark:text-purple-400"
                onClick={() => navigate("/hospitality-workshops", { 
                  state: { 
                    stayInPortal: true, 
                    preventTutorial: true,
                    portalPath: "/hospitality-portal",
                    tab: "workshops" 
                  } 
                })}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HospitalityDashboard;
