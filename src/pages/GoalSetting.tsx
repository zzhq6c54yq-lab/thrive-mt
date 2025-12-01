import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Target, Plus, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: number;
  title: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

const GoalSetting = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentGoal, setCurrentGoal] = useState({
    title: "",
    specific: "",
    measurable: "",
    achievable: "",
    relevant: "",
    timeBound: ""
  });

  const handleAddGoal = () => {
    if (!currentGoal.title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please add a goal title",
        variant: "destructive"
      });
      return;
    }

    const newGoal: Goal = {
      id: Date.now(),
      ...currentGoal
    };

    setGoals([...goals, newGoal]);
    setCurrentGoal({
      title: "",
      specific: "",
      measurable: "",
      achievable: "",
      relevant: "",
      timeBound: ""
    });
    setShowForm(false);
    
    toast({
      title: "Goal Created!",
      description: "Your SMART goal has been added successfully",
    });
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast({
      title: "Goal Removed",
      description: "The goal has been deleted",
    });
  };

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
              SMART Goal Setting
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create Specific, Measurable, Achievable, Relevant, and Time-bound mental health goals
            </p>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
            <h3 className="font-semibold mb-4">What is a SMART Goal?</h3>
            <div className="grid md:grid-cols-5 gap-4 text-sm">
              <div>
                <span className="font-semibold text-primary">S</span>pecific - Clear and well-defined
              </div>
              <div>
                <span className="font-semibold text-primary">M</span>easurable - Track your progress
              </div>
              <div>
                <span className="font-semibold text-primary">A</span>chievable - Realistic and attainable
              </div>
              <div>
                <span className="font-semibold text-primary">R</span>elevant - Aligned with your values
              </div>
              <div>
                <span className="font-semibold text-primary">T</span>ime-bound - Has a deadline
              </div>
            </div>
          </Card>

          {!showForm && (
            <div className="text-center">
              <Button size="lg" onClick={() => setShowForm(true)}>
                <Plus className="h-5 w-5 mr-2" />
                Create New Goal
              </Button>
            </div>
          )}

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Create Your SMART Goal</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Goal Title</label>
                    <Input
                      placeholder="e.g., Improve my mental wellness through meditation"
                      value={currentGoal.title}
                      onChange={(e) => setCurrentGoal({ ...currentGoal, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <span className="text-primary">S</span>pecific - What exactly do you want to achieve?
                    </label>
                    <Textarea
                      placeholder="Be specific about what you want to accomplish..."
                      value={currentGoal.specific}
                      onChange={(e) => setCurrentGoal({ ...currentGoal, specific: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <span className="text-primary">M</span>easurable - How will you track progress?
                    </label>
                    <Textarea
                      placeholder="Describe how you'll measure success..."
                      value={currentGoal.measurable}
                      onChange={(e) => setCurrentGoal({ ...currentGoal, measurable: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <span className="text-primary">A</span>chievable - Why is this goal realistic?
                    </label>
                    <Textarea
                      placeholder="Explain why this goal is attainable..."
                      value={currentGoal.achievable}
                      onChange={(e) => setCurrentGoal({ ...currentGoal, achievable: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <span className="text-primary">R</span>elevant - Why does this matter to you?
                    </label>
                    <Textarea
                      placeholder="Describe why this goal is important..."
                      value={currentGoal.relevant}
                      onChange={(e) => setCurrentGoal({ ...currentGoal, relevant: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <span className="text-primary">T</span>ime-bound - When will you achieve this?
                    </label>
                    <Input
                      placeholder="e.g., Within the next 30 days"
                      value={currentGoal.timeBound}
                      onChange={(e) => setCurrentGoal({ ...currentGoal, timeBound: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleAddGoal} className="flex-1">
                      <Check className="h-4 w-4 mr-2" />
                      Save Goal
                    </Button>
                    <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {goals.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Your Goals</h3>
              {goals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-3">
                        <Target className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-lg">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Deadline: {goal.timeBound || "No deadline set"}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    {goal.specific && (
                      <div className="mb-2">
                        <span className="text-sm font-medium">Specific: </span>
                        <span className="text-sm text-muted-foreground">{goal.specific}</span>
                      </div>
                    )}
                    {goal.measurable && (
                      <div className="mb-2">
                        <span className="text-sm font-medium">Measurable: </span>
                        <span className="text-sm text-muted-foreground">{goal.measurable}</span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GoalSetting;
