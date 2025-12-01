import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  Heart, 
  Users, 
  DollarSign, 
  PlayCircle, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  Mail,
  LogIn,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SiteSidebarProps {
  collapsed?: boolean;
}

const SiteSidebar = ({ collapsed = false }: SiteSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navSections = [
    {
      title: "SERVICES",
      items: [
        { icon: Heart, label: "Therapy", path: "/site/therapy" },
        { icon: Users, label: "Coaching", path: "/site/coaching" },
      ],
    },
    {
      title: "PRICING",
      items: [
        { icon: DollarSign, label: "Plans & Bundles", path: "/site/pricing" },
      ],
    },
    {
      title: "EXPLORE",
      items: [
        { icon: PlayCircle, label: "Live Demo", path: "/site/demo" },
      ],
    },
    {
      title: "COMPANY",
      items: [
        { icon: Building2, label: "About Us", path: "/site/about" },
        { icon: Briefcase, label: "Careers", path: "/site/careers" },
        { icon: TrendingUp, label: "Investors", path: "/site/investors" },
      ],
    },
    {
      title: "CONNECT",
      items: [
        { icon: Mail, label: "Contact", path: "/site/contact" },
      ],
    },
  ];

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#141921]/95 backdrop-blur-xl border-r border-bronze-500/20 z-50 overflow-y-auto",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <Link to="/site/home">
        <div className="p-6 border-b border-bronze-500/20">
          <div className="text-2xl font-bold bg-gradient-to-r from-bronze-400 to-bronze-600 bg-clip-text text-transparent">
            {collapsed ? "T" : "ThriveMT"}
          </div>
        </div>
      </Link>

      {/* Home Link */}
      <Link to="/site/home">
        <div
          className={cn(
            "flex items-center gap-3 px-6 py-4 text-foreground/80 hover:text-foreground hover:bg-bronze-500/10 transition-all border-b border-bronze-500/10",
            isActive("/site/home") && "bg-bronze-500/20 text-bronze-400 border-l-4 border-bronze-500"
          )}
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Home</span>}
        </div>
      </Link>

      {/* Navigation Sections */}
      <nav className="py-6 space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <div className="px-6 mb-2 text-xs font-bold text-bronze-400/60 tracking-wider">
                {section.title}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 text-foreground/80 hover:text-foreground hover:bg-bronze-500/10 transition-all",
                      isActive(item.path) && "bg-bronze-500/20 text-bronze-400 border-l-4 border-bronze-500"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 border-t border-bronze-500/20 bg-[#141921]">
          <Link to="/auth">
            <Button
              variant="outline"
              className="w-full border-bronze-500/30 text-bronze-400 hover:bg-bronze-500/10"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link to="/">
            <Button className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-black font-semibold">
              <UserPlus className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </motion.aside>
  );
};

export default SiteSidebar;
