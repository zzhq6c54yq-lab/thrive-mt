import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, FileText, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FinancialHelpBanner } from "@/components/therapy/FinancialHelpBanner";

const tools = [
  {
    id: 1,
    title: "Session Preparation",
    icon: BookOpen,
    description: "Prepare for your next therapy session with guided prompts",
    action: "Start Prep",
    path: "/journaling"
  },
  {
    id: 2,
    title: "Therapy Journal",
    icon: FileText,
    description: "Track insights, breakthroughs, and homework between sessions",
    action: "Open Journal",
    path: "/journal"
  },
  {
    id: 3,
    title: "Progress Tracking",
    icon: TrendingUp,
    description: "Monitor your therapeutic goals and growth over time",
    action: "View Progress",
    path: "/progress-reports"
  },
  {
    id: 4,
    title: "Session Notes",
    icon: Calendar,
    description: "Document key takeaways and action items from each session",
    action: "Add Notes",
    path: "/journaling"
  }
];

const resources = [
  {
    title: "Between-Session Activities",
    items: [
      "Practice CBT techniques learned in therapy",
      "Complete therapy homework assignments",
      "Track mood and triggers daily",
      "Review and reflect on session notes"
    ]
  },
  {
    title: "Crisis Support",
    items: [
      "National Suicide Prevention Lifeline: 988",
      "Crisis Text Line: Text HOME to 741741",
      "NAMI Helpline: 1-800-950-NAMI (6264)",
      "Contact your therapist's emergency line"
    ]
  }
];

const TherapySupport = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/app/mental-wellness-tools")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Wellness Tools
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Between-Session Support
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tools to maximize your therapy experience and maintain progress between sessions
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-2">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">
                Complement Your Therapy Journey
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                These tools are designed to enhance your therapeutic work. They do not replace
                professional therapy but can help you get more from your sessions.
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => navigate(tool.path)}
                    >
                      {tool.action}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-lg mb-4">{resource.title}</h3>
                <ul className="space-y-3">
                  {resource.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Financial Help Banner */}
          <FinancialHelpBanner className="mb-6" />

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Find a Therapist</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Not currently in therapy? Find a qualified mental health professional
              </p>
              <Button size="lg" onClick={() => navigate("/app/real-time-therapy")}>
                Search Therapists
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">Remember:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• These tools supplement, not replace, professional therapy</li>
              <li>• Share your use of these tools with your therapist</li>
              <li>• Be honest about your progress and challenges</li>
              <li>• If in crisis, contact emergency services or crisis helplines immediately</li>
              <li>• Therapy takes time - be patient with yourself</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TherapySupport;
