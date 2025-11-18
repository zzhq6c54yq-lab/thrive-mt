import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Users, Grid3x3, TrendingUp, User, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLogout } from '@/hooks/useLogout';

interface DashboardNavigationProps {
  userName: string;
}

export default function DashboardNavigation({ userName }: DashboardNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout();

  const navItems = [
    { label: 'Today', icon: Home, path: '/' },
    { label: 'All Tools', icon: Grid3x3, path: '/home' },
    { label: 'Progress', icon: TrendingUp, path: '/progress-analytics' },
  ];

  return (
    <div className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo & Greeting */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 text-[#B87333]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50,20 Q65,20 75,35 L75,70 Q75,85 50,95 Q25,85 25,70 L25,35 Q35,20 50,20 Z" 
                        fill="none" stroke="currentColor" strokeWidth="3"/>
                  <path d="M50,55 L45,50 Q40,45 40,40 Q40,35 45,35 Q50,35 50,40 Q50,35 55,35 Q60,35 60,40 Q60,45 55,50 Z" 
                        fill="currentColor"/>
                </svg>
              </div>
              <span className="font-bold text-white text-xl hidden sm:inline">ThriveMT</span>
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

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white text-xs">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900/95 border-white/10 backdrop-blur-md">
                <DropdownMenuLabel className="text-gray-300">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-white">{userName}</p>
                    <p className="text-xs text-gray-400">Manage your account</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={() => navigate('/profile')}
                  className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/settings')}
                  className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </div>
  );
}
