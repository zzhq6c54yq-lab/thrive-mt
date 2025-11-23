import React from 'react';
import { Bell, MessageSquare, Lightbulb, Gift, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useCrossDashboardSync } from '@/hooks/useCrossDashboardSync';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export const NotificationBell: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useCrossDashboardSync(user?.id);

  const getNotificationIcon = (type: string) => {
    const iconClass = "w-5 h-5 text-[#D4AF37]";
    if (type.includes('therapist') || type.includes('message')) {
      return <MessageSquare className={iconClass} />;
    } else if (type.includes('insight') || type.includes('ai')) {
      return <Lightbulb className={iconClass} />;
    } else if (type.includes('reward') || type.includes('points')) {
      return <Gift className={iconClass} />;
    } else if (type.includes('streak') || type.includes('milestone')) {
      return <Flame className={iconClass} />;
    }
    return <Bell className={iconClass} />;
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
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
        <div className="px-3 py-2 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="px-3 py-8 text-center text-sm text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.slice(0, 10).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start gap-3 px-3 py-3 cursor-pointer"
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon((notification as any).notification_type || 'general')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(notification.created_at), 'MMM d, h:mm a')}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0 mt-1" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
