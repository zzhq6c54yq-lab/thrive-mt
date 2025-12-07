import { useState } from 'react';
import { useHomeworkTasks, HomeworkTask } from '@/hooks/useHomeworkTasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ClipboardList, 
  BookOpen, 
  Dumbbell, 
  Brain, 
  Pencil,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const taskTypeIcons: Record<HomeworkTask['task_type'], React.ReactNode> = {
  journal: <Pencil className="h-4 w-4" />,
  exercise: <Dumbbell className="h-4 w-4" />,
  reading: <BookOpen className="h-4 w-4" />,
  activity: <ClipboardList className="h-4 w-4" />,
  assessment: <ClipboardList className="h-4 w-4" />,
  meditation: <Brain className="h-4 w-4" />,
  custom: <ClipboardList className="h-4 w-4" />,
};

const priorityColors: Record<HomeworkTask['priority'], string> = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-amber-500/20 text-amber-600',
  high: 'bg-destructive/20 text-destructive',
};

export function HomeworkTasksWidget() {
  const { tasks, loading, completeTask, startTask, getPendingTasks } = useHomeworkTasks('user');
  const [completing, setCompleting] = useState<string | null>(null);

  const pendingTasks = getPendingTasks();

  const handleComplete = async (taskId: string) => {
    setCompleting(taskId);
    try {
      await completeTask(taskId);
    } finally {
      setCompleting(null);
    }
  };

  const handleStart = async (taskId: string) => {
    await startTask(taskId);
  };

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Homework & Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-muted/50 animate-pulse rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (pendingTasks.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Homework & Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <ClipboardList className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>No pending tasks</p>
            <p className="text-sm">Your therapist will assign tasks here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Homework & Tasks
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {pendingTasks.length} pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pendingTasks.slice(0, 5).map(task => (
            <div
              key={task.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-background/50",
                "hover:bg-background/80 transition-colors"
              )}
            >
              <Checkbox
                checked={task.status === 'completed'}
                onCheckedChange={() => handleComplete(task.id)}
                disabled={completing === task.id}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-muted-foreground">
                    {taskTypeIcons[task.task_type]}
                  </span>
                  <span className="font-medium text-sm truncate">{task.title}</span>
                  <Badge className={cn("text-xs", priorityColors[task.priority])}>
                    {task.priority}
                  </Badge>
                </div>
                {task.description && (
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                    {task.description}
                  </p>
                )}
                {task.due_date && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Due {format(new Date(task.due_date), 'MMM d')}
                  </div>
                )}
              </div>
              {task.status === 'pending' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStart(task.id)}
                  className="shrink-0"
                >
                  Start
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
