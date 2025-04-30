
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookUser, Brain, MessageSquare, Users, Heart, CalendarDays } from "lucide-react";
import ActionButton from "@/components/navigation/ActionButton";
import { useLocation } from "react-router-dom";

const EducatorsDashboard: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-100">
              <Brain className="mr-2 h-5 w-5 text-purple-300" />
              Featured Assessment
            </CardTitle>
            <CardDescription className="text-purple-200">
              Understand your stress triggers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-medium text-white mb-2">Educator Burnout Assessment</h3>
            <p className="text-purple-100 mb-4">
              Identify signs of burnout and receive personalized strategies to restore your teaching passion.
            </p>
            <ActionButton
              type="assessment"
              id="educator-burnout"
              path="/educators-assessments/educator-burnout"
              title="Take Assessment"
              variant="default"
              className="bg-purple-600 hover:bg-purple-700 text-white w-full"
            />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-100">
              <BookUser className="mr-2 h-5 w-5 text-indigo-300" />
              Featured Workshop
            </CardTitle>
            <CardDescription className="text-indigo-200">
              Enhance your teaching well-being
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-medium text-white mb-2">Classroom Boundaries Workshop</h3>
            <p className="text-indigo-100 mb-4">
              Learn effective techniques for maintaining healthy boundaries while remaining an engaged educator.
            </p>
            <ActionButton
              type="workshop"
              id="classroom-boundaries"
              path="/educators-workshops/classroom-boundaries"
              title="Start Workshop"
              variant="default"
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1e1e2f]/50 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center text-white">
              <MessageSquare className="h-4 w-4 mr-2 text-purple-400" />
              Community Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300 mb-3">
              Connect with peers facing similar challenges in education
            </p>
            <ActionButton
              type="discussion"
              path="/educators-community"
              title="Join Discussions"
              variant="outline"
              state={{ tab: "community" }}
              className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-900/20"
            />
          </CardContent>
        </Card>

        <Card className="bg-[#1e1e2f]/50 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center text-white">
              <Heart className="h-4 w-4 mr-2 text-purple-400" />
              Self-Care Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300 mb-3">
              Access tools for maintaining well-being throughout the school year
            </p>
            <ActionButton
              type="practice"
              id="educator-selfcare"
              path="/educators-practice/educator-selfcare"
              title="Explore Resources"
              variant="outline"
              className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-900/20"
            />
          </CardContent>
        </Card>

        <Card className="bg-[#1e1e2f]/50 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center text-white">
              <CalendarDays className="h-4 w-4 mr-2 text-purple-400" />
              Wellness Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300 mb-3">
              Virtual and in-person events focused on educator mental health
            </p>
            <ActionButton
              type="join"
              path="/educators-events"
              title="View Schedule"
              variant="outline"
              className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-900/20"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="relative overflow-hidden bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <div className="absolute inset-0 opacity-10 bg-pattern-grid"></div>
        <CardHeader>
          <CardTitle className="text-white">Crisis Support for Educators</CardTitle>
          <CardDescription className="text-purple-200">
            Immediate support for educators facing crisis situations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-black/20 p-4 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-medium text-white mb-2">You're not alone</h3>
            <p className="text-gray-300 mb-4">
              Education can be an emotionally demanding profession. If you're feeling overwhelmed, help is available 24/7.
            </p>
            <div className="flex flex-wrap gap-3">
              <ActionButton
                type="other"
                path="/crisis-support"
                title="Access Crisis Support"
                variant="destructive"
                className="bg-red-700 hover:bg-red-800"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorsDashboard;
