import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface HomeworkTask {
  id: string;
  assigned_by: string;
  assigned_to: string;
  organization_id: string | null;
  title: string;
  description: string | null;
  task_type: 'journal' | 'exercise' | 'reading' | 'activity' | 'assessment' | 'meditation' | 'custom';
  due_date: string | null;
  priority: 'low' | 'medium' | 'high';
  resources: unknown[];
  completed_at: string | null;
  completion_notes: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
  created_at: string;
  updated_at: string;
  assigner?: {
    id: string;
    display_name: string;
  };
}

export function useHomeworkTasks(role: 'user' | 'provider' = 'user') {
  const [tasks, setTasks] = useState<HomeworkTask[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, [role]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const column = role === 'user' ? 'assigned_to' : 'assigned_by';

      const { data, error } = await supabase
        .from('homework_tasks')
        .select(`
          *,
          assigner:profiles!homework_tasks_assigned_by_fkey(id, display_name)
        `)
        .eq(column, user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks((data as unknown as HomeworkTask[]) || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: 'Error',
        description: 'Failed to load homework tasks',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: {
    assigned_to: string;
    title: string;
    description?: string;
    task_type?: HomeworkTask['task_type'];
    due_date?: string;
    priority?: HomeworkTask['priority'];
    resources?: unknown[];
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('homework_tasks')
        .insert({
          assigned_by: user.id,
          assigned_to: task.assigned_to,
          title: task.title,
          description: task.description,
          task_type: task.task_type || 'custom',
          due_date: task.due_date,
          priority: task.priority || 'medium',
          resources: task.resources || [],
        } as any)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Task Assigned',
        description: 'Homework task has been assigned successfully',
      });

      await fetchTasks();
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to create homework task',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateTask = async (
    taskId: string,
    updates: Partial<Pick<HomeworkTask, 'status' | 'completed_at' | 'completion_notes'>>
  ) => {
    try {
      const { error } = await supabase
        .from('homework_tasks')
        .update(updates)
        .eq('id', taskId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });

      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const completeTask = async (taskId: string, notes?: string) => {
    return updateTask(taskId, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      completion_notes: notes,
    });
  };

  const startTask = async (taskId: string) => {
    return updateTask(taskId, { status: 'in_progress' });
  };

  const getPendingTasks = () => tasks.filter(t => t.status === 'pending' || t.status === 'in_progress');
  const getCompletedTasks = () => tasks.filter(t => t.status === 'completed');
  const getOverdueTasks = () => tasks.filter(t => {
    if (!t.due_date || t.status === 'completed' || t.status === 'cancelled') return false;
    return new Date(t.due_date) < new Date();
  });

  return {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    completeTask,
    startTask,
    getPendingTasks,
    getCompletedTasks,
    getOverdueTasks,
  };
}
