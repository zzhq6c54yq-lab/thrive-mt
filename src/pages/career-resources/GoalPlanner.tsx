import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BackButton from "@/components/navigation/BackButton";
import { Target, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

const GoalPlanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({ title: "", description: "", deadline: "" });

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.deadline) {
      toast({
        title: "Missing Information",
        description: "Please provide a goal title and deadline",
        variant: "destructive",
      });
      return;
    }

    const goal: Goal = {
      id: Date.now(),
      ...newGoal,
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: "", description: "", deadline: "" });
    toast({
      title: "Goal Added!",
      description: "Your goal has been added to your 90-day plan",
    });
  };

  const handleRemoveGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleSavePlan = () => {
    toast({
      title: "Plan Saved!",
      description: "Your 90-day career plan has been saved",
    });
    navigate("/app/career-coaching");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton onCustomBack={() => navigate("/app/career-coaching")} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              90-Day Goal Planning Worksheet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Goal Title</label>
                <Input
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Complete leadership certification"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="What actions will you take to achieve this goal?"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Target Deadline</label>
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
              <Button onClick={handleAddGoal} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>

            {goals.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Your Goals ({goals.length})</h3>
                {goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Deadline: {new Date(goal.deadline).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveGoal(goal.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {goals.length > 0 && (
              <Button onClick={handleSavePlan} className="w-full">
                Save My 90-Day Plan
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalPlanner;
