
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookUser, Brain, Users, Heart, Lightbulb } from "lucide-react";
import ActionButton from "@/components/navigation/ActionButton";

const EducatorsWorkshops: React.FC = () => {
  const workshops = [
    {
      id: "classroom-boundaries",
      title: "Setting Healthy Classroom Boundaries",
      description: "Learn effective techniques for maintaining professional boundaries while creating a supportive classroom environment for students and protecting your mental well-being.",
      duration: "45 minutes",
      modules: 4,
      icon: BookUser,
      category: "Classroom Management",
      featured: true,
    },
    {
      id: "emotional-resilience",
      title: "Building Emotional Resilience for Educators",
      description: "Develop skills to cope with the emotional demands of teaching and bounce back from challenging classroom situations.",
      duration: "60 minutes",
      modules: 6,
      icon: Heart,
      category: "Resilience",
      featured: false,
    },
    {
      id: "admin-communication",
      title: "Effective Communication with Administration",
      description: "Strategies for advocating for yourself and your students while maintaining productive relationships with school leadership.",
      duration: "30 minutes",
      modules: 3,
      icon: Users,
      category: "Professional Relationships",
      featured: false,
    },
    {
      id: "mindful-teaching",
      title: "Mindfulness Practices for Educators",
      description: "Learn mindfulness techniques that can be integrated into your teaching day to reduce stress and increase presence in the classroom.",
      duration: "50 minutes",
      modules: 5,
      icon: Brain,
      category: "Mindfulness",
      featured: false,
    },
    {
      id: "creative-teaching",
      title: "Rekindling Teaching Creativity",
      description: "Rediscover your passion for teaching through creative approaches that benefit both your students and your professional satisfaction.",
      duration: "45 minutes",
      modules: 4,
      icon: Lightbulb,
      category: "Teaching Innovation",
      featured: false,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-6 rounded-lg border border-indigo-500/30 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Professional Development Workshops</h2>
        <p className="text-gray-200">
          Self-paced workshops designed to help educators develop skills for maintaining mental well-being while navigating the challenges of educational environments.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {workshops.map((workshop) => (
          <Card key={workshop.id} className={`overflow-hidden ${workshop.featured 
              ? "bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/40" 
              : "bg-[#1e1e2f]/80 border-purple-500/20"}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-4 ${workshop.featured ? "bg-purple-600/50" : "bg-purple-900/50"}`}>
                    <workshop.icon className="h-5 w-5 text-purple-200" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{workshop.title}</CardTitle>
                    <CardDescription className="text-gray-300">{workshop.category}</CardDescription>
                  </div>
                </div>
                {workshop.featured && (
                  <Badge variant="secondary" className="bg-purple-600 text-white">Featured</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 mb-4">{workshop.description}</p>
              <div className="flex items-center text-sm text-gray-400 space-x-4">
                <span>Duration: {workshop.duration}</span>
                <span>•</span>
                <span>{workshop.modules} Modules</span>
              </div>
            </CardContent>
            <CardFooter className={`border-t pt-4 ${workshop.featured ? "border-purple-500/40" : "border-purple-500/20"}`}>
              <ActionButton
                type="workshop"
                id={workshop.id}
                path={`/educators-workshops/${workshop.id}`}
                title="Start Workshop"
                variant="default"
                className={workshop.featured 
                  ? "bg-purple-600 hover:bg-purple-700 text-white w-full"
                  : "bg-purple-800 hover:bg-purple-700 text-white w-full"}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducatorsWorkshops;
