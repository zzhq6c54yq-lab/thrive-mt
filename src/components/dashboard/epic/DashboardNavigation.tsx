import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, LogOut, Calendar, CalendarDays, User } from 'lucide-react';
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
import { AnimatePresence } from 'framer-motion';
import GoodbyeRitual from './GoodbyeRitual';
import { NotificationBell } from './NotificationBell';
import EditProfileModal from '@/components/profile/EditProfileModal';
import { useUser } from '@/contexts/UserContext';
import { THRIVE_LOGO } from '@/constants/branding';

interface DashboardNavigationProps {
  userName: string;
}

export default function DashboardNavigation({ userName }: DashboardNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showGoodbye, setShowGoodbye] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { logout, isLoggingOut } = useLogout(() => setShowGoodbye(true));
  const { profile } = useUser();
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  
  // Check if this is demo mode
  const demoUser = location.state?.demoUser;

  useEffect(() => {
    if (profile?.avatar_url) {
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  const handleProfileUpdate = () => {
    if (profile?.avatar_url) {
      setAvatarUrl(profile.avatar_url);
    }
  };

  const navItems = [
    { label: 'Today', icon: Home, path: '/' },
    { label: 'Weekly Goals', icon: Calendar, path: '/weekly-goals' },
    { label: 'Monthly Goals', icon: CalendarDays, path: '/monthly-goals' },
    { label: 'Progress', icon: TrendingUp, path: '/progress-analytics' },
  ];

  return (
    <>
      {/* Goodbye Ritual */}
      <AnimatePresence>
        {showGoodbye && (
          <GoodbyeRitual
            userName={userName}
            onClose={() => setShowGoodbye(false)}
          />
        )}
      </AnimatePresence>

      <div className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo & Greeting - modified to accept children for status chips */}
          <div>
            <div className="flex items-center gap-4 mb-1">
              <div className="flex items-center gap-2">
                {/* Use the actual bronze head logo */}
                <div className="relative w-10 h-10">
                  <img 
                    src={THRIVE_LOGO} 
                    alt="ThriveMT Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(184,115,51,0.6)]"
                  />
                </div>
                <span className="font-bold text-white text-xl hidden sm:inline">ThriveMT</span>
              </div>
              <div className="hidden md:block text-sm text-gray-300">
                {demoUser ? 'Hello User' : `Welcome back, ${userName}`}
              </div>
            </div>
            {/* Status chips placeholder - will be rendered by parent */}
            <div id="status-chips-container" className="ml-12" />
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-2">
            <NotificationBell />
            
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
                    <AvatarImage src={avatarUrl} alt={userName} />
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
                    <p className="text-xs text-gray-400">My Account</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={() => setShowEditProfile(true)}
                  className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
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

      {/* Edit Profile Modal */}
      <EditProfileModal 
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onUpdate={handleProfileUpdate}
      />
    </>
  );
}
