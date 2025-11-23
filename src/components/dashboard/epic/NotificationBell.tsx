import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'therapist_message' | 'ai_insight' | 'reward' | 'streak_milestone';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const NotificationBell: React.FC = () => {
  // Mock notifications - will be replaced with real data
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'ai_insight',
      title: 'New Insight Available',
      message: 'Your mood improves on days you journal',
      time: '2h ago',
      read: false,
    },
    {
      id: '2',
      type: 'streak_milestone',
      title: 'Streak Milestone! 🔥',
      message: "You've maintained a 7-day streak!",
      time: '1d ago',
      read: false,
    },
    {
      id: '3',
      type: 'reward',
      title: 'Reward Unlocked',
      message: 'You earned $5 co-pay credit',
      time: '2d ago',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'therapist_message':
        return '💬';
      case 'ai_insight':
        return '💡';
      case 'reward':
        return '🎁';
      case 'streak_milestone':
        return '🔥';
      default:
        return '📢';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="px-3 py-2 border-b border-border">
          <h3 className="font-semibold text-sm">Notifications</h3>
        </div>
        {notifications.length === 0 ? (
          <div className="px-3 py-8 text-center text-sm text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start gap-3 px-3 py-3 cursor-pointer"
              >
                <span className="text-2xl flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
