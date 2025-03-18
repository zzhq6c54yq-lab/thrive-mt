
import React from "react";
import { Link } from "react-router-dom";
import { 
  User, Settings, LogOut, Calendar, LineChart, HelpCircle, 
  Moon, Sun, Bell, Languages, Lock, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleThemeToggle = () => {
    toast({
      title: "Theme setting",
      description: "Dark mode is not implemented yet.",
    });
  };

  return (
    <header className="fixed top-0 right-0 z-50 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-20 w-20 rounded-full border-4 border-[#B87333] bg-white shadow-xl hover:bg-[#B87333]/10 transition-all duration-300 hover:shadow-[0_0_15px_#B87333]"
            aria-label="User menu"
          >
            <User className="h-10 w-10 text-[#B87333]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2 mr-2 bg-white/95 backdrop-blur-sm border border-[#B87333]/20">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">My Profile</p>
              <p className="text-xs leading-none text-muted-foreground">
                Manage your account
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleThemeToggle}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark Mode</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Lock className="mr-2 h-4 w-4" />
              <span>Privacy Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Languages className="mr-2 h-4 w-4" />
              <span>Language</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Feedback</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
