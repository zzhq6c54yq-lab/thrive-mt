import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Users, Grid3x3, TrendingUp, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardNavigationProps {
  userName: string;
}

export default function DashboardNavigation({ userName }: DashboardNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Today', icon: Home, path: '/' },
    { label: 'My Portals', icon: Users, path: '/portals' },
    { label: 'All Tools', icon: Grid3x3, path: '/home' },
    { label: 'Progress', icon: TrendingUp, path: '/progress-analytics' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo & Greeting */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
              <span className="font-bold text-white text-xl hidden sm:inline">Thrive</span>
            </div>
            <div className="hidden md:block text-sm text-gray-300">
              Welcome back, <span className="text-white font-medium">{userName}</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "text-gray-300 hover:text-white hover:bg-white/10 transition-colors",
                    isActive && "bg-white/10 text-white"
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
