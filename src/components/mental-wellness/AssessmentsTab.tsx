import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Activity, Smile, TrendingUp, Clock, BarChart3, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AssessmentsTab: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAssessmentStart = (assessmentType: string) => {
    navigate("/app/mental-wellness-assessments");
    toast({
      title: "Starting Assessment",
      description: `Loading ${assessmentType} assessment...`,
    });
  };

  const assessments = [
    {
      title: "Anxiety Screening",
      description: "GAD-7 assessment to evaluate anxiety symptoms and severity over the past two weeks.",
      icon: <Brain className="h-6 w-6 text-primary" />,
      duration: "2-3 min",
      questions: 7,
      type: "GAD-7",
      color: "from-primary/10 to-primary/5"
    },
    {
      title: "Depression Check",
      description: "PHQ-9 validated screening tool to assess depressive symptoms and their impact.",
      icon: <Heart className="h-6 w-6 text-destructive" />,
      duration: "3-4 min",
      questions: 9,
      type: "PHQ-9",
      color: "from-destructive/10 to-destructive/5"
    },
    {
      title: "Stress Assessment",
      description: "Evaluate your current stress levels and identify key stressors in your life.",
      icon: <Activity className="h-6 w-6 text-accent" />,
      duration: "5 min",
      questions: 10,
      type: "PSS-10",
      color: "from-accent/10 to-accent/5"
    },
    {
      title: "Well-being Index",
      description: "WHO-5 measure of current mental well-being and quality of life indicators.",
      icon: <Smile className="h-6 w-6 text-secondary" />,
      duration: "1-2 min",
      questions: 5,
      type: "WHO-5",
      color: "from-secondary/10 to-secondary/5"
    }
  ];

  const progressStats = [
    { label: "Completed", value: 3, icon: <CheckCircle2 className="h-5 w-5" /> },
    { label: "In Progress", value: 1, icon: <Clock className="h-5 w-5" /> },
    { label: "Trend", value: "+5%", icon: <TrendingUp className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-10">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-morphism rounded-2xl border-2 border-border/50 p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Your Assessment Progress
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {progressStats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Assessment Cards */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Mental Health Assessments</h2>
          <p className="text-muted-foreground">
            Evidence-based screening tools to help you understand your mental health. 
            These assessments are not diagnostic tools but can guide conversations with healthcare providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((assessment, index) => (
            <motion.div
              key={assessment.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full glass-morphism border-2 border-border/50 hover:border-primary/30 hover:shadow-xl transition-all overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${assessment.color}`}></div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                      {assessment.icon}
                    </div>
                    <Badge variant="outline" className="border-primary/30">
                      {assessment.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{assessment.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {assessment.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{assessment.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Activity className="h-4 w-4" />
                      <span>{assessment.questions} questions</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 group"
                    onClick={() => handleAssessmentStart(assessment.title)}
                  >
                    Start Assessment
                    <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Assessment History CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-morphism rounded-2xl border-2 border-primary/30 p-8 text-center"
      >
        <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="font-bold text-2xl mb-3">Track Your Progress Over Time</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          View your assessment history, track trends, and see how your mental health changes over time.
          Share results with your healthcare provider for better care.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate("/app/progress-reports")}
          >
            View Assessment History
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-primary/30 hover:bg-primary/5"
          >
            Download Report
          </Button>
        </div>
      </motion.div>

      {/* Important Note */}
      <div className="bg-muted/50 border border-border rounded-xl p-6">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Important Information
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These screening tools are for educational purposes and are not a substitute for professional diagnosis. 
          If you're experiencing mental health concerns, please consult with a qualified healthcare provider. 
          If you're in crisis, please contact emergency services or a crisis hotline immediately.
        </p>
      </div>
    </div>
  );
};

export default AssessmentsTab;
